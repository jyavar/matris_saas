import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../index.js'

describe('Monitoring Health Check', () => {
  it('GET /posthog/health debe indicar status configurado o no', async () => {
    const res = await request(app).get('/posthog/health')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toHaveProperty('status')
    expect(['configured', 'not_configured']).toContain(res.body.data.status)
    expect(res.body.data).toHaveProperty('timestamp')
  })

  it('GET /posthog/health debe indicar not_configured si falta API_KEY', async () => {
    const originalEnv = process.env.POSTHOG_API_KEY
    delete process.env.POSTHOG_API_KEY
    const res = await request(app).get('/posthog/health')
    expect(res.status).toBe(200)
    expect(res.body.data.status).toBe('not_configured')
    if (originalEnv) process.env.POSTHOG_API_KEY = originalEnv
  })
})
