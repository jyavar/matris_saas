import { IncomingMessage, ServerResponse } from 'http'
import { ZodError } from 'zod'

import { logAction } from '../services/logger.service.js'
import { sendError, sendValidationError } from '../utils/response.helper.js'

type MiddlewareHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void
) => Promise<void>

/**
 * Global error handler middleware for Node.js native HTTP
 */
export const errorHandlerMiddleware = async (
  error: Error,
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void
): Promise<void> => {
  try {
    // Log the error
    logAction('error_handler', 'system', {
      error: (error as Error).message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.socket.remoteAddress,
    })

    // Handle different types of errors
    if (error instanceof ZodError) {
      return sendValidationError(res, error.errors, 'Validation failed')
    }

    if (error instanceof ApiError) {
      return sendError(res, (error as Error).message, error.statusCode)
    }

    // Handle database errors
    if ((error as Error).message.includes('duplicate key') || (error as Error).message.includes('unique constraint')) {
      return sendError(res, 'Resource already exists', 409)
    }

    if ((error as Error).message.includes('foreign key constraint')) {
      return sendError(res, 'Referenced resource not found', 400)
    }

    // Handle network errors
    if ((error as Error).message.includes('ECONNREFUSED') || (error as Error).message.includes('ENOTFOUND')) {
      return sendError(res, 'Service temporarily unavailable', 503)
    }

    // Handle timeout errors
    if ((error as Error).message.includes('timeout') || (error as Error).message.includes('ETIMEDOUT')) {
      return sendError(res, 'Request timeout', 408)
    }

    // Default error response
    const statusCode = 500
    const message = process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : (error as Error).message

    return sendError(res, message, statusCode)
  } catch (handlerError) {
    // If error handler itself fails, send a basic error response
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    }))
  }
}

/**
 * Async error wrapper for route handlers
 */
export const handleAsync = (fn: (req: IncomingMessage, res: ServerResponse) => Promise<void>) => {
  return async(req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      await fn(req, res)
    } catch {
      await errorHandlerMiddleware(error as Error, req, res, () => {})
    }
  }
}

/**
 * Not found handler for unmatched routes
 */
export const notFoundHandler: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void
): Promise<void> => {
  logAction('route_not_found', 'anonymous', {
    url: req.url,
    method: req.method,
    ip: req.socket.remoteAddress,
  })

  return sendError(res, 'Route not found', 404)
}

/**
 * Method not allowed handler
 */
export const methodNotAllowedHandler: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void
): Promise<void> => {
  logAction('method_not_allowed', 'anonymous', {
    url: req.url,
    method: req.method,
    ip: req.socket.remoteAddress,
  })

  res.writeHead(405, { 
    'Content-Type': 'application/json',
    'Allow': 'GET, POST, PUT, DELETE, PATCH'
  })
  res.end(JSON.stringify({
    success: false,
    error: 'Method not allowed',
    timestamp: new Date().toISOString(),
  }))
}
