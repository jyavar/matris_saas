import { supabase } from '../lib/supabase.js'
import { ApiError } from '../utils/ApiError.js'

// Types
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

export interface UpdateUserSettingsData {
  theme?: UserSettings['theme']
  language?: string
  notifications?: Partial<UserSettings['notifications']>
  privacy?: Partial<UserSettings['privacy']>
  preferences?: Partial<UserSettings['preferences']>
}

export interface UpdateTeamSettingsData {
  name?: string
  description?: string
  permissions?: Partial<TeamSettings['permissions']>
  features?: Partial<TeamSettings['features']>
}

export interface UpdateSystemSettingsData {
  maintenance_mode?: boolean
  feature_flags?: Record<string, boolean>
  integrations?: Partial<SystemSettings['integrations']>
}

class SettingsService {
  // User Settings
  async getUserSettings(userId: string): Promise<UserSettings> {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // Create default settings if not found
          return this.createDefaultUserSettings(userId)
        }
        throw new ApiError('Failed to fetch user settings', 500)
      }

      return data
    } catch (error) {
      throw new ApiError('Failed to fetch user settings', 500)
    }
  }

  async updateUserSettings(userId: string, updates: UpdateUserSettingsData): Promise<UserSettings> {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: userId,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        throw new ApiError('Failed to update user settings', 500)
      }

      return data
    } catch (error) {
      throw new ApiError('Failed to update user settings', 500)
    }
  }

  private async createDefaultUserSettings(userId: string): Promise<UserSettings> {
    const defaultSettings: Omit<UserSettings, 'id' | 'created_at' | 'updated_at'> = {
      user_id: userId,
      theme: 'system',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      privacy: {
        profile_visibility: 'team',
        data_sharing: false,
      },
      preferences: {
        timezone: 'UTC',
        date_format: 'YYYY-MM-DD',
        currency: 'USD',
      },
    }

    const { data, error } = await supabase
      .from('user_settings')
      .insert(defaultSettings)
      .select()
      .single()

    if (error) {
      throw new ApiError('Failed to create default user settings', 500)
    }

    return data
  }

  // Team Settings
  async getTeamSettings(teamId: string, _userId: string): Promise<TeamSettings> {
    try {
      // TODO: Add team membership validation
      const { data, error } = await supabase
        .from('team_settings')
        .select('*')
        .eq('team_id', teamId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // Create default settings if not found
          return this.createDefaultTeamSettings(teamId)
        }
        throw new ApiError('Failed to fetch team settings', 500)
      }

      return data
    } catch (error) {
      throw new ApiError('Failed to fetch team settings', 500)
    }
  }

  async updateTeamSettings(teamId: string, _userId: string, updates: UpdateTeamSettingsData): Promise<TeamSettings> {
    try {
      // TODO: Add team admin validation
      const { data, error } = await supabase
        .from('team_settings')
        .upsert({
          team_id: teamId,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        throw new ApiError('Failed to update team settings', 500)
      }

      return data
    } catch (error) {
      throw new ApiError('Failed to update team settings', 500)
    }
  }

  private async createDefaultTeamSettings(teamId: string): Promise<TeamSettings> {
    const defaultSettings: Omit<TeamSettings, 'id' | 'created_at' | 'updated_at'> = {
      team_id: teamId,
      name: 'Default Team',
      description: '',
      permissions: {
        invite_members: true,
        manage_billing: false,
        view_analytics: true,
      },
      features: {
        advanced_analytics: false,
        custom_branding: false,
        api_access: false,
      },
    }

    const { data, error } = await supabase
      .from('team_settings')
      .insert(defaultSettings)
      .select()
      .single()

    if (error) {
      throw new ApiError('Failed to create default team settings', 500)
    }

    return data
  }

  // System Settings
  async getSystemSettings(): Promise<SystemSettings> {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // Create default settings if not found
          return this.createDefaultSystemSettings()
        }
        throw new ApiError('Failed to fetch system settings', 500)
      }

      return data
    } catch (error) {
      throw new ApiError('Failed to fetch system settings', 500)
    }
  }

  async updateSystemSettings(updates: UpdateSystemSettingsData): Promise<SystemSettings> {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .upsert({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        throw new ApiError('Failed to update system settings', 500)
      }

      return data
    } catch (error) {
      throw new ApiError('Failed to update system settings', 500)
    }
  }

  private async createDefaultSystemSettings(): Promise<SystemSettings> {
    const defaultSettings: Omit<SystemSettings, 'id' | 'created_at' | 'updated_at'> = {
      maintenance_mode: false,
      feature_flags: {
        beta_features: false,
        advanced_analytics: true,
        custom_branding: false,
      },
      integrations: {
        stripe_enabled: true,
        posthog_enabled: true,
        resend_enabled: true,
      },
    }

    const { data, error } = await supabase
      .from('system_settings')
      .insert(defaultSettings)
      .select()
      .single()

    if (error) {
      throw new ApiError('Failed to create default system settings', 500)
    }

    return data
  }

  // Export/Import Settings
  async exportSettings(_userId: string): Promise<string> {
    try {
      const userSettings = await this.getUserSettings(_userId)
      
      const exportData = {
        user_settings: userSettings,
        exported_at: new Date().toISOString(),
        version: '1.0',
      }

      return JSON.stringify(exportData, null, 2)
    } catch (error) {
      throw new ApiError('Failed to export settings', 500)
    }
  }

  async importSettings(_userId: string, settingsData: string): Promise<void> {
    try {
      const parsedData = JSON.parse(settingsData)
      
      if (parsedData.user_settings) {
        const { user_settings } = parsedData
        await this.updateUserSettings(_userId, {
          theme: user_settings.theme,
          language: user_settings.language,
          notifications: user_settings.notifications,
          privacy: user_settings.privacy,
          preferences: user_settings.preferences,
        })
      }
    } catch (error) {
      throw new ApiError('Failed to import settings', 500)
    }
  }
}

export const settingsService = new SettingsService() 