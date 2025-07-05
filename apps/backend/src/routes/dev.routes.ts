import { authMiddleware } from '../middleware/auth.middleware.js'
import { ApiError } from '../utils/ApiError.js'

export const devRoutes = [
  { method: 'GET', path: '/error-test', handler: (_req, _res, next) => {
    // Test a custom ApiError
    return next(new ApiError(418, "I'm a teapot"))
  } },
  { method: 'GET', path: '/unexpected-error-test', handler: (_req, _res, next) => {
    // Test a generic error
    return next(new Error('Something broke!'))
  } },
  { method: 'GET', path: '/protected', middlewares: [authMiddleware], handler: (_req, res) => {
    res.status(200).json({ ok: true, message: 'Protected route accessed' })
  } },
]
