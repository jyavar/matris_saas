import { IncomingMessage, ServerResponse} from 'http'
import { z } from 'zod'
import { ZodSchema} from 'zod'

import { logAction} from '../services/logger.service.js'
import type { RequestBody } from '../types/express/index.js'
import { parseBody, parseParams, parseQuery} from '../utils/request.helper.js'
import { sendValidationError} from '../utils/response.helper.js'

// Extended request interface for validation
interface ExtendedRequest extends IncomingMessage {
  _body?: unknown
  query?: Record<string, string>
  _params?: Record<string, string>
  validatedBody?: unknown
  validatedHeaders?: unknown
}

interface ValidationConfig {
  body?: ZodSchema
  query?: ZodSchema
  params?: ZodSchema
}

type MiddlewareHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void
) => Promise<void>

/**
 * Body validation middleware
 */
export const validateBody = (schema: ZodSchema): MiddlewareHandler => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    _next: () => void
  ): Promise<void> => {
    try {
      const body = await parseBody(req) as RequestBody
      const validatedData = schema.parse(body)
      
      // Add validated data to request
      ;(req as ExtendedRequest).validatedBody = validatedData
      
_next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid request body',
          details: error.errors
        }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Internal server error'
        }))
      }
    }
  }
}

/**
 * Query validation middleware
 */
export const validateQuery = (schema: z.ZodSchema): MiddlewareHandler => {
  return async (req: IncomingMessage, res: ServerResponse, _next: () => void): Promise<void> => {
    try {
      const url = req.url || ''
      const queryString = url.split('?')[1] || ''
      const queryParams = new URLSearchParams(queryString)
      const queryObj: Record<string, string> = {}
      
      queryParams.forEach((value, key) => {
        queryObj[key] = value
      })

      schema.parse(queryObj)
_next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid query parameters',
          details: error.errors
        }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Internal server error'
        }))
      }
    }
  }
}

/**
 * Params validation middleware
 */
export const validateParams = (schema: z.ZodSchema): MiddlewareHandler => {
  return async (req: IncomingMessage, res: ServerResponse, _next: () => void) => {
    try {
      const url = req.url || ''
      const pathParams: Record<string, string> = {}
      
      // Extract path parameters from URL
      const pathSegments = url.split('/')
      const routeSegments = req.url?.split('/') || []
      
      // Simple parameter extraction - this could be enhanced
      for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i]?.startsWith(':')) {
          const paramName = routeSegments[i]?.substring(1)
          if (paramName && pathSegments[i]) {
            pathParams[paramName] = pathSegments[i] || ''
          }
        }
      }

      schema.parse(pathParams)
_next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid path parameters',
          details: error.errors
        }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'Validation error'
        }))
      }
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
    _next: () => void
  ): Promise<void> => {
    try {
      const headers = req.headers as Record<string, string>
      const validatedData = schema.parse(headers)
      
      // Add validated data to request
      ;(req as ExtendedRequest).validatedHeaders = validatedData
      
_next()
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
    _next: () => void
  ): Promise<void> => {
    const contentType = req.headers['content-type'] || ''
    
    const isValid = allowedTypes.some(type => 
      contentType.includes(type)
    )
    
    if (!isValid) {
      return sendValidationError(res, [], `Content-Type must be one of: ${allowedTypes.join(', ')}`)
    }
    
    _next()
  }
}

/**
 * File size validation middleware
 */
export const validateFileSize = (maxSize: number): MiddlewareHandler => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    _next: () => void
  ): Promise<void> => {
    const contentLength = parseInt(req.headers['content-length'] || '0', 10)
    
    if (contentLength > maxSize) {
      return sendValidationError(res, [], `File size exceeds maximum allowed size of ${maxSize} bytes`)
    }
    
    _next()
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
    _next: () => void
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
    
    _next()
  }
}

export const createValidationMiddleware = (config: ValidationConfig) => {
  return async (req: IncomingMessage, res: ServerResponse, _next: () => void): Promise<void> => {
    try {
      // Validate body if schema provided
      if (config.body && req.method !== 'GET' && req.method !== 'DELETE') {
        const body = await parseBody(req)
        const validatedBody = config.body.parse(body)
        
        // Attach validated body to request
        ;(req as ExtendedRequest)._body = validatedBody
      }

      // Validate query parameters if schema provided
      if (config.query && req.url) {
        const query = parseQuery(req.url)
        const validatedQuery = config.query.parse(query)
        
        // Attach validated query to request
        ;(req as ExtendedRequest).query = validatedQuery
      }

      // Validate URL parameters if schema provided
      if (config.params) {
        // URL parameters would be extracted by the router
        // For now, we'll assume they're attached to req.params
        const params = (req as ExtendedRequest)._params || {}
        const validatedParams = config.params.parse(params)
        
        // Attach validated params to request
        ;(req as ExtendedRequest)._params = validatedParams
      }

_next()
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
          error: (error instanceof Error ? error.message : 'Unknown error'),
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