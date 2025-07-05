import { pricingController } from '../controllers/pricing.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'

export const pricingRoutes = [
  { method: 'GET', path: '/plans', handler: handleAsync(pricingController.getPlans) },
  { method: 'GET', path: '/plans/:planId', handler: handleAsync(pricingController.getPlanById) },
  { method: 'POST', path: '/subscriptions', handler: handleAsync(pricingController.createSubscription) },
  { method: 'POST', path: '/plans/:planId/usage', handler: handleAsync(pricingController.checkUsage) },
  { method: 'GET', path: '/subscriptions/:subscriptionId', middlewares: [authMiddleware], handler: handleAsync(pricingController.getSubscription) },
  { method: 'PATCH', path: '/subscriptions/:subscriptionId', middlewares: [authMiddleware], handler: handleAsync(pricingController.updateSubscription) },
  { method: 'DELETE', path: '/subscriptions/:subscriptionId', middlewares: [authMiddleware], handler: handleAsync(pricingController.cancelSubscription) },
]
