import { Router } from 'express'

import { analyticsController } from '../controllers/analytics.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', analyticsController.getAllAnalytics)
router.get('/:id', analyticsController.getAnalyticsById)
router.post('/', analyticsController.createAnalytics)
router.patch('/:id', analyticsController.updateAnalytics)
router.delete('/:id', analyticsController.deleteAnalytics)

export default router
