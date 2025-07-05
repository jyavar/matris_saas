import { IncomingMessage, ServerResponse } from 'http'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { runtimeController } from '../controllers/runtime.controller'

// Mock dependencies
vi.mock('../services/runtime.service', () => ({
  runtimeService: {
    getTasks: vi.fn().mockResolvedValue([
      {
        id: 'task-1',
        name: 'Data Processing',
        status: 'running',
        created_at: new Date().toISOString(),
        completed_at: null,
      },
      {
        id: 'task-2',
        name: 'Report Generation',
        status: 'completed',
        created_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      },
    ]),
    getTaskById: vi.fn().mockResolvedValue({
      id: 'task-1',
      name: 'Data Processing',
      status: 'running',
      progress: 65,
      created_at: new Date().toISOString(),
      logs: [
        'Task started',
        'Processing data chunk 1',
        'Processing data chunk 2',
      ],
    }),
    createTask: vi.fn().mockResolvedValue({
      id: 'task-new',
      name: 'New Task',
      status: 'pending',
      created_at: new Date().toISOString(),
    }),
    updateTask: vi.fn().mockResolvedValue({
      id: 'task-1',
      name: 'Updated Task',
      status: 'paused',
      created_at: new Date().toISOString(),
    }),
    deleteTask: vi.fn().mockResolvedValue(true),
    executeTask: vi.fn().mockResolvedValue({
      id: 'task-1',
      status: 'running',
      started_at: new Date().toISOString(),
    }),
    runAgent: vi.fn().mockResolvedValue({
      agent: 'test-agent',
      status: 'completed',
      result: { message: 'Agent executed successfully' },
      execution_time: 1500,
    }),
  },
}))

vi.mock('../services/logger.service', () => ({
  logAction: vi.fn(),
}))

vi.mock('../utils/response.helper', () => ({
  sendError: vi.fn((res: ServerResponse, message: string, status: number) => {
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: message }))
  }),
  sendSuccess: vi.fn((res: ServerResponse, data: unknown, message?: string) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true, data, message }))
  }),
}))

describe('Runtime Controller', () => {
  let mockReq: Partial<IncomingMessage>
  let mockRes: Partial<ServerResponse>
  let writeHeadSpy: ReturnType<typeof vi.fn>
  let endSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    writeHeadSpy = vi.fn()
    endSpy = vi.fn()

    mockReq = {
      method: 'GET',
      url: '/api/runtime/jobs',
      headers: {
        'content-type': 'application/json',
      },
    }

    mockRes = {
      writeHead: writeHeadSpy,
      end: endSpy,
    }

    vi.clearAllMocks()
  })

  describe('getTasks', () => {
    it('should return list of runtime tasks', async () => {
      await runtimeController.getTasks(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(Array.isArray(response.data)).toBe(true)
      expect(response.data).toHaveLength(2)
      expect(response.data[0]).toHaveProperty('id', 'task-1')
      expect(response.data[0]).toHaveProperty('status', 'running')
      expect(response.data[1]).toHaveProperty('status', 'completed')
    })

    it('should handle request without user authentication', async () => {
      await runtimeController.getTasks(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('getTaskById', () => {
    it('should return specific task details', async () => {
      await runtimeController.getTaskById(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'task-1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('id', 'task-1')
      expect(response.data).toHaveProperty('progress', 65)
      expect(response.data).toHaveProperty('logs')
      expect(Array.isArray(response.data.logs)).toBe(true)
    })

    it('should handle missing task ID', async () => {
      await runtimeController.getTaskById(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('createTask', () => {
    it('should create new runtime task', async () => {
      const taskData = {
        name: 'New Task',
        type: 'data-processing',
        config: {
          input_source: 'database',
          output_format: 'json',
        },
      }

      await runtimeController.createTask(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        taskData,
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('id', 'task-new')
      expect(response.data).toHaveProperty('name', 'New Task')
      expect(response.data).toHaveProperty('status', 'pending')
    })

    it('should handle create task without body', async () => {
      await runtimeController.createTask(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('updateTask', () => {
    it('should update existing task', async () => {
      const updateData = {
        name: 'Updated Task',
        status: 'paused',
      }

      await runtimeController.updateTask(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'task-1' },
        updateData,
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('name', 'Updated Task')
      expect(response.data).toHaveProperty('status', 'paused')
    })

    it('should handle update without task ID', async () => {
      await runtimeController.updateTask(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        { status: 'paused' },
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('deleteTask', () => {
    it('should delete task successfully', async () => {
      await runtimeController.deleteTask(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'task-1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.message).toContain('deleted')
    })

    it('should handle delete without task ID', async () => {
      await runtimeController.deleteTask(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('executeTask', () => {
    it('should execute task successfully', async () => {
      await runtimeController.executeTask(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'task-1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('status', 'running')
      expect(response.data).toHaveProperty('started_at')
    })

    it('should handle execute task without ID', async () => {
      await runtimeController.executeTask(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('runAgent', () => {
    it('should execute agent successfully', async () => {
      await runtimeController.runAgent(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { name: 'test-agent' },
        { config: { debug: true } },
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('agent', 'test-agent')
      expect(response.data).toHaveProperty('status', 'completed')
      expect(response.data).toHaveProperty('execution_time', 1500)
      expect(response.data).toHaveProperty('result')
    })

    it('should handle run agent without agent name', async () => {
      await runtimeController.runAgent(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })

    it('should handle agent execution with configuration', async () => {
      const agentConfig = {
        timeout: 30000,
        retries: 3,
        debug: true,
      }

      await runtimeController.runAgent(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { name: 'analytics-agent' },
        agentConfig,
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle service errors gracefully', async () => {
      const { runtimeService } = await import('../services/runtime.service')
      vi.mocked(runtimeService.getTasks).mockRejectedValueOnce(
        new Error('Runtime service unavailable'),
      )

      await runtimeController.getTasks(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(500, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toContain('Failed')
    })

    it('should handle agent execution failures', async () => {
      const { runtimeService } = await import('../services/runtime.service')
      vi.mocked(runtimeService.runAgent).mockRejectedValueOnce(
        new Error('Agent execution failed'),
      )

      await runtimeController.runAgent(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { name: 'failing-agent' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(500, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toContain('Failed')
    })
  })

  describe('Response Format Validation', () => {
    it('should return consistent response format', async () => {
      await runtimeController.getTasks(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(endSpy).toHaveBeenCalledWith(
        expect.stringMatching(/"success":\s*true/),
      )
      expect(endSpy).toHaveBeenCalledWith(expect.stringMatching(/"data":\s*\[/))
    })

    it('should return valid JSON responses', async () => {
      await runtimeController.getTaskById(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'task-1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      const responseCall = endSpy.mock.calls[0]?.[0]
      expect(() => JSON.parse(responseCall)).not.toThrow()
    })
  })

  describe('Task Status Management', () => {
    it('should handle task status transitions correctly', async () => {
      // Test creating a task, then executing it
      await runtimeController.createTask(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        { name: 'Test Task', type: 'data-processing' },
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(endSpy).toHaveBeenCalledWith(
        expect.stringMatching(/"status":\s*"pending"/),
      )

      vi.clearAllMocks()

      await runtimeController.executeTask(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'task-new' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(endSpy).toHaveBeenCalledWith(
        expect.stringMatching(/"status":\s*"running"/),
      )
    })
  })
})
