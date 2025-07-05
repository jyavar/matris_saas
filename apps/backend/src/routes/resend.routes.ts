import { resendController } from '../controllers/resend.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'

export const resendRoutes = [
  { method: 'POST', path: '/send', middlewares: [authMiddleware], handler: handleAsync(resendController.sendEmail) },
  { method: 'POST', path: '/send-bulk', middlewares: [authMiddleware], handler: handleAsync(resendController.sendBulkEmail) },
  { method: 'GET', path: '/templates', middlewares: [authMiddleware], handler: handleAsync(resendController.getTemplates) },
  { method: 'POST', path: '/templates', middlewares: [authMiddleware], handler: handleAsync(resendController.createTemplate) },
  { method: 'PUT', path: '/templates/:id', middlewares: [authMiddleware], handler: handleAsync(resendController.updateTemplate) },
  { method: 'DELETE', path: '/templates/:id', middlewares: [authMiddleware], handler: handleAsync(resendController.deleteTemplate) },
  { method: 'GET', path: '/logs', middlewares: [authMiddleware], handler: handleAsync(resendController.getEmailLogs) },
  { method: 'GET', path: '/logs/:id', middlewares: [authMiddleware], handler: handleAsync(resendController.getEmailLogById) },
]
