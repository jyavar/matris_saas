import { z } from 'zod'
import { BusinessIntelligenceController } from '../controllers/business-intelligence.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'
import type { RouteDefinition } from '../types/express/index'
import { idParamSchema } from '../lib/schemas.js'

// Validation schemas for business intelligence endpoints
const createDashboardSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().max(500),
  category: z.enum(['executive', 'operational', 'analytical', 'financial', 'marketing']),
  business_owner: z.string().min(1, 'Propietario del negocio es requerido'),
  refresh_schedule: z.enum(['realtime', 'hourly', 'daily', 'weekly', 'monthly']),
  access_level: z.enum(['public', 'restricted', 'private']),
})

const updateDashboardSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido').optional(),
  description: z.string().max(500).optional(),
  category: z.enum(['executive', 'operational', 'analytical', 'financial', 'marketing']).optional(),
  business_owner: z.string().min(1, 'Propietario del negocio es requerido').optional(),
  refresh_schedule: z.enum(['realtime', 'hourly', 'daily', 'weekly', 'monthly']).optional(),
  access_level: z.enum(['public', 'restricted', 'private']).optional(),
})

const createWidgetSchema = z.object({
  dashboard_id: z.string().min(1, 'Dashboard ID es requerido'),
  type: z.enum(['chart', 'table', 'kpi', 'metric', 'text']),
  title: z.string().min(1, 'Título es requerido'),
  description: z.string().max(500),
  data_source: z.string().min(1, 'Fuente de datos es requerida'),
  config: z.record(z.unknown()),
})

const updateInsightStatusSchema = z.object({
  status: z.enum(['pending', 'reviewed', 'approved', 'rejected', 'archived']),
})

// ===== RUTAS DE BUSINESS INTELLIGENCE =====
export const businessIntelligenceRoutes: RouteDefinition[] = [
  // ===== RUTAS DE DASHBOARDS =====
  {
    method: 'POST',
    path: '/dashboards',
    handler: BusinessIntelligenceController.createDashboard,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: createDashboardSchema })],
  },
  {
    method: 'GET',
    path: '/dashboards',
    handler: BusinessIntelligenceController.getDashboards,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/dashboards/:id',
    handler: BusinessIntelligenceController.getDashboardById,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'PUT',
    path: '/dashboards/:id',
    handler: BusinessIntelligenceController.updateDashboard,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: updateDashboardSchema, params: idParamSchema })],
  },

  // ===== RUTAS DE WIDGETS =====
  {
    method: 'POST',
    path: '/widgets',
    handler: BusinessIntelligenceController.createWidget,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: createWidgetSchema })],
  },

  // ===== RUTAS DE REPORTES =====
  {
    method: 'GET',
    path: '/reports/executive',
    handler: BusinessIntelligenceController.generateExecutiveReport,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/reports/operational',
    handler: BusinessIntelligenceController.generateOperationalReport,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE INSIGHTS =====
  {
    method: 'GET',
    path: '/insights',
    handler: BusinessIntelligenceController.generateAutoInsights,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/insights/:id',
    handler: BusinessIntelligenceController.getInsightById,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'PUT',
    path: '/insights/:id/status',
    handler: BusinessIntelligenceController.updateInsightStatus,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: updateInsightStatusSchema, params: idParamSchema })],
  },

  // ===== RUTAS DE TEMPLATES =====
  {
    method: 'GET',
    path: '/templates',
    handler: BusinessIntelligenceController.getTemplates,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/templates/:id',
    handler: BusinessIntelligenceController.getTemplateById,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE MÉTRICAS =====
  {
    method: 'GET',
    path: '/metrics',
    handler: BusinessIntelligenceController.getBIMetrics,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE ESTADO =====
  {
    method: 'GET',
    path: '/status',
    handler: BusinessIntelligenceController.getBIStatus,
    middlewares: [authMiddleware, standardRateLimit],
  },
] 