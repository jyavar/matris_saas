// Controller barrel export for STRATO Core OS™
// This file provides a central export point for all controllers
// to reduce import complexity and improve maintainability

// Authentication Controllers
export * from './auth.controller.js'

// Business Controllers  
export * from './billing.controller.js'
export * from './pricing.controller.js'
export * from './payments.controller.js'
export * from './campaigns.controller.js'
export * from './email-campaigns.controller.js'
export * from './onboarding.controller.js'

// Core Controllers
export * from './profiles.controller.js'
export * from './todo.controller.js'
export * from './health.controller.js'

// Analytics Controllers
export * from './analytics.controller.js'
export * from './reporting.controller.js'
export { PostHogController } from './posthog.controller.js'

// Infrastructure Controllers
export * from './openai.controller.js'
export * from './resend.controller.js'
export * from './automation.controller.js'
export * from './runtime.controller.js'

// Utilities and Helpers
export * from './launchboard.controller.js'
export * from './analytics-reporting.controller.js'