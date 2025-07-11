import { AutoMLController } from '../controllers/automl.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { standardRateLimit } from '../middleware/rateLimit.middleware.js'
import { createValidationMiddleware } from '../middleware/validation.middleware.js'
import type { RouteDefinition } from '../types/express/index.js'

// ===== RUTAS DE DATASETS =====
const automlRoutes: RouteDefinition[] = [
  {
    method: 'POST',
    path: '/datasets',
    handler: AutoMLController.uploadDataset,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: undefined })],
  },
  {
    method: 'GET',
    path: '/datasets',
    handler: AutoMLController.getDatasets,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/datasets/:id',
    handler: AutoMLController.getDatasetById,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE JOBS =====
  {
    method: 'POST',
    path: '/jobs',
    handler: AutoMLController.createAutoMLJob,
    middlewares: [authMiddleware, standardRateLimit, createValidationMiddleware({ body: undefined })],
  },
  {
    method: 'GET',
    path: '/jobs',
    handler: AutoMLController.getJobs,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/jobs/:id',
    handler: AutoMLController.getJobById,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'DELETE',
    path: '/jobs/:id',
    handler: AutoMLController.cancelJob,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE MÉTRICAS =====
  {
    method: 'GET',
    path: '/metrics/business',
    handler: AutoMLController.getBusinessMetrics,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE FLUJO GUIADO =====
  {
    method: 'GET',
    path: '/guide/quickstart',
    handler: AutoMLController.getQuickStartGuide,
    middlewares: [authMiddleware, standardRateLimit],
  },
  {
    method: 'GET',
    path: '/templates/usecases',
    handler: AutoMLController.getUseCaseTemplates,
    middlewares: [authMiddleware, standardRateLimit],
  },

  // ===== RUTAS DE ESTADO =====
  {
    method: 'GET',
    path: '/status',
    handler: AutoMLController.getAutoMLStatus,
    middlewares: [authMiddleware, standardRateLimit],
  },
]

export { automlRoutes } 