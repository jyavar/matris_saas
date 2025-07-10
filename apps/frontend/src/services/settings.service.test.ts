import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SettingsService } from './settings.service'
import type { UserSettings, TeamSettings, SystemSettings, UpdateSettingsRequest } from './settings.service'

// Mock the auth service
vi.mock('@/lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-jwt-token')),
}))

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

// Helper to create mock response with clone method
const createMockResponse = (data: unknown, success = true) => {
  const response = {
    ok: success,
    json: () => Promise.resolve(success ? { success: true, data } : { success: false, error: 'Test error' }),
    clone: () => response,
  } as Response
  return Promise.resolve(response)
}

describe('SettingsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUserSettings', () => {
    it('should fetch user settings successfully', async () => {
      const mockSettings: UserSettings = {
        id: 'settings-1',
        user_id: 'user-1',
        theme: 'dark',
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
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      mockFetch.mockResolvedValue(createMockResponse(mockSettings))

      const result = await SettingsService.getUserSettings('user-1')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockSettings)
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/settings/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-jwt-token',
        },
      })
    })

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValue(createMockResponse(null, false))

      const result = await SettingsService.getUserSettings('user-1')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Test error')
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      const result = await SettingsService.getUserSettings('user-1')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Network error')
    })
  })

  describe('updateUserSettings', () => {
    it('should update user settings successfully', async () => {
      const mockSettings: UserSettings = {
        id: 'settings-1',
        user_id: 'user-1',
        theme: 'light',
        language: 'es',
        notifications: {
          email: false,
          push: true,
          sms: true,
        },
        privacy: {
          profile_visibility: 'private',
          data_sharing: true,
        },
        preferences: {
          timezone: 'America/Mexico_City',
          date_format: 'DD/MM/YYYY',
          currency: 'MXN',
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      const updates: UpdateSettingsRequest = {
        theme: 'light',
        language: 'es',
        notifications: {
          email: false,
          sms: true,
        },
      }

      mockFetch.mockResolvedValue(createMockResponse(mockSettings))

      const result = await SettingsService.updateUserSettings('user-1', updates)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockSettings)
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/settings/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-jwt-token',
        },
        body: JSON.stringify(updates),
      })
    })

    it('should handle update errors', async () => {
      const updates: UpdateSettingsRequest = { theme: 'light' }
      mockFetch.mockResolvedValue(createMockResponse(null, false))

      const result = await SettingsService.updateUserSettings('user-1', updates)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Test error')
    })
  })

  describe('getTeamSettings', () => {
    it('should fetch team settings successfully', async () => {
      const mockSettings: TeamSettings = {
        id: 'team-settings-1',
        team_id: 'team-1',
        name: 'STRATO Team',
        description: 'Main development team',
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
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      mockFetch.mockResolvedValue(createMockResponse(mockSettings))

      const result = await SettingsService.getTeamSettings('team-1')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockSettings)
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/teams/team-1/settings', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-jwt-token',
        },
      })
    })

    it('should handle team settings errors', async () => {
      mockFetch.mockResolvedValue(createMockResponse(null, false))

      const result = await SettingsService.getTeamSettings('team-1')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Test error')
    })
  })

  describe('updateTeamSettings', () => {
    it('should update team settings successfully', async () => {
      const mockSettings: TeamSettings = {
        id: 'team-settings-1',
        team_id: 'team-1',
        name: 'Updated Team',
        description: 'Updated description',
        permissions: {
          invite_members: true,
          manage_billing: true,
          view_analytics: true,
        },
        features: {
          advanced_analytics: true,
          custom_branding: true,
          api_access: false,
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      const updates: Partial<TeamSettings> = {
        name: 'Updated Team',
        description: 'Updated description',
        features: {
          advanced_analytics: true,
          custom_branding: true,
          api_access: false,
        },
      }

      mockFetch.mockResolvedValue(createMockResponse(mockSettings))

      const result = await SettingsService.updateTeamSettings('team-1', updates)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockSettings)
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/teams/team-1/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-jwt-token',
        },
        body: JSON.stringify(updates),
      })
    })
  })

  describe('getSystemSettings', () => {
    it('should fetch system settings successfully', async () => {
      const mockSettings: SystemSettings = {
        id: 'system-settings-1',
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
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      mockFetch.mockResolvedValue(createMockResponse(mockSettings))

      const result = await SettingsService.getSystemSettings()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockSettings)
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/settings/system', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-jwt-token',
        },
      })
    })
  })

  describe('updateSystemSettings', () => {
    it('should update system settings successfully', async () => {
      const mockSettings: SystemSettings = {
        id: 'system-settings-1',
        maintenance_mode: true,
        feature_flags: {
          beta_features: true,
          advanced_analytics: true,
          custom_branding: true,
        },
        integrations: {
          stripe_enabled: true,
          posthog_enabled: false,
          resend_enabled: true,
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      const updates: Partial<SystemSettings> = {
        maintenance_mode: true,
        feature_flags: {
          beta_features: true,
          custom_branding: true,
        },
        integrations: {
          stripe_enabled: true,
          posthog_enabled: false,
          resend_enabled: true,
        },
      }

      mockFetch.mockResolvedValue(createMockResponse(mockSettings))

      const result = await SettingsService.updateSystemSettings(updates)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockSettings)
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/settings/system', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-jwt-token',
        },
        body: JSON.stringify(updates),
      })
    })
  })

  describe('exportSettings', () => {
    it('should export settings successfully', async () => {
      const mockExportData = {
        export_data: JSON.stringify({
          user_settings: {
            theme: 'dark',
            language: 'en',
          },
          exported_at: '2024-01-01T00:00:00Z',
          version: '1.0',
        }),
      }

      mockFetch.mockResolvedValue(createMockResponse(mockExportData))

      const result = await SettingsService.exportSettings('user-1')

      expect(result.success).toBe(true)
      expect(result.data).toBe(mockExportData.export_data)
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/settings/export', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-jwt-token',
        },
      })
    })

    it('should handle export errors', async () => {
      mockFetch.mockResolvedValue(createMockResponse(null, false))

      const result = await SettingsService.exportSettings('user-1')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Test error')
    })
  })

  describe('importSettings', () => {
    it('should import settings successfully', async () => {
      const settingsData = JSON.stringify({
        user_settings: {
          theme: 'light',
          language: 'es',
        },
      })

      mockFetch.mockResolvedValue(createMockResponse({ message: 'Settings imported successfully' }))

      const result = await SettingsService.importSettings('user-1', settingsData)

      expect(result.success).toBe(true)
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/settings/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-jwt-token',
        },
        body: JSON.stringify({ settings_data: settingsData }),
      })
    })

    it('should handle import errors', async () => {
      const settingsData = 'invalid-json'
      mockFetch.mockResolvedValue(createMockResponse(null, false))

      const result = await SettingsService.importSettings('user-1', settingsData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Test error')
    })
  })

  describe('error handling', () => {
    it('should handle HTTP error responses', async () => {
      const response = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve({ error: 'Server error' }),
        clone: () => response,
      } as Response

      mockFetch.mockResolvedValue(response)

      const result = await SettingsService.getUserSettings('user-1')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Server error')
    })

    it('should handle missing authentication token', async () => {
      // Mock getSessionToken to return null
      const { getSessionToken } = await import('@/lib/supabase')
      vi.mocked(getSessionToken).mockResolvedValue(null)

      const result = await SettingsService.getUserSettings('user-1')

      expect(result.success).toBe(false)
      expect(result.error).toBe('No authentication token')
    })
  })
}) 