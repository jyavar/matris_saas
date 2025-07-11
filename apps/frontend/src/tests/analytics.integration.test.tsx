/**
 * Analytics Integration Tests - STRATO Core OS™
 * Tests de integración completos para AnalyticsContext y ConnectionStatus
 * Cubre: flujos críticos, edge cases, validación visual, manejo de errores, circuit breaker
 */

import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { vi, beforeEach, afterEach, describe, it, expect, beforeAll, afterAll } from 'vitest'
import { AnalyticsProvider, useAnalytics } from '../contexts/AnalyticsContext'
import { ConnectionStatus } from '../components/ui/ConnectionStatus'

// Mock de getSessionToken para evitar errores de autenticación
vi.mock('../lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-jwt-token'))
}))

// Mock console para capturar logs
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {})
}

// Configurar MSW server
const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeEach(() => {
  console.log('🔄 Test setup: Resetting handlers and setting up MSW')
  server.resetHandlers()
  
  // Configurar handlers por defecto para Analytics
  server.use(
    // Health check endpoint
    rest.get('http://localhost:3001/api/analytics/health', (req, res, ctx) => {
      console.log('🔍 MSW: Health check endpoint called')
      const response = {
        status: 'healthy',
        circuitBreaker: { state: 'closed', failures: 0, lastFailure: 0 },
        lastCheck: new Date().toISOString(),
        responseTime: 150
      }
      console.log('🔍 MSW: Returning health response:', response)
      return res(
        ctx.status(200),
        ctx.json(response)
      )
    }),

    // Analytics summary endpoint
    rest.get('http://localhost:3001/api/analytics/summary', (req, res, ctx) => {
      console.log('🔍 MSW: Summary endpoint called')
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: {
            total_events: 1250,
            unique_users: 89,
            top_events: [
              { event_name: 'page_view', count: 450 },
              { event_name: 'button_click', count: 320 }
            ],
            daily_events: [
              { date: '2024-01-20', count: 125 },
              { date: '2024-01-21', count: 98 }
            ]
          }
        })
      )
    }),

    // Events endpoint
    rest.get('http://localhost:3001/api/analytics/events', (req, res, ctx) => {
      console.log('🔍 MSW: Events endpoint called')
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: [
            {
              id: 1,
              event_name: 'page_view',
              user_id: 123,
              payload: { page: '/dashboard' },
              created_at: '2024-01-21T10:00:00Z'
            },
            {
              id: 2,
              event_name: 'button_click',
              user_id: 123,
              payload: { button: 'save' },
              created_at: '2024-01-21T10:05:00Z'
            }
          ]
        })
      )
    }),

    // Track event endpoint
    rest.post('http://localhost:3001/api/analytics/track/event', async (req, res, ctx) => {
      const body = await req.json()
      console.log('🔍 MSW: Track event endpoint called with:', body)
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: {
            id: Date.now(),
            event_name: body.event_name,
            user_id: body.user_id,
            payload: body.properties,
            created_at: new Date().toISOString()
          }
        })
      )
    }),

    // Track metric endpoint
    rest.post('http://localhost:3001/api/analytics/track/metric', async (req, res, ctx) => {
      const body = await req.json()
      console.log('🔍 MSW: Track metric endpoint called with:', body)
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: {
            id: Date.now(),
            metric_name: body.metric_name,
            value: body.value,
            user_id: body.user_id,
            tags: body.tags,
            created_at: new Date().toISOString()
          }
        })
      )
    })
  )
  
  vi.clearAllMocks()
  console.log('✅ Test setup: MSW handlers configured')
})

afterEach(() => {
  vi.clearAllMocks()
})

// Componente de prueba para AnalyticsContext
function TestAnalyticsComponent() {
  const { state, fetchSummary, fetchEvents, trackEvent, trackMetric, checkHealth, reconnect, isConnected, isHealthy } = useAnalytics()

  return (
    <div>
      <div data-testid="connection-status">{state.connectionStatus}</div>
      <div data-testid="loading">{state.loading.toString()}</div>
      <div data-testid="error">{state.error || 'no-error'}</div>
      <div data-testid="is-connected">{isConnected.toString()}</div>
      <div data-testid="is-healthy">{isHealthy.toString()}</div>
      <div data-testid="summary-total">{state.summary?.total_events || 'no-summary'}</div>
      <div data-testid="events-count">{state.events.length}</div>
      
      <button onClick={fetchSummary} data-testid="fetch-summary">Fetch Summary</button>
      <button onClick={() => fetchEvents()} data-testid="fetch-events">Fetch Events</button>
      <button onClick={() => trackEvent({ event_name: 'test_event' })} data-testid="track-event">Track Event</button>
      <button onClick={() => trackMetric({ metric_name: 'test_metric', value: 100 })} data-testid="track-metric">Track Metric</button>
      <button onClick={checkHealth} data-testid="check-health">Check Health</button>
      <button onClick={reconnect} data-testid="reconnect">Reconnect</button>
    </div>
  )
}

describe('Analytics Integration Tests', () => {
  beforeEach(() => {
    // Los handlers ya están configurados en el beforeEach global
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('AnalyticsContext - Flujos Críticos', () => {
    it('should initialize with correct default state', () => {
      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      // El estado inicial debe ser 'connecting' porque el provider hace health check automáticamente
      expect(screen.getByTestId('connection-status')).toHaveTextContent('connecting')
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
      expect(screen.getByTestId('is-connected')).toHaveTextContent('false')
      expect(screen.getByTestId('is-healthy')).toHaveTextContent('false')
    })

    it('should connect and fetch summary on initialization', async () => {
      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      // Wait for health check and connection
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 3000 })

      // Wait for summary to be loaded
      await waitFor(() => {
        expect(screen.getByTestId('summary-total')).toHaveTextContent('1250')
      }, { timeout: 3000 })

      expect(screen.getByTestId('is-connected')).toHaveTextContent('true')
      expect(screen.getByTestId('is-healthy')).toHaveTextContent('true')
    })

    it('should fetch events successfully', async () => {
      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      // Wait for initial connection
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 3000 })

      // Fetch events
      fireEvent.click(screen.getByTestId('fetch-events'))

      await waitFor(() => {
        expect(screen.getByTestId('events-count')).toHaveTextContent('2')
      }, { timeout: 3000 })

      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
    })

    it('should track events successfully', async () => {
      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      // Wait for initial connection
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 3000 })

      // Track event
      fireEvent.click(screen.getByTestId('track-event'))

      await waitFor(() => {
        expect(consoleSpy.log).toHaveBeenCalledWith('Event tracked successfully:', 'test_event')
      }, { timeout: 3000 })

      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
    })

    it('should track metrics successfully', async () => {
      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      // Wait for initial connection
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 3000 })

      // Track metric
      fireEvent.click(screen.getByTestId('track-metric'))

      await waitFor(() => {
        expect(consoleSpy.log).toHaveBeenCalledWith('Metric tracked successfully:', 'test_metric')
      }, { timeout: 3000 })

      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
    })
  })

  describe('AnalyticsContext - Edge Cases y Manejo de Errores', () => {
    it('should handle network errors gracefully', async () => {
      // Override server to return network error
      server.use(
        rest.get('http://localhost:3001/api/analytics/health', (req, res, ctx) => {
          return res.networkError('Failed to connect')
        })
      )

      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
      }, { timeout: 3000 })

      expect(screen.getByTestId('is-connected')).toHaveTextContent('false')
      expect(screen.getByTestId('is-healthy')).toHaveTextContent('false')
    })

    it('should handle 500 server errors', async () => {
      server.use(
        rest.get('http://localhost:3001/api/analytics/summary', (req, res, ctx) => {
          return res(ctx.status(500))
        })
      )

      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      // Wait for initial connection
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 3000 })

      // Try to fetch summary
      fireEvent.click(screen.getByTestId('fetch-summary'))

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
      }, { timeout: 3000 })

      expect(screen.getByTestId('error')).not.toHaveTextContent('no-error')
    })

    it('should handle malformed JSON responses', async () => {
      server.use(
        rest.get('http://localhost:3001/api/analytics/summary', (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.body('{"invalid": json}')
          )
        })
      )

      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      // Wait for initial connection
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 3000 })

      // Try to fetch summary
      fireEvent.click(screen.getByTestId('fetch-summary'))

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
      }, { timeout: 3000 })
    })

    it('should handle timeout scenarios', async () => {
      server.use(
        rest.get('http://localhost:3001/api/analytics/health', async (req, res, ctx) => {
          await new Promise(resolve => setTimeout(resolve, 10000)) // 10 second delay
          return res(
            ctx.status(200),
            ctx.json({ status: 'healthy' })
          )
        })
      )

      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
      }, { timeout: 15000 })
    })
  })

  describe('ConnectionStatus Component - Validación Visual', () => {
    it('should render connected state correctly', () => {
      const health = {
        status: 'healthy' as const,
        circuitBreaker: { state: 'closed', failures: 0, lastFailure: 0 },
        lastCheck: new Date().toISOString(),
        responseTime: 150
      }

      render(<ConnectionStatus status="connected" health={health} />)

      expect(screen.getByText('Conectado')).toBeInTheDocument()
      // Verificar que el elemento contiene el texto del circuit breaker
      const statusElement = screen.getByRole('status')
      expect(statusElement.textContent).toContain('CB: closed')
      expect(screen.getByText('150ms')).toBeInTheDocument()
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Servicio conectado')
    })

    it('should render connecting state with animation', () => {
      render(<ConnectionStatus status="connecting" />)

      expect(screen.getByText('Conectando…')).toBeInTheDocument()
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Conectando al servicio')
      
      // Verificar que el elemento tiene las clases de animación
      const statusElement = screen.getByRole('status')
      expect(statusElement.querySelector('.animate-pulse')).toBeInTheDocument()
    })

    it('should render error state with warning', () => {
      const health = {
        status: 'unhealthy' as const,
        circuitBreaker: { state: 'open', failures: 5, lastFailure: Date.now() },
        lastCheck: new Date().toISOString(),
        responseTime: 5000
      }

      render(<ConnectionStatus status="error" message="Connection timeout" health={health} />)

      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('Connection timeout')).toBeInTheDocument()
      // Verificar que el elemento contiene el texto del circuit breaker
      const statusElement = screen.getByRole('status')
      expect(statusElement.textContent).toContain('CB: open')
      expect(screen.getByText('5000ms')).toBeInTheDocument()
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Error de conexión')
    })

    it('should render degraded state', () => {
      const health = {
        status: 'degraded' as const,
        circuitBreaker: { state: 'half-open', failures: 2, lastFailure: Date.now() },
        lastCheck: new Date().toISOString(),
        responseTime: 2000
      }

      render(<ConnectionStatus status="degraded" health={health} />)

      expect(screen.getByText('Degradado')).toBeInTheDocument()
      // Verificar que el elemento contiene el texto del circuit breaker
      const statusElement = screen.getByRole('status')
      expect(statusElement.textContent).toContain('CB: half-open')
      expect(screen.getByText('2000ms')).toBeInTheDocument()
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Servicio degradado')
    })

    it('should render disconnected state', () => {
      render(<ConnectionStatus status="disconnected" />)

      expect(screen.getByText('Desconectado')).toBeInTheDocument()
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Servicio desconectado')
    })

    it('should handle missing health data gracefully', () => {
      render(<ConnectionStatus status="connected" />)

      expect(screen.getByText('Conectado')).toBeInTheDocument()
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Servicio conectado')
      // No debe mostrar información de circuit breaker ni response time
      expect(screen.queryByText(/CB:/)).not.toBeInTheDocument()
      expect(screen.queryByText(/ms/)).not.toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      render(<ConnectionStatus status="connected" />)

      const statusElement = screen.getByRole('status')
      expect(statusElement).toHaveAttribute('tabIndex', '0')
      expect(statusElement).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('AnalyticsService - Validación de Datos', () => {
    it('should validate event tracking requests', async () => {
      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      // Wait for initial connection
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 3000 })

      // Track event with valid data
      fireEvent.click(screen.getByTestId('track-event'))

      await waitFor(() => {
        expect(consoleSpy.log).toHaveBeenCalledWith('Event tracked successfully:', 'test_event')
      }, { timeout: 3000 })

      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
    })

    it('should validate metric tracking requests', async () => {
      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      // Wait for initial connection
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 3000 })

      // Track metric with valid data
      fireEvent.click(screen.getByTestId('track-metric'))

      await waitFor(() => {
        expect(consoleSpy.log).toHaveBeenCalledWith('Metric tracked successfully:', 'test_metric')
      }, { timeout: 3000 })

      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
    })

    it('should validate query parameters', async () => {
      render(
        <AnalyticsProvider>
          <TestAnalyticsComponent />
        </AnalyticsProvider>
      )

      // Wait for initial connection
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 3000 })

      // Fetch events (uses default query parameters)
      fireEvent.click(screen.getByTestId('fetch-events'))

      await waitFor(() => {
        expect(screen.getByTestId('events-count')).toHaveTextContent('2')
      }, { timeout: 3000 })

      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
    })
  })
}) 