// Analytics service for frontend - STRATO Core OS™
import { getSessionToken } from '@/lib/supabase'

// Logger para Analytics
const analyticsLogger = {
  info: (message: string, context?: Record<string, unknown>) => {
    console.log(`[Analytics] ${message}`, context ? JSON.stringify(context) : '')
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    console.warn(`[Analytics] ${message}`, context ? JSON.stringify(context) : '')
  },
  error: (message: string, context?: Record<string, unknown>) => {
    console.error(`[Analytics] ${message}`, context ? JSON.stringify(context) : '')
  }
}

// Circuit Breaker para Analytics
class AnalyticsCircuitBreaker {
  private failures = 0
  private lastFailureTime = 0
  private readonly threshold = 5
  private readonly timeout = 60000 // 1 minuto
  private state: 'closed' | 'open' | 'half-open' = 'closed'

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'half-open'
        analyticsLogger.info('Circuit breaker transitioning to half-open')
      } else {
        throw new Error('Circuit breaker is open')
      }
    }

    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess(): void {
    this.failures = 0
    this.state = 'closed'
  }

  private onFailure(): void {
    this.failures++
    this.lastFailureTime = Date.now()
    
    if (this.failures >= this.threshold) {
      this.state = 'open'
      analyticsLogger.warn('Circuit breaker opened due to failures', { failures: this.failures })
    }
  }

  getStatus(): { state: string; failures: number; lastFailure: number } {
    return {
      state: this.state,
      failures: this.failures,
      lastFailure: this.lastFailureTime
    }
  }
}

// Retry logic con backoff exponencial
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxRetries) {
        throw lastError
      }
      
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000
      analyticsLogger.warn(`Analytics request failed, retrying in ${delay}ms`, { 
        attempt: attempt + 1, 
        maxRetries,
        error: lastError.message 
      })
      
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  throw lastError!
}

// Validación de datos
function validateAnalyticsRequest(request: unknown): void {
  if (!request || typeof request !== 'object') {
    throw new Error('Invalid analytics request: must be an object')
  }
}

function validateAnalyticsQuery(query: unknown): void {
  if (query && typeof query === 'object') {
    const q = query as Record<string, unknown>
    
    if (q.limit !== undefined && (typeof q.limit !== 'number' || q.limit < 1 || q.limit > 1000)) {
      throw new Error('Invalid limit: must be between 1 and 1000')
    }
    
    if (q.offset !== undefined && (typeof q.offset !== 'number' || q.offset < 0)) {
      throw new Error('Invalid offset: must be non-negative')
    }
    
    if (q.user_id !== undefined && (typeof q.user_id !== 'number' || q.user_id < 1)) {
      throw new Error('Invalid user_id: must be a positive number')
    }
  }
}

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

export interface AnalyticsHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  circuitBreaker: {
    state: string
    failures: number
    lastFailure: number
  }
  lastCheck: string
  responseTime: number
}

export class AnalyticsService {
  private static circuitBreaker = new AnalyticsCircuitBreaker()
  private static readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  // Health check para Analytics
  static async healthCheck(): Promise<AnalyticsHealth> {
    const startTime = Date.now()
    
    try {
      console.log('🔍 AnalyticsService: Starting health check...')
      const token = await getSessionToken()
      console.log('🔍 AnalyticsService: Token obtained, making request to:', `${this.API_BASE_URL}/api/analytics/health`)
      
      const res = await fetch(`${this.API_BASE_URL}/api/analytics/health`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      
      const responseTime = Date.now() - startTime
      console.log('🔍 AnalyticsService: Response status:', res.status, 'Response time:', responseTime)
      console.log('🔍 AnalyticsService: Response ok:', res.ok)
      console.log('🔍 AnalyticsService: Response headers:', Object.fromEntries(res.headers.entries()))
      
      if (!res.ok) {
        console.log('🔍 AnalyticsService: Response not OK, returning unhealthy')
        return {
          status: 'unhealthy',
          circuitBreaker: this.circuitBreaker.getStatus(),
          lastCheck: new Date().toISOString(),
          responseTime
        }
      }
      
      const healthData = await res.json()
      console.log('🔍 AnalyticsService: Health data received:', healthData)
      
      // Usar el status de la respuesta del servidor, no un fallback
      const status = healthData.status
      console.log('🔍 AnalyticsService: Using status from server:', status)
      
      return {
        status: status,
        circuitBreaker: this.circuitBreaker.getStatus(),
        lastCheck: new Date().toISOString(),
        responseTime
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      console.log('🔍 AnalyticsService: Health check error:', error)
      analyticsLogger.error('Analytics health check failed', { error: (error as Error).message })
      
      return {
        status: 'unhealthy',
        circuitBreaker: this.circuitBreaker.getStatus(),
        lastCheck: new Date().toISOString(),
        responseTime
      }
    }
  }

  static async trackEvent(request: TrackEventRequest): Promise<AnalyticsResponse<AnalyticsEvent>> {
    return this.circuitBreaker.execute(async () => {
      try {
        validateAnalyticsRequest(request)
        
        if (!request.event_name || typeof request.event_name !== 'string') {
          throw new Error('event_name is required and must be a string')
        }
        
        analyticsLogger.info('Tracking analytics event', { 
          event_name: request.event_name,
          user_id: request.user_id 
        })
        
        const token = await getSessionToken()
        const res = await retryWithBackoff(async () => {
          return fetch(`${this.API_BASE_URL}/api/analytics/track/event`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
          })
        })
        
        if (!res.ok) {
          const errorJson = await res.json().catch(() => null)
          const error = errorJson?.error || `Error ${res.status}`
          analyticsLogger.error('Failed to track event', { 
            event_name: request.event_name,
            status: res.status,
            error 
          })
          return { success: false, error }
        }
        
        const event = await res.json()
        analyticsLogger.info('Event tracked successfully', { 
          event_id: event.id,
          event_name: request.event_name 
        })
        
        return { success: true, data: event }
      } catch (error) {
        analyticsLogger.error('Error tracking event', { 
          event_name: request.event_name,
          error: (error as Error).message 
        })
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to track event',
        }
      }
    })
  }

  static async trackMetric(request: TrackMetricRequest): Promise<AnalyticsResponse<AnalyticsMetric>> {
    return this.circuitBreaker.execute(async () => {
      try {
        validateAnalyticsRequest(request)
        
        if (!request.metric_name || typeof request.metric_name !== 'string') {
          throw new Error('metric_name is required and must be a string')
        }
        
        if (typeof request.value !== 'number') {
          throw new Error('value is required and must be a number')
        }
        
        analyticsLogger.info('Tracking analytics metric', { 
          metric_name: request.metric_name,
          value: request.value,
          user_id: request.user_id 
        })
        
        const token = await getSessionToken()
        const res = await retryWithBackoff(async () => {
          return fetch(`${this.API_BASE_URL}/api/analytics/track/metric`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
          })
        })
        
        if (!res.ok) {
          const errorJson = await res.json().catch(() => null)
          const error = errorJson?.error || `Error ${res.status}`
          analyticsLogger.error('Failed to track metric', { 
            metric_name: request.metric_name,
            status: res.status,
            error 
          })
          return { success: false, error }
        }
        
        const metric = await res.json()
        analyticsLogger.info('Metric tracked successfully', { 
          metric_id: metric.id,
          metric_name: request.metric_name 
        })
        
        return { success: true, data: metric }
      } catch (error) {
        analyticsLogger.error('Error tracking metric', { 
          metric_name: request.metric_name,
          error: (error as Error).message 
        })
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to track metric',
        }
      }
    })
  }

  static async getEvents(query?: AnalyticsQuery): Promise<AnalyticsResponse<AnalyticsEvent[]>> {
    return this.circuitBreaker.execute(async () => {
      try {
        if (query) {
          validateAnalyticsQuery(query)
        }
        
        analyticsLogger.info('Fetching analytics events', { query })
        
        const token = await getSessionToken()
        const queryParams = new URLSearchParams()
        
        if (query?.startDate) queryParams.append('startDate', query.startDate)
        if (query?.endDate) queryParams.append('endDate', query.endDate)
        if (query?.event_name) queryParams.append('event_name', query.event_name)
        if (query?.user_id !== undefined) queryParams.append('user_id', query.user_id.toString())
        if (query?.limit !== undefined) queryParams.append('limit', query.limit.toString())
        if (query?.offset !== undefined) queryParams.append('offset', query.offset.toString())

        const res = await retryWithBackoff(async () => {
          return fetch(`${this.API_BASE_URL}/api/analytics/events?${queryParams.toString()}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
        })
        
        if (!res.ok) {
          const error = `Error ${res.status}: ${res.statusText}`
          analyticsLogger.error('Failed to fetch events', { status: res.status, error })
          return { success: false, error }
        }
        
        const events = await res.json()
        analyticsLogger.info('Events fetched successfully', { count: events.length })
        
        return { success: true, data: events }
      } catch (error) {
        analyticsLogger.error('Error fetching events', { error: (error as Error).message })
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to get events',
        }
      }
    })
  }

  static async getMetrics(query?: AnalyticsQuery): Promise<AnalyticsResponse<AnalyticsMetric[]>> {
    return this.circuitBreaker.execute(async () => {
      try {
        if (query) {
          validateAnalyticsQuery(query)
        }
        
        analyticsLogger.info('Fetching analytics metrics', { query })
        
        const token = await getSessionToken()
        const queryParams = new URLSearchParams()
        
        if (query?.startDate) queryParams.append('startDate', query.startDate)
        if (query?.endDate) queryParams.append('endDate', query.endDate)
        if (query?.event_name) queryParams.append('event_name', query.event_name)
        if (query?.user_id !== undefined) queryParams.append('user_id', query.user_id.toString())
        if (query?.limit !== undefined) queryParams.append('limit', query.limit.toString())
        if (query?.offset !== undefined) queryParams.append('offset', query.offset.toString())

        const res = await retryWithBackoff(async () => {
          return fetch(`${this.API_BASE_URL}/api/analytics/metrics?${queryParams.toString()}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
        })
        
        if (!res.ok) {
          const error = `Error ${res.status}: ${res.statusText}`
          analyticsLogger.error('Failed to fetch metrics', { status: res.status, error })
          return { success: false, error }
        }
        
        const metrics = await res.json()
        analyticsLogger.info('Metrics fetched successfully', { count: metrics.length })
        
        return { success: true, data: metrics }
      } catch (error) {
        analyticsLogger.error('Error fetching metrics', { error: (error as Error).message })
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to get metrics',
        }
      }
    })
  }

  static async getAnalyticsSummary(): Promise<AnalyticsResponse<AnalyticsSummary>> {
    return this.circuitBreaker.execute(async () => {
      try {
        analyticsLogger.info('Fetching analytics summary')
        
        const token = await getSessionToken()
        const res = await retryWithBackoff(async () => {
          return fetch(`${this.API_BASE_URL}/api/analytics/summary`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
        })
        
        if (!res.ok) {
          const error = `Error ${res.status}: ${res.statusText}`
          analyticsLogger.error('Failed to fetch analytics summary', { status: res.status, error })
          return { success: false, error }
        }
        
        const summary = await res.json()
        analyticsLogger.info('Analytics summary fetched successfully', { 
          total_events: summary.total_events,
          unique_users: summary.unique_users 
        })
        
        return { success: true, data: summary }
      } catch (error) {
        analyticsLogger.error('Error fetching analytics summary', { error: (error as Error).message })
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to get analytics summary',
        }
      }
    })
  }

  static async getUserAnalytics(userId: string): Promise<AnalyticsResponse<UserAnalytics>> {
    return this.circuitBreaker.execute(async () => {
      try {
        if (!userId || typeof userId !== 'string') {
          throw new Error('userId is required and must be a string')
        }
        
        analyticsLogger.info('Fetching user analytics', { user_id: userId })
        
        const token = await getSessionToken()
        const res = await retryWithBackoff(async () => {
          return fetch(`${this.API_BASE_URL}/api/analytics/users/${userId}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
        })
        
        if (!res.ok) {
          const error = `Error ${res.status}: ${res.statusText}`
          analyticsLogger.error('Failed to fetch user analytics', { 
            user_id: userId,
            status: res.status, 
            error 
          })
          return { success: false, error }
        }
        
        const userAnalytics = await res.json()
        analyticsLogger.info('User analytics fetched successfully', { 
          user_id: userId,
          total_events: userAnalytics.total_events 
        })
        
        return { success: true, data: userAnalytics }
      } catch (error) {
        analyticsLogger.error('Error fetching user analytics', { 
          user_id: userId,
          error: (error as Error).message 
        })
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to get user analytics',
        }
      }
    })
  }

  static async getAllAnalytics(): Promise<AnalyticsResponse<AnalyticsEvent[]>> {
    return this.circuitBreaker.execute(async () => {
      try {
        analyticsLogger.info('Fetching all analytics')
        
        const token = await getSessionToken()
        const res = await retryWithBackoff(async () => {
          return fetch(`${this.API_BASE_URL}/api/analytics`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
        })
        
        if (!res.ok) {
          const error = `Error ${res.status}: ${res.statusText}`
          analyticsLogger.error('Failed to fetch all analytics', { status: res.status, error })
          return { success: false, error }
        }
        
        const analytics = await res.json()
        analyticsLogger.info('All analytics fetched successfully', { count: analytics.length })
        
        return { success: true, data: analytics }
      } catch (error) {
        analyticsLogger.error('Error fetching all analytics', { error: (error as Error).message })
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to get all analytics',
        }
      }
    })
  }
} 