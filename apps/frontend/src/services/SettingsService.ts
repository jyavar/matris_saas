// Settings service for STRATO Core OS™
import { getSessionToken } from '@/lib/supabase'
import { Settings } from '@/types/settings'

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

export class SettingsService {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      debugLog(`Making request to: ${API_BASE_URL}${endpoint}`)
      
      const token = await getSessionToken()
      if (!token) {
        throw new Error('No authentication token. Please log in again.')
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
          throw new Error('Session expired. Please log in again.')
        }
        if (response.status === 403) {
          throw new Error('Access denied. Insufficient permissions.')
        }
        if (response.status === 404) {
          throw new Error('Settings not found.')
        }
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.')
        }
        
        throw new Error(errorMessage)
      }

      debugLog('Request successful', result)
      return result.data || result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error'
      debugLog(`Network error: ${errorMessage}`)
      
      // Handle network-specific errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check your internet connection and try again.')
      }
      
      throw error
    }
  }

  // Get current settings
  async getSettings(): Promise<Settings> {
    debugLog('Getting current settings')
    const response = await SettingsService.makeRequest<Settings>('/api/settings/user')
    
    // Transform legacy format to new format if needed
    if ('theme' in response && 'notifications' in response) {
      return this.transformToNewFormat(response)
    }
    
    return response
  }

  // Update settings
  async updateSettings(settings: Partial<Settings>): Promise<Settings> {
    debugLog('Updating settings', settings)
    const response = await SettingsService.makeRequest<Settings>('/api/settings/user', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    })
    
    return this.transformToNewFormat(response)
  }

  // Reset settings to defaults
  async resetSettings(): Promise<Settings> {
    debugLog('Resetting settings to defaults')
    const response = await SettingsService.makeRequest<Settings>('/api/settings/user/reset', {
      method: 'POST',
    })
    
    return this.transformToNewFormat(response)
  }

  // Export settings
  async exportSettings(): Promise<string> {
    debugLog('Exporting settings')
    const response = await SettingsService.makeRequest<{ data: string }>('/api/settings/export', {
      method: 'GET',
    })
    
    return response.data
  }

  // Import settings
  async importSettings(settings: Settings): Promise<Settings> {
    debugLog('Importing settings', settings)
    const response = await SettingsService.makeRequest<Settings>('/api/settings/import', {
      method: 'POST',
      body: JSON.stringify(settings),
    })
    
    return this.transformToNewFormat(response)
  }

  // Health check
  async checkHealth(): Promise<boolean> {
    try {
      debugLog('Performing health check')
      const response = await SettingsService.makeRequest<{ status: string }>('/api/health')
      return response.status === 'ok'
    } catch (error) {
      debugLog('Health check failed', error)
      return false
    }
  }

  // Transform legacy format to new format
  private transformToNewFormat(legacySettings: Record<string, unknown>): Settings {
    return {
      theme: (legacySettings.theme as string) || 'system',
      language: (legacySettings.language as string) || 'en',
      notifications: {
        email: (legacySettings.notifications as Record<string, unknown>)?.email ?? true,
        push: (legacySettings.notifications as Record<string, unknown>)?.push ?? true,
        sms: (legacySettings.notifications as Record<string, unknown>)?.sms ?? false
      },
      privacy: {
        dataSharing: (legacySettings.privacy as Record<string, unknown>)?.data_sharing ?? false,
        analytics: (legacySettings.privacy as Record<string, unknown>)?.analytics ?? true,
        marketing: (legacySettings.privacy as Record<string, unknown>)?.marketing ?? false
      },
      performance: {
        autoSave: (legacySettings.preferences as Record<string, unknown>)?.auto_save ?? true,
        cacheEnabled: (legacySettings.preferences as Record<string, unknown>)?.cache_enabled ?? true,
        compression: (legacySettings.preferences as Record<string, unknown>)?.compression ?? true
      }
    }
  }

  // Legacy methods for backward compatibility
  static async getUserSettings(userId: string): Promise<{ success: boolean; data?: Settings; error?: string }> {
    try {
      const service = new SettingsService()
      const data = await service.getSettings()
      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  static async updateUserSettings(userId: string, request: Partial<Settings>): Promise<{ success: boolean; data?: Settings; error?: string }> {
    try {
      const service = new SettingsService()
      const data = await service.updateSettings(request)
      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  static async healthCheck(): Promise<{ success: boolean; error?: string }> {
    try {
      const service = new SettingsService()
      const isHealthy = await service.checkHealth()
      return { success: isHealthy }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }
} 