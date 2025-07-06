import type { IncomingMessage, ServerResponse } from 'http'
import request from 'supertest'

import { server } from '../index.js'

/**
 * Test helper for Node.js pure HTTP server
 */
export class TestServer {
  private port: number
  private server: typeof server

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
  async request(method: string, path: string, options: {
    headers?: Record<string, string>
    _body?: unknown
  } = {}) {
    const { headers = {}, body } = options

    const req = request(this.server)[method.toLowerCase()](path)
      .set(headers)

    if (body) {
      req.send(body)
    }

    return req
  }

  /**
   * GET request
   */
  async get(path: string, options?: { headers?: Record<string, string> }) {
    return this.request('GET', path, options)
  }

  /**
   * POST request
   */
  async post(path: string, _body?: unknown, options?: { headers?: Record<string, string> }) {
    return this.request('POST', path, { ...options, body })
  }

  /**
   * PUT request
   */
  async put(path: string, _body?: unknown, options?: { headers?: Record<string, string> }) {
    return this.request('PUT', path, { ...options, body })
  }

  /**
   * DELETE request
   */
  async delete(path: string, options?: { headers?: Record<string, string> }) {
    return this.request('DELETE', path, options)
  }

  /**
   * PATCH request
   */
  async patch(path: string, _body?: unknown, options?: { headers?: Record<string, string> }) {
    return this.request('PATCH', path, { ...options, body })
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