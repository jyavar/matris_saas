import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import { businessIntelligenceService } from '../services/business-intelligence.service.js'
import logger from '../services/logger.service.js'
import { logAction } from '../services/logger.service.js'

// Schemas de validación para endpoints
const createDashboardSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().max(500),
  category: z.enum(['executive', 'operational', 'tactical', 'strategic']),
  business_owner: z.string().min(1, 'Propietario de negocio es requerido'),
  refresh_schedule: z.enum(['realtime', 'hourly', 'daily', 'weekly']),
  access_level: z.enum(['public', 'private', 'restricted']),
})

const createWidgetSchema = z.object({
  dashboard_id: z.string().min(1, 'Dashboard ID es requerido'),
  type: z.enum(['metric', 'chart', 'table', 'gauge', 'funnel', 'heatmap']),
  title: z.string().min(1, 'Título es requerido'),
  description: z.string().max(300),
  data_source: z.string().min(1, 'Fuente de datos es requerida'),
  config: z.record(z.unknown()),
})

export class BusinessIntelligenceController {
  // ===== GESTIÓN DE DASHBOARDS =====
  static async createDashboard(req: any, res: any) {
    try {
      const validatedData = createDashboardSchema.parse(req.body)
      
      const dashboard = await businessIntelligenceService.createDashboard(validatedData)
      
      logAction('bi_dashboard_created', req.user?.id || 'anonymous', {
        dashboard_id: dashboard.id,
        category: dashboard.category,
        business_owner: dashboard.business_owner,
      })

      res.status(201).json({
        success: true,
        message: 'Dashboard de BI creado exitosamente',
        data: dashboard,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al crear dashboard')
      
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

  static async getDashboards(req: any, res: any) {
    try {
      const dashboards = await businessIntelligenceService.getDashboards()
      
      logAction('bi_dashboards_retrieved', req.user?.id || 'anonymous', {
        count: dashboards.length,
      })

      res.status(200).json({
        success: true,
        data: dashboards,
        count: dashboards.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener dashboards')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getDashboardById(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de dashboard es requerido',
        })
      }

      const dashboard = await businessIntelligenceService.getDashboardById(id)
      
      if (!dashboard) {
        return res.status(404).json({
          success: false,
          error: 'Dashboard no encontrado',
        })
      }

      logAction('bi_dashboard_retrieved', req.user?.id || 'anonymous', {
        dashboard_id: id,
      })

      res.status(200).json({
        success: true,
        data: dashboard,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener dashboard')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async updateDashboard(req: any, res: any) {
    try {
      const { id } = req.params
      const updateData = req.body
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de dashboard es requerido',
        })
      }

      const dashboard = await businessIntelligenceService.updateDashboard(id, updateData)
      
      if (!dashboard) {
        return res.status(404).json({
          success: false,
          error: 'Dashboard no encontrado',
        })
      }

      logAction('bi_dashboard_updated', req.user?.id || 'anonymous', {
        dashboard_id: id,
      })

      res.status(200).json({
        success: true,
        message: 'Dashboard actualizado exitosamente',
        data: dashboard,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al actualizar dashboard')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== GESTIÓN DE WIDGETS =====
  static async createWidget(req: any, res: any) {
    try {
      const validatedData = createWidgetSchema.parse(req.body)
      
      const widget = await businessIntelligenceService.createWidget(validatedData)
      
      logAction('bi_widget_created', req.user?.id || 'anonymous', {
        widget_id: widget.id,
        dashboard_id: validatedData.dashboard_id,
        type: widget.type,
      })

      res.status(201).json({
        success: true,
        message: 'Widget creado exitosamente',
        data: widget,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al crear widget')
      
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

  // ===== GENERACIÓN DE REPORTES =====
  static async generateExecutiveReport(req: any, res: any) {
    try {
      const { period } = req.query
      
      const report = await businessIntelligenceService.generateExecutiveReport(period as string)
      
      logAction('bi_executive_report_generated', req.user?.id || 'anonymous', {
        report_id: report.id,
        period,
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

  static async generateOperationalReport(req: any, res: any) {
    try {
      const { period } = req.query
      
      const report = await businessIntelligenceService.generateOperationalReport(period as string)
      
      logAction('bi_operational_report_generated', req.user?.id || 'anonymous', {
        report_id: report.id,
        period,
      })

      res.status(200).json({
        success: true,
        data: report,
        message: 'Reporte operacional generado exitosamente',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al generar reporte operacional')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== INSIGHTS AUTOMÁTICOS =====
  static async generateAutoInsights(req: any, res: any) {
    try {
      const insights = await businessIntelligenceService.generateAutoInsights()
      
      logAction('bi_auto_insights_generated', req.user?.id || 'anonymous', {
        count: insights.length,
      })

      res.status(200).json({
        success: true,
        data: insights,
        message: 'Insights automáticos generados exitosamente',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al generar insights automáticos')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getInsightById(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de insight es requerido',
        })
      }

      const insights = await businessIntelligenceService.getInsights()
      const insight = insights.find(i => i.id === id)
      
      if (!insight) {
        return res.status(404).json({
          success: false,
          error: 'Insight no encontrado',
        })
      }

      res.status(200).json({
        success: true,
        data: insight,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener insight')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async updateInsightStatus(req: any, res: any) {
    try {
      const { id } = req.params
      const { status } = req.body
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de insight es requerido',
        })
      }

      if (!status) {
        return res.status(400).json({
          success: false,
          error: 'Status es requerido',
        })
      }

      const updated = await businessIntelligenceService.updateInsightStatus(id, status)
      
      if (!updated) {
        return res.status(404).json({
          success: false,
          error: 'Insight no encontrado',
        })
      }

      logAction('bi_insight_status_updated', req.user?.id || 'anonymous', {
        insight_id: id,
        status,
      })

      res.status(200).json({
        success: true,
        message: 'Status de insight actualizado exitosamente',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al actualizar status de insight')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== TEMPLATES =====
  static async getTemplates(req: any, res: any) {
    try {
      const templates = await businessIntelligenceService.getTemplates()
      
      logAction('bi_templates_retrieved', req.user?.id || 'anonymous', {
        count: templates.length,
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

      const template = await businessIntelligenceService.getTemplateById(id)
      
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

  // ===== MÉTRICAS =====
  static async getBIMetrics(req: any, res: any) {
    try {
      const metrics = await businessIntelligenceService.getBIMetrics()
      
      logAction('bi_metrics_retrieved', req.user?.id || 'anonymous', {
        total_dashboards: metrics.total_dashboards,
        total_insights: metrics.total_insights,
      })

      res.status(200).json({
        success: true,
        data: metrics,
        message: 'Métricas de Business Intelligence',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener métricas de BI')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== ESTADO DEL SERVICIO =====
  static async getBIStatus(req: any, res: any) {
    try {
      const status = {
        service: 'Business Intelligence',
        status: 'operational',
        version: '1.0.0',
        features: {
          automated_dashboards: true,
          real_time_insights: true,
          executive_reporting: true,
          operational_analytics: true,
          auto_insights: true,
        },
        capabilities: [
          'Generación automática de dashboards',
          'Insights en tiempo real',
          'Reportes ejecutivos automáticos',
          'Análisis operacional',
          'Detección automática de patrones',
        ],
        supported_categories: ['executive', 'operational', 'tactical', 'strategic'],
        supported_formats: ['dashboard', 'pdf', 'excel', 'powerpoint'],
        last_updated: new Date().toISOString(),
      }

      res.status(200).json({
        success: true,
        data: status,
        message: 'Estado del servicio Business Intelligence',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener estado de BI')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }
} 