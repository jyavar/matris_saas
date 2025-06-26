import { z } from 'zod'

// Esquema de reporte de uso
export const UsageReportSchema = z.object({
  totalUsers: z.number(),
  activeUsers: z.number(),
  totalEvents: z.number(),
  period: z.string(),
})

export type UsageReport = z.infer<typeof UsageReportSchema>

// Esquema de eventos
export const EventReportSchema = z.object({
  event: z.string(),
  count: z.number(),
  period: z.string(),
})

export type EventReport = z.infer<typeof EventReportSchema>

// Simulación de "base de datos" en memoria
const USAGE_DATA: Record<string, UsageReport> = {
  '2024-07': {
    totalUsers: 1000,
    activeUsers: 250,
    totalEvents: 5000,
    period: '2024-07',
  },
  '2024-06': {
    totalUsers: 950,
    activeUsers: 200,
    totalEvents: 4800,
    period: '2024-06',
  },
}

const EVENT_DATA: Record<string, Record<string, EventReport>> = {
  '2024-07': {
    login: { event: 'login', count: 123, period: '2024-07' },
    signup: { event: 'signup', count: 45, period: '2024-07' },
  },
  '2024-06': {
    login: { event: 'login', count: 110, period: '2024-06' },
    signup: { event: 'signup', count: 30, period: '2024-06' },
  },
}

export class ReportingService {
  static async getUsageReport(period: string): Promise<UsageReport> {
    // Simula consulta real
    const report = USAGE_DATA[period]
    if (!report) throw new Error('No usage data for period')
    return report
  }

  static async getEventReport(
    event: string,
    period: string,
  ): Promise<EventReport> {
    const eventData = EVENT_DATA[period]?.[event]
    if (!eventData) throw new Error('No event data for event/period')
    return eventData
  }
}
