import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import logger from './logger.service.js'

// Tipos estrictos para Guided Workflows
export interface GuidedWorkflow {
  id: string
  name: string
  description: string
  category: 'ml_implementation' | 'data_preparation' | 'model_deployment' | 'business_analysis'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimated_time: number // minutos
  steps: WorkflowStep[]
  prerequisites: string[]
  business_outcomes: string[]
  created_at: string
  updated_at: string
  status: 'draft' | 'active' | 'archived'
}

export interface WorkflowStep {
  id: string
  order: number
  title: string
  description: string
  type: 'information' | 'action' | 'decision' | 'validation' | 'completion'
  content: StepContent
  estimated_time: number // minutos
  required: boolean
  dependencies: string[] // IDs de pasos previos
  validation_rules?: ValidationRule[]
  help_resources: HelpResource[]
}

export interface StepContent {
  instructions: string[]
  examples: string[]
  tips: string[]
  warnings: string[]
  business_context: string
  expected_outcome: string
}

export interface ValidationRule {
  type: 'data_quality' | 'business_logic' | 'technical_requirement'
  condition: string
  message: string
  severity: 'error' | 'warning' | 'info'
}

export interface HelpResource {
  type: 'documentation' | 'video' | 'template' | 'example'
  title: string
  url: string
  description: string
}

export interface WorkflowExecution {
  id: string
  workflow_id: string
  user_id: string
  status: 'in_progress' | 'completed' | 'paused' | 'cancelled'
  current_step: number
  started_at: string
  completed_at?: string
  progress: number
  steps_completed: string[]
  steps_failed: string[]
  business_results: BusinessResult[]
  notes: string[]
}

export interface BusinessResult {
  step_id: string
  outcome: string
  business_impact: string
  metrics: Record<string, number>
  recommendations: string[]
  next_actions: string[]
}

export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: GuidedWorkflow['category']
  industry: string[]
  use_cases: string[]
  template: Partial<GuidedWorkflow>
}

// Schemas de validación
const createWorkflowExecutionSchema = z.object({
  workflow_id: z.string().min(1, 'Workflow ID es requerido'),
  user_id: z.string().min(1, 'User ID es requerido'),
})

const completeStepSchema = z.object({
  execution_id: z.string().min(1, 'Execution ID es requerido'),
  step_id: z.string().min(1, 'Step ID es requerido'),
  results: z.record(z.unknown()),
  notes: z.string().optional(),
})

export class GuidedWorkflowService {
  private workflows: GuidedWorkflow[] = []
  private executions: WorkflowExecution[] = []
  private templates: WorkflowTemplate[] = []

  constructor() {
    this.initializeDefaultWorkflows()
    this.initializeTemplates()
  }

  // ===== GESTIÓN DE WORKFLOWS =====
  async getWorkflows(category?: GuidedWorkflow['category']): Promise<GuidedWorkflow[]> {
    if (category) {
      return this.workflows.filter(w => w.category === category)
    }
    return this.workflows
  }

  async getWorkflowById(id: string): Promise<GuidedWorkflow | null> {
    return this.workflows.find(w => w.id === id) || null
  }

  async getWorkflowsByDifficulty(difficulty: GuidedWorkflow['difficulty']): Promise<GuidedWorkflow[]> {
    return this.workflows.filter(w => w.difficulty === difficulty)
  }

  // ===== EJECUCIÓN DE WORKFLOWS =====
  async startWorkflowExecution(data: z.infer<typeof createWorkflowExecutionSchema>): Promise<WorkflowExecution> {
    try {
      const validatedData = createWorkflowExecutionSchema.parse(data)
      
      const workflow = await this.getWorkflowById(validatedData.workflow_id)
      if (!workflow) {
        throw new ApiError('Workflow no encontrado', 404)
      }

      const execution: WorkflowExecution = {
        id: `execution-${Date.now()}`,
        workflow_id: validatedData.workflow_id,
        user_id: validatedData.user_id,
        status: 'in_progress',
        current_step: 1,
        started_at: new Date().toISOString(),
        progress: 0,
        steps_completed: [],
        steps_failed: [],
        business_results: [],
        notes: [],
      }

      this.executions.push(execution)
      
      logger.info({ executionId: execution.id, workflowId: workflow.id }, 'Ejecución de workflow iniciada')
      return execution
    } catch (error) {
      logger.error({ error }, 'Error al iniciar ejecución de workflow')
      throw error
    }
  }

  async getExecutionById(id: string): Promise<WorkflowExecution | null> {
    return this.executions.find(e => e.id === id) || null
  }

  async getUserExecutions(userId: string): Promise<WorkflowExecution[]> {
    return this.executions.filter(e => e.user_id === userId)
  }

  async completeStep(data: z.infer<typeof completeStepSchema>): Promise<WorkflowExecution> {
    try {
      const validatedData = completeStepSchema.parse(data)
      
      const execution = this.executions.find(e => e.id === validatedData.execution_id)
      if (!execution) {
        throw new ApiError('Ejecución no encontrada', 404)
      }

      const workflow = await this.getWorkflowById(execution.workflow_id)
      if (!workflow) {
        throw new ApiError('Workflow no encontrado', 404)
      }

      const step = workflow.steps.find(s => s.id === validatedData.step_id)
      if (!step) {
        throw new ApiError('Paso no encontrado', 404)
      }

      // Validar dependencias
      const dependenciesMet = step.dependencies.every(depId => 
        execution.steps_completed.includes(depId)
      )
      if (!dependenciesMet) {
        throw new ApiError('Dependencias no cumplidas', 400)
      }

      // Completar paso
      execution.steps_completed.push(validatedData.step_id)
      execution.current_step = Math.max(execution.current_step, step.order + 1)
      execution.progress = (execution.steps_completed.length / workflow.steps.length) * 100

      if (validatedData.notes) {
        execution.notes.push(`${step.title}: ${validatedData.notes}`)
      }

      // Generar resultado de negocio
      const businessResult = this.generateBusinessResult(step, validatedData.results)
      execution.business_results.push(businessResult)

      // Verificar si el workflow está completo
      if (execution.steps_completed.length === workflow.steps.length) {
        execution.status = 'completed'
        execution.completed_at = new Date().toISOString()
      }

      logger.info({ executionId: execution.id, stepId: validatedData.step_id }, 'Paso completado')
      return execution
    } catch (error) {
      logger.error({ error }, 'Error al completar paso')
      throw error
    }
  }

  async pauseExecution(executionId: string): Promise<boolean> {
    const execution = this.executions.find(e => e.id === executionId)
    if (!execution || execution.status !== 'in_progress') return false
    
    execution.status = 'paused'
    logger.info({ executionId }, 'Ejecución pausada')
    return true
  }

  async resumeExecution(executionId: string): Promise<boolean> {
    const execution = this.executions.find(e => e.id === executionId)
    if (!execution || execution.status !== 'paused') return false
    
    execution.status = 'in_progress'
    logger.info({ executionId }, 'Ejecución reanudada')
    return true
  }

  async cancelExecution(executionId: string): Promise<boolean> {
    const execution = this.executions.find(e => e.id === executionId)
    if (!execution || execution.status === 'completed') return false
    
    execution.status = 'cancelled'
    logger.info({ executionId }, 'Ejecución cancelada')
    return true
  }

  // ===== TEMPLATES =====
  async getTemplates(industry?: string): Promise<WorkflowTemplate[]> {
    if (industry) {
      return this.templates.filter(t => t.industry.includes(industry))
    }
    return this.templates
  }

  async createWorkflowFromTemplate(templateId: string, customizations: Partial<GuidedWorkflow>): Promise<GuidedWorkflow> {
    const template = this.templates.find(t => t.id === templateId)
    if (!template) {
      throw new ApiError('Template no encontrado', 404)
    }

    const workflow: GuidedWorkflow = {
      id: `workflow-${Date.now()}`,
      name: customizations.name || template.template.name || template.name,
      description: customizations.description || template.template.description || template.description,
      category: customizations.category || template.template.category || template.category,
      difficulty: customizations.difficulty || template.template.difficulty || 'beginner',
      estimated_time: customizations.estimated_time || template.template.estimated_time || 60,
      steps: customizations.steps || template.template.steps || [],
      prerequisites: customizations.prerequisites || template.template.prerequisites || [],
      business_outcomes: customizations.business_outcomes || template.template.business_outcomes || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active',
    }

    this.workflows.push(workflow)
    logger.info({ workflowId: workflow.id, templateId }, 'Workflow creado desde template')
    return workflow
  }

  // ===== UTILIDADES =====
  private generateBusinessResult(step: WorkflowStep, results: Record<string, unknown>): BusinessResult {
    return {
      step_id: step.id,
      outcome: `Paso "${step.title}" completado exitosamente`,
      business_impact: this.generateBusinessImpact(step, results),
      metrics: this.generateMetrics(step, results),
      recommendations: this.generateRecommendations(step, results),
      next_actions: this.generateNextActions(step, results),
    }
  }

  private generateBusinessImpact(step: WorkflowStep, results: Record<string, unknown>): string {
    const impacts = {
      'data_preparation': 'Datos preparados para análisis de ML',
      'model_training': 'Modelo entrenado y listo para validación',
      'model_evaluation': 'Modelo validado y aprobado para producción',
      'deployment': 'Modelo desplegado y operativo',
      'monitoring': 'Sistema de monitoreo configurado',
    }
    return impacts[step.id as keyof typeof impacts] || 'Progreso significativo en el workflow'
  }

  private generateMetrics(step: WorkflowStep, results: Record<string, unknown>): Record<string, number> {
    return {
      completion_rate: 100,
      quality_score: Math.floor(Math.random() * 20) + 80,
      time_efficiency: Math.floor(Math.random() * 15) + 85,
    }
  }

  private generateRecommendations(step: WorkflowStep, results: Record<string, unknown>): string[] {
    return [
      'Continuar con el siguiente paso del workflow',
      'Documentar aprendizajes para futuras implementaciones',
      'Compartir resultados con el equipo de negocio',
    ]
  }

  private generateNextActions(step: WorkflowStep, results: Record<string, unknown>): string[] {
    return [
      'Proceder al siguiente paso',
      'Revisar documentación relacionada',
      'Preparar presentación de resultados',
    ]
  }

  // ===== INICIALIZACIÓN DE DATOS =====
  private initializeDefaultWorkflows(): void {
    this.workflows = [
      {
        id: 'workflow-ml-implementation',
        name: 'Implementación de ML para Negocios',
        description: 'Guía paso a paso para implementar ML en tu negocio',
        category: 'ml_implementation',
        difficulty: 'beginner',
        estimated_time: 120,
        steps: [
          {
            id: 'step-1',
            order: 1,
            title: 'Definir Objetivo de Negocio',
            description: 'Identificar el problema de negocio que ML puede resolver',
            type: 'information',
            content: {
              instructions: [
                'Identifica un problema específico de tu negocio',
                'Define métricas claras de éxito',
                'Establece el alcance del proyecto',
              ],
              examples: [
                'Reducir churn de clientes en 20%',
                'Mejorar precisión de predicción de ventas',
                'Optimizar precios para maximizar ganancias',
              ],
              tips: [
                'Comienza con problemas simples y medibles',
                'Involucra a stakeholders clave desde el inicio',
                'Define un MVP (Minimum Viable Product)',
              ],
              warnings: [
                'No intentes resolver múltiples problemas a la vez',
                'Asegúrate de tener datos suficientes',
                'Considera el tiempo y recursos necesarios',
              ],
              business_context: 'Un objetivo claro es fundamental para el éxito del proyecto ML',
              expected_outcome: 'Documento con objetivo de negocio definido y métricas de éxito',
            },
            estimated_time: 30,
            required: true,
            dependencies: [],
            help_resources: [
              {
                type: 'template',
                title: 'Template de Objetivo de Negocio',
                url: '/templates/business-objective',
                description: 'Plantilla para definir objetivos de ML',
              },
            ],
          },
          {
            id: 'step-2',
            order: 2,
            title: 'Preparar Datos',
            description: 'Recopilar y preparar datos para el modelo ML',
            type: 'action',
            content: {
              instructions: [
                'Identifica las fuentes de datos necesarias',
                'Limpia y valida los datos',
                'Prepara los datos en formato adecuado',
              ],
              examples: [
                'Datos de clientes, transacciones, comportamiento',
                'Eliminar duplicados y valores faltantes',
                'Convertir datos a formato numérico/categórico',
              ],
              tips: [
                'Usa herramientas de visualización para explorar datos',
                'Documenta todas las transformaciones realizadas',
                'Valida la calidad de los datos con expertos de dominio',
              ],
              warnings: [
                'No uses datos sesgados o incompletos',
                'Respetar privacidad y regulaciones de datos',
                'Hacer backup antes de cualquier transformación',
              ],
              business_context: 'La calidad de los datos determina la calidad del modelo ML',
              expected_outcome: 'Dataset limpio y preparado para entrenamiento',
            },
            estimated_time: 45,
            required: true,
            dependencies: ['step-1'],
            help_resources: [
              {
                type: 'video',
                title: 'Guía de Preparación de Datos',
                url: '/videos/data-preparation',
                description: 'Video tutorial paso a paso',
              },
            ],
          },
          {
            id: 'step-3',
            order: 3,
            title: 'Entrenar Modelo',
            description: 'Entrenar y evaluar el modelo ML',
            type: 'action',
            content: {
              instructions: [
                'Selecciona algoritmos apropiados',
                'Divide datos en entrenamiento y validación',
                'Entrena y evalúa el modelo',
              ],
              examples: [
                'Random Forest, XGBoost, Neural Networks',
                '80% entrenamiento, 20% validación',
                'Métricas: precisión, recall, F1-score',
              ],
              tips: [
                'Comienza con algoritmos simples',
                'Usa validación cruzada para robustez',
                'Compara múltiples algoritmos',
              ],
              warnings: [
                'Evita overfitting (sobreajuste)',
                'No uses datos de test para entrenamiento',
                'Considera el balance entre precisión e interpretabilidad',
              ],
              business_context: 'El modelo debe ser preciso y útil para decisiones de negocio',
              expected_outcome: 'Modelo entrenado con métricas de rendimiento',
            },
            estimated_time: 60,
            required: true,
            dependencies: ['step-2'],
            help_resources: [
              {
                type: 'documentation',
                title: 'Guía de Entrenamiento de Modelos',
                url: '/docs/model-training',
                description: 'Documentación completa',
              },
            ],
          },
          {
            id: 'step-4',
            order: 4,
            title: 'Desplegar y Monitorear',
            description: 'Desplegar el modelo en producción y configurar monitoreo',
            type: 'action',
            content: {
              instructions: [
                'Prepara el modelo para producción',
                'Configura el sistema de despliegue',
                'Implementa monitoreo continuo',
              ],
              examples: [
                'API REST, microservicios, cloud deployment',
                'Docker, Kubernetes, AWS/GCP/Azure',
                'Métricas de rendimiento y drift',
              ],
              tips: [
                'Usa versionado de modelos',
                'Implementa rollback automático',
                'Monitorea métricas de negocio',
              ],
              warnings: [
                'No despliegues sin pruebas exhaustivas',
                'Considera escalabilidad y latencia',
                'Planifica para mantenimiento continuo',
              ],
              business_context: 'El despliegue exitoso permite obtener valor real del modelo ML',
              expected_outcome: 'Modelo operativo en producción con monitoreo',
            },
            estimated_time: 90,
            required: true,
            dependencies: ['step-3'],
            help_resources: [
              {
                type: 'example',
                title: 'Ejemplo de Despliegue',
                url: '/examples/deployment',
                description: 'Código de ejemplo completo',
              },
            ],
          },
        ],
        prerequisites: [
          'Comprensión básica de tu negocio',
          'Acceso a datos relevantes',
          'Recursos técnicos disponibles',
        ],
        business_outcomes: [
          'Modelo ML operativo en producción',
          'Mejoras medibles en métricas de negocio',
          'Proceso establecido para futuros proyectos ML',
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active',
      },
    ]
  }

  private initializeTemplates(): void {
    this.templates = [
      {
        id: 'template-customer-churn',
        name: 'Predicción de Churn de Clientes',
        description: 'Template para predecir qué clientes pueden abandonar',
        category: 'ml_implementation',
        industry: ['retail', 'saas', 'telecom', 'banking'],
        use_cases: ['retención de clientes', 'marketing predictivo', 'optimización de recursos'],
        template: {
          name: 'Predicción de Churn de Clientes',
          description: 'Implementa ML para predecir y prevenir el abandono de clientes',
          category: 'ml_implementation',
          difficulty: 'intermediate',
          estimated_time: 180,
          business_outcomes: [
            'Reducción del 20% en tasa de churn',
            'Mejora del 15% en retención de clientes',
            'ROI positivo en 6 meses',
          ],
        },
      },
      {
        id: 'template-sales-forecasting',
        name: 'Predicción de Ventas',
        description: 'Template para predecir ventas futuras',
        category: 'ml_implementation',
        industry: ['retail', 'manufacturing', 'distribution'],
        use_cases: ['planificación de inventario', 'presupuestación', 'optimización de recursos'],
        template: {
          name: 'Predicción de Ventas',
          description: 'Implementa ML para predecir ventas futuras con precisión',
          category: 'ml_implementation',
          difficulty: 'intermediate',
          estimated_time: 150,
          business_outcomes: [
            'Mejora del 25% en precisión de predicción',
            'Reducción del 30% en costos de inventario',
            'Optimización de recursos de ventas',
          ],
        },
      },
    ]
  }

  // ===== MÉTRICAS =====
  async getWorkflowMetrics(): Promise<Record<string, unknown>> {
    const completedExecutions = this.executions.filter(e => e.status === 'completed')
    const inProgressExecutions = this.executions.filter(e => e.status === 'in_progress')
    
    return {
      total_workflows: this.workflows.length,
      total_executions: this.executions.length,
      completed_executions: completedExecutions.length,
      in_progress_executions: inProgressExecutions.length,
      completion_rate: this.executions.length > 0 
        ? completedExecutions.length / this.executions.length 
        : 0,
      average_completion_time: completedExecutions.reduce((sum, exec) => {
        if (exec.completed_at) {
          const start = new Date(exec.started_at).getTime()
          const end = new Date(exec.completed_at).getTime()
          return sum + (end - start)
        }
        return sum
      }, 0) / Math.max(completedExecutions.length, 1),
      workflows_by_category: this.workflows.reduce((acc, w) => {
        acc[w.category] = (acc[w.category] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      workflows_by_difficulty: this.workflows.reduce((acc, w) => {
        acc[w.difficulty] = (acc[w.difficulty] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      total_templates: this.templates.length,
    }
  }

  async getTemplateById(id: string): Promise<WorkflowTemplate | null> {
    return this.templates.find(t => t.id === id) || null
  }

  // ===== MISSING METHODS =====
  async validateWorkflow(workflowId: string, validationRules?: any): Promise<any> {
    const workflow = this.workflows.find(w => w.id === workflowId)
    if (!workflow) {
      throw new ApiError('Workflow no encontrado', 404)
    }

    // Mock validation logic
    const errors: any[] = []
    const warnings: any[] = []

    // Validate workflow structure
    if (!workflow.steps || workflow.steps.length === 0) {
      errors.push({
        type: 'structure',
        message: 'Workflow must have at least one step',
        severity: 'error'
      })
    }

    // Validate step dependencies
    workflow.steps.forEach(step => {
      step.dependencies.forEach(depId => {
        const dependencyExists = workflow.steps.some(s => s.id === depId)
        if (!dependencyExists) {
          errors.push({
            type: 'dependency',
            message: `Step ${step.id} depends on non-existent step ${depId}`,
            severity: 'error'
          })
        }
      })
    })

    // Validate business outcomes
    if (!workflow.business_outcomes || workflow.business_outcomes.length === 0) {
      warnings.push({
        type: 'business_logic',
        message: 'Workflow should define clear business outcomes',
        severity: 'warning'
      })
    }

    const validation = {
      workflow_id: workflowId,
      is_valid: errors.length === 0,
      errors,
      warnings,
      validated_at: new Date().toISOString(),
      validation_rules: validationRules || 'default'
    }

    logger.info({ workflowId, isValid: validation.is_valid, errorsCount: errors.length }, 'Workflow validation completed')
    return validation
  }

  async getValidationErrors(workflowId: string): Promise<any[]> {
    const validation = await this.validateWorkflow(workflowId)
    return [...validation.errors, ...validation.warnings]
  }

  async getWorkflowStatus(workflowId: string): Promise<{ status: string; executions: number; latest_execution?: WorkflowExecution }> {
    const workflow = this.workflows.find(w => w.id === workflowId)
    if (!workflow) {
      throw new ApiError('Workflow no encontrado', 404)
    }

    const workflowExecutions = this.executions.filter(e => e.workflow_id === workflowId)
    const latestExecution = workflowExecutions.sort((a, b) => 
      new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
    )[0]

    return {
      status: workflow.status,
      executions: workflowExecutions.length,
      latest_execution: latestExecution
    }
  }
}

export const guidedWorkflowService = new GuidedWorkflowService() 