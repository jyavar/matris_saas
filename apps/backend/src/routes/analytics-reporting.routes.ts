import { analyticsReportingController } from '../controllers/analytics-reporting.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const analyticsReportingRoutes: RouteDefinition[] = [
  {
    method: 'GET',
    path: '/',
    handler: analyticsReportingController.getReports,
  },
  {
    method: 'POST',
    path: '/',
    handler: analyticsReportingController.createReport,
  },
  {
    method: 'GET',
    path: '/:id',
    handler: analyticsReportingController.getReportById,
  },
  {
    method: 'DELETE',
    path: '/:id',
    handler: analyticsReportingController.deleteReport,
  },
]
