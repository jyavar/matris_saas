import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import logger from '../services/logger.service.js'
import { posthogService } from '../services/posthog.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { sendCreated, sendError, sendSuccess, sendValidationError } from '../utils/response.helper.js'
// Schemas de validación
const trackEventSchema = z.object({
  event: z.string().min(1),
  properties: z.record(z.any()).optional(),
  user_id: z.string().min(1),
})

const identifyUserSchema = z.object({
  user_id: z.string().min(1),
  traits: z.record(z.any()).optional(),
})

export const PostHogController = {
  async getHealth(req: IncomingMessage, res: ServerResponse, _user?: AuthenticatedUser): Promise<void> {
    try {
      const isConfigured = !!process.env.POSTHOG_API_KEY
      
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: {
          status: isConfigured ? 'configured' : 'not_configured',
          api_key_present: isConfigured,
        },
      }))
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async trackEvent(req: IncomingMessage, res: ServerResponse, _body?: RequestBody, _user?: AuthenticatedUser): Promise<void> {
    try {
      const validated = trackEventSchema.parse(_body)

      const result = await posthogService.trackEvent({
        event: validated.event,
        properties: validated.properties,
        user_id: validated.user_id,
      })

      logger.info(
        { userId: validated.user_id, event: validated.event },
        'Event tracked in PostHog',
      )

      return sendSuccess(res, result)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors , 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  async identifyUser(req: IncomingMessage, res: ServerResponse, _body?: RequestBody, _user?: AuthenticatedUser): Promise<void> {
    try {
      const validated = identifyUserSchema.parse(_body)

      const result = await posthogService.identifyUser({
        user_id: validated.user_id,
        traits: validated.traits,
      })

      logger.info({ userId: validated.user_id }, 'User identified in PostHog')

      return sendSuccess(res, result)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors , 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },
}
