/**
 * Odoo Configuration
 * @description Configuración para conexión con Odoo API JSON-RPC
 */

export interface OdooConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
  protocol: 'http' | 'https'
  timeout: number
  maxRetries: number
}

export interface OdooConnection {
  url: string
  config: OdooConfig
}

export interface OdooCredentials {
  database: string
  username: string
  password: string
}

export interface OdooEndpoint {
  jsonrpc: string
  method: string
  params: Record<string, unknown>
  id: number
}

export interface OdooResponse<T = unknown> {
  jsonrpc: string
  id: number
  result?: T
  error?: {
    code: number
    message: string
    data: {
      name: string
      message: string
      arguments: string[]
      type: string
    }
  }
}

export interface OdooSession {
  session_id: string
  uid: number
  user_context: Record<string, unknown>
}

export interface OdooBudget {
  id: number
  name: string
  date_from: string
  date_to: string
  planned_amount: number
  practical_amount: number
  company_id: [number, string]
  account_id: [number, string]
  analytic_account_id?: [number, string]
  crossovered_budget_line_ids: number[]
  state: 'draft' | 'confirm' | 'validate' | 'done'
  create_date: string
  write_date: string
}

export interface OdooAccountMove {
  id: number
  name: string
  date: string
  ref: string
  journal_id: [number, string]
  company_id: [number, string]
  amount_total: number
  amount_untaxed: number
  amount_tax: number
  state: 'draft' | 'posted' | 'cancel'
  move_type: 'entry' | 'out_invoice' | 'out_refund' | 'in_invoice' | 'in_refund'
  create_date: string
  write_date: string
}

export interface BudgetComparison {
  budget_id: number
  budget_name: string
  account_name: string
  planned_amount: number
  practical_amount: number
  deviation_amount: number
  deviation_percentage: number
  is_alert: boolean
  alert_threshold: number
  date_range: {
    from: string
    to: string
  }
  company_name: string
}

export interface BudgetAuditReport {
  generated_at: string
  config: OdooConfig
  summary: {
    total_budgets: number
    total_alerts: number
    total_deviation_amount: number
    average_deviation_percentage: number
  }
  comparisons: BudgetComparison[]
  alerts: BudgetComparison[]
  companies: {
    [companyId: number]: {
      name: string
      budgets_count: number
      alerts_count: number
    }
  }
}

export const DEFAULT_ODOO_CONFIG: OdooConfig = {
  host: 'localhost',
  port: 8069,
  database: '',
  username: '',
  password: '',
  protocol: 'http',
  timeout: 30000,
  maxRetries: 3
}

export const ALERT_THRESHOLD = 10 // 10% deviation threshold

export const ODOO_ENDPOINTS = {
  AUTH: '/web/session/authenticate',
  EXECUTE: '/web/dataset/call_kw',
  SEARCH_READ: '/web/dataset/search_read',
  READ: '/web/dataset/read'
} as const

export const BUDGET_MODELS = {
  BUDGET: 'account.budget',
  ACCOUNT_MOVE: 'account.move',
  ACCOUNT: 'account.account',
  COMPANY: 'res.company'
} as const 