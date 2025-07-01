import { Router, Request, Response, NextFunction } from 'express'
import { emailCampaignsController } from '../controllers/email-campaigns.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

function handleAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

router.get('/', authMiddleware, handleAsync(emailCampaignsController.getCampaigns))
router.get('/:id', authMiddleware, handleAsync(emailCampaignsController.getCampaignById))
router.post('/', authMiddleware, handleAsync(emailCampaignsController.createCampaign))
router.put('/:id', authMiddleware, handleAsync(emailCampaignsController.updateCampaign))
router.delete('/:id', authMiddleware, handleAsync(emailCampaignsController.deleteCampaign))
router.post('/:id/send', authMiddleware, handleAsync(emailCampaignsController.sendCampaign))

export default router 