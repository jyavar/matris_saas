import { supabase } from '../lib/supabase.js'
import { ApiError } from '../utils/ApiError.js'
import logger from './logger.service.js'

// Tipos estrictos para Launchboard
export interface Widget {
  id: string
  dashboard_id: string
  name: string
  type: string
  position: Record<string, unknown>
  size: Record<string, unknown>
  config: Record<string, unknown>
  data: Record<string, unknown>
  refresh_interval: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Dashboard {
  id: string
  name: string
  description?: string
  user_id: string
  tenant_id?: string
  is_default: boolean
  layout: Record<string, unknown>
  settings: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface WidgetType {
  id: string
  name: string
  display_name: string
  description?: string
  icon?: string
  category: string
  config_schema: Record<string, unknown>
  is_system: boolean
  created_at: string
}

export interface CreateDashboardData {
  name: string
  description?: string
  is_default?: boolean
  layout?: Record<string, unknown>
  settings?: Record<string, unknown>
}

export interface UpdateDashboardData {
  name?: string
  description?: string
  is_default?: boolean
  layout?: Record<string, unknown>
  settings?: Record<string, unknown>
}

export interface CreateWidgetData {
  dashboard_id: string
  name: string
  type: string
  position?: Record<string, unknown>
  size?: Record<string, unknown>
  config?: Record<string, unknown>
  refresh_interval?: number
}

export interface UpdateWidgetData {
  name?: string
  position?: Record<string, unknown>
  size?: Record<string, unknown>
  config?: Record<string, unknown>
  data?: Record<string, unknown>
  refresh_interval?: number
  is_active?: boolean
}

export class LaunchboardService {
  /**
   * Obtiene todos los dashboards de un usuario
   */
  async getDashboards(userId: string): Promise<Dashboard[]> {
    try {
      const { data, error } = await supabase
        .from('dashboards')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        logger.error({ error }, 'Error fetching dashboards')
        throw new ApiError('Failed to fetch dashboards', 500)
      }

      return data || []
    } catch (err) {
      logger.error({ _error: err }, 'Error in getDashboards')
      throw err
    }
  }

  /**
   * Obtiene un dashboard por ID
   */
  async getDashboardById(id: string, userId: string): Promise<Dashboard | null> {
    try {
      const { data, error } = await supabase
        .from('dashboards')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // No encontrado
        }
        logger.error({ error }, 'Error fetching dashboard')
        throw new ApiError('Failed to fetch dashboard', 500)
      }

      return data
    } catch (error) {
      logger.error({ error, id }, 'Error in getDashboardById')
      throw error
    }
  }

  /**
   * Crea un nuevo dashboard
   */
  async createDashboard(
    dashboardData: CreateDashboardData,
    userId: string,
    tenantId?: string,
  ): Promise<Dashboard> {
    try {
      // Validar datos requeridos
      if (!dashboardData.name) {
        throw new ApiError('Name is required', 400)
      }

      const dashboard: Omit<Dashboard, 'id' | 'created_at' | 'updated_at'> = {
        name: dashboardData.name,
        description: dashboardData.description,
        user_id: userId,
        tenant_id: tenantId,
        is_default: dashboardData.is_default || false,
        layout: dashboardData.layout || {},
        settings: dashboardData.settings || {},
      }

      const { data, error } = await supabase
        .from('dashboards')
        .insert(dashboard)
        .select()
        .single()

      if (error) {
        logger.error({ error }, 'Error creating dashboard')
        throw new ApiError('Failed to create dashboard', 500)
      }

      logger.info(
        { dashboardId: data.id, userId },
        'Dashboard created successfully',
      )
      return data
    } catch (error) {
      logger.error({ error }, 'Error in createDashboard')
      throw error
    }
  }

  /**
   * Actualiza un dashboard existente
   */
  async updateDashboard(
    id: string,
    updateData: UpdateDashboardData,
    userId: string,
  ): Promise<Dashboard | null> {
    try {
      // Verificar que el dashboard existe y pertenece al usuario
      const existingDashboard = await this.getDashboardById(id, userId)
      if (!existingDashboard) {
        return null
      }

      // Preparar datos de actualización
      const updatePayload: Partial<Dashboard> = {
        updated_at: new Date().toISOString(),
      }

      if (updateData.name !== undefined) updatePayload.name = updateData.name
      if (updateData.description !== undefined) updatePayload.description = updateData.description
      if (updateData.is_default !== undefined) updatePayload.is_default = updateData.is_default
      if (updateData.layout !== undefined) updatePayload.layout = updateData.layout
      if (updateData.settings !== undefined) updatePayload.settings = updateData.settings

      const { data, error } = await supabase
        .from('dashboards')
        .update(updatePayload)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) {
        logger.error({ error, id, updateData }, 'Error updating dashboard')
        throw new ApiError('Failed to update dashboard', 500)
      }

      logger.info({ dashboardId: id }, 'Dashboard updated successfully')
      return data
    } catch (error) {
      logger.error({ error, id, updateData }, 'Error in updateDashboard')
      throw error
    }
  }

  /**
   * Elimina un dashboard
   */
  async deleteDashboard(id: string, userId: string): Promise<boolean> {
    try {
      // Verificar que el dashboard existe y pertenece al usuario
      const existingDashboard = await this.getDashboardById(id, userId)
      if (!existingDashboard) {
        return false
      }

      const { error } = await supabase
        .from('dashboards')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)

      if (error) {
        logger.error({ error, id }, 'Error deleting dashboard')
        throw new ApiError('Failed to delete dashboard', 500)
      }

      logger.info({ dashboardId: id }, 'Dashboard deleted successfully')
      return true
    } catch (error) {
      logger.error({ error, id }, 'Error in deleteDashboard')
      throw error
    }
  }

  /**
   * Obtiene todos los widgets de un dashboard
   */
  async getWidgets(dashboardId: string, userId: string): Promise<Widget[]> {
    try {
      // Verificar que el dashboard pertenece al usuario
      const dashboard = await this.getDashboardById(dashboardId, userId)
      if (!dashboard) {
        throw new ApiError('Dashboard not found', 404)
      }

      const { data, error } = await supabase
        .from('widgets')
        .select('*')
        .eq('dashboard_id', dashboardId)
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (error) {
        logger.error({ error }, 'Error fetching widgets')
        throw new ApiError('Failed to fetch widgets', 500)
      }

      return data || []
    } catch (err) {
      logger.error({ _error: err }, 'Error in getWidgets')
      throw err
    }
  }

  /**
   * Crea un nuevo widget
   */
  async createWidget(
    widgetData: CreateWidgetData,
    userId: string,
  ): Promise<Widget> {
    try {
      // Verificar que el dashboard pertenece al usuario
      const dashboard = await this.getDashboardById(widgetData.dashboard_id, userId)
      if (!dashboard) {
        throw new ApiError('Dashboard not found', 404)
      }

      // Validar datos requeridos
      if (!widgetData.name || !widgetData.type) {
        throw new ApiError('Name and type are required', 400)
      }

      const widget: Omit<Widget, 'id' | 'created_at' | 'updated_at'> = {
        dashboard_id: widgetData.dashboard_id,
        name: widgetData.name,
        type: widgetData.type,
        position: widgetData.position || {},
        size: widgetData.size || {},
        config: widgetData.config || {},
        data: {},
        refresh_interval: widgetData.refresh_interval || 300,
        is_active: true,
      }

      const { data, error } = await supabase
        .from('widgets')
        .insert(widget)
        .select()
        .single()

      if (error) {
        logger.error({ error }, 'Error creating widget')
        throw new ApiError('Failed to create widget', 500)
      }

      logger.info(
        { widgetId: data.id, dashboardId: widgetData.dashboard_id },
        'Widget created successfully',
      )
      return data
    } catch (error) {
      logger.error({ error }, 'Error in createWidget')
      throw error
    }
  }

  /**
   * Actualiza un widget
   */
  async updateWidget(
    id: string,
    updateData: UpdateWidgetData,
    userId: string,
  ): Promise<Widget | null> {
    try {
      // Obtener el widget y verificar que pertenece a un dashboard del usuario
      const { data: widget, error: widgetError } = await supabase
        .from('widgets')
        .select('dashboard_id')
        .eq('id', id)
        .single()

      if (widgetError || !widget) {
        return null
      }

      const dashboard = await this.getDashboardById(widget.dashboard_id, userId)
      if (!dashboard) {
        return null
      }

      // Preparar datos de actualización
      const updatePayload: Partial<Widget> = {
        updated_at: new Date().toISOString(),
      }

      if (updateData.name !== undefined) updatePayload.name = updateData.name
      if (updateData.position !== undefined) updatePayload.position = updateData.position
      if (updateData.size !== undefined) updatePayload.size = updateData.size
      if (updateData.config !== undefined) updatePayload.config = updateData.config
      if (updateData.data !== undefined) updatePayload.data = updateData.data
      if (updateData.refresh_interval !== undefined) updatePayload.refresh_interval = updateData.refresh_interval
      if (updateData.is_active !== undefined) updatePayload.is_active = updateData.is_active

      const { data, error } = await supabase
        .from('widgets')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        logger.error({ error, id, updateData }, 'Error updating widget')
        throw new ApiError('Failed to update widget', 500)
      }

      logger.info({ widgetId: id }, 'Widget updated successfully')
      return data
    } catch (error) {
      logger.error({ error, id, updateData }, 'Error in updateWidget')
      throw error
    }
  }

  /**
   * Elimina un widget
   */
  async deleteWidget(id: string, userId: string): Promise<boolean> {
    try {
      // Obtener el widget y verificar que pertenece a un dashboard del usuario
      const { data: widget, error: widgetError } = await supabase
        .from('widgets')
        .select('dashboard_id')
        .eq('id', id)
        .single()

      if (widgetError || !widget) {
        return false
      }

      const dashboard = await this.getDashboardById(widget.dashboard_id, userId)
      if (!dashboard) {
        return false
      }

      const { error } = await supabase
        .from('widgets')
        .delete()
        .eq('id', id)

      if (error) {
        logger.error({ error, id }, 'Error deleting widget')
        throw new ApiError('Failed to delete widget', 500)
      }

      logger.info({ widgetId: id }, 'Widget deleted successfully')
      return true
    } catch (error) {
      logger.error({ error, id }, 'Error in deleteWidget')
      throw error
    }
  }

  /**
   * Obtiene todos los tipos de widgets disponibles
   */
  async getWidgetTypes(): Promise<WidgetType[]> {
    try {
      const { data, error } = await supabase
        .from('widget_types')
        .select('*')
        .order('category', { ascending: true })
        .order('display_name', { ascending: true })

      if (error) {
        logger.error({ error }, 'Error fetching widget types')
        throw new ApiError('Failed to fetch widget types', 500)
      }

      return data || []
    } catch (err) {
      logger.error({ _error: err }, 'Error in getWidgetTypes')
      throw err
    }
  }
}

export const launchboardService = new LaunchboardService()
