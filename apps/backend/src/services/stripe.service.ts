import Stripe from 'stripe'
import { z } from 'zod'

import { ApiError } from '../utils/ApiError.js'
import { logAction } from './logger.service.js'

// Environment validation
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY no está definida en el entorno')
}

// Stripe client initialization
const stripeClient = new Stripe(stripeSecretKey, {
  apiVersion: '2025-06-30.basil',
})

// Schemas for validation
export const createCustomerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  metadata: z.record(z.string()).optional(),
})

export const createSubscriptionSchema = z.object({
  customerId: z.string().min(1),
  priceId: z.string().min(1),
  quantity: z.number().min(1).default(1),
  metadata: z.record(z.string()).optional(),
})

export const createPaymentIntentSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default('usd'),
  customerId: z.string().min(1),
  metadata: z.record(z.string()).optional(),
})

// Types
export type CreateCustomerRequest = z.infer<typeof createCustomerSchema>
export type CreateSubscriptionRequest = z.infer<typeof createSubscriptionSchema>
export type CreatePaymentIntentRequest = z.infer<typeof createPaymentIntentSchema>

export interface StripeCustomer {
  id: string
  email: string
  name: string
  created: number
  metadata: Record<string, string>
}

export interface StripeSubscription {
  id: string
  customerId: string
  status: Stripe.Subscription.Status
  currentPeriodStart: number
  currentPeriodEnd: number
  cancelAtPeriodEnd: boolean
  items: Array<{
    id: string
    priceId: string
    quantity: number
  }>
}

export interface StripePaymentIntent {
  id: string
  amount: number
  currency: string
  status: Stripe.PaymentIntent.Status
  clientSecret: string
  customerId: string
}

export interface StripeWebhookEvent {
  id: string
  type: string
  data: Record<string, unknown>
  created: number
}

function isStripeSubscriptionSnake(obj: unknown): obj is {
  id: string;
  customer: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  items: { data: Array<{ id: string; price: { id: string }; quantity: number }> };
} {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'customer' in obj &&
    'status' in obj &&
    'current_period_start' in obj &&
    'current_period_end' in obj &&
    'cancel_at_period_end' in obj &&
    'items' in obj
  )
}

function mapStripeSubscription(obj: unknown): StripeSubscription {
  if (isStripeSubscriptionSnake(obj)) {
    return {
      id: obj.id,
      customerId: obj.customer,
      status: obj.status as Stripe.Subscription.Status,
      currentPeriodStart: obj.current_period_start,
      currentPeriodEnd: obj.current_period_end,
      cancelAtPeriodEnd: obj.cancel_at_period_end,
      items: obj.items.data.map(item => ({
        id: item.id,
        priceId: item.price.id,
        quantity: item.quantity || 1,
      })),
    }
  }
  throw new ApiError('Invalid subscription object from Stripe', 500)
}

export const stripeService = {
  /**
   * Create a new customer in Stripe
   */
  async createCustomer(data: CreateCustomerRequest): Promise<StripeCustomer> {
    try {
      logAction('stripe_customer_create_start', 'system', { email: data.email })

      const customer = await stripeClient.customers.create({
        email: data.email,
        name: data.name,
        metadata: data.metadata,
      })

      return {
        id: customer.id,
        email: customer.email || '',
        name: customer.name || '',
        created: customer.created,
        metadata: customer.metadata,
      }
    } catch (error) {
      logAction('stripe_customer_create_error', 'system', {
        email: data.email,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      if (error instanceof Stripe.errors.StripeError) {
        throw new ApiError(`Stripe error: ${error.message}`, 400)
      }
      throw new ApiError('Failed to create customer', 500)
    }
  },

  /**
   * Get customer by ID
   */
  async getCustomer(customerId: string): Promise<StripeCustomer | null> {
    try {
      logAction('stripe_customer_get_start', 'system', { customerId })
      const customer = await stripeClient.customers.retrieve(customerId)
      if ('deleted' in customer && customer.deleted) {
        logAction('stripe_customer_get_deleted', 'system', { customerId })
        return null
      }
      if (!('email' in customer)) {
        logAction('stripe_customer_get_invalid', 'system', { customerId })
        return null
      }
      return {
        id: customer.id,
        email: customer.email || '',
        name: customer.name || '',
        created: customer.created,
        metadata: customer.metadata,
      }
    } catch (error) {
      logAction('stripe_customer_get_error', 'system', {
        customerId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      if (error instanceof Stripe.errors.StripeError) {
        if (error.code === 'resource_missing') {
          return null
        }
        throw new ApiError(`Stripe error: ${error.message}`, 400)
      }
      throw new ApiError('Failed to get customer', 500)
    }
  },

  /**
   * Create a subscription
   */
  async createSubscription(data: CreateSubscriptionRequest): Promise<StripeSubscription> {
    try {
      logAction('stripe_subscription_create_start', 'system', {
        customerId: data.customerId,
        priceId: data.priceId,
      })
      const subscriptionResp = await stripeClient.subscriptions.create({
        customer: data.customerId,
        items: [{ price: data.priceId, quantity: data.quantity }],
        metadata: data.metadata,
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      })
      const subscription = 'data' in subscriptionResp ? subscriptionResp.data : subscriptionResp
      return mapStripeSubscription(subscription)
    } catch (error) {
      logAction('stripe_subscription_create_error', 'system', {
        customerId: data.customerId,
        priceId: data.priceId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      if (error instanceof Stripe.errors.StripeError) {
        throw new ApiError(`Stripe error: ${error.message}`, 400)
      }
      throw new ApiError('Failed to create subscription', 500)
    }
  },

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<StripeSubscription> {
    try {
      logAction('stripe_subscription_cancel_start', 'system', { subscriptionId })
      const subscriptionResp = await stripeClient.subscriptions.cancel(subscriptionId)
      const subscription = 'data' in subscriptionResp ? subscriptionResp.data : subscriptionResp
      return mapStripeSubscription(subscription)
    } catch (error) {
      logAction('stripe_subscription_cancel_error', 'system', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      if (error instanceof Stripe.errors.StripeError) {
        throw new ApiError(`Stripe error: ${error.message}`, 400)
      }
      throw new ApiError('Failed to cancel subscription', 500)
    }
  },

  /**
   * Create a payment intent
   */
  async createPaymentIntent(data: CreatePaymentIntentRequest): Promise<StripePaymentIntent> {
    try {
      logAction('stripe_payment_intent_create_start', 'system', {
        customerId: data.customerId,
        amount: data.amount,
      })
      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: data.amount,
        currency: data.currency,
        customer: data.customerId,
        metadata: data.metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      })
      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret || '',
        customerId: paymentIntent.customer as string,
      }
    } catch (error) {
      logAction('stripe_payment_intent_create_error', 'system', {
        customerId: data.customerId,
        amount: data.amount,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      if (error instanceof Stripe.errors.StripeError) {
        throw new ApiError(`Stripe error: ${error.message}`, 400)
      }
      throw new ApiError('Failed to create payment intent', 500)
    }
  },

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string,
  ): Stripe.Event {
    try {
      return stripeClient.webhooks.constructEvent(payload, signature, secret)
    } catch (error) {
      logAction('stripe_webhook_verification_error', 'system', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Invalid webhook signature', 400)
    }
  },

  /**
   * Get subscription by ID
   */
  async getSubscription(subscriptionId: string): Promise<StripeSubscription | null> {
    try {
      logAction('stripe_subscription_get_start', 'system', { subscriptionId })
      const subscriptionResp = await stripeClient.subscriptions.retrieve(subscriptionId)
      const subscription = 'data' in subscriptionResp ? subscriptionResp.data : subscriptionResp
      try {
        return mapStripeSubscription(subscription)
      } catch {
        logAction('stripe_subscription_get_invalid', 'system', { subscriptionId })
        return null
      }
    } catch (error) {
      logAction('stripe_subscription_get_error', 'system', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      if (error instanceof Stripe.errors.StripeError) {
        if (error.code === 'resource_missing') {
          return null
        }
        throw new ApiError(`Stripe error: ${error.message}`, 400)
      }
      throw new ApiError('Failed to get subscription', 500)
    }
  },
}

export { stripeClient as stripe }
