import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import { SettingsService } from '@/services/SettingsService'
import { Settings, ConnectionState, SettingsAction, SettingsState } from '@/types/settings'

// Circuit breaker configuration
const CIRCUIT_BREAKER_CONFIG = {
  failureThreshold: 3,
  recoveryTimeout: 30000, // 30 seconds
  timeout: 10000, // 10 seconds
}

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
}

interface SettingsContextType extends SettingsState {
  updateSettings: (settings: Partial<Settings>) => Promise<void>
  resetSettings: () => Promise<void>
  exportSettings: () => Promise<string>
  importSettings: (data: string) => Promise<void>
  retryConnection: () => Promise<void>
  clearError: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

// Enhanced reducer with better error handling
const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null }
    
    case 'SET_SETTINGS':
      return { 
        ...state, 
        settings: action.payload, 
        loading: false, 
        error: null,
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_ERROR':
      return { 
        ...state, 
        error: action.payload, 
        loading: false,
        connectionState: 'error'
      }
    
    case 'SET_CONNECTION_STATE':
      return { ...state, connectionState: action.payload }
    
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    
    case 'SET_RETRY_COUNT':
      return { ...state, retryCount: action.payload }
    
    case 'SET_CIRCUIT_BREAKER_STATE':
      return { ...state, circuitBreakerState: action.payload }
    
    default:
      return state
  }
}

// Exponential backoff retry function
const exponentialBackoff = (attempt: number, baseDelay: number, maxDelay: number): number => {
  const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
  return delay + Math.random() * 1000 // Add jitter
}

// Circuit breaker implementation
class CircuitBreaker {
  private failureCount = 0
  private lastFailureTime = 0
  private state: 'closed' | 'open' | 'half-open' = 'closed'

  canExecute(): boolean {
    const now = Date.now()
    
    if (this.state === 'open') {
      if (now - this.lastFailureTime > CIRCUIT_BREAKER_CONFIG.recoveryTimeout) {
        this.state = 'half-open'
        return true
      }
      return false
    }
    
    return true
  }

  onSuccess(): void {
    this.failureCount = 0
    this.state = 'closed'
  }

  onFailure(): void {
    this.failureCount++
    this.lastFailureTime = Date.now()
    
    if (this.failureCount >= CIRCUIT_BREAKER_CONFIG.failureThreshold) {
      this.state = 'open'
    }
  }

  getState(): 'closed' | 'open' | 'half-open' {
    return this.state
  }
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    settings: {
      theme: 'system',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        dataSharing: false,
        analytics: true,
        marketing: false
      },
      performance: {
        autoSave: true,
        cacheEnabled: true,
        compression: true
      }
    },
    loading: false,
    error: null,
    connectionState: 'disconnected',
    retryCount: 0,
    circuitBreakerState: 'closed',
    lastUpdated: null
  })

  const settingsService = useRef(new SettingsService())
  const circuitBreaker = useRef(new CircuitBreaker())
  const retryTimeoutRef = useRef<NodeJS.Timeout>()
  const healthCheckIntervalRef = useRef<NodeJS.Timeout>()

  // Enhanced health check with circuit breaker
  const performHealthCheck = useCallback(async (): Promise<boolean> => {
    try {
      if (!circuitBreaker.current.canExecute()) {
        dispatch({ type: 'SET_CIRCUIT_BREAKER_STATE', payload: circuitBreaker.current.getState() })
        return false
      }

      const isHealthy = await settingsService.current.checkHealth()
      
      if (isHealthy) {
        circuitBreaker.current.onSuccess()
        dispatch({ type: 'SET_CONNECTION_STATE', payload: 'connected' })
        dispatch({ type: 'SET_CIRCUIT_BREAKER_STATE', payload: 'closed' })
        return true
      } else {
        circuitBreaker.current.onFailure()
        dispatch({ type: 'SET_CONNECTION_STATE', payload: 'error' })
        dispatch({ type: 'SET_CIRCUIT_BREAKER_STATE', payload: circuitBreaker.current.getState() })
        return false
      }
    } catch (error) {
      circuitBreaker.current.onFailure()
      dispatch({ type: 'SET_CONNECTION_STATE', payload: 'error' })
      dispatch({ type: 'SET_CIRCUIT_BREAKER_STATE', payload: circuitBreaker.current.getState() })
      return false
    }
  }, [])

  // Enhanced retry logic with exponential backoff
  const retryWithBackoff = useCallback(async <T>(
    operation: () => Promise<T>,
    maxRetries: number = RETRY_CONFIG.maxRetries
  ): Promise<T> => {
    let lastError: Error
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        dispatch({ type: 'SET_RETRY_COUNT', payload: attempt })
        
        // Add timeout to operation
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Operation timeout')), CIRCUIT_BREAKER_CONFIG.timeout)
        })
        
        const result = await Promise.race([operation(), timeoutPromise])
        dispatch({ type: 'SET_RETRY_COUNT', payload: 0 })
        return result
      } catch (error) {
        lastError = error as Error
        
        if (attempt === maxRetries) {
          break
        }
        
        const delay = exponentialBackoff(attempt, RETRY_CONFIG.baseDelay, RETRY_CONFIG.maxDelay)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    
    throw lastError!
  }, [])

  // Enhanced settings update with validation and retry
  const updateSettings = useCallback(async (newSettings: Partial<Settings>): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERROR' })

    try {
      // Validate settings before sending
      const validatedSettings = validateSettings(newSettings)
      
      await retryWithBackoff(async () => {
        const updatedSettings = await settingsService.current.updateSettings(validatedSettings)
        dispatch({ type: 'SET_SETTINGS', payload: updatedSettings })
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [retryWithBackoff])

  // Enhanced reset with confirmation
  const resetSettings = useCallback(async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERROR' })

    try {
      await retryWithBackoff(async () => {
        const defaultSettings = await settingsService.current.resetSettings()
        dispatch({ type: 'SET_SETTINGS', payload: defaultSettings })
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reset settings'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [retryWithBackoff])

  // Enhanced export with error handling
  const exportSettings = useCallback(async (): Promise<string> => {
    try {
      return await settingsService.current.exportSettings()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to export settings'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [])

  // Enhanced import with validation
  const importSettings = useCallback(async (data: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERROR' })

    try {
      // Validate imported data
      const parsedSettings = validateImportedData(data)
      
      await retryWithBackoff(async () => {
        const updatedSettings = await settingsService.current.importSettings(parsedSettings)
        dispatch({ type: 'SET_SETTINGS', payload: updatedSettings })
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to import settings'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [retryWithBackoff])

  // Enhanced retry connection
  const retryConnection = useCallback(async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERROR' })

    try {
      await retryWithBackoff(async () => {
        const isHealthy = await performHealthCheck()
        if (!isHealthy) {
          throw new Error('Health check failed')
        }
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reconnect'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [performHealthCheck, retryWithBackoff])

  // Clear error manually
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  // Enhanced initialization with retry
  useEffect(() => {
    const initializeSettings = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      try {
        await retryWithBackoff(async () => {
          const settings = await settingsService.current.getSettings()
          dispatch({ type: 'SET_SETTINGS', payload: settings })
        })
        
        // Perform initial health check
        await performHealthCheck()
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to initialize settings'
        dispatch({ type: 'SET_ERROR', payload: errorMessage })
      }
    }

    initializeSettings()
  }, [retryWithBackoff, performHealthCheck])

  // Enhanced health check interval
  useEffect(() => {
    healthCheckIntervalRef.current = setInterval(async () => {
      await performHealthCheck()
    }, 30000) // Check every 30 seconds

    return () => {
      if (healthCheckIntervalRef.current) {
        clearInterval(healthCheckIntervalRef.current)
      }
    }
  }, [performHealthCheck])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
      if (healthCheckIntervalRef.current) {
        clearInterval(healthCheckIntervalRef.current)
      }
    }
  }, [])

  const contextValue: SettingsContextType = {
    ...state,
    updateSettings,
    resetSettings,
    exportSettings,
    importSettings,
    retryConnection,
    clearError
  }

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}

// Validation functions
const validateSettings = (settings: Partial<Settings>): Partial<Settings> => {
  const validated: Partial<Settings> = {}

  if (settings.theme && ['light', 'dark', 'system'].includes(settings.theme)) {
    validated.theme = settings.theme
  }

  if (settings.language && typeof settings.language === 'string') {
    validated.language = settings.language
  }

  if (settings.notifications) {
    validated.notifications = {
      email: typeof settings.notifications.email === 'boolean' ? settings.notifications.email : true,
      push: typeof settings.notifications.push === 'boolean' ? settings.notifications.push : true,
      sms: typeof settings.notifications.sms === 'boolean' ? settings.notifications.sms : false
    }
  }

  if (settings.privacy) {
    validated.privacy = {
      dataSharing: typeof settings.privacy.dataSharing === 'boolean' ? settings.privacy.dataSharing : false,
      analytics: typeof settings.privacy.analytics === 'boolean' ? settings.privacy.analytics : true,
      marketing: typeof settings.privacy.marketing === 'boolean' ? settings.privacy.marketing : false
    }
  }

  if (settings.performance) {
    validated.performance = {
      autoSave: typeof settings.performance.autoSave === 'boolean' ? settings.performance.autoSave : true,
      cacheEnabled: typeof settings.performance.cacheEnabled === 'boolean' ? settings.performance.cacheEnabled : true,
      compression: typeof settings.performance.compression === 'boolean' ? settings.performance.compression : true
    }
  }

  return validated
}

const validateImportedData = (data: string): Settings => {
  try {
    const parsed = JSON.parse(data)
    
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Invalid data format')
    }

    // Validate required fields
    const requiredFields = ['theme', 'language', 'notifications', 'privacy', 'performance']
    for (const field of requiredFields) {
      if (!(field in parsed)) {
        throw new Error(`Missing required field: ${field}`)
      }
    }

    return validateSettings(parsed) as Settings
  } catch (error) {
    throw new Error(`Invalid settings data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
} 