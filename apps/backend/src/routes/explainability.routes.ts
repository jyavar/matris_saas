import { ExplainabilityController } from '../controllers/explainability.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'
import type { RouteDefinition } from '../types/express/index'

// ===== RUTAS DE EXPLAINABILITY =====
export const explainabilityRoutes: RouteDefinition[] = [
  // ===== RUTAS DE EXPLICACIONES =====
  {
    method: 'POST',
    path: '/explanations',
    handler: ExplainabilityController.generateExplanation,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },

  // ===== RUTAS DE BUSINESS INSIGHTS =====
  {
    method: 'POST',
    path: '/business-insights',
    handler: ExplainabilityController.generateBusinessInsights,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
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
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware],
  },

  // ===== RUTAS DE ESTADO =====
  {
    method: 'GET',
    path: '/status',
    handler: ExplainabilityController.getExplainabilityStatus,
    middlewares: [authMiddleware, standardRateLimit],
  },
] 