import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../index.js'

describe('OpenAI Routes', () => {
  it('POST /openai/prompt responde con answer', async () => {
    const res = await request(app)
      .post('/openai/prompt')
      .send({ prompt: 'Hola, ¿qué es STRATO?' })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('ok', true)
    expect(res.body).toHaveProperty('answer')
  })

  it('POST /openai/prompt responde error si prompt inválido', async () => {
    const res = await request(app).post('/openai/prompt').send({ prompt: '' })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})
