import { describe, it, expect, vi, beforeEach } from 'vitest'
import { z } from 'zod'

import {
  cancelSubscriptionExtended,
  createCustomerExtended,
  createInvoiceExtended,
  createSubscriptionExtended,
  getAllInvoicesExtended,
  getCustomerByIdExtended,
  getCustomerSubscriptionsExtended,
  getInvoiceByIdExtended,
  getSubscriptionExtended,
  updateInvoiceExtended,
  updateSubscriptionExtended,
  updateSubscriptionSchema,
} from '../services/billing.service.js'
import { ApiError } from '../utils/ApiError.js'

// Mock stripe service
vi.mock('../services/stripe.service.js', () => ({
  stripeService: {
    createCustomer: vi.fn(),
    createSubscription: vi.fn(),
    cancelSubscription: vi.fn(),
    getSubscription: vi.fn(),
  },
}))

// Mock fetch
global.fetch = vi.fn()

// Mock Stripe
vi.mock('stripe', () => ({
  default: vi.fn(() => ({
    subscriptions: {
      update: vi.fn(),
    },
  })),
}))

describe('Billing Extended Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createCustomerExtended', () => {
    it('should create customer successfully', async () => {
      const mockStripeCustomer = {
        id: 'cus_test123',
        email: 'test@example.com',
        name: 'Test User',
        created: 1640995200,
        metadata: {},
      }

      const mockSupabaseResponse = [{
        id: 'cus_test123',
        email: 'test@example.com',
        name: 'Test User',
        phone: '+1234567890',
        metadata: {},
        createdAt: '2025-01-01T00:00:00.000Z',
      }]

      const { stripeService } = await import('../services/stripe.service.js')
      vi.mocked(stripeService.createCustomer).mockResolvedValue(mockStripeCustomer)
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSupabaseResponse),
      } as Response)

      const result = await createCustomerExtended({
        email: 'test@example.com',
        name: 'Test User',
        phone: '+1234567890',
      })

      expect(result).toEqual(mockSupabaseResponse[0])
      expect(stripeService.createCustomer).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test User',
        metadata: undefined,
      })
    })

    it('should handle Supabase failure gracefully', async () => {
      const mockStripeCustomer = {
        id: 'cus_test123',
        email: 'test@example.com',
        name: 'Test User',
        created: 1640995200,
        metadata: {},
      }

      const { stripeService } = await import('../services/stripe.service.js')
      vi.mocked(stripeService.createCustomer).mockResolvedValue(mockStripeCustomer)
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        text: () => Promise.resolve('Database error'),
      } as Response)

      const result = await createCustomerExtended({
        email: 'test@example.com',
        name: 'Test User',
      })

      expect(result.id).toBe('cus_test123')
      expect(result.email).toBe('test@example.com')
    })
  })

  describe('createSubscriptionExtended', () => {
    it('should create subscription successfully', async () => {
      const mockStripeSubscription = {
        id: 'sub_test123',
        customerId: 'cus_test123',
        status: 'active' as const,
        currentPeriodStart: 1640995200,
        currentPeriodEnd: 1643673600,
        cancelAtPeriodEnd: false,
        items: [{ id: 'si_test123', priceId: 'price_test123', quantity: 1 }],
      }

      const mockSupabaseResponse = [{
        id: 'sub_test123',
        customerId: 'cus_test123',
        priceId: 'price_test123',
        status: 'active',
        quantity: 1,
        currentPeriodStart: '2025-01-01T00:00:00.000Z',
        currentPeriodEnd: '2025-01-31T00:00:00.000Z',
        cancelAtPeriodEnd: false,
        metadata: {},
        createdAt: '2025-01-01T00:00:00.000Z',
      }]

      const { stripeService } = await import('../services/stripe.service.js')
      vi.mocked(stripeService.createSubscription).mockResolvedValue(mockStripeSubscription)
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSupabaseResponse),
      } as Response)

      const result = await createSubscriptionExtended({
        customerId: 'cus_test123',
        priceId: 'price_test123',
        quantity: 1,
      })

      expect(result).toEqual(mockSupabaseResponse[0])
      expect(stripeService.createSubscription).toHaveBeenCalledWith({
        customerId: 'cus_test123',
        priceId: 'price_test123',
        quantity: 1,
        metadata: undefined,
      })
    })
  })

  describe('cancelSubscriptionExtended', () => {
    it('should cancel subscription successfully', async () => {
      const mockStripeSubscription = {
        id: 'sub_test123',
        customerId: 'cus_test123',
        status: 'canceled' as const,
        currentPeriodStart: 1640995200,
        currentPeriodEnd: 1643673600,
        cancelAtPeriodEnd: false,
        items: [{ id: 'si_test123', priceId: 'price_test123', quantity: 1 }],
      }

      const { stripeService } = await import('../services/stripe.service.js')
      vi.mocked(stripeService.cancelSubscription).mockResolvedValue(mockStripeSubscription)
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
      } as Response)

      await expect(cancelSubscriptionExtended('sub_test123')).resolves.not.toThrow()

      expect(stripeService.cancelSubscription).toHaveBeenCalledWith('sub_test123')
    })

    it('should handle Stripe error', async () => {
      const { stripeService } = await import('../services/stripe.service.js')
      vi.mocked(stripeService.cancelSubscription).mockRejectedValue(new Error('Stripe error'))

      await expect(cancelSubscriptionExtended('sub_test123')).rejects.toThrow('Failed to cancel subscription')
    })
  })

  describe('updateSubscriptionExtended', () => {
    it('should update subscription successfully', async () => {
      const mockStripeSubscription = {
        id: 'sub_test123',
        customerId: 'cus_test123',
        status: 'active' as const,
        currentPeriodStart: 1640995200,
        currentPeriodEnd: 1643673600,
        cancelAtPeriodEnd: false,
        items: [{ id: 'si_test123', priceId: 'price_test123', quantity: 2 }],
      }

      const mockUpdatedStripeSubscription = {
        id: 'sub_test123',
        customer: 'cus_test123',
        status: 'active',
        current_period_start: 1640995200,
        current_period_end: 1643673600,
        cancel_at_period_end: false,
        items: { data: [{ id: 'si_test123', price: { id: 'price_test123' }, quantity: 2 }] },
        metadata: { test: 'value' },
        created: 1640995200,
      }

      const { stripeService } = await import('../services/stripe.service.js')
      vi.mocked(stripeService.getSubscription).mockResolvedValue(mockStripeSubscription)
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
      } as Response)

      const stripe = await import('stripe')
      vi.mocked(stripe.default).mockImplementation(() => ({
        subscriptions: {
          update: vi.fn().mockResolvedValue(mockUpdatedStripeSubscription),
        },
      }) as any)

      const result = await updateSubscriptionExtended('sub_test123', {
        quantity: 2,
        metadata: { test: 'value' },
      })

      expect(result.id).toBe('sub_test123')
      expect(result.quantity).toBe(2)
      expect(result.metadata).toEqual({ test: 'value' })
    })

    it('should handle subscription not found', async () => {
      const { stripeService } = await import('../services/stripe.service.js')
      vi.mocked(stripeService.getSubscription).mockResolvedValue(null)

      await expect(updateSubscriptionExtended('sub_test123', { quantity: 2 }))
        .rejects.toThrow('Failed to update subscription')
    })
  })

  describe('createInvoiceExtended', () => {
    it('should create invoice successfully', async () => {
      const mockSupabaseResponse = [{
        id: 'inv_test123',
        customerId: 'cus_test123',
        amount: 1000,
        currency: 'usd',
        description: 'Test invoice',
        dueDate: '2025-02-01T00:00:00.000Z',
        status: 'pending',
        createdAt: '2025-01-01T00:00:00.000Z',
      }]

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSupabaseResponse),
      } as Response)

      const result = await createInvoiceExtended({
        customer_id: 'cus_test123',
        amount: 1000,
        currency: 'usd',
        description: 'Test invoice',
        due_date: '2025-02-01T00:00:00.000Z',
      })

      expect(result).toEqual(mockSupabaseResponse[0])
    })
  })

  describe('getInvoiceByIdExtended', () => {
    it('should get invoice by id successfully', async () => {
      const mockInvoice = {
        id: 'inv_test123',
        customerId: 'cus_test123',
        amount: 1000,
        currency: 'usd',
        status: 'pending',
        createdAt: '2025-01-01T00:00:00.000Z',
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockInvoice]),
      } as Response)

      const result = await getInvoiceByIdExtended('inv_test123')

      expect(result).toEqual(mockInvoice)
    })

    it('should return null for non-existent invoice', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)

      const result = await getInvoiceByIdExtended('inv_nonexistent')

      expect(result).toBeNull()
    })
  })

  describe('updateInvoiceExtended', () => {
    it('should update invoice successfully', async () => {
      const mockUpdatedInvoice = {
        id: 'inv_test123',
        customerId: 'cus_test123',
        amount: 1500,
        currency: 'usd',
        status: 'paid',
        createdAt: '2025-01-01T00:00:00.000Z',
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockUpdatedInvoice]),
      } as Response)

      const result = await updateInvoiceExtended('inv_test123', {
        amount: 1500,
        status: 'paid',
      })

      expect(result).toEqual(mockUpdatedInvoice)
    })
  })

  describe('getAllInvoicesExtended', () => {
    it('should get all invoices for user', async () => {
      const mockInvoices = [
        {
          id: 'inv_test1',
          customerId: 'cus_test123',
          amount: 1000,
          currency: 'usd',
          status: 'pending',
          createdAt: '2025-01-01T00:00:00.000Z',
        },
        {
          id: 'inv_test2',
          customerId: 'cus_test123',
          amount: 2000,
          currency: 'usd',
          status: 'paid',
          createdAt: '2025-01-02T00:00:00.000Z',
        },
      ]

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockInvoices),
      } as Response)

      const result = await getAllInvoicesExtended('cus_test123')

      expect(result).toEqual(mockInvoices)
    })
  })

  describe('getCustomerByIdExtended', () => {
    it('should get customer by id successfully', async () => {
      const mockCustomer = {
        id: 'cus_test123',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2025-01-01T00:00:00.000Z',
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockCustomer]),
      } as Response)

      const result = await getCustomerByIdExtended('cus_test123')

      expect(result).toEqual(mockCustomer)
    })
  })

  describe('getCustomerSubscriptionsExtended', () => {
    it('should get customer subscriptions successfully', async () => {
      const mockSubscriptions = [
        {
          id: 'sub_test1',
          customerId: 'cus_test123',
          priceId: 'price_test1',
          status: 'active',
          quantity: 1,
          currentPeriodStart: '2025-01-01T00:00:00.000Z',
          currentPeriodEnd: '2025-01-31T00:00:00.000Z',
          cancelAtPeriodEnd: false,
          createdAt: '2025-01-01T00:00:00.000Z',
        },
      ]

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSubscriptions),
      } as Response)

      const result = await getCustomerSubscriptionsExtended('cus_test123')

      expect(result).toEqual(mockSubscriptions)
    })
  })

  describe('getSubscriptionExtended', () => {
    it('should get subscription by id successfully', async () => {
      const mockSubscription = {
        id: 'sub_test123',
        customerId: 'cus_test123',
        priceId: 'price_test123',
        status: 'active',
        quantity: 1,
        currentPeriodStart: '2025-01-01T00:00:00.000Z',
        currentPeriodEnd: '2025-01-31T00:00:00.000Z',
        cancelAtPeriodEnd: false,
        createdAt: '2025-01-01T00:00:00.000Z',
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockSubscription]),
      } as Response)

      const result = await getSubscriptionExtended('sub_test123')

      expect(result).toEqual(mockSubscription)
    })
  })

  describe('Schema validation', () => {
    it('should validate updateSubscriptionSchema correctly', () => {
      const validData = {
        quantity: 2,
        metadata: { test: 'value' },
        cancelAtPeriodEnd: true,
      }

      const result = updateSubscriptionSchema.parse(validData)
      expect(result).toEqual(validData)
    })

    it('should reject invalid updateSubscriptionSchema data', () => {
      const invalidData = {
        quantity: -1, // Invalid: must be >= 1
      }

      expect(() => updateSubscriptionSchema.parse(invalidData)).toThrow()
    })
  })
}) 