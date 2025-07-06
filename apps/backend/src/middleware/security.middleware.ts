import { IncomingMessage, ServerResponse } from 'http'
import { TLSSocket } from 'tls'

import { MiddlewareHandler } from '../types/express/index.js'

/**
 * Security headers middleware for STRATO Core OS™
 * Implements essential security headers to protect against common attacks
 */
export const securityHeadersMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void
): Promise<void> => {
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://cdn.posthog.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' https:; " +
    "connect-src 'self' https: wss:; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'"
  )

  // Prevent clickjacking attacks
  res.setHeader('X-Frame-Options', 'DENY')

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff')

  // XSS Protection (legacy but still useful)
  res.setHeader('X-XSS-Protection', '1; mode=block')

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

  // HTTP Strict Transport Security (HSTS)
  if (req.headers['x-forwarded-proto'] === 'https' || (req.socket as TLSSocket).encrypted) {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  // Permissions Policy (replace Feature-Policy)
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  )

  // Remove potentially revealing headers
  res.removeHeader('X-Powered-By')
  res.removeHeader('Server')

  // Set secure headers for API responses
  res.setHeader('X-API-Version', '1.0')
  res.setHeader('X-Request-ID', req.headers['x-request-id'] || generateRequestId())

  next()
}

/**
 * CSRF Protection middleware
 * Simple CSRF protection for state-changing operations
 */
export const csrfProtectionMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void
): Promise<void> => {
  // Skip CSRF protection for GET, HEAD, OPTIONS requests
  if (req.method && ['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    next()
    return
  }

  // Check for CSRF token in headers
  const csrfToken = req.headers['x-csrf-token'] || req.headers['x-requested-with']
  
  if (!csrfToken) {
    res.writeHead(403, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      success: false,
      error: 'CSRF protection: missing token',
      code: 'CSRF_TOKEN_MISSING'
    }))
    return
  }

  next()
}

/**
 * Content type validation middleware
 * Ensures proper content types for API requests
 */
export const contentTypeValidationMiddleware: MiddlewareHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: () => void
): Promise<void> => {
  // Skip for GET, HEAD, OPTIONS requests
  if (req.method && ['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    next()
    return
  }

  const contentType = req.headers['content-type']
  
  // Require content-type for requests with body
  if (req.method && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
    if (!contentType) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Content-Type header is required',
        code: 'CONTENT_TYPE_MISSING'
      }))
      return
    }

    // Validate content type for JSON APIs
    if (!contentType.includes('application/json')) {
      res.writeHead(415, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: 'Content-Type must be application/json',
        code: 'INVALID_CONTENT_TYPE'
      }))
      return
    }
  }

  next()
}

/**
 * Request size limit middleware
 * Prevents DoS attacks through large payloads
 */
export const requestSizeLimitMiddleware = (maxSize: number = 1024 * 1024): MiddlewareHandler => {
  return async (req: IncomingMessage, res: ServerResponse, _next: () => void): Promise<void> => {
    const contentLength = parseInt(req.headers['content-length'] || '0', 10)
    
    if (contentLength > maxSize) {
      res.writeHead(413, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        error: `Request size too large. Maximum allowed: ${maxSize} bytes`,
        code: 'PAYLOAD_TOO_LARGE'
      }))
      return
    }

    next()
  }
}

/**
 * Generate a unique request ID
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Security middleware collection for easy setup
 */
export const securityMiddlewares = [
  securityHeadersMiddleware,
  contentTypeValidationMiddleware,
  requestSizeLimitMiddleware(1024 * 1024), // 1MB limit
]

/**
 * CSRF-protected middleware collection
 */
export const csrfProtectedMiddlewares = [
  ...securityMiddlewares,
  csrfProtectionMiddleware,
]