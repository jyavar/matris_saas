import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BillingProvider, useBilling } from '../BillingContext'
import { BillingService } from '../../services/billing.service'

// Mock the BillingService
vi.mock('@/services/billing.service', () => ({
  BillingService: {
    getBillingData: vi.fn(),
    createInvoice: vi.fn(),
    updateBilling: vi.fn(),
    checkHealth: vi.fn(),
    getCircuitBreakerState: vi.fn(),
  },
}))

// Test component to access context
function TestComponent() {
  const { state, fetchBillingData, createInvoice, updateBilling, clearError } = useBilling()

  return (
    <div>
      <div data-testid="loading">{state.loading.toString()}</div>
      <div data-testid="error">{state.error || 'no-error'}</div>
      <div data-testid="billing-data">
        {state.billingData ? JSON.stringify(state.billingData) : 'no-data'}
      </div>
      <button onClick={() => fetchBillingData()}>Fetch Data</button>
      <button onClick={() => createInvoice({ amount: 100, description: 'Test', customerId: '123' })}>
        Create Invoice
      </button>
      <button onClick={() => updateBilling({ plan: 'Pro' })}>Update Billing</button>
      <button onClick={clearError}>Clear Error</button>
    </div>
  )
}

describe('BillingContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('BillingProvider', () => {
    it('should render children without crashing', () => {
      render(
        <BillingProvider>
          <div data-testid="child">Child Component</div>
        </BillingProvider>
      )

      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('should provide initial state', async () => {
      // Mock the service to return no data initially
      vi.mocked(BillingService.getBillingData).mockResolvedValue({
        success: true,
        data: undefined,
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Wait for the initial load to complete
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false')
      })

      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
      expect(screen.getByTestId('billing-data')).toHaveTextContent('no-data')
    })

    it('should load billing data on mount', async () => {
      const mockBillingData = {
        currentPlan: 'Pro',
        monthlySpend: 245.50,
        monthlyLimit: 500,
        nextBillingDate: '2024-02-15',
        usagePercentage: 49.1,
        invoices: [
          {
            id: 'INV-001',
            amount: 245.50,
            status: 'paid' as const,
            date: '2024-01-15',
          },
        ],
      }

      vi.mocked(BillingService.getBillingData).mockResolvedValue({
        success: true,
        data: mockBillingData,
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('billing-data')).toHaveTextContent('Pro')
      })

      expect(BillingService.getBillingData).toHaveBeenCalledTimes(1)
    })

    it('should handle loading state correctly', async () => {
      vi.mocked(BillingService.getBillingData).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ success: true, data: undefined }), 100))
      )

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Should show loading initially
      expect(screen.getByTestId('loading')).toHaveTextContent('true')

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false')
      })
    })

    it('should handle errors on initial load', async () => {
      vi.mocked(BillingService.getBillingData).mockResolvedValue({
        success: false,
        error: 'Failed to fetch billing data',
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Failed to fetch billing data')
      })
    })

    it('should handle network errors on initial load', async () => {
      vi.mocked(BillingService.getBillingData).mockRejectedValue(new Error('Network error'))

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Network error')
      })
    })
  })

  describe('useBilling hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        render(<TestComponent />)
      }).toThrow('useBilling must be used within a BillingProvider')

      consoleSpy.mockRestore()
    })

    it('should provide fetchBillingData function', async () => {
      const mockBillingData = {
        currentPlan: 'Enterprise',
        monthlySpend: 500,
        monthlyLimit: 1000,
        nextBillingDate: '2024-02-15',
        usagePercentage: 50,
        invoices: [],
      }

      vi.mocked(BillingService.getBillingData).mockResolvedValue({
        success: true,
        data: mockBillingData,
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Click fetch button
      screen.getByText('Fetch Data').click()

      await waitFor(() => {
        expect(screen.getByTestId('billing-data')).toHaveTextContent('Enterprise')
      })

      expect(BillingService.getBillingData).toHaveBeenCalledTimes(2) // Once on mount, once on click
    })

    it('should provide createInvoice function', async () => {
      const mockBillingData = {
        currentPlan: 'Pro',
        monthlySpend: 345.50,
        monthlyLimit: 500,
        nextBillingDate: '2024-02-15',
        usagePercentage: 69.1,
        invoices: [
          {
            id: 'INV-NEW',
            amount: 100,
            status: 'pending' as const,
            date: new Date().toISOString(),
          },
        ],
      }

      vi.mocked(BillingService.createInvoice).mockResolvedValue({
        success: true,
        data: mockBillingData,
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Click create invoice button
      screen.getByText('Create Invoice').click()

      await waitFor(() => {
        expect(BillingService.createInvoice).toHaveBeenCalledWith({
          amount: 100,
          description: 'Test',
          customerId: '123',
        })
      })
    })

    it('should provide updateBilling function', async () => {
      const mockBillingData = {
        currentPlan: 'Pro',
        monthlySpend: 245.50,
        monthlyLimit: 500,
        nextBillingDate: '2024-02-15',
        usagePercentage: 49.1,
        invoices: [],
      }

      vi.mocked(BillingService.updateBilling).mockResolvedValue({
        success: true,
        data: mockBillingData,
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Click update billing button
      screen.getByText('Update Billing').click()

      await waitFor(() => {
        expect(BillingService.updateBilling).toHaveBeenCalledWith({ plan: 'Pro' })
      })
    })

    it('should provide clearError function', async () => {
      // First set an error
      vi.mocked(BillingService.getBillingData).mockResolvedValue({
        success: false,
        error: 'Test error',
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Test error')
      })

      // Clear the error
      screen.getByText('Clear Error').click()

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('no-error')
      })
    })

    it('should handle service errors in createInvoice', async () => {
      vi.mocked(BillingService.createInvoice).mockResolvedValue({
        success: false,
        error: 'Invoice creation failed',
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      screen.getByText('Create Invoice').click()

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Invoice creation failed')
      })
    })

    it('should handle service errors in updateBilling', async () => {
      vi.mocked(BillingService.updateBilling).mockResolvedValue({
        success: false,
        error: 'Billing update failed',
      })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      screen.getByText('Update Billing').click()

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Billing update failed')
      })
    })

    it('should handle network errors in service calls', async () => {
      vi.mocked(BillingService.createInvoice).mockRejectedValue(new Error('Network error'))

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      screen.getByText('Create Invoice').click()

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Network error')
      })
    })
  })

  describe('state management', () => {
    it('should clear error when new data is loaded successfully', async () => {
      // First set an error
      vi.mocked(BillingService.getBillingData)
        .mockResolvedValueOnce({
          success: false,
          error: 'Initial error',
        })
        .mockResolvedValueOnce({
          success: true,
          data: {
            currentPlan: 'Pro',
            monthlySpend: 245.50,
            monthlyLimit: 500,
            nextBillingDate: '2024-02-15',
            usagePercentage: 49.1,
            invoices: [],
          },
        })

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Initial error')
      })

      // Fetch data again (should succeed this time)
      screen.getByText('Fetch Data').click()

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('no-error')
      })
    })

    it('should set loading state during operations', async () => {
      vi.mocked(BillingService.getBillingData).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ success: true, data: undefined }), 100))
      )

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Should be loading initially
      expect(screen.getByTestId('loading')).toHaveTextContent('true')

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false')
      })
    })
  })
}) 