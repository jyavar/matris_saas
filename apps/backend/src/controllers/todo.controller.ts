import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'

import type { Database, TablesInsert } from '../../../../supabase.types'
import { numericIdParamSchema } from '../lib/schemas.js'
import { todoService } from '../services/todo.service.js'
import { ApiError } from '../utils/ApiError.js'

const createTodoSchema = z.object({
  task: z.string().min(1, 'Task is required'),
  is_completed: z.boolean().optional(),
})

const updateTodoSchema = z.object({
  task: z.string().optional(),
  is_completed: z.boolean().optional(),
})

export const todoController = {
  async getAllTodos(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const userId = req.user.id
      const tenantId = req.user.tenant_id
      const todos = await todoService.getAllTodos(userId, tenantId)
      res.json({ todos })
    } catch (error) {
      next(error)
    }
  },

  async getTodoById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = numericIdParamSchema.parse(req.params)
      const userId = req.user.id
      const tenantId = req.user.tenant_id
      const todo = (await todoService.getTodoById(Number(id))) as
        | Database['public']['Tables']['todos']['Row']
        | null
      if (!todo || todo.user_id !== userId || todo.tenant_id !== tenantId) {
        throw new ApiError(404, 'Todo not found')
      }
      res.json(todo)
    } catch (error) {
      next(error)
    }
  },

  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      let validatedTodo
      try {
        validatedTodo = createTodoSchema.parse(req.body)
      } catch (zodError) {
        if (zodError instanceof ZodError) {
          throw new ApiError(
            400,
            zodError.errors?.[0]?.message || 'Invalid todo data',
          )
        }
        throw zodError
      }
      const newTodo = await todoService.createTodo({
        ...validatedTodo,
        task: validatedTodo.task,
        user_id: req.user.id,
        tenant_id: req.user.tenant_id,
      } as TablesInsert<'todos'>)
      res.status(201).json(newTodo)
    } catch (error) {
      next(error)
    }
  },

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = numericIdParamSchema.parse(req.params)
      const userId = req.user.id
      const tenantId = req.user.tenant_id
      const todo = (await todoService.getTodoById(Number(id))) as
        | Database['public']['Tables']['todos']['Row']
        | null
      if (!todo || todo.user_id !== userId || todo.tenant_id !== tenantId) {
        throw new ApiError(404, 'Todo not found')
      }
      const validatedTodo = updateTodoSchema.parse(req.body)
      const updatedTodo = await todoService.updateTodo(
        Number(id),
        validatedTodo,
      )
      res.json(updatedTodo)
    } catch (error) {
      next(error)
    }
  },

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = numericIdParamSchema.parse(req.params)
      const userId = req.user.id
      const tenantId = req.user.tenant_id
      const todo = (await todoService.getTodoById(Number(id))) as
        | Database['public']['Tables']['todos']['Row']
        | null
      if (!todo || todo.user_id !== userId || todo.tenant_id !== tenantId) {
        throw new ApiError(404, 'Todo not found')
      }
      await todoService.deleteTodo(Number(id))
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
}
