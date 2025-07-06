import { z } from 'zod'

import { logAction } from './logger.service.js'

// Schemas
export const pricingSchema = z.object({
  planId: z.string(),
  customerId: z.string().optional(),
  quantity: z.number().min(1).default(1),
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
})

// Types
export type PricingRequest = z.infer<typeof pricingSchema>
export type Plan = z.infer<typeof planSchema>

export interface Subscription {
  id: string
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid'
  plan?: Plan
  price?: number
}

export interface UsageResult {
  withinLimits: boolean
  exceeded: string[]
  remaining: Record<string, number>
}

// Plans configuration
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
  },
} as const

export const pricingService = {
  /**
   * Get all available plans
   */
  async getPlans(): Promise<Plan[]> {
    try {
      logAction('pricing_get_plans', 'system', {})
      return Object.values(PLANS) as unknown as Plan[]
    } catch (error) {
      logAction('pricing_get_plans_error', 'system', {
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      throw new ApiError(500, 'Failed to get plans')
    }
  },

  /**
   * Get a specific plan by ID
   */
  async getPlanById(planId: string): Promise<Plan | null> {
    try {
      logAction('pricing_get_plan', 'system', { planId })

      const plan = Object.values(PLANS).find((p) => p.id === planId)
      return (plan as unknown as Plan) || null
    } catch (error) {
      logAction('pricing_get_plan_error', 'system', {
        planId,
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      throw new ApiError(500, 'Failed to get plan')
    }
  },

  /**
   * Create a subscription for a customer
   */
  async createSubscription(data: PricingRequest): Promise<Subscription> {
    try {
      const { planId, customerId, quantity } = data

      // Validate plan exists
      const plan = await this.getPlanById(planId)
      if (!plan) {
        throw new ApiError(404, 'Plan not found')
      }

      // For free plan, return success without Stripe
      if (planId === 'free') {
        logAction('pricing_subscription_created', customerId || 'unknown', {
          planId,
          quantity,
          price: 0,
        })
        return {
          id: 'free_subscription',
          status: 'active',
          plan: plan,
          price: 0,
        }
      }

      // For paid plans, create mock subscription (Stripe integration pending)
      if (!customerId) {
        throw new ApiError(400, 'Customer ID required for paid plans')
      }

      logAction('pricing_subscription_created', customerId, {
        planId,
        quantity,
        subscriptionId: `mock_${planId}_${Date.now()}`,
      })

      return {
        id: `mock_${planId}_${Date.now()}`,
        status: 'active',
        plan: plan,
        price: plan.price * quantity,
      }
    } catch (error) {
      logAction('pricing_subscription_error', data.customerId || 'unknown', {
        planId: data.planId,
        error: (error instanceof Error ? error.message : 'Unknown error'),
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
      const { planId, quantity } = data

      if (planId === 'free') {
        logAction('pricing_subscription_updated', 'unknown', {
          subscriptionId,
          planId,
          quantity,
        })
        return {
          id: subscriptionId,
          status: 'active',
          plan: PLANS.FREE as unknown as Plan,
        }
      }

      // Mock update (Stripe integration pending)
      logAction('pricing_subscription_updated', 'unknown', {
        subscriptionId,
        planId,
        quantity,
      })

      return {
        id: subscriptionId,
        status: 'active',
        plan: planId ? (await this.getPlanById(planId)) || undefined : undefined,
      }
    } catch (error) {
      logAction('pricing_subscription_update_error', 'unknown', {
        subscriptionId,
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      throw error
    }
  },

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<Subscription> {
    try {
      if (
        subscriptionId === 'free_subscription' ||
        subscriptionId.startsWith('mock_')
      ) {
        logAction('pricing_subscription_cancelled', 'unknown', {
          subscriptionId,
        })
        return {
          id: subscriptionId,
          status: 'cancelled',
        }
      }

      // Mock cancel (Stripe integration pending)
      logAction('pricing_subscription_cancelled', 'unknown', {
        subscriptionId,
      })

      return {
        id: subscriptionId,
        status: 'cancelled',
      }
    } catch (error) {
      logAction('pricing_subscription_cancel_error', 'unknown', {
        subscriptionId,
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      throw error
    }
  },

  /**
   * Get subscription details
   */
  async getSubscription(subscriptionId: string): Promise<Subscription> {
    try {
      if (subscriptionId === 'free_subscription') {
        return {
          id: subscriptionId,
          status: 'active',
          plan: PLANS.FREE as unknown as Plan,
        }
      }

      if (subscriptionId.startsWith('mock_')) {
        // Extract plan from mock ID
        const planId = subscriptionId.split('_')[1]
        if (!planId) {
          throw new ApiError(400, 'Invalid subscription ID format')
        }
        const plan = await this.getPlanById(planId)
        return {
          id: subscriptionId,
          status: 'active',
          plan: plan || undefined,
        }
      }

      // Mock get (Stripe integration pending)
      return {
        id: subscriptionId,
        status: 'active',
      }
    } catch (error) {
      logAction('pricing_subscription_get_error', 'unknown', {
        subscriptionId,
        error: (error instanceof Error ? error.message : 'Unknown error'),
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
        throw new ApiError(404, 'Plan not found')
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

      return {
        withinLimits: exceeded.length === 0,
        exceeded,
        remaining,
      }
    } catch (error) {
      logAction('pricing_usage_check_error', 'unknown', {
        planId,
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      throw error
    }
  },
}
