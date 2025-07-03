import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

import { app } from '../index.js'

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
      const res = await request(app)
        .get('/api/onboarding')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('success', true)
      expect(res.body).toHaveProperty('data')
    })
  })

  describe('POST /onboarding/start', () => {
    it('should start onboarding with valid email', async () => {
      const res = await request(app)
        .post('/api/onboarding/start')
        .set('Authorization', 'Bearer test-token')
        .send({ email: 'test@example.com' })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('success', true)
    })

    it('should return 400 with invalid email', async () => {
      const res = await request(app)
        .post('/api/onboarding/start')
        .set('Authorization', 'Bearer test-token')
        .send({ email: 'invalid-email' })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })
  })

  describe('POST /onboarding/complete', () => {
    it('should complete onboarding with valid user_id', async () => {
      const res = await request(app)
        .post('/api/onboarding/complete')
        .set('Authorization', 'Bearer test-token')
        .send({ user_id: 'test-user-id' })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('success', true)
    })

    it('should return 400 with missing user_id', async () => {
      const res = await request(app)
        .post('/api/onboarding/complete')
        .set('Authorization', 'Bearer test-token')
        .send({})

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })
  })
})
