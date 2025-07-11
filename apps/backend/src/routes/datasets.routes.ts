import { datasetsController } from '../controllers/datasets.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const datasetsRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/', handler: datasetsController.getAllDatasets },
  { method: 'POST', path: '/', handler: datasetsController.createDataset },
  { method: 'GET', path: '/:id', handler: datasetsController.getDatasetById },
  { method: 'PUT', path: '/:id', handler: datasetsController.updateDataset },
  { method: 'DELETE', path: '/:id', handler: datasetsController.deleteDataset },
  { method: 'POST', path: '/:id/validate', handler: datasetsController.validateDataset },
  { method: 'GET', path: '/:id/statistics', handler: datasetsController.getDatasetStatistics },
] 