import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { createTestServer } from './test-helper.js'

// Type for health response
type HealthResponse = {
  status: string
  timestamp: string
  uptime: number
  memory: Record<string, unknown>
  version: string
}

describe('GET /api/health', () => {
  const testServer = createTestServer()

  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should respond with a 200 status and a health message', async () => {
    const response = await testServer.get('/api/health')
    const body = response.body as HealthResponse

    expect(response.status).toBe(200)
    expect(body).toMatchObject({
      status: 'OK',
      timestamp: expect.any(String),
      uptime: expect.any(Number),
      memory: expect.any(Object),
      version: expect.any(String),
    })
  })
})
