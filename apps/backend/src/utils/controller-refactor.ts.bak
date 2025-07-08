/**
 * Controller Refactor Utility
 * Converts controllers from Express-style to STRATO ControllerHandler pattern
 */

import { ServerResponse } from 'http'

import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { ControllerHandler } from '../types/express/index.js'

/**
 * Base controller wrapper that provides consistent error handling and response formatting
 */
export function createControllerMethod(
  handler: (_params?: Record<string, string>, _body?: RequestBody, _user?: AuthenticatedUser) => Promise<unknown>
): ControllerHandler {
  return async (_req, res, _params, _body, _user) => {
    try {
      const result = await handler(_params, _body, _user)
      
      if (result && result.status) {
        // Handle custom status responses
        res.writeHead((result as any).status, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: (result as any).status < 400,
          ...(result as any).data
        }))
      } else {
        // Default success response
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: result || {}
        }))
      }
    } catch (error) {
      // Consistent error handling
      const errorMessage = (error instanceof Error ? error.message : 'Internal server error')
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: errorMessage
      }))
    }
  }
}

/**
 * Quick migration helper for simple controllers
 */
export function migrateController(controller: Record<string, unknown>): Record<string, ControllerHandler> {
  const migrated: Record<string, ControllerHandler> = {}
  
  for (const [key, method] of Object.entries(controller)) {
    if (typeof method === 'function') {
      migrated[key] = createControllerMethod(async (_params, _body, _user) => {
        // Simple migration - returns empty object for now
        return {}
      })
    }
  }
  
  return migrated
}

/**
 * Response helpers that match STRATO patterns
 */
export const responseHelpers = {
  success: (res: ServerResponse, data: unknown = {}, status: number = 200) => {
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true, data }))
  },
  
  error: (res: ServerResponse, message: string, status: number = 500) => {
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: message }))
  },
  
  notFound: (res: ServerResponse, message: string = 'Resource not found') => {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: message }))
  },
  
  badRequest: (res: ServerResponse, message: string = 'Bad request') => {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: message }))
  },
  
  unauthorized: (res: ServerResponse, message: string = 'Unauthorized') => {
    res.writeHead(401, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: message }))
  }
}