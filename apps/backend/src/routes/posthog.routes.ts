import { PostHogController } from '../controllers/posthog.controller.js'

export const posthogRoutes = [
  { method: 'POST', path: '/track', handler: PostHogController.trackEvent },
  {
    method: 'POST',
    path: '/identify',
    handler: PostHogController.identifyUser,
  },
]
