import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'

import { analyticsController } from '../controllers/analytics.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

function handleAsync(
  fn: (req: Request, res: Response, next: unknown) => Promise<unknown>,
): RequestHandler {
  return (req: Request, res: Response, next: unknown) => {
    fn(req, res, next).catch(next as unknown as NextFunction)
  }
}

// Public routes (no authentication required for tracking)
router.post('/track/event', handleAsync(analyticsController.trackEvent))
router.post('/track/metric', handleAsync(analyticsController.trackMetric))

// Protected routes (require authentication)
router.use(authMiddleware)

// New analytics endpoints
router.get('/events', handleAsync(analyticsController.getEvents))
router.get('/metrics', handleAsync(analyticsController.getMetrics))
router.get('/summary', handleAsync(analyticsController.getAnalyticsSummary))

// User analytics - must be before generic /:id routes
router.get('/users/:userId', handleAsync(analyticsController.getUserAnalytics))

// Legacy endpoints
router.get('/', handleAsync(analyticsController.getAllAnalytics))
router.get('/:id', handleAsync(analyticsController.getAnalyticsById))
router.post('/', handleAsync(analyticsController.createAnalytics))
router.patch('/:id', handleAsync(analyticsController.updateAnalytics))
router.delete('/:id', handleAsync(analyticsController.deleteAnalytics))

export default router
