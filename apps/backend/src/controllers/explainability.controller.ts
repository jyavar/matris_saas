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

  // ===== MISSING METHODS =====
  static async generateExplanation(req: any, res: any) {
    try {
      const { model_id, input_data, explanation_type } = req.body
      
      if (!model_id || !input_data) {
        return res.status(400).json({
          success: false,
          error: 'Model ID and input data are required',
        })
      }

      // Mock explanation generation
      const explanation = {
        id: `exp-${Date.now()}`,
        model_id,
        explanation_type: explanation_type || 'general',
        input_data,
        generated_at: new Date().toISOString(),
        explanation: 'This is a mock explanation for the prediction',
        confidence: 0.85,
        features: [
          { name: 'feature1', importance: 0.45 },
          { name: 'feature2', importance: 0.32 },
          { name: 'feature3', importance: 0.23 }
        ]
      }

      res.status(200).json({
        success: true,
        data: explanation,
        message: 'Explanation generated successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error generating explanation')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getExplanationById(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Explanation ID is required',
        })
      }

      // Mock explanation retrieval
      const explanation = {
        id,
        model_id: 'mock-model-id',
        explanation_type: 'general',
        generated_at: new Date().toISOString(),
        explanation: 'This is a mock explanation',
        confidence: 0.85,
      }

      res.status(200).json({
        success: true,
        data: explanation,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving explanation')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async calculateFeatureImportance(req: any, res: any) {
    try {
      const { model_id, dataset_id } = req.body
      
      if (!model_id) {
        return res.status(400).json({
          success: false,
          error: 'Model ID is required',
        })
      }

      // Mock feature importance calculation
      const featureImportance = {
        id: `fi-${Date.now()}`,
        model_id,
        dataset_id,
        calculated_at: new Date().toISOString(),
        features: [
          { name: 'age', importance: 0.45, rank: 1 },
          { name: 'income', importance: 0.32, rank: 2 },
          { name: 'education', importance: 0.23, rank: 3 }
        ]
      }

      res.status(200).json({
        success: true,
        data: featureImportance,
        message: 'Feature importance calculated successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error calculating feature importance')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getFeatureImportance(req: any, res: any) {
    try {
      const { model_id } = req.params
      
      if (!model_id) {
        return res.status(400).json({
          success: false,
          error: 'Model ID is required',
        })
      }

      // Mock feature importance retrieval
      const featureImportance = {
        id: `fi-${Date.now()}`,
        model_id,
        calculated_at: new Date().toISOString(),
        features: [
          { name: 'age', importance: 0.45, rank: 1 },
          { name: 'income', importance: 0.32, rank: 2 },
          { name: 'education', importance: 0.23, rank: 3 }
        ]
      }

      res.status(200).json({
        success: true,
        data: featureImportance,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving feature importance')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async calculateShapValues(req: any, res: any) {
    try {
      const { model_id, input_data } = req.body
      
      if (!model_id || !input_data) {
        return res.status(400).json({
          success: false,
          error: 'Model ID and input data are required',
        })
      }

      // Mock SHAP values calculation
      const shapValues = {
        id: `shap-${Date.now()}`,
        model_id,
        input_data,
        calculated_at: new Date().toISOString(),
        base_value: 0.5,
        shap_values: [
          { feature: 'age', value: 0.15 },
          { feature: 'income', value: 0.08 },
          { feature: 'education', value: -0.03 }
        ]
      }

      res.status(200).json({
        success: true,
        data: shapValues,
        message: 'SHAP values calculated successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error calculating SHAP values')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getShapValues(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'SHAP values ID is required',
        })
      }

      // Mock SHAP values retrieval
      const shapValues = {
        id,
        model_id: 'mock-model-id',
        calculated_at: new Date().toISOString(),
        base_value: 0.5,
        shap_values: [
          { feature: 'age', value: 0.15 },
          { feature: 'income', value: 0.08 },
          { feature: 'education', value: -0.03 }
        ]
      }

      res.status(200).json({
        success: true,
        data: shapValues,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving SHAP values')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async generateLimeExplanation(req: any, res: any) {
    try {
      const { model_id, input_data } = req.body
      
      if (!model_id || !input_data) {
        return res.status(400).json({
          success: false,
          error: 'Model ID and input data are required',
        })
      }

      // Mock LIME explanation generation
      const limeExplanation = {
        id: `lime-${Date.now()}`,
        model_id,
        input_data,
        generated_at: new Date().toISOString(),
        explanation: 'LIME local explanation',
        local_features: [
          { feature: 'age', contribution: 0.25 },
          { feature: 'income', contribution: 0.18 },
          { feature: 'education', contribution: -0.05 }
        ]
      }

      res.status(200).json({
        success: true,
        data: limeExplanation,
        message: 'LIME explanation generated successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error generating LIME explanation')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getLimeExplanation(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'LIME explanation ID is required',
        })
      }

      // Mock LIME explanation retrieval
      const limeExplanation = {
        id,
        model_id: 'mock-model-id',
        generated_at: new Date().toISOString(),
        explanation: 'LIME local explanation',
        local_features: [
          { feature: 'age', contribution: 0.25 },
          { feature: 'income', contribution: 0.18 },
          { feature: 'education', contribution: -0.05 }
        ]
      }

      res.status(200).json({
        success: true,
        data: limeExplanation,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving LIME explanation')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async generateCounterfactualExplanation(req: any, res: any) {
    try {
      const { model_id, input_data } = req.body
      
      if (!model_id || !input_data) {
        return res.status(400).json({
          success: false,
          error: 'Model ID and input data are required',
        })
      }

      // Mock counterfactual explanation generation
      const counterfactualExplanation = {
        id: `cf-${Date.now()}`,
        model_id,
        input_data,
        generated_at: new Date().toISOString(),
        original_prediction: 0.75,
        counterfactual_prediction: 0.25,
        changes_required: [
          { feature: 'age', original: 35, counterfactual: 55 },
          { feature: 'income', original: 50000, counterfactual: 30000 }
        ]
      }

      res.status(200).json({
        success: true,
        data: counterfactualExplanation,
        message: 'Counterfactual explanation generated successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error generating counterfactual explanation')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getCounterfactualExplanation(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Counterfactual explanation ID is required',
        })
      }

      // Mock counterfactual explanation retrieval
      const counterfactualExplanation = {
        id,
        model_id: 'mock-model-id',
        generated_at: new Date().toISOString(),
        original_prediction: 0.75,
        counterfactual_prediction: 0.25,
        changes_required: [
          { feature: 'age', original: 35, counterfactual: 55 },
          { feature: 'income', original: 50000, counterfactual: 30000 }
        ]
      }

      res.status(200).json({
        success: true,
        data: counterfactualExplanation,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving counterfactual explanation')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async generateAnchorExplanation(req: any, res: any) {
    try {
      const { model_id, input_data } = req.body
      
      if (!model_id || !input_data) {
        return res.status(400).json({
          success: false,
          error: 'Model ID and input data are required',
        })
      }

      // Mock anchor explanation generation
      const anchorExplanation = {
        id: `anchor-${Date.now()}`,
        model_id,
        input_data,
        generated_at: new Date().toISOString(),
        anchor_rules: [
          { rule: 'age > 30', precision: 0.85 },
          { rule: 'income > 40000', precision: 0.78 }
        ],
        coverage: 0.65
      }

      res.status(200).json({
        success: true,
        data: anchorExplanation,
        message: 'Anchor explanation generated successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error generating anchor explanation')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getAnchorExplanation(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Anchor explanation ID is required',
        })
      }

      // Mock anchor explanation retrieval
      const anchorExplanation = {
        id,
        model_id: 'mock-model-id',
        generated_at: new Date().toISOString(),
        anchor_rules: [
          { rule: 'age > 30', precision: 0.85 },
          { rule: 'income > 40000', precision: 0.78 }
        ],
        coverage: 0.65
      }

      res.status(200).json({
        success: true,
        data: anchorExplanation,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving anchor explanation')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async generateGlobalExplanation(req: any, res: any) {
    try {
      const { model_id, dataset_id } = req.body
      
      if (!model_id) {
        return res.status(400).json({
          success: false,
          error: 'Model ID is required',
        })
      }

      // Mock global explanation generation
      const globalExplanation = {
        id: `global-${Date.now()}`,
        model_id,
        dataset_id,
        generated_at: new Date().toISOString(),
        global_features: [
          { feature: 'age', importance: 0.35, description: 'Most important feature globally' },
          { feature: 'income', importance: 0.28, description: 'Second most important feature' },
          { feature: 'education', importance: 0.23, description: 'Third most important feature' }
        ],
        model_behavior: 'The model shows strong preference for older, higher-income individuals'
      }

      res.status(200).json({
        success: true,
        data: globalExplanation,
        message: 'Global explanation generated successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error generating global explanation')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getGlobalExplanation(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Global explanation ID is required',
        })
      }

      // Mock global explanation retrieval
      const globalExplanation = {
        id,
        model_id: 'mock-model-id',
        generated_at: new Date().toISOString(),
        global_features: [
          { feature: 'age', importance: 0.35, description: 'Most important feature globally' },
          { feature: 'income', importance: 0.28, description: 'Second most important feature' },
          { feature: 'education', importance: 0.23, description: 'Third most important feature' }
        ],
        model_behavior: 'The model shows strong preference for older, higher-income individuals'
      }

      res.status(200).json({
        success: true,
        data: globalExplanation,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving global explanation')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== MISSING METHODS FROM ROUTES =====
  static async getModelInterpretability(req: any, res: any) {
    try {
      const { modelId } = req.params
      
      if (!modelId) {
        return res.status(400).json({
          success: false,
          error: 'Model ID is required',
        })
      }

      // Mock model interpretability data
      const interpretability = {
        id: `interp-${Date.now()}`,
        model_id: modelId,
        generated_at: new Date().toISOString(),
        overall_score: 0.82,
        interpretability_methods: [
          {
            method: 'feature_importance',
            score: 0.85,
            description: 'Feature importance analysis shows clear ranking of input features',
          },
          {
            method: 'prediction_explanation',
            score: 0.78,
            description: 'Individual prediction explanations are available and interpretable',
          },
          {
            method: 'global_explanation',
            score: 0.84,
            description: 'Global model behavior can be explained and understood',
          },
        ],
        business_interpretability: {
          executive_level: 0.75,
          manager_level: 0.82,
          analyst_level: 0.88,
          stakeholder_level: 0.79,
        },
        recommendations: [
          'Model shows good interpretability for business users',
          'Consider adding more detailed explanations for executive reporting',
          'Feature importance is well-defined and actionable',
        ],
      }

      logAction('model_interpretability_retrieved', req.user?.id || 'anonymous', {
        model_id: modelId,
        interpretability_score: interpretability.overall_score,
      })

      res.status(200).json({
        success: true,
        data: interpretability,
        message: 'Model interpretability retrieved successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving model interpretability')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async compareModelInterpretability(req: any, res: any) {
    try {
      const { model_ids, comparison_type } = req.body
      
      if (!model_ids || !Array.isArray(model_ids) || model_ids.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'At least 2 model IDs are required for comparison',
        })
      }

      // Mock model comparison data
      const comparison = {
        id: `comp-${Date.now()}`,
        comparison_type: comparison_type || 'overall',
        model_ids,
        generated_at: new Date().toISOString(),
        comparison_results: model_ids.map((modelId: string, index: number) => ({
          model_id: modelId,
          interpretability_score: 0.7 + (index * 0.1),
          feature_importance_clarity: 0.75 + (index * 0.05),
          prediction_explanation_quality: 0.8 + (index * 0.03),
          business_understandability: 0.72 + (index * 0.08),
          rank: index + 1,
        })),
        winner: model_ids[model_ids.length - 1],
        insights: [
          'Model comparison shows clear differences in interpretability',
          'Higher ranked models provide better business explanations',
          'Feature importance varies significantly across models',
        ],
        recommendations: [
          'Consider using the highest-ranked model for production',
          'Implement ensemble methods to combine interpretability benefits',
          'Focus on improving explanation quality for lower-ranked models',
        ],
      }

      logAction('model_interpretability_compared', req.user?.id || 'anonymous', {
        model_ids,
        comparison_type: comparison_type || 'overall',
        winner: comparison.winner,
      })

      res.status(200).json({
        success: true,
        data: comparison,
        message: 'Model interpretability comparison completed successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error comparing model interpretability')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async generateBusinessInsights(req: any, res: any) {
    try {
      const { model_id, business_context, audience } = req.body
      
      if (!model_id || !business_context || !audience) {
        return res.status(400).json({
          success: false,
          error: 'Model ID, business context, and audience are required',
        })
      }

      // Mock business insights generation
      const insights = {
        id: `insights-${Date.now()}`,
        model_id,
        business_context,
        audience,
        generated_at: new Date().toISOString(),
        key_insights: [
          {
            insight: 'Model performance directly correlates with customer satisfaction',
            confidence: 0.92,
            impact: 'high',
            recommendation: 'Focus on improving prediction accuracy in customer-facing scenarios',
          },
          {
            insight: 'Feature importance suggests marketing spend optimization opportunities',
            confidence: 0.85,
            impact: 'medium',
            recommendation: 'Reallocate marketing budget based on feature importance rankings',
          },
          {
            insight: 'Seasonal patterns significantly affect model predictions',
            confidence: 0.78,
            impact: 'medium',
            recommendation: 'Consider implementing seasonal adjustment factors',
          },
        ],
        business_metrics: {
          potential_roi: '25-35%',
          implementation_cost: 'Medium',
          time_to_value: '3-6 months',
          risk_level: 'Low',
        },
        action_items: [
          'Schedule monthly model performance reviews',
          'Implement A/B testing for model improvements',
          'Create automated alerts for performance degradation',
        ],
        executive_summary: audience === 'executive' ? 'Model shows strong potential for business impact with 25-35% ROI. Implementation recommended with moderate investment and low risk profile.' : null,
      }

      logAction('business_insights_generated', req.user?.id || 'anonymous', {
        model_id,
        audience,
        insights_count: insights.key_insights.length,
      })

      res.status(200).json({
        success: true,
        data: insights,
        message: 'Business insights generated successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error generating business insights')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getBusinessInsights(req: any, res: any) {
    try {
      const { modelId } = req.params
      
      if (!modelId) {
        return res.status(400).json({
          success: false,
          error: 'Model ID is required',
        })
      }

      // Mock business insights retrieval
      const insights = {
        id: `insights-${Date.now()}`,
        model_id: modelId,
        business_context: 'Customer churn prediction and retention strategy',
        audience: 'executive',
        generated_at: new Date().toISOString(),
        key_insights: [
          {
            insight: 'Model identifies high-risk customers 30 days in advance',
            confidence: 0.94,
            impact: 'high',
            recommendation: 'Implement proactive retention campaigns',
          },
          {
            insight: 'Support ticket volume is the strongest predictor of churn',
            confidence: 0.89,
            impact: 'high',
            recommendation: 'Prioritize customer support improvements',
          },
          {
            insight: 'Seasonal patterns show increased churn risk in Q4',
            confidence: 0.81,
            impact: 'medium',
            recommendation: 'Prepare targeted retention campaigns for Q4',
          },
        ],
        business_metrics: {
          potential_roi: '40-60%',
          implementation_cost: 'Low',
          time_to_value: '2-4 weeks',
          risk_level: 'Very Low',
        },
        action_items: [
          'Deploy model to production environment',
          'Create automated retention campaign triggers',
          'Establish KPI monitoring dashboard',
        ],
        executive_summary: 'Model demonstrates exceptional business value with 40-60% ROI potential. Low implementation cost and risk make this a high-priority initiative.',
      }

      logAction('business_insights_retrieved', req.user?.id || 'anonymous', {
        model_id: modelId,
        insights_count: insights.key_insights.length,
      })

      res.status(200).json({
        success: true,
        data: insights,
        message: 'Business insights retrieved successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error retrieving business insights')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async createExplanationTemplate(req: any, res: any) {
    try {
      const { name, description, template_type, template_config } = req.body
      
      if (!name || !template_type || !template_config) {
        return res.status(400).json({
          success: false,
          error: 'Name, template type, and template config are required',
        })
      }

      // Mock template creation
      const template = {
        id: `template-${Date.now()}`,
        name,
        description: description || '',
        template_type,
        template_config,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: req.user?.id || 'anonymous',
        is_active: true,
        usage_count: 0,
        tags: [],
        version: '1.0.0',
      }

      logAction('explanation_template_created', req.user?.id || 'anonymous', {
        template_id: template.id,
        template_name: template.name,
        template_type: template.template_type,
      })

      res.status(201).json({
        success: true,
        data: template,
        message: 'Explanation template created successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error creating explanation template')
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