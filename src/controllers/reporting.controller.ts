import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { logAction } from '../services/logger.service'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.d'

// Schemas de validación
const usageQuerySchema = z.object({
  period: z.string().regex(/^\d{4}-\d{2}$/, 'Period must be in YYYY-MM format'),
  user_id: z.string().optional(),
  plan_id: z.string().optional(),
})

export const reportingController = {
  /**
   * Get usage report
   */
  async getUsageReport(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const queryParams = Object.fromEntries(url.searchParams.entries())
      
      const validatedQuery = usageQuerySchema.parse(queryParams)

      // Mock usage report data
      const usageReport = {
        period: validatedQuery.period,
        user_id: validatedQuery.user_id || user?.id,
        plan_id: validatedQuery.plan_id,
        metrics: {
          api_calls: {
            total: 15420,
            limit: 10000,
            percentage: 154.2,
            breakdown: {
              'GET /api/analytics': 8500,
              'POST /api/analytics/track/event': 4200,
              'GET /api/campaigns': 2720,
            },
          },
          storage: {
            used: '8.5GB',
            limit: '10GB',
            percentage: 85,
            breakdown: {
              'analytics_data': '5.2GB',
              'user_uploads': '2.1GB',
              'logs': '1.2GB',
            },
          },
          users: {
            active: 45,
            limit: 5,
            percentage: 900,
          },
        },
        costs: {
          api_calls: 54.20,
          storage: 8.50,
          total: 62.70,
          currency: 'USD',
        },
        alerts: [
          {
            type: 'limit_exceeded',
            message: 'API calls exceeded plan limit',
            severity: 'warning',
            timestamp: new Date().toISOString(),
          },
          {
            type: 'limit_exceeded',
            message: 'User count exceeded plan limit',
            severity: 'critical',
            timestamp: new Date().toISOString(),
          },
        ],
        generated_at: new Date().toISOString(),
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: usageReport,
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid query parameters',
          details: error.errors,
        }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Failed to get usage report',
        }))
      }
    }
  },

  /**
   * Get billing report
   */
  async getBillingReport(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const queryParams = Object.fromEntries(url.searchParams.entries())
      
      const period = queryParams.period || new Date().toISOString().slice(0, 7)

      // Mock billing report data
      const billingReport = {
        period,
        user_id: user?.id,
        invoices: [
          {
            id: 'inv-001',
            amount: 29.00,
            currency: 'USD',
            status: 'paid',
            due_date: '2024-07-01T00:00:00Z',
            paid_date: '2024-07-01T00:00:00Z',
            items: [
              {
                description: 'Pro Plan - July 2024',
                amount: 29.00,
                quantity: 1,
              },
            ],
          },
        ],
        charges: {
          plan_subscription: 29.00,
          overage_charges: 33.70,
          total: 62.70,
          currency: 'USD',
        },
        payment_method: {
          type: 'card',
          last4: '4242',
          brand: 'visa',
          exp_month: 12,
          exp_year: 2025,
        },
        generated_at: new Date().toISOString(),
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: billingReport,
      }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Failed to get billing report',
      }))
    }
  },

  /**
   * Get performance report
   */
  async getPerformanceReport(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const queryParams = Object.fromEntries(url.searchParams.entries())
      
      const period = queryParams.period || new Date().toISOString().slice(0, 7)

      // Mock performance report data
      const performanceReport = {
        period,
        user_id: user?.id,
        metrics: {
          response_time: {
            average: 145,
            p95: 280,
            p99: 450,
            unit: 'ms',
          },
          error_rate: {
            total: 0.015,
            percentage: 1.5,
            breakdown: {
              '4xx_errors': 0.012,
              '5xx_errors': 0.003,
            },
          },
          throughput: {
            requests_per_second: 1250,
            total_requests: 15420000,
          },
          availability: {
            uptime: 99.95,
            downtime_minutes: 21.6,
          },
        },
        endpoints: [
          {
            path: '/api/analytics/track/event',
            requests: 4200000,
            avg_response_time: 120,
            error_rate: 0.008,
          },
          {
            path: '/api/campaigns',
            requests: 2720000,
            avg_response_time: 180,
            error_rate: 0.022,
          },
          {
            path: '/api/analytics/events',
            requests: 8500000,
            avg_response_time: 95,
            error_rate: 0.005,
          },
        ],
        generated_at: new Date().toISOString(),
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: performanceReport,
      }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Failed to get performance report',
      }))
    }
  },
} 