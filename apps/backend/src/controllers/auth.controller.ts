import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { authService } from '../services/auth.service.js'
import { logAction } from '../services/logger.service.js'
import { ApiError } from '../utils/ApiError.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
})

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
})

export const authController = {
  /**
   * User login
   */
  async login(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validatedData = loginSchema.parse(body)
      const result = await authService.signIn(validatedData)

      logAction('user_login', 'anonymous', {
        email: validatedData.email,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: result,
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid login data',
          details: error.errors,
        }))
      } else {
        logAction('user_login_error', 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid credentials',
        }))
      }
    }
  },

  /**
   * User registration
   */
  async register(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validatedData = registerSchema.parse(body)
      const result = await authService.signUp(validatedData)

      logAction('user_registered', 'anonymous', {
        email: validatedData.email,
        name: validatedData.name,
      })

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: result,
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid registration data',
          details: error.errors,
        }))
      } else {
        logAction('user_registration_error', 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Registration failed',
        }))
      }
    }
  },

  // Alias methods for route compatibility
  signUp: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return authController.register(req, res, params, body, user)
  },
  signIn: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return authController.login(req, res, params, body, user)
  },
}
