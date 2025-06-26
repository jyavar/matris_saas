import { NextFunction, Request, Response } from 'express'

import { authSchema } from '../lib/schemas.js'
import { authService } from '../services/auth.service.js'
import { logAction } from '../services/logger.service.js'
import { ApiError } from '../utils/ApiError.js'

export const authController = {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedCredentials = authSchema.parse(req.body)
      const { user } = await authService.signUp(validatedCredentials)
      logAction('auth_signup_success', user.email, { userId: user.id })
      res.status(201).json(user)
    } catch (error) {
      logAction('auth_signup_error', req.body.email || 'unknown', {
        error: error.message,
      })
      next(error)
    }
  },

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedCredentials = authSchema.parse(req.body)
      const { user, session } = await authService.signIn(validatedCredentials)

      if (!session) {
        throw new ApiError(401, 'Invalid credentials')
      }

      logAction('auth_signin_success', user.email, { userId: user.id })
      res.status(200).json({
        user,
        access_token: session.access_token,
      })
    } catch (error) {
      logAction('auth_signin_error', req.body.email || 'unknown', {
        error: error.message,
      })
      next(error)
    }
  },
}
