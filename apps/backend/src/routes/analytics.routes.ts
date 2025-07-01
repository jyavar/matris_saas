import { Router } from 'express'

import { analyticsController } from '../controllers/analytics.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

// Public routes (no authentication required for tracking)
router.post('/track/event', analyticsController.trackEvent)
router.post('/track/metric', analyticsController.trackMetric)

// Protected routes (require authentication)
router.use(authMiddleware)

// New analytics endpoints
router.get('/events', analyticsController.getEvents)
router.get('/metrics', analyticsController.getMetrics)
router.get('/summary', analyticsController.getAnalyticsSummary)
router.get('/users/:userId', analyticsController.getUserAnalytics)

// Legacy endpoints
router.get('/', analyticsController.getAllAnalytics)
router.get('/:id', analyticsController.getAnalyticsById)
router.post('/', analyticsController.createAnalytics)
router.patch('/:id', analyticsController.updateAnalytics)
router.delete('/:id', analyticsController.deleteAnalytics)

export default router
