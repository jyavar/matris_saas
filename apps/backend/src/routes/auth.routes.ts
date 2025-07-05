import { authController } from '../controllers/auth.controller.js'

export const authRoutes = [
  { method: 'POST', path: '/signup', handler: authController.signUp },
  { method: 'POST', path: '/signin', handler: authController.signIn },
]
