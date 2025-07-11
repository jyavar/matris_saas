import { Router } from 'express'
import { GuidedWorkflowController } from '../controllers/guided-workflow.controller.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'

const router = Router()

// ===== MIDDLEWARE DE AUTENTICACIÓN Y RATE LIMITING =====
router.use(authMiddleware)
router.use(standardRateLimit)

// ===== RUTAS DE WORKFLOWS =====
router.get('/workflows', GuidedWorkflowController.getWorkflows)
router.get('/workflows/:id', GuidedWorkflowController.getWorkflowById)
router.get('/workflows/difficulty/:difficulty', GuidedWorkflowController.getWorkflowsByDifficulty)

// ===== RUTAS DE EJECUCIÓN =====
router.post('/executions', createValidationMiddleware, GuidedWorkflowController.startWorkflowExecution)
router.get('/executions/:id', GuidedWorkflowController.getExecutionById)
router.get('/executions/user/:userId', GuidedWorkflowController.getUserExecutions)
router.post('/executions/:id/steps/:stepId/complete', createValidationMiddleware, GuidedWorkflowController.completeStep)
router.put('/executions/:id/pause', GuidedWorkflowController.pauseExecution)
router.put('/executions/:id/resume', GuidedWorkflowController.resumeExecution)
router.delete('/executions/:id', GuidedWorkflowController.cancelExecution)

// ===== RUTAS DE TEMPLATES =====
router.get('/templates', GuidedWorkflowController.getTemplates)
router.get('/templates/:id', GuidedWorkflowController.getTemplateById)
router.post('/templates/:id/create', createValidationMiddleware, GuidedWorkflowController.createWorkflowFromTemplate)

// ===== RUTAS DE MÉTRICAS =====
router.get('/metrics', GuidedWorkflowController.getWorkflowMetrics)

// ===== RUTAS DE ESTADO =====
router.get('/status', GuidedWorkflowController.getWorkflowStatus)

export default router 