// Merge service for frontend
import { getSessionToken } from '../lib/supabase'

export interface MergeStrategy {
  id: string
  name: string
  description: string
  type: 'squash' | 'merge' | 'rebase' | 'fast-forward'
  auto_resolve_conflicts: boolean
  require_review: boolean
  require_tests: boolean
  require_approval: boolean
  min_approvals: number
  protected_branches: string[]
  created_at: string
  updated_at: string
  is_active: boolean
  priority: number
}

export interface MergeRequest {
  id: string
  title: string
  description: string
  source_branch: string
  target_branch: string
  status: 'open' | 'merged' | 'closed' | 'conflict' | 'review_required'
  author: string
  reviewers: string[]
  approvals: number
  conflicts: MergeConflict[]
  strategy: MergeStrategy
  created_at: string
  updated_at: string
  merged_at?: string
  merge_commit?: string
  files_changed: number
  additions: number
  deletions: number
}

export interface MergeConflict {
  id: string
  file_path: string
  conflict_type: 'content' | 'deletion' | 'addition'
  status: 'unresolved' | 'resolved' | 'auto_resolved'
  resolution?: string
  created_at: string
  resolved_at?: string
}

export interface MergeAnalysis {
  id: string
  merge_request_id: string
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  impact_analysis: {
    files_affected: number
    breaking_changes: boolean
    test_coverage: number
    complexity_score: number
  }
  safety_score: number
  recommendations: string[]
  created_at: string
}

export interface MergeResponse {
  success: boolean
  data?: MergeStrategy | MergeStrategy[] | MergeRequest | MergeRequest[] | MergeConflict[] | MergeAnalysis
  error?: string
}

export interface ServiceHealth {
  isHealthy: boolean
  lastCheck: number
  responseTime: number
  errorRate: number
}

export class MergeService {
  private static API_BASE_URL = '/api/merge'
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

  // Get all merge strategies
  static async getMergeStrategies(): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/strategies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch merge strategies: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch merge strategies',
      }
    }
  }

  // Get merge strategy by ID
  static async getMergeStrategyById(strategyId: string): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/strategies/${strategyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch merge strategy: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch merge strategy',
      }
    }
  }

  // Create merge strategy
  static async createMergeStrategy(strategy: Omit<MergeStrategy, 'id' | 'created_at' | 'updated_at'>): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/strategies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(strategy),
      })

      if (!res.ok) {
        throw new Error(`Failed to create merge strategy: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create merge strategy',
      }
    }
  }

  // Update merge strategy
  static async updateMergeStrategy(strategyId: string, updates: Partial<MergeStrategy>): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/strategies/${strategyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      })

      if (!res.ok) {
        throw new Error(`Failed to update merge strategy: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update merge strategy',
      }
    }
  }

  // Delete merge strategy
  static async deleteMergeStrategy(strategyId: string): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/strategies/${strategyId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to delete merge strategy: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete merge strategy',
      }
    }
  }

  // Get merge requests
  static async getMergeRequests(status?: string, limit = 20, offset = 0): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      
      if (status) {
        params.append('status', status)
      }

      const res = await fetch(`${this.API_BASE_URL}/requests?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch merge requests: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch merge requests',
      }
    }
  }

  // Get merge request by ID
  static async getMergeRequestById(requestId: string): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/requests/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch merge request: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch merge request',
      }
    }
  }

  // Create merge request
  static async createMergeRequest(request: Omit<MergeRequest, 'id' | 'created_at' | 'updated_at' | 'status' | 'approvals' | 'conflicts' | 'files_changed' | 'additions' | 'deletions'>): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      })

      if (!res.ok) {
        throw new Error(`Failed to create merge request: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create merge request',
      }
    }
  }

  // Update merge request
  static async updateMergeRequest(requestId: string, updates: Partial<MergeRequest>): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      })

      if (!res.ok) {
        throw new Error(`Failed to update merge request: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update merge request',
      }
    }
  }

  // Execute merge
  static async executeMerge(requestId: string, strategyId: string): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/requests/${requestId}/merge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ strategy_id: strategyId }),
      })

      if (!res.ok) {
        throw new Error(`Failed to execute merge: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to execute merge',
      }
    }
  }

  // Get merge conflicts
  static async getMergeConflicts(requestId: string): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/requests/${requestId}/conflicts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch merge conflicts: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch merge conflicts',
      }
    }
  }

  // Resolve merge conflict
  static async resolveMergeConflict(conflictId: string, resolution: string): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/conflicts/${conflictId}/resolve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resolution }),
      })

      if (!res.ok) {
        throw new Error(`Failed to resolve merge conflict: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to resolve merge conflict',
      }
    }
  }

  // Analyze merge impact
  static async analyzeMergeImpact(requestId: string): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/requests/${requestId}/analyze`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to analyze merge impact: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to analyze merge impact',
      }
    }
  }

  // Get merge analysis
  static async getMergeAnalysis(requestId: string): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/requests/${requestId}/analysis`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch merge analysis: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch merge analysis',
      }
    }
  }

  // Approve merge request
  static async approveMergeRequest(requestId: string): Promise<MergeResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/requests/${requestId}/approve`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to approve merge request: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to approve merge request',
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