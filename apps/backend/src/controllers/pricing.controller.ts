import { logAction } from '../services/logger.service.js'
import { pricingSchema, pricingService } from '../services/pricing.service.js'
import { ApiError } from '../utils/ApiError.js'

export const pricingController = {
  /**
   * Get all available plans
   */
  async getPlans(req, res, next) {
    try {
      const plans = await pricingService.getPlans()

      logAction('pricing_plans_requested', req.user?.id || 'anonymous', {})

      res.status(200).json({
        success: true,
        data: plans,
      })
    } catch (error) {
      logAction('pricing_plans_error', req.user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },

  /**
   * Get a specific plan by ID
   */
  async getPlanById(req, res, next) {
    try {
      const { planId } = req.params
      const plan = await pricingService.getPlanById(planId)

      if (!plan) {
        return res.status(404).json({
          success: false,
          message: 'Plan not found',
        })
      }

      logAction('pricing_plan_requested', req.user?.id || 'anonymous', {
        planId,
      })

      res.status(200).json({
        success: true,
        data: plan,
      })
    } catch (error) {
      logAction('pricing_plan_error', req.user?.id || 'anonymous', {
        planId: req.params.planId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },

  /**
   * Create a subscription
   */
  async createSubscription(req, res, next) {
    try {
      const validatedData = pricingSchema.parse(req.body)
      const subscription =
        await pricingService.createSubscription(validatedData)

      logAction('pricing_subscription_created', req.user?.id || 'anonymous', {
        planId: validatedData.planId,
        customerId: validatedData.customerId,
      })

      res.status(201).json({
        success: true,
        data: subscription,
      })
    } catch (error) {
      // Handle specific ApiError cases
      if (error instanceof Error && 'statusCode' in error) {
        const apiError = error as ApiError
        if (apiError.statusCode === 404) {
          return res.status(404).json({
            success: false,
            message: apiError.message || 'Plan not found',
          })
        }
        if (apiError.statusCode === 400) {
          return res.status(400).json({
            success: false,
            message: apiError.message || 'Bad request',
          })
        }
      }

      logAction(
        'pricing_subscription_create_error',
        req.user?.id || 'anonymous',
        {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      )
      next(error)
    }
  },

  /**
   * Get subscription details
   */
  async getSubscription(req, res, next) {
    try {
      const { subscriptionId } = req.params
      const subscription = await pricingService.getSubscription(subscriptionId)

      logAction('pricing_subscription_requested', req.user?.id || 'anonymous', {
        subscriptionId,
      })

      res.status(200).json({
        success: true,
        data: subscription,
      })
    } catch (error) {
      logAction('pricing_subscription_get_error', req.user?.id || 'anonymous', {
        subscriptionId: req.params.subscriptionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },

  /**
   * Update a subscription
   */
  async updateSubscription(req, res, next) {
    try {
      const { subscriptionId } = req.params
      const validatedData = pricingSchema.partial().parse(req.body)

      const subscription = await pricingService.updateSubscription(
        subscriptionId,
        validatedData,
      )

      logAction('pricing_subscription_updated', req.user?.id || 'anonymous', {
        subscriptionId,
        planId: validatedData.planId,
      })

      res.status(200).json({
        success: true,
        data: subscription,
      })
    } catch (error) {
      logAction(
        'pricing_subscription_update_error',
        req.user?.id || 'anonymous',
        {
          subscriptionId: req.params.subscriptionId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      )
      next(error)
    }
  },

  /**
   * Cancel a subscription
   */
  async cancelSubscription(req, res, next) {
    try {
      const { subscriptionId } = req.params
      const subscription =
        await pricingService.cancelSubscription(subscriptionId)

      logAction('pricing_subscription_cancelled', req.user?.id || 'anonymous', {
        subscriptionId,
      })

      res.status(200).json({
        success: true,
        data: subscription,
      })
    } catch (error) {
      logAction(
        'pricing_subscription_cancel_error',
        req.user?.id || 'anonymous',
        {
          subscriptionId: req.params.subscriptionId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      )
      next(error)
    }
  },

  /**
   * Check usage against plan limits
   */
  async checkUsage(req, res, next) {
    try {
      const { planId } = req.params
      const { users, storage, apiCalls } = req.body

      if (!users || !storage || !apiCalls) {
        return res.status(400).json({
          success: false,
          message: 'Usage data (users, storage, apiCalls) is required',
        })
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

      res.status(200).json({
        success: true,
        data: usage,
      })
    } catch (error) {
      logAction('pricing_usage_check_error', req.user?.id || 'anonymous', {
        planId: req.params.planId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },
}
