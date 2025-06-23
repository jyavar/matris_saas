import { NextFunction, Request, Response } from 'express'

import { createUserSchema, updateUserSchema } from '../lib/schemas.js'
import { usersService } from '../services/users.service.js'

export const usersController = {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      // The user object is attached by the authMiddleware
      res.json(req.user)
    } catch (error) {
      next(error)
    }
  },

  async getAllUserss(req: Request, res: Response, next: NextFunction) {
    try {
      const userss = await usersService.getAllUserss()
      res.json(userss)
    } catch (error) {
      next(error)
    }
  },

  async getUsersById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const users = await usersService.getUsersById(id)
      res.json(users)
    } catch (error) {
      next(error)
    }
  },

  async createUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedUsers = createUserSchema.parse(req.body)
      const newUsers = await usersService.createUsers({
        ...validatedUsers,
        username: validatedUsers.username,
        email: validatedUsers.email,
      })
      res.status(201).json(newUsers)
    } catch (error) {
      next(error)
    }
  },

  async updateUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const validatedUsers = updateUserSchema.parse(req.body)
      const updatedUsers = await usersService.updateUsers(id, validatedUsers)
      res.json(updatedUsers)
    } catch (error) {
      next(error)
    }
  },

  async deleteUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await usersService.deleteUsers(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}
