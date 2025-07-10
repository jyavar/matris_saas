import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index'
import { emailCampaignsService } from '../services/email-campaigns.service.js'

// Factory para datos de campaña de email
function createTestCampaign(overrides = {}) {
  return {
    id: 'campaign-1',
    name: 'Welcome Campaign',
    subject: 'Welcome!',
    content: 'Hello, welcome to STRATO!',
    recipients: ['test@example.com'],
    status: 'draft' as const,
    sent_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

describe.skip('Email Campaigns Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mock('../middleware/auth.middleware', () => ({
      authMiddleware: (req: any, res: any, next: () => void) => {
        req.user = { id: 'test-user', email: 'test@example.com' }
        next()
      },
    }))
    vi.spyOn(emailCampaignsService, 'getCampaigns').mockResolvedValue([
      createTestCampaign(),
    ])
    vi.spyOn(emailCampaignsService, 'getCampaignById').mockImplementation(
      async (id: string) => (id === 'campaign-1' ? createTestCampaign() : null),
    )
    vi.spyOn(emailCampaignsService, 'createCampaign').mockResolvedValue(
      createTestCampaign(),
    )
    vi.spyOn(emailCampaignsService, 'updateCampaign').mockImplementation(
      async (id: string) =>
        id === 'campaign-1'
          ? createTestCampaign({ name: 'Updated Campaign' })
          : null,
    )
    vi.spyOn(emailCampaignsService, 'deleteCampaign').mockImplementation(
      async (id: string) => id === 'campaign-1',
    )
    vi.spyOn(emailCampaignsService, 'sendCampaign').mockImplementation(
      async (id: string) =>
        id === 'campaign-1'
          ? { success: true }
          : { success: false, error: 'Not found' },
    )
  })

  describe('GET /api/email-campaigns', () => {
    it('should return all campaigns', async () => {
      const res = await request(server).get('/api/email-campaigns')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
  })

  describe('GET /api/email-campaigns/:id', () => {
    it('should return a campaign by id', async () => {
      const res = await request(server).get('/api/email-campaigns/campaign-1')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.id).toBe('campaign-1')
    })
    it('should return 404 for non-existent campaign', async () => {
      const res = await request(server).get('/api/email-campaigns/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /api/email-campaigns', () => {
    it('should create a campaign with valid data', async () => {
      const res = await request(server)
        .post('/api/email-campaigns')
        .send({
          name: 'Welcome Campaign',
          subject: 'Welcome!',
          content: 'Hello, welcome to STRATO!',
          recipients: ['test@example.com'],
        })
      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.name).toBe('Welcome Campaign')
    })
    it('should return 400 for invalid data', async () => {
      const res = await request(server)
        .post('/api/email-campaigns')
        .send({ name: '', recipients: [] })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })

  describe('PUT /api/email-campaigns/:id', () => {
    it('should update a campaign', async () => {
      const res = await request(server)
        .put('/api/email-campaigns/campaign-1')
        .send({ name: 'Updated Campaign' })
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.name).toBe('Updated Campaign')
    })
    it('should return 404 for non-existent campaign', async () => {
      const res = await request(server)
        .put('/api/email-campaigns/nonexistent')
        .send({ name: 'Does not exist' })
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('DELETE /api/email-campaigns/:id', () => {
    it('should delete a campaign', async () => {
      const res = await request(server).delete('/api/email-campaigns/campaign-1')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })
    it('should return 404 for non-existent campaign', async () => {
      const res = await request(server).delete('/api/email-campaigns/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /api/email-campaigns/:id/send', () => {
    it('should send a campaign', async () => {
      const res = await request(server).post('/api/email-campaigns/campaign-1/send')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })
    it('should return 404 for non-existent campaign', async () => {
      const res = await request(server).post('/api/email-campaigns/nonexistent/send')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })
})
