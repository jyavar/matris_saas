import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { SettingsProvider, useSettings } from '../contexts/SettingsContext'
import { ErrorBoundary } from '../components/ui/ErrorBoundary'
import { LoadingSpinner, OfflineIndicator, CircuitBreakerIndicator } from '../components/ui/LoadingStates'

// Mock the SettingsService
vi.mock('../services/SettingsService', () => ({
  SettingsService: vi.fn().mockImplementation(() => ({
    getSettings: vi.fn(),
    updateSettings: vi.fn(),
    resetSettings: vi.fn(),
    exportSettings: vi.fn(),
    importSettings: vi.fn(),
    checkHealth: vi.fn()
  }))
}))

// Mock Supabase token
vi.mock('@/lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-token'))
}))

// Test component that uses settings
const TestSettingsComponent = () => {
  const { 
    settings, 
    loading, 
    error, 
    connectionState, 
    retryCount, 
    circuitBreakerState,
    updateSettings, 
    resetSettings, 
    retryConnection,
    clearError 
  } = useSettings()

  return (
    <div>
      <div data-testid="connection-state">{connectionState}</div>
      <div data-testid="retry-count">{retryCount}</div>
      <div data-testid="circuit-breaker-state">{circuitBreakerState}</div>
      <div data-testid="loading">{loading.toString()}</div>
      {error && <div data-testid="error">{error}</div>}
      <div data-testid="theme">{settings.theme}</div>
      
      <button 
        onClick={() => updateSettings({ theme: 'dark' })}
        data-testid="update-theme"
      >
        Update Theme
      </button>
      
      <button 
        onClick={resetSettings}
        data-testid="reset-settings"
      >
        Reset Settings
      </button>
      
      <button 
        onClick={retryConnection}
        data-testid="retry-connection"
      >
        Retry Connection
      </button>
      
      <button 
        onClick={clearError}
        data-testid="clear-error"
      >
        Clear Error
      </button>
    </div>
  )
}

// Setup MSW server
const server = setupServer(
  // Health check endpoint
  rest.get('*/api/health', (req, res, ctx) => {
    return res(ctx.json({ status: 'ok' }))
  }),
  
  // Settings endpoints
  rest.get('*/api/settings/user', (req, res, ctx) => {
    return res(ctx.json({
      theme: 'system',
      language: 'en',
      notifications: { email: true, push: true, sms: false },
      privacy: { dataSharing: false, analytics: true, marketing: false },
      performance: { autoSave: true, cacheEnabled: true, compression: true }
    }))
  }),
  
  rest.patch('*/api/settings/user', (req, res, ctx) => {
    return res(ctx.json({
      theme: 'dark',
      language: 'en',
      notifications: { email: true, push: true, sms: false },
      privacy: { dataSharing: false, analytics: true, marketing: false },
      performance: { autoSave: true, cacheEnabled: true, compression: true }
    }))
  }),
  
  rest.post('*/api/settings/user/reset', (req, res, ctx) => {
    return res(ctx.json({
      theme: 'system',
      language: 'en',
      notifications: { email: true, push: true, sms: false },
      privacy: { dataSharing: false, analytics: true, marketing: false },
      performance: { autoSave: true, cacheEnabled: true, compression: true }
    }))
  })
)

describe('Settings Edge Cases Integration', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should handle network timeout gracefully', async () => {
    // Mock timeout
    server.use(
      rest.get('*/api/settings/user', (req, res, ctx) => {
        return res(ctx.delay(15000)) // 15 second delay
      })
    )

    render(
      <ErrorBoundary>
        <SettingsProvider>
          <TestSettingsComponent />
        </SettingsProvider>
      </ErrorBoundary>
    )

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    }, { timeout: 20000 })

    expect(screen.getByTestId('error').textContent).toContain('Operation timeout')
  })

  it('should handle server errors with retry logic', async () => {
    let callCount = 0
    server.use(
      rest.get('*/api/settings/user', (req, res, ctx) => {
        callCount++
        if (callCount < 3) {
          return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }))
        }
        return res(ctx.json({
          theme: 'system',
          language: 'en',
          notifications: { email: true, push: true, sms: false },
          privacy: { dataSharing: false, analytics: true, marketing: false },
          performance: { autoSave: true, cacheEnabled: true, compression: true }
        }))
      })
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('system')
    })

    expect(callCount).toBeGreaterThan(1)
  })

  it('should handle circuit breaker open state', async () => {
    // Mock repeated failures
    server.use(
      rest.get('*/api/settings/user', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server Error' }))
      }),
      rest.get('*/api/health', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Health Check Failed' }))
      })
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('circuit-breaker-state')).toHaveTextContent('open')
    })

    expect(screen.getByTestId('connection-state')).toHaveTextContent('error')
  })

  it('should handle malformed JSON responses', async () => {
    server.use(
      rest.get('*/api/settings/user', (req, res, ctx) => {
        return res(ctx.body('invalid json'))
      })
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })

    expect(screen.getByTestId('error').textContent).toContain('Invalid settings data')
  })

  it('should handle authentication token expiration', async () => {
    server.use(
      rest.get('*/api/settings/user', (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({ error: 'Token expired' }))
      })
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })

    expect(screen.getByTestId('error').textContent).toContain('Session expired')
  })

  it('should handle permission denied errors', async () => {
    server.use(
      rest.get('*/api/settings/user', (req, res, ctx) => {
        return res(ctx.status(403), ctx.json({ error: 'Access denied' }))
      })
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })

    expect(screen.getByTestId('error').textContent).toContain('Access denied')
  })

  it('should handle network connectivity issues', async () => {
    server.use(
      rest.get('*/api/settings/user', (req, res, ctx) => {
        return res.networkError('Failed to connect')
      })
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })

    expect(screen.getByTestId('error').textContent).toContain('Cannot connect to server')
  })

  it('should handle invalid settings data during import', async () => {
    const { SettingsService } = await import('../services/SettingsService')
    const mockService = new SettingsService()
    
    vi.mocked(mockService.importSettings).mockRejectedValue(
      new Error('Invalid settings data: Missing required field: theme')
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    // This would normally be triggered by an import action
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })
  })

  it('should handle concurrent settings updates', async () => {
    let updateCount = 0
    server.use(
      rest.patch('*/api/settings/user', (req, res, ctx) => {
        updateCount++
        return res(ctx.json({
          theme: 'dark',
          language: 'en',
          notifications: { email: true, push: true, sms: false },
          privacy: { dataSharing: false, analytics: true, marketing: false },
          performance: { autoSave: true, cacheEnabled: true, compression: true }
        }))
      })
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    // Trigger multiple concurrent updates
    const updateButton = screen.getByTestId('update-theme')
    fireEvent.click(updateButton)
    fireEvent.click(updateButton)
    fireEvent.click(updateButton)

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    })

    expect(updateCount).toBeGreaterThan(0)
  })

  it('should handle rapid connection state changes', async () => {
    let healthCheckCount = 0
    server.use(
      rest.get('*/api/health', (req, res, ctx) => {
        healthCheckCount++
        if (healthCheckCount % 2 === 0) {
          return res(ctx.json({ status: 'ok' }))
        } else {
          return res(ctx.status(500), ctx.json({ error: 'Health Check Failed' }))
        }
      })
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    // Wait for health checks to run
    await waitFor(() => {
      expect(healthCheckCount).toBeGreaterThan(0)
    }, { timeout: 10000 })

    expect(screen.getByTestId('connection-state')).toBeInTheDocument()
  })

  it('should handle error clearing functionality', async () => {
    server.use(
      rest.get('*/api/settings/user', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server Error' }))
      })
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('clear-error'))

    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('should handle retry connection functionality', async () => {
    let healthCheckCount = 0
    server.use(
      rest.get('*/api/health', (req, res, ctx) => {
        healthCheckCount++
        if (healthCheckCount === 1) {
          return res(ctx.status(500), ctx.json({ error: 'Health Check Failed' }))
        }
        return res(ctx.json({ status: 'ok' }))
      })
    )

    render(
      <SettingsProvider>
        <TestSettingsComponent />
      </SettingsProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('connection-state')).toHaveTextContent('error')
    })

    fireEvent.click(screen.getByTestId('retry-connection'))

    await waitFor(() => {
      expect(screen.getByTestId('connection-state')).toHaveTextContent('connected')
    })
  })
}) 