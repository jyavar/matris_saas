import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { app } from '../index.js'
import { automationService } from '../services/automation.service.js'

// Factory para datos de workflow
function createTestWorkflow(overrides = {}) {
  return {
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
      {
        id: 'step-2',
        action: 'analytics' as const,
        config: { event: 'user_activated' },
        order: 1,
      },
    ],
    schedule: { type: 'immediate' as const, cron: null },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'test-user',
    ...overrides,
  }
}

// Factory para datos de job
function createTestJob(overrides = {}) {
  return {
    id: 'job-1',
    workflow_id: 'workflow-1',
    status: 'pending' as const,
    started_at: new Date().toISOString(),
    completed_at: null,
    result: null,
    error: undefined,
    data: undefined,
    created_at: new Date().toISOString(),
    ...overrides,
  }
}

describe('Automation Engine Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mock('../middleware/auth.middleware', () => ({
      authMiddleware: (_req: unknown, _res: unknown, next: () => void) => {
        const req = _req as { user?: { id: string; email: string } }
        if (req) req.user = { id: 'test-user', email: 'test@example.com' }
        return next()
      },
    }))
    vi.spyOn(automationService, 'getWorkflows').mockResolvedValue([
      createTestWorkflow(),
    ])
    vi.spyOn(automationService, 'getWorkflowById').mockImplementation(
      async (id: string) => (id === 'workflow-1' ? createTestWorkflow() : null),
    )
    vi.spyOn(automationService, 'createWorkflow').mockResolvedValue(
      createTestWorkflow(),
    )
    vi.spyOn(automationService, 'updateWorkflow').mockImplementation(
      async (id: string) =>
        id === 'workflow-1'
          ? createTestWorkflow({ name: 'Updated Workflow' })
          : null,
    )
    vi.spyOn(automationService, 'deleteWorkflow').mockImplementation(
      async (id: string) => id === 'workflow-1',
    )
    vi.spyOn(automationService, 'getJobs').mockResolvedValue([createTestJob()])
    vi.spyOn(automationService, 'getJobById').mockImplementation(
      async (id: string) => (id === 'job-1' ? createTestJob() : null),
    )
    vi.spyOn(automationService, 'executeWorkflow').mockImplementation(
      async (id: string) =>
        id === 'workflow-1' ? createTestJob({ status: 'running' }) : null,
    )
    vi.spyOn(automationService, 'pauseJob').mockImplementation(
      async (id: string) =>
        id === 'job-1' ? createTestJob({ status: 'pending' }) : null,
    )
    vi.spyOn(automationService, 'resumeJob').mockImplementation(
      async (id: string) =>
        id === 'job-1' ? createTestJob({ status: 'running' }) : null,
    )
  })

  describe('GET /automation/workflows', () => {
    it('should return all workflows', async () => {
      const res = await request(app).get('/automation/workflows')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
  })

  describe('GET /automation/workflows/:id', () => {
    it('should return a workflow by id', async () => {
      const res = await request(app).get('/automation/workflows/workflow-1')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.id).toBe('workflow-1')
    })

    it('should return 404 for non-existent workflow', async () => {
      const res = await request(app).get('/automation/workflows/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /automation/workflows', () => {
    it('should create a workflow with valid data', async () => {
      const res = await request(app)
        .post('/automation/workflows')
        .send({
          name: 'Test Workflow',
          description: 'Test Description',
          steps: [
            { action: 'email', config: { template: 'welcome' }, order: 0 },
            {
              action: 'analytics',
              config: { event: 'user_activated' },
              order: 1,
            },
          ],
          schedule: { type: 'immediate', cron: null },
        })
      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.name).toBe('Test Workflow')
    })

    it('should return 400 for invalid data', async () => {
      const res = await request(app)
        .post('/automation/workflows')
        .send({ name: '', steps: [] })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })

  describe('PUT /automation/workflows/:id', () => {
    it('should update a workflow', async () => {
      const res = await request(app)
        .put('/automation/workflows/workflow-1')
        .send({ name: 'Updated Workflow' })
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.name).toBe('Updated Workflow')
    })

    it('should return 404 for non-existent workflow', async () => {
      const res = await request(app)
        .put('/automation/workflows/nonexistent')
        .send({ name: 'Does not exist' })
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('DELETE /automation/workflows/:id', () => {
    it('should delete a workflow', async () => {
      const res = await request(app).delete('/automation/workflows/workflow-1')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })

    it('should return 404 for non-existent workflow', async () => {
      const res = await request(app).delete('/automation/workflows/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('GET /automation/jobs', () => {
    it('should return all jobs', async () => {
      const res = await request(app).get('/automation/jobs')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
  })

  describe('GET /automation/jobs/:id', () => {
    it('should return a job by id', async () => {
      const res = await request(app).get('/automation/jobs/job-1')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.id).toBe('job-1')
    })

    it('should return 404 for non-existent job', async () => {
      const res = await request(app).get('/automation/jobs/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /automation/workflows/:id/execute', () => {
    it('should execute a workflow', async () => {
      const res = await request(app)
        .post('/automation/workflows/workflow-1/execute')
        .send({ data: { userId: 'user-1' } })
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.status).toBe('running')
    })

    it('should return 404 for non-existent workflow', async () => {
      const res = await request(app)
        .post('/automation/workflows/nonexistent/execute')
        .send({ data: {} })
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /automation/jobs/:id/pause', () => {
    it('should pause a job', async () => {
      const res = await request(app).post('/automation/jobs/job-1/pause')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })

    it('should return 404 for non-existent job', async () => {
      const res = await request(app).post('/automation/jobs/nonexistent/pause')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /automation/jobs/:id/resume', () => {
    it('should resume a job', async () => {
      const res = await request(app).post('/automation/jobs/job-1/resume')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })

    it('should return 404 for non-existent job', async () => {
      const res = await request(app).post('/automation/jobs/nonexistent/resume')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })
})
