// Health service for frontend
import { getSessionToken } from '../lib/supabase'

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  message: string
  timestamp: string
  uptime: number
  memory: {
    used: number
    total: number
    percentage: number
  }
  version: string
  services: {
    [key: string]: {
      status: 'healthy' | 'degraded' | 'unhealthy'
      responseTime: number
      lastCheck: string
    }
  }
}

export interface ServiceHealth {
  isHealthy: boolean
  lastCheck: number
  responseTime: number
  errorRate: number
}

export interface HealthMetrics {
  totalChecks: number
  successfulChecks: number
  failedChecks: number
  averageResponseTime: number
  uptime: number
  lastIncident?: {
    timestamp: string
    duration: number
    description: string
  }
}

export interface HealthResponse {
  success: boolean
  data?: HealthStatus | HealthMetrics
  error?: string
}

export class HealthService {
  private static API_BASE_URL = '/api/health'
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

  // Get detailed health status
  static async getHealthStatus(): Promise<HealthResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch health status: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch health status',
      }
    }
  }

  // Get health metrics
  static async getHealthMetrics(): Promise<HealthResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/metrics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch health metrics: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch health metrics',
      }
    }
  }

  // Check specific service health
  static async checkServiceHealth(serviceName: string): Promise<HealthResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/service/${serviceName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to check service health: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check service health',
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