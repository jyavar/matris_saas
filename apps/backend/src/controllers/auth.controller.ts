import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { authService } from '../services/auth.service.js'
import { logAction } from '../services/logger.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import {
  sendCreated,
  sendError,
  sendSuccess,
  sendValidationError,
} from '../utils/response.helper.js'

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
})

export const authController = {
  /**
   * User login
   */
  async login(
    req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validatedData = loginSchema.parse(_body)
      const result = await authService.signIn(validatedData)

      logAction('user_login', 'anonymous', {
        email: validatedData.email,
      })

      return sendSuccess(res, result, 200, 'Login successful')
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid login data')
      } else {
        logAction('user_login_error', 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        return sendError(res, 'Invalid credentials', 401)
      }
    }
  },

  /**
   * User registration
   */
  async register(
    req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
    _user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validatedData = registerSchema.parse(_body)
      const result = await authService.signUp(validatedData)

      logAction('user_registered', 'anonymous', {
        email: validatedData.email,
        name: validatedData.name,
      })

      return sendCreated(res, result, 'User registered successfully')
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(
          res,
          error.errors,
          'Invalid registration data',
        )
      } else {
        logAction('user_registration_error', 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        return sendError(res, 'Registration failed', 400)
      }
    }
  },

  // Alias methods for route compatibility
  signUp: async (
    req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
  ) => {
    return authController.register(req, res, _body)
  },
  signIn: async (
    req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
  ) => {
    return authController.login(req, res, _body)
  },
}
