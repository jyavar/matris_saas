import { emailCampaignsController } from '../controllers/email-campaigns.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'

export const emailCampaignsRoutes = [
  {
    method: 'GET',
    path: '/',
    handler: handleAsync(emailCampaignsController.getAll),
  },
  {
    method: 'POST',
    path: '/',
    handler: handleAsync(emailCampaignsController.create),
  },
  {
    method: 'GET',
    path: '/:id',
    handler: handleAsync(emailCampaignsController.getById),
  },
  {
    method: 'PUT',
    path: '/:id',
    handler: handleAsync(emailCampaignsController.update),
  },
  {
    method: 'DELETE',
    path: '/:id',
    handler: handleAsync(emailCampaignsController.delete),
  },
  {
    method: 'POST',
    path: '/:id/send',
    middlewares: [authMiddleware],
    handler: handleAsync(emailCampaignsController.sendCampaign),
  },
]
