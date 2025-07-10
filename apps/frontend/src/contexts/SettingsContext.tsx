import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { SettingsService, UserSettings, TeamSettings, SystemSettings, UpdateSettingsRequest } from '@/services/settings.service'

// Types
interface SettingsState {
  userSettings: UserSettings | null
  teamSettings: TeamSettings | null
  systemSettings: SystemSettings | null
  loading: boolean
  error: string | null
}

type SettingsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER_SETTINGS'; payload: UserSettings }
  | { type: 'SET_TEAM_SETTINGS'; payload: TeamSettings }
  | { type: 'SET_SYSTEM_SETTINGS'; payload: SystemSettings }
  | { type: 'UPDATE_USER_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'UPDATE_TEAM_SETTINGS'; payload: Partial<TeamSettings> }
  | { type: 'UPDATE_SYSTEM_SETTINGS'; payload: Partial<SystemSettings> }

interface SettingsContextType {
  state: SettingsState
  loadUserSettings: (userId: string) => Promise<void>
  loadTeamSettings: (teamId: string) => Promise<void>
  loadSystemSettings: () => Promise<void>
  updateUserSettings: (userId: string, updates: UpdateSettingsRequest) => Promise<void>
  updateTeamSettings: (teamId: string, updates: Partial<TeamSettings>) => Promise<void>
  updateSystemSettings: (updates: Partial<SystemSettings>) => Promise<void>
  exportSettings: (userId: string) => Promise<string | null>
  importSettings: (userId: string, settingsData: string) => Promise<void>
  clearError: () => void
}

// Initial state
const initialState: SettingsState = {
  userSettings: null,
  teamSettings: null,
  systemSettings: null,
  loading: false,
  error: null,
}

// Reducer
function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_USER_SETTINGS':
      return { ...state, userSettings: action.payload, error: null }
    case 'SET_TEAM_SETTINGS':
      return { ...state, teamSettings: action.payload, error: null }
    case 'SET_SYSTEM_SETTINGS':
      return { ...state, systemSettings: action.payload, error: null }
    case 'UPDATE_USER_SETTINGS':
      return {
        ...state,
        userSettings: state.userSettings ? { ...state.userSettings, ...action.payload } : null,
        error: null,
      }
    case 'UPDATE_TEAM_SETTINGS':
      return {
        ...state,
        teamSettings: state.teamSettings ? { ...state.teamSettings, ...action.payload } : null,
        error: null,
      }
    case 'UPDATE_SYSTEM_SETTINGS':
      return {
        ...state,
        systemSettings: state.systemSettings ? { ...state.systemSettings, ...action.payload } : null,
        error: null,
      }
    default:
      return state
  }
}

// Context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

// Provider component
interface SettingsProviderProps {
  children: ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = useReducer(settingsReducer, initialState)

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }

  const loadUserSettings = async (userId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await SettingsService.getUserSettings(userId)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_USER_SETTINGS', payload: response.data })
      } else {
        setError(response.error || 'Failed to load user settings')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load user settings')
    } finally {
      setLoading(false)
    }
  }

  const loadTeamSettings = async (teamId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await SettingsService.getTeamSettings(teamId)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_TEAM_SETTINGS', payload: response.data })
      } else {
        setError(response.error || 'Failed to load team settings')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load team settings')
    } finally {
      setLoading(false)
    }
  }

  const loadSystemSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await SettingsService.getSystemSettings()
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_SYSTEM_SETTINGS', payload: response.data })
      } else {
        setError(response.error || 'Failed to load system settings')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load system settings')
    } finally {
      setLoading(false)
    }
  }

  const updateUserSettings = async (userId: string, updates: UpdateSettingsRequest) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await SettingsService.updateUserSettings(userId, updates)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_USER_SETTINGS', payload: response.data })
      } else {
        setError(response.error || 'Failed to update user settings')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update user settings')
    } finally {
      setLoading(false)
    }
  }

  const updateTeamSettings = async (teamId: string, updates: Partial<TeamSettings>) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await SettingsService.updateTeamSettings(teamId, updates)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_TEAM_SETTINGS', payload: response.data })
      } else {
        setError(response.error || 'Failed to update team settings')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update team settings')
    } finally {
      setLoading(false)
    }
  }

  const updateSystemSettings = async (updates: Partial<SystemSettings>) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await SettingsService.updateSystemSettings(updates)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_SYSTEM_SETTINGS', payload: response.data })
      } else {
        setError(response.error || 'Failed to update system settings')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update system settings')
    } finally {
      setLoading(false)
    }
  }

  const exportSettings = async (userId: string): Promise<string | null> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await SettingsService.exportSettings(userId)
      
      if (response.success && response.data) {
        return response.data
      } else {
        setError(response.error || 'Failed to export settings')
        return null
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to export settings')
      return null
    } finally {
      setLoading(false)
    }
  }

  const importSettings = async (userId: string, settingsData: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await SettingsService.importSettings(userId, settingsData)
      
      if (response.success) {
        // Reload user settings after import
        await loadUserSettings(userId)
      } else {
        setError(response.error || 'Failed to import settings')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to import settings')
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value: SettingsContextType = {
    state,
    loadUserSettings,
    loadTeamSettings,
    loadSystemSettings,
    updateUserSettings,
    updateTeamSettings,
    updateSystemSettings,
    exportSettings,
    importSettings,
    clearError,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

// Hook
export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
} 