import { NextFunction, Request, Response, Router } from 'express'

import { launchboardController } from '../controllers/launchboard.controller.js'

const router = Router()

// Helper para manejar async/await en rutas Express
function handleAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

router.get(
  '/launchboard/dashboards',
  handleAsync(launchboardController.getDashboards),
)
router.get(
  '/launchboard/dashboards/:id',
  handleAsync(launchboardController.getDashboardById),
)
router.post(
  '/launchboard/dashboards',
  handleAsync(launchboardController.createDashboard),
)
router.put(
  '/launchboard/dashboards/:id',
  handleAsync(launchboardController.updateDashboard),
)
router.delete(
  '/launchboard/dashboards/:id',
  handleAsync(launchboardController.deleteDashboard),
)

export default router
