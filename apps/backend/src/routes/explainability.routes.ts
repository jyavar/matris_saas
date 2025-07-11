import { Router } from 'express'
import { ExplainabilityController } from '../controllers/explainability.controller.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'

const router = Router()

// ===== MIDDLEWARE DE AUTENTICACIÓN Y RATE LIMITING =====
router.use(authMiddleware)
router.use(standardRateLimit)

// ===== RUTAS DE REQUESTS =====
router.post('/requests', createValidationMiddleware, ExplainabilityController.createExplainabilityRequest)
router.get('/requests', ExplainabilityController.getRequests)
router.get('/requests/:id', ExplainabilityController.getRequestById)

// ===== RUTAS DE EXPLICACIONES =====
router.post('/predictions/explain', createValidationMiddleware, ExplainabilityController.generatePredictionExplanation)

// ===== RUTAS DE REPORTES EJECUTIVOS =====
router.get('/reports/executive/:model_id', ExplainabilityController.generateExecutiveReport)

// ===== RUTAS DE FLUJO GUIADO =====
router.get('/guide', ExplainabilityController.getExplainabilityGuide)
router.get('/templates', ExplainabilityController.getExplanationTemplates)
router.get('/examples', ExplainabilityController.getExplanationExamples)

// ===== RUTAS DE MÉTRICAS =====
router.get('/metrics', ExplainabilityController.getExplainabilityMetrics)

// ===== RUTAS DE ESTADO =====
router.get('/status', ExplainabilityController.getExplainabilityStatus)

export default router 