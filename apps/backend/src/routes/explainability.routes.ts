import { z } from 'zod'
import { ExplainabilityController } from '../controllers/explainability.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'
import type { RouteDefinition } from '../types/express/index'
import { idParamSchema } from '../lib/schemas.js'

// Validation schemas for explainability endpoints
const generateExplanationSchema = z.object({
  model_id: z.string().min(1, 'Model ID es requerido'),
  dataset_id: z.string().min(1, 'Dataset ID es requerido'),
  request_type: z.enum(['feature_importance', 'prediction_explanation', 'model_comparison', 'business_impact']),
  business_context: z.string().min(1, 'Contexto de negocio es requerido'),
  audience: z.enum(['executive', 'manager', 'analyst', 'stakeholder']),
})

const featureImportanceSchema = z.object({
  model_id: z.string().min(1, 'Model ID es requerido'),
  feature_names: z.array(z.string()).optional(),
  importance_type: z.enum(['global', 'local']).optional(),
})

const shapValuesSchema = z.object({
  model_id: z.string().min(1, 'Model ID es requerido'),
  prediction_id: z.string().min(1, 'Prediction ID es requerido'),
  input_data: z.record(z.unknown()),
})

const limeExplanationSchema = z.object({
  model_id: z.string().min(1, 'Model ID es requerido'),
  input_data: z.record(z.unknown()),
  feature_names: z.array(z.string()).optional(),
})

const compareModelInterpretabilitySchema = z.object({
  model_ids: z.array(z.string()).min(2, 'Se requieren al menos 2 modelos'),
  comparison_type: z.enum(['feature_importance', 'prediction_accuracy', 'business_impact']).optional(),
})

const businessInsightsSchema = z.object({
  model_id: z.string().min(1, 'Model ID es requerido'),
  business_context: z.string().min(1, 'Contexto de negocio es requerido'),
  audience: z.enum(['executive', 'manager', 'analyst', 'stakeholder']),
})

const createTemplateSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().max(500),
  template_type: z.enum(['feature_importance', 'prediction_explanation', 'business_impact']),
  template_config: z.record(z.unknown()),
})

// ===== RUTAS DE EXPLAINABILITY =====
export const explainabilityRoutes: RouteDefinition[] = [
  // ===== RUTAS DE EXPLICACIONES =====
  {
    method: 'POST',
    path: '/explanations',
    handler: ExplainabilityController.generateExplanation,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: generateExplanationSchema })],
  },
  {
    method: 'GET',
    path: '/explanations/:id',
    handler: ExplainabilityController.getExplanationById,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE FEATURE IMPORTANCE =====
  {
    method: 'POST',
    path: '/feature-importance',
    handler: ExplainabilityController.calculateFeatureImportance,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: featureImportanceSchema })],
  },
  {
    method: 'GET',
    path: '/feature-importance/:modelId',
    handler: ExplainabilityController.getFeatureImportance,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE SHAP VALUES =====
  {
    method: 'POST',
    path: '/shap-values',
    handler: ExplainabilityController.calculateShapValues,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: shapValuesSchema })],
  },
  {
    method: 'GET',
    path: '/shap-values/:predictionId',
    handler: ExplainabilityController.getShapValues,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE LIME EXPLANATIONS =====
  {
    method: 'POST',
    path: '/lime-explanations',
    handler: ExplainabilityController.generateLimeExplanation,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: limeExplanationSchema })],
  },
  {
    method: 'GET',
    path: '/lime-explanations/:id',
    handler: ExplainabilityController.getLimeExplanation,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE MODEL INTERPRETABILITY =====
  {
    method: 'GET',
    path: '/interpretability/:modelId',
    handler: ExplainabilityController.getModelInterpretability,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'POST',
    path: '/interpretability/compare',
    handler: ExplainabilityController.compareModelInterpretability,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: compareModelInterpretabilitySchema })],
  },

  // ===== RUTAS DE BUSINESS INSIGHTS =====
  {
    method: 'POST',
    path: '/business-insights',
    handler: ExplainabilityController.generateBusinessInsights,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: businessInsightsSchema })],
  },
  {
    method: 'GET',
    path: '/business-insights/:modelId',
    handler: ExplainabilityController.getBusinessInsights,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE EXPLANATION TEMPLATES =====
  {
    method: 'GET',
    path: '/templates',
    handler: ExplainabilityController.getExplanationTemplates,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'POST',
    path: '/templates',
    handler: ExplainabilityController.createExplanationTemplate,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: createTemplateSchema })],
  },

  // ===== RUTAS DE ESTADO =====
  {
    method: 'GET',
    path: '/status',
    handler: ExplainabilityController.getExplainabilityStatus,
    middlewares: [authMiddleware, standardRateLimit],
  },
] 