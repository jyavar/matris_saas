import type { IncomingMessage, ServerResponse } from 'http'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Onboarding, StartOnboardingData, CompleteOnboardingData } from '../services/onboarding.service'
import type { MockInstance } from 'vitest'
import type { MiddlewareHandler } from '../types/express'

// Mock de servicios antes de importar el server
vi.mock('../services/onboarding.service', () => {
  const actual = vi.importActual<typeof import('../services/onboarding.service')>('../services/onboarding.service')
  return {
    ...actual,
    onboardingService: {
      getOnboarding: vi.fn(),
      startOnboarding: vi.fn(),
      completeOnboarding: vi.fn(),
    },
  }
})

import { server } from '../index'
import type { AuthenticatedUser } from '../types/express'

// Mock de autenticación - hoisted
vi.mock('../middleware/auth.middleware', () => ({
  authMiddleware: vi.fn<Parameters<MiddlewareHandler>, ReturnType<MiddlewareHandler>>((req: IncomingMessage & { user?: AuthenticatedUser }, _res, next) => {
    req.user = {
      id: 'test-user-id',
      email: 'test@example.com',
      tenant_id: 'test-tenant',
    } satisfies AuthenticatedUser
    next()
  }),
}))

// Factory para datos de onboarding
interface TestOnboarding {
  id: string
  user_id: string
  email: string
  name?: string
  tenant_id: string
  step: 'welcome' | 'profile' | 'preferences' | 'verification' | 'complete'
  welcome_sent: boolean
  setup_complete: boolean
  preferences?: Record<string, unknown>
  created_at: string
  updated_at: string
}

function createTestOnboarding(overrides: Partial<TestOnboarding> = {}): TestOnboarding {
  return {
    id: 'test-onboarding-id',
    user_id: 'test-user-id',
    email: 'test@example.com',
    name: 'Test User',
    tenant_id: 'test-tenant',
    step: 'welcome',
    welcome_sent: false,
    setup_complete: false,
    preferences: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

describe('Onboarding Endpoints', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    const { onboardingService } = await import('../services/onboarding.service')
    const mockOnboardingService = vi.mocked(onboardingService)
    vi.mocked(mockOnboardingService.getOnboarding).mockResolvedValue(createTestOnboarding())
    vi.mocked(mockOnboardingService.startOnboarding).mockResolvedValue(createTestOnboarding({ setup_complete: false }))
    vi.mocked(mockOnboardingService.completeOnboarding).mockResolvedValue(createTestOnboarding({ setup_complete: true }))
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

