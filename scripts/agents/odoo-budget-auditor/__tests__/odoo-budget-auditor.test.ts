/**
 * Odoo Budget Auditor Tests
 * @description Tests unitarios para el agente de auditoría de presupuestos
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { OdooBudgetAuditor, runAgent } from '../index'
import { OdooService } from '../services/odoo.service'
import { BudgetAuditorService } from '../services/budget-auditor.service'
import { BudgetAuditReport } from '../config/odoo'

// Mock de servicios
vi.mock('../services/odoo.service')
vi.mock('../services/budget-auditor.service')
vi.mock('fs/promises', () => ({
  writeFile: vi.fn(),
  mkdir: vi.fn()
}))

describe('Odoo Budget Auditor', () => {
  const mockConfig = {
    host: 'localhost',
    port: 8069,
    database: 'test_db',
    username: 'test_user',
    password: 'test_pass',
    protocol: 'http' as const,
    timeout: 30000,
    maxRetries: 3,
    outputPath: 'test-output/budget-report.json'
  }

  const mockReport: BudgetAuditReport = {
    generated_at: new Date().toISOString(),
    config: mockConfig,
    summary: {
      total_budgets: 5,
      total_alerts: 2,
      total_deviation_amount: 15000,
      average_deviation_percentage: 8.5
    },
    comparisons: [
      {
        budget_id: 1,
        budget_name: 'Test Budget 1',
        account_name: 'Test Account 1',
        planned_amount: 100000,
        practical_amount: 115000,
        deviation_amount: 15000,
        deviation_percentage: 15,
        is_alert: true,
        alert_threshold: 10,
        date_range: { from: '2024-01-01', to: '2024-12-31' },
        company_name: 'Test Company'
      }
    ],
    alerts: [],
    companies: {
      1: { name: 'Test Company', budgets_count: 5, alerts_count: 2 }
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('OdooBudgetAuditor Class', () => {
    it('should initialize with configuration', () => {
      const mockOdooService = {
        getConnectionInfo: vi.fn().mockReturnValue({ url: 'http://localhost:8069' })
      }

      vi.mocked(OdooService).mockImplementation(() => mockOdooService as any)

      const auditor = new OdooBudgetAuditor(mockConfig)
      
      expect(auditor.getConfig()).toEqual(mockConfig)
      expect(auditor.getConnectionInfo()).toBeDefined()
    })

    it('should run complete audit successfully', async () => {
      const mockOdooService = {
        authenticate: vi.fn().mockResolvedValue({ uid: 1 }),
        logout: vi.fn().mockResolvedValue(undefined),
        getConnectionInfo: vi.fn().mockReturnValue({ url: 'http://localhost:8069' })
      }

      const mockBudgetAuditorService = {
        generateAuditReport: vi.fn().mockResolvedValue(mockReport),
        generateExecutiveSummary: vi.fn().mockReturnValue({
          total_budgets: 5,
          total_alerts: 2,
          critical_alerts: 1,
          moderate_alerts: 1,
          total_deviation_amount: 15000,
          average_deviation_percentage: 8.5,
          companies_affected: 1,
          risk_level: 'medium'
        })
      }

      vi.mocked(OdooService).mockImplementation(() => mockOdooService as any)
      vi.mocked(BudgetAuditorService).mockImplementation(() => mockBudgetAuditorService as any)

      const auditor = new OdooBudgetAuditor(mockConfig)
      const result = await auditor.runAudit()

      expect(result).toEqual(mockReport)
      expect(mockOdooService.authenticate).toHaveBeenCalledWith({
        database: mockConfig.database,
        username: mockConfig.username,
        password: mockConfig.password
      })
      expect(mockBudgetAuditorService.generateAuditReport).toHaveBeenCalled()
      expect(mockOdooService.logout).toHaveBeenCalled()
    })

    it('should handle authentication failure', async () => {
      const mockOdooService = {
        authenticate: vi.fn().mockRejectedValue(new Error('Authentication failed')),
        logout: vi.fn().mockResolvedValue(undefined)
      }

      vi.mocked(OdooService).mockImplementation(() => mockOdooService as any)

      const auditor = new OdooBudgetAuditor(mockConfig)

      await expect(auditor.runAudit()).rejects.toThrow('Authentication failed')
      expect(mockOdooService.logout).not.toHaveBeenCalled()
    })

    it('should handle audit report generation failure', async () => {
      const mockOdooService = {
        authenticate: vi.fn().mockResolvedValue({ uid: 1 }),
        logout: vi.fn().mockResolvedValue(undefined),
        getConnectionInfo: vi.fn().mockReturnValue({ url: 'http://localhost:8069' })
      }

      const mockBudgetAuditorService = {
        generateAuditReport: vi.fn().mockRejectedValue(new Error('Report generation failed')),
        generateExecutiveSummary: vi.fn()
      }

      vi.mocked(OdooService).mockImplementation(() => mockOdooService as any)
      vi.mocked(BudgetAuditorService).mockImplementation(() => mockBudgetAuditorService as any)

      const auditor = new OdooBudgetAuditor(mockConfig)

      await expect(auditor.runAudit()).rejects.toThrow('Report generation failed')
      expect(mockOdooService.logout).toHaveBeenCalled()
    })
  })

  describe('runAgent Function', () => {
    it('should run agent with environment variables', async () => {
      const originalEnv = process.env
      process.env = {
        ...originalEnv,
        ODOO_HOST: 'test-host',
        ODOO_PORT: '8070',
        ODOO_DATABASE: 'env_db',
        ODOO_USERNAME: 'env_user',
        ODOO_PASSWORD: 'env_pass',
        ODOO_PROTOCOL: 'https',
        ODOO_TIMEOUT: '60000',
        ODOO_MAX_RETRIES: '5',
        ODOO_OUTPUT_PATH: 'env-output/report.json'
      }

      const mockOdooService = {
        authenticate: vi.fn().mockResolvedValue({ uid: 1 }),
        logout: vi.fn().mockResolvedValue(undefined),
        getConnectionInfo: vi.fn().mockReturnValue({ url: 'https://test-host:8070' })
      }

      const mockBudgetAuditorService = {
        generateAuditReport: vi.fn().mockResolvedValue(mockReport),
        generateExecutiveSummary: vi.fn().mockReturnValue({
          total_budgets: 5,
          total_alerts: 2,
          critical_alerts: 1,
          moderate_alerts: 1,
          total_deviation_amount: 15000,
          average_deviation_percentage: 8.5,
          companies_affected: 1,
          risk_level: 'medium'
        })
      }

      vi.mocked(OdooService).mockImplementation(() => mockOdooService as any)
      vi.mocked(BudgetAuditorService).mockImplementation(() => mockBudgetAuditorService as any)

      const result = await runAgent()

      expect(result).toEqual(mockReport)
      expect(mockOdooService.authenticate).toHaveBeenCalledWith({
        database: 'env_db',
        username: 'env_user',
        password: 'env_pass'
      })

      // Restaurar variables de entorno
      process.env = originalEnv
    })

    it('should run agent with provided configuration', async () => {
      const mockOdooService = {
        authenticate: vi.fn().mockResolvedValue({ uid: 1 }),
        logout: vi.fn().mockResolvedValue(undefined),
        getConnectionInfo: vi.fn().mockReturnValue({ url: 'http://custom-host:8080' })
      }

      const mockBudgetAuditorService = {
        generateAuditReport: vi.fn().mockResolvedValue(mockReport),
        generateExecutiveSummary: vi.fn().mockReturnValue({
          total_budgets: 5,
          total_alerts: 2,
          critical_alerts: 1,
          moderate_alerts: 1,
          total_deviation_amount: 15000,
          average_deviation_percentage: 8.5,
          companies_affected: 1,
          risk_level: 'medium'
        })
      }

      vi.mocked(OdooService).mockImplementation(() => mockOdooService as any)
      vi.mocked(BudgetAuditorService).mockImplementation(() => mockBudgetAuditorService as any)

      const customConfig = {
        host: 'custom-host',
        port: 8080,
        database: 'custom_db',
        username: 'custom_user',
        password: 'custom_pass'
      }

      const result = await runAgent(customConfig)

      expect(result).toEqual(mockReport)
      expect(mockOdooService.authenticate).toHaveBeenCalledWith({
        database: 'custom_db',
        username: 'custom_user',
        password: 'custom_pass'
      })
    })

    it('should throw error for missing required configuration', async () => {
      const originalEnv = process.env
      process.env = { ...originalEnv }
      delete process.env.ODOO_DATABASE
      delete process.env.ODOO_USERNAME
      delete process.env.ODOO_PASSWORD

      await expect(runAgent()).rejects.toThrow('Missing required configuration')

      process.env = originalEnv
    })
  })

  describe('Configuration Validation', () => {
    it('should validate required fields', () => {
      const auditor = new OdooBudgetAuditor(mockConfig)
      const config = auditor.getConfig()

      expect(config.host).toBe('localhost')
      expect(config.port).toBe(8069)
      expect(config.database).toBe('test_db')
      expect(config.username).toBe('test_user')
      expect(config.password).toBe('test_pass')
      expect(config.protocol).toBe('http')
      expect(config.timeout).toBe(30000)
      expect(config.maxRetries).toBe(3)
    })

    it('should use default values for optional fields', () => {
      const mockOdooService = {
        getConnectionInfo: vi.fn().mockReturnValue({ url: 'http://localhost:8069' })
      }

      vi.mocked(OdooService).mockImplementation(() => mockOdooService as any)

      const minimalConfig = {
        host: 'localhost',
        port: 8069,
        database: 'test_db',
        username: 'test_user',
        password: 'test_pass'
      }

      const auditor = new OdooBudgetAuditor(minimalConfig)
      const config = auditor.getConfig()

      expect(config.protocol).toBe('http')
      expect(config.timeout).toBe(30000)
      expect(config.maxRetries).toBe(3)
      expect(config.outputPath).toBe('audit-artifacts/odoo/budget-report.json')
    })
  })

  describe('Connection Information', () => {
    it('should return correct connection info', () => {
      const mockOdooService = {
        getConnectionInfo: vi.fn().mockReturnValue({ url: 'http://localhost:8069' })
      }

      vi.mocked(OdooService).mockImplementation(() => mockOdooService as any)

      const auditor = new OdooBudgetAuditor(mockConfig)
      const connectionInfo = auditor.getConnectionInfo()

      expect(connectionInfo.url).toBe('http://localhost:8069')
      expect(connectionInfo.database).toBe('test_db')
      expect(connectionInfo.username).toBe('test_user')
    })
  })
}) 