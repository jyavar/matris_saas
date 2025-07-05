import { z } from 'zod'

import { emailCampaignsService } from '../services/email-campaigns.service.js'
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

export class EmailCampaignsController {
  async getCampaigns(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const campaigns = await emailCampaignsService.getCampaigns()
      res
        .status(200)
        .json({ success: true, data: campaigns, count: campaigns.length })
    } catch (error) {
      next(error)
    }
  }

  async getCampaignById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params
      if (!id) throw new ApiError(400, 'Campaign ID is required')
      const campaign = await emailCampaignsService.getCampaignById(id)
      if (!campaign) throw new ApiError(404, 'Campaign not found')
      res.status(200).json({ success: true, data: campaign })
    } catch (error) {
      next(error)
    }
  }

  async createCampaign(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validated = createCampaignSchema.parse(
        req.body,
      ) as import('../services/email-campaigns.service').CreateCampaignData
      const campaign = await emailCampaignsService.createCampaign(validated)
      res
        .status(201)
        .json({ success: true, data: campaign, message: 'Campaign created' })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  }

  async updateCampaign(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params
      if (!id) throw new ApiError(400, 'Campaign ID is required')
      const validated = updateCampaignSchema.parse(req.body)
      const campaign = await emailCampaignsService.updateCampaign(id, validated)
      if (!campaign) throw new ApiError(404, 'Campaign not found')
      res
        .status(200)
        .json({ success: true, data: campaign, message: 'Campaign updated' })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  }

  async deleteCampaign(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params
      if (!id) throw new ApiError(400, 'Campaign ID is required')
      const deleted = await emailCampaignsService.deleteCampaign(id)
      if (!deleted) throw new ApiError(404, 'Campaign not found')
      res.status(200).json({ success: true, message: 'Campaign deleted' })
    } catch (error) {
      next(error)
    }
  }

  async sendCampaign(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params
      if (!id) throw new ApiError(400, 'Campaign ID is required')
      const result = await emailCampaignsService.sendCampaign(id)
      if (!result.success)
        throw new ApiError(404, result.error || 'Send failed')
      res.status(200).json({ success: true, message: 'Campaign sent' })
    } catch (error) {
      next(error)
    }
  }

  // Métodos alias para compatibilidad con el router
  getAll = this.getCampaigns
  create = this.createCampaign
  getById = this.getCampaignById
  update = this.updateCampaign
  delete = this.deleteCampaign
}

export const emailCampaignsController = new EmailCampaignsController()
