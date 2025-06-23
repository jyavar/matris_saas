import { NextFunction, Request, Response } from 'express'

import { authSchema } from '../lib/schemas.js'
import { authService } from '../services/auth.service.js'
import { ApiError } from '../utils/ApiError.js'

export const authController = {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedCredentials = authSchema.parse(req.body)
      const { user } = await authService.signUp(validatedCredentials)
      res.status(201).json(user)
    } catch (error) {
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

      res.status(200).json({
        user,
        access_token: session.access_token,
      })
    } catch (error) {
      next(error)
    }
  },
}
