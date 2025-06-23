import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { authService } from '../services/auth.service.js'

const createAuthSchema = z.object({
  task: z.string(),
  is_completed: z.boolean().optional(),
})

const updateAuthSchema = z.object({
  task: z.string().optional(),
  is_completed: z.boolean().optional(),
})

export const authController = {
  async getAllAuths(req: Request, res: Response, next: NextFunction) {
    try {
      const auths = await authService.getAllAuths()
      res.json(auths)
    } catch (error) {
      next(error)
    }
  },

  async getAuthById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const auth = await authService.getAuthById(id)
      res.json(auth)
    } catch (error) {
      next(error)
    }
  },

  async createAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedAuth = createAuthSchema.parse(req.body)
      const newAuth = await authService.createAuth(validatedAuth)
      res.status(201).json(newAuth)
    } catch (error) {
      next(error)
    }
  },

  async updateAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const validatedAuth = updateAuthSchema.parse(req.body)
      const updatedAuth = await authService.updateAuth(id, validatedAuth)
      res.json(updatedAuth)
    } catch (error) {
      next(error)
    }
  },

  async deleteAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await authService.deleteAuth(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}
