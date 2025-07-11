'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { CampaignsService, type Campaign, type CreateCampaignRequest, type UpdateCampaignRequest, type CampaignAnalytics } from '@/services/campaigns.service'

// Connection status types
export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error'

// Context state interface
interface CampaignsState {
  campaigns: Campaign[]
  selectedCampaign: Campaign | null
  analytics: CampaignAnalytics | null
  loading: boolean
  error: string | null
  connectionStatus: ConnectionStatus
  lastSync: Date | null
  totalCount: number
}

// Context actions interface
interface CampaignsActions {
  // CRUD operations
  listCampaigns: () => Promise<void>
  getCampaign: (id: string) => Promise<void>
  createCampaign: (request: CreateCampaignRequest) => Promise<boolean>
  updateCampaign: (id: string, request: UpdateCampaignRequest) => Promise<boolean>
  deleteCampaign: (id: string) => Promise<boolean>
  
  // Campaign actions
  pauseCampaign: (id: string) => Promise<boolean>
  resumeCampaign: (id: string) => Promise<boolean>
  getCampaignAnalytics: (id: string) => Promise<void>
  
  // Connection management
  checkConnection: () => Promise<void>
  reconnect: () => Promise<void>
  
  // State management
  selectCampaign: (campaign: Campaign | null) => void
  clearError: () => void
  clearAnalytics: () => void
}

// Context type
interface CampaignsContextType extends CampaignsState, CampaignsActions {}

// Initial state
const initialState: CampaignsState = {
  campaigns: [],
  selectedCampaign: null,
  analytics: null,
  loading: false,
  error: null,
  connectionStatus: 'disconnected',
  lastSync: null,
  totalCount: 0,
}

// Create context
const CampaignsContext = createContext<CampaignsContextType | undefined>(undefined)

// Provider component
export function CampaignsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CampaignsState>(initialState)

  // Update state helper
  const updateState = useCallback((updates: Partial<CampaignsState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  // Check connection status
  const checkConnection = useCallback(async () => {
    try {
      updateState({ connectionStatus: 'connecting' })
      
      const health = await CampaignsService.checkHealth()
      
      if (health.isHealthy) {
        updateState({ 
          connectionStatus: 'connected',
          error: null 
        })
      } else {
        updateState({ 
          connectionStatus: 'error',
          error: 'Service is unhealthy'
        })
      }
    } catch (error) {
      updateState({ 
        connectionStatus: 'error',
        error: error instanceof Error ? error.message : 'Connection failed'
      })
    }
  }, [updateState])

  // Reconnect to service
  const reconnect = useCallback(async () => {
    await checkConnection()
    if (state.connectionStatus === 'connected') {
      await listCampaigns()
    }
  }, [checkConnection, state.connectionStatus])

  // List campaigns
  const listCampaigns = useCallback(async () => {
    try {
      updateState({ loading: true, error: null })
      
      const response = await CampaignsService.list()
      
      if (response.success && response.data) {
        updateState({
          campaigns: response.data.campaigns,
          totalCount: response.data.count,
          lastSync: new Date(),
          loading: false,
          error: null
        })
      } else {
        updateState({
          loading: false,
          error: response.error || 'Failed to fetch campaigns'
        })
      }
    } catch (error) {
      updateState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch campaigns'
      })
    }
  }, [updateState])

  // Get campaign by ID
  const getCampaign = useCallback(async (id: string) => {
    try {
      updateState({ loading: true, error: null })
      
      const response = await CampaignsService.getById(id)
      
      if (response.success && response.data) {
        updateState({
          selectedCampaign: response.data,
          loading: false,
          error: null
        })
      } else {
        updateState({
          loading: false,
          error: response.error || 'Failed to fetch campaign'
        })
      }
    } catch (error) {
      updateState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch campaign'
      })
    }
  }, [updateState])

  // Create campaign
  const createCampaign = useCallback(async (request: CreateCampaignRequest): Promise<boolean> => {
    try {
      updateState({ loading: true, error: null })
      
      const response = await CampaignsService.create(request)
      
      if (response.success && response.data) {
        // Add new campaign to list
        setState(prev => ({
          ...prev,
          campaigns: [...prev.campaigns, response.data!],
          totalCount: prev.totalCount + 1,
          loading: false,
          error: null,
          lastSync: new Date()
        }))
        return true
      } else {
        updateState({
          loading: false,
          error: response.error || 'Failed to create campaign'
        })
        return false
      }
    } catch (error) {
      updateState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to create campaign'
      })
      return false
    }
  }, [updateState])

  // Update campaign
  const updateCampaign = useCallback(async (id: string, request: UpdateCampaignRequest): Promise<boolean> => {
    try {
      updateState({ loading: true, error: null })
      
      const response = await CampaignsService.update(id, request)
      
      if (response.success && response.data) {
        // Update campaign in list
        setState(prev => ({
          ...prev,
          campaigns: prev.campaigns.map(campaign => 
            campaign.id === id ? response.data! : campaign
          ),
          selectedCampaign: prev.selectedCampaign?.id === id ? response.data! : prev.selectedCampaign,
          loading: false,
          error: null,
          lastSync: new Date()
        }))
        return true
      } else {
        updateState({
          loading: false,
          error: response.error || 'Failed to update campaign'
        })
        return false
      }
    } catch (error) {
      updateState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to update campaign'
      })
      return false
    }
  }, [updateState])

  // Delete campaign
  const deleteCampaign = useCallback(async (id: string): Promise<boolean> => {
    try {
      updateState({ loading: true, error: null })
      
      const response = await CampaignsService.delete(id)
      
      if (response.success) {
        // Remove campaign from list
        setState(prev => ({
          ...prev,
          campaigns: prev.campaigns.filter(campaign => campaign.id !== id),
          selectedCampaign: prev.selectedCampaign?.id === id ? null : prev.selectedCampaign,
          totalCount: prev.totalCount - 1,
          loading: false,
          error: null,
          lastSync: new Date()
        }))
        return true
      } else {
        updateState({
          loading: false,
          error: response.error || 'Failed to delete campaign'
        })
        return false
      }
    } catch (error) {
      updateState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to delete campaign'
      })
      return false
    }
  }, [updateState])

  // Pause campaign
  const pauseCampaign = useCallback(async (id: string): Promise<boolean> => {
    try {
      updateState({ loading: true, error: null })
      
      const response = await CampaignsService.pause(id)
      
      if (response.success && response.data) {
        // Update campaign status in list
        setState(prev => ({
          ...prev,
          campaigns: prev.campaigns.map(campaign => 
            campaign.id === id ? response.data! : campaign
          ),
          selectedCampaign: prev.selectedCampaign?.id === id ? response.data! : prev.selectedCampaign,
          loading: false,
          error: null,
          lastSync: new Date()
        }))
        return true
      } else {
        updateState({
          loading: false,
          error: response.error || 'Failed to pause campaign'
        })
        return false
      }
    } catch (error) {
      updateState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to pause campaign'
      })
      return false
    }
  }, [updateState])

  // Resume campaign
  const resumeCampaign = useCallback(async (id: string): Promise<boolean> => {
    try {
      updateState({ loading: true, error: null })
      
      const response = await CampaignsService.resume(id)
      
      if (response.success && response.data) {
        // Update campaign status in list
        setState(prev => ({
          ...prev,
          campaigns: prev.campaigns.map(campaign => 
            campaign.id === id ? response.data! : campaign
          ),
          selectedCampaign: prev.selectedCampaign?.id === id ? response.data! : prev.selectedCampaign,
          loading: false,
          error: null,
          lastSync: new Date()
        }))
        return true
      } else {
        updateState({
          loading: false,
          error: response.error || 'Failed to resume campaign'
        })
        return false
      }
    } catch (error) {
      updateState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to resume campaign'
      })
      return false
    }
  }, [updateState])

  // Get campaign analytics
  const getCampaignAnalytics = useCallback(async (id: string) => {
    try {
      updateState({ loading: true, error: null })
      
      const response = await CampaignsService.getAnalytics(id)
      
      if (response.success && response.data) {
        updateState({
          analytics: response.data,
          loading: false,
          error: null
        })
      } else {
        updateState({
          loading: false,
          error: response.error || 'Failed to fetch analytics'
        })
      }
    } catch (error) {
      updateState({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch analytics'
      })
    }
  }, [updateState])

  // Select campaign
  const selectCampaign = useCallback((campaign: Campaign | null) => {
    updateState({ selectedCampaign: campaign })
  }, [updateState])

  // Clear error
  const clearError = useCallback(() => {
    updateState({ error: null })
  }, [updateState])

  // Clear analytics
  const clearAnalytics = useCallback(() => {
    updateState({ analytics: null })
  }, [updateState])

  // Initialize connection on mount
  useEffect(() => {
    checkConnection()
  }, [checkConnection])

  // Auto-refresh campaigns when connected
  useEffect(() => {
    if (state.connectionStatus === 'connected') {
      listCampaigns()
    }
  }, [state.connectionStatus, listCampaigns])

  // Context value
  const contextValue: CampaignsContextType = {
    ...state,
    listCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    pauseCampaign,
    resumeCampaign,
    getCampaignAnalytics,
    checkConnection,
    reconnect,
    selectCampaign,
    clearError,
    clearAnalytics,
  }

  return (
    <CampaignsContext.Provider value={contextValue}>
      {children}
    </CampaignsContext.Provider>
  )
}

// Hook to use campaigns context
export function useCampaigns() {
  const context = useContext(CampaignsContext)
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignsProvider')
  }
  return context
}

// Hook for connection status only
export function useCampaignsConnection() {
  const context = useContext(CampaignsContext)
  if (context === undefined) {
    throw new Error('useCampaignsConnection must be used within a CampaignsProvider')
  }
  
  return {
    connectionStatus: context.connectionStatus,
    checkConnection: context.checkConnection,
    reconnect: context.reconnect,
  }
} 