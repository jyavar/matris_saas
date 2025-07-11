// Billing service for frontend - Enterprise Grade
import { getSessionToken } from '@/lib/supabase'

// Types
export interface Invoice {
  id: string
  amount: number
  currency: string
  description?: string
  customer_id: string
  due_date?: string
  status: 'paid' | 'cancelled' | 'pending'
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  customer_id: string
  plan_id: string
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  current_period_start: string
  current_period_end: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

export interface BillingData {
  invoices: Invoice[]
  subscriptions: Subscription[]
  customer?: Customer
  pagination?: {
    page: number
    limit: number
    total: number
  }
}

export interface BillingResponse<T = BillingData> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
}

export interface CreateInvoiceRequest {
  amount: number
  currency: string
  description?: string
  customer_id?: string
  due_date?: string
}

export interface UpdateInvoiceRequest {
  amount?: number
  currency?: string
  description?: string
  status?: 'paid' | 'cancelled' | 'pending'
  due_date?: string
}

export interface CreateSubscriptionRequest {
  plan_id: string
  customer_id?: string
}

export interface UpdateSubscriptionRequest {
  plan_id?: string
  status?: 'active' | 'canceled' | 'past_due' | 'unpaid'
}

// Circuit Breaker State
interface CircuitBreakerState {
  failures: number
  lastFailureTime: number
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN'
}

// Service Configuration
const SERVICE_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
  circuitBreaker: {
    failureThreshold: 5,
    recoveryTimeout: 30000,
    halfOpenTimeout: 10000,
  },
} as const

// Circuit Breaker Implementation
class CircuitBreaker {
  private state: CircuitBreakerState = {
    failures: 0,
    lastFailureTime: 0,
    state: 'CLOSED',
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state.state === 'OPEN') {
      if (Date.now() - this.state.lastFailureTime > SERVICE_CONFIG.circuitBreaker.recoveryTimeout) {
        this.state.state = 'HALF_OPEN'
      } else {
        throw new Error('Circuit breaker is OPEN - service temporarily unavailable')
      }
    }

    try {
      const result = await operation()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess(): void {
    this.state.failures = 0
    this.state.state = 'CLOSED'
  }

  private onFailure(): void {
    this.state.failures++
    this.state.lastFailureTime = Date.now()

    if (this.state.failures >= SERVICE_CONFIG.circuitBreaker.failureThreshold) {
      this.state.state = 'OPEN'
    }
  }

  getState(): CircuitBreakerState {
    return { ...this.state }
  }
}

// Retry Logic with Exponential Backoff
async function withRetry<T>(
  operation: () => Promise<T>,
  maxAttempts: number = SERVICE_CONFIG.retryAttempts,
  baseDelay: number = SERVICE_CONFIG.retryDelay
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      
      if (attempt === maxAttempts) {
        throw lastError
      }

      const delay = baseDelay * Math.pow(2, attempt - 1)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

// Health Check
async function checkServiceHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${SERVICE_CONFIG.baseUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(SERVICE_CONFIG.timeout),
    })
    return response.ok
  } catch {
    return false
  }
}

// API Client with Circuit Breaker
class BillingApiClient {
  private circuitBreaker = new CircuitBreaker()

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await getSessionToken()
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      signal: AbortSignal.timeout(SERVICE_CONFIG.timeout),
    }

    const finalOptions = { ...defaultOptions, ...options }

    return this.circuitBreaker.execute(async () => {
      const response = await fetch(`${SERVICE_CONFIG.baseUrl}${endpoint}`, finalOptions)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      return response.json()
    })
  }

  async getInvoices(page?: number, limit?: number): Promise<BillingResponse> {
    const params = new URLSearchParams()
    if (page) params.append('page', page.toString())
    if (limit) params.append('limit', limit.toString())

    const endpoint = `/invoices${params.toString() ? `?${params.toString()}` : ''}`
    const data = await this.makeRequest<{ data: Invoice[]; pagination?: BillingData['pagination'] }>(endpoint)
    
    return {
      success: true,
      data: {
        invoices: data.data,
        subscriptions: [],
        pagination: data.pagination,
      },
      timestamp: new Date().toISOString(),
    }
  }

  async getInvoiceById(id: string): Promise<BillingResponse<Invoice>> {
    const data = await this.makeRequest<Invoice>(`/invoices/${id}`)
    
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  async createInvoice(request: CreateInvoiceRequest): Promise<BillingResponse<Invoice>> {
    const data = await this.makeRequest<Invoice>('/invoices', {
      method: 'POST',
      body: JSON.stringify(request),
    })
    
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  async updateInvoice(id: string, request: UpdateInvoiceRequest): Promise<BillingResponse<Invoice>> {
    const data = await this.makeRequest<Invoice>(`/invoices/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(request),
    })
    
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  async deleteInvoice(id: string): Promise<BillingResponse<{ message: string }>> {
    const data = await this.makeRequest<{ message: string }>(`/invoices/${id}`, {
      method: 'DELETE',
    })
    
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  async getSubscriptions(): Promise<BillingResponse<Subscription[]>> {
    const data = await this.makeRequest<Subscription[]>('/subscriptions')
    
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  async createSubscription(request: CreateSubscriptionRequest): Promise<BillingResponse<Subscription>> {
    const data = await this.makeRequest<Subscription>('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(request),
    })
    
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  async updateSubscription(id: string, request: UpdateSubscriptionRequest): Promise<BillingResponse<Subscription>> {
    const data = await this.makeRequest<Subscription>(`/subscriptions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(request),
    })
    
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  async cancelSubscription(id: string): Promise<BillingResponse<{ message: string }>> {
    const data = await this.makeRequest<{ message: string }>(`/subscriptions/${id}`, {
      method: 'DELETE',
    })
    
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  async getCustomer(): Promise<BillingResponse<Customer>> {
    const data = await this.makeRequest<Customer>('/customers/me')
    
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }

  getCircuitBreakerState(): CircuitBreakerState {
    return this.circuitBreaker.getState()
  }
}

// Main Service Class
export class BillingService {
  private static apiClient = new BillingApiClient()

  // Health and Status
  static async checkHealth(): Promise<boolean> {
    return checkServiceHealth()
  }

  static getCircuitBreakerState(): CircuitBreakerState {
    return this.apiClient.getCircuitBreakerState()
  }

  // Invoice Operations
  static async getBillingData(page?: number, limit?: number): Promise<BillingResponse> {
    return withRetry(() => this.apiClient.getInvoices(page, limit))
  }

  static async getInvoiceById(id: string): Promise<BillingResponse<Invoice>> {
    return withRetry(() => this.apiClient.getInvoiceById(id))
  }

  static async createInvoice(request: CreateInvoiceRequest): Promise<BillingResponse<Invoice>> {
    return withRetry(() => this.apiClient.createInvoice(request))
  }

  static async updateInvoice(id: string, request: UpdateInvoiceRequest): Promise<BillingResponse<Invoice>> {
    return withRetry(() => this.apiClient.updateInvoice(id, request))
  }

  static async deleteInvoice(id: string): Promise<BillingResponse<{ message: string }>> {
    return withRetry(() => this.apiClient.deleteInvoice(id))
  }

  // Subscription Operations
  static async getSubscriptions(): Promise<BillingResponse<Subscription[]>> {
    return withRetry(() => this.apiClient.getSubscriptions())
  }

  static async createSubscription(request: CreateSubscriptionRequest): Promise<BillingResponse<Subscription>> {
    return withRetry(() => this.apiClient.createSubscription(request))
  }

  static async updateSubscription(id: string, request: UpdateSubscriptionRequest): Promise<BillingResponse<Subscription>> {
    return withRetry(() => this.apiClient.updateSubscription(id, request))
  }

  static async cancelSubscription(id: string): Promise<BillingResponse<{ message: string }>> {
    return withRetry(() => this.apiClient.cancelSubscription(id))
  }

  // Customer Operations
  static async getCustomer(): Promise<BillingResponse<Customer>> {
    return withRetry(() => this.apiClient.getCustomer())
  }

  // Legacy compatibility methods
  static async updateBilling(request: UpdateInvoiceRequest): Promise<BillingResponse> {
    // This method is kept for backward compatibility
    // It should be replaced with specific update methods
    throw new Error('updateBilling is deprecated. Use updateInvoice or updateSubscription instead.')
  }
} 