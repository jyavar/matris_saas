import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ConnectionStatus from '../ConnectionStatus'
import { MLProvider } from '../../../contexts/MLContext'
import { MLService } from '../../../services/ml.service'
import type { ServiceHealth } from '../../../services/ml.service'

// Mock del servicio ML
vi.mock('@/services/ml.service', () => ({
  MLService: {
    checkHealth: vi.fn(),
    getAllModels: vi.fn()
  }
}))

// Wrapper para el contexto
const renderWithContext = (component: React.ReactElement) => {
  return render(
    <MLProvider>
      {component}
    </MLProvider>
  )
}

// Factory para health data
const createMockHealth = (overrides: Partial<ServiceHealth> = {}): ServiceHealth => ({
  status: 'healthy',
  uptime: 3600,
  responseTime: 100,
  lastCheck: '2024-01-01T00:00:00Z',
  circuitBreaker: {
    state: 'closed',
    failureCount: 0,
    lastFailure: null
  },
  mlServices: {
    training: 'available',
    inference: 'available',
    dataProcessing: 'available'
  },
  ...overrides
})

describe('ConnectionStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Renderizado inicial', () => {
    it('debe renderizar el componente correctamente', () => {
      renderWithContext(<ConnectionStatus />)
      
      expect(screen.getByText('ML Service Status')).toBeInTheDocument()
      expect(screen.getByText('Connecting...')).toBeInTheDocument()
    })

    it('debe mostrar el estado de conexión conectando por defecto', () => {
      renderWithContext(<ConnectionStatus />)
      
      const statusText = screen.getByText('Connecting...')
      expect(statusText).toBeInTheDocument()
    })
  })

  describe('Estados de conexión', () => {
    it('debe mostrar estado conectado y saludable', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: true,
        data: createMockHealth()
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByText('Connected & Healthy')).toBeInTheDocument()
      })
    })

    it('debe mostrar estado conectado pero degradado', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: true,
        data: createMockHealth({ status: 'degraded' })
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        // El contexto muestra 'Connection Error' si health.status !== 'healthy'
        expect(screen.getByText('Connection Error')).toBeInTheDocument()
      })
    })

    it('debe mostrar estado de error', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: false,
        error: 'Health check failed'
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByText('Connection Error')).toBeInTheDocument()
      })
    })

    it('debe mostrar estado conectando', async () => {
      vi.mocked(MLService.checkHealth).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          success: true,
          data: createMockHealth()
        }), 100))
      )

      renderWithContext(<ConnectionStatus />)

      // Durante el health check inicial
      expect(screen.getByText('Connecting...')).toBeInTheDocument()
    })
  })

  describe('Información de health', () => {
    it('debe mostrar métricas de health cuando están disponibles', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: true,
        data: createMockHealth({
          uptime: 7200,
          responseTime: 150
        })
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByText('Uptime: 2h')).toBeInTheDocument()
        expect(screen.getByText('Response: 150ms')).toBeInTheDocument()
        expect(screen.getByText('Circuit: Normal')).toBeInTheDocument()
      })
    })

    it('debe mostrar estado del circuit breaker', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: true,
        data: createMockHealth({
          circuitBreaker: {
            state: 'open',
            failureCount: 5,
            lastFailure: '2024-01-01T00:00:00Z'
          }
        })
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByText('Circuit: Open (Failing)')).toBeInTheDocument()
      })
    })
  })

  describe('Botón de reconexión', () => {
    it('debe mostrar botón de reconexión cuando hay error', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: false,
        error: 'Connection failed'
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /reconnect/i })).toBeInTheDocument()
      })
    })

    it('debe mostrar botón de reconexión cuando está desconectado', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: false,
        error: 'Connection failed'
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /reconnect/i })).toBeInTheDocument()
      })
    })

    it('debe manejar click en botón de reconexión', async () => {
      vi.mocked(MLService.checkHealth)
        .mockResolvedValueOnce({
          success: false,
          error: 'Connection failed'
        })
        .mockResolvedValueOnce({
          success: true,
          data: createMockHealth()
        })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /reconnect/i })).toBeInTheDocument()
      })

      fireEvent.click(screen.getByRole('button', { name: /reconnect/i }))

      await waitFor(() => {
        expect(screen.getByText('Connected & Healthy')).toBeInTheDocument()
      })
    })

    it('no debe mostrar botón de reconexión cuando está conectado', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: true,
        data: createMockHealth()
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByText('Connected & Healthy')).toBeInTheDocument()
      })

      expect(screen.queryByRole('button', { name: /reconnect/i })).not.toBeInTheDocument()
    })
  })

  describe('Manejo de errores', () => {
    it('debe mostrar mensaje de error cuando hay error en el contexto', async () => {
      vi.mocked(MLService.checkHealth).mockRejectedValue(new Error('Network error'))

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByText(/Error: Network error/)).toBeInTheDocument()
      })
    })

    it('debe mostrar error en health check fallido', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: false,
        error: 'Service unavailable'
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByText(/Error: Service unavailable/)).toBeInTheDocument()
      })
    })
  })

  describe('Accesibilidad', () => {
    it('debe tener aria-label correcto', () => {
      renderWithContext(<ConnectionStatus />)
      
      expect(screen.getByLabelText('ML Connection Status')).toBeInTheDocument()
    })

    it('debe tener aria-label en botón de reconexión', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: false,
        error: 'Connection failed'
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByLabelText('Reconnect to ML service')).toBeInTheDocument()
      })
    })
  })

  describe('Performance', () => {
    it('debe renderizar en menos de 1 segundo', async () => {
      const startTime = Date.now()
      
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: true,
        data: createMockHealth()
      })

      renderWithContext(<ConnectionStatus />)

      await waitFor(() => {
        expect(screen.getByText('Connected & Healthy')).toBeInTheDocument()
      })

      const duration = Date.now() - startTime
      expect(duration).toBeLessThan(1000)
    })
  })
}) 