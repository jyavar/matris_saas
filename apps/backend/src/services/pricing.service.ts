import { z } from 'zod'

import { ApiError } from '../utils/ApiError.js'
import {
  cancelSubscriptionExtended,
  createSubscriptionExtended,
  getCustomerSubscriptionsExtended,
  getSubscriptionExtended,
  updateSubscriptionExtended,
  updateSubscriptionSchema,
} from './billing.service.js'
import { logAction } from './logger.service.js'
import { stripeService } from './stripe.service.js'

// Schemas
export const pricingSchema = z.object({
  planId: z.string().min(1),
  customerId: z.string().min(1),
  quantity: z.number().min(1).default(1),
  metadata: z.record(z.string()).optional(),
})

export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  interval: z.enum(['month', 'year']),
  features: z.array(z.string()),
  limits: z.object({
    users: z.number(),
    storage: z.number(),
    apiCalls: z.number(),
  }),
  stripePriceId: z.string().optional(),
})

export const subscriptionSchema = z.object({
  id: z.string(),
  status: z.enum(['active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid']),
  plan: planSchema.optional(),
  price: z.number().optional(),
  customerId: z.string(),
  currentPeriodStart: z.string(),
  currentPeriodEnd: z.string(),
  cancelAtPeriodEnd: z.boolean(),
  quantity: z.number(),
  metadata: z.record(z.string()).optional(),
})

export type Plan = z.infer<typeof planSchema>
export type PricingRequest = z.infer<typeof pricingSchema>
export type Subscription = z.infer<typeof subscriptionSchema>

export type UsageResult = {
  withinLimits: boolean
  exceeded: string[]
  remaining: Record<string, number>
}

// Plans configuration with Stripe price IDs
export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month' as const,
    features: [
      'Up to 3 users',
      '1GB storage',
      '1,000 API calls/month',
      'Basic support',
    ],
    limits: {
      users: 3,
      storage: 1024, // MB
      apiCalls: 1000,
    },
    stripePriceId: undefined, // Free plan doesn't need Stripe
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month' as const,
    features: [
      'Up to 25 users',
      '10GB storage',
      '50,000 API calls/month',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
    ],
    limits: {
      users: 25,
      storage: 10240, // MB
      apiCalls: 50000,
    },
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_monthly',
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'month' as const,
    features: [
      'Unlimited users',
      'Unlimited storage',
      'Unlimited API calls',
      '24/7 support',
      'Advanced analytics',
      'Custom integrations',
      'SLA guarantee',
      'Dedicated account manager',
    ],
    limits: {
      users: -1, // Unlimited
      storage: -1, // Unlimited
      apiCalls: -1, // Unlimited
    },
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise_monthly',
  },
} as const

export const pricingService = {
  /**
   * Get all available plans
   */
  async getPlans(): Promise<Plan[]> {
    try {
      logAction('pricing_get_plans', 'system', {})
      return Object.values(PLANS).map(plan => ({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        interval: plan.interval,
        features: [...plan.features],
        limits: { ...plan.limits },
        stripePriceId: plan.stripePriceId,
      })) as Plan[]
    } catch (error) {
      logAction('pricing_get_plans_error', 'system', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to get plans', 500)
    }
  },

  /**
   * Get a specific plan by ID
   */
  async getPlanById(planId: string): Promise<Plan | null> {
    try {
      const plans = await this.getPlans()
      const plan = plans.find((p) => p.id === planId)
      
      if (!plan) {
        logAction('pricing_plan_not_found', 'system', { planId })
        return null
      }

      logAction('pricing_plan_retrieved', 'system', { planId })
      return plan
    } catch (error) {
      logAction('pricing_plan_get_error', 'system', {
        planId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to get plan', 500)
    }
  },

  /**
   * Create a subscription for a customer
   */
  async createSubscription(data: PricingRequest): Promise<Subscription> {
    try {
      const { planId, customerId, quantity, metadata } = data

      // Validate plan exists
      const plan = await this.getPlanById(planId)
      if (!plan) {
        throw new ApiError('Plan not found', 404)
      }

      // For free plan, create local subscription without Stripe
      if (planId === 'free') {
        const subscription: Subscription = {
          id: `free_sub_${customerId}_${Date.now()}`,
          status: 'active',
          plan,
          price: 0,
          customerId,
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          cancelAtPeriodEnd: false,
          quantity,
          metadata,
        }

        logAction('pricing_subscription_created', customerId, {
          planId,
          quantity,
          price: 0,
          subscriptionId: subscription.id,
        })

        return subscription
      }

      // For paid plans, create Stripe subscription
      if (!plan.stripePriceId) {
        throw new ApiError('Plan not configured for payments', 400)
      }

      // Create subscription in Stripe
      const stripeSubscription = await stripeService.createSubscription({
        customerId,
        priceId: plan.stripePriceId,
        quantity,
        metadata,
      })

      // Create subscription in billing service
      const billingSubscription = await createSubscriptionExtended({
        customerId,
        priceId: plan.stripePriceId,
        quantity,
        metadata,
      })

      const subscription: Subscription = {
        id: billingSubscription.id,
        status: billingSubscription.status,
        plan,
        price: plan.price * quantity,
        customerId: billingSubscription.customerId,
        currentPeriodStart: billingSubscription.currentPeriodStart,
        currentPeriodEnd: billingSubscription.currentPeriodEnd,
        cancelAtPeriodEnd: billingSubscription.cancelAtPeriodEnd,
        quantity: billingSubscription.quantity,
        metadata: billingSubscription.metadata,
      }

      logAction('pricing_subscription_created', customerId, {
        planId,
        quantity,
        price: subscription.price,
        subscriptionId: subscription.id,
        stripeSubscriptionId: stripeSubscription.id,
      })

      return subscription
    } catch (error) {
      logAction('pricing_subscription_error', data.customerId, {
        planId: data.planId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Update a subscription
   */
  async updateSubscription(
    subscriptionId: string,
    data: Partial<PricingRequest>,
  ): Promise<Subscription> {
    try {
      const { planId, quantity, metadata } = data

      // Get current subscription
      const currentSubscription = await getSubscriptionExtended(subscriptionId)
      if (!currentSubscription) {
        throw new ApiError('Subscription not found', 404)
      }

      // For free plan updates
      if (planId === 'free') {
        const plan = await this.getPlanById('free')
        if (!plan) {
          throw new ApiError('Free plan not found', 404)
        }

        const updatedSubscription: Subscription = {
          id: subscriptionId,
          status: 'active',
          plan,
          price: 0,
          customerId: currentSubscription.customerId,
          currentPeriodStart: currentSubscription.currentPeriodStart,
          currentPeriodEnd: currentSubscription.currentPeriodEnd,
          cancelAtPeriodEnd: currentSubscription.cancelAtPeriodEnd,
          quantity: quantity || currentSubscription.quantity,
          metadata: metadata || currentSubscription.metadata,
        }

        logAction('pricing_subscription_updated', currentSubscription.customerId, {
          subscriptionId,
          planId: 'free',
          quantity: updatedSubscription.quantity,
        })

        return updatedSubscription
      }

      // For paid plan updates
      if (planId && planId !== 'free') {
        const plan = await this.getPlanById(planId)
        if (!plan) {
          throw new ApiError('Plan not found', 404)
        }

        if (!plan.stripePriceId) {
          throw new ApiError('Plan not configured for payments', 400)
        }

        // Update in Stripe and billing service
        const updateData: z.infer<typeof updateSubscriptionSchema> = {}
        if (quantity !== undefined) updateData.quantity = quantity
        if (metadata !== undefined) updateData.metadata = metadata

        const updatedBillingSubscription = await updateSubscriptionExtended(subscriptionId, updateData)

        const subscription: Subscription = {
          id: updatedBillingSubscription.id,
          status: updatedBillingSubscription.status,
          plan,
          price: plan.price * updatedBillingSubscription.quantity,
          customerId: updatedBillingSubscription.customerId,
          currentPeriodStart: updatedBillingSubscription.currentPeriodStart,
          currentPeriodEnd: updatedBillingSubscription.currentPeriodEnd,
          cancelAtPeriodEnd: updatedBillingSubscription.cancelAtPeriodEnd,
          quantity: updatedBillingSubscription.quantity,
          metadata: updatedBillingSubscription.metadata,
        }

        logAction('pricing_subscription_updated', currentSubscription.customerId, {
          subscriptionId,
          planId,
          quantity: subscription.quantity,
        })

        return subscription
      }

      // Update without changing plan
      const updateData: z.infer<typeof updateSubscriptionSchema> = {}
      if (quantity !== undefined) updateData.quantity = quantity
      if (metadata !== undefined) updateData.metadata = metadata

      const updatedBillingSubscription = await updateSubscriptionExtended(subscriptionId, updateData)

      const subscription: Subscription = {
        id: updatedBillingSubscription.id,
        status: updatedBillingSubscription.status,
        plan: await this.getPlanById(currentSubscription.priceId) || undefined,
        price: updatedBillingSubscription.quantity * (await this.getPlanById(currentSubscription.priceId) || { price: 0 }).price,
        customerId: updatedBillingSubscription.customerId,
        currentPeriodStart: updatedBillingSubscription.currentPeriodStart,
        currentPeriodEnd: updatedBillingSubscription.currentPeriodEnd,
        cancelAtPeriodEnd: updatedBillingSubscription.cancelAtPeriodEnd,
        quantity: updatedBillingSubscription.quantity,
        metadata: updatedBillingSubscription.metadata,
      }

      logAction('pricing_subscription_updated', currentSubscription.customerId, {
        subscriptionId,
        quantity: subscription.quantity,
      })

      return subscription
    } catch (error) {
      logAction('pricing_subscription_update_error', 'unknown', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get subscription details
   */
  async getSubscription(subscriptionId: string): Promise<Subscription | null> {
    try {
      // Check if it's a free subscription
      if (subscriptionId.startsWith('free_sub_')) {
        const parts = subscriptionId.split('_')
        const customerId = parts[2]
        const plan = await this.getPlanById('free')
        
        if (!plan) {
          return null
        }

        return {
          id: subscriptionId,
          status: 'active',
          plan,
          price: 0,
          customerId,
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancelAtPeriodEnd: false,
          quantity: 1,
        }
      }

      // Get from billing service
      const billingSubscription = await getSubscriptionExtended(subscriptionId)
      if (!billingSubscription) {
        return null
      }

      const plan = await this.getPlanById(billingSubscription.priceId)
      
      const subscription: Subscription = {
        id: billingSubscription.id,
        status: billingSubscription.status,
        plan: plan || undefined,
        price: plan ? plan.price * billingSubscription.quantity : 0,
        customerId: billingSubscription.customerId,
        currentPeriodStart: billingSubscription.currentPeriodStart,
        currentPeriodEnd: billingSubscription.currentPeriodEnd,
        cancelAtPeriodEnd: billingSubscription.cancelAtPeriodEnd,
        quantity: billingSubscription.quantity,
        metadata: billingSubscription.metadata,
      }

      logAction('pricing_subscription_retrieved', billingSubscription.customerId, {
        subscriptionId,
      })

      return subscription
    } catch (error) {
      logAction('pricing_subscription_get_error', 'unknown', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      // Check if it's a free subscription
      if (subscriptionId.startsWith('free_sub_')) {
        logAction('pricing_subscription_canceled', 'unknown', {
          subscriptionId,
          planType: 'free',
        })
        return
      }

      // Cancel in billing service (which handles Stripe)
      await cancelSubscriptionExtended(subscriptionId)

      logAction('pricing_subscription_canceled', 'unknown', {
        subscriptionId,
        planType: 'paid',
      })
    } catch (error) {
      logAction('pricing_subscription_cancel_error', 'unknown', {
        subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Calculate usage and check limits
   */
  async checkUsage(
    planId: string,
    usage: {
      users: number
      storage: number
      apiCalls: number
    },
  ): Promise<UsageResult> {
    try {
      const plan = await this.getPlanById(planId)
      if (!plan) {
        throw new ApiError('Plan not found', 404)
      }

      const exceeded: string[] = []
      const remaining: Record<string, number> = {}

      // Check users
      if (plan.limits.users !== -1 && usage.users > plan.limits.users) {
        exceeded.push('users')
      } else {
        remaining.users =
          plan.limits.users === -1 ? -1 : plan.limits.users - usage.users
      }

      // Check storage
      if (plan.limits.storage !== -1 && usage.storage > plan.limits.storage) {
        exceeded.push('storage')
      } else {
        remaining.storage =
          plan.limits.storage === -1 ? -1 : plan.limits.storage - usage.storage
      }

      // Check API calls
      if (
        plan.limits.apiCalls !== -1 &&
        usage.apiCalls > plan.limits.apiCalls
      ) {
        exceeded.push('apiCalls')
      } else {
        remaining.apiCalls =
          plan.limits.apiCalls === -1
            ? -1
            : plan.limits.apiCalls - usage.apiCalls
      }

      logAction('pricing_usage_checked', 'system', {
        planId,
        usage,
        withinLimits: exceeded.length === 0,
        exceeded,
      })

      return {
        withinLimits: exceeded.length === 0,
        exceeded,
        remaining,
      }
    } catch (error) {
      logAction('pricing_usage_check_error', 'unknown', {
        planId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get customer subscriptions
   */
  async getCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    try {
      const billingSubscriptions = await getCustomerSubscriptionsExtended(customerId)
      
      const subscriptions: Subscription[] = []

      for (const billingSub of billingSubscriptions) {
        const plan = await this.getPlanById(billingSub.priceId)
        
        subscriptions.push({
          id: billingSub.id,
          status: billingSub.status,
          plan: plan || undefined,
          price: plan ? plan.price * billingSub.quantity : 0,
          customerId: billingSub.customerId,
          currentPeriodStart: billingSub.currentPeriodStart,
          currentPeriodEnd: billingSub.currentPeriodEnd,
          cancelAtPeriodEnd: billingSub.cancelAtPeriodEnd,
          quantity: billingSub.quantity,
          metadata: billingSub.metadata,
        })
      }

      logAction('pricing_customer_subscriptions_retrieved', customerId, {
        count: subscriptions.length,
      })

      return subscriptions
    } catch (error) {
      logAction('pricing_customer_subscriptions_error', customerId, {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw new ApiError('Failed to get customer subscriptions', 500)
    }
  },
}
