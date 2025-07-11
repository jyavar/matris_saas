import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { BillingProvider, useBilling } from '../contexts/BillingContext'
import ConnectionStatus from '../components/billing/ConnectionStatus'

// Mock the billing service
vi.mock('../services/billing.service', () => ({
  BillingService: {
    checkHealth: vi.fn(),
    getBillingData: vi.fn(),
    getInvoices: vi.fn(),
    getSubscriptions: vi.fn(),
    getCustomer: vi.fn(),
    getInvoiceById: vi.fn(),
    createInvoice: vi.fn(),
    updateInvoice: vi.fn(),
    deleteInvoice: vi.fn(),
    createSubscription: vi.fn(),
    updateSubscription: vi.fn(),
    cancelSubscription: vi.fn(),
    getCircuitBreakerState: vi.fn(),
  }
}))

// Mock the supabase lib
vi.mock('../lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-token'))
}))

// Import the mocked service
import { BillingService } from '../services/billing.service'

// Mock data factories
const createMockInvoice = (overrides = {}) => ({
  id: 'inv_123',
  amount: 1000,
  currency: 'USD',
  description: 'Test Invoice',
  customer_id: 'cust_123',
  due_date: '2024-12-31',
  status: 'pending' as const,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides
})

const createMockSubscription = (overrides = {}) => ({
  id: 'sub_123',
  customer_id: 'cust_123',
  plan_id: 'plan_pro',
  status: 'active' as const,
  current_period_start: '2024-01-01T00:00:00Z',
  current_period_end: '2024-02-01T00:00:00Z',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides
})

const createMockCustomer = (overrides = {}) => ({
  id: 'cust_123',
  email: 'test@example.com',
  name: 'Test Customer',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides
})

// Test Component
function TestComponent() {
  const { 
    state, 
    fetchBillingData, 
    createInvoice, 
    updateInvoice, 
    deleteInvoice,
    createSubscription,
    updateSubscription,
    cancelSubscription,
    clearError,
    retryConnection,
    refreshData
  } = useBilling()

  return (
    <div>
      <div data-testid="connection-status">{state.connectionStatus}</div>
      <div data-testid="loading">{state.loading.toString()}</div>
      <div data-testid="error">{state.error || 'no-error'}</div>
      <div data-testid="invoices-count">{state.invoices.length}</div>
      <div data-testid="subscriptions-count">{state.subscriptions.length}</div>
      <div data-testid="customer-email">{state.customer?.email || 'no-customer'}</div>
      
      <button onClick={fetchBillingData} data-testid="fetch-billing">
        Fetch Billing
      </button>
      
      <button onClick={() => createInvoice({
        amount: 1000,
        currency: 'USD',
        description: 'Test Invoice'
      })} data-testid="create-invoice">
        Create Invoice
      </button>
      
      <button onClick={() => updateInvoice('inv_123', {
        status: 'paid'
      })} data-testid="update-invoice">
        Update Invoice
      </button>
      
      <button onClick={() => deleteInvoice('inv_123')} data-testid="delete-invoice">
        Delete Invoice
      </button>
      
      <button onClick={() => createSubscription({
        plan_id: 'plan_pro'
      })} data-testid="create-subscription">
        Create Subscription
      </button>
      
      <button onClick={() => updateSubscription('sub_123', {
        status: 'canceled'
      })} data-testid="update-subscription">
        Update Subscription
      </button>
      
      <button onClick={() => cancelSubscription('sub_123')} data-testid="cancel-subscription">
        Cancel Subscription
      </button>
      
      <button onClick={clearError} data-testid="clear-error">
        Clear Error
      </button>
      
      <button onClick={retryConnection} data-testid="retry-connection">
        Retry Connection
      </button>
      
      <button onClick={refreshData} data-testid="refresh-data">
        Refresh Data
      </button>
    </div>
  )
}

describe('Billing Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default successful health check
    vi.mocked(BillingService.checkHealth).mockResolvedValue({
      isHealthy: true,
      lastCheck: Date.now(),
      responseTime: 100,
      errorRate: 0,
    })

    // Default circuit breaker state
    vi.mocked(BillingService.getCircuitBreakerState).mockReturnValue({
      failures: 0,
      lastFailureTime: 0,
      state: 'CLOSED' as const,
    })

    // Default billing data
    vi.mocked(BillingService.getBillingData).mockResolvedValue({
      success: true,
      data: {
        invoices: [],
        subscriptions: [],
        customer: null,
      }
    })

    // Default successful responses for other methods
    vi.mocked(BillingService.getInvoices).mockResolvedValue({
      success: true,
      data: []
    })
    vi.mocked(BillingService.getSubscriptions).mockResolvedValue({
      success: true,
      data: []
    })
    vi.mocked(BillingService.getCustomer).mockResolvedValue({
      success: true,
      data: null
    })
  })

  describe('BillingContext', () => {
    it('should create invoice successfully', async () => {
      const mockInvoice = createMockInvoice()
      vi.mocked(BillingService.createInvoice).mockResolvedValue({
        success: true,
        data: mockInvoice
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('create-invoice'))

      await waitFor(() => {
        expect(BillingService.createInvoice).toHaveBeenCalledWith({
          amount: 1000,
          currency: 'USD',
          description: 'Test Invoice'
        })
      })
    })

    it('should update invoice successfully', async () => {
      const mockInvoice = createMockInvoice({ status: 'paid' })
      vi.mocked(BillingService.updateInvoice).mockResolvedValue({
        success: true,
        data: mockInvoice
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('update-invoice'))

      await waitFor(() => {
        expect(BillingService.updateInvoice).toHaveBeenCalledWith('inv_123', {
          status: 'paid'
        })
      })
    })

    it('should delete invoice successfully', async () => {
      vi.mocked(BillingService.deleteInvoice).mockResolvedValue({
        success: true
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('delete-invoice'))

      await waitFor(() => {
        expect(BillingService.deleteInvoice).toHaveBeenCalledWith('inv_123')
      })
    })

    it('should create subscription successfully', async () => {
      const mockSubscription = createMockSubscription()
      vi.mocked(BillingService.createSubscription).mockResolvedValue({
        success: true,
        data: mockSubscription
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('create-subscription'))

      await waitFor(() => {
        expect(BillingService.createSubscription).toHaveBeenCalledWith({
          plan_id: 'plan_pro'
        })
      })
    })

    it('should update subscription successfully', async () => {
      const mockSubscription = createMockSubscription({ status: 'canceled' })
      vi.mocked(BillingService.updateSubscription).mockResolvedValue({
        success: true,
        data: mockSubscription
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('update-subscription'))

      await waitFor(() => {
        expect(BillingService.updateSubscription).toHaveBeenCalledWith('sub_123', {
          status: 'canceled'
        })
      })
    })

    it('should cancel subscription successfully', async () => {
      vi.mocked(BillingService.cancelSubscription).mockResolvedValue({
        success: true
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('cancel-subscription'))

      await waitFor(() => {
        expect(BillingService.cancelSubscription).toHaveBeenCalledWith('sub_123')
      })
    })

    it('should retry connection successfully', async () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('retry-connection'))

      expect(BillingService.checkHealth).toHaveBeenCalledTimes(2) // Initial + retry
    })

    it('should refresh data successfully', async () => {
      const mockInvoices = [createMockInvoice()]
      const mockSubscriptions = [createMockSubscription()]
      const mockCustomer = createMockCustomer()

      vi.mocked(BillingService.getInvoices).mockResolvedValue({
        success: true,
        data: mockInvoices
      })
      vi.mocked(BillingService.getSubscriptions).mockResolvedValue({
        success: true,
        data: mockSubscriptions
      })
      vi.mocked(BillingService.getCustomer).mockResolvedValue({
        success: true,
        data: mockCustomer
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await userEvent.click(screen.getByTestId('refresh-data'))

      await waitFor(() => {
        expect(BillingService.getInvoices).toHaveBeenCalled()
        expect(BillingService.getSubscriptions).toHaveBeenCalled()
        expect(BillingService.getCustomer).toHaveBeenCalled()
      })
    })
  })

  describe('ConnectionStatus Component', () => {
    it('should display connection status correctly', async () => {
      render(
        <BillingProvider>
          <ConnectionStatus />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Connected')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should handle refresh button click', async () => {
      render(
        <BillingProvider>
          <ConnectionStatus />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByText('Connected')).toBeInTheDocument()
      }, { timeout: 5000 })

      const refreshButton = screen.getByLabelText('Refresh connection status')
      await userEvent.click(refreshButton)

      expect(BillingService.checkHealth).toHaveBeenCalledTimes(2) // Initial + refresh
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      vi.mocked(BillingService.getInvoices).mockResolvedValue({
        success: false,
        error: 'Failed to fetch invoices'
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Failed to fetch invoices')
      }, { timeout: 5000 })
    })

    it('should handle network errors', async () => {
      vi.mocked(BillingService.getInvoices).mockRejectedValue(new Error('Network error'))

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Network error')
      }, { timeout: 5000 })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty responses', async () => {
      vi.mocked(BillingService.getInvoices).mockResolvedValue({
        success: true,
        data: []
      })
      vi.mocked(BillingService.getSubscriptions).mockResolvedValue({
        success: true,
        data: []
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
        expect(screen.getByTestId('invoices-count')).toHaveTextContent('0')
      }, { timeout: 5000 })
    })
  })

  describe('Circuit Breaker', () => {
    it('should track circuit breaker state', async () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      // Verify health check was called
      expect(BillingService.checkHealth).toHaveBeenCalled()
    })
  })
}) 