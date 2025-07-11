import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import logger from './logger.service.js'

// Tipos estrictos para Business Intelligence
export interface BIDashboard {
  id: string
  name: string
  description: string
  category: 'executive' | 'operational' | 'tactical' | 'strategic'
  created_at: string
  updated_at: string
  widgets: BIWidget[]
  filters: BIFilter[]
  refresh_schedule: 'realtime' | 'hourly' | 'daily' | 'weekly'
  access_level: 'public' | 'private' | 'restricted'
  business_owner: string
  kpis: KPI[]
}

export interface BIWidget {
  id: string
  type: 'metric' | 'chart' | 'table' | 'gauge' | 'funnel' | 'heatmap'
  title: string
  description: string
  data_source: string
  config: WidgetConfig
  business_insight: string
  alert_threshold?: number
  trend: 'up' | 'down' | 'stable'
  last_updated: string
}

export interface WidgetConfig {
  chart_type?: 'bar' | 'line' | 'pie' | 'area' | 'scatter'
  metrics?: string[]
  dimensions?: string[]
  filters?: Record<string, unknown>
  time_range?: string
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max'
  target_value?: number
  warning_threshold?: number
  critical_threshold?: number
}

export interface BIFilter {
  id: string
  name: string
  type: 'date_range' | 'dropdown' | 'text' | 'numeric_range'
  field: string
  default_value: unknown
  options?: string[]
  required: boolean
}

export interface KPI {
  id: string
  name: string
  description: string
  current_value: number
  target_value: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  trend_percentage: number
  status: 'on_track' | 'at_risk' | 'off_track' | 'exceeded'
  last_updated: string
  business_impact: string
  owner: string
}

export interface BIReport {
  id: string
  name: string
  type: 'executive_summary' | 'operational_report' | 'trend_analysis' | 'forecast'
  generated_at: string
  period: string
  executive_summary: string
  key_findings: string[]
  recommendations: string[]
  metrics: ReportMetric[]
  visualizations: ReportVisualization[]
  next_actions: string[]
  business_impact: string
}

export interface ReportMetric {
  name: string
  value: number
  previous_value: number
  change_percentage: number
  trend: 'up' | 'down' | 'stable'
  significance: 'high' | 'medium' | 'low'
  business_interpretation: string
}

export interface ReportVisualization {
  type: 'chart' | 'table' | 'metric'
  title: string
  description: string
  data: Record<string, unknown>
  business_insight: string
}

export interface AutoInsight {
  id: string
  type: 'anomaly' | 'trend' | 'opportunity' | 'risk'
  title: string
  description: string
  confidence: number
  business_impact: string
  data_points: string[]
  recommendations: string[]
  created_at: string
  priority: 'high' | 'medium' | 'low'
  status: 'new' | 'reviewed' | 'actioned' | 'resolved'
}

// Schemas de validación
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

export class BusinessIntelligenceService {
  private dashboards: BIDashboard[] = []
  private reports: BIReport[] = []
  private insights: AutoInsight[] = []

  // ===== GESTIÓN DE DASHBOARDS =====
  async createDashboard(data: z.infer<typeof createDashboardSchema>): Promise<BIDashboard> {
    try {
      const validatedData = createDashboardSchema.parse(data)
      
      const dashboard: BIDashboard = {
        id: `dashboard-${Date.now()}`,
        name: validatedData.name,
        description: validatedData.description,
        category: validatedData.category,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        widgets: [],
        filters: this.generateDefaultFilters(validatedData.category),
        refresh_schedule: validatedData.refresh_schedule,
        access_level: validatedData.access_level,
        business_owner: validatedData.business_owner,
        kpis: this.generateDefaultKPIs(validatedData.category),
      }

      this.dashboards.push(dashboard)
      
      // Generar widgets automáticamente según la categoría
      dashboard.widgets = await this.generateDefaultWidgets(dashboard)
      
      logger.info({ dashboardId: dashboard.id }, 'Dashboard de BI creado')
      return dashboard
    } catch (error) {
      logger.error({ error }, 'Error al crear dashboard')
      throw error
    }
  }

  async getDashboards(): Promise<BIDashboard[]> {
    return this.dashboards
  }

  async getDashboardById(id: string): Promise<BIDashboard | null> {
    return this.dashboards.find(d => d.id === id) || null
  }

  async updateDashboard(id: string, data: Partial<BIDashboard>): Promise<BIDashboard | null> {
    const dashboard = this.dashboards.find(d => d.id === id)
    if (!dashboard) return null
    
    Object.assign(dashboard, { ...data, updated_at: new Date().toISOString() })
    logger.info({ dashboardId: id }, 'Dashboard actualizado')
    return dashboard
  }

  // ===== GESTIÓN DE WIDGETS =====
  async createWidget(data: z.infer<typeof createWidgetSchema>): Promise<BIWidget> {
    try {
      const validatedData = createWidgetSchema.parse(data)
      
      const dashboard = this.dashboards.find(d => d.id === validatedData.dashboard_id)
      if (!dashboard) {
        throw new ApiError('Dashboard no encontrado', 404)
      }

      const widget: BIWidget = {
        id: `widget-${Date.now()}`,
        type: validatedData.type,
        title: validatedData.title,
        description: validatedData.description,
        data_source: validatedData.data_source,
        config: validatedData.config,
        business_insight: this.generateBusinessInsight(validatedData.type),
        trend: this.generateTrend(),
        last_updated: new Date().toISOString(),
      }

      dashboard.widgets.push(widget)
      dashboard.updated_at = new Date().toISOString()
      
      logger.info({ widgetId: widget.id, dashboardId: dashboard.id }, 'Widget creado')
      return widget
    } catch (error) {
      logger.error({ error }, 'Error al crear widget')
      throw error
    }
  }

  // ===== GENERACIÓN AUTOMÁTICA DE REPORTES =====
  async generateExecutiveReport(period: string = 'last_30_days'): Promise<BIReport> {
    try {
      const report: BIReport = {
        id: `report-${Date.now()}`,
        name: 'Reporte Ejecutivo Mensual',
        type: 'executive_summary',
        generated_at: new Date().toISOString(),
        period,
        executive_summary: 'El negocio muestra un crecimiento sólido del 15% en ventas, con mejoras significativas en satisfacción del cliente y eficiencia operativa.',
        key_findings: [
          'Crecimiento del 15% en ventas vs mes anterior',
          'Mejora del 23% en satisfacción del cliente',
          'Reducción del 12% en costos operativos',
          'Incremento del 8% en tasa de retención',
        ],
        recommendations: [
          'Expandir campañas de marketing exitosas',
          'Invertir en capacitación de servicio al cliente',
          'Optimizar procesos de supply chain',
          'Desarrollar programa de fidelización premium',
        ],
        metrics: [
          {
            name: 'Ventas Totales',
            value: 1250000,
            previous_value: 1087000,
            change_percentage: 15.0,
            trend: 'up',
            significance: 'high',
            business_interpretation: 'Crecimiento sólido impulsado por nuevas campañas de marketing',
          },
          {
            name: 'Satisfacción del Cliente',
            value: 4.6,
            previous_value: 4.2,
            change_percentage: 9.5,
            trend: 'up',
            significance: 'high',
            business_interpretation: 'Mejora significativa en experiencia del cliente',
          },
          {
            name: 'Costo Operativo',
            value: 850000,
            previous_value: 965000,
            change_percentage: -11.9,
            trend: 'down',
            significance: 'high',
            business_interpretation: 'Eficiencia operativa mejorada',
          },
        ],
        visualizations: [
          {
            type: 'chart',
            title: 'Tendencia de Ventas',
            description: 'Evolución de ventas en los últimos 12 meses',
            data: { chart_type: 'line', data_points: [/* datos simulados */] },
            business_insight: 'Tendencia de crecimiento consistente',
          },
          {
            type: 'metric',
            title: 'ROI de Marketing',
            description: 'Retorno de inversión en campañas de marketing',
            data: { value: 3.4, target: 2.5 },
            business_insight: 'ROI excede expectativas en 36%',
          },
        ],
        next_actions: [
          'Revisar presupuesto de marketing para Q2',
          'Implementar programa de capacitación de empleados',
          'Evaluar expansión a nuevos mercados',
        ],
        business_impact: 'Implementación de recomendaciones puede generar $200K adicionales en ventas trimestrales',
      }

      this.reports.push(report)
      logger.info({ reportId: report.id }, 'Reporte ejecutivo generado')
      return report
    } catch (error) {
      logger.error({ error }, 'Error al generar reporte ejecutivo')
      throw error
    }
  }

  async generateOperationalReport(period: string = 'last_7_days'): Promise<BIReport> {
    try {
      const report: BIReport = {
        id: `report-${Date.now()}`,
        name: 'Reporte Operacional Semanal',
        type: 'operational_report',
        generated_at: new Date().toISOString(),
        period,
        executive_summary: 'Operaciones funcionando eficientemente con mejoras en productividad y calidad.',
        key_findings: [
          'Productividad mejoró 8% vs semana anterior',
          'Tiempo de respuesta reducido 15%',
          'Calidad de producto mantiene estándares altos',
          'Satisfacción de empleados aumentó 5%',
        ],
        recommendations: [
          'Mantener protocolos de calidad actuales',
          'Continuar programa de capacitación',
          'Optimizar flujo de trabajo en línea de producción',
        ],
        metrics: [
          {
            name: 'Productividad',
            value: 92.5,
            previous_value: 85.7,
            change_percentage: 7.9,
            trend: 'up',
            significance: 'medium',
            business_interpretation: 'Mejora en eficiencia operativa',
          },
          {
            name: 'Tiempo de Respuesta',
            value: 2.3,
            previous_value: 2.7,
            change_percentage: -14.8,
            trend: 'down',
            significance: 'high',
            business_interpretation: 'Servicio al cliente más rápido',
          },
        ],
        visualizations: [],
        next_actions: [
          'Mantener protocolos actuales',
          'Monitorear métricas de calidad',
        ],
        business_impact: 'Mejoras operativas contribuyen a satisfacción del cliente',
      }

      this.reports.push(report)
      logger.info({ reportId: report.id }, 'Reporte operacional generado')
      return report
    } catch (error) {
      logger.error({ error }, 'Error al generar reporte operacional')
      throw error
    }
  }

  // ===== INSIGHTS AUTOMÁTICOS =====
  async generateAutoInsights(): Promise<AutoInsight[]> {
    try {
      const insights: AutoInsight[] = [
        {
          id: `insight-${Date.now()}`,
          type: 'opportunity',
          title: 'Segmento de alto valor identificado',
          description: 'Clientes entre 25-35 años muestran 40% mayor probabilidad de conversión',
          confidence: 0.89,
          business_impact: 'Potencial de $75K en ventas adicionales',
          data_points: ['Análisis de comportamiento', 'Patrones de compra', 'Segmentación demográfica'],
          recommendations: [
            'Crear campaña específica para este segmento',
            'Ajustar precios para maximizar conversión',
            'Desarrollar productos específicos',
          ],
          created_at: new Date().toISOString(),
          priority: 'high',
          status: 'new',
        },
        {
          id: `insight-${Date.now()}-2`,
          type: 'trend',
          title: 'Decrecimiento en conversión de nuevos clientes',
          description: 'Tendencia negativa del 8% en últimos 3 meses',
          confidence: 0.76,
          business_impact: 'Riesgo de pérdida de $25K mensuales',
          data_points: ['Métricas de conversión', 'Análisis temporal', 'Comparación con benchmarks'],
          recommendations: [
            'Revisar proceso de onboarding',
            'Optimizar landing pages',
            'Analizar competencia',
          ],
          created_at: new Date().toISOString(),
          priority: 'medium',
          status: 'new',
        },
        {
          id: `insight-${Date.now()}-3`,
          type: 'anomaly',
          title: 'Pico inusual en devoluciones',
          description: 'Incremento del 45% en devoluciones en la última semana',
          confidence: 0.94,
          business_impact: 'Pérdida estimada de $12K',
          data_points: ['Datos de devoluciones', 'Análisis de productos', 'Feedback de clientes'],
          recommendations: [
            'Investigar causa raíz inmediatamente',
            'Revisar calidad de productos',
            'Mejorar proceso de control de calidad',
          ],
          created_at: new Date().toISOString(),
          priority: 'high',
          status: 'new',
        },
      ]

      this.insights.push(...insights)
      logger.info({ count: insights.length }, 'Insights automáticos generados')
      return insights
    } catch (error) {
      logger.error({ error }, 'Error al generar insights automáticos')
      throw error
    }
  }

  async getInsights(): Promise<AutoInsight[]> {
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
  private generateDefaultFilters(category: BIDashboard['category']): BIFilter[] {
    const baseFilters: BIFilter[] = [
      {
        id: 'date_range',
        name: 'Rango de Fechas',
        type: 'date_range',
        field: 'created_at',
        default_value: 'last_30_days',
        required: true,
      },
    ]

    switch (category) {
      case 'executive':
        return [
          ...baseFilters,
          {
            id: 'business_unit',
            name: 'Unidad de Negocio',
            type: 'dropdown',
            field: 'business_unit',
            default_value: 'all',
            options: ['all', 'marketing', 'sales', 'operations', 'finance'],
            required: false,
          },
        ]
      case 'operational':
        return [
          ...baseFilters,
          {
            id: 'team',
            name: 'Equipo',
            type: 'dropdown',
            field: 'team',
            default_value: 'all',
            options: ['all', 'support', 'production', 'quality'],
            required: false,
          },
        ]
      default:
        return baseFilters
    }
  }

  private generateDefaultKPIs(category: BIDashboard['category']): KPI[] {
    const baseKPIs: KPI[] = [
      {
        id: 'revenue',
        name: 'Ingresos',
        description: 'Ingresos totales del período',
        current_value: 1250000,
        target_value: 1200000,
        unit: 'USD',
        trend: 'up',
        trend_percentage: 4.2,
        status: 'exceeded',
        last_updated: new Date().toISOString(),
        business_impact: 'Crecimiento saludable del negocio',
        owner: 'Director de Ventas',
      },
    ]

    switch (category) {
      case 'executive':
        return [
          ...baseKPIs,
          {
            id: 'customer_satisfaction',
            name: 'Satisfacción del Cliente',
            description: 'Score promedio de satisfacción',
            current_value: 4.6,
            target_value: 4.5,
            unit: 'score',
            trend: 'up',
            trend_percentage: 2.2,
            status: 'exceeded',
            last_updated: new Date().toISOString(),
            business_impact: 'Mejora en retención de clientes',
            owner: 'Director de Servicio al Cliente',
          },
        ]
      case 'operational':
        return [
          {
            id: 'productivity',
            name: 'Productividad',
            description: 'Eficiencia operativa',
            current_value: 92.5,
            target_value: 90.0,
            unit: '%',
            trend: 'up',
            trend_percentage: 2.8,
            status: 'exceeded',
            last_updated: new Date().toISOString(),
            business_impact: 'Mayor eficiencia en operaciones',
            owner: 'Gerente de Operaciones',
          },
        ]
      default:
        return baseKPIs
    }
  }

  private async generateDefaultWidgets(dashboard: BIDashboard): Promise<BIWidget[]> {
    const widgets: BIWidget[] = []

    switch (dashboard.category) {
      case 'executive':
        widgets.push(
          {
            id: `widget-${Date.now()}-1`,
            type: 'metric',
            title: 'Ingresos Totales',
            description: 'Ingresos del período actual',
            data_source: 'sales_data',
            config: { aggregation: 'sum', time_range: 'current_period' },
            business_insight: 'Crecimiento del 15% vs período anterior',
            trend: 'up',
            last_updated: new Date().toISOString(),
          },
          {
            id: `widget-${Date.now()}-2`,
            type: 'chart',
            title: 'Tendencia de Ventas',
            description: 'Evolución de ventas en el tiempo',
            data_source: 'sales_data',
            config: { chart_type: 'line', time_range: 'last_12_months' },
            business_insight: 'Tendencia de crecimiento consistente',
            trend: 'up',
            last_updated: new Date().toISOString(),
          }
        )
        break
      case 'operational':
        widgets.push(
          {
            id: `widget-${Date.now()}-3`,
            type: 'gauge',
            title: 'Productividad',
            description: 'Nivel de productividad actual',
            data_source: 'operations_data',
            config: { target_value: 90, warning_threshold: 85 },
            business_insight: 'Productividad excede objetivo en 2.5%',
            trend: 'up',
            last_updated: new Date().toISOString(),
          }
        )
        break
    }

    return widgets
  }

  private generateBusinessInsight(widgetType: BIWidget['type']): string {
    const insights = {
      metric: 'Métrica clave del negocio',
      chart: 'Visualización de tendencias importantes',
      table: 'Datos detallados para análisis',
      gauge: 'Indicador de rendimiento actual',
      funnel: 'Análisis de conversión',
      heatmap: 'Patrones de comportamiento',
    }
    return insights[widgetType] || 'Insight de negocio'
  }

  private generateTrend(): 'up' | 'down' | 'stable' {
    const trends: ('up' | 'down' | 'stable')[] = ['up', 'down', 'stable']
    return trends[Math.floor(Math.random() * trends.length)]
  }

  // ===== MÉTRICAS =====
  async getBIMetrics(): Promise<Record<string, unknown>> {
    return {
      total_dashboards: this.dashboards.length,
      total_reports: this.reports.length,
      total_insights: this.insights.length,
      dashboards_by_category: this.dashboards.reduce((acc, d) => {
        acc[d.category] = (acc[d.category] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      insights_by_type: this.insights.reduce((acc, i) => {
        acc[i.type] = (acc[i.type] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      insights_by_priority: this.insights.reduce((acc, i) => {
        acc[i.priority] = (acc[i.priority] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      average_widgets_per_dashboard: this.dashboards.length > 0 
        ? this.dashboards.reduce((sum, d) => sum + d.widgets.length, 0) / this.dashboards.length 
        : 0,
    }
  }

  // ===== TEMPLATES =====
  async getTemplates(): Promise<Array<{ id: string; name: string; type: string; description: string }>> {
    return [
      {
        id: 'executive-dashboard',
        name: 'Dashboard Ejecutivo',
        type: 'dashboard',
        description: 'Template para dashboard ejecutivo con KPIs principales'
      },
      {
        id: 'operational-dashboard',
        name: 'Dashboard Operacional',
        type: 'dashboard',
        description: 'Template para dashboard operacional con métricas de eficiencia'
      },
      {
        id: 'sales-report',
        name: 'Reporte de Ventas',
        type: 'report',
        description: 'Template para reportes de ventas y análisis de rendimiento'
      }
    ]
  }

  async getTemplateById(id: string): Promise<{ id: string; name: string; type: string; description: string; config: Record<string, unknown> } | null> {
    const templates = await this.getTemplates()
    const template = templates.find(t => t.id === id)
    
    if (!template) return null

    const config = {
      'executive-dashboard': {
        widgets: ['revenue', 'customer_satisfaction', 'sales_trend'],
        filters: ['date_range', 'business_unit'],
        kpis: ['revenue', 'customer_satisfaction', 'cost_efficiency']
      },
      'operational-dashboard': {
        widgets: ['productivity', 'quality_metrics', 'team_performance'],
        filters: ['date_range', 'team'],
        kpis: ['productivity', 'quality_score', 'response_time']
      },
      'sales-report': {
        sections: ['executive_summary', 'sales_analysis', 'recommendations'],
        metrics: ['total_sales', 'conversion_rate', 'customer_acquisition'],
        visualizations: ['sales_trend', 'funnel_analysis']
      }
    }

    return {
      ...template,
      config: config[id as keyof typeof config] || {}
    }
  }
}

export const businessIntelligenceService = new BusinessIntelligenceService() 