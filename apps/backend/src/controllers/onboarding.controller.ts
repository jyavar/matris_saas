import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import logger from '../services/logger.service.js'
import { onboardingService } from '../services/onboarding.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'

// Schemas de validación
const startOnboardingSchema = z.object({
  email: z.string().email(),
})

const completeOnboardingSchema = z.object({
  user_id: z.string().min(1),
})

export const OnboardingController = {
  async getOnboarding(req: IncomingMessage, res: ServerResponse, user?: AuthenticatedUser): Promise<void> {
    try {
      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Unauthorized' }))
        return
      }
      const onboarding = await onboardingService.getOnboarding(user?.id)
      if (!onboarding) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Onboarding not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: onboarding }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async startOnboarding(req: IncomingMessage, res: ServerResponse, _body?: RequestBody, _user?: AuthenticatedUser): Promise<void> {
    try {
      const validated = startOnboardingSchema.parse(_body)

      const onboarding = await onboardingService.startOnboarding({
        email: validated.email,
      })

      logger.info(
        { userId: user?.id, email: validated.email },
        'Onboarding started',
      )

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: onboarding,
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

  async completeOnboarding(req: IncomingMessage, res: ServerResponse, _body?: RequestBody): Promise<void> {
    try {
      const validated = completeOnboardingSchema.parse(_body)

      const onboarding = await onboardingService.completeOnboarding({
        user_id: validated.user_id,
      })

      logger.info({ userId: validated.user_id }, 'Onboarding completed')

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: onboarding,
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

  // Alias methods for route compatibility
  getOnboardingStatus: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return OnboardingController.getOnboarding(req, res, _params, _body, user)
  },
  updateOnboardingStatus: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return OnboardingController.startOnboarding(req, res, _params, _body, user)
  },
  getOnboardingStepById: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return OnboardingController.getOnboarding(req, res, _params, _body, user)
  },
  updateOnboardingStep: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return OnboardingController.completeOnboarding(req, res, _params, _body, user)
  },
}

export const onboardingController = OnboardingController
