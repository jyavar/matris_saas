import { Router } from 'express'

import { strictRateLimit } from '../middleware/rateLimit.middleware.js'
import analyticsRoutes from './analytics.routes.js'
import authRoutes from './auth.routes.js'
import campaignsRoutes from './campaigns.routes.js'
import devRoutes from './dev.routes.js'
import healthRoutes from './health.routes.js'
import onboardingRoutes from './onboarding.routes.js'
import openaiRoutes from './openai.routes.js'
import posthogRoutes from './posthog.routes.js'
import profilesRoutes from './profiles.routes.js'
import reportingRoutes from './reporting.routes.js'
import resendRoutes from './resend.routes.js'
import runtimeRoutes from './runtime.routes.js'
import todoRoutes from './todo.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/dev', devRoutes)
router.use('/todos', todoRoutes)
router.use('/auth', strictRateLimit, authRoutes)
router.use('/profiles', profilesRoutes)
router.use('/analytics', analyticsRoutes)
router.use('/reporting', strictRateLimit, reportingRoutes)
router.use('/posthog', posthogRoutes)
router.use('/runtime', runtimeRoutes)
router.use('/openai', strictRateLimit, openaiRoutes)
router.use('/onboarding', onboardingRoutes)
router.use('/resend', strictRateLimit, resendRoutes)
router.use('/campaigns', strictRateLimit, campaignsRoutes)

export default router
