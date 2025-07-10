/**
 * Test helper utilities for STRATO backend tests
 */

import { createServer, IncomingMessage, ServerResponse } from 'http'

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

/**
 * Create a test server for integration tests
 */
export const createTestServer = () => {
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = req.url || ''
    
    // Health endpoint
    if (url === '/health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
      }))
      return
    }
    
    // API Health endpoint
    if (url === '/api/health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          environment: process.env.NODE_ENV || 'test'
        }
      }))
      return
    }
    
    // Default 404
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      success: false,
      error: 'Route not found'
    }))
  })
} 