// Deploy service for frontend
import { getSessionToken } from '../lib/supabase'

export interface DeployEnvironment {
  id: string
  name: string
  description: string
  type: 'development' | 'staging' | 'production'
  url: string
  branch: string
  auto_deploy: boolean
  health_check_url: string
  created_at: string
  updated_at: string
  is_active: boolean
  deployment_count: number
  last_deployment?: string
}

export interface DeployPipeline {
  id: string
  name: string
  description: string
  environment_id: string
  steps: DeployStep[]
  triggers: DeployTrigger[]
  created_at: string
  updated_at: string
  is_active: boolean
  success_rate: number
  avg_duration: number
}

export interface DeployStep {
  id: string
  name: string
  type: 'build' | 'test' | 'deploy' | 'notify' | 'rollback'
  command: string
  timeout: number
  retry_count: number
  order: number
  is_required: boolean
}

export interface DeployTrigger {
  id: string
  type: 'push' | 'pull_request' | 'manual' | 'schedule'
  branch?: string
  schedule?: string
  conditions: Record<string, any>
}

export interface DeployBuild {
  id: string
  pipeline_id: string
  environment_id: string
  status: 'pending' | 'running' | 'success' | 'failed' | 'cancelled'
  commit_hash: string
  commit_message: string
  branch: string
  author: string
  started_at: string
  completed_at?: string
  duration?: number
  logs: DeployLog[]
  artifacts: DeployArtifact[]
  tests_passed?: number
  tests_failed?: number
  coverage?: number
}

export interface DeployLog {
  id: string
  build_id: string
  step_id: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  timestamp: string
  metadata?: Record<string, any>
}

export interface DeployArtifact {
  id: string
  build_id: string
  name: string
  type: 'build' | 'test' | 'deployment'
  url: string
  size: number
  created_at: string
}

export interface DeployDeployment {
  id: string
  build_id: string
  environment_id: string
  status: 'pending' | 'deploying' | 'success' | 'failed' | 'rolled_back'
  version: string
  deployed_at: string
  deployed_by: string
  rollback_to?: string
  health_check_status: 'healthy' | 'unhealthy' | 'unknown'
  metrics: {
    response_time: number
    error_rate: number
    throughput: number
  }
}

export interface DeployResponse {
  success: boolean
  data?: DeployEnvironment | DeployEnvironment[] | DeployPipeline | DeployPipeline[] | DeployBuild | DeployBuild[] | DeployDeployment | DeployDeployment[]
  error?: string
}

export interface ServiceHealth {
  isHealthy: boolean
  lastCheck: number
  responseTime: number
  errorRate: number
}

export class DeployService {
  private static API_BASE_URL = '/api/deploy'
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

  // Get all environments
  static async getEnvironments(): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/environments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch environments: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch environments',
      }
    }
  }

  // Get environment by ID
  static async getEnvironmentById(environmentId: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/environments/${environmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch environment: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch environment',
      }
    }
  }

  // Create environment
  static async createEnvironment(environment: Omit<DeployEnvironment, 'id' | 'created_at' | 'updated_at' | 'deployment_count'>): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/environments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(environment),
      })

      if (!res.ok) {
        throw new Error(`Failed to create environment: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create environment',
      }
    }
  }

  // Update environment
  static async updateEnvironment(environmentId: string, updates: Partial<DeployEnvironment>): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/environments/${environmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      })

      if (!res.ok) {
        throw new Error(`Failed to update environment: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update environment',
      }
    }
  }

  // Delete environment
  static async deleteEnvironment(environmentId: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/environments/${environmentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to delete environment: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete environment',
      }
    }
  }

  // Get pipelines
  static async getPipelines(environmentId?: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const params = environmentId ? `?environment_id=${environmentId}` : ''
      const res = await fetch(`${this.API_BASE_URL}/pipelines${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch pipelines: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch pipelines',
      }
    }
  }

  // Get pipeline by ID
  static async getPipelineById(pipelineId: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/pipelines/${pipelineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch pipeline: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch pipeline',
      }
    }
  }

  // Create pipeline
  static async createPipeline(pipeline: Omit<DeployPipeline, 'id' | 'created_at' | 'updated_at' | 'success_rate' | 'avg_duration'>): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/pipelines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pipeline),
      })

      if (!res.ok) {
        throw new Error(`Failed to create pipeline: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create pipeline',
      }
    }
  }

  // Update pipeline
  static async updatePipeline(pipelineId: string, updates: Partial<DeployPipeline>): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/pipelines/${pipelineId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      })

      if (!res.ok) {
        throw new Error(`Failed to update pipeline: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update pipeline',
      }
    }
  }

  // Delete pipeline
  static async deletePipeline(pipelineId: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/pipelines/${pipelineId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to delete pipeline: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete pipeline',
      }
    }
  }

  // Get builds
  static async getBuilds(pipelineId?: string, status?: string, limit = 20, offset = 0): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      
      if (pipelineId) {
        params.append('pipeline_id', pipelineId)
      }
      
      if (status) {
        params.append('status', status)
      }

      const res = await fetch(`${this.API_BASE_URL}/builds?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch builds: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch builds',
      }
    }
  }

  // Get build by ID
  static async getBuildById(buildId: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/builds/${buildId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch build: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch build',
      }
    }
  }

  // Trigger build
  static async triggerBuild(pipelineId: string, commitHash?: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/pipelines/${pipelineId}/trigger`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ commit_hash: commitHash }),
      })

      if (!res.ok) {
        throw new Error(`Failed to trigger build: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to trigger build',
      }
    }
  }

  // Cancel build
  static async cancelBuild(buildId: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/builds/${buildId}/cancel`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to cancel build: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to cancel build',
      }
    }
  }

  // Get build logs
  static async getBuildLogs(buildId: string, stepId?: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const params = stepId ? `?step_id=${stepId}` : ''
      const res = await fetch(`${this.API_BASE_URL}/builds/${buildId}/logs${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch build logs: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch build logs',
      }
    }
  }

  // Get deployments
  static async getDeployments(environmentId?: string, status?: string, limit = 20, offset = 0): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      
      if (environmentId) {
        params.append('environment_id', environmentId)
      }
      
      if (status) {
        params.append('status', status)
      }

      const res = await fetch(`${this.API_BASE_URL}/deployments?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch deployments: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch deployments',
      }
    }
  }

  // Get deployment by ID
  static async getDeploymentById(deploymentId: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/deployments/${deploymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch deployment: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch deployment',
      }
    }
  }

  // Deploy build
  static async deployBuild(buildId: string, environmentId: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/builds/${buildId}/deploy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ environment_id: environmentId }),
      })

      if (!res.ok) {
        throw new Error(`Failed to deploy build: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to deploy build',
      }
    }
  }

  // Rollback deployment
  static async rollbackDeployment(deploymentId: string, targetVersion?: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/deployments/${deploymentId}/rollback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ target_version: targetVersion }),
      })

      if (!res.ok) {
        throw new Error(`Failed to rollback deployment: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to rollback deployment',
      }
    }
  }

  // Get deployment metrics
  static async getDeploymentMetrics(deploymentId: string): Promise<DeployResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/deployments/${deploymentId}/metrics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch deployment metrics: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch deployment metrics',
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