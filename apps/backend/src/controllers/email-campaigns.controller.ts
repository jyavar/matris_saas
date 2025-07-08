/* eslint-disable @typescript-eslint/no-unused-vars */
import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { emailCampaignsService } from '../services/email-campaigns.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { sendCreated, sendError, sendSuccess, sendValidationError } from '../utils/response.helper.js'

const createCampaignSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
  recipients: z
    .array(z.string().email())
    .min(1, 'At least one recipient is required'),
})

const updateCampaignSchema = z.object({
  name: z.string().min(1).optional(),
  subject: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  recipients: z.array(z.string().email()).optional(),
  status: z.enum(['draft', 'sent', 'scheduled']).optional(),
})

export const emailCampaignsController = {
  async getCampaigns(
    _req: IncomingMessage,
    res: ServerResponse,
    
  ): Promise<void> {
    try {
      const campaigns = await emailCampaignsService.getCampaigns()
      return sendSuccess(res, { campaigns, count: campaigns.length })
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async getCampaignById(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, _error: 'Campaign ID is required' }),
        )
        return
      }
      const campaign = await emailCampaignsService.getCampaignById(id)
      if (!campaign) {
        return
      }
      return sendSuccess(res, campaign)
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async createCampaign(
    _req: IncomingMessage,
    res: ServerResponse,
    _body?: RequestBody,
    
  ): Promise<void> {
    try {
      const validated = createCampaignSchema.parse(_body)
      const campaign = await emailCampaignsService.createCampaign({
        name: validated.name,
        subject: validated.subject,
        content: validated.content,
        recipients: validated.recipients
      })
      return sendCreated(res, campaign, 'Campaign created')
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  async updateCampaign(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, _error: 'Campaign ID is required' }),
        )
        return
      }
      const validated = updateCampaignSchema.parse(_body)
      const campaign = await emailCampaignsService.updateCampaign(id, validated)
      if (!campaign) {
        return
      }
      return sendSuccess(res, campaign, 200, 'Campaign updated')
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendValidationError(res, error.errors, 'Invalid input data')
      } else {
        return sendError(res, 'Internal server error', 500)
      }
    }
  },

  async deleteCampaign(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, _error: 'Campaign ID is required' }),
        )
        return
      }
      const deleted = await emailCampaignsService.deleteCampaign(id)
      if (!deleted) {
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: 'Campaign deleted' }))
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  async sendCampaign(
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    
  ): Promise<void> {
    try {
      const { id } = _params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ success: false, _error: 'Campaign ID is required' }),
        )
        return
      }
      const result = await emailCampaignsService.sendCampaign(id)
      if (!result.success) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            _error: result.error || 'Send failed',
          }),
        )
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: 'Campaign sent' }))
    } catch {
      return sendError(res, 'Internal server error', 500)
    }
  },

  // Métodos alias para compatibilidad con el router
  getAll: async (
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return emailCampaignsController.getCampaigns(_req, res)
  },
  create: async (
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return emailCampaignsController.createCampaign(_req, res, _body)
  },
  getById: async (
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return emailCampaignsController.getCampaignById(_req, res, _params)
  },
  update: async (
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return emailCampaignsController.updateCampaign(
      _req,
      res,
      _params,
      _body
    )
  },
  delete: async (
    _req: IncomingMessage,
    res: ServerResponse,
    _params?: Record<string, string>,
    _body?: RequestBody,
    user?: AuthenticatedUser,
  ) => {
    return emailCampaignsController.deleteCampaign(_req, res, _params)
  },
}
