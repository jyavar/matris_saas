import { logAction } from '../services/logger.service.js'

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * Log context interface
 */
interface LogContext {
  userId?: string
  tenantId?: string
  requestId?: string
  url?: string
  method?: string
  duration?: number
  [key: string]: unknown
}

/**
 * Structured logging helper
 */
export const log = {
  debug: (message: string, context?: LogContext) => {
    logAction('debug', context?.userId || 'system', {
      message,
      level: LogLevel.DEBUG,
      ...context,
    })
  },

  info: (message: string, context?: LogContext) => {
    logAction('info', context?.userId || 'system', {
      message,
      level: LogLevel.INFO,
      ...context,
    })
  },

  warn: (message: string, context?: LogContext) => {
    logAction('warn', context?.userId || 'system', {
      message,
      level: LogLevel.WARN,
      ...context,
    })
  },

  error: (message: string, error?: Error, context?: LogContext) => {
    logAction('error', context?.userId || 'system', {
      message,
      level: LogLevel.ERROR,
      error: error?.message,
      stack: error?.stack,
      ...context,
    })
  },
}

/**
 * Performance logging helper
 */
export const performanceLog = {
  start: (operation: string, context?: LogContext) => {
    const startTime = Date.now()
    log.info(`Performance: ${operation} started`, {
      ...context,
      operation,
      startTime,
    })
    return startTime
  },

  end: (operation: string, startTime: number, context?: LogContext) => {
    const duration = Date.now() - startTime
    log.info(`Performance: ${operation} completed`, {
      ...context,
      operation,
      duration,
    })
    return duration
  },

  measure: async <T>(
    operation: string,
    fn: () => Promise<T>,
    context?: LogContext,
  ): Promise<T> => {
    const startTime = performanceLog.start(operation, context)
    try {
      const result = await fn()
      performanceLog.end(operation, startTime, context)
      return result
    } catch (error) {
      performanceLog.end(operation, startTime, {
        ...context,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },
}

/**
 * Request logging helper
 */
export const requestLog = {
  start: (req: { url?: string; method?: string }, context?: LogContext) => {
    log.info('Request started', {
      ...context,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString(),
    })
  },

  end: (
    req: { url?: string; method?: string },
    res: { statusCode?: number },
    duration: number,
    context?: LogContext,
  ) => {
    log.info('Request completed', {
      ...context,
      url: req.url,
      method: req.method,
      statusCode: res.statusCode,
      duration,
      timestamp: new Date().toISOString(),
    })
  },

  error: (
    req: { url?: string; method?: string },
    error: Error,
    context?: LogContext,
  ) => {
    log.error('Request failed', error, {
      ...context,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString(),
    })
  },
}

/**
 * Database logging helper
 */
export const dbLog = {
  query: (query: string, _params?: unknown[], context?: LogContext) => {
    log.debug('Database query', {
      ...context,
      query,
      params: _params,
      timestamp: new Date().toISOString(),
    })
  },

  error: (query: string, error: Error, context?: LogContext) => {
    log.error('Database error', error, {
      ...context,
      query,
      timestamp: new Date().toISOString(),
    })
  },

  slow: (query: string, duration: number, context?: LogContext) => {
    log.warn('Slow database query', {
      ...context,
      query,
      duration,
      threshold: 1000, // 1 second
      timestamp: new Date().toISOString(),
    })
  },
}

/**
 * Security logging helper
 */
export const securityLog = {
  auth: (action: string, userId: string, context?: LogContext) => {
    log.info(`Security: ${action}`, {
      ...context,
      userId,
      action,
      timestamp: new Date().toISOString(),
    })
  },

  failedAuth: (action: string, reason: string, context?: LogContext) => {
    log.warn(`Security: Failed ${action}`, {
      ...context,
      action,
      reason,
      timestamp: new Date().toISOString(),
    })
  },

  suspicious: (action: string, details: string, context?: LogContext) => {
    log.warn(`Security: Suspicious activity - ${action}`, {
      ...context,
      action,
      details,
      timestamp: new Date().toISOString(),
    })
  },
}

/**
 * Business logic logging helper
 */
export const businessLog = {
  action: (
    action: string,
    userId: string,
    data?: unknown,
    context?: LogContext,
  ) => {
    log.info(`Business: ${action}`, {
      ...context,
      userId,
      action,
      data,
      timestamp: new Date().toISOString(),
    })
  },

  metric: (metric: string, value: number, context?: LogContext) => {
    log.info(`Metric: ${metric}`, {
      ...context,
      userId: context?.userId || 'system',
      metric,
      value,
      timestamp: new Date().toISOString(),
    })
  },

  event: (event: string, data?: unknown, context?: LogContext) => {
    log.info(`Event: ${event}`, {
      ...context,
      event,
      data,
      timestamp: new Date().toISOString(),
    })
  },
}

/**
 * Debug logging helper (only in development)
 */
export const debugLog = {
  log: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      log.debug(message, { data })
    }
  },

  object: (label: string, obj: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      log.debug(`Debug object: ${label}`, {
        object: JSON.stringify(obj, null, 2),
      })
    }
  },

  performance: (label: string, fn: () => void) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now()
      fn()
      const end = performance.now()
      log.debug(`Performance: ${label}`, { duration: end - start })
    }
  },
}
