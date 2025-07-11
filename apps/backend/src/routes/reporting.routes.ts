import { Router } from 'express'
import { ReportingController } from '../controllers/reporting.controller.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'

const router = Router()

// ===== MIDDLEWARE DE AUTENTICACIÓN Y RATE LIMITING =====
router.use(authMiddleware)
router.use(standardRateLimit)

// ===== RUTAS DE REPORTES =====
router.post('/reports', createValidationMiddleware, ReportingController.createReport)
router.get('/reports', ReportingController.getReports)
router.get('/reports/:id', ReportingController.getReportById)
router.put('/reports/:id', createValidationMiddleware, ReportingController.updateReport)

// ===== RUTAS DE GENERACIÓN =====
router.post('/generate', createValidationMiddleware, ReportingController.generateReport)
router.get('/executions/:id', ReportingController.getExecutionById)
router.get('/executions/report/:reportId', ReportingController.getReportExecutions)

// ===== RUTAS DE TEMPLATES =====
router.get('/templates', ReportingController.getTemplates)
router.get('/templates/:id', ReportingController.getTemplateById)

// ===== RUTAS DE INSIGHTS =====
router.get('/insights', ReportingController.generateAutoInsights)
router.get('/insights/:id', ReportingController.getInsightById)
router.put('/insights/:id/status', createValidationMiddleware, ReportingController.updateInsightStatus)

// ===== RUTAS DE MÉTRICAS =====
router.get('/metrics', ReportingController.getReportingMetrics)

// ===== RUTAS DE ESTADO =====
router.get('/status', ReportingController.getReportingStatus)

export default router
