import { healthController } from '../controllers/health.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const healthRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/', handler: healthController.getHealth },
]
