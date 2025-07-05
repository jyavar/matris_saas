import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

import { server } from '../index.js'

// Mock the onboarding service
vi.mock('../services/onboarding.service.js', () => ({
  onboardingService: {
    getOnboarding: vi.fn().mockResolvedValue({
      user_id: 'test-user-id',
      email: 'test@example.com',
      tenant_id: 'test-tenant-id',
      welcome_sent: true,
      setup_complete: false,
      created_at: new Date().toISOString(),
    }),
    startOnboarding: vi.fn().mockResolvedValue({
      user_id: 'test-user-id',
      email: 'test@example.com',
      tenant_id: 'test-tenant-id',
      welcome_sent: true,
      setup_complete: false,
      created_at: new Date().toISOString(),
    }),
    completeOnboarding: vi.fn().mockResolvedValue({
      user_id: 'test-user-id',
      email: 'test@example.com',
      tenant_id: 'test-tenant-id',
      welcome_sent: true,
      setup_complete: true,
      created_at: new Date().toISOString(),
    }),
  },
}))

// Mock the auth middleware to add a user to the request
vi.mock('../middleware/auth.middleware.js', () => ({
  authMiddleware: (req, res, next) => {
    req.user = { id: 'test-user-id' }
    next()
  },
}))

describe('Onboarding Routes', () => {
  describe('GET /onboarding', () => {
    it('should return 200 and onboarding status', async () => {
      const res = await request(server)
        .get('/api/onboarding')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('success', true)
      expect(res.body).toHaveProperty('data')
    })
  })

  describe('POST /onboarding/start', () => {
    it('should start onboarding with valid email', async () => {
      const res = await request(server)
        .post('/api/onboarding/start')
        .set('Authorization', 'Bearer test-token')
        .send({ email: 'test@example.com' })

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('success', true)
      expect(res.body).toHaveProperty('data')
    })

    it('should return 400 with invalid email', async () => {
      const res = await request(server)
        .post('/api/onboarding/start')
        .set('Authorization', 'Bearer test-token')
        .send({ email: 'invalid-email' })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })
  })

  describe('POST /onboarding/complete', () => {
    it('should complete onboarding with valid user_id', async () => {
      const res = await request(server)
        .post('/api/onboarding/complete')
        .set('Authorization', 'Bearer test-token')
        .send({ user_id: 'test-user-id' })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('success', true)
    })

    it('should return 400 with missing user_id', async () => {
      const res = await request(server)
        .post('/api/onboarding/complete')
        .set('Authorization', 'Bearer test-token')
        .send({})

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })
  })
})
