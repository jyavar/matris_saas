import { BusinessIntelligenceController } from '../controllers/business-intelligence.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'
import type { RouteDefinition } from '../types/express/index'

// ===== RUTAS DE BUSINESS INTELLIGENCE =====
export const businessIntelligenceRoutes: RouteDefinition[] = [
  // ===== RUTAS DE DASHBOARDS =====
  {
    method: 'POST',
    path: '/dashboards',
    handler: BusinessIntelligenceController.createDashboard,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },

  // ===== RUTAS DE WIDGETS =====
  {
    method: 'POST',
    path: '/widgets',
    handler: BusinessIntelligenceController.createWidget,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
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