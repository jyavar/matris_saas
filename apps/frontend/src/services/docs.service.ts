// Docs service for frontend
import { supabase } from '@/lib/supabase'

export interface Document {
  id: string
  title: string
  content: string
  slug: string
  category: 'guide' | 'api' | 'tutorial' | 'reference'
  status: 'draft' | 'published' | 'archived'
  author: string
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
  readTime: number
  views: number
}

export interface DocsResponse {
  success: boolean
  data?: Document | Document[]
  error?: string
}

export interface CreateDocumentRequest {
  title: string
  content: string
  category: Document['category']
  tags: string[]
  author: string
}

export interface UpdateDocumentRequest {
  title?: string
  content?: string
  category?: Document['category']
  status?: Document['status']
  tags?: string[]
}

export interface DocsSearchParams {
  query: string
  category?: Document['category']
  tags?: string[]
  author?: string
  limit?: number
  offset?: number
}

export interface DocsMetrics {
  totalDocuments: number
  publishedDocuments: number
  draftDocuments: number
  totalViews: number
  averageReadTime: number
  popularTags: Array<{ tag: string; count: number }>
}

export class DocsService {
  static async getDocuments(): Promise<DocsResponse> {
    try {
      // TODO: Integrar con API real de docs
      const mockDocuments: Document[] = [
        {
          id: 'doc-1',
          title: 'Getting Started with STRATO',
          content: 'This is a comprehensive guide to get started with STRATO...',
          slug: 'getting-started',
          category: 'guide',
          status: 'published',
          author: 'STRATO Team',
          tags: ['beginner', 'setup', 'tutorial'],
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T15:30:00Z',
          publishedAt: '2024-01-16T09:00:00Z',
          readTime: 5,
          views: 1250,
        },
        {
          id: 'doc-2',
          title: 'API Reference',
          content: 'Complete API reference for STRATO Core OS...',
          slug: 'api-reference',
          category: 'api',
          status: 'published',
          author: 'STRATO Team',
          tags: ['api', 'reference', 'technical'],
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-18T12:00:00Z',
          publishedAt: '2024-01-11T09:00:00Z',
          readTime: 15,
          views: 890,
        },
      ]

      return {
        success: true,
        data: mockDocuments,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch documents',
      }
    }
  }

  static async getDocumentBySlug(slug: string): Promise<DocsResponse> {
    try {
      // TODO: Integrar con API real de docs
      const mockDocument: Document = {
        id: 'doc-1',
        title: 'Sample Document',
        content: 'This is the content of the sample document...',
        slug,
        category: 'guide',
        status: 'published',
        author: 'STRATO Team',
        tags: ['sample', 'guide'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z',
        publishedAt: '2024-01-16T09:00:00Z',
        readTime: 5,
        views: 1250,
      }

      return {
        success: true,
        data: mockDocument,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch document',
      }
    }
  }

  static async createDocument(request: CreateDocumentRequest): Promise<DocsResponse> {
    try {
      // TODO: Integrar con API real de docs
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        title: request.title,
        content: request.content,
        slug: request.title.toLowerCase().replace(/\s+/g, '-'),
        category: request.category,
        status: 'draft',
        author: request.author,
        tags: request.tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readTime: Math.ceil(request.content.split(' ').length / 200),
        views: 0,
      }

      return {
        success: true,
        data: newDocument,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create document',
      }
    }
  }

  static async updateDocument(id: string, request: UpdateDocumentRequest): Promise<DocsResponse> {
    try {
      // TODO: Integrar con API real de docs
      const updatedDocument: Document = {
        id,
        title: request.title || 'Updated Document',
        content: request.content || 'Updated content...',
        slug: 'updated-document',
        category: request.category || 'guide',
        status: request.status || 'published',
        author: 'STRATO Team',
        tags: request.tags || ['updated'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: new Date().toISOString(),
        publishedAt: '2024-01-16T09:00:00Z',
        readTime: 5,
        views: 1250,
      }

      return {
        success: true,
        data: updatedDocument,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update document',
      }
    }
  }

  static async deleteDocument(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      // TODO: Integrar con API real de docs
      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete document',
      }
    }
  }

  static async searchDocuments(params: DocsSearchParams): Promise<DocsResponse> {
    try {
      // TODO: Integrar con API real de docs
      const mockSearchResults: Document[] = [
        {
          id: 'doc-1',
          title: 'Search Result Document',
          content: 'This document matches the search query...',
          slug: 'search-result',
          category: 'guide',
          status: 'published',
          author: 'STRATO Team',
          tags: ['search', 'result'],
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T15:30:00Z',
          publishedAt: '2024-01-16T09:00:00Z',
          readTime: 3,
          views: 500,
        },
      ]

      return {
        success: true,
        data: mockSearchResults,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search documents',
      }
    }
  }

  static async getDocsMetrics(): Promise<{ success: boolean; data?: DocsMetrics; error?: string }> {
    try {
      // TODO: Integrar con API real de docs
      const metrics: DocsMetrics = {
        totalDocuments: 45,
        publishedDocuments: 38,
        draftDocuments: 7,
        totalViews: 15600,
        averageReadTime: 8,
        popularTags: [
          { tag: 'api', count: 12 },
          { tag: 'guide', count: 8 },
          { tag: 'tutorial', count: 6 },
        ],
      }

      return {
        success: true,
        data: metrics,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch docs metrics',
      }
    }
  }
} 