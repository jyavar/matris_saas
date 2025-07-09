/**
 * Odoo Budget Auditor Agent
 * @description Agente autónomo para auditar presupuestos vs movimientos contables reales en Odoo
 */

import { mkdir, writeFile } from 'fs/promises'
import { dirname } from 'path'
import pino from 'pino'

import { BudgetAuditReport } from './config/odoo'
import { BudgetAuditorService } from './services/budget-auditor.service'
import { OdooService } from './services/odoo.service'

const logger = pino({
  name: 'odoo-budget-auditor',
  level: process.env.LOG_LEVEL || 'info'
})

export interface OdooBudgetAuditorConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
  protocol?: 'http' | 'https'
  timeout?: number
  maxRetries?: number
  outputPath?: string
}

export class OdooBudgetAuditor {
  private odooService: OdooService
  private budgetAuditorService: BudgetAuditorService
  private config: OdooBudgetAuditorConfig

  constructor(config: OdooBudgetAuditorConfig) {
    this.config = config
    this.odooService = new OdooService(config)
    this.budgetAuditorService = new BudgetAuditorService(this.odooService)
  }

  /**
   * Ejecutar auditoría completa
   */
  async runAudit(): Promise<BudgetAuditReport> {
    logger.info('Starting Odoo Budget Auditor')

    try {
      // Autenticar con Odoo
      await this.authenticate()

      // Generar reporte de auditoría
      const report = await this.budgetAuditorService.generateAuditReport()

      // Guardar reporte
      await this.saveReport(report)

      // Generar resumen ejecutivo
      const summary = this.budgetAuditorService.generateExecutiveSummary(report)
      logger.info(summary, 'Audit completed successfully')

      // Cerrar sesión
      await this.odooService.logout()

      return report

    } catch (error) {
      logger.error({ error }, 'Audit failed')
      throw error
    }
  }

  /**
   * Autenticar con Odoo
   */
  private async authenticate(): Promise<void> {
    logger.info({ 
      host: this.config.host, 
      port: this.config.port, 
      database: this.config.database,
      username: this.config.username 
    }, 'Authenticating with Odoo')

    await this.odooService.authenticate({
      database: this.config.database,
      username: this.config.username,
      password: this.config.password
    })

    logger.info('Authentication successful')
  }

  /**
   * Guardar reporte en archivo JSON
   */
  private async saveReport(report: BudgetAuditReport): Promise<void> {
    const outputPath = this.config.outputPath || 'audit-artifacts/odoo/budget-report.json'
    
    try {
      // Crear directorio si no existe
      const dir = dirname(outputPath)
      await mkdir(dir, { recursive: true })

      // Guardar reporte
      await writeFile(outputPath, JSON.stringify(report, null, 2), 'utf-8')

      logger.info({ outputPath }, 'Report saved successfully')

    } catch (error) {
      logger.error({ error, outputPath }, 'Failed to save report')
      throw error
    }
  }

  /**
   * Obtener configuración actual
   */
  getConfig(): OdooBudgetAuditorConfig {
    return { ...this.config }
  }

  /**
   * Obtener información de conexión
   */
  getConnectionInfo(): { url: string; database: string; username: string } {
    const connection = this.odooService.getConnectionInfo()
    return {
      url: connection.url,
      database: this.config.database,
      username: this.config.username
    }
  }
}

/**
 * Función principal del agente
 */
export async function runAgent(config?: Partial<OdooBudgetAuditorConfig>): Promise<BudgetAuditReport> {
  // Cargar configuración desde variables de entorno si no se proporciona
  const fullConfig: OdooBudgetAuditorConfig = {
    host: config?.host || process.env.ODOO_HOST || 'localhost',
    port: config?.port || parseInt(process.env.ODOO_PORT || '8069'),
    database: config?.database || process.env.ODOO_DATABASE || '',
    username: config?.username || process.env.ODOO_USERNAME || '',
    password: config?.password || process.env.ODOO_PASSWORD || '',
    protocol: config?.protocol || (process.env.ODOO_PROTOCOL as 'http' | 'https') || 'http',
    timeout: config?.timeout || parseInt(process.env.ODOO_TIMEOUT || '30000'),
    maxRetries: config?.maxRetries || parseInt(process.env.ODOO_MAX_RETRIES || '3'),
    outputPath: config?.outputPath || process.env.ODOO_OUTPUT_PATH || 'audit-artifacts/odoo/budget-report.json'
  }

  // Validar configuración requerida
  if (!fullConfig.database || !fullConfig.username || !fullConfig.password) {
    throw new Error('Missing required configuration: ODOO_DATABASE, ODOO_USERNAME, ODOO_PASSWORD')
  }

  const auditor = new OdooBudgetAuditor(fullConfig)
  return await auditor.runAudit()
}

/**
 * Función para ejecutar desde línea de comandos
 */
if (require.main === module) {
  runAgent()
    .then((report) => {
      logger.info({ 
        totalBudgets: report.summary.total_budgets,
        totalAlerts: report.summary.total_alerts,
        averageDeviation: report.summary.average_deviation_percentage
      }, 'Odoo Budget Auditor completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      logger.error({ error }, 'Odoo Budget Auditor failed')
      process.exit(1)
    })
} 