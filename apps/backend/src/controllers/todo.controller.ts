import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { logAction } from '../services/logger.service.js'
import { todoService } from '../services/todo.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { sendCreated, sendError, sendSuccess, sendValidationError } from '../utils/response.helper.js'
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
  async getAllTodos(req: IncomingMessage, res: ServerResponse, user?: AuthenticatedUser, _user?: AuthenticatedUser): Promise<void> {
    try {
      if (!_user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const todos = await todoService.getAllTodos(_user?.id, user?.tenant_id || '')

      logAction('todos_requested', _user?.id, {
        count: todos.length,
      })

      return sendSuccess(res, todos)
    } catch (error) {
      logAction('todos_error', _user?.id || 'anonymous', {
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      throw error
    }
  },

  /**
   * Get todo by ID
   */
  async getTodoById(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _user?: AuthenticatedUser): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Todo ID is required',
        }))
        return
      }

      if (!_user?.id) {
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

      logAction('todo_requested', _user?.id, {
        todoId: id,
      })

      return sendSuccess(res, todo)
    } catch (error) {
      logAction('todo_error', _user?.id || 'anonymous', {
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      throw error
    }
  },

  /**
   * Create todo
   */
  async createTodo(req: IncomingMessage, res: ServerResponse, _body?: RequestBody, user?: AuthenticatedUser, _user?: AuthenticatedUser): Promise<void> {
    try {
      if (!_user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const validatedData = createTodoSchema.parse(_body)
      const todoPayload = {
        task: validatedData.title,
        is_completed: validatedData.completed,
        priority: validatedData.priority,
        description: validatedData.description,
        due_date: validatedData.dueDate,
      }
      const todo = await todoService.createTodo(todoPayload)

      logAction('todo_created', _user?.id, {
        todoTitle: validatedData.title,
        priority: validatedData.priority,
      })

      return sendCreated(res, todo)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid todo data')
      } else {
        logAction('todo_create_error', _user?.id || 'anonymous', {
          error: (error instanceof Error ? error.message : 'Unknown error'),
        })
        throw error
      }
    }
  },

  /**
   * Update todo
   */
  async updateTodo(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, __body?: RequestBody, _user?: AuthenticatedUser): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Todo ID is required',
        }))
        return
      }

      if (!_user?.id) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'User not authenticated',
        }))
        return
      }

      const validatedData = updateTodoSchema.parse(__body)
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

      logAction('todo_updated', _user?.id, {
        todoId: id,
        updates: validatedData,
      })

      return sendSuccess(res, todo)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid todo data')
      } else {
        logAction('todo_update_error', _user?.id || 'anonymous', {
          error: (error instanceof Error ? error.message : 'Unknown error'),
        })
        throw error
      }
    }
  },

  /**
   * Delete todo
   */
  async deleteTodo(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _user?: AuthenticatedUser): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Todo ID is required',
        }))
        return
      }

      if (!_user?.id) {
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

      logAction('todo_deleted', _user?.id, {
        todoId: id,
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        message: 'Todo deleted successfully',
      }))
    } catch (error) {
      logAction('todo_delete_error', _user?.id || 'anonymous', {
        error: (error instanceof Error ? error.message : 'Unknown error'),
      })
      throw error
    }
  },
}
