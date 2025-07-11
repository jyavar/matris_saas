import React, { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react'
import { HealthService, type HealthStatus, type HealthMetrics, type ServiceHealth } from '../services/health.service'

type ConnectionStatus = 'connected' | 'connecting' | 'error' | 'disconnected'

interface HealthState {
  healthStatus: HealthStatus | null
  healthMetrics: HealthMetrics | null
  loading: boolean
  error: string | null
  connectionStatus: ConnectionStatus
  lastUpdated: string | null
  circuitBreakerState: {
    failures: number
    lastFailureTime: number
    state: 'CLOSED' | 'OPEN' | 'HALF_OPEN'
  }
  serviceHealth: {
    [key: string]: ServiceHealth
  }
}

type HealthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_HEALTH_STATUS'; payload: HealthStatus }
  | { type: 'SET_HEALTH_METRICS'; payload: HealthMetrics }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_CONNECTION_STATUS'; payload: ConnectionStatus }
  | { type: 'SET_LAST_UPDATED'; payload: string }
  | { type: 'SET_CIRCUIT_BREAKER_STATE'; payload: HealthState['circuitBreakerState'] }
  | { type: 'UPDATE_SERVICE_HEALTH'; payload: { service: string; health: ServiceHealth } }
  | { type: 'RESET_HEALTH_DATA' }

interface HealthContextType {
  state: HealthState
  // Health operations
  checkHealth: () => Promise<boolean>
  getHealthStatus: () => Promise<void>
  getHealthMetrics: () => Promise<void>
  checkServiceHealth: (serviceName: string) => Promise<void>
  
  // Utility operations
  clearError: () => void
  retryConnection: () => Promise<void>
  refreshData: () => Promise<void>
  resetCircuitBreaker: () => void
}

const initialState: HealthState = {
  healthStatus: null,
  healthMetrics: null,
  loading: false,
  error: null,
  connectionStatus: 'disconnected',
  lastUpdated: null,
  circuitBreakerState: {
    failures: 0,
    lastFailureTime: 0,
    state: 'CLOSED',
  },
  serviceHealth: {},
}

function healthReducer(state: HealthState, action: HealthAction): HealthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_HEALTH_STATUS':
      return { 
        ...state, 
        healthStatus: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_HEALTH_METRICS':
      return { 
        ...state, 
        healthMetrics: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    
    case 'SET_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload }
    
    case 'SET_LAST_UPDATED':
      return { ...state, lastUpdated: action.payload }
    
    case 'SET_CIRCUIT_BREAKER_STATE':
      return { ...state, circuitBreakerState: action.payload }
    
    case 'UPDATE_SERVICE_HEALTH':
      return {
        ...state,
        serviceHealth: {
          ...state.serviceHealth,
          [action.payload.service]: action.payload.health,
        },
      }
    
    case 'RESET_HEALTH_DATA':
      return {
        ...state,
        healthStatus: null,
        healthMetrics: null,
        serviceHealth: {},
        lastUpdated: null,
      }
    
    default:
      return state
  }
}

const HealthContext = createContext<HealthContextType | undefined>(undefined)

interface HealthProviderProps {
  children: ReactNode
}

export function HealthProvider({ children }: HealthProviderProps) {
  const [state, dispatch] = useReducer(healthReducer, initialState)

  // Health check and circuit breaker monitoring
  const updateCircuitBreakerState = useCallback(() => {
    const circuitState = HealthService.getCircuitBreakerState()
    dispatch({ type: 'SET_CIRCUIT_BREAKER_STATE', payload: circuitState })
  }, [])

  const checkHealth = useCallback(async (): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      const health = await HealthService.checkHealth()
      
      if (health.isHealthy) {
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
        dispatch({ type: 'CLEAR_ERROR' })
      } else {
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
        dispatch({ type: 'SET_ERROR', payload: 'Health check failed' })
      }
      
      updateCircuitBreakerState()
      return health.isHealthy
    } catch (error) {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Health check failed' 
      })
      updateCircuitBreakerState()
      return false
    }
  }, [updateCircuitBreakerState])

  // Get detailed health status
  const getHealthStatus = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      
      const response = await HealthService.getHealthStatus()
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_HEALTH_STATUS', payload: response.data as HealthStatus })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch health status' })
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
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Get health metrics
  const getHealthMetrics = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await HealthService.getHealthMetrics()
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_HEALTH_METRICS', payload: response.data as HealthMetrics })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch health metrics' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch health metrics' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Check specific service health
  const checkServiceHealth = useCallback(async (serviceName: string): Promise<void> => {
    try {
      const response = await HealthService.checkServiceHealth(serviceName)
      
      if (response.success && response.data) {
        const health = await HealthService.checkHealth()
        dispatch({ 
          type: 'UPDATE_SERVICE_HEALTH', 
          payload: { 
            service: serviceName, 
            health 
          } 
        })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to check service health' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to check service health' 
      })
    } finally {
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Utility operations
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  const retryConnection = useCallback(async (): Promise<void> => {
    await checkHealth()
  }, [checkHealth])

  const refreshData = useCallback(async (): Promise<void> => {
    await Promise.all([
      getHealthStatus(),
      getHealthMetrics(),
    ])
  }, [getHealthStatus, getHealthMetrics])

  const resetCircuitBreaker = useCallback(() => {
    HealthService.resetCircuitBreaker()
    updateCircuitBreakerState()
  }, [updateCircuitBreakerState])

  // Auto-refresh health data every 30 seconds
  useEffect(() => {
    const initializeHealth = async () => {
      await checkHealth()
      await getHealthStatus()
      await getHealthMetrics()
    }

    initializeHealth()

    const interval = setInterval(() => {
      checkHealth()
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [checkHealth, getHealthStatus, getHealthMetrics])

  const value: HealthContextType = {
    state,
    checkHealth,
    getHealthStatus,
    getHealthMetrics,
    checkServiceHealth,
    clearError,
    retryConnection,
    refreshData,
    resetCircuitBreaker,
  }

  return (
    <HealthContext.Provider value={value}>
      {children}
    </HealthContext.Provider>
  )
}

export function useHealth(): HealthContextType {
  const context = useContext(HealthContext)
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider')
  }
  return context
} 