import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { analyticsService } from '../services/analytics.service.js'

const createAnalyticsSchema = z.object({
  task: z.string(),
  is_completed: z.boolean().optional(),
})

const updateAnalyticsSchema = z.object({
  task: z.string().optional(),
  is_completed: z.boolean().optional(),
})

export const analyticsController = {
  async getAllAnalyticss(req: Request, res: Response, next: NextFunction) {
    try {
      const analyticss = await analyticsService.getAllAnalyticss()
      res.json(analyticss)
    } catch (error) {
      next(error)
    }
  },

  async getAnalyticsById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const analytics = await analyticsService.getAnalyticsById(id)
      res.json(analytics)
    } catch (error) {
      next(error)
    }
  },

  async createAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedAnalytics = createAnalyticsSchema.parse(req.body)
      const newAnalytics = await analyticsService.createAnalytics(validatedAnalytics)
      res.status(201).json(newAnalytics)
    } catch (error) {
      next(error)
    }
  },

  async updateAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const validatedAnalytics = updateAnalyticsSchema.parse(req.body)
      const updatedAnalytics = await analyticsService.updateAnalytics(id, validatedAnalytics)
      res.json(updatedAnalytics)
    } catch (error) {
      next(error)
    }
  },

  async deleteAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await analyticsService.deleteAnalytics(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}
