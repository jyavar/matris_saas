// Billing service for frontend
import { supabase } from '@/lib/supabase'

export interface BillingData {
  currentPlan: string
  monthlySpend: number
  monthlyLimit: number
  nextBillingDate: string
  usagePercentage: number
  invoices: Array<{
    id: string
    amount: number
    status: 'paid' | 'pending' | 'overdue'
    date: string
  }>
}

export interface BillingResponse {
  success: boolean
  data?: BillingData
  error?: string
}

export interface CreateInvoiceRequest {
  amount: number
  description: string
  customerId: string
}

export interface UpdateBillingRequest {
  plan?: string
  paymentMethod?: string
}

export class BillingService {
  static async getBillingData(): Promise<BillingResponse> {
    try {
      // TODO: Integrar con API real de billing
      const mockData: BillingData = {
        currentPlan: 'Pro',
        monthlySpend: 245.50,
        monthlyLimit: 500,
        nextBillingDate: '2024-02-15',
        usagePercentage: 49.1,
        invoices: [
          {
            id: 'INV-001',
            amount: 245.50,
            status: 'paid',
            date: '2024-01-15',
          },
          {
            id: 'INV-002',
            amount: 198.75,
            status: 'pending',
            date: '2024-02-15',
          },
        ],
      }

      return {
        success: true,
        data: mockData,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch billing data',
      }
    }
  }

  static async createInvoice(request: CreateInvoiceRequest): Promise<BillingResponse> {
    try {
      // TODO: Integrar con API real de billing
      const newInvoice = {
        id: `INV-${Date.now()}`,
        amount: request.amount,
        status: 'pending' as const,
        date: new Date().toISOString(),
      }

      return {
        success: true,
        data: {
          currentPlan: 'Pro',
          monthlySpend: 245.50 + request.amount,
          monthlyLimit: 500,
          nextBillingDate: '2024-02-15',
          usagePercentage: 49.1,
          invoices: [newInvoice],
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create invoice',
      }
    }
  }

  static async updateBilling(request: UpdateBillingRequest): Promise<BillingResponse> {
    try {
      // TODO: Integrar con API real de billing
      return {
        success: true,
        data: {
          currentPlan: request.plan || 'Pro',
          monthlySpend: 245.50,
          monthlyLimit: 500,
          nextBillingDate: '2024-02-15',
          usagePercentage: 49.1,
          invoices: [],
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update billing',
      }
    }
  }
} 