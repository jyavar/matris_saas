import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { app } from '../index.js'
import { OpenAIService } from '../services/openai.service.js'

describe('OpenAI Routes', () => {
  beforeEach(() => {
    vi.spyOn(OpenAIService, 'sendPrompt').mockImplementation(
      async () => 'Respuesta simulada',
    )
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('POST /openai/prompt responde con answer', async () => {
    const res = await request(app)
      .post('/openai/prompt')
      .send({ prompt: 'Hola, ¿qué es STRATO?' })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('ok', true)
    expect(res.body).toHaveProperty('answer', 'Respuesta simulada')
  })

  it('POST /openai/prompt responde error si prompt inválido', async () => {
    const res = await request(app).post('/openai/prompt').send({ prompt: '' })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})
