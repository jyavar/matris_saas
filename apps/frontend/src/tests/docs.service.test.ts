import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../lib/supabase', () => ({
  getSessionToken: vi.fn().mockResolvedValue('mock-token')
}))

import { DocsService } from '../services/docs.service'

// Mock del fetch global
const mockFetch = vi.fn()
global.fetch = mockFetch

// Helper para crear mocks de Response más completos
const createMockResponse = (data: unknown, ok = true, status = 200) => ({
  ok,
  status,
  statusText: ok ? 'OK' : 'Error',
  headers: new Map(),
  json: vi.fn().mockResolvedValue(data),
  text: vi.fn().mockResolvedValue(JSON.stringify(data)),
  url: 'http://localhost:3001/api/docs',
  type: 'default' as ResponseType,
  redirected: false,
  body: null,
  bodyUsed: false,
  clone: vi.fn(),
  arrayBuffer: vi.fn(),
  blob: vi.fn(),
  formData: vi.fn()
})

// Factory para crear documentos de prueba
const createTestDoc = (overrides = {}) => ({
  id: '1',
  title: 'Test Document',
  slug: 'test-document',
  content: 'Test content',
  excerpt: 'Test excerpt',
  category: 'guide',
  tags: ['test', 'documentation'],
  author: 'test@example.com',
  version: '1.0.0',
  status: 'published' as const,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  read_time: 5,
  views: 100,
  rating: 4.5,
  featured: false,
  ...overrides
})

describe('DocsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('checkHealth', () => {
    it('should return healthy status when API is available', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({}))

      const result = await DocsService.checkHealth()

      expect(result.isHealthy).toBe(true)
      expect(result.responseTime).toBeGreaterThan(0)
      expect(result.errorRate).toBe(0)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/docs',
        expect.objectContaining({
          method: 'HEAD',
          headers: expect.objectContaining({
            Authorization: 'Bearer mock-token'
          })
        })
      )
    })

    it('should return unhealthy status when API is not available', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await DocsService.checkHealth()

      expect(result.isHealthy).toBe(false)
      expect(result.errorRate).toBeGreaterThan(0)
    })

    it('should return unhealthy status when API returns error', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({}, false, 500))

      const result = await DocsService.checkHealth()

      expect(result.isHealthy).toBe(false)
    })
  })

  describe('getAllDocs', () => {
    it('should fetch documents with default parameters', async () => {
      const mockDocs = [
        createTestDoc({ id: '1' }),
        createTestDoc({ id: '2' })
      ]

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockDocs }))

      const result = await DocsService.getAllDocs()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockDocs)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/docs?limit=20&offset=0',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: 'Bearer mock-token'
          })
        })
      )
    })

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ error: 'Internal server error' }, false, 500))

      const result = await DocsService.getAllDocs()

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })

  describe('getDocById', () => {
    it('should fetch a single document by ID', async () => {
      const mockDoc = createTestDoc({ id: '1' })
      
      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockDoc }))

      const result = await DocsService.getDocById('1')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockDoc)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/docs/1',
        expect.objectContaining({
          method: 'GET'
        })
      )
    })

    it('should handle document not found', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ error: 'Document not found' }, false, 404))

      const result = await DocsService.getDocById('999')

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })

  describe('Circuit Breaker', () => {
    it('should open circuit breaker after multiple failures', async () => {
      // Simular múltiples fallos
      mockFetch.mockRejectedValue(new Error('Network error'))

      // Ejecutar el número de fallos igual al threshold (5)
      for (let i = 0; i < 5; i++) {
        await DocsService.checkHealth()
      }
      
      // Verificar que el circuit breaker se abrió después de 5 fallos
      expect(DocsService.getCircuitBreakerState().state).toBe('OPEN')
    })

    it('should reset circuit breaker', () => {
      DocsService.resetCircuitBreaker()
      expect(DocsService.getCircuitBreakerState().state).toBe('CLOSED')
      expect(DocsService.isCircuitBreakerOpen()).toBe(false)
    })
  })
}) 