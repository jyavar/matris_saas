import { PostHogController } from '../controllers/posthog.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const posthogRoutes: RouteDefinition[] = [
  { method: 'GET', path: '/health', handler: PostHogController.getHealth },
  { method: 'POST', path: '/track', handler: PostHogController.trackEvent },
  {
    method: 'POST',
    path: '/identify',
    handler: PostHogController.identifyUser,
  },
]
