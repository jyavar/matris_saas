import { trainingController } from '../controllers/training.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const trainingRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/', handler: trainingController.getAllJobs },
  { method: 'POST', path: '/', handler: trainingController.startTraining },
  { method: 'GET', path: '/resources', handler: trainingController.getSystemResources },
  { method: 'GET', path: '/:id', handler: trainingController.getJobById },
  { method: 'POST', path: '/:id/cancel', handler: trainingController.cancelJob },
  { method: 'GET', path: '/:id/logs', handler: trainingController.getJobLogs },
  { method: 'GET', path: '/:id/metrics', handler: trainingController.getJobMetrics },
  { method: 'GET', path: '/history/:modelId', handler: trainingController.getTrainingHistory },
] 