import { IncomingMessage, ServerResponse } from 'http'
import { z, ZodSchema } from 'zod'
import { sendValidationError } from '../utils/response.helper.js'
import { parseBody, parseQuery, parseParams } from '../utils/request.helper.js'
import type { RequestBody } from '../types/express/index.js'

import { logAction } from '../services/logger.service.js'

interface ValidationConfig {
  body?: ZodSchema
  query?: ZodSchema
  params?: ZodSchema
}

type MiddlewareHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) => Promise<void>

/**
 * Body validation middleware
 */
export const validateBody = (schema: ZodSchema): MiddlewareHandler => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ): Promise<void> => {
    try {
      const body = await parseBody(req) as RequestBody
      const validatedData = schema.parse(body)
      
      // Add validated data to request
      ;(req as { validatedBody?: unknown }).validatedBody = validatedData
      
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid request body')
      }
      return sendValidationError(res, [], 'Failed to parse request body')
    }
  }
}

/**
 * Query validation middleware
 */
export const validateQuery = (schema: ZodSchema): MiddlewareHandler => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ): Promise<void> => {
    try {
      const query = parseQuery(req.url || '')
      const validatedData = schema.parse(query)
      
      // Add validated data to request
      ;(req as { validatedQuery?: unknown }).validatedQuery = validatedData
      
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid query parameters')
      }
      return sendValidationError(res, [], 'Failed to parse query parameters')
    }
  }
}

/**
 * Params validation middleware
 */
export const validateParams = (schema: ZodSchema, pathPattern: string): MiddlewareHandler => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ): Promise<void> => {
    try {
      const params = parseParams(req.url || '', pathPattern)
      const validatedData = schema.parse(params)
      
      // Add validated data to request
      ;(req as { validatedParams?: unknown }).validatedParams = validatedData
      
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid path parameters')
      }
      return sendValidationError(res, [], 'Failed to parse path parameters')
    }
  }
}

/**
 * Headers validation middleware
 */
export const validateHeaders = (schema: ZodSchema): MiddlewareHandler => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ): Promise<void> => {
    try {
      const headers = req.headers as Record<string, string>
      const validatedData = schema.parse(headers)
      
      // Add validated data to request
      ;(req as { validatedHeaders?: unknown }).validatedHeaders = validatedData
      
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid headers')
      }
      return sendValidationError(res, [], 'Failed to parse headers')
    }
  }
}

/**
 * Content-Type validation middleware
 */
export const validateContentType = (allowedTypes: string[]): MiddlewareHandler => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ): Promise<void> => {
    const contentType = req.headers['content-type'] || ''
    
    const isValid = allowedTypes.some(type => 
      contentType.includes(type)
    )
    
    if (!isValid) {
      return sendValidationError(res, [], `Content-Type must be one of: ${allowedTypes.join(', ')}`)
    }
    
    next()
  }
}

/**
 * File size validation middleware
 */
export const validateFileSize = (maxSize: number): MiddlewareHandler => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ): Promise<void> => {
    const contentLength = parseInt(req.headers['content-length'] || '0', 10)
    
    if (contentLength > maxSize) {
      return sendValidationError(res, [], `File size exceeds maximum allowed size of ${maxSize} bytes`)
    }
    
    next()
  }
}

/**
 * Rate limiting validation middleware (basic implementation)
 */
export const validateRateLimit = (maxRequests: number, windowMs: number): MiddlewareHandler => {
  const requests = new Map<string, { count: number; resetTime: number }>()
  
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ): Promise<void> => {
    const ip = req.socket.remoteAddress || 'unknown'
    const now = Date.now()
    
    const userRequests = requests.get(ip)
    
    if (!userRequests || now > userRequests.resetTime) {
      requests.set(ip, { count: 1, resetTime: now + windowMs })
    } else if (userRequests.count >= maxRequests) {
      return sendValidationError(res, [], 'Rate limit exceeded')
    } else {
      userRequests.count++
    }
    
    next()
  }
}

export const createValidationMiddleware = (config: ValidationConfig) => {
  return async (req: IncomingMessage, res: ServerResponse, next: () => void): Promise<void> => {
    try {
      // Validate body if schema provided
      if (config.body && req.method !== 'GET' && req.method !== 'DELETE') {
        const body = await parseBody(req)
        const validatedBody = config.body.parse(body)
        
        // Attach validated body to request
        ;(req as any).body = validatedBody
      }

      // Validate query parameters if schema provided
      if (config.query && req.url) {
        const query = parseQuery(req.url)
        const validatedQuery = config.query.parse(query)
        
        // Attach validated query to request
        ;(req as any).query = validatedQuery
      }

      // Validate URL parameters if schema provided
      if (config.params) {
        // URL parameters would be extracted by the router
        // For now, we'll assume they're attached to req.params
        const params = (req as any).params || {}
        const validatedParams = config.params.parse(params)
        
        // Attach validated params to request
        ;(req as any).params = validatedParams
      }

      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        logAction('validation_error', 'system', {
          url: req.url,
          method: req.method,
          errors: error.errors,
        })

        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Validation error',
          details: error.errors,
        }))
      } else {
        logAction('validation_middleware_error', 'system', {
          url: req.url,
          method: req.method,
          error: error instanceof Error ? error.message : 'Unknown error',
        })

        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Validation middleware error',
        }))
      }
    }
  }
}

// Common validation schemas
export const commonSchemas = {
  pagination: z.object({
    page: z.string().optional().transform(val => parseInt(val || '1')),
    limit: z.string().optional().transform(val => parseInt(val || '10')),
  }),
  
  idParam: z.object({
    id: z.string().uuid(),
  }),
  
  email: z.string().email(),
  
  password: z.string().min(8).max(128),
} 