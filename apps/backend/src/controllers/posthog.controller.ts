import { z } from 'zod'

import logger from '../services/logger.service.js'
import { posthogService } from '../services/posthog.service.js'

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
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validated = trackEventSchema.parse(req.body)

      const result = await posthogService.trackEvent({
        event: validated.event,
        properties: validated.properties,
        user_id: validated.user_id,
      })

      logger.info(
        { userId: validated.user_id, event: validated.event },
        'Event tracked in PostHog',
      )

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },

  async identifyUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validated = identifyUserSchema.parse(req.body)

      const result = await posthogService.identifyUser({
        user_id: validated.user_id,
        traits: validated.traits,
      })

      logger.info({ userId: validated.user_id }, 'User identified in PostHog')

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
}
