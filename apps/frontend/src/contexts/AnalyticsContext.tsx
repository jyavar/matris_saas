'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { AnalyticsService, AnalyticsData, ChartData, AnalyticsFilters, AnalyticsEvent } from '@/services/analytics.service'

interface AnalyticsState {
  analyticsData: AnalyticsData | null
  chartData: ChartData | null
  loading: boolean
  error: string | null
}

type AnalyticsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ANALYTICS_DATA'; payload: { data: AnalyticsData; chartData: ChartData } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }

interface AnalyticsContextType {
  state: AnalyticsState
  fetchAnalyticsData: (filters: AnalyticsFilters) => Promise<void>
  trackEvent: (event: AnalyticsEvent) => Promise<void>
  exportReport: (filters: AnalyticsFilters) => Promise<string | null>
  clearError: () => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

const initialState: AnalyticsState = {
  analyticsData: null,
  chartData: null,
  loading: false,
  error: null,
}

function analyticsReducer(state: AnalyticsState, action: AnalyticsAction): AnalyticsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ANALYTICS_DATA':
      return { 
        ...state, 
        analyticsData: action.payload.data, 
        chartData: action.payload.chartData, 
        error: null 
      }
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

  const fetchAnalyticsData = async (filters: AnalyticsFilters): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await AnalyticsService.getAnalyticsData(filters)
      
      if (response.success && response.data && response.chartData) {
        dispatch({ 
          type: 'SET_ANALYTICS_DATA', 
          payload: { 
            data: response.data, 
            chartData: response.chartData 
          } 
        })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch analytics data' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
    }
  }

  const trackEvent = async (event: AnalyticsEvent): Promise<void> => {
    try {
      const response = await AnalyticsService.trackEvent(event)
      
      if (!response.success) {
        console.error('Failed to track event:', response.error)
      }
    } catch (error) {
      console.error('Error tracking event:', error)
    }
  }

  const exportReport = async (filters: AnalyticsFilters): Promise<string | null> => {
    try {
      const response = await AnalyticsService.exportReport(filters)
      
      if (response.success && response.data) {
        return response.data
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to export report' })
        return null
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
      return null
    }
  }

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  useEffect(() => {
    // Load initial analytics data with default filters
    fetchAnalyticsData({ timeRange: '30d' })
  }, [])

  const value: AnalyticsContextType = {
    state,
    fetchAnalyticsData,
    trackEvent,
    exportReport,
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