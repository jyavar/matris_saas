import { Router } from 'express'

import { PostHogController } from '../controllers/posthog.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

// Endpoints protegidos con autenticación
router.post('/track', authMiddleware, PostHogController.trackEvent)
router.post('/identify', authMiddleware, PostHogController.identifyUser)

export default router
