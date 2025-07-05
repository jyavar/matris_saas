import { analyticsReportingController } from '../controllers/analytics-reporting.controller.js'

export const analyticsReportingRoutes = [
  { method: 'GET', path: '/', handler: analyticsReportingController.getReports },
  { method: 'POST', path: '/', handler: analyticsReportingController.createReport },
  { method: 'GET', path: '/:id', handler: analyticsReportingController.getReportById },
  { method: 'DELETE', path: '/:id', handler: analyticsReportingController.deleteReport },
]
