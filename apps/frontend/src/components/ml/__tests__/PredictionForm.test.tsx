import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PredictionForm from '../PredictionForm'
import { MLProvider } from '../../../contexts/MLContext'
import { MLService } from '../../../services/ml.service'
import type { MLModel, MLPrediction } from '../../../services/ml.service'

// Mock del servicio ML
vi.mock('../../../services/ml.service', () => ({
  MLService: {
    checkHealth: vi.fn(),
    getAllModels: vi.fn(),
    getPredictionHistory: vi.fn(),
    makePrediction: vi.fn()
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

// Factory para modelos
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

// Factory para predicciones
const createMockPrediction = (overrides: Partial<MLPrediction> = {}): MLPrediction => ({
  id: 'pred-1',
  model_id: 'model-1',
  input_data: { feature1: 'value1' },
  prediction: 'class_a',
  confidence: 0.95,
  timestamp: '2024-01-01T00:00:00Z',
  processing_time: 150,
  metadata: {},
  ...overrides
})

describe('PredictionForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock inicial para health check
    vi.mocked(MLService.checkHealth).mockResolvedValue({
      success: true,
      data: {
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
        }
      }
    })
  })

  describe('Renderizado inicial', () => {
    it('debe renderizar el formulario correctamente', () => {
      renderWithContext(<PredictionForm />)
      
      expect(screen.getByText('Make Prediction')).toBeInTheDocument()
      expect(screen.getByLabelText('Select Model')).toBeInTheDocument()
      expect(screen.getByLabelText('Input Data (JSON or text)')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /predict/i })).toBeInTheDocument()
    })

    it('debe mostrar selector de modelo vacío por defecto', () => {
      renderWithContext(<PredictionForm />)
      
      const modelSelect = screen.getByLabelText('Select Model') as HTMLSelectElement
      expect(modelSelect.value).toBe('')
    })

    it('debe mostrar textarea de input vacío por defecto', () => {
      renderWithContext(<PredictionForm />)
      
      const inputTextarea = screen.getByLabelText('Input Data (JSON or text)') as HTMLTextAreaElement
      expect(inputTextarea.value).toBe('')
    })

    it('debe tener botón de predicción deshabilitado inicialmente', () => {
      renderWithContext(<PredictionForm />)
      
      const predictButton = screen.getByRole('button', { name: /predict/i })
      expect(predictButton).toBeDisabled()
    })
  })

  describe('Selección de modelo', () => {
    it('debe mostrar modelos disponibles en el selector', async () => {
      const mockModels = [
        createMockModel({ id: 'model-1', name: 'Model 1', type: 'classification' }),
        createMockModel({ id: 'model-2', name: 'Model 2', type: 'regression' })
      ]

      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: true,
        data: mockModels,
        count: 2,
        page: 1,
        limit: 20,
        total_pages: 1
      })

      renderWithContext(<PredictionForm />)

      // Trigger fetch de modelos
      await waitFor(() => {
        expect(MLService.getAllModels).toHaveBeenCalled()
      })

      const modelSelect = screen.getByLabelText('Select Model') as HTMLSelectElement
      expect(modelSelect.options).toHaveLength(3) // Incluye la opción vacía
      expect(modelSelect.options[1]?.text).toContain('Model 1 (classification)')
      expect(modelSelect.options[2]?.text).toContain('Model 2 (regression)')
    })

    it('debe mostrar solo modelos listos o desplegados', async () => {
      const mockModels = [
        createMockModel({ id: 'model-1', name: 'Ready Model', status: 'ready' }),
        createMockModel({ id: 'model-2', name: 'Deployed Model', status: 'deployed' }),
        createMockModel({ id: 'model-3', name: 'Training Model', status: 'training' })
      ]

      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: true,
        data: mockModels,
        count: 3,
        page: 1,
        limit: 20,
        total_pages: 1
      })

      renderWithContext(<PredictionForm />)

      await waitFor(() => {
        expect(MLService.getAllModels).toHaveBeenCalled()
      })

      const modelSelect = screen.getByLabelText('Select Model') as HTMLSelectElement
      expect(modelSelect.options).toHaveLength(3) // Solo ready y deployed
      expect(modelSelect.options[1]?.text).toContain('Ready Model')
      expect(modelSelect.options[2]?.text).toContain('Deployed Model')
    })
  })

  describe('Validación de formulario', () => {
    it('debe habilitar botón cuando se selecciona modelo y se ingresa data', async () => {
      const mockModels = [createMockModel()]
      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: true,
        data: mockModels,
        count: 1,
        page: 1,
        limit: 20,
        total_pages: 1
      })

      renderWithContext(<PredictionForm />)

      await waitFor(() => {
        expect(MLService.getAllModels).toHaveBeenCalled()
      })

      const modelSelect = screen.getByLabelText('Select Model')
      const inputTextarea = screen.getByLabelText('Input Data (JSON or text)')
      const predictButton = screen.getByRole('button', { name: /predict/i })

      // Inicialmente deshabilitado
      expect(predictButton).toBeDisabled()

      // Seleccionar modelo
      fireEvent.change(modelSelect, { target: { value: 'model-1' } })
      expect(predictButton).toBeDisabled() // Aún necesita input

      // Ingresar data
      fireEvent.change(inputTextarea, { target: { value: 'test data' } })
      expect(predictButton).not.toBeDisabled()
    })
  })

  describe('Predicciones exitosas', () => {
    it('debe manejar predicción con JSON válido', async () => {
      const mockModels = [createMockModel()]
      const mockPrediction = createMockPrediction({
        prediction: 'class_a',
        confidence: 0.95,
        processing_time: 150
      })

      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: true,
        data: mockModels,
        count: 1,
        page: 1,
        limit: 20,
        total_pages: 1
      })

      vi.mocked(MLService.makePrediction).mockResolvedValue({
        success: true,
        data: mockPrediction,
        metadata: { processing_time: 150, model_version: '1.0.0' }
      })

      renderWithContext(<PredictionForm />)

      await waitFor(() => {
        expect(MLService.getAllModels).toHaveBeenCalled()
      })

      const modelSelect = screen.getByLabelText('Select Model')
      const inputTextarea = screen.getByLabelText('Input Data (JSON or text)')
      const predictButton = screen.getByRole('button', { name: /predict/i })

      fireEvent.change(modelSelect, { target: { value: 'model-1' } })
      fireEvent.change(inputTextarea, { target: { value: '{"feature1": "value1"}' } })
      fireEvent.click(predictButton)

      await waitFor(() => {
        expect(screen.getByText('Prediction Result')).toBeInTheDocument()
        expect(screen.getByText((content) => content.includes('class_a'))).toBeInTheDocument()
        expect(screen.getByText((content) => content.includes('95.0'))).toBeInTheDocument()
        expect(screen.getByText((content) => content.includes('150'))).toBeInTheDocument()
      })
    })

    it('debe manejar predicción con texto plano', async () => {
      const mockModels = [createMockModel()]
      const mockPrediction = createMockPrediction({
        prediction: 'positive',
        confidence: 0.87
      })

      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: true,
        data: mockModels,
        count: 1,
        page: 1,
        limit: 20,
        total_pages: 1
      })

      vi.mocked(MLService.makePrediction).mockResolvedValue({
        success: true,
        data: mockPrediction
      })

      renderWithContext(<PredictionForm />)

      await waitFor(() => {
        expect(MLService.getAllModels).toHaveBeenCalled()
      })

      const modelSelect = screen.getByLabelText('Select Model')
      const inputTextarea = screen.getByLabelText('Input Data (JSON or text)')
      const predictButton = screen.getByRole('button', { name: /predict/i })

      fireEvent.change(modelSelect, { target: { value: 'model-1' } })
      fireEvent.change(inputTextarea, { target: { value: 'This is a test text' } })
      fireEvent.click(predictButton)

      await waitFor(() => {
        expect(screen.getByText((content) => content.includes('positive'))).toBeInTheDocument()
        expect(screen.getByText((content) => content.includes('87.0'))).toBeInTheDocument()
      })
    })
  })

  describe('Manejo de errores', () => {
    it('debe mostrar error cuando la predicción falla', async () => {
      const mockModels = [createMockModel()]
      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: true,
        data: mockModels,
        count: 1,
        page: 1,
        limit: 20,
        total_pages: 1
      })

      vi.mocked(MLService.makePrediction).mockResolvedValue({
        success: false,
        error: 'Model not available'
      })

      renderWithContext(<PredictionForm />)

      await waitFor(() => {
        expect(MLService.getAllModels).toHaveBeenCalled()
      })

      const modelSelect = screen.getByLabelText('Select Model')
      const inputTextarea = screen.getByLabelText('Input Data (JSON or text)')
      const predictButton = screen.getByRole('button', { name: /predict/i })

      fireEvent.change(modelSelect, { target: { value: 'model-1' } })
      fireEvent.change(inputTextarea, { target: { value: 'test data' } })
      fireEvent.click(predictButton)

      await waitFor(() => {
        expect(screen.getByText(/Error: Model not available/)).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando hay excepción', async () => {
      const mockModels = [createMockModel()]
      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: true,
        data: mockModels,
        count: 1,
        page: 1,
        limit: 20,
        total_pages: 1
      })

      vi.mocked(MLService.makePrediction).mockRejectedValue(new Error('Network error'))

      renderWithContext(<PredictionForm />)

      await waitFor(() => {
        expect(MLService.getAllModels).toHaveBeenCalled()
      })

      const modelSelect = screen.getByLabelText('Select Model')
      const inputTextarea = screen.getByLabelText('Input Data (JSON or text)')
      const predictButton = screen.getByRole('button', { name: /predict/i })

      fireEvent.change(modelSelect, { target: { value: 'model-1' } })
      fireEvent.change(inputTextarea, { target: { value: 'test data' } })
      fireEvent.click(predictButton)

      await waitFor(() => {
        expect(screen.getByText(/Error: Network error/)).toBeInTheDocument()
      })
    })
  })

  describe('Estados de loading', () => {
    it('debe mostrar loading durante la predicción', async () => {
      const mockModels = [createMockModel()]
      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: true,
        data: mockModels,
        count: 1,
        page: 1,
        limit: 20,
        total_pages: 1
      })

      vi.mocked(MLService.makePrediction).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          success: true,
          data: createMockPrediction()
        }), 100))
      )

      renderWithContext(<PredictionForm />)

      await waitFor(() => {
        expect(MLService.getAllModels).toHaveBeenCalled()
      })

      const modelSelect = screen.getByLabelText('Select Model')
      const inputTextarea = screen.getByLabelText('Input Data (JSON or text)')
      const predictButton = screen.getByRole('button', { name: /predict/i })

      fireEvent.change(modelSelect, { target: { value: 'model-1' } })
      fireEvent.change(inputTextarea, { target: { value: 'test data' } })
      fireEvent.click(predictButton)

      expect(screen.getByText('Making Prediction...')).toBeInTheDocument()
      expect(predictButton).toBeDisabled()
    })
  })

  describe('Accesibilidad', () => {
    it('debe tener labels accesibles', () => {
      renderWithContext(<PredictionForm />)
      
      expect(screen.getByLabelText('Select Model')).toBeInTheDocument()
      expect(screen.getByLabelText('Input Data (JSON or text)')).toBeInTheDocument()
    })

    it('debe tener aria-label correcto', () => {
      renderWithContext(<PredictionForm />)
      
      expect(screen.getByLabelText('Prediction Form')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('debe completar predicción en menos de 5 segundos', async () => {
      const startTime = Date.now()
      
      const mockModels = [createMockModel()]
      vi.mocked(MLService.getAllModels).mockResolvedValue({
        success: true,
        data: mockModels,
        count: 1,
        page: 1,
        limit: 20,
        total_pages: 1
      })

      vi.mocked(MLService.makePrediction).mockResolvedValue({
        success: true,
        data: createMockPrediction()
      })

      renderWithContext(<PredictionForm />)

      await waitFor(() => {
        expect(MLService.getAllModels).toHaveBeenCalled()
      })

      const modelSelect = screen.getByLabelText('Select Model')
      const inputTextarea = screen.getByLabelText('Input Data (JSON or text)')
      const predictButton = screen.getByRole('button', { name: /predict/i })

      fireEvent.change(modelSelect, { target: { value: 'model-1' } })
      fireEvent.change(inputTextarea, { target: { value: 'test data' } })
      fireEvent.click(predictButton)

      await waitFor(() => {
        expect(screen.getByText('Prediction Result')).toBeInTheDocument()
      })

      const duration = Date.now() - startTime
      expect(duration).toBeLessThan(5000)
    })
  })
}) 