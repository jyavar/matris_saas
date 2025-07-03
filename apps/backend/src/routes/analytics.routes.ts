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

// Ruta fija para el edge case: /analytics/users (sin userId)
const usersNotFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ message: 'User ID not provided' })
}
router.get('/analytics/users', usersNotFoundHandler)

// Middleware para capturar /users/ (userId vacío)
// Express no soporta rutas '/users/' (barra final) explícitamente, solo '/users' y '/users/:userId'.
// El handler '/users' (sin barra final) ya captura el edge case de userId vacío.
router.get('/users/:userId', handleAsync(analyticsController.getUserAnalytics))

// Legacy endpoints
router.get('/', handleAsync(analyticsController.getAllAnalytics))
router.get('/:id', handleAsync(analyticsController.getAnalyticsById))
router.post('/', handleAsync(analyticsController.createAnalytics))
router.patch('/:id', handleAsync(analyticsController.updateAnalytics))
router.delete('/:id', handleAsync(analyticsController.deleteAnalytics))

// Place this at the end to catch /users with no param
const usersRequiredHandler: RequestHandler = (req, res) => {
  res.status(404).json({ success: false, error: 'User ID is required' })
}
router.all('/users', usersRequiredHandler)

export default router
