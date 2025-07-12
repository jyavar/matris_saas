import { describe, it, expect, beforeEach, vi } from 'vitest'
import { automationService } from '../services/automation.service.js'
import { ApiError } from '../utils/ApiError.js'

// Mock de Supabase
vi.mock('../lib/supabase.js', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

// Mock del logger
vi.mock('../services/logger.service.js', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}))

// Importar después de los mocks
import { supabase } from '../lib/supabase.js'

describe('AutomationService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Factories para datos de prueba
  const createTestWorkflow = (overrides = {}) => ({
    id: 'workflow-1',
    name: 'Test Workflow',
    description: 'Test Description',
    status: 'active' as const,
    steps: [
      {
        id: 'step-1',
        action: 'email' as const,
        config: { template: 'welcome' },
        order: 0,
      },
    ],
    schedule: {
      type: 'immediate' as const,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'test-user-id',
    ...overrides,
  })

  const createTestJob = (overrides = {}) => ({
    id: 'job-1',
    workflow_id: 'workflow-1',
    status: 'pending' as const,
    started_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    ...overrides,
  })

  describe('getWorkflows', () => {
    it('should return all workflows', async () => {
      const mockWorkflows = [createTestWorkflow(), createTestWorkflow({ id: 'workflow-2' })]
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: mockWorkflows, error: null }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await automationService.getWorkflows()

      expect(result).toEqual(mockWorkflows)
      expect(supabase.from).toHaveBeenCalledWith('workflows')
    })

    it('should handle database errors', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: null, error: { message: 'DB Error' } }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      await expect(automationService.getWorkflows()).rejects.toThrow(ApiError)
    })
  })

  describe('getWorkflowById', () => {
    it('should return workflow by id', async () => {
      const mockWorkflow = createTestWorkflow()
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: mockWorkflow, error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await automationService.getWorkflowById('workflow-1')

      expect(result).toEqual(mockWorkflow)
      expect(supabase.from).toHaveBeenCalledWith('workflows')
    })

    it('should return null for non-existent workflow', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await automationService.getWorkflowById('non-existent')

      expect(result).toBeNull()
    })
  })

  describe('createWorkflow', () => {
    it('should create new workflow', async () => {
      const workflowData = {
        name: 'New Workflow',
        description: 'New Description',
        steps: [
          {
            action: 'email' as const,
            config: { template: 'welcome' },
            order: 0,
          },
        ],
        schedule: {
          type: 'immediate' as const,
        },
      }

      const mockWorkflow = createTestWorkflow(workflowData)
      
      const mockQuery = {
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: mockWorkflow, error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await automationService.createWorkflow(workflowData, 'test-user-id')

      expect(result).toEqual(mockWorkflow)
      expect(supabase.from).toHaveBeenCalledWith('workflows')
    })

    it('should throw error for missing required fields', async () => {
      const invalidData = {
        description: 'Missing name and steps',
        schedule: {
          type: 'immediate' as const,
        },
      }

      await expect(
        automationService.createWorkflow(invalidData as never, 'test-user-id'),
      ).rejects.toThrow(ApiError)
    })

    it('should throw error for empty steps', async () => {
      const invalidData = {
        name: 'Test',
        steps: [],
        schedule: {
          type: 'immediate' as const,
        },
      }

      await expect(
        automationService.createWorkflow(invalidData, 'test-user-id'),
      ).rejects.toThrow(ApiError)
    })
  })

  describe('updateWorkflow', () => {
    it('should update workflow', async () => {
      const updateData = {
        name: 'Updated Workflow',
        status: 'inactive' as const,
      }

      const mockWorkflow = createTestWorkflow(updateData)
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: mockWorkflow, error: null }),
          }),
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: mockWorkflow, error: null }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await automationService.updateWorkflow('workflow-1', updateData)

      expect(result).toEqual(mockWorkflow)
      expect(supabase.from).toHaveBeenCalledWith('workflows')
    })

    it('should return null for non-existent workflow', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await automationService.updateWorkflow('non-existent', { name: 'Updated' })

      expect(result).toBeNull()
    })
  })

  describe('deleteWorkflow', () => {
    it('should delete workflow', async () => {
      const mockQuery = {
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await automationService.deleteWorkflow('workflow-1')

      expect(result).toBe(true)
      expect(supabase.from).toHaveBeenCalledWith('workflows')
    })

    it('should handle database errors', async () => {
      const mockQuery = {
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: { message: 'DB Error' } }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      await expect(automationService.deleteWorkflow('workflow-1')).rejects.toThrow(ApiError)
    })
  })

  describe('getJobs', () => {
    it('should return all jobs', async () => {
      const mockJobs = [createTestJob(), createTestJob({ id: 'job-2' })]
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: mockJobs, error: null }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await automationService.getJobs()

      expect(result).toEqual(mockJobs)
      expect(supabase.from).toHaveBeenCalledWith('jobs')
    })
  })

  describe('getJobById', () => {
    it('should return job by id', async () => {
      const mockJob = createTestJob()
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: mockJob, error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await automationService.getJobById('job-1')

      expect(result).toEqual(mockJob)
      expect(supabase.from).toHaveBeenCalledWith('jobs')
    })
  })

  describe('executeWorkflow', () => {
    it('should execute workflow and create job', async () => {
      const mockWorkflow = createTestWorkflow({ status: 'active' })
      const mockJob = createTestJob()
      
      ;(supabase.from as ReturnType<typeof vi.fn>).mockImplementation((table: string) => {
        if (table === 'workflows') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockWorkflow, error: null }),
              }),
            }),
          }
        }
        if (table === 'jobs') {
          return {
            insert: vi.fn().mockReturnValue({
              select: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockJob, error: null }),
              }),
            }),
          }
        }
        return {}
      })

      const executionData = {
        data: { userId: 'user-123' },
        userId: 'user-123',
      }

      const result = await automationService.executeWorkflow('workflow-1', executionData)

      expect(result).toEqual(mockJob)
      expect(supabase.from).toHaveBeenCalledWith('workflows')
      expect(supabase.from).toHaveBeenCalledWith('jobs')
    })

    it('should return null for non-existent workflow', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await automationService.executeWorkflow('non-existent', {})

      expect(result).toBeNull()
    })

    it('should throw error for inactive workflow', async () => {
      const mockWorkflow = createTestWorkflow({ status: 'inactive' })
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: mockWorkflow, error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      await expect(
        automationService.executeWorkflow('workflow-1', {}),
      ).rejects.toThrow(ApiError)
    })
  })

  describe('pauseJob', () => {
    it('should pause job', async () => {
      const mockJob = createTestJob({ status: 'running' })
      const pausedJob = createTestJob({ status: 'paused' })
      
      ;(supabase.from as ReturnType<typeof vi.fn>).mockImplementation((table: string) => {
        if (table === 'jobs') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockJob, error: null }),
              }),
            }),
            update: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                  single: vi.fn().mockResolvedValue({ data: pausedJob, error: null }),
                }),
              }),
            }),
          }
        }
        return {}
      })

      const result = await automationService.pauseJob('job-1')

      expect(result).toEqual(pausedJob)
      expect(supabase.from).toHaveBeenCalledWith('jobs')
    })

    it('should throw error for non-running job', async () => {
      const mockJob = createTestJob({ status: 'pending' })
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: mockJob, error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      await expect(automationService.pauseJob('job-1')).rejects.toThrow(ApiError)
    })
  })

  describe('resumeJob', () => {
    it('should resume job', async () => {
      const mockJob = createTestJob({ status: 'paused' })
      const resumedJob = createTestJob({ status: 'running' })
      
      ;(supabase.from as ReturnType<typeof vi.fn>).mockImplementation((table: string) => {
        if (table === 'jobs') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockJob, error: null }),
              }),
            }),
            update: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                  single: vi.fn().mockResolvedValue({ data: resumedJob, error: null }),
                }),
              }),
            }),
          }
        }
        return {}
      })

      const result = await automationService.resumeJob('job-1')

      expect(result).toEqual(resumedJob)
      expect(supabase.from).toHaveBeenCalledWith('jobs')
    })

    it('should throw error for non-paused job', async () => {
      const mockJob = createTestJob({ status: 'running' })
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: mockJob, error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      await expect(automationService.resumeJob('job-1')).rejects.toThrow(ApiError)
    })
  })
}) 