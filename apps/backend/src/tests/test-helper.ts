/**
 * Test helper utilities for STRATO backend tests
 */

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