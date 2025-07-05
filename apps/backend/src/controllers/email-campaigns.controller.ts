import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { emailCampaignsService } from '../services/email-campaigns.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'
import { ApiError } from '../utils/ApiError.js'

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
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const campaigns = await emailCampaignsService.getCampaigns()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: campaigns, count: campaigns.length }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async getCampaignById(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Campaign ID is required' }))
        return
      }
      const campaign = await emailCampaignsService.getCampaignById(id)
      if (!campaign) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Campaign not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: campaign }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async createCampaign(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const validated = createCampaignSchema.parse(
        body,
      ) as import('../services/email-campaigns.service').CreateCampaignData
      const campaign = await emailCampaignsService.createCampaign(validated)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: campaign, message: 'Campaign created' }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Invalid input data', details: error.errors }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
      }
    }
  },

  async updateCampaign(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Campaign ID is required' }))
        return
      }
      const validated = updateCampaignSchema.parse(body)
      const campaign = await emailCampaignsService.updateCampaign(id, validated)
      if (!campaign) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Campaign not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: campaign, message: 'Campaign updated' }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Invalid input data', details: error.errors }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
      }
    }
  },

  async deleteCampaign(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Campaign ID is required' }))
        return
      }
      const deleted = await emailCampaignsService.deleteCampaign(id)
      if (!deleted) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Campaign not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: 'Campaign deleted' }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  async sendCampaign(
    req: IncomingMessage,
    res: ServerResponse,
    params?: Record<string, string>,
    body?: RequestBody,
    user?: AuthenticatedUser,
  ): Promise<void> {
    try {
      const { id } = params || {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Campaign ID is required' }))
        return
      }
      const result = await emailCampaignsService.sendCampaign(id)
      if (!result.success) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: result.error || 'Send failed' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: 'Campaign sent' }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  // Métodos alias para compatibilidad con el router
  getAll: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return emailCampaignsController.getCampaigns(req, res, params, body, user)
  },
  create: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return emailCampaignsController.createCampaign(req, res, params, body, user)
  },
  getById: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return emailCampaignsController.getCampaignById(req, res, params, body, user)
  },
  update: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return emailCampaignsController.updateCampaign(req, res, params, body, user)
  },
  delete: async (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>, body?: RequestBody, user?: AuthenticatedUser) => {
    return emailCampaignsController.deleteCampaign(req, res, params, body, user)
  },
}
