import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import {
  createTaskSchema,
  todoIdParamSchema,
  updateTaskSchema,
} from '../lib/schemas.js'
import { type TodoDTO, todoService } from '../services/todo.service.js'
import type { Database, TablesInsert } from '../types/supabase.types.js'
import { ApiError } from '../utils/ApiError.js'

export const todoController = {
  async getAllTodos(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const userId = req.user.id
      const tenantId = req.user.tenant_id
      let todos: TodoDTO[] = []
      try {
        todos = await todoService.getAllTodos(userId, tenantId)
      } catch (error) {
        if (
          error instanceof ApiError &&
          (error.statusCode === 404 || error.statusCode === 400)
        ) {
          todos = []
        } else {
          throw error
        }
      }
      res.status(200).json({ todos })
    } catch (error) {
      next(error)
    }
  },

  async getTodoById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new ApiError(401, 'User not authenticated')
      const { id } = todoIdParamSchema.parse(req.params)
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
        validatedTodo = createTaskSchema.parse(req.body)
      } catch (zodError) {
        if (zodError instanceof ZodError) {
          throw new ApiError(
            400,
            zodError.errors?.[0]?.message || 'Invalid task data',
          )
        }
        throw zodError
      }
      const newTodo = await todoService.createTodo({
        ...validatedTodo,
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
      const { id } = todoIdParamSchema.parse(req.params)
      const userId = req.user.id
      const tenantId = req.user.tenant_id
      const todo = (await todoService.getTodoById(Number(id))) as
        | Database['public']['Tables']['todos']['Row']
        | null
      if (!todo || todo.user_id !== userId || todo.tenant_id !== tenantId) {
        throw new ApiError(404, 'Todo not found')
      }
      let validatedTodo
      try {
        validatedTodo = updateTaskSchema.parse(req.body)
      } catch (zodError) {
        if (zodError instanceof ZodError) {
          throw new ApiError(
            400,
            zodError.errors?.[0]?.message || 'Invalid task data',
          )
        }
        throw zodError
      }
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
      const { id } = todoIdParamSchema.parse(req.params)
      const userId = req.user.id
      const tenantId = req.user.tenant_id
      let todo: Database['public']['Tables']['todos']['Row'] | null = null
      try {
        todo = (await todoService.getTodoById(Number(id))) as
          | Database['public']['Tables']['todos']['Row']
          | null
      } catch (error) {
        if (error instanceof ApiError && error.statusCode === 400) {
          throw new ApiError(404, 'Todo not found')
        } else {
          throw error
        }
      }
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
