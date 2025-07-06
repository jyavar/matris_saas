import { IncomingMessage, ServerResponse } from 'http'

import { logAction } from '../services/logger.service.js'
import { pricingSchema, pricingService } from '../services/pricing.service.js'
import type { AuthenticatedUser } from '../types/express/index.js'
import { parseBody, parseParams } from '../utils/request.helper.js'

export const pricingController = {
  /**
   * Get all available plans
   */
  async getPlans(req: IncomingMessage & { user?: AuthenticatedUser }, res: ServerResponse) {
    try {
      const plans = await pricingService.getPlans()

      logAction('pricing_plans_requested', req.user?.id || 'anonymous', {})

      sendSuccess(res, plans)
    } catch (error) {
      logAction('pricing_plans_error', req.user?.id || 'anonymous', {
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      sendError(res, 'Failed to get plans', 500)
    }
  },

  /**
   * Get a specific plan by ID
   */
  async getPlanById(req: IncomingMessage & { user?: AuthenticatedUser }, res: ServerResponse) {
    try {
      const params = parseParams(req.url || '', '/api/pricing/plans/:planId')
      const planId = params.planId
      
      if (!planId) {
        return sendError(res, 'Plan ID is required', 400)
      }
      
      const plan = await pricingService.getPlanById(planId)

      if (!plan) {
        return sendNotFound(res, 'Plan not found')
      }

      logAction('pricing_plan_requested', req.user?.id || 'anonymous', {
        planId,
      })

      sendSuccess(res, plan)
    } catch (error) {
      logAction('pricing_plan_error', req.user?.id || 'anonymous', {
        planId: req.url?.split('/').pop(),
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      sendError(res, 'Failed to get plan', 500)
    }
  },

  /**
   * Create a subscription
   */
  async createSubscription(req: IncomingMessage & { user?: AuthenticatedUser }, res: ServerResponse) {
    try {
      const body = await parseBody(req)
      const validatedData = pricingSchema.parse(body)
      const subscription = await pricingService.createSubscription(validatedData)

      logAction('pricing_subscription_created', req.user?.id || 'anonymous', {
        planId: validatedData.planId,
        customerId: validatedData.customerId,
      })

      sendCreated(res, subscription)
    } catch (error) {
      // Handle specific ApiError cases
      if (error instanceof Error && 'statusCode' in error) {
        const apiError = error as ApiError
        if (apiError.statusCode === 404) {
          return sendNotFound(res, apiError.message || 'Plan not found')
        }
        if (apiError.statusCode === 400) {
          return sendError(res, apiError.message || 'Bad request', 400)
        }
      }

      logAction('pricing_subscription_create_error', req.user?.id || 'anonymous', {
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      sendError(res, 'Failed to create subscription', 500)
    }
  },

  /**
   * Get subscription details
   */
  async getSubscription(req: IncomingMessage & { user?: AuthenticatedUser }, res: ServerResponse) {
    try {
      const params = parseParams(req.url || '', '/api/pricing/subscriptions/:subscriptionId')
      const subscriptionId = params.subscriptionId
      
      if (!subscriptionId) {
        return sendError(res, 'Subscription ID is required', 400)
      }
      
      const subscription = await pricingService.getSubscription(subscriptionId)

      logAction('pricing_subscription_requested', req.user?.id || 'anonymous', {
        subscriptionId,
      })

      sendSuccess(res, subscription)
    } catch (error) {
      logAction('pricing_subscription_get_error', req.user?.id || 'anonymous', {
        subscriptionId: req.url?.split('/').pop(),
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      sendError(res, 'Failed to get subscription', 500)
    }
  },

  /**
   * Update a subscription
   */
  async updateSubscription(req: IncomingMessage & { user?: AuthenticatedUser }, res: ServerResponse) {
    try {
      const params = parseParams(req.url || '', '/api/pricing/subscriptions/:subscriptionId')
      const subscriptionId = params.subscriptionId
      const body = await parseBody(req)
      
      if (!subscriptionId) {
        return sendError(res, 'Subscription ID is required', 400)
      }
      
      const validatedData = pricingSchema.partial().parse(body)

      const subscription = await pricingService.updateSubscription(
        subscriptionId,
        validatedData,
      )

      logAction('pricing_subscription_updated', req.user?.id || 'anonymous', {
        subscriptionId,
        planId: validatedData.planId,
      })

      sendSuccess(res, subscription)
    } catch (error) {
      logAction('pricing_subscription_update_error', req.user?.id || 'anonymous', {
        subscriptionId: req.url?.split('/').pop(),
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      sendError(res, 'Failed to update subscription', 500)
    }
  },

  /**
   * Cancel a subscription
   */
  async cancelSubscription(req: IncomingMessage & { user?: AuthenticatedUser }, res: ServerResponse) {
    try {
      const params = parseParams(req.url || '', '/api/pricing/subscriptions/:subscriptionId')
      const subscriptionId = params.subscriptionId
      
      if (!subscriptionId) {
        return sendError(res, 'Subscription ID is required', 400)
      }
      
      const subscription = await pricingService.cancelSubscription(subscriptionId)

      logAction('pricing_subscription_cancelled', req.user?.id || 'anonymous', {
        subscriptionId,
      })

      sendSuccess(res, subscription)
    } catch (error) {
      logAction('pricing_subscription_cancel_error', req.user?.id || 'anonymous', {
        subscriptionId: req.url?.split('/').pop(),
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      sendError(res, 'Failed to cancel subscription', 500)
    }
  },

  /**
   * Check usage against plan limits
   */
  async checkUsage(req: IncomingMessage & { user?: AuthenticatedUser }, res: ServerResponse) {
    try {
      const params = parseParams(req.url || '', '/api/pricing/plans/:planId/usage')
      const planId = params.planId
      const body = await parseBody(req) as { users?: number; storage?: number; apiCalls?: number }
      
      if (!planId) {
        return sendError(res, 'Plan ID is required', 400)
      }

      const { users, storage, apiCalls } = body

      if (!users || !storage || !apiCalls) {
        return sendError(res, 'Usage data (users, storage, apiCalls) is required', 400)
      }

      const usage = await pricingService.checkUsage(planId, {
        users: Number(users),
        storage: Number(storage),
        apiCalls: Number(apiCalls),
      })

      logAction('pricing_usage_checked', req.user?.id || 'anonymous', {
        planId,
        usage: { users, storage, apiCalls },
      })

      sendSuccess(res, usage)
    } catch (error) {
      logAction('pricing_usage_check_error', req.user?.id || 'anonymous', {
        planId: req.url?.split('/').pop(),
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      sendError(res, 'Failed to check usage', 500)
    }
  },
}