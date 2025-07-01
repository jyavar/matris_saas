import { NextFunction, Request, Response, Router } from 'express'

import { openaiController } from '../controllers/openai.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

function handleAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

router.post(
  '/generate',
  authMiddleware,
  handleAsync(openaiController.generateText),
)

export default router
