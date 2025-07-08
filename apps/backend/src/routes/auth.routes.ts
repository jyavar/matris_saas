import { authController } from '../controllers/auth.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const authRoutes: RouteDefinition[] = [
  { method: 'POST', path: '/signup', handler: authController.signUp },
  { method: 'POST', path: '/signin', handler: authController.signIn },
]
