import request from 'supertest'
import { describe, expect, it } from 'vitest'

import app from '../index.js'

describe('Health Check', () => {
  it('should return 200 and a healthy status message', async () => {
    const res = await request(app).get('/health')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      status: 'healthy',
      message: 'STRATO Engine is running',
    })
  })
})
