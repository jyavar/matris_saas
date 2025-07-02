import { Request, RequestHandler, Response, Router } from 'express'

import { onboardingController } from '../controllers/onboarding.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

function handleAsync(
  fn: (req: Request, res: Response, next: unknown) => Promise<unknown>,
): RequestHandler {
  return (req: Request, res: Response, next: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn(req, res, next).catch(next as any)
  }
}

// Protected routes (require authentication)
router.use(authMiddleware)

router.get('/', handleAsync(onboardingController.getOnboarding))

router.post('/start', handleAsync(onboardingController.startOnboarding))

router.post('/complete', handleAsync(onboardingController.completeOnboarding))

export default router
