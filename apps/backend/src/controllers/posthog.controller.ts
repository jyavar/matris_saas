import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import logger from '../services/logger.service.js'
import { posthogService } from '../services/posthog.service.js'

// Schemas de validación
const trackEventSchema = z.object({
  event: z.string().min(1, 'Event is required'),
  properties: z.record(z.unknown()).optional(),
  user_id: z.string().min(1, 'user_id is required'),
})

const identifyUserSchema = z.object({
  user_id: z.string().min(1, 'user_id is required'),
  traits: z.record(z.unknown()).optional(),
})

export class PostHogController {
  static async trackEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = trackEventSchema.parse(req.body)

      const result = await posthogService.trackEvent({
        event: validatedData.event,
        user_id: validatedData.user_id,
        properties: validatedData.properties,
      })

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: error.errors,
        })
      }
      next(error)
    }
  }

  static async identifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = identifyUserSchema.parse(req.body)

      const result = await posthogService.identifyUser({
        user_id: validatedData.user_id,
        traits: validatedData.traits,
      })

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: error.errors,
        })
      }
      next(error)
    }
  }

  static async getHealth(req: Request, res: Response) {
    try {
      const isConfigured = !!process.env.POSTHOG_API_KEY

      res.status(200).json({
        success: true,
        data: {
          status: isConfigured ? 'configured' : 'not_configured',
          timestamp: new Date().toISOString(),
        },
      })
    } catch (error) {
      logger.error({ error }, 'PostHog health check failed')
      res.status(500).json({
        success: false,
        error: 'Health check failed',
      })
    }
  }
}
