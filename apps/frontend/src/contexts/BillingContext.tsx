'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react'
import { 
  BillingService, 
  BillingData, 
  CreateInvoiceRequest, 
  UpdateInvoiceRequest,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  Invoice,
  Subscription,
  Customer
} from '@/services/billing.service'

// Connection Status Types
type ConnectionStatus = 'connected' | 'connecting' | 'error' | 'disconnected'

// Enhanced State Interface
interface BillingState {
  billingData: BillingData | null
  invoices: Invoice[]
  subscriptions: Subscription[]
  customer: Customer | null
  loading: boolean
  error: string | null
  connectionStatus: ConnectionStatus
  lastUpdated: string | null
  circuitBreakerState: {
    failures: number
    lastFailureTime: number
    state: 'CLOSED' | 'OPEN' | 'HALF_OPEN'
  }
}

// Enhanced Action Types
type BillingAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BILLING_DATA'; payload: BillingData }
  | { type: 'SET_INVOICES'; payload: Invoice[] }
  | { type: 'SET_SUBSCRIPTIONS'; payload: Subscription[] }
  | { type: 'SET_CUSTOMER'; payload: Customer }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_CONNECTION_STATUS'; payload: ConnectionStatus }
  | { type: 'SET_LAST_UPDATED'; payload: string }
  | { type: 'SET_CIRCUIT_BREAKER_STATE'; payload: BillingState['circuitBreakerState'] }
  | { type: 'ADD_INVOICE'; payload: Invoice }
  | { type: 'UPDATE_INVOICE'; payload: Invoice }
  | { type: 'DELETE_INVOICE'; payload: string }
  | { type: 'ADD_SUBSCRIPTION'; payload: Subscription }
  | { type: 'UPDATE_SUBSCRIPTION'; payload: Subscription }
  | { type: 'DELETE_SUBSCRIPTION'; payload: string }

// Enhanced Context Interface
interface BillingContextType {
  state: BillingState
  // Data fetching
  fetchBillingData: () => Promise<void>
  fetchInvoices: (page?: number, limit?: number) => Promise<void>
  fetchSubscriptions: () => Promise<void>
  fetchCustomer: () => Promise<void>
  
  // Invoice operations
  createInvoice: (request: CreateInvoiceRequest) => Promise<void>
  updateInvoice: (id: string, request: UpdateInvoiceRequest) => Promise<void>
  deleteInvoice: (id: string) => Promise<void>
  getInvoiceById: (id: string) => Promise<Invoice | null>
  
  // Subscription operations
  createSubscription: (request: CreateSubscriptionRequest) => Promise<void>
  updateSubscription: (id: string, request: UpdateSubscriptionRequest) => Promise<void>
  cancelSubscription: (id: string) => Promise<void>
  
  // Utility operations
  updateBilling: (request: any) => Promise<void>
  clearError: () => void
  checkHealth: () => Promise<boolean>
  retryConnection: () => Promise<void>
  refreshData: () => Promise<void>
}

// Context Creation
const BillingContext = createContext<BillingContextType | undefined>(undefined)

// Initial State
const initialState: BillingState = {
  billingData: null,
  invoices: [],
  subscriptions: [],
  customer: null,
  loading: false,
  error: null,
  connectionStatus: 'disconnected',
  lastUpdated: null,
  circuitBreakerState: {
    failures: 0,
    lastFailureTime: 0,
    state: 'CLOSED',
  },
}

// Reducer Function
function billingReducer(state: BillingState, action: BillingAction): BillingState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_BILLING_DATA':
      return { 
        ...state, 
        billingData: action.payload,
        invoices: action.payload.invoices,
        subscriptions: action.payload.subscriptions,
        customer: action.payload.customer || null,
        error: null,
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_INVOICES':
      return { 
        ...state, 
        invoices: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_SUBSCRIPTIONS':
      return { 
        ...state, 
        subscriptions: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_CUSTOMER':
      return { 
        ...state, 
        customer: action.payload,
        lastUpdated: new Date().toISOString()
      }
    
    case 'SET_ERROR':
      return { 
        ...state, 
        error: action.payload, 
        loading: false,
        connectionStatus: 'error'
      }
    
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    
    case 'SET_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload }
    
    case 'SET_LAST_UPDATED':
      return { ...state, lastUpdated: action.payload }
    
    case 'SET_CIRCUIT_BREAKER_STATE':
      return { ...state, circuitBreakerState: action.payload }
    
    case 'ADD_INVOICE':
      return { 
        ...state, 
        invoices: [...state.invoices, action.payload],
        lastUpdated: new Date().toISOString()
      }
    
    case 'UPDATE_INVOICE':
      return { 
        ...state, 
        invoices: state.invoices.map(invoice => 
          invoice.id === action.payload.id ? action.payload : invoice
        ),
        lastUpdated: new Date().toISOString()
      }
    
    case 'DELETE_INVOICE':
      return { 
        ...state, 
        invoices: state.invoices.filter(invoice => invoice.id !== action.payload),
        lastUpdated: new Date().toISOString()
      }
    
    case 'ADD_SUBSCRIPTION':
      return { 
        ...state, 
        subscriptions: [...state.subscriptions, action.payload],
        lastUpdated: new Date().toISOString()
      }
    
    case 'UPDATE_SUBSCRIPTION':
      return { 
        ...state, 
        subscriptions: state.subscriptions.map(subscription => 
          subscription.id === action.payload.id ? action.payload : subscription
        ),
        lastUpdated: new Date().toISOString()
      }
    
    case 'DELETE_SUBSCRIPTION':
      return { 
        ...state, 
        subscriptions: state.subscriptions.filter(subscription => subscription.id !== action.payload),
        lastUpdated: new Date().toISOString()
      }
    
    default:
      return state
  }
}

// Provider Component
interface BillingProviderProps {
  children: ReactNode
}

export function BillingProvider({ children }: BillingProviderProps) {
  const [state, dispatch] = useReducer(billingReducer, initialState)

  // Health check and circuit breaker monitoring
  const updateCircuitBreakerState = useCallback(() => {
    const circuitState = BillingService.getCircuitBreakerState()
    dispatch({ type: 'SET_CIRCUIT_BREAKER_STATE', payload: circuitState })
  }, [])

  const checkHealth = useCallback(async (): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      const isHealthy = await BillingService.checkHealth()
      
      if (isHealthy) {
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
        dispatch({ type: 'CLEAR_ERROR' })
      } else {
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
        dispatch({ type: 'SET_ERROR', payload: 'Service health check failed' })
      }
      
      return isHealthy
    } catch (error) {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Health check failed' 
      })
      return false
    }
  }, [])

  // Data fetching operations
  const fetchBillingData = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })
      
      const response = await BillingService.getBillingData()
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_BILLING_DATA', payload: response.data })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch billing data' })
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  const fetchInvoices = useCallback(async (page?: number, limit?: number): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.getBillingData(page, limit)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_INVOICES', payload: response.data.invoices })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch invoices' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch invoices' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  const fetchSubscriptions = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.getSubscriptions()
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_SUBSCRIPTIONS', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch subscriptions' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch subscriptions' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  const fetchCustomer = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.getCustomer()
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_CUSTOMER', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch customer data' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch customer data' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Invoice operations
  const createInvoice = useCallback(async (request: CreateInvoiceRequest): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.createInvoice(request)
      
      if (response.success && response.data) {
        dispatch({ type: 'ADD_INVOICE', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to create invoice' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to create invoice' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  const updateInvoice = useCallback(async (id: string, request: UpdateInvoiceRequest): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.updateInvoice(id, request)
      
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_INVOICE', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to update invoice' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to update invoice' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  const deleteInvoice = useCallback(async (id: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.deleteInvoice(id)
      
      if (response.success) {
        dispatch({ type: 'DELETE_INVOICE', payload: id })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to delete invoice' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to delete invoice' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  const getInvoiceById = useCallback(async (id: string): Promise<Invoice | null> => {
    try {
      const response = await BillingService.getInvoiceById(id)
      
      if (response.success && response.data) {
        return response.data
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch invoice' })
        return null
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch invoice' 
      })
      return null
    }
  }, [])

  // Subscription operations
  const createSubscription = useCallback(async (request: CreateSubscriptionRequest): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.createSubscription(request)
      
      if (response.success && response.data) {
        dispatch({ type: 'ADD_SUBSCRIPTION', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to create subscription' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to create subscription' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  const updateSubscription = useCallback(async (id: string, request: UpdateSubscriptionRequest): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.updateSubscription(id, request)
      
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_SUBSCRIPTION', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to update subscription' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to update subscription' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  const cancelSubscription = useCallback(async (id: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.cancelSubscription(id)
      
      if (response.success) {
        dispatch({ type: 'DELETE_SUBSCRIPTION', payload: id })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to cancel subscription' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to cancel subscription' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  // Utility operations
  const updateBilling = useCallback(async (request: any): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.updateBilling(request)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_BILLING_DATA', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Billing update failed' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Billing update failed' 
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      updateCircuitBreakerState()
    }
  }, [updateCircuitBreakerState])

  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  const retryConnection = useCallback(async (): Promise<void> => {
    const isHealthy = await checkHealth()
    if (isHealthy) {
      await fetchBillingData()
    }
  }, [checkHealth, fetchBillingData])

  const refreshData = useCallback(async (): Promise<void> => {
    await Promise.all([
      fetchInvoices(),
      fetchSubscriptions(),
      fetchCustomer()
    ])
  }, [fetchInvoices, fetchSubscriptions, fetchCustomer])

  // Initialize on mount
  useEffect(() => {
    const initializeBilling = async () => {
      const isHealthy = await checkHealth()
      if (isHealthy) {
        await fetchBillingData()
      }
    }

    initializeBilling()
  }, [checkHealth, fetchBillingData])

  // Monitor circuit breaker state
  useEffect(() => {
    const interval = setInterval(updateCircuitBreakerState, 5000)
    return () => clearInterval(interval)
  }, [updateCircuitBreakerState])

  const value: BillingContextType = {
    state,
    fetchBillingData,
    fetchInvoices,
    fetchSubscriptions,
    fetchCustomer,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById,
    createSubscription,
    updateSubscription,
    cancelSubscription,
    updateBilling,
    clearError,
    checkHealth,
    retryConnection,
    refreshData,
  }

  return (
    <BillingContext.Provider value={value}>
      {children}
    </BillingContext.Provider>
  )
}

// Hook
export function useBilling(): BillingContextType {
  const context = useContext(BillingContext)
  if (context === undefined) {
    throw new Error('useBilling must be used within a BillingProvider')
  }
  return context
} 