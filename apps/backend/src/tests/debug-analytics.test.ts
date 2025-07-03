import type { Request, Response } from 'express'
import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

// Mock logger antes de importar la app
vi.mock('../services/logger.service.js', () => ({
  logAction: vi.fn(),
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock supabase
vi.mock('../services/supabase.service.js', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          limit: vi.fn(() => ({
            range: vi.fn(() => Promise.resolve({ data: [], error: null })),
          })),
        })),
      })),
    })),
  },
}))

import { app } from '../index.js'

describe('Debug Analytics', () => {
  it('should return 400 for missing event_name', async () => {
    const invalidEventData = {
      user_id: 'test-user-id',
      properties: { test: 'data' },
    }

    console.error('Sending request with data:', invalidEventData)

    const response = await request(app)
      .post('/analytics/track/event')
      .send(invalidEventData)

    console.error('Response status:', response.status)
    console.error('Response body:', JSON.stringify(response.body, null, 2))
    console.error('Response headers:', response.headers)
    console.log('[TEST][RESPONSE BODY]', response.body)

    // Vamos a ver qué está pasando realmente
    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.error).toBeDefined()
  })

  it('should test direct ZodError', async () => {
    // Test directo del schema
    const { eventSchema } = await import('../services/analytics.service.js')

    try {
      eventSchema.parse({ user_id: 'test' })
    } catch (error) {
      console.error('[DIRECT ZOD ERROR]', error, error.constructor?.name)
      expect(error.constructor?.name).toBe('ZodError')
    }
  })

  it('should test controller directly', async () => {
    // Test directo del controlador
    const { analyticsController } = await import(
      '../controllers/analytics.controller.js'
    )

    const mockReq = {
      body: { user_id: 'test' },
      user: {
        id: 'test-user',
        tenant_id: 'tenant-1',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        email: 'test@example.com',
      },
      get: ((name: string) =>
        name === 'set-cookie' ? [] : '') as Request['get'],
    } as unknown as Request

    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response

    const mockNext = vi.fn()

    await analyticsController.trackEvent(mockReq, mockRes, mockNext)

    // Debería llamar a res.status(400) o a next(error)
    expect((mockRes.status as jest.Mock).mock.calls).toContainEqual([400])
  })
})
