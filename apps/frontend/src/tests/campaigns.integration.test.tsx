import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CampaignsProvider, useCampaigns } from '../contexts/CampaignsContext'
import { ConnectionStatus } from '../components/campaigns/ConnectionStatus'
import { type Campaign } from '../services/campaigns.service'

// Mock the campaigns service
vi.mock('../services/campaigns.service', () => ({
  CampaignsService: {
    checkHealth: vi.fn(),
    list: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getAnalytics: vi.fn(),
  }
}))

// Mock the supabase lib
vi.mock('@/lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-token'))
}))

// Import the mocked service
import { CampaignsService } from '../services/campaigns.service'

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Summer Sale Campaign',
    description: 'Promote summer products with 20% discount',
    budget: 5000,
    status: 'active',
    start_date: '2024-06-01',
    end_date: '2024-08-31',
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Holiday Special',
    description: 'Holiday season promotion',
    budget: 3000,
    status: 'paused',
    start_date: '2024-12-01',
    end_date: '2024-12-31',
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2024-11-01T00:00:00Z',
  },
]

const mockCampaignAnalytics = {
  campaign_id: '1',
  impressions: 1000,
  clicks: 50,
  conversions: 5,
  spend: 100.0,
  ctr: 5.0,
  cpa: 20.0,
  created_at: '2024-06-01T00:00:00Z',
}

// Test component to access context
function TestComponent() {
  const {
    campaigns,
    loading,
    error,
    connectionStatus,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    pauseCampaign,
    resumeCampaign,
    getCampaignAnalytics,
    clearError,
  } = useCampaigns()

  return (
    <div>
      <div data-testid="connection-status">{connectionStatus}</div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="error">{error || 'no-error'}</div>
      <div data-testid="campaigns-count">{campaigns.length}</div>
      
      {campaigns.map((campaign: Campaign) => (
        <div key={campaign.id} data-testid={`campaign-${campaign.id}`}>
          <span data-testid={`campaign-title-${campaign.id}`}>{campaign.title}</span>
          <span data-testid={`campaign-status-${campaign.id}`}>{campaign.status}</span>
        </div>
      ))}

      <button
        onClick={() => createCampaign({
          title: 'Test Campaign',
          budget: 1000,
          description: 'Test Description'
        })}
        data-testid="create-campaign"
      >
        Create Campaign
      </button>

      <button
        onClick={() => updateCampaign('1', { title: 'Updated Title' })}
        data-testid="update-campaign"
      >
        Update Campaign
      </button>

      <button
        onClick={() => deleteCampaign('1')}
        data-testid="delete-campaign"
      >
        Delete Campaign
      </button>

      <button
        onClick={() => pauseCampaign('1')}
        data-testid="pause-campaign"
      >
        Pause Campaign
      </button>

      <button
        onClick={() => resumeCampaign('1')}
        data-testid="resume-campaign"
      >
        Resume Campaign
      </button>

      <button
        onClick={() => getCampaignAnalytics('1')}
        data-testid="get-analytics"
      >
        Get Analytics
      </button>

      <button
        onClick={clearError}
        data-testid="clear-error"
      >
        Clear Error
      </button>
    </div>
  )
}

describe('Campaigns Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default successful health check
    vi.mocked(CampaignsService.checkHealth).mockResolvedValue({
      isHealthy: true,
      lastCheck: Date.now(),
      responseTime: 100,
      errorRate: 0,
    })
  })

  describe('CampaignsContext', () => {
    it('should create a campaign successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: '3',
          title: 'Test Campaign',
          budget: 1000,
          status: 'draft' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      
      vi.mocked(CampaignsService.create).mockResolvedValue(mockResponse)

      render(
        <CampaignsProvider>
          <TestComponent />
        </CampaignsProvider>
      )

      // Wait for connection to be established
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      // Click create campaign button
      await userEvent.click(screen.getByTestId('create-campaign'))

      // Wait for the campaign to be created
      await waitFor(() => {
        expect(screen.getByTestId('campaigns-count')).toHaveTextContent('1')
      })

      expect(CampaignsService.create).toHaveBeenCalledWith({
        title: 'Test Campaign',
        budget: 1000,
        description: 'Test Description'
      })
    })

    it('should update a campaign successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: '1',
          title: 'Updated Title',
          budget: 5000,
          status: 'active' as const,
          created_at: '2024-06-01T00:00:00Z',
          updated_at: new Date().toISOString(),
        }
      }
      
      vi.mocked(CampaignsService.update).mockResolvedValue(mockResponse)

      render(
        <CampaignsProvider>
          <TestComponent />
        </CampaignsProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('update-campaign'))

      await waitFor(() => {
        expect(CampaignsService.update).toHaveBeenCalledWith('1', { title: 'Updated Title' })
      })
    })

    it('should delete a campaign successfully', async () => {
      const mockResponse = { success: true }
      
      vi.mocked(CampaignsService.delete).mockResolvedValue(mockResponse)

      render(
        <CampaignsProvider>
          <TestComponent />
        </CampaignsProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('delete-campaign'))

      await waitFor(() => {
        expect(CampaignsService.delete).toHaveBeenCalledWith('1')
      })
    })

    it('should pause a campaign successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: '1',
          title: 'Summer Sale Campaign',
          status: 'paused' as const,
          budget: 5000,
          created_at: '2024-06-01T00:00:00Z',
          updated_at: new Date().toISOString(),
        }
      }
      
      vi.mocked(CampaignsService.pause).mockResolvedValue(mockResponse)

      render(
        <CampaignsProvider>
          <TestComponent />
        </CampaignsProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('pause-campaign'))

      await waitFor(() => {
        expect(CampaignsService.pause).toHaveBeenCalledWith('1')
      })
    })

    it('should resume a campaign successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: '1',
          title: 'Summer Sale Campaign',
          status: 'active' as const,
          budget: 5000,
          created_at: '2024-06-01T00:00:00Z',
          updated_at: new Date().toISOString(),
        }
      }
      
      vi.mocked(CampaignsService.resume).mockResolvedValue(mockResponse)

      render(
        <CampaignsProvider>
          <TestComponent />
        </CampaignsProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('resume-campaign'))

      await waitFor(() => {
        expect(CampaignsService.resume).toHaveBeenCalledWith('1')
      })
    })
  })

  describe('ConnectionStatus Component', () => {
    it('should display connection status correctly', async () => {
      render(
        <CampaignsProvider>
          <ConnectionStatus />
        </CampaignsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Connected')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should handle refresh button click', async () => {
      render(
        <CampaignsProvider>
          <ConnectionStatus />
        </CampaignsProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Connected')).toBeInTheDocument()
      }, { timeout: 5000 })

      const refreshButton = screen.getByLabelText('Refresh connection status')
      await userEvent.click(refreshButton)

      expect(CampaignsService.checkHealth).toHaveBeenCalledTimes(2) // Initial + refresh
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      vi.mocked(CampaignsService.list).mockResolvedValue({
        success: false,
        data: { campaigns: [], count: 0 },
        error: 'Failed to fetch campaigns'
      })

      render(
        <CampaignsProvider>
          <TestComponent />
        </CampaignsProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Failed to fetch campaigns')
      }, { timeout: 5000 })
    })

    it('should handle network errors', async () => {
      vi.mocked(CampaignsService.list).mockRejectedValue(new Error('Network error'))

      render(
        <CampaignsProvider>
          <TestComponent />
        </CampaignsProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Network error')
      }, { timeout: 5000 })
    })
  })

  describe('Loading States', () => {
    it('should show loading state during operations', async () => {
      // Mock a delayed response
      vi.mocked(CampaignsService.list).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          success: true,
          data: { campaigns: mockCampaigns, count: mockCampaigns.length }
        }), 100))
      )

      render(
        <CampaignsProvider>
          <TestComponent />
        </CampaignsProvider>
      )

      // Should show loading initially
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('true')
      }, { timeout: 5000 })

      // Should stop loading after response
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false')
      }, { timeout: 5000 })
    })
  })
}) 