import { predictionController } from '../controllers/prediction.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const predictionRoutes: RouteDefinition[] = [
  { method: 'POST', path: '/', handler: predictionController.makePrediction },
  { method: 'GET', path: '/:id', handler: predictionController.getPredictionById },
  { method: 'GET', path: '/history/:modelId', handler: predictionController.getPredictionHistory },
  { method: 'GET', path: '/stats/:modelId', handler: predictionController.getPredictionStats },
  { method: 'POST', path: '/batch/:modelId', handler: predictionController.batchPredict },
  { method: 'GET', path: '/performance/:modelId', handler: predictionController.getModelPerformance },
] 