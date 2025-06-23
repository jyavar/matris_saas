import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { usersService } from '../services/users.service.js'

const createUsersSchema = z.object({
  username: z.string(),
  email: z.string().email(),
})

const updateUsersSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
})

export const usersController = {
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
      const validatedUsers = createUsersSchema.parse(req.body)
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
      const validatedUsers = updateUsersSchema.parse(req.body)
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
