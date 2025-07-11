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