import { pricingController } from '../controllers/pricing.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const pricingRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/plans', handler: pricingController.getPlans },
  {
    method: 'GET',
    path: '/plans/:planId',
    handler: pricingController.getPlanById,
  },
  {
    method: 'POST',
    path: '/subscriptions',
    handler: pricingController.createSubscription,
  },
  {
    method: 'GET',
    path: '/subscriptions/:subscriptionId',
    handler: pricingController.getSubscription,
  },
  {
    method: 'PATCH',
    path: '/subscriptions/:subscriptionId',
    handler: pricingController.updateSubscription,
  },
  {
    method: 'DELETE',
    path: '/subscriptions/:subscriptionId',
    handler: pricingController.cancelSubscription,
  },
  {
    method: 'GET',
    path: '/customers/:customerId/subscriptions',
    handler: pricingController.getCustomerSubscriptions,
  },
  {
    method: 'POST',
    path: '/plans/:planId/usage',
    handler: pricingController.checkUsage,
  },
]
