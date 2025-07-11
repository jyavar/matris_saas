import { z } from 'zod'
import { ReportingController } from '../controllers/reporting.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'
import type { RouteDefinition } from '../types/express/index'
import { idParamSchema } from '../lib/schemas.js'

// Validation schemas for reporting endpoints
const createReportSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().max(500),
  type: z.enum(['executive', 'operational', 'analytical', 'compliance', 'custom']),
  category: z.enum(['sales', 'marketing', 'operations', 'finance', 'customer', 'ml_performance']),
  format: z.enum(['pdf', 'excel', 'powerpoint', 'dashboard', 'email']),
  schedule: z.enum(['realtime', 'hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'on_demand']),
  recipients: z.array(z.string().email()),
  data_sources: z.array(z.string()),
  template_id: z.string().optional(),
})

const updateReportSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido').optional(),
  description: z.string().max(500).optional(),
  type: z.enum(['executive', 'operational', 'analytical', 'compliance', 'custom']).optional(),
  category: z.enum(['sales', 'marketing', 'operations', 'finance', 'customer', 'ml_performance']).optional(),
  format: z.enum(['pdf', 'excel', 'powerpoint', 'dashboard', 'email']).optional(),
  schedule: z.enum(['realtime', 'hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'on_demand']).optional(),
  recipients: z.array(z.string().email()).optional(),
  data_sources: z.array(z.string()).optional(),
  template_id: z.string().optional(),
})

const scheduleReportSchema = z.object({
  schedule: z.enum(['realtime', 'hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'on_demand']),
  recipients: z.array(z.string().email()).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
})

const createReportTemplateSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().max(500),
  template_type: z.enum(['executive', 'operational', 'analytical', 'compliance', 'custom']),
  category: z.enum(['sales', 'marketing', 'operations', 'finance', 'customer', 'ml_performance']),
  template_config: z.record(z.unknown()),
  default_format: z.enum(['pdf', 'excel', 'powerpoint', 'dashboard', 'email']),
})

const calculateMetricsSchema = z.object({
  metric_types: z.array(z.string()),
  date_range: z.object({
    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
  }),
  filters: z.record(z.unknown()).optional(),
  aggregation: z.enum(['sum', 'avg', 'count', 'max', 'min']).optional(),
})

const querySchema = z.object({
  type: z.enum(['executive', 'operational', 'analytical', 'compliance', 'custom']).optional(),
  category: z.enum(['sales', 'marketing', 'operations', 'finance', 'customer', 'ml_performance']).optional(),
  status: z.enum(['draft', 'scheduled', 'active', 'completed', 'failed']).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
})

// ===== RUTAS DE REPORTING =====
export const reportingRoutes: RouteDefinition[] = [
  // ===== RUTAS DE REPORTES =====
  {
    method: 'POST',
    path: '/reports',
    handler: ReportingController.createReport,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: createReportSchema })],
  },
  {
    method: 'GET',
    path: '/reports',
    handler: ReportingController.getReports,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ query: querySchema })],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: updateReportSchema, params: idParamSchema })],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: scheduleReportSchema, params: idParamSchema })],
  },

  // ===== RUTAS DE TEMPLATES =====
  {
    method: 'GET',
    path: '/templates',
    handler: ReportingController.getTemplates,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'POST',
    path: '/templates',
    handler: ReportingController.createReportTemplate,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: createReportTemplateSchema })],
  },
  {
    method: 'GET',
    path: '/templates/:id',
    handler: ReportingController.getTemplateById,
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: calculateMetricsSchema })],
  },

  // ===== RUTAS DE ESTADO =====
  {
    method: 'GET',
    path: '/status',
    handler: ReportingController.getReportingStatus,
    middlewares: [authMiddleware, standardRateLimit],
  },
]
