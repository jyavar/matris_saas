import { Router } from 'express'

import { authMiddleware } from '../middleware/auth.middleware.js'
import { ApiError } from '../utils/ApiError.js'

const router = Router()

router.get('/error-test', (_req, _res, next) => {
  // Test a custom ApiError
  return next(new ApiError(418, "I'm a teapot"))
})

router.get('/unexpected-error-test', (_req, _res, next) => {
  // Test a generic error
  return next(new Error('Something broke!'))
})

router.get('/protected', authMiddleware, (_req, res) => {
  res.status(200).json({ ok: true, message: 'Protected route accessed' })
})

export default router
