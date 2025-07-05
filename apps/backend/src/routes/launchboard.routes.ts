import { launchboardController } from '../controllers/launchboard.controller.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'

export const launchboardRoutes = [
  { method: 'GET', path: '/dashboards', handler: handleAsync(launchboardController.getDashboards) },
  { method: 'POST', path: '/dashboards', handler: handleAsync(launchboardController.createDashboard) },
  { method: 'GET', path: '/dashboards/:id', handler: handleAsync(launchboardController.getDashboardById) },
  { method: 'PUT', path: '/dashboards/:id', handler: handleAsync(launchboardController.updateDashboard) },
  { method: 'DELETE', path: '/dashboards/:id', handler: handleAsync(launchboardController.deleteDashboard) },
]
