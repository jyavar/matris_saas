import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { renderHook, act, waitFor } from '@testing-library/react'
import { SettingsProvider, useSettings } from '../contexts/SettingsContext'
import type { UserSettings, UpdateSettingsRequest } from '../services/settings.service'
import React, { ReactNode } from 'react'

// Mock getSessionToken
vi.mock('@/lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-token-123'))
}))

// Mock data
const mockUserSettings: UserSettings = {
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

const mockTeamSettings = {
  id: 'team-settings-1',
  team_id: 'team-1',
  name: 'Test Team',
  description: 'Test team description',
  permissions: {
    invite_members: true,
    manage_billing: false,
    view_analytics: true,
  },
  features: {
    advanced_analytics: true,
    custom_branding: false,
    api_access: true,
  },
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

const mockSystemSettings = {
  id: 'system-settings-1',
  maintenance_mode: false,
  feature_flags: {
    beta_features: true,
    new_ui: false,
  },
  integrations: {
    stripe_enabled: true,
    posthog_enabled: true,
    resend_enabled: false,
  },
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

// MSW Server setup
const server = setupServer(
  // Health check endpoint
  rest.get('http://localhost:3001/health', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 'healthy' }))
  }),

  // User settings endpoints
  rest.get('http://localhost:3001/api/settings/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true, data: mockUserSettings }))
  }),

  rest.patch('http://localhost:3001/api/settings/user', async (req, res, ctx) => {
    const body = await req.json()
    const updated: UserSettings = {
      ...mockUserSettings,
      ...body,
      updated_at: new Date().toISOString(),
    }
    return res(ctx.status(200), ctx.json({ success: true, data: updated }))
  }),

  // Team settings endpoints
  rest.get('http://localhost:3001/api/teams/:teamId/settings', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true, data: mockTeamSettings }))
  }),

  rest.patch('http://localhost:3001/api/teams/:teamId/settings', async (req, res, ctx) => {
    const body = await req.json()
    const updated = {
      ...mockTeamSettings,
      ...body,
      updated_at: new Date().toISOString(),
    }
    return res(ctx.status(200), ctx.json({ success: true, data: updated }))
  }),

  // System settings endpoints
  rest.get('http://localhost:3001/api/settings/system', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true, data: mockSystemSettings }))
  }),

  rest.patch('http://localhost:3001/api/settings/system', async (req, res, ctx) => {
    const body = await req.json()
    const updated = {
      ...mockSystemSettings,
      ...body,
      updated_at: new Date().toISOString(),
    }
    return res(ctx.status(200), ctx.json({ success: true, data: updated }))
  }),

  // Export/Import endpoints
  rest.get('http://localhost:3001/api/settings/export', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ 
      success: true, 
      data: { export_data: JSON.stringify(mockUserSettings) } 
    }))
  }),

  rest.post('http://localhost:3001/api/settings/import', async (req, res, ctx) => {
    const body = await req.json()
    if (body.settings_data) {
      return res(ctx.status(200), ctx.json({ success: true }))
    }
    return res(ctx.status(400), ctx.json({ success: false, error: 'Invalid settings data' }))
  })
)

// Test wrapper component
const TestWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <SettingsProvider>{children}</SettingsProvider>
)

// Setup and teardown
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterAll(() => {
  server.close()
})

beforeEach(() => {
  server.resetHandlers()
  vi.clearAllMocks()
})

describe('SettingsContext Integration Tests', () => {
  describe('Initial State and Health Check', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      expect(result.current.state.userSettings).toBeNull()
      expect(result.current.state.teamSettings).toBeNull()
      expect(result.current.state.systemSettings).toBeNull()
      expect(result.current.state.loading).toBe(false)
      expect(result.current.state.error).toBeNull()
      expect(result.current.state.backendConnected).toBe(true)
      expect(result.current.state.lastSync).toBeNull()
    })

    it('should perform health check on mount', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      await waitFor(() => {
        expect(result.current.state.backendConnected).toBe(true)
      })
    })
  })

  describe('User Settings', () => {
    it('should load user settings successfully', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      await act(async () => {
        await result.current.loadUserSettings('user-1')
      })

      expect(result.current.state.userSettings).toEqual(mockUserSettings)
      expect(result.current.state.error).toBeNull()
      expect(result.current.state.lastSync).toBeDefined()
    })

    it('should update user settings successfully', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      // Load initial settings
      await act(async () => {
        await result.current.loadUserSettings('user-1')
      })

      // Update settings
      const updates: UpdateSettingsRequest = { theme: 'light', language: 'es' }
      await act(async () => {
        await result.current.updateUserSettings('user-1', updates)
      })

      expect(result.current.state.userSettings?.theme).toBe('light')
      expect(result.current.state.userSettings?.language).toBe('es')
      expect(result.current.state.error).toBeNull()
    })

    it('should handle network error when loading user settings', async () => {
      server.use(
        rest.get('http://localhost:3001/api/settings/user', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ success: false, error: 'Internal Server Error' }))
        })
      )

      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      await act(async () => {
        await result.current.loadUserSettings('user-1')
      })

      expect(result.current.state.userSettings).toBeNull()
      expect(result.current.state.error).toBe('Internal Server Error')
      expect(result.current.state.backendConnected).toBe(false)
    })

    it('should handle authentication error', async () => {
      server.use(
        rest.get('http://localhost:3001/api/settings/user', (req, res, ctx) => {
          return res(ctx.status(401), ctx.json({ success: false, error: 'No authentication token' }))
        })
      )

      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      await act(async () => {
        await result.current.loadUserSettings('user-1')
      })

      expect(result.current.state.userSettings).toBeNull()
      expect(result.current.state.error).toBe('No authentication token')
    })
  })

  describe('Team Settings', () => {
    it('should load team settings successfully', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      await act(async () => {
        await result.current.loadTeamSettings('team-1')
      })

      expect(result.current.state.teamSettings).toEqual(mockTeamSettings)
      expect(result.current.state.error).toBeNull()
    })

    it('should update team settings successfully', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      // Load initial settings
      await act(async () => {
        await result.current.loadTeamSettings('team-1')
      })

      // Update settings
      const updates = { name: 'Updated Team Name' }
      await act(async () => {
        await result.current.updateTeamSettings('team-1', updates)
      })

      expect(result.current.state.teamSettings?.name).toBe('Updated Team Name')
      expect(result.current.state.error).toBeNull()
    })
  })

  describe('System Settings', () => {
    it('should load system settings successfully', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      await act(async () => {
        await result.current.loadSystemSettings()
      })

      expect(result.current.state.systemSettings).toEqual(mockSystemSettings)
      expect(result.current.state.error).toBeNull()
    })

    it('should update system settings successfully', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      // Load initial settings
      await act(async () => {
        await result.current.loadSystemSettings()
      })

      // Update settings
      const updates = { maintenance_mode: true }
      await act(async () => {
        await result.current.updateSystemSettings(updates)
      })

      expect(result.current.state.systemSettings?.maintenance_mode).toBe(true)
      expect(result.current.state.error).toBeNull()
    })
  })

  describe('Export/Import Settings', () => {
    it('should export settings successfully', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      await act(async () => {
        const exportedData = await result.current.exportSettings('user-1')
        expect(exportedData).toBe(JSON.stringify(mockUserSettings))
      })

      expect(result.current.state.error).toBeNull()
    })

    it('should import settings successfully', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      const testData = JSON.stringify(mockUserSettings)
      await act(async () => {
        await result.current.importSettings('user-1', testData)
      })

      expect(result.current.state.error).toBeNull()
    })

    it('should handle import error', async () => {
      server.use(
        rest.post('http://localhost:3001/api/settings/import', (req, res, ctx) => {
          return res(ctx.status(400), ctx.json({ success: false, error: 'Invalid data format' }))
        })
      )

      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      await act(async () => {
        await result.current.importSettings('user-1', 'invalid-json')
      })

      expect(result.current.state.error).toBe('Invalid data format')
    })
  })

  describe('Error Handling and Recovery', () => {
    it('should clear error when clearError is called', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      // Trigger an error
      server.use(
        rest.get('http://localhost:3001/api/settings/user', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ success: false, error: 'Test error' }))
        })
      )

      await act(async () => {
        await result.current.loadUserSettings('user-1')
      })

      expect(result.current.state.error).toBe('Test error')

      // Clear error
      act(() => {
        result.current.clearError()
      })

      expect(result.current.state.error).toBeNull()
    })

    it('should retry connection successfully', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      // Simulate connection failure
      server.use(
        rest.get('http://localhost:3001/health', (req, res, ctx) => {
          return res(ctx.status(500))
        })
      )

      await act(async () => {
        await result.current.retryConnection()
      })

      // Should still be connected since we reset handlers
      expect(result.current.state.backendConnected).toBe(true)
    })
  })

  describe('Loading States', () => {
    it('should show loading state during operations', async () => {
      const { result } = renderHook(() => useSettings(), { wrapper: TestWrapper })

      // Start loading
      act(() => {
        result.current.loadUserSettings('user-1')
      })

      expect(result.current.state.loading).toBe(true)

      // Wait for completion
      await waitFor(() => {
        expect(result.current.state.loading).toBe(false)
      })
    })
  })
}) 