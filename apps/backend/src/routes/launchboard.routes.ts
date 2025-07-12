import { launchboardController } from '../controllers/launchboard.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import type { ControllerHandler, RouteDefinition } from '../types/express/index.js'

// Create wrapper functions to match ControllerHandler signature
const wrapHandler = (method: (...args: unknown[]) => Promise<void>): ControllerHandler => {
  return async (req, res, params, body, user) => {
    return method.call(launchboardController, req, res, params, body, user)
  }
}

export const launchboardRoutes: RouteDefinition[] = [
  // Dashboard routes (require authentication)
  {
    method: 'GET',
    path: '/dashboards',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.getDashboards),
  },
  {
    method: 'POST',
    path: '/dashboards',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.createDashboard),
  },
  {
    method: 'GET',
    path: '/dashboards/:id',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.getDashboardById),
  },
  {
    method: 'PUT',
    path: '/dashboards/:id',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.updateDashboard),
  },
  {
    method: 'DELETE',
    path: '/dashboards/:id',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.deleteDashboard),
  },
  // Widget routes (require authentication)
  {
    method: 'GET',
    path: '/dashboards/:id/widgets',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.getWidgets),
  },
  {
    method: 'POST',
    path: '/widgets',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.createWidget),
  },
  {
    method: 'PUT',
    path: '/widgets/:id',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.updateWidget),
  },
  {
    method: 'DELETE',
    path: '/widgets/:id',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.deleteWidget),
  },
  // Widget types route (public, no authentication required)
  {
    method: 'GET',
    path: '/widget-types',
    handler: wrapHandler(launchboardController.getWidgetTypes),
  },
  // Legacy routes for compatibility (require authentication)
  {
    method: 'GET',
    path: '/',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.getLaunchboard),
  },
  {
    method: 'POST',
    path: '/',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.createLaunchboardItem),
  },
  {
    method: 'GET',
    path: '/:id',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.getLaunchboardItemById),
  },
  {
    method: 'PUT',
    path: '/:id',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.updateLaunchboardItem),
  },
  {
    method: 'DELETE',
    path: '/:id',
    middlewares: [authMiddleware],
    handler: wrapHandler(launchboardController.deleteLaunchboardItem),
  },
]
