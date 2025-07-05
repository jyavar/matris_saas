import { IncomingMessage, ServerResponse } from 'http'

import { logAction } from '../services/logger.service.js'

type MiddlewareHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) => Promise<void>

/**
 * Request logging middleware for Node.js native HTTP
 */
export const loggerMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): Promise<void> => {
  const startTime = Date.now()
  const requestId = generateRequestId()

  // Log request start
  logAction('request_start', 'anonymous', {
    request_id: requestId,
    method: req.method,
    url: req.url,
    ip: req.socket.remoteAddress,
    user_agent: req.headers['user-agent'],
    timestamp: new Date().toISOString(),
  })

  // Override res.end to log response
  const originalEnd = res.end
  res.end = function(chunk?: unknown, encoding?: BufferEncoding | (() => void), cb?: () => void) {
    const duration = Date.now() - startTime
    const statusCode = res.statusCode

    // Log request completion
    logAction('request_end', 'anonymous', {
      request_id: requestId,
      method: req.method,
      url: req.url,
      status_code: statusCode,
      duration,
      ip: req.socket.remoteAddress,
      timestamp: new Date().toISOString(),
    })

    // Call original end method
    return originalEnd.call(this, chunk, typeof encoding === 'string' ? encoding : undefined, typeof encoding === 'function' ? encoding : cb)
  }

  next()
}

/**
 * Performance logging middleware
 */
export const performanceMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): Promise<void> => {
  const startTime = Date.now()
  const requestId = generateRequestId()

  // Log performance start
  logAction('performance_start', 'anonymous', {
    request_id: requestId,
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  })

  // Override res.end to log performance
  const originalEnd = res.end
  res.end = function(chunk?: unknown, encoding?: BufferEncoding | (() => void), cb?: () => void) {
    const duration = Date.now() - startTime

    // Log slow requests (>1 second)
    if (duration > 1000) {
      logAction('slow_request', 'anonymous', {
        request_id: requestId,
        method: req.method,
        url: req.url,
        duration,
        threshold: 1000,
        timestamp: new Date().toISOString(),
      })
    }

    // Call original end method
    return originalEnd.call(this, chunk, typeof encoding === 'string' ? encoding : undefined, typeof encoding === 'function' ? encoding : cb)
  }

  next()
}

/**
 * Security logging middleware
 */
export const securityMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): Promise<void> => {
  const ip = req.socket.remoteAddress
  const userAgent = req.headers['user-agent']

  // Log suspicious requests
  if (isSuspiciousRequest(req)) {
    logAction('suspicious_request', 'anonymous', {
      ip,
      user_agent: userAgent,
      url: req.url,
      method: req.method,
      reason: 'Suspicious pattern detected',
      timestamp: new Date().toISOString(),
    })
  }

  // Log authentication attempts
  if (req.headers.authorization) {
    logAction('auth_attempt', 'anonymous', {
      ip,
      user_agent: userAgent,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString(),
    })
  }

  next()
}

/**
 * Error logging middleware
 */
export const errorLoggingMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): Promise<void> => {
  const originalEnd = res.end
  res.end = function(chunk?: unknown, encoding?: BufferEncoding | (() => void), cb?: () => void) {
    // Log errors (4xx and 5xx status codes)
    if (res.statusCode >= 400) {
      logAction('request_error', 'anonymous', {
        method: req.method,
        url: req.url,
        status_code: res.statusCode,
        ip: req.socket.remoteAddress,
        user_agent: req.headers['user-agent'],
        timestamp: new Date().toISOString(),
      })
    }

    return originalEnd.call(this, chunk, typeof encoding === 'string' ? encoding : undefined, typeof encoding === 'function' ? encoding : cb)
  }

  next()
}

// Helper functions
const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

const isSuspiciousRequest = (req: IncomingMessage): boolean => {
  const url = req.url || ''
  const userAgent = req.headers['user-agent'] || ''

  // Check for common attack patterns
  const suspiciousPatterns = [
    /\.\.\//, // Directory traversal
    /<script/i, // XSS attempts
    /union\s+select/i, // SQL injection
    /eval\s*\(/i, // Code injection
    /javascript:/i, // Protocol injection
  ]

  return suspiciousPatterns.some(pattern => 
    pattern.test(url) || pattern.test(userAgent)
  )
}
