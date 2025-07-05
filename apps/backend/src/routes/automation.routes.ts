import { NextFunction, Request, Response, Router } from 'express'

import { automationController } from '../controllers/automation.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

// Helper para manejar async/await en rutas Express
function handleAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

// Rutas específicas primero
router.get('/workflows', authMiddleware, handleAsync(automationController.getWorkflows))
router.get('/workflows/:id', authMiddleware, handleAsync(automationController.getWorkflowById))
router.post('/workflows', authMiddleware, handleAsync(automationController.createWorkflow))
router.put('/workflows/:id', authMiddleware, handleAsync(automationController.updateWorkflow))
router.delete('/workflows/:id', authMiddleware, handleAsync(automationController.deleteWorkflow))
router.get('/jobs', authMiddleware, handleAsync(automationController.getJobs))
router.get('/jobs/:id', authMiddleware, handleAsync(automationController.getJobById))
router.post('/workflows/:id/execute', authMiddleware, handleAsync(automationController.executeWorkflow))
router.post('/jobs/:id/pause', authMiddleware, handleAsync(automationController.pauseJob))
router.post('/jobs/:id/resume', authMiddleware, handleAsync(automationController.resumeJob))

export default router
