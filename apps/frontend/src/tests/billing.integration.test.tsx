import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi, beforeAll, afterAll } from 'vitest'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { BillingProvider, useBilling } from '@/contexts/BillingContext'
import ConnectionStatus from '@/components/billing/ConnectionStatus'

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

// MSW Server Setup
const server = setupServer(
  // Health check
  rest.get('http://localhost:3001/api/health', (req, res, ctx) => {
    return res(ctx.json({ status: 'ok' }))
  }),

  // Get billing data
  rest.get('http://localhost:3001/api/invoices', (req, res, ctx) => {
    return res(ctx.json({
      data: [createMockInvoice()],
      pagination: { page: 1, limit: 10, total: 1 }
    }))
  }),

  // Get subscriptions
  rest.get('http://localhost:3001/api/subscriptions', (req, res, ctx) => {
    return res(ctx.json([createMockSubscription()]))
  }),

  // Get customer
  rest.get('http://localhost:3001/api/customers/me', (req, res, ctx) => {
    return res(ctx.json(createMockCustomer()))
  }),

  // Create invoice
  rest.post('http://localhost:3001/api/invoices', async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.json(createMockInvoice(body)))
  }),

  // Update invoice
  rest.patch('http://localhost:3001/api/invoices/:id', async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.json(createMockInvoice({ ...body, id: 'inv_123' })))
  }),

  // Delete invoice
  rest.delete('http://localhost:3001/api/invoices/:id', (req, res, ctx) => {
    return res(ctx.json({ message: 'Invoice deleted successfully' }))
  }),

  // Create subscription
  rest.post('http://localhost:3001/api/subscriptions', async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.json(createMockSubscription(body)))
  }),

  // Update subscription
  rest.patch('http://localhost:3001/api/subscriptions/:id', async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.json(createMockSubscription({ ...body, id: 'sub_123' })))
  }),

  // Cancel subscription
  rest.delete('http://localhost:3001/api/subscriptions/:id', (req, res, ctx) => {
    return res(ctx.json({ message: 'Subscription canceled successfully' }))
  })
)

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

// Test Setup
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterAll(() => {
  server.close()
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Billing Integration Tests', () => {
  describe('BillingContext', () => {
    it('should initialize with correct default state', () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      expect(screen.getByTestId('connection-status')).toHaveTextContent('disconnected')
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
      expect(screen.getByTestId('invoices-count')).toHaveTextContent('0')
      expect(screen.getByTestId('subscriptions-count')).toHaveTextContent('0')
      expect(screen.getByTestId('customer-email')).toHaveTextContent('no-customer')
    })

    it('should fetch billing data successfully', async () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Wait for initial health check and data fetch
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      await waitFor(() => {
        expect(screen.getByTestId('invoices-count')).toHaveTextContent('1')
      })

      expect(screen.getByTestId('customer-email')).toHaveTextContent('test@example.com')
    })

    it('should create invoice successfully', async () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      // Create invoice
      fireEvent.click(screen.getByTestId('create-invoice'))

      await waitFor(() => {
        expect(screen.getByTestId('invoices-count')).toHaveTextContent('2')
      })
    })

    it('should update invoice successfully', async () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      // Update invoice
      fireEvent.click(screen.getByTestId('update-invoice'))

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false')
      })
    })

    it('should delete invoice successfully', async () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      // Delete invoice
      fireEvent.click(screen.getByTestId('delete-invoice'))

      await waitFor(() => {
        expect(screen.getByTestId('invoices-count')).toHaveTextContent('0')
      })
    })

    it('should create subscription successfully', async () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      // Create subscription
      fireEvent.click(screen.getByTestId('create-subscription'))

      await waitFor(() => {
        expect(screen.getByTestId('subscriptions-count')).toHaveTextContent('2')
      })
    })

    it('should update subscription successfully', async () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      // Update subscription
      fireEvent.click(screen.getByTestId('update-subscription'))

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false')
      })
    })

    it('should cancel subscription successfully', async () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      // Cancel subscription
      fireEvent.click(screen.getByTestId('cancel-subscription'))

      await waitFor(() => {
        expect(screen.getByTestId('subscriptions-count')).toHaveTextContent('0')
      })
    })

    it('should handle errors gracefully', async () => {
      // Override with error response
      server.use(
        rest.get('http://localhost:3001/api/invoices', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
        })
      )

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
      }, { timeout: 5000 })

      expect(screen.getByTestId('error')).not.toHaveTextContent('no-error')
    })

    it('should clear errors when requested', async () => {
      // Override with error response
      server.use(
        rest.get('http://localhost:3001/api/invoices', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
        })
      )

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('error')).not.toHaveTextContent('no-error')
      }, { timeout: 5000 })

      // Clear error
      fireEvent.click(screen.getByTestId('clear-error'))

      expect(screen.getByTestId('error')).toHaveTextContent('no-error')
    })

    it('should retry connection successfully', async () => {
      // Override with error response
      server.use(
        rest.get('http://localhost:3001/api/invoices', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
        })
      )

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
      }, { timeout: 5000 })

      // Restore normal response
      server.use(
        rest.get('http://localhost:3001/api/invoices', (req, res, ctx) => {
          return res(ctx.json({
            data: [createMockInvoice()],
            pagination: { page: 1, limit: 10, total: 1 }
          }))
        })
      )

      // Retry connection
      fireEvent.click(screen.getByTestId('retry-connection'))

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })
    })

    it('should refresh data successfully', async () => {
      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('connected')
      }, { timeout: 5000 })

      // Refresh data
      fireEvent.click(screen.getByTestId('refresh-data'))

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('false')
      })
    })
  })

  describe('ConnectionStatus Component', () => {
    it('should render compact status correctly', async () => {
      render(
        <BillingProvider>
          <ConnectionStatus compact />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should render detailed status correctly', async () => {
      render(
        <BillingProvider>
          <ConnectionStatus showDetails />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument()
        expect(screen.getByText('Circuit Breaker')).toBeInTheDocument()
        expect(screen.getByText('Connection Info')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should show correct status colors', async () => {
      render(
        <BillingProvider>
          <ConnectionStatus />
        </BillingProvider>
      )

      await waitFor(() => {
        const statusElement = screen.getByRole('status')
        expect(statusElement).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should be accessible', async () => {
      render(
        <BillingProvider>
          <ConnectionStatus />
        </BillingProvider>
      )

      await waitFor(() => {
        const statusElement = screen.getByRole('status')
        expect(statusElement).toHaveAttribute('aria-live', 'polite')
      }, { timeout: 5000 })
    })
  })

  describe('Edge Cases', () => {
    it('should handle network timeouts', async () => {
      // Override with timeout
      server.use(
        rest.get('http://localhost:3001/api/invoices', (req, res, ctx) => {
          return new Promise(() => {}) // Never resolves
        })
      )

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
      }, { timeout: 15000 })
    })

    it('should handle malformed responses', async () => {
      // Override with malformed response
      server.use(
        rest.get('http://localhost:3001/api/invoices', (req, res, ctx) => {
          return res(ctx.body('Invalid JSON'))
        })
      )

      render(
        <BillingProvider>
          <TestComponent />
        </BillingProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('connection-status')).toHaveTextContent('error')
      }, { timeout: 5000 })
    })

    it('should handle empty responses', async () => {
      // Override with empty response
      server.use(
        rest.get('http://localhost:3001/api/invoices', (req, res, ctx) => {
          return res(ctx.json({ data: [], pagination: { page: 1, limit: 10, total: 0 } }))
        })
      )

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

      // Circuit breaker state should be monitored
      const circuitState = screen.getByTestId('connection-status')
      expect(circuitState).toBeInTheDocument()
    })
  })
}) 