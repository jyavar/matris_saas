// Service barrel export for STRATO Core OS™
// This file provides a central export point for all services
// to reduce import complexity and improve maintainability

// Authentication Services
export * from './auth.service.js'

// Business Services
export * from './billing.service.js'
export * from './pricing.service.js'
export * from './campaigns.service.js'
export * from './email-campaigns.service.js'
export * from './onboarding.service.js'

// Core Services
export * from './profiles.service.js'
export * from './todo.service.js'

// Analytics Services
export * from './analytics.service.js'
export * from './reporting.service.js'
export * from './posthog.service.js'

// Infrastructure Services
export * from './supabase.service.js'
export * from './openai.service.js'
export * from './resend.service.js'
export * from './automation.service.js'
export * from './runtime.service.js'

// Utilities and Helpers
export { logAction } from './logger.service.js'
export * from './performance.service.js'
export * from './launchboard.service.js'
export * from './analytics-reporting.service.js'