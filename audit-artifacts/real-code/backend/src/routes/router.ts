import { Router } from 'express'

import analyticsRoutes from './analytics.routes.js'
import authRoutes from './auth.routes.js'
import devRoutes from './dev.routes.js'
import healthRoutes from './health.routes.js'
import profilesRoutes from './profiles.routes.js'
import todoRoutes from './todo.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/dev', devRoutes)
router.use('/todos', todoRoutes)
router.use('/auth', authRoutes)
router.use('/profiles', profilesRoutes)
router.use('/analytics', analyticsRoutes)

export default router
