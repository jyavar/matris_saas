import { analyticsController } from '../controllers/analytics.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const analyticsRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/', handler: analyticsController.getAllAnalyses },
  { method: 'POST', path: '/', handler: analyticsController.startAnalysis },
  { method: 'GET', path: '/:id', handler: analyticsController.getAnalysisById },
  { method: 'GET', path: '/features/:datasetId', handler: analyticsController.getFeatures },
  { method: 'GET', path: '/features/detail/:id', handler: analyticsController.getFeatureById },
  { method: 'GET', path: '/insights/dataset/:datasetId', handler: analyticsController.getDatasetInsights },
  { method: 'GET', path: '/insights/model/:modelId', handler: analyticsController.getModelInsights },
]
