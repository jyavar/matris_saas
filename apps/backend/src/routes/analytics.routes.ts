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

// Ruta fija para el edge case: /analytics/users (sin userId)
router.get('/analytics/users', (_req, res) => {
  res.status(404).json({ message: 'User ID not provided' });
});

// Middleware para capturar /users/ (userId vacío)
router.get('/users/', (_req, res) => {
  return res.status(404).json({ message: 'User ID not provided' });
});
router.get('/users/:userId', analyticsController.getUserAnalytics)

// Legacy endpoints
router.get('/', analyticsController.getAllAnalytics)
router.get('/:id', analyticsController.getAnalyticsById)
router.post('/', analyticsController.createAnalytics)
router.patch('/:id', analyticsController.updateAnalytics)
router.delete('/:id', analyticsController.deleteAnalytics)

// Place this at the end to catch /users with no param
router.all('/users', (req: any, res: any) => {
  return res.status(404).json({ success: false, error: 'User ID is required' })
})

export default router
