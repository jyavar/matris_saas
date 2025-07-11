import { modelsController } from '../controllers/models.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const modelsRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/', handler: modelsController.getAllModels },
  { method: 'POST', path: '/', handler: modelsController.createModel },
  { method: 'GET', path: '/:id', handler: modelsController.getModelById },
  { method: 'PUT', path: '/:id', handler: modelsController.updateModel },
  { method: 'DELETE', path: '/:id', handler: modelsController.deleteModel },
  { method: 'GET', path: '/:id/versions', handler: modelsController.getModelVersions },
  { method: 'POST', path: '/:id/evaluate', handler: modelsController.evaluateModel },
] 