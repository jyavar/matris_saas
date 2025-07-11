import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { HealthProvider, useHealth } from '../contexts/HealthContext'
import ConnectionStatus from '../components/health/ConnectionStatus'

// Mock the health service
vi.mock('../services/health.service', () => ({
  HealthService: {
    checkHealth: vi.fn(),
    getHealthStatus: vi.fn(),
    getHealthMetrics: vi.fn(),
    checkServiceHealth: vi.fn(),
    getCircuitBreakerState: vi.fn(),
    resetCircuitBreaker: vi.fn(),
    isCircuitBreakerOpen: vi.fn(),
  }
}))

// Mock the supabase lib
vi.mock('../lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-token'))
}))

// Import the mocked service
import { HealthService } from '../services/health.service'

// Test component to access context
function TestComponent() {
  const { state, checkHealth, getHealthStatus, getHealthMetrics, clearError, retryConnection, refreshData, resetCircuitBreaker } = useHealth()
  
  return (
    <div>
      <div data-testid="connection-status">{state.connectionStatus}</div>
      <div data-testid="loading">{state.loading.toString()}</div>
      <div data-testid="error">{state.error || 'no-error'}</div>
      <button onClick={() => checkHealth()}>Check Health</button>
      <button onClick={() => getHealthStatus()}>Get Status</button>
      <button onClick={() => getHealthMetrics()}>Get Metrics</button>
      <button onClick={clearError}>Clear Error</button>
      <button onClick={() => retryConnection()}>Retry</button>
      <button onClick={() => refreshData()}>Refresh</button>
      <button onClick={resetCircuitBreaker}>Reset Circuit</button>
    </div>
  )
}

describe('Health Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default successful health check
    vi.mocked(HealthService.checkHealth).mockResolvedValue({
      isHealthy: true,
      lastCheck: Date.now(),
      responseTime: 100,
      errorRate: 0,
    })

    // Default circuit breaker state
    vi.mocked(HealthService.getCircuitBreakerState).mockReturnValue({
      failures: 0,
      lastFailureTime: 0,
      state: 'CLOSED' as const,
    })

    // Default health status
    vi.mocked(HealthService.getHealthStatus).mockResolvedValue({
      success: true,
      data: {
        status: 'healthy',
        message: 'System is operational',
        timestamp: new Date().toISOString(),
        uptime: 3600,
        memory: {
          used: 1024 * 1024 * 512, // 512MB
          total: 1024 * 1024 * 1024, // 1GB
          percentage: 50,
        },
        version: '1.0.0',
        services: {
          database: {
            status: 'healthy',
            responseTime: 50,
            lastCheck: new Date().toISOString(),
          },
        },
      },
    })

    // Default health metrics
    vi.mocked(HealthService.getHealthMetrics).mockResolvedValue({
      success: true,
      data: {
        totalChecks: 100,
        successfulChecks: 95,
        failedChecks: 5,
        averageResponseTime: 150,
        uptime: 3600,
        lastIncident: {
          timestamp: new Date().toISOString(),
          duration: 300,
          description: 'Database connection timeout',
        },
      },
    })

    // Default service health check
    vi.mocked(HealthService.checkServiceHealth).mockResolvedValue({
      success: true,
      data: {
        status: 'healthy',
        message: 'Service is operational',
        timestamp: new Date().toISOString(),
        uptime: 1800,
        memory: {
          used: 256 * 1024 * 1024,
          total: 512 * 1024 * 1024,
          percentage: 50,
        },
        version: '1.0.0',
        services: {},
      },
    })
  })

  describe('HealthContext', () => {
    it('should initialize with disconnected status', () => {
      render(
        <HealthProvider>
          <TestComponent />
        </HealthProvider>
      )

      expect(screen.getByTestId('connection-status')).toHaveTextContent('disconnected')
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
    })

    it('should connect successfully on mount', async () => {
      render(
        <HealthProvider>
          <TestComponent />
        </HealthProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      })

      expect(HealthService.checkHealth).toHaveBeenCalled()
      expect(HealthService.getHealthStatus).toHaveBeenCalled()
      expect(HealthService.getHealthMetrics).toHaveBeenCalled()
    })

    it('should handle health check success', async () => {
      render(
        <HealthProvider>
          <TestComponent />
        </HealthProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Check Health'))

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      })

      expect(HealthService.checkHealth).toHaveBeenCalled()
    })

    it('should handle health check failure', async () => {
      vi.mocked(HealthService.checkHealth).mockResolvedValue({
        isHealthy: false,
        lastCheck: Date.now(),
        responseTime: 5000,
        errorRate: 0.8,
      })

      render(
        <HealthProvider>
          <TestComponent />
        </HealthProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Check Health'))

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
        expect(screen.getByTestId('error')).toHaveTextContent('Health check failed')
      })
    })

    it('should handle service errors', async () => {
      vi.mocked(HealthService.getHealthStatus).mockResolvedValue({
        success: false,
        error: 'Service unavailable',
      })

      render(
        <HealthProvider>
          <TestComponent />
        </HealthProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Get Status'))

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Service unavailable')
      })
    })

    it('should clear errors', async () => {
      vi.mocked(HealthService.getHealthStatus).mockResolvedValue({
        success: false,
        error: 'Service unavailable',
      })

      render(
        <HealthProvider>
          <TestComponent />
        </HealthProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Get Status'))

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Service unavailable')
      })

      await user.click(screen.getByText('Clear Error'))

      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
    })

    it('should retry connection', async () => {
      render(
        <HealthProvider>
          <TestComponent />
        </HealthProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Retry'))

      expect(HealthService.checkHealth).toHaveBeenCalled()
    })

    it('should refresh data', async () => {
      render(
        <HealthProvider>
          <TestComponent />
        </HealthProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Refresh'))

      expect(HealthService.getHealthStatus).toHaveBeenCalled()
      expect(HealthService.getHealthMetrics).toHaveBeenCalled()
    })

    it('should reset circuit breaker', async () => {
      render(
        <HealthProvider>
          <TestComponent />
        </HealthProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Reset Circuit'))

      expect(HealthService.resetCircuitBreaker).toHaveBeenCalled()
    })
  })

  describe('ConnectionStatus Component', () => {
    it('should render connection status', async () => {
      render(
        <HealthProvider>
          <ConnectionStatus />
        </HealthProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Connected')).toBeInTheDocument()
      })
    })

    it('should render compact version', async () => {
      render(
        <HealthProvider>
          <ConnectionStatus compact />
        </HealthProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Connected')).toBeInTheDocument()
      })
    })

    it('should show details when showDetails is true', async () => {
      render(
        <HealthProvider>
          <ConnectionStatus showDetails />
        </HealthProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Circuit Breaker:')).toBeInTheDocument()
        expect(screen.getByText('CLOSED')).toBeInTheDocument()
      })
    })

    it('should handle refresh button click', async () => {
      render(
        <HealthProvider>
          <ConnectionStatus />
        </HealthProvider>
      )

      const user = userEvent.setup()
      const refreshButton = screen.getByLabelText('Refresh health status')
      await user.click(refreshButton)

      expect(HealthService.checkHealth).toHaveBeenCalled()
    })

    it('should show error state', async () => {
      vi.mocked(HealthService.checkHealth).mockResolvedValue({
        isHealthy: false,
        lastCheck: Date.now(),
        responseTime: 5000,
        errorRate: 0.8,
      })

      render(
        <HealthProvider>
          <ConnectionStatus />
        </HealthProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Error')).toBeInTheDocument()
      })
    })

    it('should show connecting state', async () => {
      vi.mocked(HealthService.checkHealth).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          isHealthy: true,
          lastCheck: Date.now(),
          responseTime: 100,
          errorRate: 0,
        }), 100))
      )

      render(
        <HealthProvider>
          <ConnectionStatus />
        </HealthProvider>
      )

      // Should show connecting briefly
      expect(screen.getByText('Connecting')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      vi.mocked(HealthService.checkHealth).mockRejectedValue(new Error('Network error'))

      render(
        <HealthProvider>
          <TestComponent />
        </HealthProvider>
      )

      const user = userEvent.setup()
      await user.click(screen.getByText('Check Health'))

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Network error')
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
      })
    })

    it('should handle circuit breaker open state', async () => {
      vi.mocked(HealthService.getCircuitBreakerState).mockReturnValue({
        failures: 10,
        lastFailureTime: Date.now(),
        state: 'OPEN' as const,
      })

      render(
        <HealthProvider>
          <ConnectionStatus showDetails />
        </HealthProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('OPEN')).toBeInTheDocument()
      })
    })
  })
}) 