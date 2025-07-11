import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DocsProvider, useDocs } from '../contexts/DocsContext'

// Mock del servicio Docs
vi.mock('../services/docs.service', () => ({
  DocsService: {
    getAllDocs: vi.fn(),
    getDocById: vi.fn(),
    getDocBySlug: vi.fn(),
    getCategories: vi.fn(),
    searchDocs: vi.fn(),
    getFeaturedDocs: vi.fn(),
    getRelatedDocs: vi.fn(),
    incrementViews: vi.fn(),
    rateDoc: vi.fn(),
    checkHealth: vi.fn(),
    isCircuitBreakerOpen: vi.fn(() => false)
  }
}))

import { DocsService } from '../services/docs.service'

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

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const { 
    state,
    searchDocs, 
    loadDocById,
  } = useDocs()

  return (
    <div>
      <div data-testid="loading">{state.loading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="error">{state.error || 'No Error'}</div>
      <div data-testid="search-error">{state.searchError || 'No Search Error'}</div>
      <div data-testid="docs-count">{state.docs.length}</div>
      <div data-testid="search-results-count">{state.searchResults.length}</div>
      <div data-testid="current-page">{state.currentPage}</div>
      <div data-testid="total-pages">{Math.ceil(state.totalDocs / state.docsPerPage) || 1}</div>
      <div data-testid="search-query">{state.searchQuery}</div>
      <div data-testid="selected-category">{state.selectedCategory || 'None'}</div>
      <button onClick={() => searchDocs('test')}>Search</button>
      <button onClick={() => loadDocById('1')}>Get Doc</button>
    </div>
  )
}

describe('DocsContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset circuit breaker state
    vi.mocked(DocsService.isCircuitBreakerOpen).mockReturnValue(false)
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      render(
        <DocsProvider>
          <TestComponent />
        </DocsProvider>
      )

      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
      expect(screen.getByTestId('error')).toHaveTextContent('No Error')
      expect(screen.getByTestId('docs-count')).toHaveTextContent('0')
      expect(screen.getByTestId('current-page')).toHaveTextContent('1')
      expect(screen.getByTestId('total-pages')).toHaveTextContent('1')
      expect(screen.getByTestId('search-query')).toHaveTextContent('')
      expect(screen.getByTestId('selected-category')).toHaveTextContent('None')
    })
  })

  describe('searchDocs', () => {
    it('should search documents successfully', async () => {
      const mockDocs = [createTestDoc({ id: '1' })]
      const mockSearchResponse = {
        success: true,
        data: mockDocs,
        count: 1,
        query: 'test'
      }

      vi.mocked(DocsService.searchDocs).mockResolvedValue(mockSearchResponse)

      render(
        <DocsProvider>
          <TestComponent />
        </DocsProvider>
      )

      const searchButton = screen.getByText('Search')
      await userEvent.click(searchButton)

      await waitFor(() => {
        expect(screen.getByTestId('search-results-count')).toHaveTextContent('1')
        expect(screen.getByTestId('search-query')).toHaveTextContent('test')
        expect(screen.getByTestId('search-error')).toHaveTextContent('No Search Error')
      })

      expect(DocsService.searchDocs).toHaveBeenCalledWith('test', 10, 0, undefined)
    })

    it('should handle search error', async () => {
      const mockErrorResponse = {
        success: false,
        error: 'Search failed'
      }

      vi.mocked(DocsService.searchDocs).mockResolvedValue(mockErrorResponse)

      render(
        <DocsProvider>
          <TestComponent />
        </DocsProvider>
      )

      const searchButton = screen.getByText('Search')
      await userEvent.click(searchButton)

      await waitFor(() => {
        expect(screen.getByTestId('search-error')).toHaveTextContent('Search failed')
      })
    })

    it('should handle circuit breaker open', async () => {
      vi.mocked(DocsService.isCircuitBreakerOpen).mockReturnValue(true)

      render(
        <DocsProvider>
          <TestComponent />
        </DocsProvider>
      )

      const searchButton = screen.getByText('Search')
      await userEvent.click(searchButton)

      await waitFor(() => {
        expect(screen.getByTestId('search-error')).toHaveTextContent('Service temporarily unavailable')
      })
    })
  })

  describe('loadDocById', () => {
    it('should fetch document by ID successfully', async () => {
      const mockDoc = createTestDoc({ id: '1' })
      const mockResponse = {
        success: true,
        data: mockDoc
      }

      vi.mocked(DocsService.getDocById).mockResolvedValue(mockResponse)

      render(
        <DocsProvider>
          <TestComponent />
        </DocsProvider>
      )

      const getDocButton = screen.getByText('Get Doc')
      await userEvent.click(getDocButton)

      await waitFor(() => {
        expect(DocsService.getDocById).toHaveBeenCalledWith('1')
      })
    })

    it('should handle loadDocById error', async () => {
      const mockErrorResponse = {
        success: false,
        error: 'Document not found'
      }

      vi.mocked(DocsService.getDocById).mockResolvedValue(mockErrorResponse)

      render(
        <DocsProvider>
          <TestComponent />
        </DocsProvider>
      )

      const getDocButton = screen.getByText('Get Doc')
      await userEvent.click(getDocButton)

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Document not found')
      })
    })

    it('should handle circuit breaker open for loadDocById', async () => {
      vi.mocked(DocsService.isCircuitBreakerOpen).mockReturnValue(true)

      render(
        <DocsProvider>
          <TestComponent />
        </DocsProvider>
      )

      const getDocButton = screen.getByText('Get Doc')
      await userEvent.click(getDocButton)

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Service temporarily unavailable')
      })
    })
  })

  describe('loading states', () => {
    it('should show loading state during API calls', async () => {
      let resolvePromise: (value: any) => void
      const promise = new Promise((resolve) => {
        resolvePromise = resolve
      })

      vi.mocked(DocsService.searchDocs).mockReturnValue(promise)

      render(
        <DocsProvider>
          <TestComponent />
        </DocsProvider>
      )

      const searchButton = screen.getByText('Search')
      await userEvent.click(searchButton)

      expect(screen.getByTestId('loading')).toHaveTextContent('Loading')

      resolvePromise!({ success: true, data: [] })
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading')
      })
    })
  })

  describe('error handling', () => {
    it('should clear error when new successful request is made', async () => {
      // Primero simular un error
      vi.mocked(DocsService.searchDocs).mockResolvedValueOnce({
        success: false,
        error: 'Initial error'
      })

      // Luego simular un éxito
      vi.mocked(DocsService.searchDocs).mockResolvedValueOnce({
        success: true,
        data: [createTestDoc()]
      })

      render(
        <DocsProvider>
          <TestComponent />
        </DocsProvider>
      )

      const searchButton = screen.getByText('Search')
      
      // Primer click - error
      await userEvent.click(searchButton)
      await waitFor(() => {
        expect(screen.getByTestId('search-error')).toHaveTextContent('Initial error')
      })

      // Segundo click - éxito
      await userEvent.click(searchButton)
      await waitFor(() => {
        expect(screen.getByTestId('search-error')).toHaveTextContent('No Search Error')
      })
    })
  })
}) 