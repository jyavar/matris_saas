import { profilesController } from '../controllers/profiles.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'

export const profilesRoutes = [
  { method: 'GET', path: '/me', middlewares: [authMiddleware], handler: handleAsync(profilesController.getMe) },
  { method: 'GET', path: '/', middlewares: [authMiddleware], handler: handleAsync(profilesController.getAllProfiles) },
  { method: 'POST', path: '/', middlewares: [authMiddleware], handler: handleAsync(profilesController.createProfile) },
  { method: 'GET', path: '/:id', middlewares: [authMiddleware], handler: handleAsync(profilesController.getProfileById) },
  { method: 'PATCH', path: '/:id', middlewares: [authMiddleware], handler: handleAsync(profilesController.updateProfile) },
  { method: 'DELETE', path: '/:id', middlewares: [authMiddleware], handler: handleAsync(profilesController.deleteProfile) },
]
