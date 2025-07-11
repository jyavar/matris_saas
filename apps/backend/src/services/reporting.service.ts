import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import logger from './logger.service.js'

// Tipos estrictos para Reporting
export interface Report {
  id: string
  name: string
  description: string
  type: 'executive' | 'operational' | 'analytical' | 'compliance' | 'custom'
  category: 'sales' | 'marketing' | 'operations' | 'finance' | 'customer' | 'ml_performance'
  format: 'pdf' | 'excel' | 'powerpoint' | 'dashboard' | 'email'
  schedule: 'realtime' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'on_demand'
  recipients: string[]
  data_sources: string[]
  created_at: string
  updated_at: string
  last_generated?: string
  next_generation?: string
  status: 'active' | 'paused' | 'archived'
  template_id?: string
  custom_config: ReportConfig
}

export interface ReportConfig {
  filters: ReportFilter[]
  metrics: ReportMetric[]
  visualizations: ReportVisualization[]
  business_logic: BusinessLogic[]
  formatting: FormattingOptions
}

export interface ReportFilter {
  id: string
  name: string
  field: string
  type: 'date_range' | 'dropdown' | 'text' | 'numeric_range' | 'boolean'
  default_value: unknown
  required: boolean
  options?: string[]
}

export interface ReportMetric {
  id: string
  name: string
  description: string
  calculation: string
  unit: string
  format: 'number' | 'percentage' | 'currency' | 'text'
  target_value?: number
  threshold_warning?: number
  threshold_critical?: number
  trend_analysis: boolean
  business_impact: string
}

export interface ReportVisualization {
  id: string
  type: 'chart' | 'table' | 'metric' | 'gauge' | 'funnel' | 'heatmap'
  title: string
  description: string
  data_source: string
  config: VisualizationConfig
  business_insight: string
  position: {
    row: number
    column: number
    width: number
    height: number
  }
}

export interface VisualizationConfig {
  chart_type?: 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'bubble'
  metrics?: string[]
  dimensions?: string[]
  filters?: Record<string, unknown>
  time_range?: string
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max'
  colors?: string[]
  show_legend?: boolean
  show_grid?: boolean
  animate?: boolean
}

export interface BusinessLogic {
  id: string
  name: string
  description: string
  condition: string
  action: string
  priority: 'high' | 'medium' | 'low'
  enabled: boolean
}

export interface FormattingOptions {
  theme: 'light' | 'dark' | 'corporate' | 'modern'
  logo_url?: string
  company_name?: string
  header_color?: string
  footer_text?: string
  page_numbers: boolean
  table_of_contents: boolean
  executive_summary: boolean
  appendices: boolean
}

export interface ReportExecution {
  id: string
  report_id: string
  status: 'pending' | 'generating' | 'completed' | 'failed'
  started_at: string
  completed_at?: string
  file_url?: string
  file_size?: number
  recipients_notified: string[]
  error_message?: string
  execution_time?: number
  data_points_processed?: number
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  type: Report['type']
  category: Report['category']
  industry: string[]
  use_cases: string[]
  template: Partial<ReportConfig>
  estimated_setup_time: number
}

export interface AutoInsight {
  id: string
  report_id: string
  type: 'trend' | 'anomaly' | 'opportunity' | 'risk' | 'performance'
  title: string
  description: string
  confidence: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  business_impact: string
  data_evidence: string[]
  recommendations: string[]
  created_at: string
  status: 'new' | 'reviewed' | 'actioned' | 'resolved'
}

// Schemas de validación
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

export class ReportingService {
  private reports: Report[] = []
  private executions: ReportExecution[] = []
  private templates: ReportTemplate[] = []
  private insights: AutoInsight[] = []

  constructor() {
    this.initializeDefaultTemplates()
    this.initializeDefaultReports()
  }

  // ===== GESTIÓN DE REPORTES =====
  async createReport(data: z.infer<typeof createReportSchema>): Promise<Report> {
    try {
      const validatedData = createReportSchema.parse(data)
      
      let config: ReportConfig
      if (validatedData.template_id) {
        const template = this.templates.find(t => t.id === validatedData.template_id)
        if (!template) {
          throw new ApiError('Template no encontrado', 404)
        }
        config = this.mergeTemplateConfig(template.template, validatedData.category)
      } else {
        config = this.generateDefaultConfig(validatedData.category)
      }

      const report: Report = {
        id: `report-${Date.now()}`,
        name: validatedData.name,
        description: validatedData.description,
        type: validatedData.type,
        category: validatedData.category,
        format: validatedData.format,
        schedule: validatedData.schedule,
        recipients: validatedData.recipients,
        data_sources: validatedData.data_sources,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active',
        template_id: validatedData.template_id,
        custom_config: config,
      }

      this.reports.push(report)
      
      // Programar generación automática si es necesario
      if (validatedData.schedule !== 'on_demand') {
        this.scheduleReportGeneration(report.id, validatedData.schedule)
      }
      
      logger.info({ reportId: report.id }, 'Reporte creado')
      return report
    } catch (error) {
      logger.error({ error }, 'Error al crear reporte')
      throw error
    }
  }

  async getReports(category?: Report['category']): Promise<Report[]> {
    if (category) {
      return this.reports.filter(r => r.category === category)
    }
    return this.reports
  }

  async getReportById(id: string): Promise<Report | null> {
    return this.reports.find(r => r.id === id) || null
  }

  async updateReport(id: string, data: Partial<Report>): Promise<Report | null> {
    const report = this.reports.find(r => r.id === id)
    if (!report) return null
    
    Object.assign(report, { ...data, updated_at: new Date().toISOString() })
    logger.info({ reportId: id }, 'Reporte actualizado')
    return report
  }

  // ===== GENERACIÓN DE REPORTES =====
  async generateReport(data: z.infer<typeof generateReportSchema>): Promise<ReportExecution> {
    try {
      const validatedData = generateReportSchema.parse(data)
      
      const report = await this.getReportById(validatedData.report_id)
      if (!report) {
        throw new ApiError('Reporte no encontrado', 404)
      }

      const execution: ReportExecution = {
        id: `execution-${Date.now()}`,
        report_id: validatedData.report_id,
        status: 'pending',
        started_at: new Date().toISOString(),
        recipients_notified: [],
      }

      this.executions.push(execution)
      
      // Procesar generación asíncronamente
      this.processReportGeneration(execution.id, report, validatedData).catch(error => {
        logger.error({ error, executionId: execution.id }, 'Error en generación de reporte')
      })

      logger.info({ executionId: execution.id, reportId: report.id }, 'Generación de reporte iniciada')
      return execution
    } catch (error) {
      logger.error({ error }, 'Error al generar reporte')
      throw error
    }
  }

  async getExecutionById(id: string): Promise<ReportExecution | null> {
    return this.executions.find(e => e.id === id) || null
  }

  async getReportExecutions(reportId: string): Promise<ReportExecution[]> {
    return this.executions.filter(e => e.report_id === reportId)
  }

  // ===== TEMPLATES =====
  async getTemplates(category?: Report['category']): Promise<ReportTemplate[]> {
    if (category) {
      return this.templates.filter(t => t.category === category)
    }
    return this.templates
  }

  async getTemplateById(id: string): Promise<ReportTemplate | null> {
    return this.templates.find(t => t.id === id) || null
  }

  // ===== INSIGHTS AUTOMÁTICOS =====
  async generateAutoInsights(reportId: string): Promise<AutoInsight[]> {
    try {
      const report = await this.getReportById(reportId)
      if (!report) {
        throw new ApiError('Reporte no encontrado', 404)
      }

      const insights: AutoInsight[] = [
        {
          id: `insight-${Date.now()}`,
          report_id: reportId,
          type: 'trend',
          title: 'Tendencia positiva en ventas',
          description: 'Las ventas muestran un crecimiento consistente del 15% en los últimos 3 meses',
          confidence: 0.89,
          severity: 'medium',
          business_impact: 'Oportunidad de expandir estrategias exitosas',
          data_evidence: [
            'Crecimiento del 15% en ventas mensuales',
            'Incremento del 23% en nuevos clientes',
            'Mejora del 8% en tasa de conversión',
          ],
          recommendations: [
            'Aumentar presupuesto de marketing en canales exitosos',
            'Replicar estrategias en nuevos mercados',
            'Optimizar proceso de onboarding de nuevos clientes',
          ],
          created_at: new Date().toISOString(),
          status: 'new',
        },
        {
          id: `insight-${Date.now()}-2`,
          report_id: reportId,
          type: 'anomaly',
          title: 'Decrecimiento inusual en satisfacción del cliente',
          description: 'La satisfacción del cliente ha disminuido un 12% en la última semana',
          confidence: 0.94,
          severity: 'high',
          business_impact: 'Riesgo de pérdida de clientes y reputación',
          data_evidence: [
            'Reducción del 12% en score de satisfacción',
            'Incremento del 45% en tickets de soporte',
            'Decrecimiento del 8% en retención de clientes',
          ],
          recommendations: [
            'Investigar causa raíz inmediatamente',
            'Revisar procesos de servicio al cliente',
            'Implementar medidas correctivas urgentes',
          ],
          created_at: new Date().toISOString(),
          status: 'new',
        },
      ]

      this.insights.push(...insights)
      logger.info({ reportId, count: insights.length }, 'Insights automáticos generados')
      return insights
    } catch (error) {
      logger.error({ error }, 'Error al generar insights automáticos')
      throw error
    }
  }

  async getInsights(reportId?: string): Promise<AutoInsight[]> {
    if (reportId) {
      return this.insights.filter(i => i.report_id === reportId)
    }
    return this.insights
  }

  async updateInsightStatus(id: string, status: AutoInsight['status']): Promise<boolean> {
    const insight = this.insights.find(i => i.id === id)
    if (!insight) return false
    
    insight.status = status
    logger.info({ insightId: id, status }, 'Status de insight actualizado')
    return true
  }

  // ===== UTILIDADES =====
  private mergeTemplateConfig(template: Partial<ReportConfig>, category: Report['category']): ReportConfig {
    const defaultConfig = this.generateDefaultConfig(category)
    
    return {
      filters: template.filters || defaultConfig.filters,
      metrics: template.metrics || defaultConfig.metrics,
      visualizations: template.visualizations || defaultConfig.visualizations,
      business_logic: template.business_logic || defaultConfig.business_logic,
      formatting: template.formatting || defaultConfig.formatting,
    }
  }

  private generateDefaultConfig(category: Report['category']): ReportConfig {
    const baseFilters: ReportFilter[] = [
      {
        id: 'date_range',
        name: 'Rango de Fechas',
        field: 'created_at',
        type: 'date_range',
        default_value: 'last_30_days',
        required: true,
      },
    ]

    const baseMetrics: ReportMetric[] = [
      {
        id: 'total_revenue',
        name: 'Ingresos Totales',
        description: 'Ingresos totales del período',
        calculation: 'SUM(revenue)',
        unit: 'USD',
        format: 'currency',
        trend_analysis: true,
        business_impact: 'Indicador principal de crecimiento del negocio',
      },
    ]

    const baseVisualizations: ReportVisualization[] = [
      {
        id: 'revenue_chart',
        type: 'chart',
        title: 'Tendencia de Ingresos',
        description: 'Evolución de ingresos en el tiempo',
        data_source: 'sales_data',
        config: {
          chart_type: 'line',
          time_range: 'last_12_months',
          show_legend: true,
          show_grid: true,
        },
        business_insight: 'Visualización de tendencias de crecimiento',
        position: { row: 1, column: 1, width: 8, height: 4 },
      },
    ]

    const baseBusinessLogic: BusinessLogic[] = [
      {
        id: 'revenue_alert',
        name: 'Alerta de Ingresos',
        description: 'Alertar cuando los ingresos caigan por debajo del objetivo',
        condition: 'total_revenue < target_revenue * 0.9',
        action: 'send_alert',
        priority: 'high',
        enabled: true,
      },
    ]

    const baseFormatting: FormattingOptions = {
      theme: 'corporate',
      page_numbers: true,
      table_of_contents: true,
      executive_summary: true,
      appendices: false,
    }

    switch (category) {
      case 'sales':
        return {
          filters: [
            ...baseFilters,
            {
              id: 'sales_team',
              name: 'Equipo de Ventas',
              field: 'sales_team',
              type: 'dropdown',
              default_value: 'all',
              required: false,
              options: ['all', 'team_a', 'team_b', 'team_c'],
            },
          ],
          metrics: [
            ...baseMetrics,
            {
              id: 'conversion_rate',
              name: 'Tasa de Conversión',
              description: 'Porcentaje de leads convertidos',
              calculation: 'COUNT(converted_leads) / COUNT(total_leads)',
              unit: '%',
              format: 'percentage',
              target_value: 25,
              threshold_warning: 20,
              threshold_critical: 15,
              trend_analysis: true,
              business_impact: 'Eficiencia del proceso de ventas',
            },
          ],
          visualizations: baseVisualizations,
          business_logic: baseBusinessLogic,
          formatting: baseFormatting,
        }
      case 'ml_performance':
        return {
          filters: baseFilters,
          metrics: [
            {
              id: 'model_accuracy',
              name: 'Precisión del Modelo',
              description: 'Precisión del modelo ML',
              calculation: 'AVG(model_accuracy)',
              unit: '%',
              format: 'percentage',
              target_value: 85,
              threshold_warning: 80,
              threshold_critical: 75,
              trend_analysis: true,
              business_impact: 'Calidad de las predicciones del modelo',
            },
            {
              id: 'prediction_count',
              name: 'Número de Predicciones',
              description: 'Total de predicciones realizadas',
              calculation: 'COUNT(predictions)',
              unit: 'predictions',
              format: 'number',
              trend_analysis: true,
              business_impact: 'Volumen de uso del modelo ML',
            },
          ],
          visualizations: [
            {
              id: 'accuracy_trend',
              type: 'chart',
              title: 'Tendencia de Precisión',
              description: 'Evolución de la precisión del modelo',
              data_source: 'ml_metrics',
              config: {
                chart_type: 'line',
                time_range: 'last_30_days',
                show_legend: true,
              },
              business_insight: 'Monitoreo de rendimiento del modelo ML',
              position: { row: 1, column: 1, width: 6, height: 4 },
            },
          ],
          business_logic: baseBusinessLogic,
          formatting: baseFormatting,
        }
      default:
        return {
          filters: baseFilters,
          metrics: baseMetrics,
          visualizations: baseVisualizations,
          business_logic: baseBusinessLogic,
          formatting: baseFormatting,
        }
    }
  }

  private async processReportGeneration(
    executionId: string, 
    report: Report, 
    options: z.infer<typeof generateReportSchema>
  ): Promise<void> {
    const execution = this.executions.find(e => e.id === executionId)
    if (!execution) return

    try {
      execution.status = 'generating'
      
      // Simular procesamiento de reporte
      const startTime = Date.now()
      await this.delay(5000) // 5 segundos de procesamiento
      
      // Generar archivo simulado
      const fileSize = Math.floor(Math.random() * 5000) + 1000 // 1-6 MB
      const executionTime = Date.now() - startTime
      
      execution.status = 'completed'
      execution.completed_at = new Date().toISOString()
      execution.file_url = `/reports/${executionId}.${options.format || report.format}`
      execution.file_size = fileSize
      execution.execution_time = executionTime
      execution.data_points_processed = Math.floor(Math.random() * 10000) + 1000
      
      // Notificar a destinatarios
      execution.recipients_notified = report.recipients
      
      // Actualizar reporte
      report.last_generated = new Date().toISOString()
      report.next_generation = this.calculateNextGeneration(report.schedule)
      
      // Generar insights automáticos
      this.generateAutoInsights(report.id).catch(error => {
        logger.error({ error, reportId: report.id }, 'Error al generar insights automáticos')
      })
      
      logger.info({ executionId, reportId: report.id }, 'Reporte generado exitosamente')
    } catch (error) {
      execution.status = 'failed'
      execution.error_message = error instanceof Error ? error.message : 'Error desconocido'
      logger.error({ error, executionId }, 'Error en generación de reporte')
    }
  }

  private scheduleReportGeneration(reportId: string, schedule: Report['schedule']): void {
    // En una implementación real, esto programaría la generación automática
    logger.info({ reportId, schedule }, 'Programación de generación automática configurada')
  }

  private calculateNextGeneration(schedule: Report['schedule']): string {
    const now = new Date()
    let nextDate: Date

    switch (schedule) {
      case 'hourly':
        nextDate = new Date(now.getTime() + 60 * 60 * 1000)
        break
      case 'daily':
        nextDate = new Date(now.getTime() + 24 * 60 * 60 * 1000)
        break
      case 'weekly':
        nextDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
        break
      case 'monthly':
        nextDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
        break
      case 'quarterly':
        nextDate = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate())
        break
      default:
        nextDate = now
    }

    return nextDate.toISOString()
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // ===== INICIALIZACIÓN DE DATOS =====
  private initializeDefaultTemplates(): void {
    this.templates = [
      {
        id: 'template-executive-summary',
        name: 'Resumen Ejecutivo',
        description: 'Template para reportes ejecutivos de alto nivel',
        type: 'executive',
        category: 'sales',
        industry: ['all'],
        use_cases: ['presentación ejecutiva', 'revisión de resultados', 'planificación estratégica'],
        estimated_setup_time: 30,
        template: {
          visualizations: [
            {
              id: 'kpi_dashboard',
              type: 'metric',
              title: 'KPIs Principales',
              description: 'Métricas clave de negocio',
              data_source: 'business_metrics',
              config: { show_grid: true },
              business_insight: 'Vista general de rendimiento del negocio',
              position: { row: 1, column: 1, width: 12, height: 2 },
            },
          ],
          formatting: {
            theme: 'corporate',
            executive_summary: true,
            page_numbers: true,
            table_of_contents: true,
            appendices: true,
          },
        },
      },
      {
        id: 'template-ml-performance',
        name: 'Rendimiento de ML',
        description: 'Template para monitorear modelos de ML',
        type: 'analytical',
        category: 'ml_performance',
        industry: ['all'],
        use_cases: ['monitoreo de modelos', 'evaluación de rendimiento', 'optimización'],
        estimated_setup_time: 45,
        template: {
          metrics: [
            {
              id: 'model_accuracy',
              name: 'Precisión del Modelo',
              description: 'Precisión actual del modelo',
              calculation: 'AVG(accuracy)',
              unit: '%',
              format: 'percentage',
              target_value: 85,
              trend_analysis: true,
              business_impact: 'Calidad de las predicciones',
            },
          ],
          visualizations: [
            {
              id: 'accuracy_trend',
              type: 'chart',
              title: 'Tendencia de Precisión',
              description: 'Evolución de la precisión en el tiempo',
              data_source: 'ml_metrics',
              config: { chart_type: 'line', time_range: 'last_30_days' },
              business_insight: 'Monitoreo de degradación del modelo',
              position: { row: 1, column: 1, width: 8, height: 4 },
            },
          ],
        },
      },
    ]
  }

  private initializeDefaultReports(): void {
    this.reports = [
      {
        id: 'report-executive-dashboard',
        name: 'Dashboard Ejecutivo',
        description: 'Vista general de métricas clave de negocio',
        type: 'executive',
        category: 'sales',
        format: 'dashboard',
        schedule: 'daily',
        recipients: ['ceo@company.com', 'cfo@company.com'],
        data_sources: ['sales_data', 'customer_data', 'financial_data'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active',
        custom_config: this.generateDefaultConfig('sales'),
      },
    ]
  }

  // ===== MISSING METHODS =====
  async deleteReport(id: string): Promise<boolean> {
    const index = this.reports.findIndex(r => r.id === id)
    if (index === -1) return false
    
    this.reports.splice(index, 1)
    logger.info({ reportId: id }, 'Report deleted')
    return true
  }

  async downloadReport(id: string, format?: string): Promise<string | null> {
    const report = this.reports.find(r => r.id === id)
    if (!report) return null
    
    // Mock download URL generation
    const downloadUrl = `https://api.example.com/downloads/reports/${id}?format=${format || 'pdf'}&token=mock-token`
    logger.info({ reportId: id, format }, 'Report download URL generated')
    return downloadUrl
  }

  async scheduleReport(id: string, scheduleData: { schedule: string, recipients: string[] }): Promise<any> {
    const report = this.reports.find(r => r.id === id)
    if (!report) return null
    
    // Mock scheduled report
    const scheduledReport = {
      id: `schedule-${Date.now()}`,
      report_id: id,
      schedule: scheduleData.schedule,
      recipients: scheduleData.recipients,
      created_at: new Date().toISOString(),
      next_execution: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    }
    
    logger.info({ reportId: id, schedule: scheduleData.schedule }, 'Report scheduled')
    return scheduledReport
  }

  async createTemplate(templateData: any): Promise<ReportTemplate> {
    const template: ReportTemplate = {
      id: `template-${Date.now()}`,
      name: templateData.name,
      description: templateData.description || '',
      type: templateData.type,
      category: templateData.category || 'custom',
      industry: templateData.industry || [],
      use_cases: templateData.use_cases || [],
      template: templateData.template || {},
      estimated_setup_time: templateData.estimated_setup_time || 30,
    }
    
    this.templates.push(template)
    logger.info({ templateId: template.id }, 'Report template created')
    return template
  }

  async calculateMetrics(reportId: string, metricTypes?: string[]): Promise<any> {
    const report = this.reports.find(r => r.id === reportId)
    if (!report) return null
    
    // Mock metrics calculation
    const metrics = {
      report_id: reportId,
      calculated_at: new Date().toISOString(),
      metrics: [
        {
          name: 'total_revenue',
          value: 125000,
          unit: 'USD',
          trend: 'up',
          change_percentage: 15.5
        },
        {
          name: 'conversion_rate',
          value: 23.5,
          unit: '%',
          trend: 'up',
          change_percentage: 2.3
        },
        {
          name: 'customer_acquisition_cost',
          value: 45.50,
          unit: 'USD',
          trend: 'down',
          change_percentage: -8.2
        }
      ]
    }
    
    logger.info({ reportId, metricTypes }, 'Metrics calculated')
    return metrics
  }

  // ===== MÉTRICAS =====
  async getReportingMetrics(): Promise<Record<string, unknown>> {
    const completedExecutions = this.executions.filter(e => e.status === 'completed')
    const failedExecutions = this.executions.filter(e => e.status === 'failed')
    
    return {
      total_reports: this.reports.length,
      total_executions: this.executions.length,
      completed_executions: completedExecutions.length,
      failed_executions: failedExecutions.length,
      success_rate: this.executions.length > 0 
        ? completedExecutions.length / this.executions.length 
        : 0,
      average_execution_time: completedExecutions.reduce((sum, exec) => {
        return sum + (exec.execution_time || 0)
      }, 0) / Math.max(completedExecutions.length, 1),
      reports_by_type: this.reports.reduce((acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      reports_by_category: this.reports.reduce((acc, r) => {
        acc[r.category] = (acc[r.category] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      total_templates: this.templates.length,
      total_insights: this.insights.length,
      insights_by_type: this.insights.reduce((acc, i) => {
        acc[i.type] = (acc[i.type] || 0) + 1
        return acc
      }, {} as Record<string, number>),
    }
  }
}

export const reportingService = new ReportingService()
