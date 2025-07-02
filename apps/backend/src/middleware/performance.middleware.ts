import compression from 'compression'
import cors from 'cors'
import type { NextFunction, Request, Response } from 'express'
import NodeCache from 'node-cache'

// Cache configuration
const cache = new NodeCache({
  stdTTL: 300, // 5 minutes default
  checkperiod: 60, // Check for expired keys every minute
  useClones: false, // Better performance
})

// Compression configuration
const compressionOptions = {
  level: 6, // Balanced compression
  threshold: 1024, // Only compress responses > 1KB
  filter: (req: Request, res: Response) => {
    // Don't compress if client doesn't support it
    if (req.headers['x-no-compression']) {
      return false
    }
    // Use compression for all other requests
    return compression.filter(req, res)
  },
}

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://yourdomain.com']
      : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}

/**
 * Compression middleware
 */
export const compressionMiddleware = compression(compressionOptions)

/**
 * CORS middleware
 */
export const corsMiddleware = cors(corsOptions)

/**
 * Cache middleware for GET requests
 */
export const cacheMiddleware = (duration: number = 300) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next()
    }

    // Skip cache if explicitly requested
    if (req.headers['cache-control'] === 'no-cache') {
      return next()
    }

    const key = `cache:${req.originalUrl}:${req.user?.id || 'anonymous'}`
    const cachedResponse = cache.get(key)

    if (cachedResponse) {
      res.json(cachedResponse)
      return
    }

    // Override res.json to cache the response
    const originalJson = res.json
    res.json = function (data) {
      cache.set(key, data, duration)
      return originalJson.call(this, data)
    }

    next()
  }
}

/**
 * Performance monitoring middleware
 */
export const performanceMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const start = Date.now()

  // Add performance headers before response is sent
  res.setHeader(
    'X-Request-ID',
    req.headers['x-request-id'] || `req_${Date.now()}`,
  )

  // Add response time header after response is sent
  res.on('finish', () => {
    const duration = Date.now() - start
    // Use res.getHeader to check if headers were already sent
    if (!res.headersSent) {
      res.setHeader('X-Response-Time', `${duration}ms`)
    }
  })

  next()
}

/**
 * Memory usage monitoring
 */
export const memoryMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const memUsage = process.memoryUsage()

  // Log memory usage for high-traffic endpoints
  if (
    req.path.includes('/api/analytics') ||
    req.path.includes('/api/reporting')
  ) {
    console.log('Memory usage:', {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
    })
  }

  next()
}

/**
 * Cache utilities for manual cache management
 */
export const cacheUtils = {
  get: (key: string) => cache.get(key),
  set: (key: string, value: unknown, ttl?: number) =>
    cache.set(key, value, ttl),
  del: (key: string) => cache.del(key),
  flush: () => {
    const keys = cache.keys()
    const count = keys.length
    cache.flushAll()
    return count
  },
  stats: () => cache.getStats(),
}

/**
 * Clear cache for specific patterns
 */
export const clearCachePattern = (pattern: string) => {
  const keys = cache.keys()
  const matchingKeys = keys.filter((key) => key.includes(pattern))
  matchingKeys.forEach((key) => cache.del(key))
  return matchingKeys.length
}
