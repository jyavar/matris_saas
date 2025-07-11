import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import { explainabilityService } from '../services/explainability.service.js'
import logger from '../services/logger.service.js'
import { logAction } from '../services/logger.service.js'

// Schemas de validación para endpoints
const createExplainabilityRequestSchema = z.object({
  model_id: z.string().min(1, 'Model ID es requerido'),
  dataset_id: z.string().min(1, 'Dataset ID es requerido'),
  user_id: z.string().min(1, 'User ID es requerido'),
  request_type: z.enum(['feature_importance', 'prediction_explanation', 'model_comparison', 'business_impact']),
  business_context: z.string().min(1, 'Contexto de negocio es requerido'),
  audience: z.enum(['executive', 'manager', 'analyst', 'stakeholder']),
})

const generatePredictionExplanationSchema = z.object({
  model_id: z.string().min(1, 'Model ID es requerido'),
  input_data: z.record(z.unknown()),
  business_context: z.string().min(1, 'Contexto de negocio es requerido'),
  audience: z.enum(['executive', 'manager', 'analyst', 'stakeholder']),
})

export class ExplainabilityController {
  // ===== GESTIÓN DE REQUESTS =====
  static async createExplainabilityRequest(req: any, res: any) {
    try {
      const validatedData = createExplainabilityRequestSchema.parse(req.body)
      
      const request = await explainabilityService.createExplainabilityRequest(validatedData)
      
      logAction('explainability_request_created', req.user?.id || 'anonymous', {
        request_id: request.id,
        request_type: request.request_type,
        audience: request.audience,
      })

      res.status(201).json({
        success: true,
        message: 'Request de explainability creado. Procesando...',
        data: request,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al crear request de explainability')
      
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

  static async getRequests(req: any, res: any) {
    try {
      const requests = await explainabilityService.getRequests()
      
      logAction('explainability_requests_retrieved', req.user?.id || 'anonymous', {
        count: requests.length,
      })

      res.status(200).json({
        success: true,
        data: requests,
        count: requests.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener requests de explainability')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getRequestById(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de request es requerido',
        })
      }

      const request = await explainabilityService.getRequestById(id)
      
      if (!request) {
        return res.status(404).json({
          success: false,
          error: 'Request no encontrado',
        })
      }

      logAction('explainability_request_retrieved', req.user?.id || 'anonymous', {
        request_id: id,
        status: request.status,
      })

      res.status(200).json({
        success: true,
        data: request,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener request de explainability')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== EXPLICACIÓN DE PREDICCIONES =====
  static async generatePredictionExplanation(req: any, res: any) {
    try {
      const validatedData = generatePredictionExplanationSchema.parse(req.body)
      
      const explanation = await explainabilityService.generatePredictionExplanation(validatedData)
      
      logAction('prediction_explanation_generated', req.user?.id || 'anonymous', {
        model_id: validatedData.model_id,
        audience: validatedData.audience,
        confidence: explanation.confidence,
      })

      res.status(200).json({
        success: true,
        data: explanation,
        message: 'Explicación de predicción generada exitosamente',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al generar explicación de predicción')
      
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

  // ===== REPORTES EJECUTIVOS =====
  static async generateExecutiveReport(req: any, res: any) {
    try {
      const { model_id } = req.params
      const { business_context } = req.query
      
      if (!model_id) {
        return res.status(400).json({
          success: false,
          error: 'Model ID es requerido',
        })
      }

      const report = await explainabilityService.generateExecutiveReport(
        model_id, 
        business_context || 'Análisis de impacto de negocio'
      )
      
      logAction('executive_report_generated', req.user?.id || 'anonymous', {
        model_id,
        business_context,
        insights_count: report.business_insights.length,
      })

      res.status(200).json({
        success: true,
        data: report,
        message: 'Reporte ejecutivo generado exitosamente',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al generar reporte ejecutivo')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== ENDPOINTS DE FLUJO GUIADO =====
  static async getExplainabilityGuide(req: any, res: any) {
    try {
      const guide = {
        title: 'Guía de Explainability para Negocios',
        description: 'Entiende cómo y por qué tus modelos ML toman decisiones',
        sections: [
          {
            title: '¿Qué es Explainability?',
            content: 'Explainability te ayuda a entender por qué tu modelo ML hace ciertas predicciones, facilitando la confianza y adopción en tu organización.',
            business_value: 'Mayor confianza en decisiones basadas en ML',
          },
          {
            title: 'Tipos de Explicaciones',
            content: [
              {
                type: 'feature_importance',
                name: 'Importancia de Características',
                description: 'Identifica qué factores más influyen en las predicciones',
                business_use: 'Optimizar estrategias de marketing y producto',
              },
              {
                type: 'prediction_explanation',
                name: 'Explicación de Predicciones',
                description: 'Explica por qué se hizo una predicción específica',
                business_use: 'Justificar decisiones a stakeholders',
              },
              {
                type: 'model_comparison',
                name: 'Comparación de Modelos',
                description: 'Compara diferentes modelos para elegir el mejor',
                business_use: 'Seleccionar la mejor solución para tu negocio',
              },
              {
                type: 'business_impact',
                name: 'Impacto de Negocio',
                description: 'Analiza el impacto financiero y operacional',
                business_use: 'ROI y planificación estratégica',
              },
            ],
          },
          {
            title: 'Audiencias y Niveles de Detalle',
            content: [
              {
                audience: 'executive',
                description: 'Resumen ejecutivo con métricas de alto nivel',
                focus: 'ROI, impacto estratégico, recomendaciones',
              },
              {
                audience: 'manager',
                description: 'Análisis detallado con insights accionables',
                focus: 'Métricas operacionales, optimizaciones',
              },
              {
                audience: 'analyst',
                description: 'Análisis técnico completo con metodología',
                focus: 'Detalles técnicos, validación, metodología',
              },
              {
                audience: 'stakeholder',
                description: 'Comunicación clara para no técnicos',
                focus: 'Beneficios, riesgos, próximos pasos',
              },
            ],
          },
        ],
        quick_start: {
          title: 'Inicio Rápido',
          steps: [
            {
              step: 1,
              action: 'POST /api/explainability/requests',
              description: 'Crea un request de explainability',
              example: {
                model_id: 'your-model-id',
                dataset_id: 'your-dataset-id',
                request_type: 'business_impact',
                audience: 'executive',
                business_context: 'Evaluar impacto de modelo de predicción de ventas',
              },
            },
            {
              step: 2,
              action: 'GET /api/explainability/requests/{id}',
              description: 'Monitorea el progreso',
            },
            {
              step: 3,
              action: 'GET /api/explainability/executive-report/{model_id}',
              description: 'Obtén reporte ejecutivo',
            },
          ],
        },
      }

      logAction('explainability_guide_accessed', req.user?.id || 'anonymous')

      res.status(200).json({
        success: true,
        data: guide,
        message: 'Guía de explainability para negocios',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener guía de explainability')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getExplanationTemplates(req: any, res: any) {
    try {
      const templates = [
        {
          id: 'executive-summary',
          name: 'Resumen Ejecutivo',
          description: 'Explicación de alto nivel para ejecutivos',
          audience: 'executive',
          content: {
            focus: 'ROI, impacto estratégico, recomendaciones',
            format: 'Presentación ejecutiva',
            duration: '5-10 minutos de lectura',
            key_sections: [
              'Resumen ejecutivo',
              'Impacto financiero',
              'Recomendaciones estratégicas',
              'Próximos pasos',
            ],
          },
          use_cases: [
            'Presentación a CEO/CFO',
            'Revisión de presupuesto',
            'Planificación estratégica',
            'Comunicación a stakeholders',
          ],
        },
        {
          id: 'business-impact',
          name: 'Análisis de Impacto de Negocio',
          description: 'Análisis detallado del impacto en el negocio',
          audience: 'manager',
          content: {
            focus: 'Métricas operacionales, optimizaciones',
            format: 'Reporte detallado',
            duration: '15-20 minutos de lectura',
            key_sections: [
              'Análisis de métricas clave',
              'Optimizaciones identificadas',
              'Plan de implementación',
              'Métricas de seguimiento',
            ],
          },
          use_cases: [
            'Optimización de procesos',
            'Planificación operacional',
            'Gestión de equipos',
            'Mejora continua',
          ],
        },
        {
          id: 'technical-analysis',
          name: 'Análisis Técnico',
          description: 'Análisis técnico completo para especialistas',
          audience: 'analyst',
          content: {
            focus: 'Detalles técnicos, validación, metodología',
            format: 'Documento técnico',
            duration: '30-45 minutos de lectura',
            key_sections: [
              'Metodología detallada',
              'Validación de resultados',
              'Análisis de robustez',
              'Recomendaciones técnicas',
            ],
          },
          use_cases: [
            'Validación de modelos',
            'Investigación y desarrollo',
            'Auditoría técnica',
            'Mejora de algoritmos',
          ],
        },
        {
          id: 'stakeholder-communication',
          name: 'Comunicación a Stakeholders',
          description: 'Comunicación clara para audiencias no técnicas',
          audience: 'stakeholder',
          content: {
            focus: 'Beneficios, riesgos, próximos pasos',
            format: 'Comunicación clara',
            duration: '10-15 minutos de lectura',
            key_sections: [
              'Beneficios del modelo',
              'Riesgos y mitigaciones',
              'Impacto en el negocio',
              'Próximos pasos',
            ],
          },
          use_cases: [
            'Comunicación a clientes',
            'Presentación a inversores',
            'Comunicación interna',
            'Capacitación de equipos',
          ],
        },
      ]

      logAction('explainability_templates_accessed', req.user?.id || 'anonymous', {
        count: templates.length,
      })

      res.status(200).json({
        success: true,
        data: templates,
        message: 'Templates de explainability disponibles',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener templates de explainability')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== ENDPOINTS DE EJEMPLOS =====
  static async getExplanationExamples(req: any, res: any) {
    try {
      const examples = [
        {
          id: 'customer-churn-explanation',
          title: 'Explicación de Predicción de Churn',
          description: 'Ejemplo de cómo explicar por qué un cliente puede abandonar',
          scenario: {
            customer_id: 'CUST-001',
            prediction: 'Alta probabilidad de churn (87%)',
            business_context: 'Cliente con 2 años de antigüedad, valor mensual $50',
          },
          explanation: {
            key_factors: [
              {
                factor: 'Reducción en uso del servicio',
                contribution: 0.35,
                business_meaning: 'El cliente ha reducido su actividad en un 60% en los últimos 3 meses',
              },
              {
                factor: 'Aumento en tickets de soporte',
                contribution: 0.28,
                business_meaning: 'El cliente ha abierto 5 tickets en el último mes vs 1 promedio',
              },
              {
                factor: 'No ha respondido a campañas de retención',
                contribution: -0.15,
                business_meaning: 'El cliente no ha interactuado con emails de retención',
              },
            ],
            business_insights: [
              'El cliente muestra signos claros de insatisfacción',
              'Hay oportunidad de intervención proactiva',
              'Se recomienda contacto directo del equipo de retención',
            ],
            recommendations: [
              'Contactar al cliente directamente',
              'Ofrecer descuento especial',
              'Asignar representante de cuenta dedicado',
            ],
          },
        },
        {
          id: 'sales-forecast-explanation',
          title: 'Explicación de Predicción de Ventas',
          description: 'Ejemplo de cómo explicar una predicción de ventas',
          scenario: {
            period: 'Q2 2024',
            prediction: 'Ventas de $1.2M (15% crecimiento)',
            business_context: 'Predicción basada en datos históricos y tendencias',
          },
          explanation: {
            key_factors: [
              {
                factor: 'Crecimiento estacional',
                contribution: 0.40,
                business_meaning: 'Q2 típicamente muestra crecimiento del 10-15%',
              },
              {
                factor: 'Nuevas campañas de marketing',
                contribution: 0.25,
                business_meaning: 'Campañas lanzadas en Q1 muestran resultados positivos',
              },
              {
                factor: 'Expansión a nuevos mercados',
                contribution: 0.20,
                business_meaning: 'Presencia en 3 nuevos mercados desde Q1',
              },
            ],
            business_insights: [
              'El crecimiento es sostenible y basado en múltiples factores',
              'Las inversiones en marketing están generando retorno',
              'La expansión geográfica está contribuyendo al crecimiento',
            ],
            recommendations: [
              'Mantener inversión en campañas exitosas',
              'Acelerar expansión a mercados adicionales',
              'Preparar capacidad operacional para el crecimiento',
            ],
          },
        },
      ]

      logAction('explainability_examples_accessed', req.user?.id || 'anonymous', {
        count: examples.length,
      })

      res.status(200).json({
        success: true,
        data: examples,
        message: 'Ejemplos de explainability',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener ejemplos de explainability')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== MÉTRICAS =====
  static async getExplainabilityMetrics(req: any, res: any) {
    try {
      const metrics = await explainabilityService.getExplainabilityMetrics()
      
      logAction('explainability_metrics_retrieved', req.user?.id || 'anonymous', {
        total_requests: metrics.total_requests,
        success_rate: metrics.success_rate,
      })

      res.status(200).json({
        success: true,
        data: metrics,
        message: 'Métricas de explainability',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener métricas de explainability')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== ENDPOINTS DE SALUD =====
  static async getExplainabilityStatus(req: any, res: any) {
    try {
      const status = {
        service: 'Explainability',
        status: 'operational',
        version: '1.0.0',
        features: {
          feature_importance: true,
          prediction_explanation: true,
          model_comparison: true,
          business_impact_analysis: true,
          executive_reporting: true,
        },
        capabilities: [
          'Análisis de importancia de características',
          'Explicación de predicciones individuales',
          'Comparación de modelos',
          'Análisis de impacto de negocio',
          'Generación de reportes ejecutivos',
        ],
        supported_audiences: ['executive', 'manager', 'analyst', 'stakeholder'],
        supported_formats: ['json', 'pdf', 'powerpoint', 'email'],
        last_updated: new Date().toISOString(),
      }

      res.status(200).json({
        success: true,
        data: status,
        message: 'Estado del servicio Explainability',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener estado de explainability')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }
} 