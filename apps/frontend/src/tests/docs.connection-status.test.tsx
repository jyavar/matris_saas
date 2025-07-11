import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { DocsProvider } from '../contexts/DocsContext'
import { ConnectionStatus } from '../components/ConnectionStatus'

// Mock del servicio Docs
vi.mock('../services/docs.service', () => ({
  DocsService: {
    getAllDocs: vi.fn(),
    getDocById: vi.fn(),
    getDocBySlug: vi.fn(),
    getCategories: vi.fn(),
    searchDocs: vi.fn(),
    getFeaturedDocs: vi.fn(),
    getRelatedDocs: vi.fn(),
    incrementViews: vi.fn(),
    rateDoc: vi.fn(),
    checkHealth: vi.fn()
  }
}))

import { DocsService } from '../services/docs.service'

describe('Docs ConnectionStatus Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('should render with default state', () => {
      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      // Debería mostrar el estado inicial
      expect(screen.getByText(/Documentation Service/i)).toBeInTheDocument()
    })
  })

  describe('health check', () => {
    it('should show healthy status when service is up', async () => {
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'healthy',
          uptime: 99.9,
          responseTime: 150,
          lastCheck: new Date().toISOString(),
          circuitBreaker: {
            state: 'closed',
            failureCount: 0,
            lastFailure: null
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/healthy/i)).toBeInTheDocument()
        expect(screen.getByText(/99\.9%/)).toBeInTheDocument()
      })
    })

    it('should show degraded status when service has issues', async () => {
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'degraded',
          uptime: 85.5,
          responseTime: 2000,
          lastCheck: new Date().toISOString(),
          circuitBreaker: {
            state: 'half-open',
            failureCount: 3,
            lastFailure: new Date().toISOString()
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/degraded/i)).toBeInTheDocument()
        expect(screen.getByText(/85\.5%/)).toBeInTheDocument()
      })
    })

    it('should show offline status when service is down', async () => {
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'offline',
          uptime: 0,
          responseTime: 0,
          lastCheck: new Date().toISOString(),
          circuitBreaker: {
            state: 'open',
            failureCount: 10,
            lastFailure: new Date().toISOString()
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/offline/i)).toBeInTheDocument()
        expect(screen.getByText(/0%/)).toBeInTheDocument()
      })
    })
  })

  describe('error handling', () => {
    it('should show error state when health check fails', async () => {
      const mockErrorResponse = {
        success: false,
        error: 'Health check failed'
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockErrorResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument()
      })
    })

    it('should show circuit breaker open state', async () => {
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'offline',
          uptime: 0,
          responseTime: 0,
          lastCheck: new Date().toISOString(),
          circuitBreaker: {
            state: 'open',
            failureCount: 15,
            lastFailure: new Date().toISOString()
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/circuit breaker open/i)).toBeInTheDocument()
      })
    })
  })

  describe('response time display', () => {
    it('should show fast response time in green', async () => {
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'healthy',
          uptime: 99.9,
          responseTime: 50,
          lastCheck: new Date().toISOString(),
          circuitBreaker: {
            state: 'closed',
            failureCount: 0,
            lastFailure: null
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/50ms/)).toBeInTheDocument()
      })
    })

    it('should show slow response time in yellow', async () => {
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'degraded',
          uptime: 95.0,
          responseTime: 1500,
          lastCheck: new Date().toISOString(),
          circuitBreaker: {
            state: 'half-open',
            failureCount: 2,
            lastFailure: new Date().toISOString()
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/1500ms/)).toBeInTheDocument()
      })
    })
  })

  describe('uptime display', () => {
    it('should format uptime percentage correctly', async () => {
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'healthy',
          uptime: 99.99,
          responseTime: 100,
          lastCheck: new Date().toISOString(),
          circuitBreaker: {
            state: 'closed',
            failureCount: 0,
            lastFailure: null
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/99\.99%/)).toBeInTheDocument()
      })
    })

    it('should handle zero uptime', async () => {
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'offline',
          uptime: 0,
          responseTime: 0,
          lastCheck: new Date().toISOString(),
          circuitBreaker: {
            state: 'open',
            failureCount: 20,
            lastFailure: new Date().toISOString()
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/0%/)).toBeInTheDocument()
      })
    })
  })

  describe('last check display', () => {
    it('should show last check time', async () => {
      const lastCheck = new Date('2024-01-15T10:30:00Z')
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'healthy',
          uptime: 99.9,
          responseTime: 100,
          lastCheck: lastCheck.toISOString(),
          circuitBreaker: {
            state: 'closed',
            failureCount: 0,
            lastFailure: null
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/Last check:/)).toBeInTheDocument()
      })
    })
  })

  describe('failure count display', () => {
    it('should show failure count when circuit breaker is active', async () => {
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'degraded',
          uptime: 90.0,
          responseTime: 2000,
          lastCheck: new Date().toISOString(),
          circuitBreaker: {
            state: 'half-open',
            failureCount: 5,
            lastFailure: new Date().toISOString()
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/5 failures/)).toBeInTheDocument()
      })
    })

    it('should not show failure count when circuit breaker is closed', async () => {
      const mockHealthResponse = {
        success: true,
        data: {
          status: 'healthy',
          uptime: 99.9,
          responseTime: 100,
          lastCheck: new Date().toISOString(),
          circuitBreaker: {
            state: 'closed',
            failureCount: 0,
            lastFailure: null
          }
        }
      }

      vi.mocked(DocsService.checkHealth).mockResolvedValue(mockHealthResponse)

      render(
        <DocsProvider>
          <ConnectionStatus />
        </DocsProvider>
      )

      await waitFor(() => {
        expect(screen.queryByText(/failures/)).not.toBeInTheDocument()
      })
    })
  })
}) 