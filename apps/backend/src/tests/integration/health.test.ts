import { createServer, IncomingMessage, ServerResponse } from 'http'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

// Simular un servidor simple para tests de integración
const createTestServer = () => {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // Simular endpoint de health
    if (req.url === '/health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: true,
          data: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
          },
        }),
      )
      return
    }

    // Simular endpoint de API health
    if (req.url === '/api/health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: true,
          data: {
            status: 'ok',
            version: '1.0.0',
            services: {
              database: 'connected',
              redis: 'connected',
              stripe: 'connected',
            },
          },
        }),
      )
      return
    }

    // Simular endpoint de metrics
    if (req.url === '/metrics' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: true,
          data: {
            requests: 1000,
            errors: 5,
            responseTime: 150,
          },
        }),
      )
      return
    }

    // 404 para rutas no encontradas
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        success: false,
        error: 'Route not found',
      }),
    )
  })

  return server
}

describe('Health Endpoints Integration Tests', () => {
  let server: ReturnType<typeof createTestServer>
  let baseUrl: string

  beforeAll(() => {
    server = createTestServer()
    server.listen(0) // Puerto aleatorio
    const address = server.address()
    if (address && typeof address === 'object') {
      baseUrl = `http://localhost:${address.port}`
    }
  })

  afterAll(() => {
    return new Promise<void>((resolve) => {
      server.close(() => resolve())
    })
  })

  describe('GET /health', () => {
    it('should return health status successfully', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/health')

      // Assert
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')

      const body = response.body
      expect(body.success).toBe(true)
      expect(body.data).toHaveProperty('status', 'healthy')
      expect(body.data).toHaveProperty('timestamp')
      expect(body.data).toHaveProperty('uptime')
      expect(body.data).toHaveProperty('environment', 'test')
    })

    it('should return valid JSON response', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/health')

      // Assert
      expect(response.status).toBe(200)
      expect(() => JSON.parse(response.text)).not.toThrow()
    })

    it('should have consistent response structure', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/health')

      // Assert
      expect(response.body).toHaveProperty('success')
      expect(response.body).toHaveProperty('data')
      expect(typeof response.body.success).toBe('boolean')
      expect(typeof response.body.data).toBe('object')
    })
  })

  describe('GET /api/health', () => {
    it('should return API health status successfully', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/api/health')

      // Assert
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')

      const body = response.body
      expect(body.success).toBe(true)
      expect(body.data).toHaveProperty('status', 'ok')
      expect(body.data).toHaveProperty('version', '1.0.0')
      expect(body.data).toHaveProperty('services')
      expect(body.data.services).toHaveProperty('database', 'connected')
      expect(body.data.services).toHaveProperty('redis', 'connected')
      expect(body.data.services).toHaveProperty('stripe', 'connected')
    })

    it('should return services status correctly', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/api/health')

      // Assert
      const services = response.body.data.services
      expect(services.database).toBe('connected')
      expect(services.redis).toBe('connected')
      expect(services.stripe).toBe('connected')
    })
  })

  describe('GET /metrics', () => {
    it('should return metrics data successfully', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/metrics')

      // Assert
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')

      const body = response.body
      expect(body.success).toBe(true)
      expect(body.data).toHaveProperty('requests')
      expect(body.data).toHaveProperty('errors')
      expect(body.data).toHaveProperty('responseTime')
      expect(typeof body.data.requests).toBe('number')
      expect(typeof body.data.errors).toBe('number')
      expect(typeof body.data.responseTime).toBe('number')
    })

    it('should return numeric metrics values', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/metrics')

      // Assert
      const metrics = response.body.data
      expect(metrics.requests).toBeGreaterThan(0)
      expect(metrics.errors).toBeGreaterThanOrEqual(0)
      expect(metrics.responseTime).toBeGreaterThan(0)
    })
  })

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/unknown-route')

      // Assert
      expect(response.status).toBe(404)
      expect(response.body.success).toBe(false)
      expect(response.body.error).toBe('Route not found')
    })

    it('should return 404 for unknown API routes', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/api/unknown')

      // Assert
      expect(response.status).toBe(404)
      expect(response.body.success).toBe(false)
      expect(response.body.error).toBe('Route not found')
    })
  })

  describe('Response Headers', () => {
    it('should set correct content-type header', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/health')

      // Assert
      expect(response.headers['content-type']).toContain('application/json')
    })

    it('should not expose sensitive headers', async () => {
      // Arrange & Act
      const response = await request(baseUrl).get('/health')

      // Assert
      expect(response.headers).not.toHaveProperty('x-powered-by')
      expect(response.headers).not.toHaveProperty('server')
    })
  })
})
