// Campaigns service for frontend with circuit breaker and retry logic
import { getSessionToken } from '@/lib/supabase'

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed'

export interface Campaign {
  id: string
  title: string
  description?: string
  budget: number
  start_date?: string
  end_date?: string
  target_audience?: Record<string, unknown>
  status: CampaignStatus
  created_at?: string
  updated_at?: string
}

export interface CreateCampaignRequest {
  title: string
  description?: string
  budget: number
  start_date?: string
  end_date?: string
  target_audience?: Record<string, unknown>
  status?: CampaignStatus
}

export interface UpdateCampaignRequest {
  title?: string
  description?: string
  budget?: number
  start_date?: string
  end_date?: string
  target_audience?: Record<string, unknown>
  status?: CampaignStatus
}

export interface CampaignAnalytics {
  campaign_id: string
  impressions: number
  clicks: number
  conversions: number
  spend: number
  ctr: number
  cpa: number
  created_at?: string
}

export interface CampaignsListResponse {
  success: boolean
  data: {
    campaigns: Campaign[]
    count: number
  }
  error?: string
}

export interface CampaignResponse {
  success: boolean
  data?: Campaign
  error?: string
}

export interface CampaignAnalyticsResponse {
  success: boolean
  data?: CampaignAnalytics
  error?: string
}

// Circuit breaker state
interface CircuitBreakerState {
  failures: number
  lastFailureTime: number
  state: 'closed' | 'open' | 'half-open'
}

// Service health state
interface ServiceHealth {
  isHealthy: boolean
  lastCheck: number
  responseTime: number
  errorRate: number
}

class CircuitBreaker {
  private state: CircuitBreakerState = {
    failures: 0,
    lastFailureTime: 0,
    state: 'closed',
  }

  private readonly failureThreshold = 5
  private readonly timeout = 60000 // 1 minute
  private readonly successThreshold = 2

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state.state === 'open') {
      if (Date.now() - this.state.lastFailureTime > this.timeout) {
        this.state.state = 'half-open'
      } else {
        throw new Error('Circuit breaker is open')
      }
    }

    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess(): void {
    this.state.failures = 0
    if (this.state.state === 'half-open') {
      this.state.state = 'closed'
    }
  }

  private onFailure(): void {
    this.state.failures++
    this.state.lastFailureTime = Date.now()

    if (this.state.failures >= this.failureThreshold) {
      this.state.state = 'open'
    }
  }

  getState(): CircuitBreakerState {
    return { ...this.state }
  }
}

class RetryLogic {
  private readonly maxRetries: number
  private readonly baseDelay: number

  constructor(maxRetries = 3, baseDelay = 1000) {
    this.maxRetries = maxRetries
    this.baseDelay = baseDelay
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')

        if (attempt === this.maxRetries) {
          throw lastError
        }

        const delay = this.baseDelay * Math.pow(2, attempt)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError!
  }
}

export class CampaignsService {
  private static circuitBreaker = new CircuitBreaker()
  private static retryLogic = new RetryLogic()
  private static health: ServiceHealth = {
    isHealthy: true,
    lastCheck: Date.now(),
    responseTime: 0,
    errorRate: 0,
  }

  private static readonly API_BASE_URL = '/api/campaigns'

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
      this.health = {
        isHealthy: res?.ok ?? false,
        lastCheck: Date.now(),
        responseTime,
        errorRate: res?.ok ? 0 : 1,
      }
      return this.health
    } catch (error) {
      this.health = {
        isHealthy: false,
        lastCheck: Date.now(),
        responseTime: Date.now() - startTime,
        errorRate: 1,
      }
      return this.health
    }
  }

  // Get service health
  static getHealth(): ServiceHealth {
    return { ...this.health }
  }

  // Get circuit breaker state
  static getCircuitBreakerState(): CircuitBreakerState {
    return this.circuitBreaker.getState()
  }

  private static async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await getSessionToken()
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, defaultOptions)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  static async list(): Promise<CampaignsListResponse> {
    try {
      const result = await this.circuitBreaker.execute(() =>
        this.retryLogic.execute(async () => {
          const data = await this.makeRequest<{ campaigns: Campaign[]; count: number }>(this.API_BASE_URL)
          return { success: true, data }
        })
      )
      return result
    } catch (error) {
      return {
        success: false,
        data: { campaigns: [], count: 0 },
        error: error instanceof Error ? error.message : 'Failed to fetch campaigns',
      }
    }
  }

  static async getById(id: string): Promise<CampaignResponse> {
    try {
      const result = await this.circuitBreaker.execute(() =>
        this.retryLogic.execute(async () => {
          const data = await this.makeRequest<Campaign>(`${this.API_BASE_URL}/${id}`)
          return { success: true, data }
        })
      )
      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch campaign',
      }
    }
  }

  static async create(request: CreateCampaignRequest): Promise<CampaignResponse> {
    try {
      const result = await this.circuitBreaker.execute(() =>
        this.retryLogic.execute(async () => {
          const data = await this.makeRequest<{ data: Campaign }>(this.API_BASE_URL, {
            method: 'POST',
            body: JSON.stringify(request),
          })
          return { success: true, data: data.data }
        })
      )
      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create campaign',
      }
    }
  }

  static async update(id: string, request: UpdateCampaignRequest): Promise<CampaignResponse> {
    try {
      const result = await this.circuitBreaker.execute(() =>
        this.retryLogic.execute(async () => {
          const data = await this.makeRequest<Campaign>(`${this.API_BASE_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(request),
          })
          return { success: true, data }
        })
      )
      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update campaign',
      }
    }
  }

  static async delete(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await this.circuitBreaker.execute(() =>
        this.retryLogic.execute(async () => {
          await this.makeRequest(`${this.API_BASE_URL}/${id}`, {
            method: 'DELETE',
          })
        })
      )
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete campaign',
      }
    }
  }

  static async pause(id: string): Promise<CampaignResponse> {
    try {
      const result = await this.circuitBreaker.execute(() =>
        this.retryLogic.execute(async () => {
          const data = await this.makeRequest<Campaign>(`${this.API_BASE_URL}/${id}/pause`, {
            method: 'PATCH',
          })
          return { success: true, data }
        })
      )
      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to pause campaign',
      }
    }
  }

  static async resume(id: string): Promise<CampaignResponse> {
    try {
      const result = await this.circuitBreaker.execute(() =>
        this.retryLogic.execute(async () => {
          const data = await this.makeRequest<Campaign>(`${this.API_BASE_URL}/${id}/resume`, {
            method: 'PATCH',
          })
          return { success: true, data }
        })
      )
      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to resume campaign',
      }
    }
  }

  static async getAnalytics(id: string): Promise<CampaignAnalyticsResponse> {
    try {
      const result = await this.circuitBreaker.execute(() =>
        this.retryLogic.execute(async () => {
          const data = await this.makeRequest<CampaignAnalytics>(`${this.API_BASE_URL}/${id}/analytics`)
          return { success: true, data }
        })
      )
      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch campaign analytics',
      }
    }
  }
} 