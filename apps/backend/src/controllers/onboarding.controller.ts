import { IncomingMessage, ServerResponse} from 'http'
import { z } from 'zod'

import logger from '../services/logger.service.js'
import { onboardingService} from '../services/onboarding.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { sendValidationError} from '../utils/response.helper.js'
// Schemas de validación
const startOnboardingSchema = z.object({
  email: z.string().email(),
})

const completeOnboardingSchema = z.object({
  user_id: z.string().min(1),
})

export const OnboardingController = {
  async getOnboarding(req: IncomingMessage, res: ServerResponse, user?: AuthenticatedUser, _user?: AuthenticatedUser): Promise<void> {
    try {
      if (!_user?.id) {
        return
      }
      const onboarding = await onboardingService.getOnboarding(_user?.id)
      if (!onboarding) {
        return
      }
      return sendSuccess(res, onboarding )
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async startOnboarding(req: IncomingMessage, res: ServerResponse, _body?: RequestBody, _user?: AuthenticatedUser): Promise<void> {
    try {
      const validated = startOnboardingSchema.parse(_body)

      const onboarding = await onboardingService.startOnboarding({
        email: validated.email,
      })

      logger.info(
        { userId: _user?.id, email: validated.email },
        'Onboarding started',
      )

      return sendCreated(res, onboarding)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors , 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  async completeOnboarding(req: IncomingMessage, res: ServerResponse, _body?: RequestBody, _user?: AuthenticatedUser): Promise<void> {
    try {
      const validated = completeOnboardingSchema.parse(_body)

      const onboarding = await onboardingService.completeOnboarding({
        user_id: validated.user_id,
      })

      logger.info({ userId: validated.user_id }, 'Onboarding completed')

      return sendSuccess(res, onboarding)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors , 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  // Alias methods for route compatibility
  getOnboardingStatus: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return OnboardingController.getOnboarding(req, res, user, user)
  },
  updateOnboardingStatus: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return OnboardingController.startOnboarding(req, res, _body user)
  },
  getOnboardingStepById: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return OnboardingController.getOnboarding(req, res, user, user)
  },
  updateOnboardingStep: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return OnboardingController.completeOnboarding(req, res, _body user)
  },
}

export const onboardingController = OnboardingController
