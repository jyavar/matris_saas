import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../index.js'

describe('Onboarding Routes', () => {
  it('POST /onboarding/register responde con ok', async () => {
    const res = await request(app)
      .post('/onboarding/register')
      .send({ email: 'test@example.com', name: 'Test User' })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('ok', true)
    expect(res.body).toHaveProperty('message')
  })

  it('POST /onboarding/register responde error si input inválido', async () => {
    const res = await request(app)
      .post('/onboarding/register')
      .send({ email: 'bad', name: '' })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})
