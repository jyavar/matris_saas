import { IncomingMessage, ServerResponse } from 'http'

import { logAction } from '../services/logger.service.js'

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message?: string
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

const getClientIp = (req: IncomingMessage): string => {
  const forwarded = req.headers['x-forwarded-for']
  const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return Array.isArray(ip) ? ip[0] : ip || 'unknown'
}

const cleanupExpiredEntries = (): void => {
  const now = Date.now()
  Object.keys(store).forEach(key => {
    if (store[key] && store[key].resetTime < now) {
      delete store[key]
    }
  })
}

// Clean up expired entries every minute
setInterval(cleanupExpiredEntries, 60000)

export const createRateLimit = (config: RateLimitConfig) => {
  return (req: IncomingMessage, res: ServerResponse, _next: () => void): void => {
    const clientKey = getClientIp(req)
    const now = Date.now()

    // Clean up expired entries
    if (store[clientKey] && store[clientKey].resetTime < now) {
      delete store[clientKey]
    }

    // Initialize or get current rate limit data
    if (!store[clientKey]) {
      store[clientKey] = {
        count: 0,
        resetTime: now + config.windowMs,
      }
    }

    // Check if limit exceeded
    if (store[clientKey].count >= config.maxRequests) {
      logAction('rate_limit_exceeded', 'system', {
        ip: clientKey,
        method: req.method,
        url: req.url,
        limit: config.maxRequests,
        windowMs: config.windowMs,
      })

      res.writeHead(429, {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': config.maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(store[clientKey].resetTime).toISOString(),
        'Retry-After': Math.ceil(config.windowMs / 1000).toString(),
      })

      res.end(JSON.stringify({
        success: false,
        error: config.message || 'Too many requests',
        retryAfter: Math.ceil(config.windowMs / 1000),
      }))
      return
    }

    // Increment counter
    store[clientKey].count++

    // Add rate limit headers
    res.setHeader('X-RateLimit-Limit', config.maxRequests.toString())
    res.setHeader('X-RateLimit-Remaining', (config.maxRequests - store[clientKey].count).toString())
    res.setHeader('X-RateLimit-Reset', new Date(store[clientKey].resetTime).toISOString())

    _next()
  }
}

// Predefined rate limit configurations
export const standardRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  message: 'Too many requests from this IP',
})

export const strictRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
  message: 'Too many requests from this IP',
})

export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10,
  message: 'Too many authentication attempts',
})
