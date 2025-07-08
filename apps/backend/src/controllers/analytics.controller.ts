import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import {
  analyticsService,
  eventSchema,
  metricSchema,
  UserAnalytics,
} from '../services/analytics.service.js'
import { logAction } from '../services/logger.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import type { Json } from '../types/supabase.types.js'
import { sendCreated, sendSuccess, sendValidationError } from '../utils/response.helper.js'

const createAnalyticsSchema = z.object({
  event_name: z.string(),
  payload: z.custom<Json>().optional(),
  user_id: z.number().optional(),
})

const updateAnalyticsSchema = z.object({
  event_name: z.string().optional(),
  payload: z.custom<Json>().optional(),
  user_id: z.number().optional(),
})

export const analyticsController = {
  /**
   * Track an event
   */
  async trackEvent(
    _req: IncomingMessage,
    res: ServerResponse,
    body?: RequestBody,
  ): Promise<void> {
    try {
      const eventData = eventSchema.parse(body)
      const event = await analyticsService.trackEvent(eventData)

      return sendCreated(res, event)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid event data')
      } else {
        logAction('analytics_track_event_error', 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Track a metric
   */
  async trackMetric(
    _req: IncomingMessage,
    res: ServerResponse,
    body?: RequestBody,
  ): Promise<void> {
    try {
      const metricData = metricSchema.parse(body)
      const metric = await analyticsService.trackMetric(metricData)

      return sendCreated(res, metric)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid metric data')
      } else {
        logAction('analytics_track_metric_error', 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Get events with filtering
   */
  async getEvents(
    req: IncomingMessage,
    res: ServerResponse,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const query = new URL(req.url || '', `http://${req.headers.host}`)
        .searchParams
      const queryObj = Object.fromEntries(query.entries())

      // Convert query parameters to match service schema
      const serviceQuery = {
        start_date: queryObj.startDate,
        end_date: queryObj.endDate,
        event_name: queryObj.event_name,
        user_id: queryObj.user_id ? Number(queryObj.user_id) : undefined,
        limit: queryObj.limit ? Number(queryObj.limit) : 100,
        offset: queryObj.offset ? Number(queryObj.offset) : 0,
      }

      const events = await analyticsService.getEvents(serviceQuery)

      logAction('analytics_events_requested', user?.id || 'anonymous', {
        query: serviceQuery,
        count: events.length,
      })

      return sendSuccess(res, events)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(
          res,
          error.errors,
          'Invalid query parameters',
        )
      } else {
        logAction('analytics_get_events_error', user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Get metrics with filtering
   */
  async getMetrics(
    req: IncomingMessage,
    res: ServerResponse,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const query = new URL(req.url || '', `http://${req.headers.host}`)
        .searchParams
      const queryObj = Object.fromEntries(query.entries())

      // Convert query parameters to match service schema
      const serviceQuery = {
        start_date: queryObj.startDate,
        end_date: queryObj.endDate,
        event_name: queryObj.event_name,
        user_id: queryObj.user_id ? Number(queryObj.user_id) : undefined,
        limit: queryObj.limit ? Number(queryObj.limit) : 100,
        offset: queryObj.offset ? Number(queryObj.offset) : 0,
      }

      const metrics = await analyticsService.getMetrics(serviceQuery)

      logAction('analytics_metrics_requested', user?.id || 'anonymous', {
        query: serviceQuery,
        count: metrics.length,
      })

      return sendSuccess(res, metrics)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(
          res,
          error.errors,
          'Invalid query parameters',
        )
      } else {
        logAction('analytics_get_metrics_error', user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Get user analytics
   */
  async getUserAnalytics(
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const userId = (params?.userId as string) || user?.id
      if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'User ID is required',
          }),
        )
        return
      }

      let userAnalytics: UserAnalytics | null = null
      try {
        userAnalytics = await analyticsService.getUserAnalytics(userId)
      } catch {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'User not found',
          }),
        )
        return
      }

      if (!userAnalytics) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'User not found',
          }),
        )
        return
      }

      logAction('analytics_user_data_requested', user?.id || 'anonymous', {
        target_user_id: userId,
        total_events: userAnalytics.total_events,
      })

      return sendSuccess(res, userAnalytics)
    } catch {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: false,
          error: 'User ID is required',
        }),
      )
    }
  },

  /**
   * Get analytics summary
   */
  async getAnalyticsSummary(
    req: IncomingMessage,
    res: ServerResponse,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const query = new URL(req.url || '', `http://${req.headers.host}`)
        .searchParams
      const startDate = query.get('startDate')
      const endDate = query.get('endDate')

      const summary = await analyticsService.getAnalyticsSummary(
        startDate || undefined,
        endDate || undefined,
      )

      logAction('analytics_summary_requested', user?.id || 'anonymous', {
        start_date: startDate,
        end_date: endDate,
      })

      return sendSuccess(res, summary)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(
          res,
          error.errors,
          'Invalid query parameters',
        )
      } else {
        logAction('analytics_summary_error', user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Get summary (alias for getAnalyticsSummary)
   */
  async getSummary(
    req: IncomingMessage,
    res: ServerResponse,
    user?: AuthenticatedUser,
  ): Promise<void> {
    return this.getAnalyticsSummary(req, res, user)
  },

  /**
   * Get all analytics
   */
  async getAllAnalytics(
    _req: IncomingMessage,
    res: ServerResponse,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const analytics = await analyticsService.getAllAnalytics()

      logAction('analytics_all_requested', user?.id || 'anonymous', {
        count: analytics.length,
      })

      return sendSuccess(res, analytics)
    } catch (error) {
      logAction('analytics_all_error', user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get analytics by ID
   */
  async getAnalyticsById(
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, error: 'Analytics ID is required' }),
        )
        return
      }

      const analytics = await analyticsService.getAnalyticsById(Number(id))
      if (!analytics) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, error: 'Analytics not found' }),
        )
        return
      }

      return sendSuccess(res, analytics)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid analytics ID')
      } else {
        throw error
      }
    }
  },

  /**
   * Create analytics
   */
  async createAnalytics(
    _req: IncomingMessage,
    res: ServerResponse,
    body?: RequestBody,
  ): Promise<void> {
    try {
      const validated = createAnalyticsSchema.parse(body)
      if (!validated.event_name) {
        return sendValidationError(res, [], 'Event name is required')
      }
      
      const analytics = await analyticsService.createAnalytics({
        event_name: validated.event_name,
        payload: validated.payload,
        user_id: validated.user_id,
      })
      return sendCreated(res, analytics, 'Analytics created')
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        throw error
      }
    }
  },

  /**
   * Update analytics
   */
  async updateAnalytics(
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, error: 'Analytics ID is required' }),
        )
        return
      }

      const validated = updateAnalyticsSchema.parse(body)
      const analytics = await analyticsService.updateAnalytics(Number(id), validated)
      if (!analytics) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, error: 'Analytics not found' }),
        )
        return
      }

      return sendSuccess(res, analytics, 200, 'Analytics updated')
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        throw error
      }
    }
  },

  /**
   * Delete analytics
   */
  async deleteAnalytics(
    _req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, error: 'Analytics ID is required' }),
        )
        return
      }

      const deleted = await analyticsService.deleteAnalytics(Number(id))
      if (!deleted) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, error: 'Analytics not found' }),
        )
        return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: 'Analytics deleted' }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid analytics ID')
      } else {
        throw error
      }
    }
  },
}
