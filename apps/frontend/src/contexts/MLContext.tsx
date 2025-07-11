'use client'

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode
} from 'react'
import {
  MLService,
  MLModel,
  MLDataset,
  MLTrainingJob,
  MLPrediction,
  MLAnalysis,
  MLDeployment,
  ServiceHealth,
  MLFeature,
  MLResponse,
  MLListResponse
} from '@/services/ml.service'

// Estado global del contexto ML
export interface MLState {
  models: MLModel[]
  datasets: MLDataset[]
  trainingJobs: MLTrainingJob[]
  predictions: MLPrediction[]
  analyses: MLAnalysis[]
  deployments: MLDeployment[]
  features: MLFeature[]
  selectedModel: MLModel | null
  selectedDataset: MLDataset | null
  selectedJob: MLTrainingJob | null
  selectedAnalysis: MLAnalysis | null
  selectedDeployment: MLDeployment | null
  loading: boolean
  error: string | null
  health: ServiceHealth | null
  connectionStatus: 'connected' | 'connecting' | 'disconnected' | 'error'
  retryCount: number
  lastSync: string | null
}

export type MLAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_MODELS'; payload: MLModel[] }
  | { type: 'SET_DATASETS'; payload: MLDataset[] }
  | { type: 'SET_TRAINING_JOBS'; payload: MLTrainingJob[] }
  | { type: 'SET_PREDICTIONS'; payload: MLPrediction[] }
  | { type: 'SET_ANALYSES'; payload: MLAnalysis[] }
  | { type: 'SET_DEPLOYMENTS'; payload: MLDeployment[] }
  | { type: 'SET_FEATURES'; payload: MLFeature[] }
  | { type: 'SET_SELECTED_MODEL'; payload: MLModel | null }
  | { type: 'SET_SELECTED_DATASET'; payload: MLDataset | null }
  | { type: 'SET_SELECTED_JOB'; payload: MLTrainingJob | null }
  | { type: 'SET_SELECTED_ANALYSIS'; payload: MLAnalysis | null }
  | { type: 'SET_SELECTED_DEPLOYMENT'; payload: MLDeployment | null }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_HEALTH'; payload: ServiceHealth }
  | { type: 'SET_CONNECTION_STATUS'; payload: MLState['connectionStatus'] }
  | { type: 'INCREMENT_RETRY_COUNT' }
  | { type: 'RESET_RETRY_COUNT' }
  | { type: 'SET_LAST_SYNC'; payload: string }

export interface MLContextType {
  state: MLState
  fetchModels: () => Promise<void>
  fetchDatasets: () => Promise<void>
  fetchTrainingJobs: () => Promise<void>
  fetchPredictions: (modelId: string) => Promise<void>
  fetchAnalyses: () => Promise<void>
  fetchDeployments: () => Promise<void>
  fetchFeatures: (modelId: string) => Promise<void>
  selectModel: (model: MLModel | null) => void
  selectDataset: (dataset: MLDataset | null) => void
  selectJob: (job: MLTrainingJob | null) => void
  selectAnalysis: (analysis: MLAnalysis | null) => void
  selectDeployment: (deployment: MLDeployment | null) => void
  clearError: () => void
  checkHealth: () => Promise<void>
  reconnect: () => Promise<void>
  isConnected: boolean
  isHealthy: boolean
}

const MLContext = createContext<MLContextType | undefined>(undefined)

const initialState: MLState = {
  models: [],
  datasets: [],
  trainingJobs: [],
  predictions: [],
  analyses: [],
  deployments: [],
  features: [],
  selectedModel: null,
  selectedDataset: null,
  selectedJob: null,
  selectedAnalysis: null,
  selectedDeployment: null,
  loading: false,
  error: null,
  health: null,
  connectionStatus: 'disconnected',
  retryCount: 0,
  lastSync: null
}

function mlReducer(state: MLState, action: MLAction): MLState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_MODELS':
      return { ...state, models: action.payload, error: null, lastSync: new Date().toISOString(), retryCount: 0 }
    case 'SET_DATASETS':
      return { ...state, datasets: action.payload, error: null, lastSync: new Date().toISOString(), retryCount: 0 }
    case 'SET_TRAINING_JOBS':
      return { ...state, trainingJobs: action.payload, error: null, lastSync: new Date().toISOString(), retryCount: 0 }
    case 'SET_PREDICTIONS':
      return { ...state, predictions: action.payload, error: null, lastSync: new Date().toISOString(), retryCount: 0 }
    case 'SET_ANALYSES':
      return { ...state, analyses: action.payload, error: null, lastSync: new Date().toISOString(), retryCount: 0 }
    case 'SET_DEPLOYMENTS':
      return { ...state, deployments: action.payload, error: null, lastSync: new Date().toISOString(), retryCount: 0 }
    case 'SET_FEATURES':
      return { ...state, features: action.payload, error: null, lastSync: new Date().toISOString(), retryCount: 0 }
    case 'SET_SELECTED_MODEL':
      return { ...state, selectedModel: action.payload }
    case 'SET_SELECTED_DATASET':
      return { ...state, selectedDataset: action.payload }
    case 'SET_SELECTED_JOB':
      return { ...state, selectedJob: action.payload }
    case 'SET_SELECTED_ANALYSIS':
      return { ...state, selectedAnalysis: action.payload }
    case 'SET_SELECTED_DEPLOYMENT':
      return { ...state, selectedDeployment: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false, connectionStatus: 'error' }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    case 'SET_HEALTH':
      return { ...state, health: action.payload }
    case 'SET_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload }
    case 'INCREMENT_RETRY_COUNT':
      return { ...state, retryCount: state.retryCount + 1 }
    case 'RESET_RETRY_COUNT':
      return { ...state, retryCount: 0 }
    case 'SET_LAST_SYNC':
      return { ...state, lastSync: action.payload }
    default:
      return state
  }
}

interface MLProviderProps {
  children: ReactNode
}

export function MLProvider({ children }: MLProviderProps) {
  const [state, dispatch] = useReducer(mlReducer, initialState)

  // Health check
  const checkHealth = useCallback(async () => {
    try {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      const res = await MLService.checkHealth()
      if (res.success && res.data) {
        dispatch({ type: 'SET_HEALTH', payload: res.data })
        if (res.data.status === 'healthy') {
          dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
          dispatch({ type: 'RESET_RETRY_COUNT' })
        } else {
          dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
        }
      } else {
        dispatch({ type: 'SET_ERROR', payload: res.error || 'Health check failed' })
      }
    } catch (error) {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message })
    }
  }, [])

  // Reconnect logic
  const reconnect = useCallback(async () => {
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
    dispatch({ type: 'INCREMENT_RETRY_COUNT' })
    await checkHealth()
    if (state.connectionStatus === 'connected') {
      await fetchModels()
    }
  }, [checkHealth, state.connectionStatus])

  // Fetchers
  const fetchModels = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const res = await MLService.getAllModels()
      if (res.success) {
        dispatch({ type: 'SET_MODELS', payload: res.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching models' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const fetchDatasets = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const res = await MLService.getAllDatasets()
      if (res.success) {
        dispatch({ type: 'SET_DATASETS', payload: res.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching datasets' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const fetchTrainingJobs = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const res = await MLService.getAllTrainingJobs()
      if (res.success) {
        dispatch({ type: 'SET_TRAINING_JOBS', payload: res.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching jobs' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const fetchPredictions = useCallback(async (modelId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const res = await MLService.getPredictionHistory(modelId)
      if (res.success) {
        dispatch({ type: 'SET_PREDICTIONS', payload: res.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching predictions' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const fetchAnalyses = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const res = await MLService.getAllAnalyses()
      if (res.success) {
        dispatch({ type: 'SET_ANALYSES', payload: res.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching analyses' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const fetchDeployments = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const res = await MLService.getAllDeployments()
      if (res.success) {
        dispatch({ type: 'SET_DEPLOYMENTS', payload: res.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching deployments' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const fetchFeatures = useCallback(async (modelId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const res = await MLService.getFeatureImportance(modelId)
      if (res.success) {
        dispatch({ type: 'SET_FEATURES', payload: res.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching features' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  // Selectors
  const selectModel = (model: MLModel | null) => dispatch({ type: 'SET_SELECTED_MODEL', payload: model })
  const selectDataset = (dataset: MLDataset | null) => dispatch({ type: 'SET_SELECTED_DATASET', payload: dataset })
  const selectJob = (job: MLTrainingJob | null) => dispatch({ type: 'SET_SELECTED_JOB', payload: job })
  const selectAnalysis = (analysis: MLAnalysis | null) => dispatch({ type: 'SET_SELECTED_ANALYSIS', payload: analysis })
  const selectDeployment = (deployment: MLDeployment | null) => dispatch({ type: 'SET_SELECTED_DEPLOYMENT', payload: deployment })
  const clearError = () => dispatch({ type: 'CLEAR_ERROR' })

  // Estado de conexión y salud
  const isConnected = state.connectionStatus === 'connected'
  const isHealthy = state.health?.status === 'healthy'

  // Efecto inicial: health check y fetch de modelos
  useEffect(() => {
    checkHealth()
    fetchModels()
  }, [checkHealth, fetchModels])

  return (
    <MLContext.Provider
      value={{
        state,
        fetchModels,
        fetchDatasets,
        fetchTrainingJobs,
        fetchPredictions,
        fetchAnalyses,
        fetchDeployments,
        fetchFeatures,
        selectModel,
        selectDataset,
        selectJob,
        selectAnalysis,
        selectDeployment,
        clearError,
        checkHealth,
        reconnect,
        isConnected,
        isHealthy
      }}
    >
      {children}
    </MLContext.Provider>
  )
}

export function useML(): MLContextType {
  const context = useContext(MLContext)
  if (!context) {
    throw new Error('useML must be used within a MLProvider')
  }
  return context
} 