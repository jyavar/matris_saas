const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost'}/reporting`

export interface UsageReport {
  totalUsers: number
  activeUsers: number
  totalEvents: number
  period: string
}

export interface EventReport {
  event: string
  count: number
  period: string
}

export async function getUsageReport(period: string): Promise<UsageReport> {
  const response = await fetch(
    `${API_URL}/usage?period=${encodeURIComponent(period)}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch usage report')
  }
  return response.json()
}

export async function getEventReport(
  event: string,
  period: string,
): Promise<EventReport> {
  const response = await fetch(
    `${API_URL}/event?event=${encodeURIComponent(event)}&period=${encodeURIComponent(period)}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch event report')
  }
  return response.json()
}
