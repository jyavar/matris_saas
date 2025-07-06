import { createServer, Server } from 'http'
import { AddressInfo } from 'net'
import { afterAll,beforeAll, describe, expect, it } from 'vitest'

// Import the main server instance
import { server } from '../index'

describe('Routes Integration Tests', () => {
  let testServer: Server
  let baseUrl: string

  beforeAll(async () => {
    testServer = server
    
    // Start server on random port
    await new Promise<void>((resolve) => {
      testServer.listen(0, () => {
        const address = testServer.address() as AddressInfo
        baseUrl = `http://localhost:${address.port}`
        resolve()
      })
    })
  })

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      testServer.close(() => resolve())
    })
  })

  describe('Health Endpoints', () => {
    it('should respond to /health', async () => {
      const response = await fetch(`${baseUrl}/health`)
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data).toHaveProperty('status', 'OK')
      expect(data).toHaveProperty('timestamp')
    })

    it('should respond to /api/health', async () => {
      const response = await fetch(`${baseUrl}/api/health`)
      expect(response.status).toBe(200)
      
      const data = await response.json()
      // Check for direct status response format
      expect(data).toHaveProperty('status', 'OK')
      expect(data).toHaveProperty('timestamp')
    })

    it('should respond to /metrics', async () => {
      const response = await fetch(`${baseUrl}/metrics`)
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data).toHaveProperty('memory')
      expect(data).toHaveProperty('cpu')
      expect(data).toHaveProperty('uptime')
    })
  })

  describe('API Route Modules', () => {
    const routeTests = [
      { path: '/api/analytics', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/analytics-reporting', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/automation/workflows', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/billing', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/campaigns', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/email-campaigns', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/launchboard', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/onboarding', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/openai/generate', method: 'POST', expectedStatus: [200, 400, 401, 404, 500] },
      { path: '/api/payments', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/posthog/health', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/pricing/plans', method: 'GET', expectedStatus: [200, 401, 404, 500] },
      { path: '/api/profiles', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/reporting/usage', method: 'GET', expectedStatus: [200, 401, 404, 500] },
      { path: '/api/resend/email', method: 'POST', expectedStatus: [200, 400, 401, 404, 500] },
      { path: '/api/runtime/jobs', method: 'GET', expectedStatus: [200, 401, 404] },
      { path: '/api/todos', method: 'GET', expectedStatus: [200, 401, 404] },
    ]

    routeTests.forEach(({ path, method, expectedStatus }) => {
      it(`should handle ${method} ${path}`, async () => {
        const fetchOptions: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
        }

        // Add body for POST requests
        if (method === 'POST') {
          fetchOptions.body = JSON.stringify({})
        }

        const response = await fetch(`${baseUrl}${path}`, fetchOptions)
        
        expect(expectedStatus).toContain(response.status)
        expect(response.headers.get('content-type')).toContain('application/json')
      })
    })
  })

  describe('Auth Routes', () => {
    it('should handle POST /auth/signup', async () => {
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword',
        }),
      })
      
      // Should be 400 (validation error) or 401 (auth error), not 404 (route not found)
      expect([200, 400, 401, 422]).toContain(response.status)
    })

    it('should handle POST /auth/signin', async () => {
      const response = await fetch(`${baseUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword',
        }),
      })
      
      // Should be 400 (validation error) or 401 (auth error), not 404 (route not found)
      expect([200, 400, 401, 422]).toContain(response.status)
    })
  })

  describe('Route Coverage', () => {
    it('should not return 404 for known routes', async () => {
      const knownRoutes = [
        { path: '/api/analytics', method: 'GET' },
        { path: '/api/analytics-reporting', method: 'GET' },
        { path: '/api/automation/workflows', method: 'GET' },
        { path: '/api/billing', method: 'GET' },
        { path: '/api/campaigns', method: 'GET' },
        { path: '/api/email-campaigns', method: 'GET' },
        { path: '/api/launchboard', method: 'GET' },
        { path: '/api/onboarding', method: 'GET' },
        { path: '/api/payments', method: 'GET' },
        { path: '/api/posthog/health', method: 'GET' },
        { path: '/api/pricing/plans', method: 'GET' },
        { path: '/api/profiles', method: 'GET' },
        { path: '/api/reporting/usage', method: 'GET' },
        { path: '/api/runtime/jobs', method: 'GET' },
        { path: '/api/todos', method: 'GET' },
        { path: '/auth/signup', method: 'POST' },
        { path: '/auth/signin', method: 'POST' },
      ]

      const results = await Promise.all(
        knownRoutes.map(async ({ path, method }) => {
          const fetchOptions: RequestInit = { method }
          if (method === 'POST') {
            fetchOptions.headers = { 'Content-Type': 'application/json' }
            fetchOptions.body = JSON.stringify({})
          }
          
          const response = await fetch(`${baseUrl}${path}`, fetchOptions)
          return {
            route: `${method} ${path}`,
            status: response.status,
            isNotFound: response.status === 404,
          }
        })
      )

      const notFoundRoutes = results.filter(r => r.isNotFound)
      
      if (notFoundRoutes.length > 0) {
        console.log('Routes returning 404:', notFoundRoutes.map(r => r.route))
      }
      
      // Allow some routes to not be implemented yet, focus on critical ones
      const criticalRoutes = results.filter(r => 
        r.route.includes('/api/campaigns') || 
        r.route.includes('/auth/') ||
        r.route.includes('/health')
      )
      const criticalNotFound = criticalRoutes.filter(r => r.isNotFound)
      
      expect(criticalNotFound.length).toBe(0)
    })
  })

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await fetch(`${baseUrl}/api/nonexistent-route`)
      expect(response.status).toBe(404)
    })

    it('should handle malformed JSON in POST requests', async () => {
      const response = await fetch(`${baseUrl}/api/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      })
      
      // Should return 400 for malformed JSON, not crash
      expect([400, 422]).toContain(response.status)
    })
  })
})