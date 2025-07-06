// Middleware barrel export for STRATO Core OS™
// This file provides a central export point for all middleware
// to reduce import complexity and improve maintainability

// Authentication Middleware
export * from './auth.middleware.js'

// Infrastructure Middleware
export * from './cors.middleware.js'
export * from './errorHandler.middleware.js'
export * from './performance.middleware.js'
export * from './rateLimit.middleware.js'
export * from './security.middleware.js'
export { createValidationMiddleware } from './validation.middleware.js'

// Logging Middleware
export * from './logger.middleware.js'