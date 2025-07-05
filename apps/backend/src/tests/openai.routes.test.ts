import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index.js'
import { OpenAIService } from '../services/openai.service.js'

// Mock the auth middleware to add a user to the request
vi.mock('../middleware/auth.middleware.js', () => ({
  authMiddleware: (req, res, next) => {
    req.user = { id: 'test-user-id' }
    next()
  },
}))

describe('OpenAI Routes', () => {
  beforeEach(() => {
    vi.spyOn(OpenAIService, 'sendPrompt').mockImplementation(
      async () => 'Respuesta simulada',
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('POST /openai/generate returns generated text', async () => {
    const res = await request(server)
      .post('/api/openai/generate')
      .set('Authorization', 'Bearer test-token')
      .send({ prompt: 'Hola, ¿qué es STRATO?' })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('success', true)
    expect(res.body).toHaveProperty('result')
  })

  it('POST /openai/generate returns error for empty prompt', async () => {
    const res = await request(server)
      .post('/api/openai/generate')
      .set('Authorization', 'Bearer test-token')
      .send({ prompt: '' })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})
