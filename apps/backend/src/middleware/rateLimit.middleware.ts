import type { NextFunction, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'

// Strict rate limiting for sensitive endpoints
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests, please try again later.',
  },
  handler: (req: Request, res: Response, _next: NextFunction, options) => {
    res.status(options.statusCode).json(options.message)
  },
})

// Slower rate limiting for API endpoints
export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // 1000 requests por IP para endpoints generales
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'API rate limit exceeded, please try again later.',
  },
})

// Speed limiter for gradual slowdown
export const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutos
  delayAfter: 50, // Allow 50 requests per 15 minutes without delay
  delayMs: 500, // Add 500ms delay per request after delayAfter
  maxDelayMs: 20000, // Maximum delay of 20 seconds
})

// Auth-specific rate limiting
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 login attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many authentication attempts, please try again later.',
  },
  skipSuccessfulRequests: true, // Don't count successful logins
})

// Analytics rate limiting (higher limits for data endpoints)
export const analyticsRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 500, // 500 requests per 15 minutes for analytics
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Analytics rate limit exceeded, please try again later.',
  },
})
