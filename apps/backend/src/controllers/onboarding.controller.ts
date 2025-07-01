import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { onboardingService } from '../services/onboarding.service.js'
import { ApiError } from '../utils/ApiError.js'

const startOnboardingSchema = z.object({
  email: z.string().email('Email is required'),
})

const completeOnboardingSchema = z.object({
  user_id: z.string().min(1, 'user_id is required'),
})

export class OnboardingController {
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
  }

  async startOnboarding(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validated = startOnboardingSchema.parse(req.body)
      const onboarding = await onboardingService.startOnboarding(validated)
      res.status(201).json({ success: true, data: onboarding })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  }

  async completeOnboarding(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validated = completeOnboardingSchema.parse(req.body)
      const onboarding = await onboardingService.completeOnboarding(validated)
      res.status(200).json({ success: true, data: onboarding })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  }
}

export const onboardingController = new OnboardingController()
