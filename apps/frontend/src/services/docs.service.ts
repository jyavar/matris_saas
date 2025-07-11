// Docs service for frontend
import { getSessionToken } from '../lib/supabase'

export interface DocItem {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  author: string
  version: string
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
  published_at?: string
  read_time: number
  views: number
  rating?: number
  featured: boolean
}

export interface DocCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  parent_id?: string
  order: number
  doc_count: number
}

export interface DocSearchResult {
  item: DocItem
  score: number
  highlights: {
    field: string
    snippet: string
  }[]
}

export interface DocResponse {
  success: boolean
  data?: DocItem | DocItem[] | DocCategory[] | DocSearchResult[]
  error?: string
}

export interface ServiceHealth {
  isHealthy: boolean
  lastCheck: number
  responseTime: number
  errorRate: number
}

export class DocsService {
  private static API_BASE_URL = '/api/docs'
  private static circuitBreaker = {
    failures: 0,
    lastFailureTime: 0,
    state: 'CLOSED' as 'CLOSED' | 'OPEN' | 'HALF_OPEN',
    threshold: 5,
    timeout: 60000, // 1 minute
  }

  // Health check method
  static async checkHealth(): Promise<ServiceHealth> {
    const startTime = Date.now()
    let res: Response | undefined
    try {
      const token = await getSessionToken()
      
      // Always try HEAD first, then fallback to GET if needed
      try {
        res = await fetch(`${this.API_BASE_URL}`, {
          method: 'HEAD',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (err) {
        // Fallback: if HEAD fails, try GET
        res = await fetch(`${this.API_BASE_URL}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }

      const responseTime = Date.now() - startTime
      
      if (res.ok) {
        this.circuitBreaker.failures = 0
        this.circuitBreaker.state = 'CLOSED'
        
        return {
          isHealthy: true,
          lastCheck: Date.now(),
          responseTime,
          errorRate: 0,
        }
      } else {
        throw new Error(`Health check failed with status ${res.status}`)
      }
    } catch (error) {
      this.circuitBreaker.failures++
      this.circuitBreaker.lastFailureTime = Date.now()
      
      if (this.circuitBreaker.failures >= this.circuitBreaker.threshold) {
        this.circuitBreaker.state = 'OPEN'
      }
      
      return {
        isHealthy: false,
        lastCheck: Date.now(),
        responseTime: Date.now() - startTime,
        errorRate: this.circuitBreaker.failures / (this.circuitBreaker.failures + 1),
      }
    }
  }

  // Get all documentation
  static async getAllDocs(limit = 20, offset = 0, category?: string): Promise<DocResponse> {
    try {
      const token = await getSessionToken()
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      
      if (category) {
        params.append('category', category)
      }

      const res = await fetch(`${this.API_BASE_URL}?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch docs: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch docs',
      }
    }
  }

  // Get documentation by ID
  static async getDocById(docId: string): Promise<DocResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/${docId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch doc: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch doc',
      }
    }
  }

  // Get documentation by slug
  static async getDocBySlug(slug: string): Promise<DocResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/slug/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch doc: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch doc',
      }
    }
  }

  // Get documentation categories
  static async getCategories(): Promise<DocResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
      }
    }
  }

  // Search documentation
  static async searchDocs(query: string, limit = 10, offset = 0, category?: string): Promise<DocResponse> {
    try {
      const token = await getSessionToken()
      const params = new URLSearchParams({
        q: query,
        limit: limit.toString(),
        offset: offset.toString(),
      })
      
      if (category) {
        params.append('category', category)
      }

      const res = await fetch(`${this.API_BASE_URL}/search?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to search docs: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search docs',
      }
    }
  }

  // Get featured documentation
  static async getFeaturedDocs(limit = 5): Promise<DocResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/featured?limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch featured docs: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch featured docs',
      }
    }
  }

  // Get related documentation
  static async getRelatedDocs(docId: string, limit = 5): Promise<DocResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/${docId}/related?limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch related docs: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch related docs',
      }
    }
  }

  // Increment view count
  static async incrementViews(docId: string): Promise<DocResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/${docId}/views`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to increment views: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to increment views',
      }
    }
  }

  // Rate documentation
  static async rateDoc(docId: string, rating: number): Promise<DocResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/${docId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating }),
      })

      if (!res.ok) {
        throw new Error(`Failed to rate doc: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to rate doc',
      }
    }
  }

  // Get circuit breaker state
  static getCircuitBreakerState() {
    return {
      failures: this.circuitBreaker.failures,
      lastFailureTime: this.circuitBreaker.lastFailureTime,
      state: this.circuitBreaker.state,
    }
  }

  // Reset circuit breaker
  static resetCircuitBreaker() {
    this.circuitBreaker.failures = 0
    this.circuitBreaker.state = 'CLOSED'
    this.circuitBreaker.lastFailureTime = 0
  }

  // Check if circuit breaker is open
  static isCircuitBreakerOpen(): boolean {
    if (this.circuitBreaker.state === 'OPEN') {
      const now = Date.now()
      if (now - this.circuitBreaker.lastFailureTime > this.circuitBreaker.timeout) {
        this.circuitBreaker.state = 'HALF_OPEN'
        return false
      }
      return true
    }
    return false
  }
} 