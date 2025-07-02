import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'

import { openaiController } from '../controllers/openai.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

function handleAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn(req, res, next).catch(next as any)
  }
}

router.post(
  '/generate',
  authMiddleware,
  handleAsync(openaiController.generateText),
)

export default router
