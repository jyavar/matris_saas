import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import { reportingService } from '../services/reporting.service.js'
import logger from '../services/logger.service.js'
import { logAction } from '../services/logger.service.js'

// Schemas de validación para endpoints
const createReportSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  description: z.string().max(500),
  type: z.enum(['executive', 'operational', 'analytical', 'compliance', 'custom']),
  category: z.enum(['sales', 'marketing', 'operations', 'finance', 'customer', 'ml_performance']),
  format: z.enum(['pdf', 'excel', 'powerpoint', 'dashboard', 'email']),
  schedule: z.enum(['realtime', 'hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'on_demand']),
  recipients: z.array(z.string().email()),
  data_sources: z.array(z.string()),
  template_id: z.string().optional(),
})

const generateReportSchema = z.object({
  report_id: z.string().min(1, 'Report ID es requerido'),
  filters: z.record(z.unknown()).optional(),
  format: z.enum(['pdf', 'excel', 'powerpoint', 'dashboard', 'email']).optional(),
})

export class ReportingController {
  // ===== GESTIÓN DE REPORTES =====
  static async createReport(req: any, res: any) {
    try {
      const validatedData = createReportSchema.parse(req.body)
      
      const report = await reportingService.createReport(validatedData)
      
      logAction('reporting_report_created', req.user?.id || 'anonymous', {
        report_id: report.id,
        type: report.type,
        category: report.category,
        schedule: report.schedule,
      })

      res.status(201).json({
        success: true,
        message: 'Reporte creado exitosamente',
        data: report,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al crear reporte')
      
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

  static async getReports(req: any, res: any) {
    try {
      const { category } = req.query
      const reports = await reportingService.getReports(category)
      
      logAction('reporting_reports_retrieved', req.user?.id || 'anonymous', {
        count: reports.length,
        category,
      })

      res.status(200).json({
        success: true,
        data: reports,
        count: reports.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener reportes')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async getReportById(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de reporte es requerido',
        })
      }

      const report = await reportingService.getReportById(id)
      
      if (!report) {
        return res.status(404).json({
          success: false,
          error: 'Reporte no encontrado',
        })
      }

      logAction('reporting_report_retrieved', req.user?.id || 'anonymous', {
        report_id: id,
      })

      res.status(200).json({
        success: true,
        data: report,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener reporte')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async updateReport(req: any, res: any) {
    try {
      const { id } = req.params
      const updateData = req.body
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de reporte es requerido',
        })
      }

      const report = await reportingService.updateReport(id, updateData)
      
      if (!report) {
        return res.status(404).json({
          success: false,
          error: 'Reporte no encontrado',
        })
      }

      logAction('reporting_report_updated', req.user?.id || 'anonymous', {
        report_id: id,
      })

      res.status(200).json({
        success: true,
        message: 'Reporte actualizado exitosamente',
        data: report,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al actualizar reporte')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== GENERACIÓN DE REPORTES =====
  static async generateReport(req: any, res: any) {
    try {
      const validatedData = generateReportSchema.parse(req.body)
      
      const execution = await reportingService.generateReport(validatedData)
      
      logAction('reporting_report_generation_started', req.user?.id || 'anonymous', {
        execution_id: execution.id,
        report_id: execution.report_id,
        format: validatedData.format,
      })

      res.status(201).json({
        success: true,
        message: 'Generación de reporte iniciada',
        data: execution,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al generar reporte')
      
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

      const execution = await reportingService.getExecutionById(id)
      
      if (!execution) {
        return res.status(404).json({
          success: false,
          error: 'Ejecución no encontrada',
        })
      }

      logAction('reporting_execution_retrieved', req.user?.id || 'anonymous', {
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

  static async getReportExecutions(req: any, res: any) {
    try {
      const { reportId } = req.params
      
      if (!reportId) {
        return res.status(400).json({
          success: false,
          error: 'Report ID es requerido',
        })
      }

      const executions = await reportingService.getReportExecutions(reportId)
      
      logAction('reporting_report_executions_retrieved', req.user?.id || 'anonymous', {
        report_id: reportId,
        count: executions.length,
      })

      res.status(200).json({
        success: true,
        data: executions,
        count: executions.length,
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener ejecuciones de reporte')
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
      const templates = await reportingService.getTemplates(industry as 'customer' | 'marketing' | 'sales' | 'operations' | 'finance' | 'ml_performance')
      
      logAction('reporting_templates_retrieved', req.user?.id || 'anonymous', {
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

      const template = await reportingService.getTemplateById(id)
      
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

  // ===== INSIGHTS AUTOMÁTICOS =====
  static async generateAutoInsights(req: any, res: any) {
    try {
      const { reportId } = req.query
      let insights
      
      if (reportId) {
        insights = await reportingService.generateAutoInsights(reportId as string)
      } else {
        insights = await reportingService.generateAutoInsights('default')
      }
      
      logAction('reporting_auto_insights_generated', req.user?.id || 'anonymous', {
        count: insights.length,
        report_id: reportId,
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

      const insights = await reportingService.getInsights()
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

      const updated = await reportingService.updateInsightStatus(id, status)
      
      if (!updated) {
        return res.status(404).json({
          success: false,
          error: 'Insight no encontrado',
        })
      }

      logAction('reporting_insight_status_updated', req.user?.id || 'anonymous', {
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

  // ===== MÉTRICAS =====
  static async getReportingMetrics(req: any, res: any) {
    try {
      const metrics = await reportingService.getReportingMetrics()
      
      logAction('reporting_metrics_retrieved', req.user?.id || 'anonymous', {
        total_reports: metrics.total_reports,
        success_rate: metrics.success_rate,
      })

      res.status(200).json({
        success: true,
        data: metrics,
        message: 'Métricas de Reporting',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener métricas de reporting')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== MISSING METHODS =====
  static async deleteReport(req: any, res: any) {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Report ID is required',
        })
      }

      // Mock report deletion
      const deleted = await reportingService.deleteReport(id)
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Report not found',
        })
      }

      logAction('reporting_report_deleted', req.user?.id || 'anonymous', {
        report_id: id,
      })

      res.status(200).json({
        success: true,
        message: 'Report deleted successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error deleting report')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async downloadReport(req: any, res: any) {
    try {
      const { id } = req.params
      const { format } = req.query
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Report ID is required',
        })
      }

      // Mock report download
      const downloadUrl = await reportingService.downloadReport(id, format as string)
      
      if (!downloadUrl) {
        return res.status(404).json({
          success: false,
          error: 'Report not found or not ready for download',
        })
      }

      logAction('reporting_report_downloaded', req.user?.id || 'anonymous', {
        report_id: id,
        format: format || 'pdf',
      })

      res.status(200).json({
        success: true,
        data: { download_url: downloadUrl },
        message: 'Report download link generated',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error downloading report')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async scheduleReport(req: any, res: any) {
    try {
      const { id } = req.params
      const { schedule, recipients } = req.body
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Report ID is required',
        })
      }

      if (!schedule) {
        return res.status(400).json({
          success: false,
          error: 'Schedule is required',
        })
      }

      // Mock report scheduling
      const scheduledReport = await reportingService.scheduleReport(id, {
        schedule,
        recipients: recipients || [],
      })

      logAction('reporting_report_scheduled', req.user?.id || 'anonymous', {
        report_id: id,
        schedule,
        recipients_count: recipients?.length || 0,
      })

      res.status(200).json({
        success: true,
        data: scheduledReport,
        message: 'Report scheduled successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error scheduling report')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async createReportTemplate(req: any, res: any) {
    try {
      const templateData = req.body
      
      if (!templateData.name || !templateData.type) {
        return res.status(400).json({
          success: false,
          error: 'Template name and type are required',
        })
      }

      // Mock template creation
      const template = await reportingService.createTemplate(templateData)

      logAction('reporting_template_created', req.user?.id || 'anonymous', {
        template_id: template.id,
        template_name: template.name,
        template_type: template.type,
      })

      res.status(201).json({
        success: true,
        data: template,
        message: 'Report template created successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error creating report template')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  static async calculateMetrics(req: any, res: any) {
    try {
      const { report_id, metric_types } = req.body
      
      if (!report_id) {
        return res.status(400).json({
          success: false,
          error: 'Report ID is required',
        })
      }

      // Mock metrics calculation
      const metrics = await reportingService.calculateMetrics(report_id, metric_types)

      logAction('reporting_metrics_calculated', req.user?.id || 'anonymous', {
        report_id,
        metric_types: metric_types || [],
      })

      res.status(200).json({
        success: true,
        data: metrics,
        message: 'Metrics calculated successfully',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error calculating metrics')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }

  // ===== ESTADO DEL SERVICIO =====
  static async getReportingStatus(req: any, res: any) {
    try {
      const status = {
        service: 'Reporting',
        status: 'operational',
        version: '1.0.0',
        features: {
          automated_reporting: true,
          executive_summaries: true,
          scheduled_reports: true,
          multiple_formats: true,
          auto_insights: true,
        },
        capabilities: [
          'Generación automática de reportes',
          'Resúmenes ejecutivos personalizados',
          'Programación de reportes',
          'Múltiples formatos de salida',
          'Insights automáticos',
        ],
        supported_types: ['executive', 'operational', 'analytical', 'compliance', 'custom'],
        supported_formats: ['pdf', 'excel', 'powerpoint', 'dashboard', 'email'],
        supported_schedules: ['realtime', 'hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'on_demand'],
        last_updated: new Date().toISOString(),
      }

      res.status(200).json({
        success: true,
        data: status,
        message: 'Estado del servicio Reporting',
      })
    } catch (error) {
      logger.error({ error, userId: req.user?.id }, 'Error al obtener estado de reporting')
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      })
    }
  }
}
