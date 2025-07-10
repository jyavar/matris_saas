// Billing service for frontend
import { getSessionToken } from '@/lib/supabase' // Asume helper para obtener JWT

export interface Invoice {
  id: string
  amount: number
  currency: string
  description?: string
  customer_id: string
  due_date?: string
  status: 'paid' | 'cancelled' | 'pending'
  created_at: string
  updated_at: string
}

export interface BillingData {
  invoices: Invoice[]
  pagination?: {
    page: number
    limit: number
    total: number
  }
}

export interface BillingResponse {
  success: boolean
  data?: BillingData
  error?: string
}

export interface CreateInvoiceRequest {
  amount: number
  currency: string
  description?: string
  customer_id?: string
  due_date?: string
}

export interface UpdateInvoiceRequest {
  amount?: number
  currency?: string
  description?: string
  status?: 'paid' | 'cancelled' | 'pending'
  due_date?: string
}

export class BillingService {
  static async getBillingData(): Promise<BillingResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch('/api/invoices', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        return { success: false, error: `Error ${res.status}: ${res.statusText}` }
      }
      const json = await res.json()
      return {
        success: true,
        data: {
          invoices: json.data,
          pagination: json.pagination,
        },
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
      const token = await getSessionToken()
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      })
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null)
        return { success: false, error: errorJson?.error || `Error ${res.status}` }
      }
      const invoice = await res.json()
      return {
        success: true,
        data: {
          invoices: [invoice],
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create invoice',
      }
    }
  }

  static async updateInvoice(id: string, request: UpdateInvoiceRequest): Promise<BillingResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`/api/invoices/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      })
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null)
        return { success: false, error: errorJson?.error || `Error ${res.status}` }
      }
      const invoice = await res.json()
      return {
        success: true,
        data: {
          invoices: [invoice],
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update invoice',
      }
    }
  }

  static async deleteInvoice(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`/api/invoices/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null)
        return { success: false, error: errorJson?.error || `Error ${res.status}` }
      }
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete invoice',
      }
    }
  }
} 