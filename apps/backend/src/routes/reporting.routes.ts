import { ReportingController } from '../controllers/reporting.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'
import type { RouteDefinition } from '../types/express/index'

// ===== RUTAS DE REPORTING =====
export const reportingRoutes: RouteDefinition[] = [
  // ===== RUTAS DE REPORTES =====
  {
    method: 'POST',
    path: '/reports',
    handler: ReportingController.createReport,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },
  {
    method: 'GET',
    path: '/reports',
    handler: ReportingController.getReports,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/reports/:id',
    handler: ReportingController.getReportById,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'PUT',
    path: '/reports/:id',
    handler: ReportingController.updateReport,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },
  {
    method: 'DELETE',
    path: '/reports/:id',
    handler: ReportingController.deleteReport,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE GENERACIÓN =====
  {
    method: 'POST',
    path: '/reports/:id/generate',
    handler: ReportingController.generateReport,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/reports/:id/download',
    handler: ReportingController.downloadReport,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'POST',
    path: '/reports/:id/schedule',
    handler: ReportingController.scheduleReport,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },

  // ===== RUTAS DE TEMPLATES =====
  {
    method: 'GET',
    path: '/templates',
    handler: ReportingController.getReportTemplates,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'POST',
    path: '/templates',
    handler: ReportingController.createReportTemplate,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },
  {
    method: 'GET',
    path: '/templates/:id',
    handler: ReportingController.getReportTemplateById,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE MÉTRICAS =====
  {
    method: 'GET',
    path: '/metrics',
    handler: ReportingController.getReportingMetrics,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'POST',
    path: '/metrics/calculate',
    handler: ReportingController.calculateMetrics,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },

  // ===== RUTAS DE ESTADO =====
  {
    method: 'GET',
    path: '/status',
    handler: ReportingController.getReportingStatus,
    middlewares: [authMiddleware, standardRateLimit],
  },
]
