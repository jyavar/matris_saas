'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { DeployService, DeployEnvironment, DeployPipeline, DeployBuild, DeployDeployment, ServiceHealth } from '../services/deploy.service'

// Types
interface DeployState {
  // Data
  environments: DeployEnvironment[]
  pipelines: DeployPipeline[]
  builds: DeployBuild[]
  deployments: DeployDeployment[]
  currentBuild: DeployBuild | null
  currentDeployment: DeployDeployment | null
  
  // Loading states
  loading: boolean
  loadingEnvironments: boolean
  loadingPipelines: boolean
  loadingBuilds: boolean
  loadingDeployments: boolean
  loadingBuild: boolean
  loadingDeployment: boolean
  triggeringBuild: boolean
  deploying: boolean
  rollingBack: boolean
  
  // Error states
  error: string | null
  buildError: string | null
  deploymentError: string | null
  
  // Pagination
  totalBuilds: number
  totalDeployments: number
  currentPage: number
  buildsPerPage: number
  deploymentsPerPage: number
  hasMoreBuilds: boolean
  hasMoreDeployments: boolean
  
  // Filters
  environmentFilter: string | null
  pipelineFilter: string | null
  statusFilter: string | null
  
  // Health
  health: ServiceHealth | null
  circuitBreakerOpen: boolean
  
  // UI state
  selectedEnvironment: string | null
  selectedPipeline: string | null
  showLogs: boolean
  showMetrics: boolean
}

type DeployAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LOADING_ENVIRONMENTS'; payload: boolean }
  | { type: 'SET_LOADING_PIPELINES'; payload: boolean }
  | { type: 'SET_LOADING_BUILDS'; payload: boolean }
  | { type: 'SET_LOADING_DEPLOYMENTS'; payload: boolean }
  | { type: 'SET_LOADING_BUILD'; payload: boolean }
  | { type: 'SET_LOADING_DEPLOYMENT'; payload: boolean }
  | { type: 'SET_TRIGGERING_BUILD'; payload: boolean }
  | { type: 'SET_DEPLOYING'; payload: boolean }
  | { type: 'SET_ROLLING_BACK'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_BUILD_ERROR'; payload: string | null }
  | { type: 'SET_DEPLOYMENT_ERROR'; payload: string | null }
  | { type: 'SET_ENVIRONMENTS'; payload: DeployEnvironment[] }
  | { type: 'SET_PIPELINES'; payload: DeployPipeline[] }
  | { type: 'SET_BUILDS'; payload: { builds: DeployBuild[]; total: number } }
  | { type: 'SET_DEPLOYMENTS'; payload: { deployments: DeployDeployment[]; total: number } }
  | { type: 'SET_CURRENT_BUILD'; payload: DeployBuild | null }
  | { type: 'SET_CURRENT_DEPLOYMENT'; payload: DeployDeployment | null }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_ENVIRONMENT_FILTER'; payload: string | null }
  | { type: 'SET_PIPELINE_FILTER'; payload: string | null }
  | { type: 'SET_STATUS_FILTER'; payload: string | null }
  | { type: 'SET_SELECTED_ENVIRONMENT'; payload: string | null }
  | { type: 'SET_SELECTED_PIPELINE'; payload: string | null }
  | { type: 'SET_SHOW_LOGS'; payload: boolean }
  | { type: 'SET_SHOW_METRICS'; payload: boolean }
  | { type: 'SET_HEALTH'; payload: ServiceHealth }
  | { type: 'SET_CIRCUIT_BREAKER'; payload: boolean }
  | { type: 'ADD_ENVIRONMENT'; payload: DeployEnvironment }
  | { type: 'UPDATE_ENVIRONMENT'; payload: DeployEnvironment }
  | { type: 'DELETE_ENVIRONMENT'; payload: string }
  | { type: 'ADD_PIPELINE'; payload: DeployPipeline }
  | { type: 'UPDATE_PIPELINE'; payload: DeployPipeline }
  | { type: 'DELETE_PIPELINE'; payload: string }
  | { type: 'ADD_BUILD'; payload: DeployBuild }
  | { type: 'UPDATE_BUILD'; payload: DeployBuild }
  | { type: 'ADD_DEPLOYMENT'; payload: DeployDeployment }
  | { type: 'UPDATE_DEPLOYMENT'; payload: DeployDeployment }

// Initial state
const initialState: DeployState = {
  environments: [],
  pipelines: [],
  builds: [],
  deployments: [],
  currentBuild: null,
  currentDeployment: null,
  loading: false,
  loadingEnvironments: false,
  loadingPipelines: false,
  loadingBuilds: false,
  loadingDeployments: false,
  loadingBuild: false,
  loadingDeployment: false,
  triggeringBuild: false,
  deploying: false,
  rollingBack: false,
  error: null,
  buildError: null,
  deploymentError: null,
  totalBuilds: 0,
  totalDeployments: 0,
  currentPage: 1,
  buildsPerPage: 20,
  deploymentsPerPage: 20,
  hasMoreBuilds: true,
  hasMoreDeployments: true,
  environmentFilter: null,
  pipelineFilter: null,
  statusFilter: null,
  health: null,
  circuitBreakerOpen: false,
  selectedEnvironment: null,
  selectedPipeline: null,
  showLogs: false,
  showMetrics: false,
}

// Reducer
function deployReducer(state: DeployState, action: DeployAction): DeployState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_LOADING_ENVIRONMENTS':
      return { ...state, loadingEnvironments: action.payload }
    case 'SET_LOADING_PIPELINES':
      return { ...state, loadingPipelines: action.payload }
    case 'SET_LOADING_BUILDS':
      return { ...state, loadingBuilds: action.payload }
    case 'SET_LOADING_DEPLOYMENTS':
      return { ...state, loadingDeployments: action.payload }
    case 'SET_LOADING_BUILD':
      return { ...state, loadingBuild: action.payload }
    case 'SET_LOADING_DEPLOYMENT':
      return { ...state, loadingDeployment: action.payload }
    case 'SET_TRIGGERING_BUILD':
      return { ...state, triggeringBuild: action.payload }
    case 'SET_DEPLOYING':
      return { ...state, deploying: action.payload }
    case 'SET_ROLLING_BACK':
      return { ...state, rollingBack: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_BUILD_ERROR':
      return { ...state, buildError: action.payload }
    case 'SET_DEPLOYMENT_ERROR':
      return { ...state, deploymentError: action.payload }
    case 'SET_ENVIRONMENTS':
      return { ...state, environments: action.payload }
    case 'SET_PIPELINES':
      return { ...state, pipelines: action.payload }
    case 'SET_BUILDS':
      return { 
        ...state, 
        builds: action.payload.builds, 
        totalBuilds: action.payload.total,
        hasMoreBuilds: action.payload.builds.length === state.buildsPerPage
      }
    case 'SET_DEPLOYMENTS':
      return { 
        ...state, 
        deployments: action.payload.deployments, 
        totalDeployments: action.payload.total,
        hasMoreDeployments: action.payload.deployments.length === state.deploymentsPerPage
      }
    case 'SET_CURRENT_BUILD':
      return { ...state, currentBuild: action.payload }
    case 'SET_CURRENT_DEPLOYMENT':
      return { ...state, currentDeployment: action.payload }
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload }
    case 'SET_ENVIRONMENT_FILTER':
      return { ...state, environmentFilter: action.payload }
    case 'SET_PIPELINE_FILTER':
      return { ...state, pipelineFilter: action.payload }
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload }
    case 'SET_SELECTED_ENVIRONMENT':
      return { ...state, selectedEnvironment: action.payload }
    case 'SET_SELECTED_PIPELINE':
      return { ...state, selectedPipeline: action.payload }
    case 'SET_SHOW_LOGS':
      return { ...state, showLogs: action.payload }
    case 'SET_SHOW_METRICS':
      return { ...state, showMetrics: action.payload }
    case 'SET_HEALTH':
      return { ...state, health: action.payload }
    case 'SET_CIRCUIT_BREAKER':
      return { ...state, circuitBreakerOpen: action.payload }
    case 'ADD_ENVIRONMENT':
      return { ...state, environments: [action.payload, ...state.environments] }
    case 'UPDATE_ENVIRONMENT':
      return { 
        ...state, 
        environments: state.environments.map(env => 
          env.id === action.payload.id ? action.payload : env
        )
      }
    case 'DELETE_ENVIRONMENT':
      return { 
        ...state, 
        environments: state.environments.filter(env => env.id !== action.payload)
      }
    case 'ADD_PIPELINE':
      return { ...state, pipelines: [action.payload, ...state.pipelines] }
    case 'UPDATE_PIPELINE':
      return { 
        ...state, 
        pipelines: state.pipelines.map(pipeline => 
          pipeline.id === action.payload.id ? action.payload : pipeline
        )
      }
    case 'DELETE_PIPELINE':
      return { 
        ...state, 
        pipelines: state.pipelines.filter(pipeline => pipeline.id !== action.payload)
      }
    case 'ADD_BUILD':
      return { ...state, builds: [action.payload, ...state.builds] }
    case 'UPDATE_BUILD':
      return { 
        ...state, 
        builds: state.builds.map(build => 
          build.id === action.payload.id ? action.payload : build
        ),
        currentBuild: state.currentBuild?.id === action.payload.id ? action.payload : state.currentBuild
      }
    case 'ADD_DEPLOYMENT':
      return { ...state, deployments: [action.payload, ...state.deployments] }
    case 'UPDATE_DEPLOYMENT':
      return { 
        ...state, 
        deployments: state.deployments.map(deployment => 
          deployment.id === action.payload.id ? action.payload : deployment
        ),
        currentDeployment: state.currentDeployment?.id === action.payload.id ? action.payload : state.currentDeployment
      }
    default:
      return state
  }
}

// Context
interface DeployContextType {
  state: DeployState
  // Environment actions
  loadEnvironments: () => Promise<void>
  loadEnvironmentById: (environmentId: string) => Promise<void>
  createEnvironment: (environment: Omit<DeployEnvironment, 'id' | 'created_at' | 'updated_at' | 'deployment_count'>) => Promise<void>
  updateEnvironment: (environmentId: string, updates: Partial<DeployEnvironment>) => Promise<void>
  deleteEnvironment: (environmentId: string) => Promise<void>
  
  // Pipeline actions
  loadPipelines: (environmentId?: string) => Promise<void>
  loadPipelineById: (pipelineId: string) => Promise<void>
  createPipeline: (pipeline: Omit<DeployPipeline, 'id' | 'created_at' | 'updated_at' | 'success_rate' | 'avg_duration'>) => Promise<void>
  updatePipeline: (pipelineId: string, updates: Partial<DeployPipeline>) => Promise<void>
  deletePipeline: (pipelineId: string) => Promise<void>
  
  // Build actions
  loadBuilds: (pipelineId?: string, status?: string, page?: number) => Promise<void>
  loadBuildById: (buildId: string) => Promise<void>
  triggerBuild: (pipelineId: string, commitHash?: string) => Promise<void>
  cancelBuild: (buildId: string) => Promise<void>
  
  // Deployment actions
  loadDeployments: (environmentId?: string, status?: string, page?: number) => Promise<void>
  loadDeploymentById: (deploymentId: string) => Promise<void>
  deployBuild: (buildId: string, environmentId: string) => Promise<void>
  rollbackDeployment: (deploymentId: string, targetVersion?: string) => Promise<void>
  
  // UI actions
  setEnvironmentFilter: (environment: string | null) => void
  setPipelineFilter: (pipeline: string | null) => void
  setStatusFilter: (status: string | null) => void
  setSelectedEnvironment: (environment: string | null) => void
  setSelectedPipeline: (pipeline: string | null) => void
  setShowLogs: (show: boolean) => void
  setShowMetrics: (show: boolean) => void
  
  // Health actions
  checkHealth: () => Promise<void>
  resetCircuitBreaker: () => void
  clearError: () => void
  clearBuildError: () => void
  clearDeploymentError: () => void
}

const DeployContext = createContext<DeployContextType | undefined>(undefined)

// Provider
export function DeployProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(deployReducer, initialState)

  // Health check with auto-refresh
  const checkHealth = useCallback(async () => {
    try {
      const health = await DeployService.checkHealth()
      dispatch({ type: 'SET_HEALTH', payload: health })
      dispatch({ type: 'SET_CIRCUIT_BREAKER', payload: DeployService.isCircuitBreakerOpen() })
    } catch (error) {
      console.error('Health check failed:', error)
    }
  }, [])

  // Auto-refresh health every 30 seconds
  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [checkHealth])

  // Load environments
  const loadEnvironments = useCallback(async () => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_ENVIRONMENTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.getEnvironments()
      
      if (response.success && response.data) {
        const environments = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_ENVIRONMENTS', payload: environments })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load environments' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load environments' })
    } finally {
      dispatch({ type: 'SET_LOADING_ENVIRONMENTS', payload: false })
    }
  }, [])

  // Load environment by ID
  const loadEnvironmentById = useCallback(async (environmentId: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_ENVIRONMENTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.getEnvironmentById(environmentId)
      
      if (response.success && response.data) {
        const environment = response.data as DeployEnvironment
        dispatch({ type: 'UPDATE_ENVIRONMENT', payload: environment })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load environment' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load environment' })
    } finally {
      dispatch({ type: 'SET_LOADING_ENVIRONMENTS', payload: false })
    }
  }, [])

  // Create environment
  const createEnvironment = useCallback(async (environment: Omit<DeployEnvironment, 'id' | 'created_at' | 'updated_at' | 'deployment_count'>) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_ENVIRONMENTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.createEnvironment(environment)
      
      if (response.success && response.data) {
        const newEnvironment = response.data as DeployEnvironment
        dispatch({ type: 'ADD_ENVIRONMENT', payload: newEnvironment })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to create environment' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to create environment' })
    } finally {
      dispatch({ type: 'SET_LOADING_ENVIRONMENTS', payload: false })
    }
  }, [])

  // Update environment
  const updateEnvironment = useCallback(async (environmentId: string, updates: Partial<DeployEnvironment>) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_ENVIRONMENTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.updateEnvironment(environmentId, updates)
      
      if (response.success && response.data) {
        const updatedEnvironment = response.data as DeployEnvironment
        dispatch({ type: 'UPDATE_ENVIRONMENT', payload: updatedEnvironment })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to update environment' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to update environment' })
    } finally {
      dispatch({ type: 'SET_LOADING_ENVIRONMENTS', payload: false })
    }
  }, [])

  // Delete environment
  const deleteEnvironment = useCallback(async (environmentId: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_ENVIRONMENTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.deleteEnvironment(environmentId)
      
      if (response.success) {
        dispatch({ type: 'DELETE_ENVIRONMENT', payload: environmentId })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to delete environment' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to delete environment' })
    } finally {
      dispatch({ type: 'SET_LOADING_ENVIRONMENTS', payload: false })
    }
  }, [])

  // Load pipelines
  const loadPipelines = useCallback(async (environmentId?: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_PIPELINES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.getPipelines(environmentId)
      
      if (response.success && response.data) {
        const pipelines = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_PIPELINES', payload: pipelines })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load pipelines' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load pipelines' })
    } finally {
      dispatch({ type: 'SET_LOADING_PIPELINES', payload: false })
    }
  }, [])

  // Load pipeline by ID
  const loadPipelineById = useCallback(async (pipelineId: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_PIPELINES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.getPipelineById(pipelineId)
      
      if (response.success && response.data) {
        const pipeline = response.data as DeployPipeline
        dispatch({ type: 'UPDATE_PIPELINE', payload: pipeline })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load pipeline' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load pipeline' })
    } finally {
      dispatch({ type: 'SET_LOADING_PIPELINES', payload: false })
    }
  }, [])

  // Create pipeline
  const createPipeline = useCallback(async (pipeline: Omit<DeployPipeline, 'id' | 'created_at' | 'updated_at' | 'success_rate' | 'avg_duration'>) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_PIPELINES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.createPipeline(pipeline)
      
      if (response.success && response.data) {
        const newPipeline = response.data as DeployPipeline
        dispatch({ type: 'ADD_PIPELINE', payload: newPipeline })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to create pipeline' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to create pipeline' })
    } finally {
      dispatch({ type: 'SET_LOADING_PIPELINES', payload: false })
    }
  }, [])

  // Update pipeline
  const updatePipeline = useCallback(async (pipelineId: string, updates: Partial<DeployPipeline>) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_PIPELINES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.updatePipeline(pipelineId, updates)
      
      if (response.success && response.data) {
        const updatedPipeline = response.data as DeployPipeline
        dispatch({ type: 'UPDATE_PIPELINE', payload: updatedPipeline })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to update pipeline' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to update pipeline' })
    } finally {
      dispatch({ type: 'SET_LOADING_PIPELINES', payload: false })
    }
  }, [])

  // Delete pipeline
  const deletePipeline = useCallback(async (pipelineId: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_PIPELINES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.deletePipeline(pipelineId)
      
      if (response.success) {
        dispatch({ type: 'DELETE_PIPELINE', payload: pipelineId })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to delete pipeline' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to delete pipeline' })
    } finally {
      dispatch({ type: 'SET_LOADING_PIPELINES', payload: false })
    }
  }, [])

  // Load builds
  const loadBuilds = useCallback(async (pipelineId?: string, status?: string, page = 1) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_BUILDS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const offset = (page - 1) * state.buildsPerPage
      const response = await DeployService.getBuilds(pipelineId, status, state.buildsPerPage, offset)
      
      if (response.success && response.data) {
        const builds = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_BUILDS', payload: { builds, total: builds.length } })
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load builds' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load builds' })
    } finally {
      dispatch({ type: 'SET_LOADING_BUILDS', payload: false })
    }
  }, [state.buildsPerPage])

  // Load build by ID
  const loadBuildById = useCallback(async (buildId: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_BUILD', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.getBuildById(buildId)
      
      if (response.success && response.data) {
        const build = response.data as DeployBuild
        dispatch({ type: 'SET_CURRENT_BUILD', payload: build })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load build' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load build' })
    } finally {
      dispatch({ type: 'SET_LOADING_BUILD', payload: false })
    }
  }, [])

  // Trigger build
  const triggerBuild = useCallback(async (pipelineId: string, commitHash?: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_BUILD_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_TRIGGERING_BUILD', payload: true })
      dispatch({ type: 'SET_BUILD_ERROR', payload: null })
      
      const response = await DeployService.triggerBuild(pipelineId, commitHash)
      
      if (response.success && response.data) {
        const newBuild = response.data as DeployBuild
        dispatch({ type: 'ADD_BUILD', payload: newBuild })
      } else {
        dispatch({ type: 'SET_BUILD_ERROR', payload: response.error || 'Failed to trigger build' })
      }
    } catch (error) {
      dispatch({ type: 'SET_BUILD_ERROR', payload: error instanceof Error ? error.message : 'Failed to trigger build' })
    } finally {
      dispatch({ type: 'SET_TRIGGERING_BUILD', payload: false })
    }
  }, [])

  // Cancel build
  const cancelBuild = useCallback(async (buildId: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      return
    }

    try {
      const response = await DeployService.cancelBuild(buildId)
      
      if (response.success && response.data) {
        const updatedBuild = response.data as DeployBuild
        dispatch({ type: 'UPDATE_BUILD', payload: updatedBuild })
      }
    } catch (error) {
      console.error('Failed to cancel build:', error)
    }
  }, [])

  // Load deployments
  const loadDeployments = useCallback(async (environmentId?: string, status?: string, page = 1) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_DEPLOYMENTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const offset = (page - 1) * state.deploymentsPerPage
      const response = await DeployService.getDeployments(environmentId, status, state.deploymentsPerPage, offset)
      
      if (response.success && response.data) {
        const deployments = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_DEPLOYMENTS', payload: { deployments, total: deployments.length } })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load deployments' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load deployments' })
    } finally {
      dispatch({ type: 'SET_LOADING_DEPLOYMENTS', payload: false })
    }
  }, [state.deploymentsPerPage])

  // Load deployment by ID
  const loadDeploymentById = useCallback(async (deploymentId: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_DEPLOYMENT', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await DeployService.getDeploymentById(deploymentId)
      
      if (response.success && response.data) {
        const deployment = response.data as DeployDeployment
        dispatch({ type: 'SET_CURRENT_DEPLOYMENT', payload: deployment })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load deployment' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load deployment' })
    } finally {
      dispatch({ type: 'SET_LOADING_DEPLOYMENT', payload: false })
    }
  }, [])

  // Deploy build
  const deployBuild = useCallback(async (buildId: string, environmentId: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_DEPLOYMENT_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_DEPLOYING', payload: true })
      dispatch({ type: 'SET_DEPLOYMENT_ERROR', payload: null })
      
      const response = await DeployService.deployBuild(buildId, environmentId)
      
      if (response.success && response.data) {
        const newDeployment = response.data as DeployDeployment
        dispatch({ type: 'ADD_DEPLOYMENT', payload: newDeployment })
      } else {
        dispatch({ type: 'SET_DEPLOYMENT_ERROR', payload: response.error || 'Failed to deploy build' })
      }
    } catch (error) {
      dispatch({ type: 'SET_DEPLOYMENT_ERROR', payload: error instanceof Error ? error.message : 'Failed to deploy build' })
    } finally {
      dispatch({ type: 'SET_DEPLOYING', payload: false })
    }
  }, [])

  // Rollback deployment
  const rollbackDeployment = useCallback(async (deploymentId: string, targetVersion?: string) => {
    if (DeployService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_DEPLOYMENT_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_ROLLING_BACK', payload: true })
      dispatch({ type: 'SET_DEPLOYMENT_ERROR', payload: null })
      
      const response = await DeployService.rollbackDeployment(deploymentId, targetVersion)
      
      if (response.success && response.data) {
        const updatedDeployment = response.data as DeployDeployment
        dispatch({ type: 'UPDATE_DEPLOYMENT', payload: updatedDeployment })
      } else {
        dispatch({ type: 'SET_DEPLOYMENT_ERROR', payload: response.error || 'Failed to rollback deployment' })
      }
    } catch (error) {
      dispatch({ type: 'SET_DEPLOYMENT_ERROR', payload: error instanceof Error ? error.message : 'Failed to rollback deployment' })
    } finally {
      dispatch({ type: 'SET_ROLLING_BACK', payload: false })
    }
  }, [])

  // UI actions
  const setEnvironmentFilter = useCallback((environment: string | null) => {
    dispatch({ type: 'SET_ENVIRONMENT_FILTER', payload: environment })
    if (environment) {
      loadPipelines(environment)
    } else {
      loadPipelines()
    }
  }, [loadPipelines])

  const setPipelineFilter = useCallback((pipeline: string | null) => {
    dispatch({ type: 'SET_PIPELINE_FILTER', payload: pipeline })
    if (pipeline) {
      loadBuilds(pipeline)
    } else {
      loadBuilds()
    }
  }, [loadBuilds])

  const setStatusFilter = useCallback((status: string | null) => {
    dispatch({ type: 'SET_STATUS_FILTER', payload: status })
    loadBuilds(state.pipelineFilter || undefined, status || undefined)
  }, [loadBuilds, state.pipelineFilter])

  const setSelectedEnvironment = useCallback((environment: string | null) => {
    dispatch({ type: 'SET_SELECTED_ENVIRONMENT', payload: environment })
  }, [])

  const setSelectedPipeline = useCallback((pipeline: string | null) => {
    dispatch({ type: 'SET_SELECTED_PIPELINE', payload: pipeline })
  }, [])

  const setShowLogs = useCallback((show: boolean) => {
    dispatch({ type: 'SET_SHOW_LOGS', payload: show })
  }, [])

  const setShowMetrics = useCallback((show: boolean) => {
    dispatch({ type: 'SET_SHOW_METRICS', payload: show })
  }, [])

  // Reset circuit breaker
  const resetCircuitBreaker = useCallback(() => {
    DeployService.resetCircuitBreaker()
    dispatch({ type: 'SET_CIRCUIT_BREAKER', payload: false })
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }, [])

  // Clear build error
  const clearBuildError = useCallback(() => {
    dispatch({ type: 'SET_BUILD_ERROR', payload: null })
  }, [])

  // Clear deployment error
  const clearDeploymentError = useCallback(() => {
    dispatch({ type: 'SET_DEPLOYMENT_ERROR', payload: null })
  }, [])

  const value: DeployContextType = {
    state,
    loadEnvironments,
    loadEnvironmentById,
    createEnvironment,
    updateEnvironment,
    deleteEnvironment,
    loadPipelines,
    loadPipelineById,
    createPipeline,
    updatePipeline,
    deletePipeline,
    loadBuilds,
    loadBuildById,
    triggerBuild,
    cancelBuild,
    loadDeployments,
    loadDeploymentById,
    deployBuild,
    rollbackDeployment,
    setEnvironmentFilter,
    setPipelineFilter,
    setStatusFilter,
    setSelectedEnvironment,
    setSelectedPipeline,
    setShowLogs,
    setShowMetrics,
    checkHealth,
    resetCircuitBreaker,
    clearError,
    clearBuildError,
    clearDeploymentError,
  }

  return (
    <DeployContext.Provider value={value}>
      {children}
    </DeployContext.Provider>
  )
}

// Hook
export function useDeploy() {
  const context = useContext(DeployContext)
  if (context === undefined) {
    throw new Error('useDeploy must be used within a DeployProvider')
  }
  return context
} 