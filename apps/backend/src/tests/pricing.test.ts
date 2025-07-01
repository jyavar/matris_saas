import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { app } from '../index.js'

describe('Pricing Module', () => {
  let authToken: string
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
  }

  beforeEach(async () => {
    // Create user and get auth token
    await request(app).post('/auth/signup').send(testUser)
    const signInResponse = await request(app)
      .post('/auth/signin')
      .send(testUser)
    authToken = signInResponse.body.access_token
  })

  describe('GET /pricing/plans', () => {
    it('should return all available plans', async () => {
      const response = await request(app).get('/pricing/plans')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.body.data).toHaveLength(3)

      const plans = response.body.data
      expect(plans[0].id).toBe('free')
      expect(plans[1].id).toBe('pro')
      expect(plans[2].id).toBe('enterprise')
    })
  })

  describe('GET /pricing/plans/:planId', () => {
    it('should return a specific plan', async () => {
      const response = await request(app).get('/pricing/plans/pro')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe('pro')
      expect(response.body.data.name).toBe('Pro')
      expect(response.body.data.price).toBe(29)
    })

    it('should return 404 for non-existent plan', async () => {
      const response = await request(app).get('/pricing/plans/nonexistent')

      expect(response.status).toBe(404)
      expect(response.body.success).toBe(false)
      expect(response.body.message).toBe('Plan not found')
    })
  })

  describe('POST /pricing/subscriptions', () => {
    it('should create a free subscription', async () => {
      const response = await request(app)
        .post('/pricing/subscriptions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          planId: 'free',
          quantity: 1,
        })

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe('free_subscription')
      expect(response.body.data.status).toBe('active')
      expect(response.body.data.price).toBe(0)
    })

    it('should create a paid subscription with customer ID', async () => {
      const response = await request(app)
        .post('/pricing/subscriptions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          planId: 'pro',
          customerId: 'cus_test123',
          quantity: 1,
        })

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toMatch(/^mock_pro_\d+$/)
      expect(response.body.data.status).toBe('active')
      expect(response.body.data.price).toBe(29)
    })

    it('should require customer ID for paid plans', async () => {
      const response = await request(app)
        .post('/pricing/subscriptions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          planId: 'pro',
          quantity: 1,
        })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe('Customer ID required for paid plans')
    })

    it('should return 404 for non-existent plan', async () => {
      const response = await request(app)
        .post('/pricing/subscriptions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          planId: 'nonexistent',
          quantity: 1,
        })

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('Plan not found')
    })
  })

  describe('GET /pricing/subscriptions/:subscriptId', () => {
    it('should get subscription details', async () => {
      // First create a subscription
      const createResponse = await request(app)
        .post('/pricing/subscriptions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          planId: 'pro',
          customerId: 'cus_test123',
          quantity: 1,
        })

      const subscriptionId = createResponse.body.data.id

      const response = await request(app)
        .get(`/pricing/subscriptions/${subscriptionId}`)
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe(subscriptionId)
      expect(response.body.data.status).toBe('active')
    })

    it('should get free subscription details', async () => {
      const response = await request(app)
        .get('/pricing/subscriptions/free_subscription')
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe('free_subscription')
      expect(response.body.data.status).toBe('active')
    })
  })

  describe('PUT /pricing/subscriptions/:subscriptId', () => {
    it('should update subscription', async () => {
      // First create a subscription
      const createResponse = await request(app)
        .post('/pricing/subscriptions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          planId: 'pro',
          customerId: 'cus_test123',
          quantity: 1,
        })

      const subscriptionId = createResponse.body.data.id

      const response = await request(app)
        .put(`/pricing/subscriptions/${subscriptionId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          planId: 'enterprise',
          quantity: 2,
        })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe(subscriptionId)
      expect(response.body.data.status).toBe('active')
    })
  })

  describe('DELETE /pricing/subscriptions/:subscriptId', () => {
    it('should cancel subscription', async () => {
      // First create a subscription
      const createResponse = await request(app)
        .post('/pricing/subscriptions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          planId: 'pro',
          customerId: 'cus_test123',
          quantity: 1,
        })

      const subscriptionId = createResponse.body.data.id

      const response = await request(app)
        .delete(`/pricing/subscriptions/${subscriptionId}`)
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe(subscriptionId)
      expect(response.body.data.status).toBe('cancelled')
    })

    it('should cancel free subscription', async () => {
      const response = await request(app)
        .delete('/pricing/subscriptions/free_subscription')
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe('free_subscription')
      expect(response.body.data.status).toBe('cancelled')
    })
  })

  describe('POST /pricing/plans/:planId/usage', () => {
    it('should check usage within limits', async () => {
      const response = await request(app)
        .post('/pricing/plans/free/usage')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          users: 2,
          storage: 500,
          apiCalls: 800,
        })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.withinLimits).toBe(true)
      expect(response.body.data.exceeded).toHaveLength(0)
      expect(response.body.data.remaining.users).toBe(1)
      expect(response.body.data.remaining.storage).toBe(524)
      expect(response.body.data.remaining.apiCalls).toBe(200)
    })

    it('should detect exceeded limits', async () => {
      const response = await request(app)
        .post('/pricing/plans/free/usage')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          users: 5,
          storage: 2000,
          apiCalls: 1500,
        })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.withinLimits).toBe(false)
      expect(response.body.data.exceeded).toContain('users')
      expect(response.body.data.exceeded).toContain('storage')
      expect(response.body.data.exceeded).toContain('apiCalls')
    })

    it('should handle unlimited plan', async () => {
      const response = await request(app)
        .post('/pricing/plans/enterprise/usage')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          users: 1000,
          storage: 1000000,
          apiCalls: 1000000,
        })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.withinLimits).toBe(true)
      expect(response.body.data.exceeded).toHaveLength(0)
      expect(response.body.data.remaining.users).toBe(-1)
      expect(response.body.data.remaining.storage).toBe(-1)
      expect(response.body.data.remaining.apiCalls).toBe(-1)
    })

    it('should require usage data', async () => {
      const response = await request(app)
        .post('/pricing/plans/free/usage')
        .set('Authorization', `Bearer ${authToken}`)
        .send({})

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body.message).toBe(
        'Usage data (users, storage, apiCalls) is required',
      )
    })

    it('should return 404 for non-existent plan', async () => {
      const response = await request(app)
        .post('/pricing/plans/nonexistent/usage')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          users: 1,
          storage: 100,
          apiCalls: 100,
        })

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('Plan not found')
    })
  })

  describe('Authentication', () => {
    it('should require authentication for protected routes', async () => {
      const response = await request(app).post('/pricing/subscriptions').send({
        planId: 'free',
        quantity: 1,
      })

      expect(response.status).toBe(401)
    })
  })
})
