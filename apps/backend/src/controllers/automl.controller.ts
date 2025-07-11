import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import { automlService } from '../services/automl.service.js'
import logger from '../services/logger.service.js'
import { logAction } from '../services/logger.service.js'

// Schemas de validación para endpoints
const uploadDatasetSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido').max(100),
  description: z.string().max(500),
  business_context: z.string().min(1, 'Contexto de negocio es requerido'),
  target_column: z.string().min(1, 'Columna objetivo es requerida'),
  problem_type: z.enum(['classification', 'regression', 'clustering']),
})

const createAutoMLJobSchema = z.object({
  dataset_id: z.string().min(1, 'Dataset ID es requerido'),
  name: z.string().min(1, 'Nombre es requerido').max(100),
  description: z.string().max(500),
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

export class AutoMLController {
  // ===== GESTIÓN DE DATASETS =====
  static async uploadDataset(req: any, res: any) {
    try {
      const validatedData = uploadDatasetSchema.parse(req.body)
      
      const dataset = await automlService.uploadDataset(validatedData)
      
      logAction('automl_dataset_uploaded', req.user?.id || 'anonymous', {
        dataset_id: dataset.id,
        problem_type: dataset.problem_type,
        business_context: dataset.business_context,
      })

      res.status(201).json({
        success: true,
        message: 'Dataset subido exitosamente. Procesando...',
        data: dataset,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al subir dataset')
      
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

  static async getDatasets(req: any, res: any) {
    try {
      const datasets = await automlService.getDatasets()
      
      logAction('automl_datasets_retrieved', req.user?.id || 'anonymous', {
        count: datasets.length,
      })

      res.status(200).json({
        success: true,
        data: datasets,
        count: datasets.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener datasets')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getDatasetById(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de dataset es requerido',
        })
      }

      const dataset = await automlService.getDatasetById(id)
      
      if (!dataset) {
        return res.status(404).json({
          success: false,
          error: 'Dataset no encontrado',
        })
      }

      logAction('automl_dataset_retrieved', req.user?.id || 'anonymous', {
        dataset_id: id,
      })

      res.status(200).json({
        success: true,
        data: dataset,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener dataset')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== GESTIÓN DE JOBS =====
  static async createAutoMLJob(req: any, res: any) {
    try {
      const validatedData = createAutoMLJobSchema.parse(req.body)
      
      const job = await automlService.createAutoMLJob(validatedData)
      
      logAction('automl_job_created', req.user?.id || 'anonymous', {
        job_id: job.id,
        dataset_id: job.dataset_id,
        business_objective: job.business_objective,
      })

      res.status(201).json({
        success: true,
        message: 'Job AutoML creado y iniciado. Procesando automáticamente...',
        data: job,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al crear job AutoML')
      
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

  static async getJobs(req: any, res: any) {
    try {
      const jobs = await automlService.getJobs()
      
      logAction('automl_jobs_retrieved', req.user?.id || 'anonymous', {
        count: jobs.length,
      })

      res.status(200).json({
        success: true,
        data: jobs,
        count: jobs.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener jobs')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getJobById(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de job es requerido',
        })
      }

      const job = await automlService.getJobById(id)
      
      if (!job) {
        return res.status(404).json({
          success: false,
          error: 'Job no encontrado',
        })
      }

      logAction('automl_job_retrieved', req.user?.id || 'anonymous', {
        job_id: id,
        status: job.status,
      })

      res.status(200).json({
        success: true,
        data: job,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener job')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async cancelJob(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de job es requerido',
        })
      }

      const cancelled = await automlService.cancelJob(id)
      
      if (!cancelled) {
        return res.status(404).json({
          success: false,
          error: 'Job no encontrado o no se puede cancelar',
        })
      }

      logAction('automl_job_cancelled', req.user?.id || 'anonymous', {
        job_id: id,
      })

      res.status(200).json({
        success: true,
        message: 'Job cancelado exitosamente',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al cancelar job')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== MÉTRICAS DE NEGOCIO =====
  static async getBusinessMetrics(req: any, res: any) {
    try {
      const metrics = await automlService.getBusinessMetrics()
      
      logAction('automl_business_metrics_retrieved', req.user?.id || 'anonymous', {
        total_jobs: metrics.total_jobs,
        completed_jobs: metrics.completed_jobs,
      })

      res.status(200).json({
        success: true,
        data: metrics,
        message: 'Métricas de negocio de AutoML',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener métricas de negocio')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== ENDPOINTS DE FLUJO GUIADO =====
  static async getQuickStartGuide(req: any, res: any) {
    try {
      const guide = {
        title: 'Guía de Inicio Rápido - AutoML',
        description: 'Implementa ML en tu negocio en 4 pasos simples',
        steps: [
          {
            step: 1,
            title: 'Sube tus Datos',
            description: 'Sube tu archivo CSV o Excel con los datos de tu negocio',
            action: 'POST /api/automl/datasets',
            example: {
              name: 'Datos de Clientes',
              description: 'Información de clientes para predicción de churn',
              business_context: 'Queremos predecir qué clientes pueden abandonar',
              target_column: 'churn',
              problem_type: 'classification',
            },
          },
          {
            step: 2,
            title: 'Define tu Objetivo',
            description: 'Especifica qué quieres lograr con ML',
            action: 'POST /api/automl/jobs',
            example: {
              name: 'Predicción de Churn',
              description: 'Modelo para predecir abandono de clientes',
              business_objective: 'Reducir churn en 20% identificando clientes en riesgo',
              constraints: {
                max_training_time: 60,
                max_models: 10,
                target_accuracy: 0.85,
                interpretability_required: true,
                deployment_ready: true,
                business_metrics: ['churn_rate', 'customer_lifetime_value'],
              },
            },
          },
          {
            step: 3,
            title: 'Espera los Resultados',
            description: 'AutoML procesa automáticamente y encuentra el mejor modelo',
            action: 'GET /api/automl/jobs/{id}',
            note: 'El proceso toma entre 30-120 minutos dependiendo de la complejidad',
          },
          {
            step: 4,
            title: 'Implementa y Monitorea',
            description: 'Recibe el modelo listo para producción con reportes ejecutivos',
            action: 'GET /api/automl/jobs/{id}/results',
            outcomes: [
              'Modelo optimizado para tu negocio',
              'Reporte ejecutivo con insights',
              'Recomendaciones de implementación',
              'Métricas de rendimiento',
            ],
          },
        ],
        tips: [
          'Comienza con problemas simples y medibles',
          'Asegúrate de que tus datos sean de buena calidad',
          'Define objetivos de negocio claros',
          'Revisa los insights automáticos generados',
        ],
        estimated_time: '2-4 horas total',
        business_value: 'ROI positivo en 30-90 días',
      }

      logAction('automl_quickstart_guide_accessed', req.user?.id || 'anonymous')

      res.status(200).json({
        success: true,
        data: guide,
        message: 'Guía de inicio rápido para AutoML',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener guía de inicio rápido')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getUseCaseTemplates(req: any, res: any) {
    try {
      const templates = [
        {
          id: 'customer-churn',
          name: 'Predicción de Churn de Clientes',
          description: 'Identifica qué clientes pueden abandonar tu servicio',
          business_value: 'Reducción del 20-30% en tasa de churn',
          estimated_roi: '340% en 6 meses',
          data_requirements: [
            'Datos demográficos de clientes',
            'Historial de transacciones',
            'Interacciones con el servicio',
            'Métricas de uso del producto',
          ],
          example_dataset: {
            columns: ['customer_id', 'age', 'tenure', 'monthly_charges', 'total_charges', 'churn'],
            sample_size: '1000+ registros',
            time_period: 'Últimos 12 meses',
          },
        },
        {
          id: 'sales-forecasting',
          name: 'Predicción de Ventas',
          description: 'Predice ventas futuras para optimizar inventario y recursos',
          business_value: 'Mejora del 25% en precisión de predicción',
          estimated_roi: '280% en 4 meses',
          data_requirements: [
            'Historial de ventas',
            'Datos de productos',
            'Información de campañas',
            'Factores estacionales',
          ],
          example_dataset: {
            columns: ['date', 'product_id', 'quantity', 'revenue', 'campaign_id'],
            sample_size: '5000+ registros',
            time_period: 'Últimos 24 meses',
          },
        },
        {
          id: 'customer-segmentation',
          name: 'Segmentación de Clientes',
          description: 'Agrupa clientes por comportamiento para marketing personalizado',
          business_value: 'Mejora del 40% en efectividad de campañas',
          estimated_roi: '420% en 3 meses',
          data_requirements: [
            'Datos demográficos',
            'Comportamiento de compra',
            'Preferencias de productos',
            'Interacciones digitales',
          ],
          example_dataset: {
            columns: ['customer_id', 'age', 'income', 'purchase_frequency', 'avg_order_value'],
            sample_size: '2000+ registros',
            time_period: 'Últimos 6 meses',
          },
        },
        {
          id: 'fraud-detection',
          name: 'Detección de Fraude',
          description: 'Identifica transacciones fraudulentas en tiempo real',
          business_value: 'Reducción del 60% en pérdidas por fraude',
          estimated_roi: '500% en 2 meses',
          data_requirements: [
            'Datos de transacciones',
            'Información del dispositivo',
            'Comportamiento del usuario',
            'Historial de fraudes conocidos',
          ],
          example_dataset: {
            columns: ['transaction_id', 'amount', 'location', 'device_type', 'is_fraud'],
            sample_size: '10000+ registros',
            time_period: 'Últimos 3 meses',
          },
        },
      ]

      logAction('automl_usecase_templates_accessed', req.user?.id || 'anonymous', {
        count: templates.length,
      })

      res.status(200).json({
        success: true,
        data: templates,
        message: 'Templates de casos de uso para AutoML',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener templates de casos de uso')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== ENDPOINTS DE SALUD Y ESTADO =====
  static async getAutoMLStatus(req: any, res: any) {
    try {
      const status = {
        service: 'AutoML',
        status: 'operational',
        version: '1.0.0',
        features: {
          automated_training: true,
          model_selection: true,
          hyperparameter_optimization: true,
          business_insights: true,
          deployment_ready: true,
        },
        capabilities: [
          'Entrenamiento automático de modelos',
          'Selección automática del mejor algoritmo',
          'Optimización de hiperparámetros',
          'Generación de insights de negocio',
          'Preparación para despliegue',
        ],
        limitations: [
          'Requiere datos de calidad mínima',
          'Tiempo de entrenamiento variable',
          'Algoritmos limitados a los más efectivos',
        ],
        last_updated: new Date().toISOString(),
      }

      res.status(200).json({
        success: true,
        data: status,
        message: 'Estado del servicio AutoML',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener estado de AutoML')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }
} 