import { pricingController } from '../controllers/pricing.controller.js'

export const pricingRoutes = [
  { method: 'GET', path: '/plans', handler: pricingController.getPlans },
  { method: 'GET', path: '/plans/:planId', handler: pricingController.getPlanById },
  { method: 'POST', path: '/subscriptions', handler: pricingController.createSubscription },
  { method: 'POST', path: '/plans/:planId/usage', handler: pricingController.checkUsage },
  { method: 'GET', path: '/subscriptions/:subscriptionId', handler: pricingController.getSubscription },
  { method: 'PATCH', path: '/subscriptions/:subscriptionId', handler: pricingController.updateSubscription },
  { method: 'DELETE', path: '/subscriptions/:subscriptionId', handler: pricingController.cancelSubscription },
]
