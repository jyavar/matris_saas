import { resendController } from '../controllers/resend.controller.js'
import type { RouteDefinition } from '../types/express/index.js'

export const resendRoutes: RouteDefinition[] = [
  { method: 'POST', path: '/send', handler: resendController.sendEmail },
  {
    method: 'POST',
    path: '/send-bulk',
    handler: resendController.sendBulkEmail,
  },
  { method: 'GET', path: '/templates', handler: resendController.getTemplates },
  {
    method: 'POST',
    path: '/templates',
    handler: resendController.createTemplate,
  },
  {
    method: 'PUT',
    path: '/templates/:id',
    handler: resendController.updateTemplate,
  },
  {
    method: 'DELETE',
    path: '/templates/:id',
    handler: resendController.deleteTemplate,
  },
  { method: 'GET', path: '/logs', handler: resendController.getEmailLogs },
  {
    method: 'GET',
    path: '/logs/:id',
    handler: resendController.getEmailLogById,
  },
]
