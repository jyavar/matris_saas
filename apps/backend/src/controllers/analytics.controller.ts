import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'

import { numericIdParamSchema } from '../lib/schemas.js'
import {
  analyticsQuerySchema,
  analyticsService,
  eventSchema,
  metricSchema,
} from '../services/analytics.service.js'
import { logAction } from '../services/logger.service.js'
import { ApiError } from '../utils/ApiError.js'

const createAnalyticsSchema = z.object({
  event_name: z.string(),
  payload: z.record(z.any()).optional(),
  user_id: z.number().optional(),
})

const updateAnalyticsSchema = z.object({
  event_name: z.string().optional(),
  payload: z.record(z.any()).optional(),
  user_id: z.number().optional(),
})

export const analyticsController = {
  /**
   * Track an event
   */
  async trackEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const eventData = eventSchema.parse(req.body)
      const event = await analyticsService.trackEvent(eventData)

      res.status(201).json({
        success: true,
        data: event,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, error: error.errors })
      }
      logAction('analytics_track_event_error', req.user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },

  /**
   * Track a metric
   */
  async trackMetric(req: Request, res: Response, next: NextFunction) {
    try {
      const metricData = metricSchema.parse(req.body)
      const metric = await analyticsService.trackMetric(metricData)

      res.status(201).json({
        success: true,
        data: metric,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, error: error.errors })
      }
      logAction('analytics_track_metric_error', req.user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },

  /**
   * Get events with filtering
   */
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        ...req.query,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        offset: req.query.offset ? Number(req.query.offset) : undefined,
      }
      const parsedQuery = analyticsQuerySchema.parse(query)
      const events = await analyticsService.getEvents(parsedQuery)

      logAction('analytics_events_requested', req.user?.id || 'anonymous', {
        query: parsedQuery,
        count: events.length,
      })

      res.status(200).json({
        success: true,
        data: events,
        count: events.length,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, error: error.errors })
      }
      logAction('analytics_get_events_error', req.user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },

  /**
   * Get metrics with filtering
   */
  async getMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        ...req.query,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        offset: req.query.offset ? Number(req.query.offset) : undefined,
      }
      const parsedQuery = analyticsQuerySchema.parse(query)
      const metrics = await analyticsService.getMetrics(parsedQuery)

      logAction('analytics_metrics_requested', req.user?.id || 'anonymous', {
        query: parsedQuery,
        count: metrics.length,
      })

      res.status(200).json({
        success: true,
        data: metrics,
        count: metrics.length,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, error: error.errors })
      }
      logAction('analytics_get_metrics_error', req.user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },

  /**
   * Get analytics summary
   */
  async getAnalyticsSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const { start_date, end_date } = req.query
      const summary = await analyticsService.getAnalyticsSummary(
        start_date as string,
        end_date as string,
      )

      logAction('analytics_summary_requested', req.user?.id || 'anonymous', {
        start_date,
        end_date,
        total_events: summary.total_events,
      })

      res.status(200).json({
        success: true,
        data: summary,
      })
    } catch (error) {
      logAction('analytics_summary_error', req.user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },

  /**
   * Get user analytics
   */
  async getUserAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      if (!userId) {
        throw new ApiError(400, 'User ID is required')
      }

      const userAnalytics = await analyticsService.getUserAnalytics(userId)

      logAction('analytics_user_data_requested', req.user?.id || 'anonymous', {
        target_user_id: userId,
        total_events: userAnalytics.total_events,
      })

      res.status(200).json({
        success: true,
        data: userAnalytics,
      })
    } catch (error) {
      logAction('analytics_user_data_error', req.user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },

  // Legacy methods for backward compatibility
  async getAllAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      if (!req.query || Object.keys(req.query).length === 0) {
        throw new ApiError(400, 'Query is required')
      }
      const query = {
        ...req.query,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        offset: req.query.offset ? Number(req.query.offset) : undefined,
      }
      analyticsQuerySchema.parse(query)
      const analyticss = await analyticsService.getAllAnalytics()
      res.json(analyticss)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, error: error.errors })
      }
      next(error)
    }
  },

  async getAnalyticsById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = numericIdParamSchema.parse(req.params)
      const analytics = await analyticsService.getAnalyticsById(Number(id))
      res.json(analytics)
    } catch (error) {
      next(error)
    }
  },

  async createAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const validatedAnalytics = createAnalyticsSchema.parse(req.body)
      const newAnalytics = await analyticsService.createAnalytics({
        ...validatedAnalytics,
        event_name: validatedAnalytics.event_name,
      })
      res.status(201).json(newAnalytics)
    } catch (error) {
      next(error)
    }
  },

  async updateAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = numericIdParamSchema.parse(req.params)
      const validatedAnalytics = updateAnalyticsSchema.parse(req.body)
      const updatedAnalytics = await analyticsService.updateAnalytics(
        Number(id),
        validatedAnalytics,
      )
      res.json(updatedAnalytics)
    } catch (error) {
      next(error)
    }
  },

  async deleteAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = numericIdParamSchema.parse(req.params)
      await analyticsService.deleteAnalytics(Number(id))
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}
