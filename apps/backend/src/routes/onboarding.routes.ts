import { onboardingController } from '../controllers/onboarding.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'
import type { RouteDefinition } from '../types/express/index.js'

export const onboardingRoutes: RouteDefinition[] = [
  {
    method: 'GET',
    path: '/',
    middlewares: [authMiddleware],
    handler: handleAsync(onboardingController.getOnboarding),
  },
  {
    method: 'POST',
    path: '/start',
    middlewares: [authMiddleware],
    handler: handleAsync(onboardingController.startOnboarding),
  },
  {
    method: 'POST',
    path: '/complete',
    middlewares: [authMiddleware],
    handler: handleAsync(onboardingController.completeOnboarding),
  },
]
