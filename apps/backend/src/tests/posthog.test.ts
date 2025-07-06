import type { IncomingMessage, ServerResponse } from 'http'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index.js'
import type { AuthenticatedUser } from '../types/express'

// Mocks globales
vi.mock('../middleware/auth.middleware', () => ({
  authMiddleware: (_req: IncomingMessage, _res: ServerResponse, _next: () => void) => {
    if (_req) {
      (_req as unknown as { user: AuthenticatedUser }).user = {
        id: 'test-user-id',
        email: 'test@example.com',
        tenant_id: 'test-tenant',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as AuthenticatedUser
    }
    return next()
  },
}))

vi.mock('../services/posthog.service', () => ({
  posthogService: {
    trackEvent: vi.fn(async ({ event }) => ({ event, status: 'tracked' })),
    identifyUser: vi.fn(async ({ user_id }) => ({
      user_id,
      status: 'identified',
    })),
  },
}))

// Factories
function createTestEvent(overrides = {}) {
  return {
    event: 'test_event',
    properties: { foo: 'bar' },
    user_id: 'test-user-id',
    ...overrides,
  }
}

function createTestTraits(overrides = {}) {
  return {
    user_id: 'test-user-id',
    traits: { plan: 'gold', active: true },
    ...overrides,
  }
}

describe.skip('PostHog Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /posthog/track', () => {
    it('should track event with valid data', async () => {
      const data = createTestEvent()
      const res = await request(server).post('/posthog/track').send(data)
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toMatchObject({
        event: data.event,
        status: 'tracked',
      })
    })

    it('should return 400 for missing event', async () => {
      const res = await request(server)
        .post('/posthog/track')
        .send({ ...createTestEvent(), event: '' })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
      expect(res.body.error).toBe('Validation error')
    })

    it('should return 400 for missing user_id', async () => {
      const res = await request(server)
        .post('/posthog/track')
        .send({ ...createTestEvent(), user_id: '' })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
      expect(res.body.error).toBe('Validation error')
    })

    it('should handle PostHog service errors gracefully', async () => {
      const mod = await import('../services/posthog.service.js')
      vi.mocked(mod.posthogService.trackEvent).mockRejectedValueOnce(
        new Error('PostHog error'),
      )
      const data = createTestEvent()
      const res = await request(server).post('/posthog/track').send(data)
      expect(res.status).toBe(500)
      expect(res.body.success).toBe(false)
    })

    it('should validate properties object', async () => {
      const data = createTestEvent({
        properties: { nested: { value: 'test' }, array: [1, 2, 3] },
      })
      const res = await request(server).post('/posthog/track').send(data)
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })
  })

  describe('POST /posthog/identify', () => {
    it('should identify user with valid data', async () => {
      const data = createTestTraits()
      const res = await request(server).post('/posthog/identify').send(data)
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toMatchObject({
        user_id: data.user_id,
        status: 'identified',
      })
    })

    it('should return 400 for missing user_id', async () => {
      const res = await request(server)
        .post('/posthog/identify')
        .send({ ...createTestTraits(), user_id: '' })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
      expect(res.body.error).toBe('Validation error')
    })

    it('should handle PostHog service errors gracefully', async () => {
      const mod = await import('../services/posthog.service.js')
      vi.mocked(mod.posthogService.identifyUser).mockRejectedValueOnce(
        new Error('PostHog error'),
      )
      const data = createTestTraits()
      const res = await request(server).post('/posthog/identify').send(data)
      expect(res.status).toBe(500)
      expect(res.body.success).toBe(false)
    })

    it('should validate traits object', async () => {
      const data = createTestTraits({
        traits: {
          plan: 'gold',
          active: true,
          metadata: { lastLogin: new Date().toISOString() },
        },
      })
      const res = await request(server).post('/posthog/identify').send(data)
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })
  })

  describe('GET /posthog/health', () => {
    it('should return health status', async () => {
      const res = await request(server).get('/api/posthog/health')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toMatchObject({
        status: expect.stringMatching(/configured|not_configured/),
        timestamp: expect.any(String),
      })
    })

    it('should handle health check errors', async () => {
      // Simular error en el health check
      const originalEnv = process.env.POSTHOG_API_KEY
      delete process.env.POSTHOG_API_KEY

      const res = await request(server).get('/api/posthog/health')

      expect(res.status).toBe(200)
      expect(res.body.data.status).toBe('not_configured')

      // Restaurar variable de entorno
      if (originalEnv) process.env.POSTHOG_API_KEY = originalEnv
    })
  })
})
