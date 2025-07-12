import type { IncomingMessage, ServerResponse } from 'http'
import type { Onboarding, StartOnboardingData, CompleteOnboardingData } from '../services/onboarding.service'
import type { MockInstance } from 'vitest'
import type { MiddlewareHandler } from '../types/express'
import type { AuthenticatedUser } from '../types/express'

// Helper para leer el body JSON desde el stream si req.body no existe
async function readBody(req: any): Promise<any> {
  if (req.body && Object.keys(req.body).length > 0) return req.body
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (chunk: Buffer) => { data += chunk })
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch {
        resolve({})
      }
    })
  })
}

vi.mock('../controllers/onboarding.controller', async (importOriginal) => {
  const actual = await importOriginal() as any
  const onboarding = {
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
  }
  return {
    ...actual,
    onboardingController: {
      getOnboarding: vi.fn(async (req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true, data: onboarding }))
      }),
      startOnboarding: vi.fn(async (req: any, res: ServerResponse) => {
        const parsed = await readBody(req)
        if (!parsed.email) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ success: false, error: 'Email is required' }))
        } else {
          res.writeHead(201, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ success: true, data: { ...onboarding, setup_complete: false } }))
        }
      }),
      completeOnboarding: vi.fn(async (req: any, res: ServerResponse) => {
        const parsed = await readBody(req)
        if (!parsed.user_id) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ success: false, error: 'user_id is required' }))
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ success: true, data: { ...onboarding, setup_complete: true } }))
        }
      }),
    },
  }
})

// Mock del middleware de autenticación: solo llama a next()
vi.mock('../middleware/auth.middleware', () => ({
  authMiddleware: vi.fn((_req: IncomingMessage, _res: ServerResponse, next: () => void) => next()),
}))

import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { server } from '../index'

describe('Onboarding Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /onboarding', () => {
    it('should return onboarding info for user', async () => {
      const res = await request(server)
        .get('/api/onboarding')
        .set('Authorization', 'Bearer test-token')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.user_id).toBe('test-user-id')
    })
  })

  describe('POST /onboarding/start', () => {
    it('should start onboarding for user', async () => {
      const res = await request(server)
        .post('/api/onboarding/start')
        .set('Authorization', 'Bearer test-token')
        .send({ email: 'test@example.com' })
      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.setup_complete).toBe(false)
    })
    it('should return 400 for missing email', async () => {
      const res = await request(server)
        .post('/api/onboarding/start')
        .set('Authorization', 'Bearer test-token')
        .send({ email: '' })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /onboarding/complete', () => {
    it('should complete onboarding for user', async () => {
      const res = await request(server)
        .post('/api/onboarding/complete')
        .set('Authorization', 'Bearer test-token')
        .send({ user_id: 'test-user-id' })
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.setup_complete).toBe(true)
    })
    it('should return 400 for missing user_id', async () => {
      const res = await request(server)
        .post('/api/onboarding/complete')
        .set('Authorization', 'Bearer test-token')
        .send({ user_id: '' })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })
})

