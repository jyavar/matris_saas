import request from 'supertest'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { app } from '../index.js'
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

describe('Email Campaigns Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mock('../middleware/auth.middleware', () => ({
      authMiddleware: (_req: any, _res: any, next: any) => {
        if (_req) _req.user = { id: 'test-user', email: 'test@example.com' }
        return next()
      }
    }))
    vi.spyOn(emailCampaignsService, 'getCampaigns').mockResolvedValue([createTestCampaign()])
    vi.spyOn(emailCampaignsService, 'getCampaignById').mockImplementation(async (id: string) => id === 'campaign-1' ? createTestCampaign() : null)
    vi.spyOn(emailCampaignsService, 'createCampaign').mockResolvedValue(createTestCampaign())
    vi.spyOn(emailCampaignsService, 'updateCampaign').mockImplementation(async (id: string) => id === 'campaign-1' ? createTestCampaign({ name: 'Updated Campaign' }) : null)
    vi.spyOn(emailCampaignsService, 'deleteCampaign').mockImplementation(async (id: string) => id === 'campaign-1')
    vi.spyOn(emailCampaignsService, 'sendCampaign').mockImplementation(async (id: string) => id === 'campaign-1' ? { success: true } : { success: false, error: 'Not found' })
  })

  describe('GET /email-campaigns', () => {
    it('should return all campaigns', async () => {
      const res = await request(app).get('/email-campaigns')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
  })

  describe('GET /email-campaigns/:id', () => {
    it('should return a campaign by id', async () => {
      const res = await request(app).get('/email-campaigns/campaign-1')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.id).toBe('campaign-1')
    })
    it('should return 404 for non-existent campaign', async () => {
      const res = await request(app).get('/email-campaigns/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /email-campaigns', () => {
    it('should create a campaign with valid data', async () => {
      const res = await request(app)
        .post('/email-campaigns')
        .send({
          name: 'Welcome Campaign',
          subject: 'Welcome!',
          content: 'Hello, welcome to STRATO!',
          recipients: ['test@example.com']
        })
      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.name).toBe('Welcome Campaign')
    })
    it('should return 400 for invalid data', async () => {
      const res = await request(app)
        .post('/email-campaigns')
        .send({ name: '', recipients: [] })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })

  describe('PUT /email-campaigns/:id', () => {
    it('should update a campaign', async () => {
      const res = await request(app)
        .put('/email-campaigns/campaign-1')
        .send({ name: 'Updated Campaign' })
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.name).toBe('Updated Campaign')
    })
    it('should return 404 for non-existent campaign', async () => {
      const res = await request(app)
        .put('/email-campaigns/nonexistent')
        .send({ name: 'Does not exist' })
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('DELETE /email-campaigns/:id', () => {
    it('should delete a campaign', async () => {
      const res = await request(app).delete('/email-campaigns/campaign-1')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })
    it('should return 404 for non-existent campaign', async () => {
      const res = await request(app).delete('/email-campaigns/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /email-campaigns/:id/send', () => {
    it('should send a campaign', async () => {
      const res = await request(app).post('/email-campaigns/campaign-1/send')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })
    it('should return 404 for non-existent campaign', async () => {
      const res = await request(app).post('/email-campaigns/nonexistent/send')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })
}) 