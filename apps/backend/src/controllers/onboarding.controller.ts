/* eslint-disable @typescript-eslint/no-unused-vars */
import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import logger from '../services/logger.service.js'
import { onboardingService } from '../services/onboarding.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { sendCreated, sendError, sendSuccess, sendValidationError } from '../utils/response.helper.js'

// Schemas de validación
const startOnboardingSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
})

const updateOnboardingSchema = z.object({
  step: z.enum(['welcome', 'profile', 'preferences', 'verification', 'complete']).optional(),
  name: z.string().min(2).optional(),
  preferences: z.record(z.unknown()).optional(),
})

const completeOnboardingSchema = z.object({
  user_id: z.string().min(1),
  preferences: z.record(z.unknown()).optional(),
})

export const OnboardingController = {
  /**
   * GET /api/onboarding - Obtener onboarding del usuario
   */
  async getOnboarding(
    req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      console.log('DEBUG: getOnboarding called with _user:', _user)
      const userId = _user?.id
      if (!userId) {
        console.log('DEBUG: No userId found, user not authenticated')
        return sendError(res, 'User not authenticated', 401)
      }

      console.log('DEBUG: Calling onboardingService.getOnboarding with userId:', userId)
      const onboarding = await onboardingService.getOnboarding(userId)
      console.log('DEBUG: onboardingService.getOnboarding returned:', onboarding)
      if (!onboarding) {
        console.log('DEBUG: No onboarding found, returning 404')
        return sendError(res, 'Onboarding not found', 404)
      }

      return sendSuccess(res, onboarding)
    } catch (error) {
      logger.error({ error }, 'Error in getOnboarding')
      return sendError(res, 'Internal server error', 500)
    }
  },

  /**
   * POST /api/onboarding/start - Iniciar onboarding
   */
  async startOnboarding(
    req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validated = startOnboardingSchema.parse(_body)

      const onboarding = await onboardingService.startOnboarding({
        email: validated.email,
        name: validated.name,
      })

      logger.info(
        { userId: _user?.id, email: validated.email },
        'Onboarding started',
      )

      return sendCreated(res, onboarding)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        logger.error({ error }, 'Error in startOnboarding')
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  /**
   * PUT /api/onboarding/:user_id - Actualizar onboarding
   */
  async updateOnboarding(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { user_id } = params || {}
      if (!user_id) {
        return sendError(res, 'User ID is required', 400)
      }

      const validated = updateOnboardingSchema.parse(_body)

      const onboarding = await onboardingService.updateOnboarding(user_id, validated)
      if (!onboarding) {
        return sendError(res, 'Onboarding not found', 404)
      }

      logger.info({ userId: user_id, step: validated.step }, 'Onboarding updated')

      return sendSuccess(res, onboarding)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        logger.error({ error }, 'Error in updateOnboarding')
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  /**
   * POST /api/onboarding/complete - Completar onboarding
   */
  async completeOnboarding(
    req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validated = completeOnboardingSchema.parse(_body)

      const onboarding = await onboardingService.completeOnboarding({
        user_id: validated.user_id,
        preferences: validated.preferences,
      })

      if (!onboarding) {
        return sendError(res, 'Onboarding not found', 404)
      }

      logger.info({ userId: validated.user_id }, 'Onboarding completed')

      return sendSuccess(res, onboarding)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        logger.error({ error }, 'Error in completeOnboarding')
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  /**
   * GET /api/onboarding/:user_id/progress - Obtener progreso del onboarding
   */
  async getOnboardingProgress(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { user_id } = params || {}
      if (!user_id) {
        return sendError(res, 'User ID is required', 400)
      }

      const progress = await onboardingService.getOnboardingProgress(user_id)
      if (!progress) {
        return sendError(res, 'Onboarding not found', 404)
      }

      return sendSuccess(res, progress)
    } catch (error) {
      logger.error({ error }, 'Error in getOnboardingProgress')
      return sendError(res, 'Internal server error', 500)
    }
  },

  /**
   * DELETE /api/onboarding/:user_id - Eliminar onboarding
   */
  async deleteOnboarding(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { user_id } = params || {}
      if (!user_id) {
        return sendError(res, 'User ID is required', 400)
      }

      const deleted = await onboardingService.deleteOnboarding(user_id)
      if (!deleted) {
        return sendError(res, 'Failed to delete onboarding', 500)
      }

      logger.info({ userId: user_id }, 'Onboarding deleted')

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: 'Onboarding deleted' }))
    } catch (error) {
      logger.error({ error }, 'Error in deleteOnboarding')
      return sendError(res, 'Internal server error', 500)
    }
  },

  /**
   * GET /api/onboarding/stats - Obtener estadísticas de onboarding
   */
  async getOnboardingStats(
    req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const stats = await onboardingService.getOnboardingStats()

      return sendSuccess(res, stats)
    } catch (error) {
      logger.error({ error }, 'Error in getOnboardingStats')
      return sendError(res, 'Internal server error', 500)
    }
  },

  // Alias methods for route compatibility
  getOnboardingStatus: async (
    req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return OnboardingController.getOnboarding(req, res, _params, _body, user)
  },
  
  updateOnboardingStatus: async (
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return OnboardingController.updateOnboarding(req, res, params, _body, user)
  },
  
  getOnboardingStepById: async (
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return OnboardingController.getOnboardingProgress(req, res, params, _body, user)
  },
  
  updateOnboardingStep: async (
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return OnboardingController.updateOnboarding(req, res, params, _body, user)
  },
}

export const onboardingController = OnboardingController
