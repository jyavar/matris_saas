import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../index.js'

describe('GET /health', () => {
  it('should respond with a 200 status and a health message', async () => {
    const response = await request(app).get('/health')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      status: 'healthy',
      message: 'STRATO Engine is running',
    })
  })
})
