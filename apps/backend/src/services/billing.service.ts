import { z } from 'zod'

import type { TablesInsert, TablesUpdate } from '../types/supabase.types.js'
import { ApiError } from '../utils/ApiError.js'
import { logAction } from './logger.service.js'
import { stripeService } from './stripe.service.js'

// Schemas
export const createCustomerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  metadata: z.record(z.string()).optional(),
})

export const createSubscriptionSchema = z.object({
  customerId: z.string().min(1),
  priceId: z.string().min(1),
  quantity: z.number().min(1).default(1),
  metadata: z.record(z.string()).optional(),
})

export const updateSubscriptionSchema = z.object({
  quantity: z.number().min(1).optional(),
  metadata: z.record(z.string()).optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
})

export type InvoiceDTO = {
  id: string
  customerId: string
  amount: number
  currency: string
  description?: string | null
  dueDate?: string | null
  status: 'pending' | 'paid' | 'cancelled'
  createdAt: string
  stripeInvoiceId?: string
}

export type CustomerDTO = {
  id: string
  email: string
  name?: string
  phone?: string
  metadata?: Record<string, string>
  createdAt: string
}

export type SubscriptionDTO = {
  id: string
  customerId: string
  priceId: string
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid'
  quantity: number
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  metadata?: Record<string, string>
  createdAt: string
}

function getSupabaseVars() {
  const SUPABASE_URL = process.env.SUPABASE_URL || ''
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || ''
  const INVOICES_ENDPOINT = `${SUPABASE_URL}/rest/v1/invoices`
  const CUSTOMERS_ENDPOINT = `${SUPABASE_URL}/rest/v1/customers`
  const SUBSCRIPTIONS_ENDPOINT = `${SUPABASE_URL}/rest/v1/subscriptions`
  return { 
    SUPABASE_URL, 
    SUPABASE_KEY, 
    INVOICES_ENDPOINT,
    CUSTOMERS_ENDPOINT,
    SUBSCRIPTIONS_ENDPOINT
  }
}

function isInvoiceDTO(obj: unknown): obj is InvoiceDTO {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'customerId' in obj &&
    'amount' in obj &&
    'currency' in obj &&
    'status' in obj &&
    'createdAt' in obj
  )
}

function isCustomerDTO(obj: unknown): obj is CustomerDTO {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    'createdAt' in obj
  )
}

function isSubscriptionDTO(obj: unknown): obj is SubscriptionDTO {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'customerId' in obj &&
    'priceId' in obj &&
    'status' in obj &&
    'quantity' in obj &&
    'currentPeriodStart' in obj &&
    'currentPeriodEnd' in obj &&
    'cancelAtPeriodEnd' in obj &&
    'createdAt' in obj
  )
}

async function fetchInvoices(
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<InvoiceDTO[]> {
  const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
  const url = new URL(INVOICES_ENDPOINT)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value))
  })
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  if (!res.ok) throw new ApiError(await res.text(), res.status)
  const data = (await res.json()) as unknown[]
  return data.filter(isInvoiceDTO)
}

async function fetchCustomers(
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<CustomerDTO[]> {
  const { CUSTOMERS_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
  const url = new URL(CUSTOMERS_ENDPOINT)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value))
  })
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  if (!res.ok) throw new ApiError(await res.text(), res.status)
  const data = (await res.json()) as unknown[]
  return data.filter(isCustomerDTO)
}

async function fetchSubscriptions(
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<SubscriptionDTO[]> {
  const { SUBSCRIPTIONS_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
  const url = new URL(SUBSCRIPTIONS_ENDPOINT)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value))
  })
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  if (!res.ok) throw new ApiError(await res.text(), res.status)
  const data = (await res.json()) as unknown[]
  return data.filter(isSubscriptionDTO)
}

export const billingService = {
  /**
   * Get all invoices for a customer
   */
  async getAllInvoices(customerId: string): Promise<InvoiceDTO[]> {
    try {
      logAction('billing_invoices_retrieved', customerId, { customerId })
      return fetchInvoices({ customerId })
    } catch (error) {
      logAction('billing_invoices_error', customerId, {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to retrieve invoices', 500)
    }
  },

  /**
   * Get invoice by ID
   */
  async getInvoiceById(id: string): Promise<InvoiceDTO | null> {
    try {
      const invoices = await fetchInvoices({ id })
      return invoices[0] || null
    } catch (error) {
      logAction('billing_invoice_get_error', 'unknown', {
        invoiceId: id,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to retrieve invoice', 500)
    }
  },

  /**
   * Create invoice
   */
  async createInvoice(invoice: TablesInsert<'invoices'>): Promise<InvoiceDTO | null> {
    try {
      const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
      const res = await fetch(INVOICES_ENDPOINT, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(invoice),
      })
      if (!res.ok) throw new ApiError(await res.text(), res.status)
      const data = (await res.json()) as unknown[]
      const invoices = data.filter(isInvoiceDTO)
      return invoices[0] || null
    } catch (error) {
      logAction('billing_invoice_create_error', 'unknown', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to create invoice', 500)
    }
  },

  /**
   * Update invoice
   */
  async updateInvoice(id: string, invoice: TablesUpdate<'invoices'>): Promise<InvoiceDTO | null> {
    try {
      const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
      const res = await fetch(`${INVOICES_ENDPOINT}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(invoice),
      })
      if (!res.ok) throw new ApiError(await res.text(), res.status)
      const data = (await res.json()) as unknown[]
      const invoices = data.filter(isInvoiceDTO)
      return invoices[0] || null
    } catch (error) {
      logAction('billing_invoice_update_error', 'unknown', {
        invoiceId: id,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to update invoice', 500)
    }
  },

  /**
   * Delete invoice
   */
  async deleteInvoice(id: string): Promise<InvoiceDTO> {
    try {
      const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
      const res = await fetch(`${INVOICES_ENDPOINT}?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: 'return=representation',
        },
      })
      if (!res.ok) throw new ApiError(await res.text(), res.status)
      const data = (await res.json()) as unknown[]
      const invoices = data.filter(isInvoiceDTO)
      if (!invoices.length) throw new ApiError('Invoice not found', 404)
      return invoices[0]
    } catch (error) {
      logAction('billing_invoice_delete_error', 'unknown', {
        invoiceId: id,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Create customer in Stripe and local database
   */
  async createCustomer(data: z.infer<typeof createCustomerSchema>): Promise<CustomerDTO> {
    try {
      const { email, name, phone, metadata } = data

      // Create customer in Stripe
      const stripeCustomer = await stripeService.createCustomer({
        email,
        name,
        phone,
        metadata,
      })

      // Store in local database
      const { CUSTOMERS_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
      const customerData = {
        id: stripeCustomer.id,
        email: stripeCustomer.email,
        name: stripeCustomer.name,
        phone: stripeCustomer.phone,
        metadata: stripeCustomer.metadata,
        createdAt: new Date().toISOString(),
      }

      const res = await fetch(CUSTOMERS_ENDPOINT, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(customerData),
      })

      if (!res.ok) {
        // If local storage fails, still return Stripe customer
        logAction('billing_customer_local_storage_failed', 'unknown', {
          stripeCustomerId: stripeCustomer.id,
          error: await res.text(),
        })
        return customerData
      }

      const data = (await res.json()) as unknown[]
      const customers = data.filter(isCustomerDTO)

      logAction('billing_customer_created', 'unknown', {
        customerId: stripeCustomer.id,
        email,
      })

      return customers[0] || customerData
    } catch (error) {
      logAction('billing_customer_create_error', 'unknown', {
        email: data.email,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to create customer', 500)
    }
  },

  /**
   * Get customer by ID
   */
  async getCustomerById(customerId: string): Promise<CustomerDTO | null> {
    try {
      const customers = await fetchCustomers({ id: customerId })
      return customers[0] || null
    } catch (error) {
      logAction('billing_customer_get_error', 'unknown', {
        customerId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to retrieve customer', 500)
    }
  },

  /**
   * Create subscription using Stripe
   */
  async createSubscription(data: z.infer<typeof createSubscriptionSchema>): Promise<SubscriptionDTO> {
    try {
      const { customerId, priceId, quantity, metadata } = data

      // Create subscription in Stripe
      const stripeSubscription = await stripeService.createSubscription({
        customerId,
        priceId,
        quantity,
        metadata,
      })

      // Store in local database
      const { SUBSCRIPTIONS_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
      const subscriptionData = {
        id: stripeSubscription.id,
        customerId: stripeSubscription.customerId,
        priceId: stripeSubscription.priceId,
        status: stripeSubscription.status,
        quantity: stripeSubscription.quantity,
        currentPeriodStart: new Date(stripeSubscription.currentPeriodStart * 1000).toISOString(),
        currentPeriodEnd: new Date(stripeSubscription.currentPeriodEnd * 1000).toISOString(),
        cancelAtPeriodEnd: stripeSubscription.cancelAtPeriodEnd,
        metadata: stripeSubscription.metadata,
        createdAt: new Date().toISOString(),
      }

      const res = await fetch(SUBSCRIPTIONS_ENDPOINT, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(subscriptionData),
      })

      if (!res.ok) {
        // If local storage fails, still return Stripe subscription
        logAction('billing_subscription_local_storage_failed', 'unknown', {
          stripeSubscriptionId: stripeSubscription.id,
          error: await res.text(),
        })
        return subscriptionData
      }

      const data = (await res.json()) as unknown[]
      const subscriptions = data.filter(isSubscriptionDTO)

      logAction('billing_subscription_created', 'unknown', {
        subscriptionId: stripeSubscription.id,
        customerId,
        priceId,
      })

      return subscriptions[0] || subscriptionData
    } catch (error) {
      logAction('billing_subscription_create_error', 'unknown', {
        customerId: data.customerId,
        priceId: data.priceId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to create subscription', 500)
    }
  },

  /**
   * Get subscription by ID
   */
  async getSubscription(subscriptionId: string): Promise<SubscriptionDTO | null> {
    try {
      // First try local database
      const localSubscriptions = await fetchSubscriptions({ id: subscriptionId })
      if (localSubscriptions.length > 0) {
        return localSubscriptions[0]
      }

      // Fallback to Stripe
      const stripeSubscription = await stripeService.getSubscription(subscriptionId)
      if (!stripeSubscription) {
        return null
      }

      // Convert to local format
      return {
        id: stripeSubscription.id,
        customerId: stripeSubscription.customerId,
        priceId: stripeSubscription.priceId,
        status: stripeSubscription.status,
        quantity: stripeSubscription.quantity,
        currentPeriodStart: new Date(stripeSubscription.currentPeriodStart * 1000).toISOString(),
        currentPeriodEnd: new Date(stripeSubscription.currentPeriodEnd * 1000).toISOString(),
        cancelAtPeriodEnd: stripeSubscription.cancelAtPeriodEnd,
        metadata: stripeSubscription.metadata,
        createdAt: new Date().toISOString(),
      }
    } catch (error) {
      logAction('billing_subscription_get_error', 'unknown', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to retrieve subscription', 500)
    }
  },

  /**
   * Update subscription
   */
  async updateSubscription(
    subscriptionId: string,
    data: z.infer<typeof updateSubscriptionSchema>,
  ): Promise<SubscriptionDTO> {
    try {
      // Update in Stripe
      const stripeSubscription = await stripeService.updateSubscription(subscriptionId, data)

      // Update in local database
      const { SUBSCRIPTIONS_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
      const updateData: Partial<SubscriptionDTO> = {}

      if (data.quantity !== undefined) updateData.quantity = data.quantity
      if (data.metadata !== undefined) updateData.metadata = data.metadata
      if (data.cancelAtPeriodEnd !== undefined) updateData.cancelAtPeriodEnd = data.cancelAtPeriodEnd

      const res = await fetch(`${SUBSCRIPTIONS_ENDPOINT}?id=eq.${subscriptionId}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(updateData),
      })

      if (!res.ok) {
        logAction('billing_subscription_local_update_failed', 'unknown', {
          subscriptionId,
          error: await res.text(),
        })
      }

      logAction('billing_subscription_updated', 'unknown', {
        subscriptionId,
        changes: Object.keys(data),
      })

      // Return updated subscription from Stripe
      return {
        id: stripeSubscription.id,
        customerId: stripeSubscription.customerId,
        priceId: stripeSubscription.priceId,
        status: stripeSubscription.status,
        quantity: stripeSubscription.quantity,
        currentPeriodStart: new Date(stripeSubscription.currentPeriodStart * 1000).toISOString(),
        currentPeriodEnd: new Date(stripeSubscription.currentPeriodEnd * 1000).toISOString(),
        cancelAtPeriodEnd: stripeSubscription.cancelAtPeriodEnd,
        metadata: stripeSubscription.metadata,
        createdAt: new Date().toISOString(),
      }
    } catch (error) {
      logAction('billing_subscription_update_error', 'unknown', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to update subscription', 500)
    }
  },

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      // Cancel in Stripe
      await stripeService.cancelSubscription(subscriptionId)

      // Update status in local database
      const { SUBSCRIPTIONS_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
      await fetch(`${SUBSCRIPTIONS_ENDPOINT}?id=eq.${subscriptionId}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'canceled' }),
      })

      logAction('billing_subscription_canceled', 'unknown', {
        subscriptionId,
      })
    } catch (error) {
      logAction('billing_subscription_cancel_error', 'unknown', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to cancel subscription', 500)
    }
  },

  /**
   * Get all subscriptions for a customer
   */
  async getCustomerSubscriptions(customerId: string): Promise<SubscriptionDTO[]> {
    try {
      return fetchSubscriptions({ customerId })
    } catch (error) {
      logAction('billing_customer_subscriptions_error', 'unknown', {
        customerId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to retrieve customer subscriptions', 500)
    }
  },
}
