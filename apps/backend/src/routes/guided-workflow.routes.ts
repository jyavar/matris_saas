import { GuidedWorkflowController } from '../controllers/guided-workflow.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'
import type { RouteDefinition } from '../types/express/index'

// ===== RUTAS DE GUIDED WORKFLOW =====
export const guidedWorkflowRoutes: RouteDefinition[] = [
  // ===== RUTAS DE WORKFLOWS =====
  {
    method: 'POST',
    path: '/workflows',
    handler: GuidedWorkflowController.createWorkflow,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },
  {
    method: 'GET',
    path: '/workflows',
    handler: GuidedWorkflowController.getWorkflows,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/workflows/:id',
    handler: GuidedWorkflowController.getWorkflowById,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'PUT',
    path: '/workflows/:id',
    handler: GuidedWorkflowController.updateWorkflow,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },
  {
    method: 'DELETE',
    path: '/workflows/:id',
    handler: GuidedWorkflowController.deleteWorkflow,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE EJECUCIÓN =====
  {
    method: 'POST',
    path: '/workflows/:id/execute',
    handler: GuidedWorkflowController.executeWorkflow,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },
  {
    method: 'GET',
    path: '/workflows/:id/status',
    handler: GuidedWorkflowController.getWorkflowStatus,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'POST',
    path: '/workflows/:id/pause',
    handler: GuidedWorkflowController.pauseWorkflow,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'POST',
    path: '/workflows/:id/resume',
    handler: GuidedWorkflowController.resumeWorkflow,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE TEMPLATES =====
  {
    method: 'GET',
    path: '/templates',
    handler: GuidedWorkflowController.getTemplates,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/templates/:id',
    handler: GuidedWorkflowController.getTemplateById,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'POST',
    path: '/templates/:id/instantiate',
    handler: GuidedWorkflowController.instantiateTemplate,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },

  // ===== RUTAS DE PASOS =====
  {
    method: 'GET',
    path: '/workflows/:id/steps',
    handler: GuidedWorkflowController.getWorkflowSteps,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'POST',
    path: '/workflows/:id/steps/:stepId/complete',
    handler: GuidedWorkflowController.completeStep,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },
  {
    method: 'POST',
    path: '/workflows/:id/steps/:stepId/validate',
    handler: GuidedWorkflowController.validateStep,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },

  // ===== RUTAS DE VALIDACIÓN =====
  {
    method: 'POST',
    path: '/workflows/:id/validate',
    handler: GuidedWorkflowController.validateWorkflow,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/workflows/:id/validation-errors',
    handler: GuidedWorkflowController.getValidationErrors,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE ESTADO =====
  {
    method: 'GET',
    path: '/status',
    handler: GuidedWorkflowController.getWorkflowSystemStatus,
    middlewares: [authMiddleware, standardRateLimit],
  },
] 