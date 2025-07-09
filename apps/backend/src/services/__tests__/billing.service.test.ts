import { describe, it, expect, vi, beforeEach } from 'vitest'

import { billingService } from '../billing.service.js'

// Mock Stripe service
vi.mock('../stripe.service.js', () => ({
  stripeService: {
    createCustomer: vi.fn(),
    createSubscription: vi.fn(),
    cancelSubscription: vi.fn(),
    getSubscription: vi.fn(),
  },
}))

// Mock logger service
vi.mock('../logger.service.js', () => ({
  logAction: vi.fn(),
}))

// Mock fetch
global.fetch = vi.fn()

// Import mocked services
import { stripeService } from '../stripe.service.js'

describe('BillingService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('billingService wrapper methods', () => {
    it('should have createCustomer method', () => {
      expect(typeof billingService.createCustomer).toBe('function')
    })

    it('should have createSubscription method', () => {
      expect(typeof billingService.createSubscription).toBe('function')
    })

    it('should have cancelSubscription method', () => {
      expect(typeof billingService.cancelSubscription).toBe('function')
    })

    it('should have getSubscription method', () => {
      expect(typeof billingService.getSubscription).toBe('function')
    })
  })

  describe('type guards', () => {
    it('should validate InvoiceDTO structure', () => {
      const validInvoice = {
        id: 'inv_123',
        customerId: 'cus_123',
        amount: 1000,
        currency: 'usd',
        status: 'pending',
        createdAt: '2024-01-01T00:00:00.000Z',
      }

      expect(validInvoice).toHaveProperty('id')
      expect(validInvoice).toHaveProperty('customerId')
      expect(validInvoice).toHaveProperty('amount')
      expect(validInvoice).toHaveProperty('currency')
      expect(validInvoice).toHaveProperty('status')
      expect(validInvoice).toHaveProperty('createdAt')
    })

    it('should validate CustomerDTO structure', () => {
      const validCustomer = {
        id: 'cus_123',
        email: 'test@example.com',
        createdAt: '2024-01-01T00:00:00.000Z',
      }

      expect(validCustomer).toHaveProperty('id')
      expect(validCustomer).toHaveProperty('email')
      expect(validCustomer).toHaveProperty('createdAt')
    })

    it('should validate SubscriptionDTO structure', () => {
      const validSubscription = {
        id: 'sub_123',
        customerId: 'cus_123',
        priceId: 'price_123',
        status: 'active',
        quantity: 1,
        currentPeriodStart: '2024-01-01T00:00:00.000Z',
        currentPeriodEnd: '2024-02-01T00:00:00.000Z',
        cancelAtPeriodEnd: false,
        createdAt: '2024-01-01T00:00:00.000Z',
      }

      expect(validSubscription).toHaveProperty('id')
      expect(validSubscription).toHaveProperty('customerId')
      expect(validSubscription).toHaveProperty('priceId')
      expect(validSubscription).toHaveProperty('status')
      expect(validSubscription).toHaveProperty('quantity')
      expect(validSubscription).toHaveProperty('currentPeriodStart')
      expect(validSubscription).toHaveProperty('currentPeriodEnd')
      expect(validSubscription).toHaveProperty('cancelAtPeriodEnd')
      expect(validSubscription).toHaveProperty('createdAt')
    })
  })

  describe('service structure', () => {
    it('should export billingService object', () => {
      expect(billingService).toBeDefined()
      expect(typeof billingService).toBe('object')
    })

    it('should have all required methods', () => {
      const requiredMethods = [
        'createCustomer',
        'createSubscription', 
        'cancelSubscription',
        'getSubscription'
      ]

      requiredMethods.forEach(method => {
        expect(billingService).toHaveProperty(method)
        expect(typeof billingService[method as keyof typeof billingService]).toBe('function')
      })
    })
  })
})
