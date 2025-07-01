import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import logger from '../services/logger.service.js'
import { onboardingService } from '../services/onboarding.service.js'
import { ApiError } from '../utils/ApiError.js'

// Schemas de validación
const startOnboardingSchema = z.object({
  email: z.string().email(),
})

const completeOnboardingSchema = z.object({
  user_id: z.string().min(1),
})

export const OnboardingController = {
  async getOnboarding(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user
      if (!user?.id) throw new ApiError(401, 'Unauthorized')
      const onboarding = await onboardingService.getOnboarding(user.id)
      if (!onboarding) throw new ApiError(404, 'Onboarding not found')
      res.status(200).json({ success: true, data: onboarding })
    } catch (error) {
      next(error)
    }
  },

  async startOnboarding(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = startOnboardingSchema.parse(req.body)

      const onboarding = await onboardingService.startOnboarding({
        email: validated.email,
      })

      logger.info(
        { userId: req.user?.id, email: validated.email },
        'Onboarding started',
      )

      return res.status(201).json({
        success: true,
        data: onboarding,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  },

  async completeOnboarding(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = completeOnboardingSchema.parse(req.body)

      const onboarding = await onboardingService.completeOnboarding({
        user_id: validated.user_id,
      })

      logger.info({ userId: validated.user_id }, 'Onboarding completed')

      return res.status(200).json({
        success: true,
        data: onboarding,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  },
}

export const onboardingController = OnboardingController
