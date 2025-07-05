import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { logAction } from '../services/logger.service'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.d'

// Schemas de validación
const planSchema = z.object({
  name: z.string().min(1, 'Plan name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be non-negative'),
  currency: z.string().default('USD'),
  interval: z.enum(['monthly', 'yearly', 'one-time']),
  features: z.array(z.string()).optional(),
  limits: z.record(z.any()).optional(),
  is_active: z.boolean().default(true),
})

export const pricingController = {
  /**
   * Get all pricing plans
   */
  async getPlans(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      // Mock pricing plans data
      const plans = [
        {
          id: 'plan-free',
          name: 'Free',
          description: 'Basic plan for individual users',
          price: 0,
          currency: 'USD',
          interval: 'monthly',
          features: [
            'Up to 100 API calls per month',
            'Basic analytics',
            'Email support',
          ],
          limits: {
            api_calls: 100,
            storage: '1GB',
            users: 1,
          },
          is_active: true,
          created_at: new Date().toISOString(),
        },
        {
          id: 'plan-pro',
          name: 'Pro',
          description: 'Professional plan for growing businesses',
          price: 29,
          currency: 'USD',
          interval: 'monthly',
          features: [
            'Up to 10,000 API calls per month',
            'Advanced analytics',
            'Priority support',
            'Custom integrations',
          ],
          limits: {
            api_calls: 10000,
            storage: '10GB',
            users: 5,
          },
          is_active: true,
          created_at: new Date().toISOString(),
        },
        {
          id: 'plan-enterprise',
          name: 'Enterprise',
          description: 'Enterprise plan for large organizations',
          price: 99,
          currency: 'USD',
          interval: 'monthly',
          features: [
            'Unlimited API calls',
            'Advanced analytics',
            'Dedicated support',
            'Custom integrations',
            'SLA guarantee',
            'On-premise deployment',
          ],
          limits: {
            api_calls: -1, // Unlimited
            storage: '100GB',
            users: -1, // Unlimited
          },
          is_active: true,
          created_at: new Date().toISOString(),
        },
      ]

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: plans,
        count: plans.length,
      }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Failed to get pricing plans',
      }))
    }
  },

  /**
   * Get plan by ID
   */
  async getPlanById(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const planId = params?.id

      if (!planId) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Plan ID is required',
        }))
        return
      }

      // Mock plan data
      const plan = {
        id: planId,
        name: 'Pro',
        description: 'Professional plan for growing businesses',
        price: 29,
        currency: 'USD',
        interval: 'monthly',
        features: [
          'Up to 10,000 API calls per month',
          'Advanced analytics',
          'Priority support',
          'Custom integrations',
        ],
        limits: {
          api_calls: 10000,
          storage: '10GB',
          users: 5,
        },
        is_active: true,
        created_at: new Date().toISOString(),
        stats: {
          subscribers: 1250,
          revenue: 36250,
          churn_rate: 0.02,
        },
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: plan,
      }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Failed to get plan',
      }))
    }
  },

  /**
   * Create a new pricing plan
   */
  async createPlan(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validatedData = planSchema.parse(body)

      logAction('pricing_plan_created', user?.id || 'anonymous', {
        plan_name: validatedData.name,
        plan_price: validatedData.price,
        plan_interval: validatedData.interval,
      })

      const newPlan = {
        id: `plan-${Date.now()}`,
        ...validatedData,
        created_at: new Date().toISOString(),
        created_by: user?.id || 'system',
        stats: {
          subscribers: 0,
          revenue: 0,
          churn_rate: 0,
        },
      }

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: newPlan,
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid plan data',
          details: error.errors,
        }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Failed to create plan',
        }))
      }
    }
  },

  /**
   * Update a pricing plan
   */
  async updatePlan(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const planId = params?.id
      const validatedData = planSchema.partial().parse(body)

      if (!planId) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Plan ID is required',
        }))
        return
      }

      logAction('pricing_plan_updated', user?.id || 'anonymous', {
        plan_id: planId,
        updated_fields: Object.keys(validatedData),
      })

      const updatedPlan = {
        id: planId,
        name: 'Pro',
        description: 'Professional plan for growing businesses',
        price: 29,
        currency: 'USD',
        interval: 'monthly',
        features: [
          'Up to 10,000 API calls per month',
          'Advanced analytics',
          'Priority support',
          'Custom integrations',
        ],
        limits: {
          api_calls: 10000,
          storage: '10GB',
          users: 5,
        },
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: user?.id || 'system',
        ...validatedData,
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: updatedPlan,
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid plan data',
          details: error.errors,
        }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Failed to update plan',
        }))
      }
    }
  },

  /**
   * Delete a pricing plan
   */
  async deletePlan(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const planId = params?.id

      if (!planId) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Plan ID is required',
        }))
        return
      }

      logAction('pricing_plan_deleted', user?.id || 'anonymous', {
        plan_id: planId,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        message: 'Plan deleted successfully',
      }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Failed to delete plan',
      }))
    }
  },
} 