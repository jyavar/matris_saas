import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import logger from '../services/logger.service.js'
import { posthogService } from '../services/posthog.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'

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
  async trackEvent(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validated = trackEventSchema.parse(body)

      const result = await posthogService.trackEvent({
        event: validated.event,
        properties: validated.properties,
        user_id: validated.user_id,
      })

      logger.info(
        { userId: validated.user_id, event: validated.event },
        'Event tracked in PostHog',
      )

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: result,
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Invalid input data', details: error.errors }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
      }
    }
  },

  async identifyUser(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validated = identifyUserSchema.parse(body)

      const result = await posthogService.identifyUser({
        user_id: validated.user_id,
        traits: validated.traits,
      })

      logger.info({ userId: validated.user_id }, 'User identified in PostHog')

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: result,
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Invalid input data', details: error.errors }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
      }
    }
  },
}
