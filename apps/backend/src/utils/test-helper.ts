import { IncomingMessage, ServerResponse } from 'http'
import { createServer } from 'http'
import type { AuthenticatedUser } from '../types/express/index.js'

/**
 * Test helper utilities for Node.js native HTTP
 */
export class TestHelper {
  /**
   * Create a mock request object
   */
  static createMockRequest(overrides: Partial<IncomingMessage> = {}): IncomingMessage {
    const req = {
      method: 'GET',
      url: '/test',
      headers: {},
      socket: {
        remoteAddress: '127.0.0.1',
      },
      ...overrides,
    } as IncomingMessage

    return req
  }

  /**
   * Create a mock response object
   */
  static createMockResponse(): ServerResponse & {
    statusCode: number
    headersSent: boolean
    body: unknown
    headers: Record<string, string>
  } {
    const res = {
      statusCode: 200,
      headersSent: false,
      body: null,
      headers: {} as Record<string, string>,
      
      writeHead: function(statusCode: number, headers?: Record<string, string>) {
        this.statusCode = statusCode
        if (headers) {
          Object.assign(this.headers, headers)
        }
        this.headersSent = true
        return this
      },
      
      end: function(chunk?: unknown) {
        if (chunk) {
          this.body = chunk
        }
        this.headersSent = true
        return this
      },
      
      setHeader: function(name: string, value: string) {
        this.headers[name] = value
        return this
      },
      
      getHeader: function(name: string) {
        return this.headers[name]
      },
      
      removeHeader: function(name: string) {
        delete this.headers[name]
      },
      
      write: function(chunk: unknown) {
        if (this.body === null) {
          this.body = chunk
        } else {
          this.body = String(this.body) + String(chunk)
        }
        return true
      },
    } as ServerResponse & {
      statusCode: number
      headersSent: boolean
      body: unknown
      headers: Record<string, string>
    }

    return res
  }

  /**
   * Create a mock authenticated user
   */
  static createMockUser(overrides: Partial<AuthenticatedUser> = {}): AuthenticatedUser {
    return {
      id: 'test-user-id',
      email: 'test@example.com',
      role: 'user',
      ...overrides,
    }
  }

  /**
   * Create a mock request with authenticated user
   */
  static createAuthenticatedRequest(
    user: AuthenticatedUser,
    overrides: Partial<IncomingMessage> = {}
  ): IncomingMessage {
    const req = this.createMockRequest(overrides)
    ;(req as { user?: AuthenticatedUser }).user = user
    return req
  }

  /**
   * Create a mock request with authorization header
   */
  static createAuthorizedRequest(
    token: string,
    overrides: Partial<IncomingMessage> = {}
  ): IncomingMessage {
    const req = this.createMockRequest(overrides)
    req.headers = {
      ...req.headers,
      authorization: `Bearer ${token}`,
    }
    return req
  }

  /**
   * Create a mock request with JSON body
   */
  static createJsonRequest(
    body: Record<string, unknown>,
    overrides: Partial<IncomingMessage> = {}
  ): IncomingMessage {
    const req = this.createMockRequest({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': JSON.stringify(body).length.toString(),
      },
      ...overrides,
    })

    // Mock the body as a readable stream
    const bodyString = JSON.stringify(body)
    let bodyIndex = 0

    req.read = function(size?: number) {
      if (bodyIndex >= bodyString.length) {
        return null
      }
      const chunk = bodyString.slice(bodyIndex, bodyIndex + (size || 1))
      bodyIndex += chunk.length
      return Buffer.from(chunk)
    }

    return req
  }

  /**
   * Create a mock request with query parameters
   */
  static createQueryRequest(
    query: Record<string, string>,
    overrides: Partial<IncomingMessage> = {}
  ): IncomingMessage {
    const queryString = new URLSearchParams(query).toString()
    const url = `/test?${queryString}`
    
    return this.createMockRequest({
      url,
      ...overrides,
    })
  }

  /**
   * Create a mock request with path parameters
   */
  static createPathRequest(
    path: string,
    overrides: Partial<IncomingMessage> = {}
  ): IncomingMessage {
    return this.createMockRequest({
      url: path,
      ...overrides,
    })
  }

  /**
   * Assert response status code
   */
  static assertStatus(res: ServerResponse & { statusCode: number }, expectedStatus: number): void {
    if (res.statusCode !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus}, got ${res.statusCode}`)
    }
  }

  /**
   * Assert response body contains expected data
   */
  static assertBody(res: ServerResponse & { body: unknown }, expectedData: unknown): void {
    const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
    
    if (JSON.stringify(body) !== JSON.stringify(expectedData)) {
      throw new Error(`Expected body ${JSON.stringify(expectedData)}, got ${JSON.stringify(body)}`)
    }
  }

  /**
   * Assert response has specific header
   */
  static assertHeader(
    res: ServerResponse & { headers: Record<string, string> },
    name: string,
    value: string
  ): void {
    if (res.headers[name] !== value) {
      throw new Error(`Expected header ${name}=${value}, got ${res.headers[name]}`)
    }
  }

  /**
   * Create a test server for integration tests
   */
  static createTestServer(handler: (req: IncomingMessage, res: ServerResponse) => void) {
    return createServer(handler)
  }

  /**
   * Wait for a specified number of milliseconds
   */
  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Generate a random string for testing
   */
  static randomString(length: number = 10): string {
    return Math.random().toString(36).substring(2, length + 2)
  }

  /**
   * Generate a random email for testing
   */
  static randomEmail(): string {
    return `test-${this.randomString(8)}@example.com`
  }

  /**
   * Generate a random UUID for testing
   */
  static randomId(): string {
    return `test-${this.randomString(8)}-${this.randomString(4)}-${this.randomString(4)}-${this.randomString(4)}-${this.randomString(12)}`
  }
} 