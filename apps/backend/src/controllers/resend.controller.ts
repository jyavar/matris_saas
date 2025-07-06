import { ResendService } from '../services/resend.service.js'
import { ControllerHandler } from '../types/express/index.js'
import { responseHelpers } from '../utils/controller-refactor.js'

export const resendController = {
  sendEmail: (async (_req, res, _params, _body, _user) => {
    try {
      const { to, subject } = body || {}
      if (!to || !subject || typeof to !== 'string' || typeof subject !== 'string') {
        responseHelpers.badRequest(res, 'Faltan campos requeridos')
        return
      }
      const result = await ResendService.sendEmail(to, subject)
      responseHelpers.success(res, result)
    } catch {
      responseHelpers.error(res, 'Failed to send email')
    }
  }) as ControllerHandler,

  // Placeholder methods for future implementation
  sendBulkEmail: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, { message: 'Bulk email feature not implemented yet' })
    } catch {
      responseHelpers.error(res, 'Failed to send bulk email')
    }
  }) as ControllerHandler,

  getTemplates: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, [])
    } catch {
      responseHelpers.error(res, 'Failed to get templates')
    }
  }) as ControllerHandler,

  createTemplate: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, { message: 'Template creation not implemented yet' }, 201)
    } catch {
      responseHelpers.error(res, 'Failed to create template')
    }
  }) as ControllerHandler,

  updateTemplate: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, { message: 'Template update not implemented yet' })
    } catch {
      responseHelpers.error(res, 'Failed to update template')
    }
  }) as ControllerHandler,

  deleteTemplate: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, { message: 'Template deletion not implemented yet' })
    } catch {
      responseHelpers.error(res, 'Failed to delete template')
    }
  }) as ControllerHandler,

  getEmailLogs: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, [])
    } catch {
      responseHelpers.error(res, 'Failed to get email logs')
    }
  }) as ControllerHandler,

  getEmailLogById: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.notFound(res, 'Email log not found')
    } catch {
      responseHelpers.error(res, 'Failed to get email log')
    }
  }) as ControllerHandler,
}