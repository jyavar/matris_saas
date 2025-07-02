import { Router } from 'express'

import { 
  strictRateLimit, 
  apiRateLimit, 
  authRateLimit, 
  analyticsRateLimit,
  speedLimiter 
} from '../middleware/rateLimit.middleware.js'
import { cacheMiddleware } from '../middleware/performance.middleware.js'
import analyticsReportingRoutes from './analytics-reporting.routes.js'
import analyticsRoutes from './analytics.routes.js'
import authRoutes from './auth.routes.js'
import automationRoutes from './automation.routes.js'
import campaignsRoutes from './campaigns.routes.js'
import devRoutes from './dev.routes.js'
import emailCampaignsRoutes from './email-campaigns.routes.js'
import healthRoutes from './health.routes.js'
import launchboardRoutes from './launchboard.routes.js'
import onboardingRoutes from './onboarding.routes.js'
import openaiRoutes from './openai.routes.js'
import posthogRoutes from './posthog.routes.js'
import pricingRoutes from './pricing.routes.js'
import profilesRoutes from './profiles.routes.js'
import reportingRoutes from './reporting.routes.js'
import resendRoutes from './resend.routes.js'
import runtimeRoutes from './runtime.routes.js'
import todoRoutes from './todo.routes.js'

const router = Router()

// Health routes (no rate limiting)
router.use('/health', healthRoutes)

// Auth routes (strict rate limiting)
router.use('/auth', authRateLimit, authRoutes)

// Analytics routes (higher limits, with caching)
router.use('/analytics', analyticsRateLimit, cacheMiddleware(300), analyticsRoutes)
router.use('/analytics-reporting', analyticsRateLimit, cacheMiddleware(600), analyticsReportingRoutes)

// Reporting routes (strict rate limiting)
router.use('/reporting', strictRateLimit, reportingRoutes)

// General API routes (standard rate limiting)
router.use('/todo', apiRateLimit, todoRoutes)
router.use('/profiles', apiRateLimit, profilesRoutes)
router.use('/pricing', apiRateLimit, cacheMiddleware(1800), pricingRoutes) // Cache pricing for 30 minutes
router.use('/launchboard', apiRateLimit, cacheMiddleware(300), launchboardRoutes)
router.use('/onboarding', apiRateLimit, onboardingRoutes)
router.use('/automation', apiRateLimit, automationRoutes)
router.use('/openai', strictRateLimit, openaiRoutes)
router.use('/posthog', strictRateLimit, posthogRoutes)

// External service routes (strict rate limiting)
router.use('/resend', strictRateLimit, resendRoutes)
router.use('/campaigns', strictRateLimit, campaignsRoutes)
router.use('/email-campaigns', strictRateLimit, emailCampaignsRoutes)

// Runtime and dev routes (no rate limiting in development)
if (process.env.NODE_ENV === 'development') {
  router.use('/runtime', runtimeRoutes)
  router.use('/dev', devRoutes)
}

// Apply speed limiter to all routes
router.use(speedLimiter)

export default router
