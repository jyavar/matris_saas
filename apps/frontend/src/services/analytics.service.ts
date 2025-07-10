// Analytics service for frontend
import { getSessionToken } from '@/lib/supabase'

export interface AnalyticsEvent {
  id: number
  event_name: string
  user_id?: number
  payload?: Record<string, unknown>
  created_at: string
}

export interface AnalyticsMetric {
  id: number
  metric_name: string
  value: number
  user_id?: number
  tags?: Record<string, string>
  created_at: string
}

export interface AnalyticsSummary {
  total_events: number
  unique_users: number
  top_events: Array<{ event_name: string; count: number }>
  daily_events: Array<{ date: string; count: number }>
}

export interface UserAnalytics {
  user_id: string
  total_events: number
  last_seen: string
  events_breakdown: Array<{ event_name: string; count: number }>
}

export interface AnalyticsQuery {
  startDate?: string
  endDate?: string
  event_name?: string
  user_id?: number
  limit?: number
  offset?: number
}

export interface TrackEventRequest {
  event_name: string
  user_id?: number
  properties?: Record<string, unknown>
  timestamp?: string
}

export interface TrackMetricRequest {
  metric_name: string
  value: number
  user_id?: number
  tags?: Record<string, string>
  timestamp?: string
}

export interface AnalyticsResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export class AnalyticsService {
  static async trackEvent(request: TrackEventRequest): Promise<AnalyticsResponse<AnalyticsEvent>> {
    try {
      const token = await getSessionToken()
      const res = await fetch('/api/analytics/track/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      })
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null)
        return { success: false, error: errorJson?.error || `Error ${res.status}` }
      }
      const event = await res.json()
      return { success: true, data: event }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to track event',
      }
    }
  }

  static async trackMetric(request: TrackMetricRequest): Promise<AnalyticsResponse<AnalyticsMetric>> {
    try {
      const token = await getSessionToken()
      const res = await fetch('/api/analytics/track/metric', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      })
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null)
        return { success: false, error: errorJson?.error || `Error ${res.status}` }
      }
      const metric = await res.json()
      return { success: true, data: metric }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to track metric',
      }
    }
  }

  static async getEvents(query?: AnalyticsQuery): Promise<AnalyticsResponse<AnalyticsEvent[]>> {
    try {
      const token = await getSessionToken()
      const queryParams = new URLSearchParams()
      
      if (query?.startDate) queryParams.append('startDate', query.startDate)
      if (query?.endDate) queryParams.append('endDate', query.endDate)
      if (query?.event_name) queryParams.append('event_name', query.event_name)
      if (query?.user_id !== undefined) queryParams.append('user_id', query.user_id.toString())
      if (query?.limit !== undefined) queryParams.append('limit', query.limit.toString())
      if (query?.offset !== undefined) queryParams.append('offset', query.offset.toString())

      const res = await fetch(`/api/analytics/events?${queryParams.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        return { success: false, error: `Error ${res.status}: ${res.statusText}` }
      }
      const events = await res.json()
      return { success: true, data: events }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get events',
      }
    }
  }

  static async getMetrics(query?: AnalyticsQuery): Promise<AnalyticsResponse<AnalyticsMetric[]>> {
    try {
      const token = await getSessionToken()
      const queryParams = new URLSearchParams()
      
      if (query?.startDate) queryParams.append('startDate', query.startDate)
      if (query?.endDate) queryParams.append('endDate', query.endDate)
      if (query?.event_name) queryParams.append('event_name', query.event_name)
      if (query?.user_id !== undefined) queryParams.append('user_id', query.user_id.toString())
      if (query?.limit !== undefined) queryParams.append('limit', query.limit.toString())
      if (query?.offset !== undefined) queryParams.append('offset', query.offset.toString())

      const res = await fetch(`/api/analytics/metrics?${queryParams.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        return { success: false, error: `Error ${res.status}: ${res.statusText}` }
      }
      const metrics = await res.json()
      return { success: true, data: metrics }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get metrics',
      }
    }
  }

  static async getAnalyticsSummary(): Promise<AnalyticsResponse<AnalyticsSummary>> {
    try {
      const token = await getSessionToken()
      const res = await fetch('/api/analytics/summary', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        return { success: false, error: `Error ${res.status}: ${res.statusText}` }
      }
      const summary = await res.json()
      return { success: true, data: summary }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get analytics summary',
      }
    }
  }

  static async getUserAnalytics(userId: string): Promise<AnalyticsResponse<UserAnalytics>> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`/api/analytics/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        return { success: false, error: `Error ${res.status}: ${res.statusText}` }
      }
      const userAnalytics = await res.json()
      return { success: true, data: userAnalytics }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get user analytics',
      }
    }
  }

  static async getAllAnalytics(): Promise<AnalyticsResponse<AnalyticsEvent[]>> {
    try {
      const token = await getSessionToken()
      const res = await fetch('/api/analytics', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        return { success: false, error: `Error ${res.status}: ${res.statusText}` }
      }
      const analytics = await res.json()
      return { success: true, data: analytics }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get all analytics',
      }
    }
  }
} 