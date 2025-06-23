import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { todoService } from '../services/todo.service.js'

const createTodoSchema = z.object({
  task: z.string(),
  is_completed: z.boolean().optional(),
})

const updateTodoSchema = z.object({
  task: z.string().optional(),
  is_completed: z.boolean().optional(),
})

export const todoController = {
  async getAllTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoService.getAllTodos()
      res.json(todos)
    } catch (error) {
      next(error)
    }
  },

  async getTodoById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const todo = await todoService.getTodoById(id)
      res.json(todo)
    } catch (error) {
      next(error)
    }
  },

  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedTodo = createTodoSchema.parse(req.body)
      const newTodo = await todoService.createTodo({
        ...validatedTodo,
        task: validatedTodo.task,
      })
      res.status(201).json(newTodo)
    } catch (error) {
      next(error)
    }
  },

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const validatedTodo = updateTodoSchema.parse(req.body)
      const updatedTodo = await todoService.updateTodo(id, validatedTodo)
      res.json(updatedTodo)
    } catch (error) {
      next(error)
    }
  },

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await todoService.deleteTodo(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}
