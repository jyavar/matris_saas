// Settings service for frontend
import { supabase } from '@/lib/supabase'

export interface UserSettings {
  id: string
  userId: string
  theme: 'light' | 'dark' | 'system'
  language: 'es' | 'en'
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    marketing: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'private' | 'team'
    dataSharing: boolean
    analytics: boolean
  }
  preferences: {
    dashboardLayout: 'grid' | 'list'
    defaultView: 'dashboard' | 'analytics' | 'campaigns'
    autoSave: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface SettingsResponse {
  success: boolean
  data?: UserSettings
  error?: string
}

export interface UpdateSettingsRequest {
  theme?: UserSettings['theme']
  language?: UserSettings['language']
  timezone?: string
  notifications?: Partial<UserSettings['notifications']>
  privacy?: Partial<UserSettings['privacy']>
  preferences?: Partial<UserSettings['preferences']>
}

export interface TeamSettings {
  id: string
  teamId: string
  name: string
  description: string
  members: Array<{
    id: string
    email: string
    role: 'admin' | 'member' | 'viewer'
    joinedAt: string
  }>
  permissions: {
    canInviteMembers: boolean
    canManageBilling: boolean
    canViewAnalytics: boolean
    canManageCampaigns: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface SystemSettings {
  maintenance: boolean
  maintenanceMessage: string
  features: {
    analytics: boolean
    campaigns: boolean
    billing: boolean
    docs: boolean
  }
  limits: {
    maxTeamMembers: number
    maxCampaigns: number
    maxStorage: number
  }
}

export class SettingsService {
  static async getUserSettings(userId: string): Promise<SettingsResponse> {
    try {
      // TODO: Integrar con API real de settings
      const mockSettings: UserSettings = {
        id: 'settings-1',
        userId,
        theme: 'dark',
        language: 'es',
        timezone: 'America/Mexico_City',
        notifications: {
          email: true,
          push: true,
          sms: false,
          marketing: false,
        },
        privacy: {
          profileVisibility: 'team',
          dataSharing: true,
          analytics: true,
        },
        preferences: {
          dashboardLayout: 'grid',
          defaultView: 'dashboard',
          autoSave: true,
        },
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z',
      }

      return {
        success: true,
        data: mockSettings,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user settings',
      }
    }
  }

  static async updateUserSettings(userId: string, request: UpdateSettingsRequest): Promise<SettingsResponse> {
    try {
      // TODO: Integrar con API real de settings
      const updatedSettings: UserSettings = {
        id: 'settings-1',
        userId,
        theme: request.theme || 'dark',
        language: request.language || 'es',
        timezone: request.timezone || 'America/Mexico_City',
        notifications: {
          email: request.notifications?.email ?? true,
          push: request.notifications?.push ?? true,
          sms: request.notifications?.sms ?? false,
          marketing: request.notifications?.marketing ?? false,
        },
        privacy: {
          profileVisibility: request.privacy?.profileVisibility || 'team',
          dataSharing: request.privacy?.dataSharing ?? true,
          analytics: request.privacy?.analytics ?? true,
        },
        preferences: {
          dashboardLayout: request.preferences?.dashboardLayout || 'grid',
          defaultView: request.preferences?.defaultView || 'dashboard',
          autoSave: request.preferences?.autoSave ?? true,
        },
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: new Date().toISOString(),
      }

      return {
        success: true,
        data: updatedSettings,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update user settings',
      }
    }
  }

  static async getTeamSettings(teamId: string): Promise<{ success: boolean; data?: TeamSettings; error?: string }> {
    try {
      // TODO: Integrar con API real de settings
      const mockTeamSettings: TeamSettings = {
        id: 'team-settings-1',
        teamId,
        name: 'STRATO Team',
        description: 'Main development team',
        members: [
          {
            id: 'user-1',
            email: 'john@example.com',
            role: 'admin',
            joinedAt: '2024-01-15T10:00:00Z',
          },
          {
            id: 'user-2',
            email: 'alice@example.com',
            role: 'member',
            joinedAt: '2024-01-16T09:00:00Z',
          },
        ],
        permissions: {
          canInviteMembers: true,
          canManageBilling: true,
          canViewAnalytics: true,
          canManageCampaigns: true,
        },
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z',
      }

      return {
        success: true,
        data: mockTeamSettings,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch team settings',
      }
    }
  }

  static async updateTeamSettings(teamId: string, request: Partial<TeamSettings>): Promise<{ success: boolean; data?: TeamSettings; error?: string }> {
    try {
      // TODO: Integrar con API real de settings
      const updatedTeamSettings: TeamSettings = {
        id: 'team-settings-1',
        teamId,
        name: request.name || 'STRATO Team',
        description: request.description || 'Main development team',
        members: request.members || [],
        permissions: request.permissions || {
          canInviteMembers: true,
          canManageBilling: true,
          canViewAnalytics: true,
          canManageCampaigns: true,
        },
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: new Date().toISOString(),
      }

      return {
        success: true,
        data: updatedTeamSettings,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update team settings',
      }
    }
  }

  static async getSystemSettings(): Promise<{ success: boolean; data?: SystemSettings; error?: string }> {
    try {
      // TODO: Integrar con API real de settings
      const mockSystemSettings: SystemSettings = {
        maintenance: false,
        maintenanceMessage: '',
        features: {
          analytics: true,
          campaigns: true,
          billing: true,
          docs: true,
        },
        limits: {
          maxTeamMembers: 50,
          maxCampaigns: 100,
          maxStorage: 10737418240, // 10GB in bytes
        },
      }

      return {
        success: true,
        data: mockSystemSettings,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch system settings',
      }
    }
  }

  static async exportSettings(userId: string): Promise<{ success: boolean; data?: string; error?: string }> {
    try {
      // TODO: Integrar con API real de settings
      const exportData = `User Settings Export - ${userId}\nGenerated: ${new Date().toISOString()}`
      
      return {
        success: true,
        data: exportData,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to export settings',
      }
    }
  }

  static async importSettings(userId: string, settingsData: string): Promise<{ success: boolean; error?: string }> {
    try {
      // TODO: Integrar con API real de settings
      console.log('Importing settings for user:', userId, settingsData)
      
      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to import settings',
      }
    }
  }
} 