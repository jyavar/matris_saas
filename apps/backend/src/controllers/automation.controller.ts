import { z } from 'zod'

import type {
  CreateWorkflowData,
  UpdateWorkflowData,
} from '../services/automation.service.js'
import { automationService } from '../services/automation.service.js'
import { ApiError } from '../utils/ApiError.js'

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

export class AutomationController {
  /**
   * GET /automation/workflows - Obtener todos los workflows
   */
  async getWorkflows(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const workflows = await automationService.getWorkflows()

      res.status(200).json({
        success: true,
        data: workflows,
        count: workflows.length,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /automation/workflows/:id - Obtener workflow por ID
   */
  async getWorkflowById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new ApiError(400, 'Workflow ID is required')
      }

      const workflow = await automationService.getWorkflowById(id)

      if (!workflow) {
        throw new ApiError(404, 'Workflow not found')
      }

      res.status(200).json({
        success: true,
        data: workflow,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * POST /automation/workflows - Crear nuevo workflow
   */
  async createWorkflow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Validar datos de entrada
      const validatedData = createWorkflowSchema.parse(req.body)

      // Obtener userId del request (asumiendo que viene del middleware de auth)
      const userId = (req.user as { id: string })?.id
      if (!userId) {
        throw new ApiError(401, 'User not authenticated')
      }

      const workflow = await automationService.createWorkflow(
        validatedData as CreateWorkflowData,
        userId,
      )

      res.status(201).json({
        success: true,
        data: workflow,
        message: 'Workflow created successfully',
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  }

  /**
   * PUT /automation/workflows/:id - Actualizar workflow
   */
  async updateWorkflow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new ApiError(400, 'Workflow ID is required')
      }

      // Validar datos de entrada
      const validatedData = updateWorkflowSchema.parse(req.body)

      const workflow = await automationService.updateWorkflow(
        id,
        validatedData as UpdateWorkflowData,
      )

      if (!workflow) {
        throw new ApiError(404, 'Workflow not found')
      }

      res.status(200).json({
        success: true,
        data: workflow,
        message: 'Workflow updated successfully',
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  }

  /**
   * DELETE /automation/workflows/:id - Eliminar workflow
   */
  async deleteWorkflow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new ApiError(400, 'Workflow ID is required')
      }

      const deleted = await automationService.deleteWorkflow(id)

      if (!deleted) {
        throw new ApiError(404, 'Workflow not found')
      }

      res.status(200).json({
        success: true,
        message: 'Workflow deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /automation/jobs - Obtener todos los jobs
   */
  async getJobs(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const jobs = await automationService.getJobs()

      res.status(200).json({
        success: true,
        data: jobs,
        count: jobs.length,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /automation/jobs/:id - Obtener job por ID
   */
  async getJobById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new ApiError(400, 'Job ID is required')
      }

      const job = await automationService.getJobById(id)

      if (!job) {
        throw new ApiError(404, 'Job not found')
      }

      res.status(200).json({
        success: true,
        data: job,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * POST /automation/workflows/:id/execute - Ejecutar workflow
   */
  async executeWorkflow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new ApiError(400, 'Workflow ID is required')
      }

      // Validar datos de entrada
      const validatedData = executeWorkflowSchema.parse(req.body)

      const job = await automationService.executeWorkflow(id, validatedData)

      if (!job) {
        throw new ApiError(404, 'Workflow not found')
      }

      res.status(200).json({
        success: true,
        data: job,
        message: 'Workflow execution started',
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  }

  /**
   * POST /automation/jobs/:id/pause - Pausar job
   */
  async pauseJob(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new ApiError(400, 'Job ID is required')
      }

      const job = await automationService.pauseJob(id)

      if (!job) {
        throw new ApiError(404, 'Job not found')
      }

      res.status(200).json({
        success: true,
        data: job,
        message: 'Job paused successfully',
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, 'Invalid input data'))
      } else {
        next(error)
      }
    }
  }

  /**
   * POST /automation/jobs/:id/resume - Reanudar job
   */
  async resumeJob(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new ApiError(400, 'Job ID is required')
      }

      const job = await automationService.resumeJob(id)

      if (!job) {
        throw new ApiError(404, 'Job not found')
      }

      res.status(200).json({
        success: true,
        data: job,
        message: 'Job resumed successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}

export const automationController = new AutomationController()
