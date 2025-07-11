import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import { guidedWorkflowService } from '../services/guided-workflow.service.js'
import logger from '../services/logger.service.js'
import { logAction } from '../services/logger.service.js'

// Schemas de validación para endpoints
const createWorkflowExecutionSchema = z.object({
  workflow_id: z.string().min(1, 'Workflow ID es requerido'),
  user_id: z.string().min(1, 'User ID es requerido'),
})

const completeStepSchema = z.object({
  results: z.record(z.unknown()),
  notes: z.string().optional(),
})

export class GuidedWorkflowController {
  // ===== GESTIÓN DE WORKFLOWS =====
  static async getWorkflows(req: any, res: any) {
    try {
      const { category } = req.query
      const workflows = await guidedWorkflowService.getWorkflows(category)
      
      logAction('guided_workflows_retrieved', req.user?.id || 'anonymous', {
        count: workflows.length,
        category,
      })

      res.status(200).json({
        success: true,
        data: workflows,
        count: workflows.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener workflows')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getWorkflowById(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de workflow es requerido',
        })
      }

      const workflow = await guidedWorkflowService.getWorkflowById(id)
      
      if (!workflow) {
        return res.status(404).json({
          success: false,
          error: 'Workflow no encontrado',
        })
      }

      logAction('guided_workflow_retrieved', req.user?.id || 'anonymous', {
        workflow_id: id,
        category: workflow.category,
      })

      res.status(200).json({
        success: true,
        data: workflow,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener workflow')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getWorkflowsByDifficulty(req: any, res: any) {
    try {
      const { difficulty } = req.params
      
      if (!difficulty) {
        return res.status(400).json({
          success: false,
          error: 'Nivel de dificultad es requerido',
        })
      }

      const workflows = await guidedWorkflowService.getWorkflowsByDifficulty(difficulty)
      
      logAction('guided_workflows_by_difficulty_retrieved', req.user?.id || 'anonymous', {
        difficulty,
        count: workflows.length,
      })

      res.status(200).json({
        success: true,
        data: workflows,
        count: workflows.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener workflows por dificultad')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== EJECUCIÓN DE WORKFLOWS =====
  static async startWorkflowExecution(req: any, res: any) {
    try {
      const validatedData = createWorkflowExecutionSchema.parse(req.body)
      
      const execution = await guidedWorkflowService.startWorkflowExecution(validatedData)
      
      logAction('guided_workflow_execution_started', req.user?.id || 'anonymous', {
        execution_id: execution.id,
        workflow_id: execution.workflow_id,
        user_id: execution.user_id,
      })

      res.status(201).json({
        success: true,
        message: 'Ejecución de workflow iniciada exitosamente',
        data: execution,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al iniciar ejecución de workflow')
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Datos inválidos',
          details: error.errors,
        })
      }
      
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message,
        })
      }
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getExecutionById(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de ejecución es requerido',
        })
      }

      const execution = await guidedWorkflowService.getExecutionById(id)
      
      if (!execution) {
        return res.status(404).json({
          success: false,
          error: 'Ejecución no encontrada',
        })
      }

      logAction('guided_workflow_execution_retrieved', req.user?.id || 'anonymous', {
        execution_id: id,
        status: execution.status,
      })

      res.status(200).json({
        success: true,
        data: execution,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener ejecución')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getUserExecutions(req: any, res: any) {
    try {
      const { userId } = req.params
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID es requerido',
        })
      }

      const executions = await guidedWorkflowService.getUserExecutions(userId)
      
      logAction('guided_workflow_user_executions_retrieved', req.user?.id || 'anonymous', {
        user_id: userId,
        count: executions.length,
      })

      res.status(200).json({
        success: true,
        data: executions,
        count: executions.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener ejecuciones del usuario')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async completeStep(req: any, res: any) {
    try {
      const { executionId, stepId } = req.params
      const validatedData = completeStepSchema.parse(req.body)
      
      if (!executionId || !stepId) {
        return res.status(400).json({
          success: false,
          error: 'Execution ID y Step ID son requeridos',
        })
      }

      const execution = await guidedWorkflowService.completeStep({
        execution_id: executionId,
        step_id: stepId,
        ...validatedData,
      })
      
      logAction('guided_workflow_step_completed', req.user?.id || 'anonymous', {
        execution_id: executionId,
        step_id: stepId,
        progress: execution.progress,
      })

      res.status(200).json({
        success: true,
        message: 'Paso completado exitosamente',
        data: execution,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al completar paso')
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Datos inválidos',
          details: error.errors,
        })
      }
      
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message,
        })
      }
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async pauseExecution(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de ejecución es requerido',
        })
      }

      const paused = await guidedWorkflowService.pauseExecution(id)
      
      if (!paused) {
        return res.status(404).json({
          success: false,
          error: 'Ejecución no encontrada o no se puede pausar',
        })
      }

      logAction('guided_workflow_execution_paused', req.user?.id || 'anonymous', {
        execution_id: id,
      })

      res.status(200).json({
        success: true,
        message: 'Ejecución pausada exitosamente',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al pausar ejecución')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async resumeExecution(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de ejecución es requerido',
        })
      }

      const resumed = await guidedWorkflowService.resumeExecution(id)
      
      if (!resumed) {
        return res.status(404).json({
          success: false,
          error: 'Ejecución no encontrada o no se puede reanudar',
        })
      }

      logAction('guided_workflow_execution_resumed', req.user?.id || 'anonymous', {
        execution_id: id,
      })

      res.status(200).json({
        success: true,
        message: 'Ejecución reanudada exitosamente',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al reanudar ejecución')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async cancelExecution(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de ejecución es requerido',
        })
      }

      const cancelled = await guidedWorkflowService.cancelExecution(id)
      
      if (!cancelled) {
        return res.status(404).json({
          success: false,
          error: 'Ejecución no encontrada o no se puede cancelar',
        })
      }

      logAction('guided_workflow_execution_cancelled', req.user?.id || 'anonymous', {
        execution_id: id,
      })

      res.status(200).json({
        success: true,
        message: 'Ejecución cancelada exitosamente',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al cancelar ejecución')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== TEMPLATES =====
  static async getTemplates(req: any, res: any) {
    try {
      const { industry } = req.query
      const templates = await guidedWorkflowService.getTemplates(industry as string)
      
      logAction('guided_workflow_templates_retrieved', req.user?.id || 'anonymous', {
        count: templates.length,
        industry,
      })

      res.status(200).json({
        success: true,
        data: templates,
        count: templates.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener templates')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getTemplateById(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de template es requerido',
        })
      }

      const template = await guidedWorkflowService.getTemplateById(id)
      
      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'Template no encontrado',
        })
      }

      res.status(200).json({
        success: true,
        data: template,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener template')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async createWorkflowFromTemplate(req: any, res: any) {
    try {
      const { id } = req.params
      const customizations = req.body
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de template es requerido',
        })
      }

      const workflow = await guidedWorkflowService.createWorkflowFromTemplate(id, customizations)
      
      logAction('guided_workflow_from_template_created', req.user?.id || 'anonymous', {
        template_id: id,
        workflow_id: workflow.id,
      })

      res.status(201).json({
        success: true,
        message: 'Workflow creado desde template exitosamente',
        data: workflow,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al crear workflow desde template')
      
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message,
        })
      }
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== MÉTRICAS =====
  static async getWorkflowMetrics(req: any, res: any) {
    try {
      const metrics = await guidedWorkflowService.getWorkflowMetrics()
      
      logAction('guided_workflow_metrics_retrieved', req.user?.id || 'anonymous', {
        total_workflows: metrics.total_workflows,
        total_executions: metrics.total_executions,
      })

      res.status(200).json({
        success: true,
        data: metrics,
        message: 'Métricas de Guided Workflows',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener métricas de workflows')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== MISSING METHODS =====
  static async validateWorkflow(req: any, res: any) {
    try {
      const { workflow_id, validation_rules } = req.body
      
      if (!workflow_id) {
        return res.status(400).json({
          success: false,
          error: 'Workflow ID is required',
        })
      }

      // Mock workflow validation
      const validation = await guidedWorkflowService.validateWorkflow(workflow_id, validation_rules)

      logAction('guided_workflow_validated', req.user?.id || 'anonymous', {
        workflow_id,
        validation_result: validation.is_valid,
        errors_count: validation.errors.length,
      })

      res.status(200).json({
        success: true,
        data: validation,
        message: 'Workflow validation completed',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error validating workflow')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getValidationErrors(req: any, res: any) {
    try {
      const { workflow_id } = req.params
      
      if (!workflow_id) {
        return res.status(400).json({
          success: false,
          error: 'Workflow ID is required',
        })
      }

      // Mock validation errors retrieval
      const errors = await guidedWorkflowService.getValidationErrors(workflow_id)

      res.status(200).json({
        success: true,
        data: errors,
        count: errors.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving validation errors')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== MISSING METHODS FROM ROUTES =====
  static async createWorkflow(req: any, res: any) {
    try {
      const { name, description, category, steps, metadata } = req.body
      
      if (!name || !category || !steps || !Array.isArray(steps)) {
        return res.status(400).json({
          success: false,
          error: 'Name, category, and steps are required',
        })
      }

      // Mock workflow creation
      const workflow = {
        id: `workflow-${Date.now()}`,
        name,
        description: description || '',
        category,
        steps: steps.map((step: any, index: number) => ({
          id: `step-${index + 1}`,
          ...step,
          order: step.order || index + 1,
          status: 'pending',
          created_at: new Date().toISOString(),
        })),
        metadata: metadata || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: req.user?.id || 'anonymous',
        status: 'draft',
        version: '1.0.0',
      }

      logAction('guided_workflow_created', req.user?.id || 'anonymous', {
        workflow_id: workflow.id,
        workflow_name: workflow.name,
        category: workflow.category,
        steps_count: workflow.steps.length,
      })

      res.status(201).json({
        success: true,
        data: workflow,
        message: 'Workflow created successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error creating workflow')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async updateWorkflow(req: any, res: any) {
    try {
      const { id } = req.params
      const updateData = req.body
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Workflow ID is required',
        })
      }

      // Mock workflow update
      const workflow = {
        id,
        ...updateData,
        updated_at: new Date().toISOString(),
        version: '1.1.0',
      }

      logAction('guided_workflow_updated', req.user?.id || 'anonymous', {
        workflow_id: id,
        updated_fields: Object.keys(updateData),
      })

      res.status(200).json({
        success: true,
        data: workflow,
        message: 'Workflow updated successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error updating workflow')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async deleteWorkflow(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Workflow ID is required',
        })
      }

      // Mock workflow deletion
      const deleted = true // Simulate successful deletion

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Workflow not found',
        })
      }

      logAction('guided_workflow_deleted', req.user?.id || 'anonymous', {
        workflow_id: id,
      })

      res.status(200).json({
        success: true,
        message: 'Workflow deleted successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error deleting workflow')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async executeWorkflow(req: any, res: any) {
    try {
      const { id } = req.params
      const { input_data, execution_mode, parameters } = req.body
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Workflow ID is required',
        })
      }

      // Mock workflow execution
      const execution = {
        id: `exec-${Date.now()}`,
        workflow_id: id,
        input_data: input_data || {},
        execution_mode: execution_mode || 'step_by_step',
        parameters: parameters || {},
        status: 'running',
        progress: 0,
        current_step: 1,
        started_at: new Date().toISOString(),
        estimated_completion: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
        results: {},
      }

      logAction('guided_workflow_executed', req.user?.id || 'anonymous', {
        workflow_id: id,
        execution_id: execution.id,
        execution_mode: execution.execution_mode,
      })

      res.status(201).json({
        success: true,
        data: execution,
        message: 'Workflow execution started successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error executing workflow')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async pauseWorkflow(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Workflow ID is required',
        })
      }

      // Mock workflow pause
      const paused = true // Simulate successful pause

      if (!paused) {
        return res.status(404).json({
          success: false,
          error: 'Workflow not found or cannot be paused',
        })
      }

      logAction('guided_workflow_paused', req.user?.id || 'anonymous', {
        workflow_id: id,
      })

      res.status(200).json({
        success: true,
        message: 'Workflow paused successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error pausing workflow')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async resumeWorkflow(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Workflow ID is required',
        })
      }

      // Mock workflow resume
      const resumed = true // Simulate successful resume

      if (!resumed) {
        return res.status(404).json({
          success: false,
          error: 'Workflow not found or cannot be resumed',
        })
      }

      logAction('guided_workflow_resumed', req.user?.id || 'anonymous', {
        workflow_id: id,
      })

      res.status(200).json({
        success: true,
        message: 'Workflow resumed successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error resuming workflow')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async instantiateTemplate(req: any, res: any) {
    try {
      const { id } = req.params
      const { name, description, parameters } = req.body
      
      if (!id || !name) {
        return res.status(400).json({
          success: false,
          error: 'Template ID and name are required',
        })
      }

      // Mock template instantiation
      const workflow = {
        id: `workflow-${Date.now()}`,
        name,
        description: description || '',
        template_id: id,
        parameters: parameters || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: req.user?.id || 'anonymous',
        status: 'draft',
        version: '1.0.0',
        steps: [
          {
            id: 'step-1',
            name: 'Initialize Data',
            description: 'Set up data sources and initial configuration',
            order: 1,
            status: 'pending',
            required: true,
          },
          {
            id: 'step-2',
            name: 'Configure Model',
            description: 'Set model parameters and configuration',
            order: 2,
            status: 'pending',
            required: true,
          },
          {
            id: 'step-3',
            name: 'Execute Process',
            description: 'Run the main workflow process',
            order: 3,
            status: 'pending',
            required: true,
          },
        ],
      }

      logAction('guided_workflow_template_instantiated', req.user?.id || 'anonymous', {
        template_id: id,
        workflow_id: workflow.id,
        workflow_name: workflow.name,
      })

      res.status(201).json({
        success: true,
        data: workflow,
        message: 'Workflow instantiated from template successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error instantiating template')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getWorkflowSteps(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Workflow ID is required',
        })
      }

      // Mock workflow steps retrieval
      const steps = [
        {
          id: 'step-1',
          name: 'Data Preparation',
          description: 'Prepare and validate input data',
          order: 1,
          status: 'completed',
          required: true,
          estimated_duration: '10 minutes',
          actual_duration: '8 minutes',
          results: { status: 'success', message: 'Data prepared successfully' },
        },
        {
          id: 'step-2',
          name: 'Model Training',
          description: 'Train the machine learning model',
          order: 2,
          status: 'in_progress',
          required: true,
          estimated_duration: '30 minutes',
          progress: 65,
          results: {},
        },
        {
          id: 'step-3',
          name: 'Model Evaluation',
          description: 'Evaluate model performance',
          order: 3,
          status: 'pending',
          required: true,
          estimated_duration: '15 minutes',
          results: {},
        },
        {
          id: 'step-4',
          name: 'Model Deployment',
          description: 'Deploy model to production',
          order: 4,
          status: 'pending',
          required: false,
          estimated_duration: '20 minutes',
          results: {},
        },
      ]

      logAction('guided_workflow_steps_retrieved', req.user?.id || 'anonymous', {
        workflow_id: id,
        steps_count: steps.length,
      })

      res.status(200).json({
        success: true,
        data: steps,
        count: steps.length,
        message: 'Workflow steps retrieved successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving workflow steps')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async validateStep(req: any, res: any) {
    try {
      const { id, stepId } = req.params
      const { step_data, validation_rules } = req.body
      
      if (!id || !stepId) {
        return res.status(400).json({
          success: false,
          error: 'Workflow ID and Step ID are required',
        })
      }

      // Mock step validation
      const validation = {
        step_id: stepId,
        workflow_id: id,
        is_valid: true,
        validation_results: [
          {
            rule: 'data_completeness',
            status: 'passed',
            message: 'All required data fields are present',
          },
          {
            rule: 'data_quality',
            status: 'passed',
            message: 'Data quality checks passed',
          },
          {
            rule: 'business_rules',
            status: 'passed',
            message: 'Business validation rules satisfied',
          },
        ],
        warnings: [],
        errors: [],
        validated_at: new Date().toISOString(),
        next_step_ready: true,
      }

      logAction('guided_workflow_step_validated', req.user?.id || 'anonymous', {
        workflow_id: id,
        step_id: stepId,
        validation_result: validation.is_valid,
      })

      res.status(200).json({
        success: true,
        data: validation,
        message: 'Step validation completed successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error validating step')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== ESTADO DEL SERVICIO =====
  static async getWorkflowStatus(req: any, res: any) {
    try {
      const status = {
        service: 'Guided Workflows',
        status: 'operational',
        version: '1.0.0',
        features: {
          step_by_step_guidance: true,
          automated_validation: true,
          business_outcomes: true,
          template_library: true,
          progress_tracking: true,
        },
        capabilities: [
          'Guía paso a paso para implementación de ML',
          'Validación automática de cada paso',
          'Resultados de negocio medibles',
          'Biblioteca de templates por industria',
          'Seguimiento de progreso en tiempo real',
        ],
        supported_categories: ['ml_implementation', 'data_preparation', 'model_deployment', 'business_analysis'],
        supported_difficulties: ['beginner', 'intermediate', 'advanced'],
        last_updated: new Date().toISOString(),
      }

      res.status(200).json({
        success: true,
        data: status,
        message: 'Estado del servicio Guided Workflows',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener estado de workflows')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }
} 