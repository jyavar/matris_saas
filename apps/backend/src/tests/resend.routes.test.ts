import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../index.js'

describe('Resend Routes', () => {
  it('POST /resend/email responde con ok', async () => {
    const res = await request(app)
      .post('/resend/email')
      .send({ to: 'test@example.com', subject: 'Hola' })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('ok', true)
    expect(res.body).toHaveProperty('message')
  })

  it('POST /resend/email responde error si input inválido', async () => {
    const res = await request(app)
      .post('/resend/email')
      .send({ to: '', subject: '' })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})
