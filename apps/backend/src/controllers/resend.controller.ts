/* eslint-disable @typescript-eslint/no-unused-vars */
import { resendService } from '../services/resend.service.js'
// Simple response helpers to replace controller-refactor
const responseHelpers = {
  success: (res: unknown, data: unknown, statusCode = 200) => {
    res.status(statusCode).json({ success: true, data })
  },
  error: (res: unknown, message: string, statusCode = 500) => {
    res.status(statusCode).json({ success: false, error: message })
  },
  badRequest: (res: unknown, message: string) => {
    res.status(400).json({ success: false, error: message })
  },
  notFound: (res: unknown, message: string) => {
    res.status(404).json({ success: false, error: message })
  },
}
export const resendController = {
  sendEmail: (async (_req, res, _params, _body, _user) => {
    try {
      const { to, subject } = _body || {}
      if (
        !to ||
        !subject ||
        typeof to !== 'string' ||
        typeof subject !== 'string'
      ) {
        responseHelpers.badRequest(res, 'Faltan campos requeridos')
        return
      }
      const result = await resendService.sendEmail(to, subject)
      responseHelpers.success(res, result)
    } catch {
      responseHelpers.error(res, 'Failed to send email')
    }
  }) as ControllerHandler,

  // Placeholder methods for future implementation
  sendBulkEmail: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, {
        message: 'Bulk email feature not implemented yet',
      })
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
      responseHelpers.success(
        res,
        { message: 'Template creation not implemented yet' },
        201,
      )
    } catch {
      responseHelpers.error(res, 'Failed to create template')
    }
  }) as ControllerHandler,

  updateTemplate: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, {
        message: 'Template update not implemented yet',
      })
    } catch {
      responseHelpers.error(res, 'Failed to update template')
    }
  }) as ControllerHandler,

  deleteTemplate: (async (_req, res, _params, _body, _user) => {
    try {
      responseHelpers.success(res, {
        message: 'Template deletion not implemented yet',
      })
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
