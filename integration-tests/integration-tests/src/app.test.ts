import request from 'supertest'

import { app } from './app'

describe('Health Endpoint (integration)', () => {
  it('should return status OK', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('OK')
    expect(res.body).toHaveProperty('timestamp')
    expect(res.body).toHaveProperty('uptime')
  })
})
