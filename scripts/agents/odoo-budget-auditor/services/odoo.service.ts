/**
 * Odoo Service
 * @description Servicio para conectar con Odoo API JSON-RPC
 */

import pino from 'pino'

import {
  BUDGET_MODELS,
  DEFAULT_ODOO_CONFIG,
  ODOO_ENDPOINTS,
  OdooAccountMove,
  OdooBudget,
  OdooConfig,
  OdooConnection,
  OdooCredentials,
  OdooEndpoint,
  OdooResponse,
  OdooSession} from '../config/odoo'

const logger = pino({
  name: 'odoo-service',
  level: process.env.LOG_LEVEL || 'info'
})

export class OdooService {
  private config: OdooConfig
  private session: OdooSession | null = null
  private requestId = 1

  constructor(config: Partial<OdooConfig> = {}) {
    this.config = { ...DEFAULT_ODOO_CONFIG, ...config }
  }

  /**
   * Construir URL de conexión
   */
  private buildUrl(endpoint: string): string {
    const { protocol, host, port } = this.config
    return `${protocol}://${host}:${port}${endpoint}`
  }

  /**
   * Generar ID único para requests
   */
  private getNextRequestId(): number {
    return this.requestId++
  }

  /**
   * Crear endpoint JSON-RPC
   */
  private createEndpoint(method: string, params: Record<string, unknown>): OdooEndpoint {
    return {
      jsonrpc: '2.0',
      method,
      params,
      id: this.getNextRequestId()
    }
  }

  /**
   * Realizar request HTTP a Odoo
   */
  private async makeRequest<T>(endpoint: string, data: OdooEndpoint): Promise<OdooResponse<T>> {
    const url = this.buildUrl(endpoint)
    
    try {
      logger.info({ url, method: data.method }, 'Making Odoo request')

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(this.config.timeout)
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result: OdooResponse<T> = await response.json()

      if (result.error) {
        logger.error({ error: result.error }, 'Odoo API error')
        throw new Error(`Odoo API Error: ${result.error.message}`)
      }

      logger.info({ method: data.method }, 'Odoo request successful')
      return result

    } catch (error) {
      logger.error({ error, url, method: data.method }, 'Odoo request failed')
      throw error
    }
  }

  /**
   * Autenticar con Odoo
   */
  async authenticate(credentials: OdooCredentials): Promise<OdooSession> {
    logger.info({ database: credentials.database, username: credentials.username }, 'Authenticating with Odoo')

    const endpoint = this.createEndpoint('call', {
      service: 'common',
      method: 'login',
      args: [credentials.database, credentials.username, credentials.password]
    })

    const response = await this.makeRequest<number>(ODOO_ENDPOINTS.AUTH, endpoint)

    if (!response.result) {
      throw new Error('Authentication failed: No user ID returned')
    }

    // Crear sesión
    this.session = {
      session_id: `session_${Date.now()}`,
      uid: response.result,
      user_context: {}
    }

    logger.info({ uid: this.session.uid }, 'Authentication successful')
    return this.session
  }

  /**
   * Verificar si está autenticado
   */
  private ensureAuthenticated(): void {
    if (!this.session) {
      throw new Error('Not authenticated. Call authenticate() first.')
    }
  }

  /**
   * Ejecutar método en modelo Odoo
   */
  async executeModelMethod<T>(
    model: string,
    method: string,
    args: unknown[] = [],
    kwargs: Record<string, unknown> = {}
  ): Promise<T> {
    this.ensureAuthenticated()

    const endpoint = this.createEndpoint('call', {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.config.database,
        this.session!.uid,
        this.config.password,
        model,
        method,
        args,
        kwargs
      ]
    })

    const response = await this.makeRequest<T>(ODOO_ENDPOINTS.EXECUTE, endpoint)
    return response.result as T
  }

  /**
   * Buscar y leer registros
   */
  async searchRead<T>(
    model: string,
    domain: unknown[] = [],
    fields: string[] = [],
    limit = 0,
    offset = 0,
    order = ''
  ): Promise<T[]> {
    this.ensureAuthenticated()

    const kwargs: Record<string, unknown> = {
      domain,
      fields,
      limit,
      offset
    }

    if (order) {
      kwargs.order = order
    }

    const result = await this.executeModelMethod<{ records: T[] }>(
      model,
      'search_read',
      [],
      kwargs
    )

    return result.records || []
  }

  /**
   * Obtener todos los presupuestos
   */
  async getBudgets(): Promise<OdooBudget[]> {
    logger.info('Fetching budgets from Odoo')

    const budgets = await this.searchRead<OdooBudget>(
      BUDGET_MODELS.BUDGET,
      [['state', 'in', ['confirm', 'validate', 'done']]], // Solo presupuestos confirmados
      [
        'id', 'name', 'date_from', 'date_to', 'planned_amount',
        'practical_amount', 'company_id', 'account_id', 'analytic_account_id',
        'crossovered_budget_line_ids', 'state', 'create_date', 'write_date'
      ],
      0, // Sin límite
      0,
      'date_from desc'
    )

    logger.info({ count: budgets.length }, 'Budgets fetched successfully')
    return budgets
  }

  /**
   * Obtener movimientos contables
   */
  async getAccountMoves(dateFrom?: string, dateTo?: string): Promise<OdooAccountMove[]> {
    logger.info({ dateFrom, dateTo }, 'Fetching account moves from Odoo')

    const domain: unknown[] = [['state', '=', 'posted']] // Solo movimientos confirmados

    if (dateFrom && dateTo) {
      domain.push(['date', '>=', dateFrom])
      domain.push(['date', '<=', dateTo])
    }

    const moves = await this.searchRead<OdooAccountMove>(
      BUDGET_MODELS.ACCOUNT_MOVE,
      domain,
      [
        'id', 'name', 'date', 'ref', 'journal_id', 'company_id',
        'amount_total', 'amount_untaxed', 'amount_tax', 'state',
        'move_type', 'create_date', 'write_date'
      ],
      0, // Sin límite
      0,
      'date desc'
    )

    logger.info({ count: moves.length }, 'Account moves fetched successfully')
    return moves
  }

  /**
   * Obtener información de cuentas contables
   */
  async getAccounts(accountIds: number[]): Promise<Array<{ id: number; name: string; code: string }>> {
    if (accountIds.length === 0) return []

    logger.info({ accountIds }, 'Fetching account information')

    const accounts = await this.searchRead<{ id: number; name: string; code: string }>(
      BUDGET_MODELS.ACCOUNT,
      [['id', 'in', accountIds]],
      ['id', 'name', 'code'],
      0,
      0,
      'code'
    )

    logger.info({ count: accounts.length }, 'Accounts fetched successfully')
    return accounts
  }

  /**
   * Obtener información de empresas
   */
  async getCompanies(companyIds: number[]): Promise<Array<{ id: number; name: string }>> {
    if (companyIds.length === 0) return []

    logger.info({ companyIds }, 'Fetching company information')

    const companies = await this.searchRead<{ id: number; name: string }>(
      BUDGET_MODELS.COMPANY,
      [['id', 'in', companyIds]],
      ['id', 'name'],
      0,
      0,
      'name'
    )

    logger.info({ count: companies.length }, 'Companies fetched successfully')
    return companies
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    if (!this.session) return

    logger.info('Logging out from Odoo')

    try {
      await this.executeModelMethod('res.users', 'logout', [])
      this.session = null
      logger.info('Logout successful')
    } catch (error) {
      logger.warn({ error }, 'Logout failed, but session cleared locally')
      this.session = null
    }
  }

  /**
   * Obtener configuración actual
   */
  getConfig(): OdooConfig {
    return { ...this.config }
  }

  /**
   * Obtener información de conexión
   */
  getConnectionInfo(): OdooConnection {
    return {
      url: this.buildUrl(''),
      config: this.getConfig()
    }
  }
} 