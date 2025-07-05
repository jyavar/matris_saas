import { NextFunction, Request, Response, Router } from 'express'

import { analyticsReportingController } from '../controllers/analytics-reporting.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

function handleAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

router.get('/', authMiddleware, handleAsync(analyticsReportingController.getReports))
router.post('/', authMiddleware, handleAsync(analyticsReportingController.createReport))
router.get('/:id', authMiddleware, handleAsync(analyticsReportingController.getReportById))
router.delete('/:id', authMiddleware, handleAsync(analyticsReportingController.deleteReport))

export default router
