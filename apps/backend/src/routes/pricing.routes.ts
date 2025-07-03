import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'

import { pricingController } from '../controllers/pricing.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

function handleAsync(
  fn: (req: Request, res: Response, next: unknown) => Promise<unknown>,
): RequestHandler {
  return (req: Request, res: Response, next: unknown) => {
    fn(req, res, next).catch(next as unknown as NextFunction)
  }
}

// Public routes (no authentication required)
router.get('/plans', handleAsync(pricingController.getPlans))
router.get('/plans/:planId', handleAsync(pricingController.getPlanById))

// Protected routes (require authentication)
router.use(authMiddleware)

router.post('/subscriptions', handleAsync(pricingController.createSubscription))
router.get(
  '/subscriptions/:subscriptionId',
  handleAsync(pricingController.getSubscription),
)
router.patch(
  '/subscriptions/:subscriptionId',
  handleAsync(pricingController.updateSubscription),
)
router.delete(
  '/subscriptions/:subscriptionId',
  handleAsync(pricingController.cancelSubscription),
)

// Usage tracking
router.post('/plans/:planId/usage', handleAsync(pricingController.checkUsage))

export default router
