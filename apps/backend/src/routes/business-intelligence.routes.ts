import { Router } from 'express'
import { BusinessIntelligenceController } from '../controllers/business-intelligence.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'

const router = Router()

// ===== MIDDLEWARE DE AUTENTICACIÓN Y RATE LIMITING =====
router.use(authMiddleware)
router.use(standardRateLimit)

// ===== RUTAS DE DASHBOARDS =====
router.post('/dashboards', createValidationMiddleware, BusinessIntelligenceController.createDashboard)
router.get('/dashboards', BusinessIntelligenceController.getDashboards)
router.get('/dashboards/:id', BusinessIntelligenceController.getDashboardById)
router.put('/dashboards/:id', createValidationMiddleware, BusinessIntelligenceController.updateDashboard)

// ===== RUTAS DE WIDGETS =====
router.post('/widgets', createValidationMiddleware, BusinessIntelligenceController.createWidget)

// ===== RUTAS DE REPORTES =====
router.get('/reports/executive', BusinessIntelligenceController.generateExecutiveReport)
router.get('/reports/operational', BusinessIntelligenceController.generateOperationalReport)

// ===== RUTAS DE INSIGHTS =====
router.get('/insights', BusinessIntelligenceController.generateAutoInsights)
router.get('/insights/:id', BusinessIntelligenceController.getInsightById)
router.put('/insights/:id/status', createValidationMiddleware, BusinessIntelligenceController.updateInsightStatus)

// ===== RUTAS DE TEMPLATES =====
router.get('/templates', BusinessIntelligenceController.getTemplates)
router.get('/templates/:id', BusinessIntelligenceController.getTemplateById)

// ===== RUTAS DE MÉTRICAS =====
router.get('/metrics', BusinessIntelligenceController.getBIMetrics)

// ===== RUTAS DE ESTADO =====
router.get('/status', BusinessIntelligenceController.getBIStatus)

export default router 