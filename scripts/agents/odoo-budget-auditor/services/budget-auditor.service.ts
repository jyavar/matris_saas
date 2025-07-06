/**
 * Budget Auditor Service
 * @description Servicio para auditar presupuestos vs movimientos contables reales
 */

import pino from 'pino'
import { OdooService } from './odoo.service'
import {
  OdooBudget,
  OdooAccountMove,
  BudgetComparison,
  BudgetAuditReport,
  ALERT_THRESHOLD
} from '../config/odoo'

const logger = pino({
  name: 'budget-auditor-service',
  level: process.env.LOG_LEVEL || 'info'
})

export class BudgetAuditorService {
  private odooService: OdooService

  constructor(odooService: OdooService) {
    this.odooService = odooService
  }

  /**
   * Calcular desviación entre monto planificado y real
   */
  private calculateDeviation(planned: number, practical: number): {
    amount: number
    percentage: number
  } {
    const deviationAmount = practical - planned
    const deviationPercentage = planned !== 0 ? (deviationAmount / planned) * 100 : 0

    return {
      amount: deviationAmount,
      percentage: deviationPercentage
    }
  }

  /**
   * Determinar si hay alerta basada en el umbral
   */
  private isAlert(deviationPercentage: number): boolean {
    return Math.abs(deviationPercentage) > ALERT_THRESHOLD
  }

  /**
   * Obtener información de cuentas y empresas
   */
  private async getReferenceData(budgets: OdooBudget[]): Promise<{
    accounts: Map<number, { name: string; code: string }>
    companies: Map<number, string>
  }> {
    const accountIds = [...new Set(budgets.map(b => b.account_id[0]))]
    const companyIds = [...new Set(budgets.map(b => b.company_id[0]))]

    const [accounts, companies] = await Promise.all([
      this.odooService.getAccounts(accountIds),
      this.odooService.getCompanies(companyIds)
    ])

    const accountsMap = new Map(
      accounts.map(acc => [acc.id, { name: acc.name, code: acc.code }])
    )

    const companiesMap = new Map(
      companies.map(comp => [comp.id, comp.name])
    )

    return { accounts: accountsMap, companies: companiesMap }
  }

  /**
   * Comparar presupuesto con movimientos reales
   */
  private async compareBudgetWithReality(
    budget: OdooBudget,
    accountMoves: OdooAccountMove[],
    accountName: string,
    companyName: string
  ): Promise<BudgetComparison> {
    logger.debug({ budgetId: budget.id, budgetName: budget.name }, 'Comparing budget with reality')

    // Filtrar movimientos por cuenta y rango de fechas
    const relevantMoves = accountMoves.filter(move => {
      const moveDate = new Date(move.date)
      const fromDate = new Date(budget.date_from)
      const toDate = new Date(budget.date_to)

      return moveDate >= fromDate && moveDate <= toDate
    })

    // Calcular monto práctico (suma de movimientos)
    const practicalAmount = relevantMoves.reduce((sum, move) => sum + move.amount_total, 0)

    // Calcular desviación
    const { amount: deviationAmount, percentage: deviationPercentage } = this.calculateDeviation(
      budget.planned_amount,
      practicalAmount
    )

    const isAlert = this.isAlert(deviationPercentage)

    const comparison: BudgetComparison = {
      budget_id: budget.id,
      budget_name: budget.name,
      account_name: accountName,
      planned_amount: budget.planned_amount,
      practical_amount: practicalAmount,
      deviation_amount: deviationAmount,
      deviation_percentage: deviationPercentage,
      is_alert: isAlert,
      alert_threshold: ALERT_THRESHOLD,
      date_range: {
        from: budget.date_from,
        to: budget.date_to
      },
      company_name: companyName
    }

    logger.debug(
      { 
        budgetId: budget.id, 
        planned: budget.planned_amount, 
        practical: practicalAmount,
        deviation: deviationPercentage,
        isAlert 
      }, 
      'Budget comparison completed'
    )

    return comparison
  }

  /**
   * Generar reporte de auditoría completo
   */
  async generateAuditReport(): Promise<BudgetAuditReport> {
    logger.info('Starting budget audit report generation')

    try {
      // Obtener datos de Odoo
      const [budgets, accountMoves] = await Promise.all([
        this.odooService.getBudgets(),
        this.odooService.getAccountMoves()
      ])

      logger.info({ budgetsCount: budgets.length, movesCount: accountMoves.length }, 'Data fetched from Odoo')

      if (budgets.length === 0) {
        logger.warn('No budgets found for audit')
        return this.createEmptyReport()
      }

      // Obtener datos de referencia
      const { accounts, companies } = await this.getReferenceData(budgets)

      // Realizar comparaciones
      const comparisons: BudgetComparison[] = []
      const alerts: BudgetComparison[] = []

      for (const budget of budgets) {
        const accountInfo = accounts.get(budget.account_id[0])
        const companyName = companies.get(budget.company_id[0]) || 'Unknown Company'

        if (!accountInfo) {
          logger.warn({ budgetId: budget.id, accountId: budget.account_id[0] }, 'Account not found')
          continue
        }

        const comparison = await this.compareBudgetWithReality(
          budget,
          accountMoves,
          accountInfo.name,
          companyName
        )

        comparisons.push(comparison)

        if (comparison.is_alert) {
          alerts.push(comparison)
        }
      }

      // Calcular estadísticas
      const totalDeviationAmount = comparisons.reduce((sum, comp) => sum + comp.deviation_amount, 0)
      const averageDeviationPercentage = comparisons.length > 0 
        ? comparisons.reduce((sum, comp) => sum + comp.deviation_percentage, 0) / comparisons.length 
        : 0

      // Agrupar por empresa
      const companiesSummary: Record<number, { name: string; budgets_count: number; alerts_count: number }> = {}
      
      for (const budget of budgets) {
        const companyId = budget.company_id[0]
        const companyName = companies.get(companyId) || 'Unknown Company'
        
        if (!companiesSummary[companyId]) {
          companiesSummary[companyId] = {
            name: companyName,
            budgets_count: 0,
            alerts_count: 0
          }
        }
        
        companiesSummary[companyId].budgets_count++
        
        const comparison = comparisons.find(c => c.budget_id === budget.id)
        if (comparison?.is_alert) {
          companiesSummary[companyId].alerts_count++
        }
      }

      const report: BudgetAuditReport = {
        generated_at: new Date().toISOString(),
        config: this.odooService.getConfig(),
        summary: {
          total_budgets: comparisons.length,
          total_alerts: alerts.length,
          total_deviation_amount: totalDeviationAmount,
          average_deviation_percentage: averageDeviationPercentage
        },
        comparisons,
        alerts,
        companies: companiesSummary
      }

      logger.info(
        { 
          totalBudgets: report.summary.total_budgets,
          totalAlerts: report.summary.total_alerts,
          averageDeviation: report.summary.average_deviation_percentage
        }, 
        'Budget audit report generated successfully'
      )

      return report

    } catch (error) {
      logger.error({ error }, 'Failed to generate budget audit report')
      throw error
    }
  }

  /**
   * Crear reporte vacío
   */
  private createEmptyReport(): BudgetAuditReport {
    return {
      generated_at: new Date().toISOString(),
      config: this.odooService.getConfig(),
      summary: {
        total_budgets: 0,
        total_alerts: 0,
        total_deviation_amount: 0,
        average_deviation_percentage: 0
      },
      comparisons: [],
      alerts: [],
      companies: {}
    }
  }

  /**
   * Obtener alertas críticas (desviación > 20%)
   */
  getCriticalAlerts(comparisons: BudgetComparison[]): BudgetComparison[] {
    return comparisons.filter(comp => Math.abs(comp.deviation_percentage) > 20)
  }

  /**
   * Obtener alertas moderadas (10% < desviación <= 20%)
   */
  getModerateAlerts(comparisons: BudgetComparison[]): BudgetComparison[] {
    return comparisons.filter(comp => {
      const absDeviation = Math.abs(comp.deviation_percentage)
      return absDeviation > 10 && absDeviation <= 20
    })
  }

  /**
   * Generar resumen ejecutivo
   */
  generateExecutiveSummary(report: BudgetAuditReport): {
    total_budgets: number
    total_alerts: number
    critical_alerts: number
    moderate_alerts: number
    total_deviation_amount: number
    average_deviation_percentage: number
    companies_affected: number
    risk_level: 'low' | 'medium' | 'high'
  } {
    const criticalAlerts = this.getCriticalAlerts(report.comparisons)
    const moderateAlerts = this.getModerateAlerts(report.comparisons)
    const companiesAffected = Object.keys(report.companies).length

    let riskLevel: 'low' | 'medium' | 'high' = 'low'
    if (criticalAlerts.length > 0) {
      riskLevel = 'high'
    } else if (moderateAlerts.length > 0) {
      riskLevel = 'medium'
    }

    return {
      total_budgets: report.summary.total_budgets,
      total_alerts: report.summary.total_alerts,
      critical_alerts: criticalAlerts.length,
      moderate_alerts: moderateAlerts.length,
      total_deviation_amount: report.summary.total_deviation_amount,
      average_deviation_percentage: report.summary.average_deviation_percentage,
      companies_affected: companiesAffected,
      risk_level: riskLevel
    }
  }
} 