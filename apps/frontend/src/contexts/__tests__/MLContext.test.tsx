import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MLProvider, useML } from '../MLContext'
import { MLService } from '../../services/ml.service'
import type { MLModel, MLDataset, MLTrainingJob, ServiceHealth } from '../../services/ml.service'

// Mock del servicio ML
vi.mock('../../services/ml.service', () => ({
  MLService: {
    checkHealth: vi.fn(),
    getAllModels: vi.fn(),
    getAllDatasets: vi.fn(),
    getAllTrainingJobs: vi.fn(),
    getPredictionHistory: vi.fn(),
    getAllAnalyses: vi.fn(),
    getAllDeployments: vi.fn(),
    getFeatureImportance: vi.fn(),
    makePrediction: vi.fn()
  }
}))

// Componente de prueba para acceder al contexto
const TestComponent: React.FC = () => {
  const { state, fetchModels, selectModel, clearError, isConnected, isHealthy } = useML()
  
  return (
    <div>
      <div data-testid="models-count">{state.models.length}</div>
      <div data-testid="connection-status">{state.connectionStatus}</div>
      <div data-testid="is-connected">{isConnected.toString()}</div>
      <div data-testid="is-healthy">{isHealthy.toString()}</div>
      <div data-testid="selected-model">{state.selectedModel?.name || 'none'}</div>
      <div data-testid="error">{state.error || 'none'}</div>
      <button onClick={fetchModels} data-testid="fetch-models">Fetch Models</button>
      <button onClick={() => selectModel({ id: '1', name: 'Test Model' } as MLModel)} data-testid="select-model">
        Select Model
      </button>
      <button onClick={clearError} data-testid="clear-error">Clear Error</button>
    </div>
  )
}

// Factories para datos de prueba
const createMockModel = (overrides: Partial<MLModel> = {}): MLModel => ({
  id: 'model-1',
  name: 'Test Model',
  type: 'classification',
  status: 'ready',
  accuracy: 0.95,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  version: '1.0.0',
  parameters: {},
  dataset_size: 1000,
  training_time: 3600,
  last_trained: '2024-01-01T00:00:00Z',
  ...overrides
})

const createMockDataset = (overrides: Partial<MLDataset> = {}): MLDataset => ({
  id: 'dataset-1',
  name: 'Test Dataset',
  description: 'Test description',
  size: 1024,
  features: 10,
  samples: 1000,
  type: 'structured',
  format: 'csv',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  status: 'ready',
  validation_status: 'validated',
  ...overrides
})

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

describe('MLContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Health Check', () => {
    it('debe manejar health check exitoso', async () => {
      const mockHealth = createMockHealth()
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: true,
        data: mockHealth
      })

      render(
        <MLProvider>
          <TestComponent />
        </MLProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
        expect(screen.getByTestId('is-connected')).toHaveTextContent('true')
        expect(screen.getByTestId('is-healthy')).toHaveTextContent('true')
      })
    })

    it('debe manejar health check fallido', async () => {
      vi.mocked(MLService.checkHealth).mockResolvedValue({
        success: false,
        error: 'Health check failed'
      })

      render(
        <MLProvider>
          <TestComponent />
        </MLProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
        expect(screen.getByTestId('is-connected')).toHaveTextContent('false')
      })
    })

    it('debe manejar error en health check', async () => {
      vi.mocked(MLService.checkHealth).mockRejectedValue(new Error('Network error'))

      render(
        <MLProvider>
          <TestComponent />
        </MLProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
        expect(screen.getByTestId('error')).toHaveTextContent('Network error')
      })
    })
  })

  describe('Fetch Models', () => {
    it('debe cargar modelos exitosamente', async () => {
      const mockModels = [createMockModel(), createMockModel({ id: 'model-2', name: 'Model 2' })]
      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: true,
        data: mockModels,
        count: 2,
        page: 1,
        limit: 20,
        total_pages: 1
      })

      render(
        <MLProvider>
          <TestComponent />
        </MLProvider>
      )

      await act(async () => {
        screen.getByTestId('fetch-models').click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('models-count')).toHaveTextContent('2')
      })
    })

    it('debe manejar error al cargar modelos', async () => {
      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: false,
        data: [],
        count: 0,
        page: 1,
        limit: 20,
        total_pages: 0
      })

      render(
        <MLProvider>
          <TestComponent />
        </MLProvider>
      )

      await act(async () => {
        screen.getByTestId('fetch-models').click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Error fetching models')
      })
    })
  })

  describe('Selección de elementos', () => {
    it('debe seleccionar un modelo correctamente', async () => {
      render(
        <MLProvider>
          <TestComponent />
        </MLProvider>
      )

      await act(async () => {
        screen.getByTestId('select-model').click()
      })

      expect(screen.getByTestId('selected-model')).toHaveTextContent('Test Model')
    })

    it('debe limpiar errores correctamente', async () => {
      // Primero generar un error
      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: false,
        data: [],
        count: 0,
        page: 1,
        limit: 20,
        total_pages: 0
      })

      render(
        <MLProvider>
          <TestComponent />
        </MLProvider>
      )

      await act(async () => {
        screen.getByTestId('fetch-models').click()
      })

      await waitFor(() => {
        expect(screen.getByTestId('error')).not.toHaveTextContent('none')
      })

      // Luego limpiar el error
      await act(async () => {
        screen.getByTestId('clear-error').click()
      })

      expect(screen.getByTestId('error')).toHaveTextContent('none')
    })
  })
}) 