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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

class SettingsService {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      const token = await getSessionToken()
      if (!token) {
        return { success: false, error: 'No authentication token' }
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: result.error || `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      return {
        success: true,
        data: result.data || result,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  // User Settings
  static async getUserSettings(userId: string): Promise<SettingsResponse> {
    return this.makeRequest<UserSettings>('/api/settings/user')
  }

  static async updateUserSettings(userId: string, request: UpdateSettingsRequest): Promise<SettingsResponse> {
    return this.makeRequest<UserSettings>('/api/settings/user', {
      method: 'PATCH',
      body: JSON.stringify(request),
    })
  }

  // Team Settings
  static async getTeamSettings(teamId: string): Promise<{ success: boolean; data?: TeamSettings; error?: string }> {
    return this.makeRequest<TeamSettings>(`/api/teams/${teamId}/settings`)
  }

  static async updateTeamSettings(teamId: string, request: Partial<TeamSettings>): Promise<{ success: boolean; data?: TeamSettings; error?: string }> {
    return this.makeRequest<TeamSettings>(`/api/teams/${teamId}/settings`, {
      method: 'PATCH',
      body: JSON.stringify(request),
    })
  }

  // System Settings
  static async getSystemSettings(): Promise<{ success: boolean; data?: SystemSettings; error?: string }> {
    return this.makeRequest<SystemSettings>('/api/settings/system')
  }

  static async updateSystemSettings(request: Partial<SystemSettings>): Promise<{ success: boolean; data?: SystemSettings; error?: string }> {
    return this.makeRequest<SystemSettings>('/api/settings/system', {
      method: 'PATCH',
      body: JSON.stringify(request),
    })
  }

  // Export/Import Settings
  static async exportSettings(userId: string): Promise<{ success: boolean; data?: string; error?: string }> {
    const result = await this.makeRequest<{ export_data: string }>('/api/settings/export')
    return {
      success: result.success,
      data: result.data?.export_data,
      error: result.error,
    }
  }

  static async importSettings(userId: string, settingsData: string): Promise<{ success: boolean; error?: string }> {
    return this.makeRequest('/api/settings/import', {
      method: 'POST',
      body: JSON.stringify({ settings_data: settingsData }),
    })
  }
}

export { SettingsService } 