import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'

import { todoService } from '../services/todo.service.js'
import { logAction } from '../services/logger.service.js'

const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.string().optional(),
})

const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.string().optional(),
})

export const todoController = {
  /**
   * Get all todos for current user
   */
  async getAllTodos(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const todos = await todoService.getAllTodos(user.id, user.tenant_id)

      logAction('todos_requested', user.id, {
        count: todos.length,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: todos,
        count: todos.length,
      }))
    } catch (error) {
      logAction('todos_error', user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get todo by ID
   */
  async getTodoById(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Todo ID is required',
        }))
        return
      }

      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const todo = await todoService.getTodoById(Number(id))

      if (!todo) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Todo not found',
        }))
        return
      }

      logAction('todo_requested', user.id, {
        todoId: id,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: todo,
      }))
    } catch (error) {
      logAction('todo_error', user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Create todo
   */
  async createTodo(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const validatedData = createTodoSchema.parse(body)
      const todoPayload = {
        task: validatedData.title,
        is_completed: validatedData.completed,
        priority: validatedData.priority,
        description: validatedData.description,
        due_date: validatedData.dueDate,
      }
      const todo = await todoService.createTodo(todoPayload)

      logAction('todo_created', user.id, {
        todoTitle: validatedData.title,
        priority: validatedData.priority,
      })

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: todo,
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid todo data',
          details: error.errors,
        }))
      } else {
        logAction('todo_create_error', user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Update todo
   */
  async updateTodo(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Todo ID is required',
        }))
        return
      }

      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const validatedData = updateTodoSchema.parse(body)
      const updatePayload: Record<string, unknown> = {}
      if (validatedData.title !== undefined) updatePayload.task = validatedData.title
      if (validatedData.completed !== undefined) updatePayload.is_completed = validatedData.completed
      if (validatedData.priority !== undefined) updatePayload.priority = validatedData.priority
      if (validatedData.description !== undefined) updatePayload.description = validatedData.description
      if (validatedData.dueDate !== undefined) updatePayload.due_date = validatedData.dueDate
      const todo = await todoService.updateTodo(Number(id), updatePayload)

      if (!todo) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Todo not found',
        }))
        return
      }

      logAction('todo_updated', user.id, {
        todoId: id,
        updates: validatedData,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: todo,
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid todo data',
          details: error.errors,
        }))
      } else {
        logAction('todo_update_error', user?.id || 'anonymous', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw error
      }
    }
  },

  /**
   * Delete todo
   */
  async deleteTodo(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Todo ID is required',
        }))
        return
      }

      if (!user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const deleted = await todoService.deleteTodo(Number(id))

      if (!deleted) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Todo not found',
        }))
        return
      }

      logAction('todo_deleted', user.id, {
        todoId: id,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        message: 'Todo deleted successfully',
      }))
    } catch (error) {
      logAction('todo_delete_error', user?.id || 'anonymous', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },
}
