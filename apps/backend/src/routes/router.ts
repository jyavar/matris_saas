import { Router } from 'express'

import {
  analyticsRateLimit,
  apiRateLimit,
  authRateLimit,
  speedLimiter,
} from '../middleware/rateLimit.middleware.js'
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
import todoRoutes from './todo.routes.js'

const router = Router()

// Apply speed limiting to all routes
router.use(speedLimiter)

// Auth routes (strict rate limiting)
router.use('/auth', authRateLimit, authRoutes)

// Analytics routes (higher rate limits, caching)
router.use('/analytics', analyticsRateLimit, analyticsRoutes)
router.use('/analytics-reporting', analyticsRateLimit, analyticsReportingRoutes)

// API routes (general rate limiting)
// router.use('/api', apiRateLimit, router)

// Pricing routes (caching for 30 minutes)
router.use('/pricing', apiRateLimit, pricingRoutes)

// Launchboard routes (caching for 5 minutes)
router.use('/launchboard', apiRateLimit, launchboardRoutes)

// Other routes with general rate limiting
router.use('/automation', apiRateLimit, automationRoutes)
router.use('/campaigns', apiRateLimit, campaignsRoutes)
router.use('/email-campaigns', apiRateLimit, emailCampaignsRoutes)
router.use('/health', healthRoutes)
router.use('/onboarding', apiRateLimit, onboardingRoutes)
router.use('/openai', apiRateLimit, openaiRoutes)
router.use('/posthog', apiRateLimit, posthogRoutes)
router.use('/todo', apiRateLimit, todoRoutes)

// Development routes (only in development)
if (process.env.NODE_ENV === 'development') {
  router.use('/dev', devRoutes)
}

export default router
