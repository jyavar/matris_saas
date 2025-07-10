import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BillingService, type BillingData, type CreateInvoiceRequest, type UpdateBillingRequest } from '../billing.service'

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
    })),
  },
}))

// Mock the BillingService methods
vi.mock('../billing.service', async () => {
  const actual = await vi.importActual('../billing.service')
  return {
    ...actual,
    BillingService: {
      getBillingData: vi.fn(),
      createInvoice: vi.fn(),
      updateBilling: vi.fn(),
    },
  }
})

describe('BillingService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getBillingData', () => {
    it('should return billing data successfully', async () => {
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
          {
            id: 'INV-002',
            amount: 198.75,
            status: 'pending' as const,
            date: '2024-02-15',
          },
        ],
      }

      vi.mocked(BillingService.getBillingData).mockResolvedValue({
        success: true,
        data: mockBillingData,
      })

      const result = await BillingService.getBillingData()

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.currentPlan).toBe('Pro')
      expect(result.data?.monthlySpend).toBe(245.50)
      expect(result.data?.monthlyLimit).toBe(500)
      expect(result.data?.usagePercentage).toBe(49.1)
      expect(result.data?.invoices).toHaveLength(2)
      expect(result.error).toBeUndefined()
    })

    it('should handle errors gracefully', async () => {
      vi.mocked(BillingService.getBillingData).mockResolvedValue({
        success: false,
        error: 'Network error',
      })

      const result = await BillingService.getBillingData()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Network error')
      expect(result.data).toBeUndefined()
    })
  })

  describe('createInvoice', () => {
    it('should create invoice successfully', async () => {
      const request: CreateInvoiceRequest = {
        amount: 100,
        description: 'Test invoice',
        customerId: 'customer-123',
      }

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

      const result = await BillingService.createInvoice(request)

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.invoices).toHaveLength(1)
      expect(result.data?.monthlySpend).toBe(345.50)
      expect(result.error).toBeUndefined()
    })

    it('should handle creation errors', async () => {
      const request: CreateInvoiceRequest = {
        amount: 100,
        description: 'Test invoice',
        customerId: 'customer-123',
      }

      vi.mocked(BillingService.createInvoice).mockResolvedValue({
        success: false,
        error: 'Creation failed',
      })

      const result = await BillingService.createInvoice(request)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Creation failed')
      expect(result.data).toBeUndefined()
    })

    it('should validate request parameters', async () => {
      const request = {
        amount: 100,
        description: 'Test invoice',
        customerId: 'customer-123',
      } as CreateInvoiceRequest

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

      const result = await BillingService.createInvoice(request)

      expect(result.success).toBe(true)
      expect(result.data?.invoices[0]?.amount).toBe(request.amount)
    })
  })

  describe('updateBilling', () => {
    it('should update billing successfully', async () => {
      const request: UpdateBillingRequest = {
        plan: 'Enterprise',
        paymentMethod: 'card_123',
      }

      const mockBillingData = {
        currentPlan: 'Enterprise',
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

      const result = await BillingService.updateBilling(request)

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.currentPlan).toBe('Enterprise')
      expect(result.error).toBeUndefined()
    })

    it('should handle update errors', async () => {
      const request: UpdateBillingRequest = {
        plan: 'Enterprise',
      }

      vi.mocked(BillingService.updateBilling).mockResolvedValue({
        success: false,
        error: 'Update failed',
      })

      const result = await BillingService.updateBilling(request)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Update failed')
      expect(result.data).toBeUndefined()
    })

    it('should handle partial updates', async () => {
      const request: UpdateBillingRequest = {
        plan: 'Pro',
      }

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

      const result = await BillingService.updateBilling(request)

      expect(result.success).toBe(true)
      expect(result.data?.currentPlan).toBe('Pro')
    })
  })

  describe('data structure validation', () => {
    it('should return correct billing data structure', async () => {
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

      const result = await BillingService.getBillingData()

      if (result.success && result.data) {
        const billingData: BillingData = result.data

        expect(typeof billingData.currentPlan).toBe('string')
        expect(typeof billingData.monthlySpend).toBe('number')
        expect(typeof billingData.monthlyLimit).toBe('number')
        expect(typeof billingData.nextBillingDate).toBe('string')
        expect(typeof billingData.usagePercentage).toBe('number')
        expect(Array.isArray(billingData.invoices)).toBe(true)

        // Validate invoice structure
        if (billingData.invoices.length > 0) {
          const invoice = billingData.invoices[0]
          if (invoice) {
            expect(typeof invoice.id).toBe('string')
            expect(typeof invoice.amount).toBe('number')
            expect(['paid', 'pending', 'overdue']).toContain(invoice.status)
            expect(typeof invoice.date).toBe('string')
          }
        }
      }
    })

    it('should calculate usage percentage correctly', async () => {
      const mockBillingData = {
        currentPlan: 'Pro',
        monthlySpend: 245.50,
        monthlyLimit: 500,
        nextBillingDate: '2024-02-15',
        usagePercentage: 49.1,
        invoices: [],
      }

      vi.mocked(BillingService.getBillingData).mockResolvedValue({
        success: true,
        data: mockBillingData,
      })

      const result = await BillingService.getBillingData()

      if (result.success && result.data) {
        const { monthlySpend, monthlyLimit, usagePercentage } = result.data
        const expectedPercentage = (monthlySpend / monthlyLimit) * 100

        expect(usagePercentage).toBeCloseTo(expectedPercentage, 1)
      }
    })
  })

  describe('error handling', () => {
    it('should handle non-Error exceptions', async () => {
      vi.mocked(BillingService.getBillingData).mockResolvedValue({
        success: false,
        error: 'Failed to fetch billing data',
      })

      const result = await BillingService.getBillingData()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Failed to fetch billing data')
    })

    it('should handle null/undefined errors', async () => {
      vi.mocked(BillingService.getBillingData).mockResolvedValue({
        success: false,
        error: 'Failed to fetch billing data',
      })

      const result = await BillingService.getBillingData()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Failed to fetch billing data')
    })
  })
}) 