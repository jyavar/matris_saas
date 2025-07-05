import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { server } from '../index'

describe('Health Endpoint (Jest)', () => {
  it('should return status OK', async () => {
    const res = await request(server).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('OK')
    expect(res.body).toHaveProperty('timestamp')
    expect(res.body).toHaveProperty('uptime')
  })
})
