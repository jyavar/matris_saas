import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import logger from './logger.service.js'

// Tipos estrictos para AutoML
export interface AutoMLDataset {
  id: string
  name: string
  description: string
  columns: DatasetColumn[]
  row_count: number
  file_size: number
  uploaded_at: string
  status: 'uploading' | 'processing' | 'ready' | 'error'
  business_context: string
  target_column: string
  problem_type: 'classification' | 'regression' | 'clustering'
}

export interface DatasetColumn {
  name: string
  type: 'numeric' | 'categorical' | 'text' | 'datetime' | 'boolean'
  missing_percentage: number
  unique_values: number
  business_description: string
  is_target: boolean
  is_feature: boolean
}

export interface AutoMLJob {
  id: string
  dataset_id: string
  name: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  progress: number
  created_at: string
  started_at?: string
  completed_at?: string
  estimated_completion?: string
  business_objective: string
  constraints: AutoMLConstraints
  results?: AutoMLResults
}

export interface AutoMLConstraints {
  max_training_time: number // minutos
  max_models: number
  target_accuracy: number
  interpretability_required: boolean
  deployment_ready: boolean
  business_metrics: string[]
}

export interface AutoMLResults {
  best_model: ModelInfo
  all_models: ModelInfo[]
  feature_importance: FeatureImportance[]
  business_insights: BusinessInsight[]
  deployment_ready: boolean
  next_steps: string[]
  executive_summary: string
}

export interface ModelInfo {
  id: string
  name: string
  algorithm: string
  accuracy: number
  business_accuracy: number // Métricas específicas del negocio
  training_time: number
  prediction_time: number
  interpretability_score: number
  deployment_score: number
  business_benefits: string[]
  limitations: string[]
}

export interface FeatureImportance {
  feature: string
  importance: number
  business_impact: string
  recommendation: string
}

export interface BusinessInsight {
  type: 'trend' | 'anomaly' | 'opportunity' | 'risk'
  title: string
  description: string
  confidence: number
  business_value: string
  action_items: string[]
}

// Schemas de validación
const createAutoMLJobSchema = z.object({
  dataset_id: z.string().min(1, 'Dataset ID es requerido'),
  name: z.string().min(1, 'Nombre es requerido').max(100, 'Nombre muy largo'),
  description: z.string().max(500, 'Descripción muy larga'),
  business_objective: z.string().min(1, 'Objetivo de negocio es requerido'),
  constraints: z.object({
    max_training_time: z.number().min(5).max(1440, 'Máximo 24 horas'),
    max_models: z.number().min(1).max(50, 'Máximo 50 modelos'),
    target_accuracy: z.number().min(0.5).max(1.0),
    interpretability_required: z.boolean(),
    deployment_ready: z.boolean(),
    business_metrics: z.array(z.string()).max(10),
  }),
})

const uploadDatasetSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().max(500),
  business_context: z.string().min(1, 'Contexto de negocio es requerido'),
  target_column: z.string().min(1, 'Columna objetivo es requerida'),
  problem_type: z.enum(['classification', 'regression', 'clustering']),
})

export class AutoMLService {
  private datasets: AutoMLDataset[] = []
  private jobs: AutoMLJob[] = []
  private models: ModelInfo[] = []

  // ===== GESTIÓN DE DATASETS =====
  async uploadDataset(data: z.infer<typeof uploadDatasetSchema>): Promise<AutoMLDataset> {
    try {
      const validatedData = uploadDatasetSchema.parse(data)
      
      // Simular procesamiento de dataset
      const dataset: AutoMLDataset = {
        id: `dataset-${Date.now()}`,
        name: validatedData.name,
        description: validatedData.description,
        columns: this.generateSampleColumns(validatedData.target_column),
        row_count: Math.floor(Math.random() * 10000) + 1000,
        file_size: Math.floor(Math.random() * 50) + 5, // MB
        uploaded_at: new Date().toISOString(),
        status: 'processing',
        business_context: validatedData.business_context,
        target_column: validatedData.target_column,
        problem_type: validatedData.problem_type,
      }

      this.datasets.push(dataset)
      
      // Simular procesamiento asíncrono
      setTimeout(() => {
        dataset.status = 'ready'
        logger.info({ datasetId: dataset.id }, 'Dataset procesado exitosamente')
      }, 2000)

      logger.info({ datasetId: dataset.id }, 'Dataset subido para procesamiento')
      return dataset
    } catch (error) {
      logger.error({ error }, 'Error al subir dataset')
      throw error
    }
  }

  async getDatasets(): Promise<AutoMLDataset[]> {
    return this.datasets
  }

  async getDatasetById(id: string): Promise<AutoMLDataset | null> {
    return this.datasets.find(d => d.id === id) || null
  }

  // ===== GESTIÓN DE JOBS =====
  async createAutoMLJob(data: z.infer<typeof createAutoMLJobSchema>): Promise<AutoMLJob> {
    try {
      const validatedData = createAutoMLJobSchema.parse(data)
      
      // Verificar que el dataset existe y está listo
      const dataset = await this.getDatasetById(validatedData.dataset_id)
      if (!dataset) {
        throw new ApiError('Dataset no encontrado', 404)
      }
      if (dataset.status !== 'ready') {
        throw new ApiError('Dataset no está listo para procesamiento', 400)
      }

      const job: AutoMLJob = {
        id: `job-${Date.now()}`,
        dataset_id: validatedData.dataset_id,
        name: validatedData.name,
        description: validatedData.description,
        status: 'pending',
        progress: 0,
        created_at: new Date().toISOString(),
        business_objective: validatedData.business_objective,
        constraints: validatedData.constraints,
      }

      this.jobs.push(job)
      
      // Iniciar procesamiento asíncrono
      this.processAutoMLJob(job.id).catch(error => {
        logger.error({ error, jobId: job.id }, 'Error en procesamiento AutoML')
      })

      logger.info({ jobId: job.id }, 'Job AutoML creado y iniciado')
      return job
    } catch (error) {
      logger.error({ error }, 'Error al crear job AutoML')
      throw error
    }
  }

  async getJobs(): Promise<AutoMLJob[]> {
    return this.jobs
  }

  async getJobById(id: string): Promise<AutoMLJob | null> {
    return this.jobs.find(j => j.id === id) || null
  }

  async cancelJob(id: string): Promise<boolean> {
    const job = this.jobs.find(j => j.id === id)
    if (!job) return false
    
    if (job.status === 'running' || job.status === 'pending') {
      job.status = 'cancelled'
      logger.info({ jobId: id }, 'Job AutoML cancelado')
      return true
    }
    return false
  }

  // ===== PROCESAMIENTO AUTOML =====
  private async processAutoMLJob(jobId: string): Promise<void> {
    const job = this.jobs.find(j => j.id === jobId)
    if (!job) return

    try {
      job.status = 'running'
      job.started_at = new Date().toISOString()
      
      // Simular progreso del job
      for (let progress = 0; progress <= 100; progress += 10) {
        job.progress = progress
        await this.delay(1000) // 1 segundo por paso
        
        if (job.status === 'cancelled') return
      }

      // Generar resultados
      job.results = this.generateAutoMLResults(job)
      job.status = 'completed'
      job.completed_at = new Date().toISOString()
      
      logger.info({ jobId }, 'Job AutoML completado exitosamente')
    } catch (error) {
      job.status = 'failed'
      logger.error({ error, jobId }, 'Error en procesamiento AutoML')
    }
  }

  // ===== GENERACIÓN DE RESULTADOS =====
  private generateAutoMLResults(job: AutoMLJob): AutoMLResults {
    const bestModel: ModelInfo = {
      id: `model-${Date.now()}`,
      name: 'Random Forest Optimizado',
      algorithm: 'Random Forest',
      accuracy: 0.89,
      business_accuracy: 0.92,
      training_time: 45,
      prediction_time: 0.1,
      interpretability_score: 0.85,
      deployment_score: 0.95,
      business_benefits: [
        'Reducción del 23% en falsos positivos',
        'Mejora del 15% en precisión de predicción',
        'Tiempo de respuesta < 100ms',
      ],
      limitations: [
        'Requiere al menos 1000 muestras para entrenamiento',
        'Sensible a outliers extremos',
      ],
    }

    const allModels: ModelInfo[] = [
      bestModel,
      {
        id: `model-${Date.now()}-2`,
        name: 'XGBoost',
        algorithm: 'XGBoost',
        accuracy: 0.87,
        business_accuracy: 0.90,
        training_time: 30,
        prediction_time: 0.05,
        interpretability_score: 0.70,
        deployment_score: 0.90,
        business_benefits: ['Excelente rendimiento en datasets grandes'],
        limitations: ['Menos interpretable que Random Forest'],
      },
    ]

    const featureImportance: FeatureImportance[] = [
      {
        feature: 'edad_cliente',
        importance: 0.25,
        business_impact: 'Factor más importante para predicción',
        recommendation: 'Incluir en todas las campañas de marketing',
      },
      {
        feature: 'historial_compras',
        importance: 0.20,
        business_impact: 'Segundo factor más relevante',
        recommendation: 'Optimizar estrategias de retención',
      },
    ]

    const businessInsights: BusinessInsight[] = [
      {
        type: 'opportunity',
        title: 'Segmento de alto valor identificado',
        description: 'Clientes entre 25-35 años con historial de compras > $1000',
        confidence: 0.89,
        business_value: 'Potencial de $50K en ventas adicionales',
        action_items: [
          'Crear campaña específica para este segmento',
          'Ajustar precios para maximizar conversión',
        ],
      },
      {
        type: 'trend',
        title: 'Decrecimiento en conversión de nuevos clientes',
        description: 'Tendencia negativa del 12% en últimos 3 meses',
        confidence: 0.78,
        business_value: 'Riesgo de pérdida de $30K mensuales',
        action_items: [
          'Revisar proceso de onboarding',
          'Optimizar landing pages',
        ],
      },
    ]

    return {
      best_model: bestModel,
      all_models: allModels,
      feature_importance: featureImportance,
      business_insights: businessInsights,
      deployment_ready: true,
      next_steps: [
        'Revisar y aprobar modelo para producción',
        'Configurar monitoreo de rendimiento',
        'Entrenar equipo en interpretación de resultados',
      ],
      executive_summary: `El modelo AutoML ha identificado oportunidades de mejora del 23% en precisión de predicción, con un potencial de $50K en ventas adicionales. El modelo está listo para despliegue inmediato.`,
    }
  }

  // ===== UTILIDADES =====
  private generateSampleColumns(targetColumn: string): DatasetColumn[] {
    return [
      {
        name: targetColumn,
        type: 'categorical',
        missing_percentage: 0,
        unique_values: 2,
        business_description: 'Variable objetivo: resultado de la campaña',
        is_target: true,
        is_feature: false,
      },
      {
        name: 'edad_cliente',
        type: 'numeric',
        missing_percentage: 2.5,
        unique_values: 45,
        business_description: 'Edad del cliente en años',
        is_target: false,
        is_feature: true,
      },
      {
        name: 'historial_compras',
        type: 'numeric',
        missing_percentage: 0,
        unique_values: 150,
        business_description: 'Valor total de compras previas',
        is_target: false,
        is_feature: true,
      },
    ]
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // ===== MÉTRICAS DE NEGOCIO =====
  async getBusinessMetrics(): Promise<Record<string, unknown>> {
    const completedJobs = this.jobs.filter(j => j.status === 'completed')
    const totalAccuracy = completedJobs.reduce((sum, job) => {
      return sum + (job.results?.best_model.business_accuracy || 0)
    }, 0)
    const avgAccuracy = completedJobs.length > 0 ? totalAccuracy / completedJobs.length : 0

    return {
      total_jobs: this.jobs.length,
      completed_jobs: completedJobs.length,
      average_business_accuracy: avgAccuracy,
      total_datasets: this.datasets.length,
      ready_datasets: this.datasets.filter(d => d.status === 'ready').length,
      deployment_ready_models: completedJobs.filter(j => j.results?.deployment_ready).length,
      average_training_time: completedJobs.reduce((sum, job) => {
        return sum + (job.results?.best_model.training_time || 0)
      }, 0) / Math.max(completedJobs.length, 1),
      business_insights_generated: completedJobs.reduce((sum, job) => {
        return sum + (job.results?.business_insights.length || 0)
      }, 0),
    }
  }
}

export const automlService = new AutoMLService() 