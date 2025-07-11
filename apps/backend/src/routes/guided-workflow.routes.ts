import { z } from 'zod'
import { GuidedWorkflowController } from '../controllers/guided-workflow.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'
import type { RouteDefinition } from '../types/express/index'
import { idParamSchema } from '../lib/schemas.js'

// Validation schemas for guided workflow endpoints
const createWorkflowSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().max(500),
  category: z.enum(['data_preparation', 'model_training', 'model_evaluation', 'deployment', 'monitoring']),
  steps: z.array(z.object({
    name: z.string().min(1),
    description: z.string(),
    order: z.number().min(1),
    required: z.boolean().optional(),
  })),
  metadata: z.record(z.unknown()).optional(),
})

const updateWorkflowSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido').optional(),
  description: z.string().max(500).optional(),
  category: z.enum(['data_preparation', 'model_training', 'model_evaluation', 'deployment', 'monitoring']).optional(),
  steps: z.array(z.object({
    name: z.string().min(1),
    description: z.string(),
    order: z.number().min(1),
    required: z.boolean().optional(),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
})

const executeWorkflowSchema = z.object({
  input_data: z.record(z.unknown()).optional(),
  execution_mode: z.enum(['step_by_step', 'automated']).optional(),
  parameters: z.record(z.unknown()).optional(),
})

const instantiateTemplateSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().max(500).optional(),
  parameters: z.record(z.unknown()).optional(),
})

const completeStepSchema = z.object({
  results: z.record(z.unknown()),
  notes: z.string().optional(),
  duration: z.number().optional(),
})

const validateStepSchema = z.object({
  step_data: z.record(z.unknown()),
  validation_rules: z.array(z.string()).optional(),
})

const querySchema = z.object({
  category: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
})

// ===== RUTAS DE GUIDED WORKFLOW =====
export const guidedWorkflowRoutes: RouteDefinition[] = [
  // ===== RUTAS DE WORKFLOWS =====
  {
    method: 'POST',
    path: '/workflows',
    handler: GuidedWorkflowController.createWorkflow,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: createWorkflowSchema })],
  },
  {
    method: 'GET',
    path: '/workflows',
    handler: GuidedWorkflowController.getWorkflows,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ query: querySchema })],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: updateWorkflowSchema, params: idParamSchema })],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: executeWorkflowSchema, params: idParamSchema })],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: instantiateTemplateSchema, params: idParamSchema })],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: completeStepSchema })],
  },
  {
    method: 'POST',
    path: '/workflows/:id/steps/:stepId/validate',
    handler: GuidedWorkflowController.validateStep,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: validateStepSchema })],
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
    handler: GuidedWorkflowController.getWorkflowStatus,
    middlewares: [authMiddleware, standardRateLimit],
  },
] 