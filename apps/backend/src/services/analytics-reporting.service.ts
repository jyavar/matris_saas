
import logger from './logger.service.js'
import { ApiError } from '../utils/ApiError.js'

// Tipos estrictos para reportes
export interface AnalyticsReport {
  id: string
  name: string
  type: string
  data: Record<string, unknown>
  created_at: string
}

export interface CreateReportData {
  name: string
  type: string
  data: Record<string, unknown>
}

class AnalyticsReportingService {
  private reports: AnalyticsReport[] = []

  async getReports(): Promise<AnalyticsReport[]> {
    return this.reports
  }

  async getReportById(id: string): Promise<AnalyticsReport | null> {
    return this.reports.find((r) => r.id === id) || null
  }

  async createReport(data: CreateReportData): Promise<AnalyticsReport> {
    if (!data.name || !data.type || !data.data) {
      throw new ApiError('Invalid report data', 400)
    }
    // Simulación de integración con PostHog
    // Aquí se podría hacer fetch a PostHog API
    const report: AnalyticsReport = {
      id: `report-${Date.now()}`,
      name: data.name,
      type: data.type,
      data: data.data,
      created_at: new Date().toISOString(),
    }
    this.reports.push(report)
    logger.info({ reportId: report.id }, 'Analytics report created')
    return report
  }

  async deleteReport(id: string): Promise<boolean> {
    const idx = this.reports.findIndex((r) => r.id === id)
    if (idx === -1) return false
    this.reports.splice(idx, 1)
    logger.info({ reportId: id }, 'Analytics report deleted')
    return true
  }
}

export const analyticsReportingService = new AnalyticsReportingService()
