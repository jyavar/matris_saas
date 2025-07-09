import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { createTestServer } from './test-helper'

describe('Health Endpoints', () => {
  let server: any

  beforeAll(async () => {
    server = await createTestServer()
  })

  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve))
    }
  })

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(server).get('/health').expect(200)

      expect(response.body).toHaveProperty('status')
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body).toHaveProperty('uptime')
      expect(typeof response.body.uptime).toBe('number')
    })

    it('should return correct status format', async () => {
      const response = await request(server).get('/health').expect(200)

      expect(response.body.status).toBe('OK')
      expect(response.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })
  })

  describe('GET /api/health', () => {
    it('should return API health status', async () => {
      const response = await request(server).get('/api/health').expect(200)

      expect(response.body).toHaveProperty('success')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('status')
      expect(response.body.data).toHaveProperty('timestamp')
      expect(response.body.data).toHaveProperty('uptime')
    })
  })
})
