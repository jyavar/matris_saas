import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import type {
  CreateWorkflowData,
  UpdateWorkflowData,
} from '../services/automation.service.js'
import { automationService } from '../services/automation.service.js'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.js'

// Schemas de validación
const createWorkflowSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  steps: z
    .array(
      z.object({
        action: z.enum(['email', 'analytics', 'webhook', 'delay', 'condition']),
        config: z.record(z.unknown()),
        order: z.number().optional(),
      }),
    )
    .min(1, 'At least one step is required'),
  schedule: z.object({
    type: z.enum(['immediate', 'scheduled', 'recurring']),
    cron: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
})

const updateWorkflowSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional(),
  steps: z
    .array(
      z.object({
        action: z.enum(['email', 'analytics', 'webhook', 'delay', 'condition']),
        config: z.record(z.unknown()),
        order: z.number().optional(),
      }),
    )
    .optional(),
  schedule: z
    .object({
      type: z.enum(['immediate', 'scheduled', 'recurring']),
      cron: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
    .optional(),
  status: z.enum(['active', 'inactive', 'draft']).optional(),
})

const executeWorkflowSchema = z.object({
  data: z.record(z.unknown()).optional(),
  userId: z.string().optional(),
})

export const automationController = {
  /**
   * GET /automation/workflows - Obtener todos los workflows
   */
  async getWorkflows(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const workflows = await automationService.getWorkflows()

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: workflows,
        count: workflows.length,
      }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  /**
   * GET /automation/workflows/:id - Obtener workflow por ID
   */
  async getWorkflowById(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>): Promise<void> {
    try {
      const { id } = _params || {}

      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Workflow ID is required' }))
        return
      }

      const workflow = await automationService.getWorkflowById(id)

      if (!workflow) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Workflow not found' }))
        return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: workflow,
      }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  /**
   * POST /automation/workflows - Crear nuevo workflow
   */
  async createWorkflow(req: IncomingMessage, res: ServerResponse, _body?: RequestBody, user?: AuthenticatedUser): Promise<void> {
    try {
      // Validar datos de entrada
      const validatedData = createWorkflowSchema.parse(_body)

      // Obtener userId del usuario autenticado
      const userId = user?.id
      if (!userId) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'User not authenticated' }))
        return
      }

      const workflow = await automationService.createWorkflow(
        validatedData as CreateWorkflowData,
        userId,
      )

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: workflow,
        message: 'Workflow created successfully',
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Invalid input data', details: error.errors }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
      }
    }
  },

  /**
   * PUT /automation/workflows/:id - Actualizar workflow
   */
  async updateWorkflow(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody): Promise<void> {
    try {
      const { id } = _params || {}

      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Workflow ID is required' }))
        return
      }

      // Validar datos de entrada
      const validatedData = updateWorkflowSchema.parse(_body)

      const workflow = await automationService.updateWorkflow(
        id,
        validatedData as UpdateWorkflowData,
      )

      if (!workflow) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Workflow not found' }))
        return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: workflow,
        message: 'Workflow updated successfully',
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Invalid input data', details: error.errors }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
      }
    }
  },

  /**
   * DELETE /automation/workflows/:id - Eliminar workflow
   */
  async deleteWorkflow(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>): Promise<void> {
    try {
      const { id } = _params || {}

      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Workflow ID is required' }))
        return
      }

      const deleted = await automationService.deleteWorkflow(id)

      if (!deleted) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Workflow not found' }))
        return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        message: 'Workflow deleted successfully',
      }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  /**
   * GET /automation/jobs - Obtener todos los jobs
   */
  async getJobs(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const jobs = await automationService.getJobs()

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: jobs,
        count: jobs.length,
      }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  /**
   * GET /automation/jobs/:id - Obtener job por ID
   */
  async getJobById(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>): Promise<void> {
    try {
      const { id } = _params || {}

      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Job ID is required' }))
        return
      }

      const job = await automationService.getJobById(id)

      if (!job) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Job not found' }))
        return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: job,
      }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  /**
   * POST /automation/workflows/:id/execute - Ejecutar workflow
   */
  async executeWorkflow(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody): Promise<void> {
    try {
      const { id } = _params || {}

      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Workflow ID is required' }))
        return
      }

      // Validar datos de entrada
      const validatedData = executeWorkflowSchema.parse(_body)

      const job = await automationService.executeWorkflow(id, validatedData)

      if (!job) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Workflow not found' }))
        return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: job,
        message: 'Workflow execution started',
      }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Invalid input data', details: error.errors }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
      }
    }
  },

  /**
   * POST /automation/jobs/:id/pause - Pausar job
   */
  async pauseJob(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>): Promise<void> {
    try {
      const { id } = _params || {}

      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Job ID is required' }))
        return
      }

      const job = await automationService.pauseJob(id)

      if (!job) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Job not found' }))
        return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: job,
        message: 'Job paused successfully',
      }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  /**
   * POST /automation/jobs/:id/resume - Reanudar job
   */
  async resumeJob(req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>): Promise<void> {
    try {
      const { id } = _params || {}

      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Job ID is required' }))
        return
      }

      const job = await automationService.resumeJob(id)

      if (!job) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Job not found' }))
        return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        data: job,
        message: 'Job resumed successfully',
      }))
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }))
    }
  },

  // Alias methods for route compatibility
  getAutomations: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return automationController.getWorkflows(req, res, _params, _body, user)
  },
  createAutomation: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return automationController.createWorkflow(req, res, _params, _body, user)
  },
  getAutomationById: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return automationController.getWorkflowById(req, res, _params, _body, user)
  },
  updateAutomation: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return automationController.updateWorkflow(req, res, _params, _body, user)
  },
  deleteAutomation: async (req: IncomingMessage, res: ServerResponse, _params?: Record<string, string>, _body?: RequestBody, user?: AuthenticatedUser) => {
    return automationController.deleteWorkflow(req, res, _params, _body, user)
  },
}
