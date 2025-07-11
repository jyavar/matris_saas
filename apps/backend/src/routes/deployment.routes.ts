import { deploymentController } from '../controllers/deployment.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const deploymentRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/', handler: deploymentController.getAllDeployments },
  { method: 'POST', path: '/', handler: deploymentController.deployModel },
  { method: 'GET', path: '/:id', handler: deploymentController.getDeploymentById },
  { method: 'PUT', path: '/:id', handler: deploymentController.updateDeployment },
  { method: 'DELETE', path: '/:id', handler: deploymentController.deleteDeployment },
  { method: 'POST', path: '/:id/scale', handler: deploymentController.scaleDeployment },
  { method: 'GET', path: '/:id/metrics', handler: deploymentController.getDeploymentMetrics },
  { method: 'GET', path: '/:id/logs', handler: deploymentController.getDeploymentLogs },
  { method: 'POST', path: '/:id/rollback', handler: deploymentController.rollbackDeployment },
  { method: 'GET', path: '/:id/health', handler: deploymentController.getDeploymentHealth },
] 