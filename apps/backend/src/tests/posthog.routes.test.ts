import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../index.js'

describe('PostHog Routes', () => {
  it('POST /posthog/event trackea un evento', async () => {
    const res = await request(app)
      .post('/posthog/event')
      .send({
        distinctId: 'user-1',
        event: 'test_event',
        properties: { foo: 'bar' },
      })
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
  })

  it('POST /posthog/event responde 400 si falta distinctId', async () => {
    const res = await request(app)
      .post('/posthog/event')
      .send({ event: 'test_event' })
    expect(res.status).toBe(400)
  })
})
