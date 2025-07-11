import { mlController } from '../controllers/ml.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const mlRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/health', handler: mlController.getHealth },
  { method: 'GET', path: '/metrics', handler: mlController.getMetrics },
  { method: 'GET', path: '/status', handler: mlController.getStatus },
] 