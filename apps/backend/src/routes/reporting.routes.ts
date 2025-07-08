import { analyticsReportingController } from '../controllers/analytics-reporting.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'

export const reportingRoutes = [
  {
    method: 'GET',
    path: '/',
    middlewares: [authMiddleware],
    handler: handleAsync(analyticsReportingController.getReports),
  },
  {
    method: 'GET',
    path: '/:id',
    middlewares: [authMiddleware],
    handler: handleAsync(analyticsReportingController.getReportById),
  },
  {
    method: 'POST',
    path: '/',
    middlewares: [authMiddleware],
    handler: handleAsync(analyticsReportingController.createReport),
  },
  {
    method: 'DELETE',
    path: '/:id',
    middlewares: [authMiddleware],
    handler: handleAsync(analyticsReportingController.deleteReport),
  },
]
