import { analyticsController } from '../controllers/analytics.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'

export const analyticsRoutes = [
  { method: 'POST', path: '/track/event', handler: handleAsync(analyticsController.trackEvent) },
  { method: 'POST', path: '/track/metric', handler: handleAsync(analyticsController.trackMetric) },
  { method: 'GET', path: '/users/:userId', middlewares: [authMiddleware], handler: handleAsync(analyticsController.getUserAnalytics) },
  { method: 'GET', path: '/events', middlewares: [authMiddleware], handler: handleAsync(analyticsController.getEvents) },
  { method: 'GET', path: '/metrics', middlewares: [authMiddleware], handler: handleAsync(analyticsController.getMetrics) },
  { method: 'GET', path: '/summary', middlewares: [authMiddleware], handler: handleAsync(analyticsController.getAnalyticsSummary) },
  { method: 'GET', path: '/', middlewares: [authMiddleware], handler: handleAsync(analyticsController.getAllAnalytics) },
  { method: 'POST', path: '/', middlewares: [authMiddleware], handler: handleAsync(analyticsController.createAnalytics) },
  { method: 'GET', path: '/:id', middlewares: [authMiddleware], handler: handleAsync(analyticsController.getAnalyticsById) },
  { method: 'PATCH', path: '/:id', middlewares: [authMiddleware], handler: handleAsync(analyticsController.updateAnalytics) },
  { method: 'DELETE', path: '/:id', middlewares: [authMiddleware], handler: handleAsync(analyticsController.deleteAnalytics) },
]
