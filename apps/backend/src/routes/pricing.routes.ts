import { Router } from 'express'

import { pricingController } from '../controllers/pricing.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

// Public routes
router.get('/plans', pricingController.getPlans)
router.get('/plans/:planId', pricingController.getPlanById)

// Protected routes (require authentication)
router.use(authMiddleware)

router.post('/subscriptions', pricingController.createSubscription)
router.get('/subscriptions/:subscriptionId', pricingController.getSubscription)
router.put(
  '/subscriptions/:subscriptionId',
  pricingController.updateSubscription,
)
router.delete(
  '/subscriptions/:subscriptionId',
  pricingController.cancelSubscription,
)
router.post('/plans/:planId/usage', pricingController.checkUsage)

export default router
