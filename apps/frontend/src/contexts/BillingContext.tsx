'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { BillingService, BillingData, CreateInvoiceRequest, UpdateBillingRequest } from '@/services/billing.service'

interface BillingState {
  billingData: BillingData | null
  loading: boolean
  error: string | null
}

type BillingAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BILLING_DATA'; payload: BillingData }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }

interface BillingContextType {
  state: BillingState
  fetchBillingData: () => Promise<void>
  createInvoice: (request: CreateInvoiceRequest) => Promise<void>
  updateBilling: (request: UpdateBillingRequest) => Promise<void>
  clearError: () => void
}

const BillingContext = createContext<BillingContextType | undefined>(undefined)

const initialState: BillingState = {
  billingData: null,
  loading: false,
  error: null,
}

function billingReducer(state: BillingState, action: BillingAction): BillingState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_BILLING_DATA':
      return { ...state, billingData: action.payload, error: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

interface BillingProviderProps {
  children: ReactNode
}

export function BillingProvider({ children }: BillingProviderProps) {
  const [state, dispatch] = useReducer(billingReducer, initialState)

  const fetchBillingData = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.getBillingData()
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_BILLING_DATA', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to fetch billing data' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
    }
  }

  const createInvoice = async (request: CreateInvoiceRequest): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.createInvoice(request)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_BILLING_DATA', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to create invoice' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
    }
  }

  const updateBilling = async (request: UpdateBillingRequest): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await BillingService.updateBilling(request)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_BILLING_DATA', payload: response.data })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to update billing' })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
    }
  }

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  useEffect(() => {
    fetchBillingData()
  }, [])

  const value: BillingContextType = {
    state,
    fetchBillingData,
    createInvoice,
    updateBilling,
    clearError,
  }

  return (
    <BillingContext.Provider value={value}>
      {children}
    </BillingContext.Provider>
  )
}

export function useBilling(): BillingContextType {
  const context = useContext(BillingContext)
  if (context === undefined) {
    throw new Error('useBilling must be used within a BillingProvider')
  }
  return context
} 