import { z } from 'zod'

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
  // Métodos IBillingService wrappers
  async createCustomer(userId: string, email: string): Promise<{ customerId: string }> {
    const customer = await createCustomerExtended({ email })
    return { customerId: customer.id }
  },
  async createSubscription(customerId: string, priceId: string): Promise<{ subscriptionId: string }> {
    const subscription = await createSubscriptionExtended({ customerId, priceId, quantity: 1 })
    return { subscriptionId: subscription.id }
  },
  async cancelSubscription(subscriptionId: string): Promise<void> {
    await cancelSubscriptionExtended(subscriptionId)
  },
  async getSubscription(subscriptionId: string): Promise<Record<string, unknown>> {
    const subscription = await getSubscriptionExtended(subscriptionId)
    return subscription || {}
  },
  // ...otros métodos de la interfaz si aplica...
}

// Métodos extendidos para uso avanzado
export async function createCustomerExtended(data: z.infer<typeof createCustomerSchema>): Promise<CustomerDTO> {
  try {
    const { email, name, phone, metadata } = data

    // Create customer in Stripe
    const stripeCustomer = await stripeService.createCustomer({
      email,
      name,
      metadata,
    })

    // Store in local database
    const { CUSTOMERS_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
    const customerData = {
      id: stripeCustomer.id,
      email: stripeCustomer.email,
      name: stripeCustomer.name,
      phone,
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

    const responseData = (await res.json()) as unknown[]
    const customers = responseData.filter(isCustomerDTO)

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
}
export async function createSubscriptionExtended(data: z.infer<typeof createSubscriptionSchema>): Promise<SubscriptionDTO> {
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
    const firstItem = stripeSubscription.items[0]
    // Map status, fallback if "paused"
    let status: SubscriptionDTO['status']
    switch (stripeSubscription.status) {
      case 'active':
      case 'canceled':
      case 'incomplete':
      case 'incomplete_expired':
      case 'past_due':
      case 'trialing':
      case 'unpaid':
        status = stripeSubscription.status
        break
      case 'paused':
        status = 'past_due' // o lanzar error si prefieres
        break
      default:
        status = 'incomplete'
    }
    const subscriptionData: SubscriptionDTO = {
      id: stripeSubscription.id,
      customerId: stripeSubscription.customerId,
      priceId: firstItem?.priceId || priceId,
      status,
      quantity: firstItem?.quantity || quantity,
      currentPeriodStart: new Date(stripeSubscription.currentPeriodStart * 1000).toISOString(),
      currentPeriodEnd: new Date(stripeSubscription.currentPeriodEnd * 1000).toISOString(),
      cancelAtPeriodEnd: stripeSubscription.cancelAtPeriodEnd,
      metadata: metadata,
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

    const responseData = (await res.json()) as unknown[]
    const subscriptions = responseData.filter(isSubscriptionDTO)

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
}
export async function cancelSubscriptionExtended(subscriptionId: string): Promise<void> {
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
}

// Type guard para snake_case Stripe
function isStripeSnake(obj: unknown): obj is {
  current_period_start: number
  current_period_end: number
  cancel_at_period_end: boolean
} {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'current_period_start' in obj &&
    'current_period_end' in obj &&
    'cancel_at_period_end' in obj
  )
}

export async function updateSubscriptionExtended(
  subscriptionId: string,
  data: z.infer<typeof updateSubscriptionSchema>,
): Promise<SubscriptionDTO> {
  try {
    // Update in Stripe
    const stripeSubscription = await stripeService.getSubscription(subscriptionId)
    if (!stripeSubscription) {
      throw new ApiError('Subscription not found', 404)
    }

    // Update subscription in Stripe
    const stripe = new (await import('stripe')).default(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-06-30.basil',
    })

    const updateData: Record<string, unknown> = {}
    if (data.quantity !== undefined) {
      updateData.items = [{ id: stripeSubscription.items[0]?.id, quantity: data.quantity }]
    }
    if (data.metadata !== undefined) {
      updateData.metadata = data.metadata
    }
    if (data.cancelAtPeriodEnd !== undefined) {
      updateData.cancel_at_period_end = data.cancelAtPeriodEnd
    }

    const updatedStripeSubscription = await stripe.subscriptions.update(subscriptionId, updateData)

    // Update in local database
    const { SUBSCRIPTIONS_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
    const updateDataLocal: Partial<SubscriptionDTO> = {}

    if (data.quantity !== undefined) updateDataLocal.quantity = data.quantity
    if (data.metadata !== undefined) updateDataLocal.metadata = data.metadata
    if (data.cancelAtPeriodEnd !== undefined) updateDataLocal.cancelAtPeriodEnd = data.cancelAtPeriodEnd

    const res = await fetch(`${SUBSCRIPTIONS_ENDPOINT}?id=eq.${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(updateDataLocal),
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

    // Map status, fallback if "paused"
    let status: SubscriptionDTO['status']
    switch (updatedStripeSubscription.status) {
      case 'active':
      case 'canceled':
      case 'incomplete':
      case 'incomplete_expired':
      case 'past_due':
      case 'trialing':
      case 'unpaid':
        status = updatedStripeSubscription.status
        break
      case 'paused':
        status = 'past_due'
        break
      default:
        status = 'incomplete'
    }

    // Type guard para snake_case Stripe
    if (!isStripeSnake(updatedStripeSubscription)) {
      throw new ApiError('Stripe subscription object missing expected fields', 500)
    }

    // Return updated subscription from Stripe
    return {
      id: updatedStripeSubscription.id,
      customerId: updatedStripeSubscription.customer as string,
      priceId: updatedStripeSubscription.items.data[0]?.price.id || '',
      status,
      quantity: updatedStripeSubscription.items.data[0]?.quantity || 1,
      currentPeriodStart: new Date(updatedStripeSubscription.current_period_start * 1000).toISOString(),
      currentPeriodEnd: new Date(updatedStripeSubscription.current_period_end * 1000).toISOString(),
      cancelAtPeriodEnd: updatedStripeSubscription.cancel_at_period_end,
      metadata: updatedStripeSubscription.metadata,
      createdAt: new Date(updatedStripeSubscription.created * 1000).toISOString(),
    }
  } catch (error) {
    logAction('billing_subscription_update_error', 'unknown', {
      subscriptionId,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    throw new ApiError('Failed to update subscription', 500)
  }
}

export async function createInvoiceExtended(data: {
  customer_id?: string
  amount: number
  currency: string
  description?: string
  due_date?: string
}): Promise<InvoiceDTO> {
  try {
    const { customer_id, amount, currency, description, due_date } = data

    // Generate local invoice ID (since Stripe doesn't have createInvoice)
    const invoiceId = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store in local database
    const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
    const invoiceData: InvoiceDTO = {
      id: invoiceId,
      customerId: customer_id || '',
      amount,
      currency,
      description,
      dueDate: due_date,
      status: 'pending',
      createdAt: new Date().toISOString(),
      stripeInvoiceId: undefined, // No Stripe invoice for now
    }

    const res = await fetch(INVOICES_ENDPOINT, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(invoiceData),
    })

    if (!res.ok) {
      logAction('billing_invoice_local_storage_failed', 'unknown', {
        invoiceId,
        error: await res.text(),
      })
      return invoiceData
    }

    const responseData = (await res.json()) as unknown[]
    const invoices = responseData.filter(isInvoiceDTO)

    logAction('billing_invoice_created', 'unknown', {
      invoiceId,
      amount,
      customerId: customer_id,
    })

    return invoices[0] || invoiceData
  } catch (error) {
    logAction('billing_invoice_create_error', 'unknown', {
      amount: data.amount,
      customerId: data.customer_id,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    throw new ApiError('Failed to create invoice', 500)
  }
}

export async function getInvoiceByIdExtended(invoiceId: string): Promise<InvoiceDTO | null> {
  const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
  const url = new URL(`${INVOICES_ENDPOINT}/${invoiceId}`)
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  if (!res.ok) throw new ApiError(await res.text(), res.status)
  const data = (await res.json()) as unknown[]
  return data.filter(isInvoiceDTO)[0] || null
}

export async function updateInvoiceExtended(invoiceId: string, data: {
  amount?: number
  currency?: string
  description?: string
  status?: 'paid' | 'cancelled' | 'pending'
  due_date?: string
}): Promise<InvoiceDTO | null> {
  const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
  const url = new URL(`${INVOICES_ENDPOINT}/${invoiceId}`)
  const res = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new ApiError(await res.text(), res.status)
  const responseData = (await res.json()) as unknown[]
  return responseData.filter(isInvoiceDTO)[0] || null
}

export async function deleteInvoiceExtended(invoiceId: string): Promise<boolean> {
  const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
  const url = new URL(`${INVOICES_ENDPOINT}/${invoiceId}`)
  const res = await fetch(url.toString(), {
    method: 'DELETE',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  return res.ok
}

export async function getAllInvoicesExtended(userId?: string): Promise<InvoiceDTO[]> {
  const params: Record<string, string> = {}
  if (userId) {
    params.customerId = userId
  }
  return fetchInvoices(params)
}

export async function getCustomerByIdExtended(customerId: string): Promise<CustomerDTO | null> {
  const { CUSTOMERS_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
  const url = new URL(`${CUSTOMERS_ENDPOINT}/${customerId}`)
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  if (!res.ok) throw new ApiError(await res.text(), res.status)
  const data = (await res.json()) as unknown[]
  return data.filter(isCustomerDTO)[0] || null
}

export async function getCustomerSubscriptionsExtended(customerId: string): Promise<SubscriptionDTO[]> {
  return fetchSubscriptions({ customerId })
}

export async function getSubscriptionExtended(subscriptionId: string): Promise<SubscriptionDTO | null> {
  const { SUBSCRIPTIONS_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
  const url = new URL(`${SUBSCRIPTIONS_ENDPOINT}/${subscriptionId}`)
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  if (!res.ok) throw new ApiError(await res.text(), res.status)
  const data = (await res.json()) as unknown[]
  return data.filter(isSubscriptionDTO)[0] || null
}
