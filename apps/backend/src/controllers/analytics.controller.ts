import { numericIdParamSchema } from '../lib/schemas.js'
import {
  analyticsService,
  eventSchema,
  metricSchema,
  UserAnalytics,
} from '../services/analytics.service.js'
import { logAction } from '../services/logger.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import type { Json } from '../types/supabase.types.js'
import { sendValidationError } from '../utils/response.helper.js'
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
    req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const eventData = eventSchema.parse(_body)
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
    req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const metricData = metricSchema.parse(_body)
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
    _user?: AuthenticatedUser,
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

      logAction('analytics_events_requested', _user?.id || 'anonymous', {
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
        logAction('analytics_get_events_error', _user?.id || 'anonymous', {
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
    _user?: AuthenticatedUser,
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

      logAction('analytics_metrics_requested', _user?.id || 'anonymous', {
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
        logAction('analytics_get_metrics_error', _user?.id || 'anonymous', {
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
    req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    user?: AuthenticatedUser,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const userId = (_params?.userId as string) || _user?.id
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

      logAction('analytics_user_data_requested', _user?.id || 'anonymous', {
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
    _user?: AuthenticatedUser,
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

      logAction('analytics_summary_requested', _user?.id || 'anonymous', {
        startDate,
        endDate,
      })

      return sendSuccess(res, summary)
    } catch (error) {
      logAction('analytics_summary_error', _user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get analytics summary (alias for getAnalyticsSummary)
   */
  async getSummary(
    req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    return this.getAnalyticsSummary(req, res)
  },

  /**
   * Get all analytics
   */
  async getAllAnalytics(
    req: IncomingMessage,
    res: ServerResponse,
    user?: AuthenticatedUser,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const analytics = await analyticsService.getAllAnalytics()

      logAction('analytics_all_requested', _user?.id || 'anonymous', {
        count: analytics.length,
      })

      return sendSuccess(res, analytics)
    } catch (error) {
      logAction('analytics_all_error', _user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get analytics by ID
   */
  async getAnalyticsById(
    req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'Analytics ID is required',
          }),
        )
        return
      }

      const validatedId = numericIdParamSchema.parse({ id })
      const analytics = await analyticsService.getAnalyticsById(
        Number(validatedId.id),
      )

      if (!analytics) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'Analytics not found',
          }),
        )
        return
      }

      return sendSuccess(res, analytics)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid analytics ID')
      } else {
        logAction('analytics_by_id_error', _user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Create analytics
   */
  async createAnalytics(
    req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validatedData = createAnalyticsSchema.parse(_body)
      if (!validatedData.event_name) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'Event name is required',
          }),
        )
        return
      }
      const analytics = await analyticsService.createAnalytics({
        event_name: validatedData.event_name,
        payload: validatedData.payload,
        user_id: validatedData.user_id,
      })

      logAction('analytics_created', _user?.id || 'anonymous', {
        event_name: validatedData.event_name,
        user_id: validatedData.user_id,
      })

      return sendCreated(res, analytics)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid analytics data')
      } else {
        logAction('analytics_create_error', _user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Update analytics
   */
  async updateAnalytics(
    req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'Analytics ID is required',
          }),
        )
        return
      }

      const validatedId = numericIdParamSchema.parse({ id })
      const validatedData = updateAnalyticsSchema.parse(_body)
      const analytics = await analyticsService.updateAnalytics(
        Number(validatedId.id),
        validatedData,
      )

      logAction('analytics_updated', _user?.id || 'anonymous', {
        analytics_id: validatedId.id,
        event_name: validatedData.event_name,
      })

      return sendSuccess(res, analytics)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid analytics data')
      } else {
        logAction('analytics_update_error', _user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Delete analytics
   */
  async deleteAnalytics(
    req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            error: 'Analytics ID is required',
          }),
        )
        return
      }

      const validatedId = numericIdParamSchema.parse({ id })
      await analyticsService.deleteAnalytics(Number(validatedId.id))

      logAction('analytics_deleted', _user?.id || 'anonymous', {
        analytics_id: validatedId.id,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: true,
          message: 'Analytics deleted successfully',
        }),
      )
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid analytics ID')
      } else {
        logAction('analytics_delete_error', _user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },
}
