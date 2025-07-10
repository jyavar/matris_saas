import { getSessionToken } from '@/lib/supabase'

// Tipos para el módulo Deploy
export interface DeployStatus {
  jobs: RuntimeJob[]
  count: number
}

export interface RuntimeJob {
  id: string
  schedule: string
  task: () => void
  running: boolean
  ref?: unknown
}

export interface AgentStatus {
  name: string
  status: 'running' | 'stopped' | 'error'
}

export interface AgentLog {
  timestamp: string
  level: 'info' | 'warn' | 'error'
  message: string
}

export interface DeployConfig {
  environment: string
  version: string
  features: Record<string, boolean>
}

export interface DeployTask {
  id: string
  schedule: string
  running: boolean
  lastRun?: string
  nextRun?: string
}

export interface DeployMetrics {
  uptime: number
  memoryUsage: number
  cpuUsage: number
  activeJobs: number
}

export interface DeployHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  checks: Record<string, boolean>
}

export interface DeployLog {
  timestamp: string
  level: 'info' | 'warn' | 'error'
  message: string
  context?: Record<string, unknown>
}

// Tipos para requests
export interface CreateTaskRequest {
  id: string
  schedule: string
  description?: string
}

export interface UpdateConfigRequest {
  environment?: string
  version?: string
  features?: Record<string, boolean>
}

export interface RunAgentRequest {
  options?: Record<string, unknown>
}

// Tipos para responses
export interface DeployResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface AgentRunResult {
  result: unknown
}

export interface TaskExecutionResult {
  message: string
  taskId: string
  status: 'success' | 'failed'
}

// Configuración del servicio
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

class DeployService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<DeployResponse<T>> {
    try {
      const token = await getSessionToken()
      const url = `${API_BASE_URL}${endpoint}`
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        return {
          success: false,
          error: errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      const data = await response.json()
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  // Status y Health
  async getStatus(): Promise<DeployResponse<DeployStatus>> {
    return this.makeRequest<DeployStatus>('/status')
  }

  async getHealth(): Promise<DeployResponse<DeployHealth>> {
    return this.makeRequest<DeployHealth>('/health')
  }

  async getMetrics(): Promise<DeployResponse<DeployMetrics>> {
    return this.makeRequest<DeployMetrics>('/metrics')
  }

  // Configuración
  async getConfig(): Promise<DeployResponse<DeployConfig>> {
    return this.makeRequest<DeployConfig>('/config')
  }

  async updateConfig(config: UpdateConfigRequest): Promise<DeployResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }>('/config', {
      method: 'PUT',
      body: JSON.stringify(config),
    })
  }

  // Gestión de Agentes
  async getAgents(): Promise<DeployResponse<string[]>> {
    return this.makeRequest<string[]>('/agents')
  }

  async startAgent(name: string): Promise<DeployResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }>(`/agents/${name}/start`, {
      method: 'POST',
    })
  }

  async stopAgent(name: string): Promise<DeployResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }>(`/agents/${name}/stop`, {
      method: 'POST',
    })
  }

  async getAgentStatus(name: string): Promise<DeployResponse<AgentStatus>> {
    return this.makeRequest<AgentStatus>(`/agents/${name}/status`)
  }

  async getAgentLogs(name: string): Promise<DeployResponse<AgentLog[]>> {
    return this.makeRequest<AgentLog[]>(`/agents/${name}/logs`)
  }

  async runAgent(name: string, options: RunAgentRequest = {}): Promise<DeployResponse<AgentRunResult>> {
    return this.makeRequest<AgentRunResult>(`/agents/${name}/run`, {
      method: 'POST',
      body: JSON.stringify(options),
    })
  }

  // Gestión de Tareas
  async getTasks(): Promise<DeployResponse<DeployTask[]>> {
    return this.makeRequest<DeployTask[]>('/tasks')
  }

  async createTask(task: CreateTaskRequest): Promise<DeployResponse<DeployTask>> {
    return this.makeRequest<DeployTask>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
  }

  async getTaskById(id: string): Promise<DeployResponse<DeployTask>> {
    return this.makeRequest<DeployTask>(`/tasks/${id}`)
  }

  async updateTask(id: string, updates: Partial<CreateTaskRequest>): Promise<DeployResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteTask(id: string): Promise<DeployResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }>(`/tasks/${id}`, {
      method: 'DELETE',
    })
  }

  async executeTask(id: string): Promise<DeployResponse<TaskExecutionResult>> {
    return this.makeRequest<TaskExecutionResult>(`/tasks/${id}/execute`, {
      method: 'POST',
    })
  }

  async getTaskResult(id: string): Promise<DeployResponse<unknown>> {
    return this.makeRequest<unknown>(`/tasks/${id}/result`)
  }

  // Logs del sistema
  async getLogs(): Promise<DeployResponse<DeployLog[]>> {
    return this.makeRequest<DeployLog[]>('/logs')
  }

  // Control del sistema
  async restart(): Promise<DeployResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }>('/restart', {
      method: 'POST',
    })
  }

  async shutdown(): Promise<DeployResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }>('/shutdown', {
      method: 'POST',
    })
  }
}

export const deployService = new DeployService() 