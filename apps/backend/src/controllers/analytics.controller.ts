import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { analyticsQuerySchema, numericIdParamSchema } from '../lib/schemas.js'
import { analyticsService } from '../services/analytics.service.js'
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
  async getAllAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      if (!req.query || Object.keys(req.query).length === 0) {
        throw new ApiError(400, 'Query is required')
      }
      analyticsQuerySchema.parse(req.query)
      const analyticss = await analyticsService.getAllAnalytics()
      res.json(analyticss)
    } catch (error) {
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
