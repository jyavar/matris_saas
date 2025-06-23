import { NextFunction, Request, Response } from 'express'

import { authService } from '../services/auth.service.js'
import { createUsersSchema } from './users.controller.js'

export const authController = {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedCredentials = createUsersSchema.parse(req.body)
      const data = await authService.signUp(validatedCredentials)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  },

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedCredentials = createUsersSchema.parse(req.body)
      const data = await authService.signIn(validatedCredentials)
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
}
