import { profilesController } from '../controllers/profiles.controller.js'

export const profilesRoutes = [
  { method: 'GET', path: '/me', handler: profilesController.getMe },
  { method: 'GET', path: '/', handler: profilesController.getAllProfiles },
  { method: 'GET', path: '/:id', handler: profilesController.getProfileById },
  { method: 'PATCH', path: '/:id', handler: profilesController.updateProfile },
  { method: 'DELETE', path: '/:id', handler: profilesController.deleteProfile },
]
