import { ResendService } from '../services/resend.service.js'

export const resendController = {
  async sendEmail(req: any, res: any, next: any) {
    try {
      const { to, subject } = req.body
      if (!to || !subject) {
        return res.status(400).json({ error: 'Faltan campos requeridos' })
      }
      const result = await ResendService.sendEmail(to, subject)
      res.json(result)
    } catch (error) {
      next(error)
    }
  },

  async sendBulkEmail(req: any, res: any, next: any) {
    try {
      const { emails } = req.body
      if (!emails || !Array.isArray(emails)) {
        return res.status(400).json({ error: 'Emails array is required' })
      }
      const results = await Promise.all(
        emails.map((email: any) => ResendService.sendEmail(email.to, email.subject))
      )
      res.json({ success: true, results })
    } catch (error) {
      next(error)
    }
  },

  async getTemplates(req: any, res: any, next: any) {
    try {
      res.json({ success: true, data: [] })
    } catch (error) {
      next(error)
    }
  },

  async createTemplate(req: any, res: any, next: any) {
    try {
      res.status(201).json({ success: true, message: 'Template created' })
    } catch (error) {
      next(error)
    }
  },

  async updateTemplate(req: any, res: any, next: any) {
    try {
      res.json({ success: true, message: 'Template updated' })
    } catch (error) {
      next(error)
    }
  },

  async deleteTemplate(req: any, res: any, next: any) {
    try {
      res.json({ success: true, message: 'Template deleted' })
    } catch (error) {
      next(error)
    }
  },

  async getEmailLogs(req: any, res: any, next: any) {
    try {
      res.json({ success: true, data: [] })
    } catch (error) {
      next(error)
    }
  },

  async getEmailLogById(req: any, res: any, next: any) {
    try {
      res.json({ success: true, data: {} })
    } catch (error) {
      next(error)
    }
  },
} 