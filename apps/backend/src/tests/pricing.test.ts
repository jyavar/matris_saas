import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index'

// Mock de autenticación
vi.mock('../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: () => void) => {
    req.user = {
      id: 'test-user-id',
      email: 'test@example.com',
      tenant_id: 'test-tenant'
    }
    next()
  }
}))

// Mock de servicios de pricing y stripe - HOISTED
vi.mock('../services/pricing.service.js', () => ({
  pricingService: {
    getPlans: vi.fn().mockResolvedValue([
      {
        id: 'free',
        name: 'Free',
        price: 0,
        interval: 'month',
        features: [
          'Up to 3 users',
          '1GB storage',
          '1,000 API calls/month',
          'Basic support'
        ],
        limits: {
          users: 3,
          storage: 1024,
          apiCalls: 1000
        }
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 29,
        interval: 'month',
        features: [
          'Up to 25 users',
          '10GB storage',
          '50,000 API calls/month',
          'Priority support',
          'Advanced analytics',
          'Custom integrations'
        ],
        limits: {
          users: 25,
          storage: 10240,
          apiCalls: 50000
        },
        stripePriceId: 'price_pro_monthly'
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 99,
        interval: 'month',
        features: [
          'Unlimited users',
          'Unlimited storage',
          'Unlimited API calls',
          '24/7 support',
          'Advanced analytics',
          'Custom integrations',
          'SLA guarantee',
          'Dedicated account manager'
        ],
        limits: {
          users: -1,
          storage: -1,
          apiCalls: -1
        },
        stripePriceId: 'price_enterprise_monthly'
      }
    ]),
    getPlanById: vi.fn().mockImplementation((id: string) => {
      const plans: Record<string, any> = {
        free: {
          id: 'free',
          name: 'Free',
          price: 0,
          interval: 'month',
          features: [
            'Up to 3 users',
            '1GB storage',
            '1,000 API calls/month',
            'Basic support'
          ],
          limits: {
            users: 3,
            storage: 1024,
            apiCalls: 1000
          }
        },
        pro: {
          id: 'pro',
          name: 'Pro',
          price: 29,
          interval: 'month',
          features: [
            'Up to 25 users',
            '10GB storage',
            '50,000 API calls/month',
            'Priority support',
            'Advanced analytics',
            'Custom integrations'
          ],
          limits: {
            users: 25,
            storage: 10240,
            apiCalls: 50000
          },
          stripePriceId: 'price_pro_monthly'
        },
        enterprise: {
          id: 'enterprise',
          name: 'Enterprise',
          price: 99,
          interval: 'month',
          features: [
            'Unlimited users',
            'Unlimited storage',
            'Unlimited API calls',
            '24/7 support',
            'Advanced analytics',
            'Custom integrations',
            'SLA guarantee',
            'Dedicated account manager'
          ],
          limits: {
            users: -1,
            storage: -1,
            apiCalls: -1
          },
          stripePriceId: 'price_enterprise_monthly'
        }
      }
      return Promise.resolve(plans[id] || null)
    }),
    createSubscription: vi.fn().mockImplementation((data: any) => {
      if (data.planId === 'free') {
        return Promise.resolve({
          id: 'free_subscription',
          status: 'active',
          price: 0,
          planId: 'free'
        })
      }
      if (data.planId === 'pro' && data.customerId) {
        return Promise.resolve({
          id: `mock_pro_${Date.now()}`,
          status: 'active',
          price: 29,
          planId: 'pro',
          customerId: data.customerId
        })
      }
      return Promise.reject(new Error('Plan not found or missing customer ID'))
    }),
    getSubscription: vi.fn().mockImplementation((id: string) => {
      if (id === 'free_subscription') {
        return Promise.resolve({
          id: 'free_subscription',
          status: 'active',
          price: 0,
          planId: 'free'
        })
      }
      if (id.startsWith('mock_pro_')) {
        return Promise.resolve({
          id,
          status: 'active',
          price: 29,
          planId: 'pro'
        })
      }
      return Promise.resolve(null)
    }),
    updateSubscription: vi.fn().mockResolvedValue({
      id: 'mock_subscription',
      status: 'active',
      planId: 'enterprise'
    }),
    cancelSubscription: vi.fn().mockImplementation((id: string) => {
      return Promise.resolve({
        id,
        status: 'cancelled'
      })
    }),
    checkUsage: vi.fn().mockImplementation((planId: string, usage: any) => {
      const limits: Record<string, any> = {
        free: { users: 3, storage: 1024, apiCalls: 1000 },
        pro: { users: 10, storage: 10240, apiCalls: 10000 },
        enterprise: { users: -1, storage: -1, apiCalls: -1 }
      }
      
      const planLimits = limits[planId]
      if (!planLimits) return Promise.reject(new Error('Plan not found'))
      
      const exceeded = []
      const remaining: Record<string, number> = {}
      
      if (planLimits.users === -1) {
        remaining.users = -1
      } else {
        remaining.users = planLimits.users - usage.users
        if (remaining.users < 0) exceeded.push('users')
      }
      
      if (planLimits.storage === -1) {
        remaining.storage = -1
      } else {
        remaining.storage = planLimits.storage - usage.storage
        if (remaining.storage < 0) exceeded.push('storage')
      }
      
      if (planLimits.apiCalls === -1) {
        remaining.apiCalls = -1
      } else {
        remaining.apiCalls = planLimits.apiCalls - usage.apiCalls
        if (remaining.apiCalls < 0) exceeded.push('apiCalls')
      }
      
      return Promise.resolve({
        withinLimits: exceeded.length === 0,
        exceeded,
        remaining
      })
    })
  }
}))

// También necesitamos mockear el logger que se usa en pricing service
vi.mock('../services/logger.service.js', () => ({
  logAction: vi.fn()
}))

describe.skip('Pricing Module', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/pricing/plans', () => {
    it('should return all available plans', async () => {
      const response = await request(server).get('/api/pricing/plans')

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

  describe('GET /api/pricing/plans/:planId', () => {
    it('should return a specific plan', async () => {
      const response = await request(server).get('/api/pricing/plans/pro')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe('pro')
      expect(response.body.data.name).toBe('Pro')
      expect(response.body.data.price).toBe(29)
    })

    it('should return 404 for non-existent plan', async () => {
      const response = await request(server).get('/api/pricing/plans/nonexistent')

      expect(response.status).toBe(404)
      expect(response.body.success).toBe(false)
      expect(response.body.message).toBe('Plan not found')
    })
  })

  describe('POST /api/pricing/subscriptions', () => {
    it('should create a free subscription', async () => {
      const response = await request(server)
        .post('/api/pricing/subscriptions')
        .set('Authorization', 'Bearer mock-token')
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
      const response = await request(server)
        .post('/api/pricing/subscriptions')
        .set('Authorization', 'Bearer mock-token')
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
      const response = await request(server)
        .post('/api/pricing/subscriptions')
        .set('Authorization', 'Bearer mock-token')
        .send({
          planId: 'pro',
          quantity: 1,
        })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe('Customer ID required for paid plans')
    })

    it('should return 404 for non-existent plan', async () => {
      const response = await request(server)
        .post('/api/pricing/subscriptions')
        .set('Authorization', 'Bearer mock-token')
        .send({
          planId: 'nonexistent',
          quantity: 1,
        })

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('Plan not found')
    })
  })

  describe('GET /api/pricing/subscriptions/:subscriptId', () => {
    it('should get subscription details', async () => {
      // First create a subscription
      const createResponse = await request(server)
        .post('/api/pricing/subscriptions')
        .set('Authorization', 'Bearer mock-token')
        .send({
          planId: 'pro',
          customerId: 'cus_test123',
          quantity: 1,
        })

      const subscriptionId = createResponse.body.data.id

      const response = await request(server)
        .get(`/api/pricing/subscriptions/${subscriptionId}`)
        .set('Authorization', 'Bearer mock-token')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe(subscriptionId)
      expect(response.body.data.status).toBe('active')
    })

    it('should get free subscription details', async () => {
      const response = await request(server)
        .get('/api/pricing/subscriptions/free_subscription')
        .set('Authorization', 'Bearer mock-token')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe('free_subscription')
      expect(response.body.data.status).toBe('active')
    })
  })

  describe('PUT /api/pricing/subscriptions/:subscriptId', () => {
    it('should update subscription', async () => {
      // First create a subscription
      const createResponse = await request(server)
        .post('/api/pricing/subscriptions')
        .set('Authorization', 'Bearer mock-token')
        .send({
          planId: 'pro',
          customerId: 'cus_test123',
          quantity: 1,
        })

      const subscriptionId = createResponse.body.data.id

      const response = await request(server)
        .put(`/api/pricing/subscriptions/${subscriptionId}`)
        .set('Authorization', 'Bearer mock-token')
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

  describe('DELETE /api/pricing/subscriptions/:subscriptId', () => {
    it('should cancel subscription', async () => {
      // First create a subscription
      const createResponse = await request(server)
        .post('/api/pricing/subscriptions')
        .set('Authorization', 'Bearer mock-token')
        .send({
          planId: 'pro',
          customerId: 'cus_test123',
          quantity: 1,
        })

      const subscriptionId = createResponse.body.data.id

      const response = await request(server)
        .delete(`/api/pricing/subscriptions/${subscriptionId}`)
        .set('Authorization', 'Bearer mock-token')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe(subscriptionId)
      expect(response.body.data.status).toBe('cancelled')
    })

    it('should cancel free subscription', async () => {
      const response = await request(server)
        .delete('/api/pricing/subscriptions/free_subscription')
        .set('Authorization', 'Bearer mock-token')

      expect(response.status).toBe(200)
      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe('free_subscription')
      expect(response.body.data.status).toBe('cancelled')
    })
  })

  describe('POST /api/pricing/plans/:planId/usage', () => {
    it('should check usage within limits', async () => {
      const response = await request(server)
        .post('/api/pricing/plans/free/usage')
        .set('Authorization', 'Bearer mock-token')
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
      const response = await request(server)
        .post('/api/pricing/plans/free/usage')
        .set('Authorization', 'Bearer mock-token')
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
      const response = await request(server)
        .post('/api/pricing/plans/enterprise/usage')
        .set('Authorization', 'Bearer mock-token')
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
      const response = await request(server)
        .post('/api/pricing/plans/free/usage')
        .set('Authorization', 'Bearer mock-token')
        .send({})

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body.message).toBe(
        'Usage data (users, storage, apiCalls) is required',
      )
    })

    it('should return 404 for non-existent plan', async () => {
      const response = await request(server)
        .post('/api/pricing/plans/nonexistent/usage')
        .set('Authorization', 'Bearer mock-token')
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
      const response = await request(server)
        .post('/api/pricing/subscriptions')
        .send({
          planId: 'free',
          quantity: 1,
        })

      expect(response.status).toBe(401)
    })
  })
})
