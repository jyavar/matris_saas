'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react'
import { 
  AnalyticsService, 
  AnalyticsSummary, 
  AnalyticsEvent, 
  AnalyticsMetric,
  UserAnalytics,
  AnalyticsQuery,
  TrackEventRequest,
  TrackMetricRequest,
  AnalyticsHealth
} from '@/services/analytics.service'

interface AnalyticsState {
  summary: AnalyticsSummary | null
  events: AnalyticsEvent[]
  metrics: AnalyticsMetric[]
  userAnalytics: UserAnalytics | null
  loading: boolean
  error: string | null
  connectionStatus: 'connected' | 'connecting' | 'disconnected' | 'error'
  health: AnalyticsHealth | null
  lastSync: string | null
  retryCount: number
}

type AnalyticsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SUMMARY'; payload: AnalyticsSummary }
  | { type: 'SET_EVENTS'; payload: AnalyticsEvent[] }
  | { type: 'SET_METRICS'; payload: AnalyticsMetric[] }
  | { type: 'SET_USER_ANALYTICS'; payload: UserAnalytics }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_CONNECTION_STATUS'; payload: AnalyticsState['connectionStatus'] }
  | { type: 'SET_HEALTH'; payload: AnalyticsHealth }
  | { type: 'SET_LAST_SYNC'; payload: string }
  | { type: 'INCREMENT_RETRY_COUNT' }
  | { type: 'RESET_RETRY_COUNT' }

interface AnalyticsContextType {
  state: AnalyticsState
  fetchSummary: () => Promise<void>
  fetchEvents: (query?: AnalyticsQuery) => Promise<void>
  fetchMetrics: (query?: AnalyticsQuery) => Promise<void>
  fetchUserAnalytics: (userId: string) => Promise<void>
  trackEvent: (event: TrackEventRequest) => Promise<void>
  trackMetric: (metric: TrackMetricRequest) => Promise<void>
  clearError: () => void
  checkHealth: () => Promise<void>
  reconnect: () => Promise<void>
  isConnected: boolean
  isHealthy: boolean
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

const initialState: AnalyticsState = {
  summary: null,
  events: [],
  metrics: [],
  userAnalytics: null,
  loading: false,
  error: null,
  connectionStatus: 'disconnected',
  health: null,
  lastSync: null,
  retryCount: 0,
}

function analyticsReducer(state: AnalyticsState, action: AnalyticsAction): AnalyticsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_SUMMARY':
      return { 
        ...state, 
        summary: action.payload, 
        error: null,
        lastSync: new Date().toISOString(),
        retryCount: 0
      }
    case 'SET_EVENTS':
      return { 
        ...state, 
        events: action.payload, 
        error: null,
        lastSync: new Date().toISOString(),
        retryCount: 0
      }
    case 'SET_METRICS':
      return { 
        ...state, 
        metrics: action.payload, 
        error: null,
        lastSync: new Date().toISOString(),
        retryCount: 0
      }
    case 'SET_USER_ANALYTICS':
      return { 
        ...state, 
        userAnalytics: action.payload, 
        error: null,
        lastSync: new Date().toISOString(),
        retryCount: 0
      }
    case 'SET_ERROR':
      return { 
        ...state, 
        error: action.payload, 
        loading: false,
        connectionStatus: 'error'
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    case 'SET_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload }
    case 'SET_HEALTH':
      return { ...state, health: action.payload }
    case 'SET_LAST_SYNC':
      return { ...state, lastSync: action.payload }
    case 'INCREMENT_RETRY_COUNT':
      return { ...state, retryCount: state.retryCount + 1 }
    case 'RESET_RETRY_COUNT':
      return { ...state, retryCount: 0 }
    default:
      return state
  }
}

interface AnalyticsProviderProps {
  children: ReactNode
}

// Wrapper para operaciones con reintentos (fuera del componente)
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: Error
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      if (attempt === maxRetries) {
        throw lastError
      }
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000
      await new Promise(resolve => setTimeout(resolve, delay))
      console.warn(`Analytics operation failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`)
    }
  }
  throw lastError!
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [state, dispatch] = useReducer(analyticsReducer, initialState)

  // Health check con reintentos
  const checkHealth = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      
      const health = await AnalyticsService.healthCheck()
      dispatch({ type: 'SET_HEALTH', payload: health })
      
      if (health.status === 'healthy') {
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
        dispatch({ type: 'RESET_RETRY_COUNT' })
      } else {
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
        console.warn('Analytics health check failed:', health)
      }
    } catch (error) {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      console.error('Analytics health check error:', error)
    }
  }, [])

  // Reconnect logic
  const reconnect = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      dispatch({ type: 'INCREMENT_RETRY_COUNT' })
      
      await checkHealth()
      
      if (state.connectionStatus === 'connected') {
        // Reload data after successful reconnection
        await fetchSummary()
      }
    } catch (error) {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      console.error('Reconnection failed:', error)
    }
  }, [checkHealth, state.connectionStatus])

  const fetchSummary = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      
      const response = await withRetry(() => AnalyticsService.getAnalyticsSummary())
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_SUMMARY', payload: response.data })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch analytics summary' })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const fetchEvents = useCallback(async (query?: AnalyticsQuery): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      
      const response = await withRetry(() => AnalyticsService.getEvents(query))
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_EVENTS', payload: response.data })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch events' })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const fetchMetrics = useCallback(async (query?: AnalyticsQuery): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      
      const response = await withRetry(() => AnalyticsService.getMetrics(query))
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_METRICS', payload: response.data })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch metrics' })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const fetchUserAnalytics = useCallback(async (userId: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      
      const response = await withRetry(() => AnalyticsService.getUserAnalytics(userId))
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_USER_ANALYTICS', payload: response.data })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch user analytics' })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const trackEvent = useCallback(async (event: TrackEventRequest): Promise<void> => {
    try {
      const response = await withRetry(() => AnalyticsService.trackEvent(event))
      
      if (!response.success) {
        console.error('Failed to track event:', response.error)
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to track event' })
      } else {
        console.log('Event tracked successfully:', event.event_name)
      }
    } catch (error) {
      console.error('Error tracking event:', error)
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to track event' 
      })
    }
  }, [])

  const trackMetric = useCallback(async (metric: TrackMetricRequest): Promise<void> => {
    try {
      const response = await withRetry(() => AnalyticsService.trackMetric(metric))
      
      if (!response.success) {
        console.error('Failed to track metric:', response.error)
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to track metric' })
      } else {
        console.log('Metric tracked successfully:', metric.metric_name)
      }
    } catch (error) {
      console.error('Error tracking metric:', error)
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to track metric' 
      })
    }
  }, [])

  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  // Computed properties
  const isConnected = state.connectionStatus === 'connected'
  const isHealthy = state.health?.status === 'healthy'

  // Auto-reconnect logic
  useEffect(() => {
    if (state.connectionStatus === 'error' && state.retryCount < 3) {
      const timer = setTimeout(() => {
        reconnect()
      }, Math.pow(2, state.retryCount) * 5000) // Exponential backoff: 5s, 10s, 20s
      
      return () => clearTimeout(timer)
    }
  }, [state.connectionStatus, state.retryCount, reconnect])

  // Initial health check and data load
  useEffect(() => {
    const initializeAnalytics = async () => {
      await checkHealth()
      if (isConnected) {
        await fetchSummary()
      }
    }
    
    initializeAnalytics()
  }, [checkHealth, fetchSummary, isConnected])

  // Periodic health checks
  useEffect(() => {
    const healthCheckInterval = setInterval(() => {
      if (state.connectionStatus !== 'connecting') {
        checkHealth()
      }
    }, 30000) // Check every 30 seconds
    
    return () => clearInterval(healthCheckInterval)
  }, [checkHealth, state.connectionStatus])

  const value: AnalyticsContextType = {
    state,
    fetchSummary,
    fetchEvents,
    fetchMetrics,
    fetchUserAnalytics,
    trackEvent,
    trackMetric,
    clearError,
    checkHealth,
    reconnect,
    isConnected,
    isHealthy,
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics(): AnalyticsContextType {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
} 