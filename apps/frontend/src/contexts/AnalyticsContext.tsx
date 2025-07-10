'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { 
  AnalyticsService, 
  AnalyticsSummary, 
  AnalyticsEvent, 
  AnalyticsMetric,
  UserAnalytics,
  AnalyticsQuery,
  TrackEventRequest,
  TrackMetricRequest
} from '@/services/analytics.service'

interface AnalyticsState {
  summary: AnalyticsSummary | null
  events: AnalyticsEvent[]
  metrics: AnalyticsMetric[]
  userAnalytics: UserAnalytics | null
  loading: boolean
  error: string | null
}

type AnalyticsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SUMMARY'; payload: AnalyticsSummary }
  | { type: 'SET_EVENTS'; payload: AnalyticsEvent[] }
  | { type: 'SET_METRICS'; payload: AnalyticsMetric[] }
  | { type: 'SET_USER_ANALYTICS'; payload: UserAnalytics }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }

interface AnalyticsContextType {
  state: AnalyticsState
  fetchSummary: () => Promise<void>
  fetchEvents: (query?: AnalyticsQuery) => Promise<void>
  fetchMetrics: (query?: AnalyticsQuery) => Promise<void>
  fetchUserAnalytics: (userId: string) => Promise<void>
  trackEvent: (event: TrackEventRequest) => Promise<void>
  trackMetric: (metric: TrackMetricRequest) => Promise<void>
  clearError: () => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

const initialState: AnalyticsState = {
  summary: null,
  events: [],
  metrics: [],
  userAnalytics: null,
  loading: false,
  error: null,
}

function analyticsReducer(state: AnalyticsState, action: AnalyticsAction): AnalyticsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_SUMMARY':
      return { ...state, summary: action.payload, error: null }
    case 'SET_EVENTS':
      return { ...state, events: action.payload, error: null }
    case 'SET_METRICS':
      return { ...state, metrics: action.payload, error: null }
    case 'SET_USER_ANALYTICS':
      return { ...state, userAnalytics: action.payload, error: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [state, dispatch] = useReducer(analyticsReducer, initialState)

  const fetchSummary = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await AnalyticsService.getAnalyticsSummary()
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_SUMMARY', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch analytics summary' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
    }
  }

  const fetchEvents = async (query?: AnalyticsQuery): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await AnalyticsService.getEvents(query)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_EVENTS', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch events' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
    }
  }

  const fetchMetrics = async (query?: AnalyticsQuery): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await AnalyticsService.getMetrics(query)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_METRICS', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch metrics' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
    }
  }

  const fetchUserAnalytics = async (userId: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await AnalyticsService.getUserAnalytics(userId)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_USER_ANALYTICS', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch user analytics' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
    }
  }

  const trackEvent = async (event: TrackEventRequest): Promise<void> => {
    try {
      const response = await AnalyticsService.trackEvent(event)
      
      if (!response.success) {
        console.error('Failed to track event:', response.error)
      }
    } catch (error) {
      console.error('Error tracking event:', error)
    }
  }

  const trackMetric = async (metric: TrackMetricRequest): Promise<void> => {
    try {
      const response = await AnalyticsService.trackMetric(metric)
      
      if (!response.success) {
        console.error('Failed to track metric:', response.error)
      }
    } catch (error) {
      console.error('Error tracking metric:', error)
    }
  }

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  useEffect(() => {
    // Load initial analytics summary
    fetchSummary()
  }, [])

  const value: AnalyticsContextType = {
    state,
    fetchSummary,
    fetchEvents,
    fetchMetrics,
    fetchUserAnalytics,
    trackEvent,
    trackMetric,
    clearError,
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