import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest'
import { deployService } from './deploy.service'
import type {
  DeployStatus,
  DeployHealth,
  DeployMetrics,
  DeployConfig,
  DeployTask,
  AgentStatus,
  AgentLog,
  DeployLog,
  CreateTaskRequest,
  UpdateConfigRequest,
  RunAgentRequest,
  DeployResponse,
} from './deploy.service'

// Mock getSessionToken
vi.mock('@/lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-token'))
}))

// Deshabilitar MSW para estos tests si está activo
declare const global: any
beforeAll(() => {
  if (global.server && typeof global.server.close === 'function') {
    global.server.close()
  }
})
afterAll(() => {
  if (global.server && typeof global.server.listen === 'function') {
    global.server.listen()
  }
})

// Mock fetch global compatible con Request y (url, options)
const mockFetch = vi.fn((input: Request | string, init?: RequestInit) => {
  // Permite asserts sobre input
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve({} as {}),
    clone: () => ({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve({} as {})
    })
  })
})
global.fetch = mockFetch

// Helper para crear mocks de Response
const createMockResponse = (data: unknown, status = 200, statusText = 'OK') => ({
  ok: status < 400,
  status,
  statusText,
  json: () => Promise.resolve(data as {}),
  clone: () => ({
    ok: status < 400,
    status,
    statusText,
    json: () => Promise.resolve(data as {})
  })
})

describe('DeployService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('makeRequest', () => {
    it('should make successful request with auth token', async () => {
      const mockData = { test: 'data' }
      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockData }, 200, 'OK'))

      const result = await deployService.getStatus()

      const call = mockFetch.mock.calls[0][0]
      if (call && typeof call === 'object' && 'url' in call && 'headers' in call) {
        expect(call.url).toBe('http://localhost:3001/status')
        expect(call.headers.get('Authorization')).toBe('Bearer mock-token')
        expect(call.headers.get('Content-Type')).toBe('application/json')
      } else {
        throw new Error('El mock de fetch no recibió un objeto Request')
      }
      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockData)
    })

    it('should handle HTTP error responses', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ error: 'Invalid request' }, 400, 'Bad Request'))

      const result = await deployService.getStatus()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Invalid request')
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await deployService.getStatus()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Network error')
    })

    it('should handle malformed JSON responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.reject(new Error('Invalid JSON')),
        clone: () => ({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          json: () => Promise.reject(new Error('Invalid JSON'))
        })
      } as any)

      const result = await deployService.getStatus()

      expect(result.success).toBe(false)
      expect(result.error).toBe('HTTP 500: Internal Server Error')
    })
  })

  describe('Status and Health', () => {
    it('should get status successfully', async () => {
      const mockStatus: DeployStatus = {
        jobs: [
          {
            id: 'job-1',
            schedule: '0 0 * * *',
            task: () => {},
            running: true
          }
        ],
        count: 1
      }

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockStatus }))

      const result = await deployService.getStatus()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockStatus)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/status',
        expect.any(Object)
      )
    })

    it('should get health successfully', async () => {
      const mockHealth: DeployHealth = {
        status: 'healthy',
        checks: {
          database: true,
          redis: true,
          api: true
        }
      }

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockHealth }))

      const result = await deployService.getHealth()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockHealth)
    })

    it('should get metrics successfully', async () => {
      const mockMetrics: DeployMetrics = {
        uptime: 3600,
        memoryUsage: 512,
        cpuUsage: 25.5,
        activeJobs: 3
      }

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockMetrics }))

      const result = await deployService.getMetrics()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockMetrics)
    })
  })

  describe('Configuration', () => {
    it('should get config successfully', async () => {
      const mockConfig: DeployConfig = {
        environment: 'production',
        version: '1.2.3',
        features: {
          autoDeploy: true,
          rollback: true
        }
      }

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockConfig }))

      const result = await deployService.getConfig()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockConfig)
    })

    it('should update config successfully', async () => {
      const updateRequest: UpdateConfigRequest = {
        environment: 'staging',
        version: '1.3.0'
      }

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: { message: 'Config updated' } }))

      const result = await deployService.updateConfig(updateRequest)

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ message: 'Config updated' })
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/config',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateRequest)
        })
      )
    })
  })

  describe('Agents', () => {
    it('should get agents successfully', async () => {
      const mockAgents = ['refactor', 'qa', 'data']

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockAgents }))

      const result = await deployService.getAgents()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockAgents)
    })

    it('should start agent successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ data: { message: 'Agent refactor started' } }))

      const result = await deployService.startAgent('refactor')

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ message: 'Agent refactor started' })
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/agents/refactor/start',
        expect.objectContaining({ method: 'POST' })
      )
    })

    it('should stop agent successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ data: { message: 'Agent refactor stopped' } }))

      const result = await deployService.stopAgent('refactor')

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ message: 'Agent refactor stopped' })
    })

    it('should get agent status successfully', async () => {
      const mockStatus: AgentStatus = {
        name: 'refactor',
        status: 'running'
      }

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockStatus }))

      const result = await deployService.getAgentStatus('refactor')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockStatus)
    })

    it('should get agent logs successfully', async () => {
      const mockLogs: AgentLog[] = [
        {
          timestamp: '2024-01-20T10:00:00Z',
          level: 'info',
          message: 'Agent started'
        }
      ]

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockLogs }))

      const result = await deployService.getAgentLogs('refactor')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockLogs)
    })

    it('should run agent successfully', async () => {
      const runRequest: RunAgentRequest = {
        options: { dryRun: true }
      }

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: { result: 'success' } }))

      const result = await deployService.runAgent('refactor', runRequest)

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ result: 'success' })
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/agents/refactor/run',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(runRequest)
        })
      )
    })
  })

  describe('Tasks', () => {
    it('should get tasks successfully', async () => {
      const mockTasks: DeployTask[] = [
        {
          id: 'task-1',
          schedule: '0 0 * * *',
          running: true,
          lastRun: '2024-01-20T10:00:00Z',
          nextRun: '2024-01-21T00:00:00Z'
        }
      ]

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockTasks }))

      const result = await deployService.getTasks()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockTasks)
    })

    it('should create task successfully', async () => {
      const createRequest: CreateTaskRequest = {
        id: 'new-task',
        schedule: '0 0 * * *',
        description: 'Daily backup'
      }

      const mockTask: DeployTask = {
        id: 'new-task',
        schedule: '0 0 * * *',
        running: false
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: mockTask })
      })

      const result = await deployService.createTask(createRequest)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockTask)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/tasks',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(createRequest)
        })
      )
    })

    it('should get task by id successfully', async () => {
      const mockTask: DeployTask = {
        id: 'task-1',
        schedule: '0 0 * * *',
        running: true
      }

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockTask }))

      const result = await deployService.getTaskById('task-1')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockTask)
    })

    it('should update task successfully', async () => {
      const updates = { schedule: '0 12 * * *' }

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: { message: 'Task updated' } }))

      const result = await deployService.updateTask('task-1', updates)

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ message: 'Task updated' })
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/tasks/task-1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updates)
        })
      )
    })

    it('should delete task successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ data: { message: 'Task deleted' } }))

      const result = await deployService.deleteTask('task-1')

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ message: 'Task deleted' })
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/tasks/task-1',
        expect.objectContaining({ method: 'DELETE' })
      )
    })

    it('should execute task successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ 
        data: { 
          message: 'Task executed',
          taskId: 'task-1',
          status: 'success' as const
        } 
      }))

      const result = await deployService.executeTask('task-1')

      expect(result.success).toBe(true)
      expect(result.data).toEqual({
        message: 'Task executed',
        taskId: 'task-1',
        status: 'success'
      })
    })

    it('should get task result successfully', async () => {
      const mockResult = { output: 'Task completed successfully' }

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockResult }))

      const result = await deployService.getTaskResult('task-1')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockResult)
    })
  })

  describe('System Logs', () => {
    it('should get logs successfully', async () => {
      const mockLogs: DeployLog[] = [
        {
          timestamp: '2024-01-20T10:00:00Z',
          level: 'info',
          message: 'System started',
          context: { component: 'deploy' }
        }
      ]

      mockFetch.mockResolvedValueOnce(createMockResponse({ data: mockLogs }))

      const result = await deployService.getLogs()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockLogs)
    })
  })

  describe('System Control', () => {
    it('should restart system successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ data: { message: 'Restart initiated' } }))

      const result = await deployService.restart()

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ message: 'Restart initiated' })
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/restart',
        expect.objectContaining({ method: 'POST' })
      )
    })

    it('should shutdown system successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ data: { message: 'Shutdown initiated' } }))

      const result = await deployService.shutdown()

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ message: 'Shutdown initiated' })
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/shutdown',
        expect.objectContaining({ method: 'POST' })
      )
    })
  })

  describe('Error Handling', () => {
    it('should handle 404 errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ error: 'Resource not found' }, 404, 'Not Found'))

      const result = await deployService.getTaskById('non-existent')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Resource not found')
    })

    it('should handle 500 errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ error: 'Server error' }, 500, 'Internal Server Error'))

      const result = await deployService.getStatus()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Server error')
    })

    it('should handle authentication errors', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ error: 'Invalid token' }, 401, 'Unauthorized'))

      const result = await deployService.getConfig()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Invalid token')
    })
  })
}) 