import { IncomingMessage, ServerResponse } from 'http'
import NodeCache from 'node-cache'
import { createDeflate,createGzip } from 'zlib'

import { logAction } from '../services/logger.service.js'

// Extended request interface for performance middleware
interface ExtendedRequest extends IncomingMessage {
  user?: { id: string }
}

// Cache configuration
const cache = new NodeCache({
  stdTTL: 300, // 5 minutes default
  checkperiod: 60, // Check for expired keys every minute
  useClones: false, // Better performance
})

/**
 * Compression middleware for Node.js native
 */
export const compressionMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void => {
  // Don't compress if client doesn't support it
  if (req.headers['x-no-compression']) {
    next()
    return
  }

  const acceptEncoding = req.headers['accept-encoding'] || ''
  
  if (acceptEncoding.includes('gzip')) {
    res.setHeader('Content-Encoding', 'gzip')
    const gzip = createGzip()
    res.write = gzip.write.bind(gzip)
    res.end = gzip.end.bind(gzip)
    gzip.pipe(res)
  } else if (acceptEncoding.includes('deflate')) {
    res.setHeader('Content-Encoding', 'deflate')
    const deflate = createDeflate()
    res.write = deflate.write.bind(deflate)
    res.end = deflate.end.bind(deflate)
    deflate.pipe(res)
  }

  next()
}

/**
 * Cache middleware for GET requests
 */
export const cacheMiddleware = (duration: number = 300) => {
  return (req: IncomingMessage, res: ServerResponse, next: () => void): void => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      next()
      return
    }

    // Skip cache if explicitly requested
    if (req.headers['cache-control'] === 'no-cache') {
      next()
      return
    }

    const key = `cache:${req.url}:${(req as ExtendedRequest).user?.id || 'anonymous'}`
    const cachedResponse = cache.get(key)

    if (cachedResponse) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(cachedResponse))
      return
    }

    // Override res.end to cache the response
    const originalEnd = res.end
    res.end = function(chunk?: string | Buffer, encoding?: BufferEncoding | Function, cb?: Function) {
      try {
        if (chunk && res.statusCode === 200) {
          const data = JSON.parse(chunk.toString())
          cache.set(key, data, duration)
        }
      } catch (error) {
        // Ignore parsing errors
      }
      return originalEnd.call(this, chunk, encoding, cb)
    }

    next()
  }
}

/**
 * Performance monitoring middleware
 */
export const performanceMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void => {
  const start = Date.now()

  // Add performance headers
  res.setHeader(
    'X-Request-ID',
    req.headers['x-request-id'] || `req_${Date.now()}`,
  )

  // Track the start of the request
  logAction('request_start', 'system', {
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  })

  // Add response time tracking
  const originalEnd = res.end
  res.end = function(chunk?: any, encoding?: any, cb?: any) {
    const duration = Date.now() - start

    // Log performance metrics
    logAction('request_end', 'system', {
      url: req.url,
      method: req.method,
      statusCode: res.statusCode,
      duration,
      timestamp: new Date().toISOString(),
    })

    // Track errors (status >= 400)
    if (res.statusCode >= 400) {
      logAction('request_error', 'system', {
        url: req.url,
        method: req.method,
        statusCode: res.statusCode,
        duration,
      })
    }

    // Add response time header
    res.setHeader('X-Response-Time', `${duration}ms`)

    return originalEnd.call(this, chunk, encoding, cb)
  }

  next()
}

/**
 * Memory usage monitoring
 */
export const memoryMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void => {
  const memUsage = process.memoryUsage()

  // Log memory usage for high-traffic endpoints
  if (
    req.url?.includes('/api/analytics') ||
    req.url?.includes('/api/reporting')
  ) {
    logAction('memory_usage', 'system', {
      url: req.url,
      rss: Math.round(memUsage.rss / 1024 / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
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
