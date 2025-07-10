import type { IncomingMessage, ServerResponse } from 'http'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index'
import { onboardingService } from '../services/onboarding.service'
import type { AuthenticatedUser } from '../types/express'

// Factory para datos de onboarding
function createTestOnboarding(overrides = {}) {
  return {
    user_id: 'test-user-id',
    email: 'test@example.com',
    tenant_id: 'test-tenant',
    welcome_sent: false,
    setup_complete: false,
    created_at: new Date().toISOString(),
    ...overrides,
  }
}

describe('Onboarding Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mock('../middleware/auth.middleware', () => ({
      authMiddleware: (_req: IncomingMessage, _res: ServerResponse, _next: () => void) => {
        // Mock authentication by setting user in request
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
    vi.spyOn(onboardingService, 'getOnboarding').mockResolvedValue(
      createTestOnboarding(),
    )
    vi.spyOn(onboardingService, 'startOnboarding').mockResolvedValue(
      createTestOnboarding({ setup_complete: false }),
    )
    vi.spyOn(onboardingService, 'completeOnboarding').mockResolvedValue(
      createTestOnboarding({ setup_complete: true }),
    )
  })

  describe('GET /onboarding', () => {
    it('should return onboarding info for user', async () => {
      const res = await request(server).get('/api/onboarding')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.user_id).toBe('test-user-id')
    })
  })

  describe('POST /onboarding/start', () => {
    it('should start onboarding for user', async () => {
      const res = await request(server)
        .post('/api/onboarding/start')
        .send({ email: 'test@example.com' })
      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.setup_complete).toBe(false)
    })
    it('should return 400 for missing email', async () => {
      const res = await request(server)
        .post('/api/onboarding/start')
        .send({ email: '' })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /onboarding/complete', () => {
    it('should complete onboarding for user', async () => {
      const res = await request(server)
        .post('/api/onboarding/complete')
        .send({ user_id: 'test-user-id' })
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.setup_complete).toBe(true)
    })
    it('should return 400 for missing user_id', async () => {
      const res = await request(server)
        .post('/api/onboarding/complete')
        .send({ user_id: '' })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })
})

