'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { MergeService, MergeStrategy, MergeRequest, MergeConflict, MergeAnalysis, ServiceHealth } from '../services/merge.service'

// Types
interface MergeState {
  // Data
  strategies: MergeStrategy[]
  mergeRequests: MergeRequest[]
  currentRequest: MergeRequest | null
  conflicts: MergeConflict[]
  analysis: MergeAnalysis | null
  
  // Loading states
  loading: boolean
  loadingStrategies: boolean
  loadingRequests: boolean
  loadingRequest: boolean
  loadingConflicts: boolean
  loadingAnalysis: boolean
  executingMerge: boolean
  
  // Error states
  error: string | null
  mergeError: string | null
  
  // Pagination
  totalRequests: number
  currentPage: number
  requestsPerPage: number
  hasMore: boolean
  
  // Filters
  statusFilter: string | null
  strategyFilter: string | null
  
  // Health
  health: ServiceHealth | null
  circuitBreakerOpen: boolean
  
  // UI state
  selectedStrategy: string | null
  showConflicts: boolean
  showAnalysis: boolean
}

type MergeAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LOADING_STRATEGIES'; payload: boolean }
  | { type: 'SET_LOADING_REQUESTS'; payload: boolean }
  | { type: 'SET_LOADING_REQUEST'; payload: boolean }
  | { type: 'SET_LOADING_CONFLICTS'; payload: boolean }
  | { type: 'SET_LOADING_ANALYSIS'; payload: boolean }
  | { type: 'SET_EXECUTING_MERGE'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MERGE_ERROR'; payload: string | null }
  | { type: 'SET_STRATEGIES'; payload: MergeStrategy[] }
  | { type: 'SET_REQUESTS'; payload: { requests: MergeRequest[]; total: number } }
  | { type: 'SET_CURRENT_REQUEST'; payload: MergeRequest | null }
  | { type: 'SET_CONFLICTS'; payload: MergeConflict[] }
  | { type: 'SET_ANALYSIS'; payload: MergeAnalysis | null }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_STATUS_FILTER'; payload: string | null }
  | { type: 'SET_STRATEGY_FILTER'; payload: string | null }
  | { type: 'SET_SELECTED_STRATEGY'; payload: string | null }
  | { type: 'SET_SHOW_CONFLICTS'; payload: boolean }
  | { type: 'SET_SHOW_ANALYSIS'; payload: boolean }
  | { type: 'SET_HEALTH'; payload: ServiceHealth }
  | { type: 'SET_CIRCUIT_BREAKER'; payload: boolean }
  | { type: 'ADD_STRATEGY'; payload: MergeStrategy }
  | { type: 'UPDATE_STRATEGY'; payload: MergeStrategy }
  | { type: 'DELETE_STRATEGY'; payload: string }
  | { type: 'ADD_REQUEST'; payload: MergeRequest }
  | { type: 'UPDATE_REQUEST'; payload: MergeRequest }
  | { type: 'DELETE_REQUEST'; payload: string }
  | { type: 'RESOLVE_CONFLICT'; payload: { conflictId: string; resolution: string } }

// Initial state
const initialState: MergeState = {
  strategies: [],
  mergeRequests: [],
  currentRequest: null,
  conflicts: [],
  analysis: null,
  loading: false,
  loadingStrategies: false,
  loadingRequests: false,
  loadingRequest: false,
  loadingConflicts: false,
  loadingAnalysis: false,
  executingMerge: false,
  error: null,
  mergeError: null,
  totalRequests: 0,
  currentPage: 1,
  requestsPerPage: 20,
  hasMore: true,
  statusFilter: null,
  strategyFilter: null,
  health: null,
  circuitBreakerOpen: false,
  selectedStrategy: null,
  showConflicts: false,
  showAnalysis: false,
}

// Reducer
function mergeReducer(state: MergeState, action: MergeAction): MergeState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_LOADING_STRATEGIES':
      return { ...state, loadingStrategies: action.payload }
    case 'SET_LOADING_REQUESTS':
      return { ...state, loadingRequests: action.payload }
    case 'SET_LOADING_REQUEST':
      return { ...state, loadingRequest: action.payload }
    case 'SET_LOADING_CONFLICTS':
      return { ...state, loadingConflicts: action.payload }
    case 'SET_LOADING_ANALYSIS':
      return { ...state, loadingAnalysis: action.payload }
    case 'SET_EXECUTING_MERGE':
      return { ...state, executingMerge: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_MERGE_ERROR':
      return { ...state, mergeError: action.payload }
    case 'SET_STRATEGIES':
      return { ...state, strategies: action.payload }
    case 'SET_REQUESTS':
      return { 
        ...state, 
        mergeRequests: action.payload.requests, 
        totalRequests: action.payload.total,
        hasMore: action.payload.requests.length === state.requestsPerPage
      }
    case 'SET_CURRENT_REQUEST':
      return { ...state, currentRequest: action.payload }
    case 'SET_CONFLICTS':
      return { ...state, conflicts: action.payload }
    case 'SET_ANALYSIS':
      return { ...state, analysis: action.payload }
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload }
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload }
    case 'SET_STRATEGY_FILTER':
      return { ...state, strategyFilter: action.payload }
    case 'SET_SELECTED_STRATEGY':
      return { ...state, selectedStrategy: action.payload }
    case 'SET_SHOW_CONFLICTS':
      return { ...state, showConflicts: action.payload }
    case 'SET_SHOW_ANALYSIS':
      return { ...state, showAnalysis: action.payload }
    case 'SET_HEALTH':
      return { ...state, health: action.payload }
    case 'SET_CIRCUIT_BREAKER':
      return { ...state, circuitBreakerOpen: action.payload }
    case 'ADD_STRATEGY':
      return { ...state, strategies: [action.payload, ...state.strategies] }
    case 'UPDATE_STRATEGY':
      return { 
        ...state, 
        strategies: state.strategies.map(strategy => 
          strategy.id === action.payload.id ? action.payload : strategy
        )
      }
    case 'DELETE_STRATEGY':
      return { 
        ...state, 
        strategies: state.strategies.filter(strategy => strategy.id !== action.payload)
      }
    case 'ADD_REQUEST':
      return { ...state, mergeRequests: [action.payload, ...state.mergeRequests] }
    case 'UPDATE_REQUEST':
      return { 
        ...state, 
        mergeRequests: state.mergeRequests.map(request => 
          request.id === action.payload.id ? action.payload : request
        ),
        currentRequest: state.currentRequest?.id === action.payload.id ? action.payload : state.currentRequest
      }
    case 'DELETE_REQUEST':
      return { 
        ...state, 
        mergeRequests: state.mergeRequests.filter(request => request.id !== action.payload),
        currentRequest: state.currentRequest?.id === action.payload ? null : state.currentRequest
      }
    case 'RESOLVE_CONFLICT':
      return {
        ...state,
        conflicts: state.conflicts.map(conflict => 
          conflict.id === action.payload.conflictId 
            ? { ...conflict, status: 'resolved', resolution: action.payload.resolution }
            : conflict
        )
      }
    default:
      return state
  }
}

// Context
interface MergeContextType {
  state: MergeState
  // Strategy actions
  loadStrategies: () => Promise<void>
  loadStrategyById: (strategyId: string) => Promise<void>
  createStrategy: (strategy: Omit<MergeStrategy, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateStrategy: (strategyId: string, updates: Partial<MergeStrategy>) => Promise<void>
  deleteStrategy: (strategyId: string) => Promise<void>
  
  // Request actions
  loadRequests: (page?: number, status?: string) => Promise<void>
  loadRequestById: (requestId: string) => Promise<void>
  createRequest: (request: Omit<MergeRequest, 'id' | 'created_at' | 'updated_at' | 'status' | 'approvals' | 'conflicts' | 'files_changed' | 'additions' | 'deletions'>) => Promise<void>
  updateRequest: (requestId: string, updates: Partial<MergeRequest>) => Promise<void>
  deleteRequest: (requestId: string) => Promise<void>
  
  // Merge actions
  executeMerge: (requestId: string, strategyId: string) => Promise<void>
  approveRequest: (requestId: string) => Promise<void>
  
  // Conflict actions
  loadConflicts: (requestId: string) => Promise<void>
  resolveConflict: (conflictId: string, resolution: string) => Promise<void>
  
  // Analysis actions
  analyzeImpact: (requestId: string) => Promise<void>
  loadAnalysis: (requestId: string) => Promise<void>
  
  // UI actions
  setStatusFilter: (status: string | null) => void
  setStrategyFilter: (strategy: string | null) => void
  setSelectedStrategy: (strategy: string | null) => void
  setShowConflicts: (show: boolean) => void
  setShowAnalysis: (show: boolean) => void
  
  // Health actions
  checkHealth: () => Promise<void>
  resetCircuitBreaker: () => void
  clearError: () => void
  clearMergeError: () => void
}

const MergeContext = createContext<MergeContextType | undefined>(undefined)

// Provider
export function MergeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(mergeReducer, initialState)

  // Health check with auto-refresh
  const checkHealth = useCallback(async () => {
    try {
      const health = await MergeService.checkHealth()
      dispatch({ type: 'SET_HEALTH', payload: health })
      dispatch({ type: 'SET_CIRCUIT_BREAKER', payload: MergeService.isCircuitBreakerOpen() })
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

  // Load strategies
  const loadStrategies = useCallback(async () => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_STRATEGIES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await MergeService.getMergeStrategies()
      
      if (response.success && response.data) {
        const strategies = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_STRATEGIES', payload: strategies })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load strategies' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load strategies' })
    } finally {
      dispatch({ type: 'SET_LOADING_STRATEGIES', payload: false })
    }
  }, [])

  // Load strategy by ID
  const loadStrategyById = useCallback(async (strategyId: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_STRATEGIES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await MergeService.getMergeStrategyById(strategyId)
      
      if (response.success && response.data) {
        const strategy = response.data as MergeStrategy
        dispatch({ type: 'UPDATE_STRATEGY', payload: strategy })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load strategy' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load strategy' })
    } finally {
      dispatch({ type: 'SET_LOADING_STRATEGIES', payload: false })
    }
  }, [])

  // Create strategy
  const createStrategy = useCallback(async (strategy: Omit<MergeStrategy, 'id' | 'created_at' | 'updated_at'>) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_STRATEGIES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await MergeService.createMergeStrategy(strategy)
      
      if (response.success && response.data) {
        const newStrategy = response.data as MergeStrategy
        dispatch({ type: 'ADD_STRATEGY', payload: newStrategy })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to create strategy' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to create strategy' })
    } finally {
      dispatch({ type: 'SET_LOADING_STRATEGIES', payload: false })
    }
  }, [])

  // Update strategy
  const updateStrategy = useCallback(async (strategyId: string, updates: Partial<MergeStrategy>) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_STRATEGIES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await MergeService.updateMergeStrategy(strategyId, updates)
      
      if (response.success && response.data) {
        const updatedStrategy = response.data as MergeStrategy
        dispatch({ type: 'UPDATE_STRATEGY', payload: updatedStrategy })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to update strategy' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to update strategy' })
    } finally {
      dispatch({ type: 'SET_LOADING_STRATEGIES', payload: false })
    }
  }, [])

  // Delete strategy
  const deleteStrategy = useCallback(async (strategyId: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_STRATEGIES', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await MergeService.deleteMergeStrategy(strategyId)
      
      if (response.success) {
        dispatch({ type: 'DELETE_STRATEGY', payload: strategyId })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to delete strategy' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to delete strategy' })
    } finally {
      dispatch({ type: 'SET_LOADING_STRATEGIES', payload: false })
    }
  }, [])

  // Load requests
  const loadRequests = useCallback(async (page = 1, status?: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_REQUESTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const offset = (page - 1) * state.requestsPerPage
      const response = await MergeService.getMergeRequests(status, state.requestsPerPage, offset)
      
      if (response.success && response.data) {
        const requests = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_REQUESTS', payload: { requests, total: requests.length } })
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load requests' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load requests' })
    } finally {
      dispatch({ type: 'SET_LOADING_REQUESTS', payload: false })
    }
  }, [state.requestsPerPage])

  // Load request by ID
  const loadRequestById = useCallback(async (requestId: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_REQUEST', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await MergeService.getMergeRequestById(requestId)
      
      if (response.success && response.data) {
        const request = response.data as MergeRequest
        dispatch({ type: 'SET_CURRENT_REQUEST', payload: request })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load request' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load request' })
    } finally {
      dispatch({ type: 'SET_LOADING_REQUEST', payload: false })
    }
  }, [])

  // Create request
  const createRequest = useCallback(async (request: Omit<MergeRequest, 'id' | 'created_at' | 'updated_at' | 'status' | 'approvals' | 'conflicts' | 'files_changed' | 'additions' | 'deletions'>) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_REQUESTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await MergeService.createMergeRequest(request)
      
      if (response.success && response.data) {
        const newRequest = response.data as MergeRequest
        dispatch({ type: 'ADD_REQUEST', payload: newRequest })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to create request' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to create request' })
    } finally {
      dispatch({ type: 'SET_LOADING_REQUESTS', payload: false })
    }
  }, [])

  // Update request
  const updateRequest = useCallback(async (requestId: string, updates: Partial<MergeRequest>) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_REQUESTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await MergeService.updateMergeRequest(requestId, updates)
      
      if (response.success && response.data) {
        const updatedRequest = response.data as MergeRequest
        dispatch({ type: 'UPDATE_REQUEST', payload: updatedRequest })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to update request' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to update request' })
    } finally {
      dispatch({ type: 'SET_LOADING_REQUESTS', payload: false })
    }
  }, [])

  // Delete request
  const deleteRequest = useCallback(async (requestId: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_REQUESTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      // Note: Assuming there's a delete endpoint, if not, this would need to be implemented
      dispatch({ type: 'DELETE_REQUEST', payload: requestId })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to delete request' })
    } finally {
      dispatch({ type: 'SET_LOADING_REQUESTS', payload: false })
    }
  }, [])

  // Execute merge
  const executeMerge = useCallback(async (requestId: string, strategyId: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_MERGE_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_EXECUTING_MERGE', payload: true })
      dispatch({ type: 'SET_MERGE_ERROR', payload: null })
      
      const response = await MergeService.executeMerge(requestId, strategyId)
      
      if (response.success && response.data) {
        const updatedRequest = response.data as MergeRequest
        dispatch({ type: 'UPDATE_REQUEST', payload: updatedRequest })
      } else {
        dispatch({ type: 'SET_MERGE_ERROR', payload: response.error || 'Failed to execute merge' })
      }
    } catch (error) {
      dispatch({ type: 'SET_MERGE_ERROR', payload: error instanceof Error ? error.message : 'Failed to execute merge' })
    } finally {
      dispatch({ type: 'SET_EXECUTING_MERGE', payload: false })
    }
  }, [])

  // Approve request
  const approveRequest = useCallback(async (requestId: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      dispatch({ type: 'SET_ERROR', payload: 'Service temporarily unavailable' })
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_REQUESTS', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await MergeService.approveMergeRequest(requestId)
      
      if (response.success && response.data) {
        const updatedRequest = response.data as MergeRequest
        dispatch({ type: 'UPDATE_REQUEST', payload: updatedRequest })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to approve request' })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to approve request' })
    } finally {
      dispatch({ type: 'SET_LOADING_REQUESTS', payload: false })
    }
  }, [])

  // Load conflicts
  const loadConflicts = useCallback(async (requestId: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_CONFLICTS', payload: true })
      
      const response = await MergeService.getMergeConflicts(requestId)
      
      if (response.success && response.data) {
        const conflicts = Array.isArray(response.data) ? response.data : []
        dispatch({ type: 'SET_CONFLICTS', payload: conflicts })
      }
    } catch (error) {
      console.error('Failed to load conflicts:', error)
    } finally {
      dispatch({ type: 'SET_LOADING_CONFLICTS', payload: false })
    }
  }, [])

  // Resolve conflict
  const resolveConflict = useCallback(async (conflictId: string, resolution: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      return
    }

    try {
      const response = await MergeService.resolveMergeConflict(conflictId, resolution)
      
      if (response.success) {
        dispatch({ type: 'RESOLVE_CONFLICT', payload: { conflictId, resolution } })
      }
    } catch (error) {
      console.error('Failed to resolve conflict:', error)
    }
  }, [])

  // Analyze impact
  const analyzeImpact = useCallback(async (requestId: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_ANALYSIS', payload: true })
      
      const response = await MergeService.analyzeMergeImpact(requestId)
      
      if (response.success && response.data) {
        const analysis = response.data as MergeAnalysis
        dispatch({ type: 'SET_ANALYSIS', payload: analysis })
      }
    } catch (error) {
      console.error('Failed to analyze impact:', error)
    } finally {
      dispatch({ type: 'SET_LOADING_ANALYSIS', payload: false })
    }
  }, [])

  // Load analysis
  const loadAnalysis = useCallback(async (requestId: string) => {
    if (MergeService.isCircuitBreakerOpen()) {
      return
    }

    try {
      dispatch({ type: 'SET_LOADING_ANALYSIS', payload: true })
      
      const response = await MergeService.getMergeAnalysis(requestId)
      
      if (response.success && response.data) {
        const analysis = response.data as MergeAnalysis
        dispatch({ type: 'SET_ANALYSIS', payload: analysis })
      }
    } catch (error) {
      console.error('Failed to load analysis:', error)
    } finally {
      dispatch({ type: 'SET_LOADING_ANALYSIS', payload: false })
    }
  }, [])

  // UI actions
  const setStatusFilter = useCallback((status: string | null) => {
    dispatch({ type: 'SET_STATUS_FILTER', payload: status })
    if (status) {
      loadRequests(1, status)
    } else {
      loadRequests(1)
    }
  }, [loadRequests])

  const setStrategyFilter = useCallback((strategy: string | null) => {
    dispatch({ type: 'SET_STRATEGY_FILTER', payload: strategy })
  }, [])

  const setSelectedStrategy = useCallback((strategy: string | null) => {
    dispatch({ type: 'SET_SELECTED_STRATEGY', payload: strategy })
  }, [])

  const setShowConflicts = useCallback((show: boolean) => {
    dispatch({ type: 'SET_SHOW_CONFLICTS', payload: show })
  }, [])

  const setShowAnalysis = useCallback((show: boolean) => {
    dispatch({ type: 'SET_SHOW_ANALYSIS', payload: show })
  }, [])

  // Reset circuit breaker
  const resetCircuitBreaker = useCallback(() => {
    MergeService.resetCircuitBreaker()
    dispatch({ type: 'SET_CIRCUIT_BREAKER', payload: false })
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }, [])

  // Clear merge error
  const clearMergeError = useCallback(() => {
    dispatch({ type: 'SET_MERGE_ERROR', payload: null })
  }, [])

  const value: MergeContextType = {
    state,
    loadStrategies,
    loadStrategyById,
    createStrategy,
    updateStrategy,
    deleteStrategy,
    loadRequests,
    loadRequestById,
    createRequest,
    updateRequest,
    deleteRequest,
    executeMerge,
    approveRequest,
    loadConflicts,
    resolveConflict,
    analyzeImpact,
    loadAnalysis,
    setStatusFilter,
    setStrategyFilter,
    setSelectedStrategy,
    setShowConflicts,
    setShowAnalysis,
    checkHealth,
    resetCircuitBreaker,
    clearError,
    clearMergeError,
  }

  return (
    <MergeContext.Provider value={value}>
      {children}
    </MergeContext.Provider>
  )
}

// Hook
export function useMerge() {
  const context = useContext(MergeContext)
  if (context === undefined) {
    throw new Error('useMerge must be used within a MergeProvider')
  }
  return context
} 