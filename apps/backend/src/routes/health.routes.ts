import { getHealthStatus } from '../controllers/health.controller.js'

export const healthRoutes = [
  { method: 'GET', path: '/', handler: getHealthStatus },
]
