import { profilesController } from '../controllers/profiles.controller.js'
import type { ControllerHandler,RouteDefinition } from '../types/express/index.js'

// Create wrapper functions to match ControllerHandler signature
const wrapHandler = (method: (...args: unknown[]) => Promise<void>): ControllerHandler => {
  return async (req, res, params, body, user) => {
    return method.call(profilesController, req, res, params, body, user)
  }
}

export const profilesRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/me', handler: wrapHandler(profilesController.getMe) },
  { method: 'GET', path: '/', handler: wrapHandler(profilesController.getAllProfiles) },
  { method: 'GET', path: '/:id', handler: wrapHandler(profilesController.getProfileById) },
  { method: 'PATCH', path: '/:id', handler: wrapHandler(profilesController.updateProfile) },
  { method: 'DELETE', path: '/:id', handler: wrapHandler(profilesController.deleteProfile) },
]
