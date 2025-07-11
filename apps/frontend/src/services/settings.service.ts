// Settings service for frontend
import { getSessionToken } from '@/lib/supabase'

// Types matching backend
export interface UserSettings {
  id: string
  user_id: string
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profile_visibility: 'public' | 'private' | 'team'
    data_sharing: boolean
  }
  preferences: {
    timezone: string
    date_format: string
    currency: string
  }
  created_at: string
  updated_at: string
}

export interface SettingsResponse {
  success: boolean
  data?: UserSettings
  error?: string
}

export interface UpdateSettingsRequest {
  theme?: UserSettings['theme']
  language?: string
  notifications?: Partial<UserSettings['notifications']>
  privacy?: Partial<UserSettings['privacy']>
  preferences?: Partial<UserSettings['preferences']>
}

export interface TeamSettings {
  id: string
  team_id: string
  name: string
  description: string
  permissions: {
    invite_members: boolean
    manage_billing: boolean
    view_analytics: boolean
  }
  features: {
    advanced_analytics: boolean
    custom_branding: boolean
    api_access: boolean
  }
  created_at: string
  updated_at: string
}

export interface SystemSettings {
  id: string
  maintenance_mode: boolean
  feature_flags: Record<string, boolean>
  integrations: {
    stripe_enabled: boolean
    posthog_enabled: boolean
    resend_enabled: boolean
  }
  created_at: string
  updated_at: string
}

// Configuration validation
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Validate API configuration
if (!API_BASE_URL) {
  console.error('STRATO Settings: NEXT_PUBLIC_API_URL is not configured')
}

// Debug logging helper
const debugLog = (message: string, data?: unknown) => {
  if (process.env.NEXT_PUBLIC_ENABLE_DEBUG_LOGS === 'true') {
    console.log(`[STRATO Settings] ${message}`, data)
  }
}

class SettingsService {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      debugLog(`Making request to: ${API_BASE_URL}${endpoint}`)
      
      const token = await getSessionToken()
      if (!token) {
        debugLog('No authentication token found')
        return { success: false, error: 'No authentication token. Please log in again.' }
      }

      const url = `${API_BASE_URL}${endpoint}`
      debugLog(`Request URL: ${url}`)

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      })

      debugLog(`Response status: ${response.status}`)

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result.error || `HTTP ${response.status}: ${response.statusText}`
        debugLog(`Request failed: ${errorMessage}`)
        
        // Handle specific error cases
        if (response.status === 401) {
          return { success: false, error: 'Session expired. Please log in again.' }
        }
        if (response.status === 403) {
          return { success: false, error: 'Access denied. Insufficient permissions.' }
        }
        if (response.status === 404) {
          return { success: false, error: 'Settings not found.' }
        }
        if (response.status >= 500) {
          return { success: false, error: 'Server error. Please try again later.' }
        }
        
        return { success: false, error: errorMessage }
      }

      debugLog('Request successful', result)
      return {
        success: true,
        data: result.data || result,
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error'
      debugLog(`Network error: ${errorMessage}`)
      
      // Handle network-specific errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to server. Please check your internet connection and try again.' 
        }
      }
      
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  // User Settings
  static async getUserSettings(userId: string): Promise<SettingsResponse> {
    debugLog(`Getting user settings for: ${userId}`)
    return this.makeRequest<UserSettings>('/api/settings/user')
  }

  static async updateUserSettings(userId: string, request: UpdateSettingsRequest): Promise<SettingsResponse> {
    debugLog(`Updating user settings for: ${userId}`, request)
    return this.makeRequest<UserSettings>('/api/settings/user', {
      method: 'PATCH',
      body: JSON.stringify(request),
    })
  }

  // Team Settings
  static async getTeamSettings(teamId: string): Promise<{ success: boolean; data?: TeamSettings; error?: string }> {
    debugLog(`Getting team settings for: ${teamId}`)
    return this.makeRequest<TeamSettings>(`/api/teams/${teamId}/settings`)
  }

  static async updateTeamSettings(teamId: string, request: Partial<TeamSettings>): Promise<{ success: boolean; data?: TeamSettings; error?: string }> {
    debugLog(`Updating team settings for: ${teamId}`, request)
    return this.makeRequest<TeamSettings>(`/api/teams/${teamId}/settings`, {
      method: 'PATCH',
      body: JSON.stringify(request),
    })
  }

  // System Settings
  static async getSystemSettings(): Promise<{ success: boolean; data?: SystemSettings; error?: string }> {
    debugLog('Getting system settings')
    return this.makeRequest<SystemSettings>('/api/settings/system')
  }

  static async updateSystemSettings(request: Partial<SystemSettings>): Promise<{ success: boolean; data?: SystemSettings; error?: string }> {
    debugLog('Updating system settings', request)
    return this.makeRequest<SystemSettings>('/api/settings/system', {
      method: 'PATCH',
      body: JSON.stringify(request),
    })
  }

  // Export/Import Settings
  static async exportSettings(userId: string): Promise<{ success: boolean; data?: string; error?: string }> {
    debugLog(`Exporting settings for: ${userId}`)
    const result = await this.makeRequest<{ export_data: string }>('/api/settings/export')
    return {
      success: result.success,
      data: result.data?.export_data,
      error: result.error,
    }
  }

  static async importSettings(userId: string, settingsData: string): Promise<{ success: boolean; error?: string }> {
    debugLog(`Importing settings for: ${userId}`)
    return this.makeRequest('/api/settings/import', {
      method: 'POST',
      body: JSON.stringify({ settings_data: settingsData }),
    })
  }

  // Health check for backend connectivity
  static async healthCheck(): Promise<{ success: boolean; error?: string }> {
    debugLog('Performing health check')
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        debugLog('Health check successful')
        return { success: true }
      } else {
        debugLog(`Health check failed: ${response.status}`)
        return { success: false, error: `Backend health check failed: ${response.status}` }
      }
    } catch (error) {
      debugLog(`Health check error: ${error}`)
      return { success: false, error: 'Cannot connect to backend server' }
    }
  }
}

export { SettingsService } 