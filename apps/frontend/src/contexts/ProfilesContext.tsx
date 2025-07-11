import React, { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react'
import { ProfilesService, type UserProfile, type ProfileUpdateData, type ServiceHealth } from '../services/profiles.service'

type ConnectionStatus = 'connected' | 'connecting' | 'error' | 'disconnected'

interface ProfilesState {
  currentProfile: UserProfile | null
  profiles: UserProfile[]
  loading: boolean
  error: string | null
  connectionStatus: ConnectionStatus
  lastUpdated: string | null
  circuitBreakerState: {
    failures: number
    lastFailureTime: number
    state: 'CLOSED' | 'OPEN' | 'HALF_OPEN'
  }
  activity: Array<{
    id: string
    type: string
    description: string
    timestamp: string
  }>
  searchResults: UserProfile[]
  searchLoading: boolean
}

type ProfilesAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_PROFILE'; payload: UserProfile }
  | { type: 'SET_PROFILES'; payload: UserProfile[] }
  | { type: 'UPDATE_PROFILE'; payload: UserProfile }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_CONNECTION_STATUS'; payload: ConnectionStatus }
  | { type: 'SET_LAST_UPDATED'; payload: string }
  | { type: 'SET_CIRCUIT_BREAKER_STATE'; payload: ProfilesState['circuitBreakerState'] }
  | { type: 'SET_ACTIVITY'; payload: ProfilesState['activity'] }
  | { type: 'SET_SEARCH_RESULTS'; payload: UserProfile[] }
  | { type: 'SET_SEARCH_LOADING'; payload: boolean }
  | { type: 'RESET_PROFILES_DATA' }

interface ProfilesContextType {
  state: ProfilesState
  // Profile operations
  getCurrentProfile: () => Promise<void>
  getProfileById: (profileId: string) => Promise<UserProfile | null>
  updateProfile: (updateData: ProfileUpdateData) => Promise<boolean>
  uploadAvatar: (file: File) => Promise<boolean>
  deleteAvatar: () => Promise<boolean>
  
  // Activity operations
  getActivity: (limit?: number, offset?: number) => Promise<void>
  
  // Search operations
  searchProfiles: (query: string, limit?: number, offset?: number) => Promise<void>
  
  // Utility operations
  clearError: () => void
  retryConnection: () => Promise<void>
  refreshData: () => Promise<void>
  resetCircuitBreaker: () => void
}

const initialState: ProfilesState = {
  currentProfile: null,
  profiles: [],
  loading: false,
  error: null,
  connectionStatus: 'disconnected',
  lastUpdated: null,
  circuitBreakerState: {
    failures: 0,
    lastFailureTime: 0,
    state: 'CLOSED',
  },
  activity: [],
  searchResults: [],
  searchLoading: false,
}

function profilesReducer(state: ProfilesState, action: ProfilesAction): ProfilesState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_CURRENT_PROFILE':
      return { 
        ...state, 
        currentProfile: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_PROFILES':
      return { 
        ...state, 
        profiles: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'UPDATE_PROFILE':
      return { 
        ...state, 
        currentProfile: action.payload,
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
    
    case 'SET_ACTIVITY':
      return { 
        ...state, 
        activity: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_SEARCH_RESULTS':
      return { 
        ...state, 
        searchResults: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_SEARCH_LOADING':
      return { ...state, searchLoading: action.payload }
    
    case 'RESET_PROFILES_DATA':
      return {
        ...state,
        currentProfile: null,
        profiles: [],
        activity: [],
        searchResults: [],
        lastUpdated: null,
      }
    
    default:
      return state
  }
}

const ProfilesContext = createContext<ProfilesContextType | undefined>(undefined)

interface ProfilesProviderProps {
  children: ReactNode
}

export function ProfilesProvider({ children }: ProfilesProviderProps) {
  const [state, dispatch] = useReducer(profilesReducer, initialState)

  // Circuit breaker monitoring
  const updateCircuitBreakerState = useCallback(() => {
    const circuitState = ProfilesService.getCircuitBreakerState()
    dispatch({ type: 'SET_CIRCUIT_BREAKER_STATE', payload: circuitState })
  }, [])

  // Health check and connection management
  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      const health = await ProfilesService.checkHealth()
      
      if (health.isHealthy) {
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
        dispatch({ type: 'CLEAR_ERROR' })
      } else {
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
        dispatch({ type: 'SET_ERROR', payload: 'Service is unhealthy' })
      }
      
      updateCircuitBreakerState()
      return health.isHealthy
    } catch (error) {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Connection failed' 
      })
      updateCircuitBreakerState()
      return false
    }
  }, [updateCircuitBreakerState])

  // Get current user profile
  const getCurrentProfile = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      
      const response = await ProfilesService.getCurrentProfile()
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_CURRENT_PROFILE', payload: response.data as UserProfile })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch profile' })
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

  // Get profile by ID
  const getProfileById = useCallback(async (profileId: string): Promise<UserProfile | null> => {
    try {
      const response = await ProfilesService.getProfileById(profileId)
      
      if (response.success && response.data) {
        return response.data as UserProfile
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch profile' })
        return null
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch profile' 
      })
      return null
    } finally {
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Update current user profile
  const updateProfile = useCallback(async (updateData: ProfileUpdateData): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await ProfilesService.updateProfile(updateData)
      
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_PROFILE', payload: response.data as UserProfile })
        return true
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to update profile' })
        return false
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to update profile' 
      })
      return false
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Upload avatar
  const uploadAvatar = useCallback(async (file: File): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await ProfilesService.uploadAvatar(file)
      
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_PROFILE', payload: response.data as UserProfile })
        return true
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to upload avatar' })
        return false
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to upload avatar' 
      })
      return false
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Delete avatar
  const deleteAvatar = useCallback(async (): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await ProfilesService.deleteAvatar()
      
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_PROFILE', payload: response.data as UserProfile })
        return true
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to delete avatar' })
        return false
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to delete avatar' 
      })
      return false
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Get user activity
  const getActivity = useCallback(async (limit = 10, offset = 0): Promise<void> => {
    try {
      const response = await ProfilesService.getActivity(limit, offset)
      
      if (response.success && response.data) {
        // Assuming the response contains activity data
        const activityData = Array.isArray(response.data) ? [] : []
        dispatch({ type: 'SET_ACTIVITY', payload: activityData })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch activity' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch activity' 
      })
    } finally {
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Search profiles
  const searchProfiles = useCallback(async (query: string, limit = 10, offset = 0): Promise<void> => {
    try {
      dispatch({ type: 'SET_SEARCH_LOADING', payload: true })
      const response = await ProfilesService.searchProfiles(query, limit, offset)
      
      if (response.success && response.data) {
        const profiles = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: profiles })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to search profiles' })
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to search profiles' 
      })
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] })
    } finally {
      dispatch({ type: 'SET_SEARCH_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Utility operations
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  const retryConnection = useCallback(async (): Promise<void> => {
    await checkConnection()
  }, [checkConnection])

  const refreshData = useCallback(async (): Promise<void> => {
    await Promise.all([
      getCurrentProfile(),
      getActivity(),
    ])
  }, [getCurrentProfile, getActivity])

  const resetCircuitBreaker = useCallback(() => {
    ProfilesService.resetCircuitBreaker()
    updateCircuitBreakerState()
  }, [updateCircuitBreakerState])

  // Auto-refresh profile data every 5 minutes
  useEffect(() => {
    const initializeProfiles = async () => {
      await checkConnection()
      await getCurrentProfile()
      await getActivity()
    }

    initializeProfiles()

    const interval = setInterval(() => {
      checkConnection()
    }, 300000) // Check every 5 minutes

    return () => clearInterval(interval)
  }, [checkConnection, getCurrentProfile, getActivity])

  const value: ProfilesContextType = {
    state,
    getCurrentProfile,
    getProfileById,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
    getActivity,
    searchProfiles,
    clearError,
    retryConnection,
    refreshData,
    resetCircuitBreaker,
  }

  return (
    <ProfilesContext.Provider value={value}>
      {children}
    </ProfilesContext.Provider>
  )
}

export function useProfiles(): ProfilesContextType {
  const context = useContext(ProfilesContext)
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfilesProvider')
  }
  return context
} 