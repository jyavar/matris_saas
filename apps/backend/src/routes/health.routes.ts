import { healthController } from '../controllers/health.controller.js'

export const healthRoutes = [
  { method: 'GET', path: '/', handler: healthController.getHealth },
]
