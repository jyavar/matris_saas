import { ApiError } from '../utils/ApiError.js'
import { supabase } from '../lib/supabase.js'
import logger from './logger.service.js'
import type { AuthenticatedUser } from '../types/express/index.js'

// Tipos estrictos para Automation Engine
export interface WorkflowStep {
  id: string
  action: 'email' | 'analytics' | 'webhook' | 'delay' | 'condition'
  config: Record<string, unknown>
  order: number
}

export interface WorkflowSchedule {
  type: 'immediate' | 'scheduled' | 'recurring'
  cron?: string
  startDate?: string
  endDate?: string
}

export interface Workflow {
  id: string
  name: string
  description?: string
  status: 'active' | 'inactive' | 'draft'
  steps: WorkflowStep[]
  schedule: WorkflowSchedule
  created_at: string
  updated_at: string
  created_by: string
}

export interface Job {
  id: string
  workflow_id: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused'
  started_at: string
  completed_at?: string
  result?: Record<string, unknown>
  error?: string
  data?: Record<string, unknown>
  created_at: string
}

export interface CreateWorkflowData {
  name: string
  description?: string
  steps: Omit<WorkflowStep, 'id'>[]
  schedule: WorkflowSchedule
}

export interface UpdateWorkflowData {
  name?: string
  description?: string
  steps?: Omit<WorkflowStep, 'id'>[]
  schedule?: WorkflowSchedule
  status?: Workflow['status']
}

export interface ExecuteWorkflowData {
  data?: Record<string, unknown>
  userId?: string
}

export class AutomationService {
  /**
   * Obtiene todos los workflows
   */
  async getWorkflows(): Promise<Workflow[]> {
    try {
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        logger.error({ error }, 'Error fetching workflows')
        throw new ApiError('Failed to fetch workflows', 500)
      }

      return data || []
    } catch (err) {
      logger.error({ error: err }, 'Error in getWorkflows')
      throw err
    }
  }

  /**
   * Obtiene un workflow por ID
   */
  async getWorkflowById(id: string): Promise<Workflow | null> {
    try {
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // No encontrado
        }
        logger.error({ error }, 'Error fetching workflow')
        throw new ApiError('Failed to fetch workflow', 500)
      }

      return data
    } catch (error) {
      logger.error({ error, id }, 'Error in getWorkflowById')
      throw error
    }
  }

  /**
   * Crea un nuevo workflow
   */
  async createWorkflow(
    workflowData: CreateWorkflowData,
    userId: string,
  ): Promise<Workflow> {
    try {
      // Validar datos requeridos
      if (
        !workflowData.name ||
        !workflowData.steps ||
        workflowData.steps.length === 0
      ) {
        throw new ApiError('Name and steps are required', 400)
      }

      // Generar IDs para los steps
      const stepsWithIds: WorkflowStep[] = workflowData.steps.map(
        (step, index) => ({
          ...step,
          id: `step-${Date.now()}-${index}`,
          order: index,
        }),
      )

      const workflow: Omit<Workflow, 'id' | 'created_at' | 'updated_at'> = {
        name: workflowData.name,
        description: workflowData.description,
        status: 'draft',
        steps: stepsWithIds,
        schedule: workflowData.schedule,
        created_by: userId,
      }

      const { data, error } = await supabase
        .from('workflows')
        .insert(workflow)
        .select()
        .single()

      if (error) {
        logger.error({ error }, 'Error creating workflow')
        throw new ApiError('Failed to create workflow', 500)
      }

      logger.info(
        { workflowId: data.id, userId },
        'Workflow created successfully',
      )
      return data
    } catch (error) {
      logger.error({ error }, 'Error in createWorkflow')
      throw error
    }
  }

  /**
   * Actualiza un workflow existente
   */
  async updateWorkflow(
    id: string,
    updateData: UpdateWorkflowData,
  ): Promise<Workflow | null> {
    try {
      // Verificar que el workflow existe
      const existingWorkflow = await this.getWorkflowById(id)
      if (!existingWorkflow) {
        return null
      }

      // Preparar datos de actualización
      const updatePayload: Partial<Workflow> = {
        updated_at: new Date().toISOString(),
      }

      if (updateData.name !== undefined) updatePayload.name = updateData.name
      if (updateData.description !== undefined)
        updatePayload.description = updateData.description
      if (updateData.status !== undefined)
        updatePayload.status = updateData.status
      if (updateData.schedule !== undefined)
        updatePayload.schedule = updateData.schedule

      // Procesar steps si se proporcionan
      if (updateData.steps) {
        const stepsWithIds: WorkflowStep[] = updateData.steps.map(
          (step, index) => ({
            ...step,
            id: `step-${Date.now()}-${index}`,
            order: index,
          }),
        )
        updatePayload.steps = stepsWithIds
      }

      const { data, error } = await supabase
        .from('workflows')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        logger.error({ error, id, updateData }, 'Error updating workflow')
        throw new ApiError('Failed to update workflow', 500)
      }

      logger.info({ workflowId: id }, 'Workflow updated successfully')
      return data
    } catch (error) {
      logger.error({ error, id, updateData }, 'Error in updateWorkflow')
      throw error
    }
  }

  /**
   * Elimina un workflow
   */
  async deleteWorkflow(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('workflows').delete().eq('id', id)

      if (error) {
        logger.error({ error, id }, 'Error deleting workflow')
        throw new ApiError('Failed to delete workflow', 500)
      }

      logger.info({ workflowId: id }, 'Workflow deleted successfully')
      return true
    } catch (error) {
      logger.error({ error, id }, 'Error in deleteWorkflow')
      throw error
    }
  }

  /**
   * Obtiene todos los jobs
   */
  async getJobs(): Promise<Job[]> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        logger.error({ error }, 'Error fetching jobs')
        throw new ApiError('Failed to fetch jobs', 500)
      }

      return data || []
    } catch (error) {
      logger.error({ error }, 'Error in getJobs')
      throw error
    }
  }

  /**
   * Obtiene un job por ID
   */
  async getJobById(id: string): Promise<Job | null> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // No encontrado
        }
        logger.error({ error, id }, 'Error fetching job')
        throw new ApiError('Failed to fetch job', 500)
      }

      return data
    } catch (error) {
      logger.error({ error, id }, 'Error in getJobById')
      throw error
    }
  }

  /**
   * Ejecuta un workflow
   */
  async executeWorkflow(
    workflowId: string,
    executionData: ExecuteWorkflowData,
  ): Promise<Job | null> {
    try {
      // Verificar que el workflow existe y está activo
      const workflow = await this.getWorkflowById(workflowId)
      if (!workflow) {
        return null
      }

      if (workflow.status !== 'active') {
        throw new ApiError('Workflow is not active', 400)
      }

      // Crear job
      const job: Omit<Job, 'id'> = {
        workflow_id: workflowId,
        status: 'pending',
        started_at: new Date().toISOString(),
        data: executionData.data,
        created_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('jobs')
        .insert(job)
        .select()
        .single()

      if (error) {
        logger.error({ error, workflowId }, 'Error creating job')
        throw new ApiError('Failed to create job', 500)
      }

      // Iniciar ejecución asíncrona
      this.processJob(data.id).catch((error) => {
        logger.error({ error, jobId: data.id }, 'Error processing job')
      })

      logger.info(
        { jobId: data.id, workflowId },
        'Job created and started processing',
      )
      return data
    } catch (error) {
      logger.error({ error, workflowId }, 'Error in executeWorkflow')
      throw error
    }
  }

  /**
   * Pausa un job
   */
  async pauseJob(jobId: string): Promise<Job | null> {
    try {
      const job = await this.getJobById(jobId)
      if (!job) {
        return null
      }

      if (job.status !== 'running') {
        throw new ApiError('Job is not running', 400)
      }

      const { data, error } = await supabase
        .from('jobs')
        .update({ status: 'paused' })
        .eq('id', jobId)
        .select()
        .single()

      if (error) {
        logger.error({ error, jobId }, 'Error pausing job')
        throw new ApiError('Failed to pause job', 500)
      }

      logger.info({ jobId }, 'Job paused successfully')
      return data
    } catch (error) {
      logger.error({ error, jobId }, 'Error in pauseJob')
      throw error
    }
  }

  /**
   * Reanuda un job
   */
  async resumeJob(jobId: string): Promise<Job | null> {
    try {
      const job = await this.getJobById(jobId)
      if (!job) {
        return null
      }

      if (job.status !== 'paused') {
        throw new ApiError('Job is not paused', 400)
      }

      const { data, error } = await supabase
        .from('jobs')
        .update({ status: 'running' })
        .eq('id', jobId)
        .select()
        .single()

      if (error) {
        logger.error({ error, jobId }, 'Error resuming job')
        throw new ApiError('Failed to resume job', 500)
      }

      // Continuar procesamiento
      this.processJob(jobId).catch((error) => {
        logger.error({ error, jobId }, 'Error processing resumed job')
      })

      logger.info({ jobId }, 'Job resumed successfully')
      return data
    } catch (error) {
      logger.error({ error, jobId }, 'Error in resumeJob')
      throw error
    }
  }

  /**
   * Procesa un job (método privado)
   */
  private async processJob(jobId: string, _user?: AuthenticatedUser): Promise<void> {
    try {
      // Actualizar status a running
      await supabase.from('jobs').update({ status: 'running' }).eq('id', jobId)

      // Simular procesamiento de workflow
      // En una implementación real, aquí se ejecutarían los steps del workflow
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Marcar como completado
      await supabase
        .from('jobs')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          result: { message: 'Workflow executed successfully' },
        })
        .eq('id', jobId)

      logger.info({ jobId }, 'Job processed successfully')
    } catch (error) {
      // Marcar como fallido
      await supabase
        .from('jobs')
        .update({
          status: 'failed',
          completed_at: new Date().toISOString(),
          error: (error instanceof Error ? error.message : 'Unknown error'),
        })
        .eq('id', jobId)

      logger.error({ error, jobId }, 'Job processing failed')
      throw error
    }
  }
}

export const automationService = new AutomationService()
