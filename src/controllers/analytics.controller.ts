import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { logAction } from '../services/logger.service'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.d'
import { ApiError } from '../utils/ApiError'

// Schemas de validación
const trackEventSchema = z.object({
  event_name: z.string().min(1, 'Event name is required'),
  user_id: z.string().optional(),
  properties: z.record(z.any()).optional(),
  timestamp: z.string().optional(),
})

const trackMetricSchema = z.object({
  metric_name: z.string().min(1, 'Metric name is required'),
  value: z.number().min(0, 'Metric value must be positive'),
  user_id: z.string().optional(),
  tags: z.array(z.string()).optional(),
  timestamp: z.string().optional(),
})

const analyticsQuerySchema = z.object({
  limit: z.string().transform(val => parseInt(val)).refine(val => val > 0 && val <= 100, 'Limit must be between 1 and 100'),
  offset: z.string().transform(val => parseInt(val)).refine(val => val >= 0, 'Offset must be non-negative'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  user_id: z.string().optional(),
})

export const analyticsController = {
  /**
   * Track an analytics event
   */
  async trackEvent(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validatedData = trackEventSchema.parse(body)
      const userId = user?.id || validatedData.user_id || 'anonymous'

      // Log the event
      logAction('analytics_event_tracked', userId, {
        event_name: validatedData.event_name,
        properties: validatedData.properties,
        timestamp: validatedData.timestamp || new Date().toISOString(),
      })

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: {
          event_name: validatedData.event_name,
          user_id: userId,
          timestamp: validatedData.timestamp || new Date().toISOString(),
        },
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid event data',
          details: error.errors,
        }))
      } else {
        logAction('analytics_event_error', 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Failed to track event',
        }))
      }
    }
  },

  /**
   * Track an analytics metric
   */
  async trackMetric(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validatedData = trackMetricSchema.parse(body)
      const userId = user?.id || validatedData.user_id || 'anonymous'

      // Log the metric
      logAction('analytics_metric_tracked', userId, {
        metric_name: validatedData.metric_name,
        value: validatedData.value,
        tags: validatedData.tags,
        timestamp: validatedData.timestamp || new Date().toISOString(),
      })

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: {
          metric_name: validatedData.metric_name,
          value: validatedData.value,
          user_id: userId,
          timestamp: validatedData.timestamp || new Date().toISOString(),
        },
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid metric data',
          details: error.errors,
        }))
      } else {
        logAction('analytics_metric_error', 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Failed to track metric',
        }))
      }
    }
  },

  /**
   * Get analytics events with filtering
   */
  async getEvents(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const queryParams = Object.fromEntries(url.searchParams.entries())
      
      const validatedQuery = analyticsQuerySchema.parse(queryParams)

      // Mock events data
      const events = [
        {
          id: 'event-1',
          event_name: 'page_view',
          user_id: user?.id || 'anonymous',
          properties: { page: '/dashboard' },
          timestamp: new Date().toISOString(),
        },
        {
          id: 'event-2',
          event_name: 'button_click',
          user_id: user?.id || 'anonymous',
          properties: { button: 'submit' },
          timestamp: new Date().toISOString(),
        },
      ]

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: events.slice(validatedQuery.offset, validatedQuery.offset + validatedQuery.limit),
        pagination: {
          limit: validatedQuery.limit,
          offset: validatedQuery.offset,
          total: events.length,
        },
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
          error: 'Failed to get events',
        }))
      }
    }
  },

  /**
   * Get analytics metrics with filtering
   */
  async getMetrics(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const queryParams = Object.fromEntries(url.searchParams.entries())
      
      const validatedQuery = analyticsQuerySchema.parse(queryParams)

      // Mock metrics data
      const metrics = [
        {
          id: 'metric-1',
          metric_name: 'response_time',
          value: 150,
          user_id: user?.id || 'anonymous',
          tags: ['api', 'performance'],
          timestamp: new Date().toISOString(),
        },
        {
          id: 'metric-2',
          metric_name: 'error_rate',
          value: 0.02,
          user_id: user?.id || 'anonymous',
          tags: ['api', 'errors'],
          timestamp: new Date().toISOString(),
        },
      ]

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: metrics.slice(validatedQuery.offset, validatedQuery.offset + validatedQuery.limit),
        pagination: {
          limit: validatedQuery.limit,
          offset: validatedQuery.offset,
          total: metrics.length,
        },
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
          error: 'Failed to get metrics',
        }))
      }
    }
  },

  /**
   * Get analytics summary
   */
  async getSummary(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const queryParams = Object.fromEntries(url.searchParams.entries())
      
      // Mock summary data
      const summary = {
        total_events: 1250,
        total_metrics: 89,
        unique_users: 45,
        top_events: [
          { event_name: 'page_view', count: 450 },
          { event_name: 'button_click', count: 320 },
        ],
        top_metrics: [
          { metric_name: 'response_time', avg_value: 145 },
          { metric_name: 'error_rate', avg_value: 0.015 },
        ],
        period: {
          start_date: queryParams.start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          end_date: queryParams.end_date || new Date().toISOString(),
        },
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: summary,
      }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Failed to get summary',
      }))
    }
  },

  /**
   * Get user analytics
   */
  async getUserAnalytics(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const userId = params?.userId || user?.id

      if (!userId) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User ID is required',
        }))
        return
      }

      // Mock user analytics data
      const userAnalytics = {
        user_id: userId,
        total_events: 45,
        total_metrics: 12,
        last_activity: new Date().toISOString(),
        events: [
          { event_name: 'page_view', count: 20 },
          { event_name: 'button_click', count: 15 },
        ],
        metrics: [
          { metric_name: 'response_time', avg_value: 120 },
          { metric_name: 'error_rate', avg_value: 0.01 },
        ],
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: userAnalytics,
      }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Failed to get user analytics',
      }))
    }
  },

  // Legacy endpoints for backward compatibility
  async getAllAnalytics(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`)
      const queryParams = Object.fromEntries(url.searchParams.entries())
      
      const limit = parseInt(queryParams.limit || '10')

      // Mock analytics data
      const analytics = [
        {
          id: 'analytics-1',
          event_name: 'page_view',
          user_id: user?.id || 'anonymous',
          properties: { page: '/dashboard' },
          timestamp: new Date().toISOString(),
        },
        {
          id: 'analytics-2',
          event_name: 'button_click',
          user_id: user?.id || 'anonymous',
          properties: { button: 'submit' },
          timestamp: new Date().toISOString(),
        },
      ]

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(analytics.slice(0, limit)))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Failed to get analytics',
      }))
    }
  },

  async createAnalytics(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validatedData = trackEventSchema.parse(body)

      logAction('analytics_created', user?.id || 'anonymous', {
        event_name: validatedData.event_name,
        properties: validatedData.properties,
      })

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        event_name: validatedData.event_name,
        user_id: user?.id || 'anonymous',
        timestamp: new Date().toISOString(),
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid analytics data',
          details: error.errors,
        }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Failed to create analytics',
        }))
      }
    }
  },
} 