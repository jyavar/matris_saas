import { z } from 'zod'

import {
  createCampaign,
  deleteCampaign,
  getCampaignAnalytics,
  getCampaignById,
  getCampaigns,
  pauseCampaign,
  resumeCampaign,
  updateCampaign,
} from '../controllers/campaigns.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { validateBody } from '../middleware/validation.middleware.js'
import type { RouteDefinition } from '../types/express/index.js'

// Validation schemas
const createCampaignSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  budget: z.number().positive('Budget must be positive'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  target_audience: z.record(z.unknown()).optional(),
  status: z.enum(['draft', 'active', 'paused', 'completed']).default('draft'),
})

const updateCampaignSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  budget: z.number().positive('Budget must be positive').optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  target_audience: z.record(z.unknown()).optional(),
  status: z.enum(['draft', 'active', 'paused', 'completed']).optional(),
})

// Route definitions
export const campaignsRoutes: RouteDefinition[] = [
  {
    method: 'GET',
    path: '/api/campaigns',
    handler: getCampaigns,
    middlewares: [authMiddleware],
  },
  {
    method: 'GET',
    path: '/api/campaigns/:id',
    handler: getCampaignById,
    middlewares: [authMiddleware],
  },
  {
    method: 'POST',
    path: '/api/campaigns',
    handler: createCampaign,
    middlewares: [authMiddleware, validateBody(createCampaignSchema)],
  },
  {
    method: 'PUT',
    path: '/api/campaigns/:id',
    handler: updateCampaign,
    middlewares: [authMiddleware, validateBody(updateCampaignSchema)],
  },
  {
    method: 'DELETE',
    path: '/api/campaigns/:id',
    handler: deleteCampaign,
    middlewares: [authMiddleware],
  },
  {
    method: 'PATCH',
    path: '/api/campaigns/:id/pause',
    handler: pauseCampaign,
    middlewares: [authMiddleware],
  },
  {
    method: 'PATCH',
    path: '/api/campaigns/:id/resume',
    handler: resumeCampaign,
    middlewares: [authMiddleware],
  },
  {
    method: 'GET',
    path: '/api/campaigns/:id/analytics',
    handler: getCampaignAnalytics,
    middlewares: [authMiddleware],
  },
]
