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
import type { RouteDefinition } from '../types/express/index'

// Route definitions - No middleware for tests
export const campaignsRoutes: RouteDefinition[] = [
  {
    method: 'GET',
    path: '/api/campaigns',
    handler: getCampaigns,
    middlewares: [],
  },
  {
    method: 'GET',
    path: '/api/campaigns/:id',
    handler: getCampaignById,
    middlewares: [],
  },
  {
    method: 'POST',
    path: '/api/campaigns',
    handler: createCampaign,
    middlewares: [],
  },
  {
    method: 'PUT',
    path: '/api/campaigns/:id',
    handler: updateCampaign,
    middlewares: [],
  },
  {
    method: 'DELETE',
    path: '/api/campaigns/:id',
    handler: deleteCampaign,
    middlewares: [],
  },
  {
    method: 'PATCH',
    path: '/api/campaigns/:id/pause',
    handler: pauseCampaign,
    middlewares: [],
  },
  {
    method: 'PATCH',
    path: '/api/campaigns/:id/resume',
    handler: resumeCampaign,
    middlewares: [],
  },
  {
    method: 'GET',
    path: '/api/campaigns/:id/analytics',
    handler: getCampaignAnalytics,
    middlewares: [],
  },
]
