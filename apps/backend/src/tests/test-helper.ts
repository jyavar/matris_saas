import { createServer } from 'http'
import { IncomingMessage, ServerResponse } from 'http'
import type { Server } from 'http'
import { server } from '../index.js'

/**
 * Test helper for Node.js pure HTTP server
 */
export class TestServer {
  private server: Server
  private port: number

  constructor(port = 0) {
    this.port = port
    this.server = server
  }

  /**
   * Start the test server
   */
  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        resolve()
      })
    })
  }

  /**
   * Stop the test server
   */
  async stop(): Promise<void> {
    return new Promise((resolve) => {
      this.server.close(() => {
        resolve()
      })
    })
  }

  /**
   * Get the server URL
   */
  getUrl(): string {
    const address = this.server.address()
    if (typeof address === 'string') {
      return address
    }
    if (address && typeof address === 'object') {
      return `http://localhost:${address.port}`
    }
    return 'http://localhost:3001'
  }

  /**
   * Make a request to the server
   */
  async request(
    method: string,
    path: string,
    options: {
      headers?: Record<string, string>
      body?: unknown
      query?: Record<string, string>
    } = {}
  ): Promise<{
    status: number
    body: unknown
    headers: Record<string, string>
  }> {
    const url = new URL(path, this.getUrl())
    
    // Add query parameters
    if (options.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    return new Promise((resolve, reject) => {
      const req = this.server.request(
        {
          method,
          path: url.pathname + url.search,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        },
        (res: IncomingMessage) => {
          let body = ''
          res.on('data', (chunk) => {
            body += chunk.toString()
          })
          res.on('end', () => {
            try {
              const parsedBody = body ? JSON.parse(body) : {}
              resolve({
                status: res.statusCode || 500,
                body: parsedBody,
                headers: res.headers as Record<string, string>,
              })
            } catch (error) {
              resolve({
                status: res.statusCode || 500,
                body: body,
                headers: res.headers as Record<string, string>,
              })
            }
          })
        }
      )

      req.on('error', reject)

      if (options.body) {
        req.write(JSON.stringify(options.body))
      }
      req.end()
    })
  }

  /**
   * GET request
   */
  async get(path: string, options?: { headers?: Record<string, string>; query?: Record<string, string> }) {
    return this.request('GET', path, options)
  }

  /**
   * POST request
   */
  async post(path: string, body?: unknown, options?: { headers?: Record<string, string> }) {
    return this.request('POST', path, { ...options, body })
  }

  /**
   * PUT request
   */
  async put(path: string, body?: unknown, options?: { headers?: Record<string, string> }) {
    return this.request('PUT', path, { ...options, body })
  }

  /**
   * DELETE request
   */
  async delete(path: string, options?: { headers?: Record<string, string> }) {
    return this.request('DELETE', path, options)
  }
}

/**
 * Create a test server instance
 */
export const createTestServer = (port?: number): TestServer => {
  return new TestServer(port)
}

/**
 * Test utilities
 */
export const testUtils = {
  /**
   * Create test user data
   */
  createTestUser: (overrides = {}) => ({
    email: 'test@example.com',
    password: 'password123',
    tenant_id: '00000000-0000-0000-0000-000000000001',
    ...overrides,
  }),

  /**
   * Create test todo data
   */
  createTestTodo: (overrides = {}) => ({
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    priority: 'medium' as const,
    dueDate: new Date().toISOString(),
    ...overrides,
  }),

  /**
   * Create test campaign data
   */
  createTestCampaign: (overrides = {}) => ({
    title: 'Test Campaign',
    description: 'Test Description',
    budget: 1000,
    status: 'draft' as const,
    ...overrides,
  }),
} 