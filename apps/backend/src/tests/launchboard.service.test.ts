import { describe, it, expect, beforeEach, vi } from 'vitest'
import { launchboardService } from '../services/launchboard.service.js'
import { ApiError } from '../utils/ApiError.js'

// Mock de Supabase
vi.mock('../lib/supabase.js', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

// Mock del logger
vi.mock('../services/logger.service.js', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}))

// Importar después de los mocks
import { supabase } from '../lib/supabase.js'

describe('LaunchboardService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Factories para datos de prueba
  const createTestDashboard = (overrides = {}) => ({
    id: 'dashboard-1',
    name: 'Test Dashboard',
    description: 'Test Description',
    user_id: 'test-user-id',
    tenant_id: 'test-tenant',
    is_default: false,
    layout: {},
    settings: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  })

  const createTestWidget = (overrides = {}) => ({
    id: 'widget-1',
    dashboard_id: 'dashboard-1',
    name: 'Test Widget',
    type: 'chart',
    position: { x: 0, y: 0 },
    size: { width: 300, height: 200 },
    config: { chartType: 'line' },
    data: { value: 42 },
    refresh_interval: 300,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  })

  const createTestWidgetType = (overrides = {}) => ({
    id: 'widget-type-1',
    name: 'chart',
    display_name: 'Chart',
    description: 'Display data as charts',
    icon: 'chart-icon',
    category: 'visualization',
    config_schema: { type: 'object' },
    is_system: true,
    created_at: new Date().toISOString(),
    ...overrides,
  })

  describe('getDashboards', () => {
    it('should return all dashboards for user', async () => {
      const mockDashboards = [createTestDashboard(), createTestDashboard({ id: 'dashboard-2' })]
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({ data: mockDashboards, error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.getDashboards('test-user-id')

      expect(result).toEqual(mockDashboards)
      expect(supabase.from).toHaveBeenCalledWith('dashboards')
    })

    it('should handle database errors', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({ data: null, error: { message: 'DB Error' } }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      await expect(launchboardService.getDashboards('test-user-id')).rejects.toThrow(ApiError)
    })
  })

  describe('getDashboardById', () => {
    it('should return dashboard by id', async () => {
      const mockDashboard = createTestDashboard()
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: mockDashboard, error: null }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.getDashboardById('dashboard-1', 'test-user-id')

      expect(result).toEqual(mockDashboard)
      expect(supabase.from).toHaveBeenCalledWith('dashboards')
    })

    it('should return null for non-existent dashboard', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.getDashboardById('non-existent', 'test-user-id')

      expect(result).toBeNull()
    })
  })

  describe('createDashboard', () => {
    it('should create new dashboard', async () => {
      const dashboardData = {
        name: 'New Dashboard',
        description: 'New Description',
        is_default: true,
      }

      const mockDashboard = createTestDashboard(dashboardData)
      
      const mockQuery = {
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: mockDashboard, error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.createDashboard(dashboardData, 'test-user-id')

      expect(result).toEqual(mockDashboard)
      expect(supabase.from).toHaveBeenCalledWith('dashboards')
    })

    it('should throw error for missing name', async () => {
      const invalidData = {
        description: 'Missing name',
        is_default: true,
      } as any

      await expect(
        launchboardService.createDashboard(invalidData, 'test-user-id'),
      ).rejects.toThrow(ApiError)
    })
  })

  describe('updateDashboard', () => {
    it('should update dashboard', async () => {
      const updateData = {
        name: 'Updated Dashboard',
        is_default: true,
      }

      const mockDashboard = createTestDashboard(updateData)
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: mockDashboard, error: null }),
            }),
          }),
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              select: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockDashboard, error: null }),
              }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.updateDashboard('dashboard-1', updateData, 'test-user-id')

      expect(result).toEqual(mockDashboard)
      expect(supabase.from).toHaveBeenCalledWith('dashboards')
    })

    it('should return null for non-existent dashboard', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.updateDashboard('non-existent', { name: 'Updated' }, 'test-user-id')

      expect(result).toBeNull()
    })
  })

  describe('deleteDashboard', () => {
    it('should delete dashboard', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: createTestDashboard(), error: null }),
            }),
          }),
        }),
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.deleteDashboard('dashboard-1', 'test-user-id')

      expect(result).toBe(true)
      expect(supabase.from).toHaveBeenCalledWith('dashboards')
    })

    it('should return false for non-existent dashboard', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.deleteDashboard('non-existent', 'test-user-id')

      expect(result).toBe(false)
    })
  })

  describe('getWidgets', () => {
    it('should return widgets for dashboard', async () => {
      const mockWidgets = [createTestWidget(), createTestWidget({ id: 'widget-2' })]
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: createTestDashboard(), error: null }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const mockWidgetQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({ data: mockWidgets, error: null }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce(mockQuery)
        .mockReturnValueOnce(mockWidgetQuery)

      const result = await launchboardService.getWidgets('dashboard-1', 'test-user-id')

      expect(result).toEqual(mockWidgets)
      expect(supabase.from).toHaveBeenCalledWith('widgets')
    })

    it('should throw error for non-existent dashboard', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      await expect(launchboardService.getWidgets('non-existent', 'test-user-id')).rejects.toThrow(ApiError)
    })
  })

  describe('createWidget', () => {
    it('should create new widget', async () => {
      const widgetData = {
        dashboard_id: 'dashboard-1',
        name: 'New Widget',
        type: 'chart',
        config: { chartType: 'bar' },
      }

      const mockWidget = createTestWidget(widgetData)
      
      const mockDashboardQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: createTestDashboard(), error: null }),
            }),
          }),
        }),
      }

      const mockWidgetQuery = {
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: mockWidget, error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce(mockDashboardQuery)
        .mockReturnValueOnce(mockWidgetQuery)

      const result = await launchboardService.createWidget(widgetData, 'test-user-id')

      expect(result).toEqual(mockWidget)
      expect(supabase.from).toHaveBeenCalledWith('widgets')
    })

    it('should throw error for missing required fields', async () => {
      const invalidData = {
        dashboard_id: 'dashboard-1',
        // Missing name and type
      } as any

      await expect(
        launchboardService.createWidget(invalidData, 'test-user-id'),
      ).rejects.toThrow(ApiError)
    })

    it('should throw error for non-existent dashboard', async () => {
      const widgetData = {
        dashboard_id: 'non-existent',
        name: 'Test Widget',
        type: 'chart',
      }

      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      await expect(
        launchboardService.createWidget(widgetData, 'test-user-id'),
      ).rejects.toThrow(ApiError)
    })
  })

  describe('updateWidget', () => {
    it('should update widget', async () => {
      const updateData = {
        name: 'Updated Widget',
        config: { chartType: 'pie' },
      }

      const mockWidget = createTestWidget(updateData)
      
      const mockWidgetQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: { dashboard_id: 'dashboard-1' }, error: null }),
          }),
        }),
      }

      const mockDashboardQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: createTestDashboard(), error: null }),
            }),
          }),
        }),
      }

      const mockUpdateQuery = {
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: mockWidget, error: null }),
            }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce(mockWidgetQuery)
        .mockReturnValueOnce(mockDashboardQuery)
        .mockReturnValueOnce(mockUpdateQuery)

      const result = await launchboardService.updateWidget('widget-1', updateData, 'test-user-id')

      expect(result).toEqual(mockWidget)
      expect(supabase.from).toHaveBeenCalledWith('widgets')
    })

    it('should return null for non-existent widget', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.updateWidget('non-existent', { name: 'Updated' }, 'test-user-id')

      expect(result).toBeNull()
    })
  })

  describe('deleteWidget', () => {
    it('should delete widget', async () => {
      const mockWidgetQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: { dashboard_id: 'dashboard-1' }, error: null }),
          }),
        }),
      }

      const mockDashboardQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: createTestDashboard(), error: null }),
            }),
          }),
        }),
      }

      const mockDeleteQuery = {
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce(mockWidgetQuery)
        .mockReturnValueOnce(mockDashboardQuery)
        .mockReturnValueOnce(mockDeleteQuery)

      const result = await launchboardService.deleteWidget('widget-1', 'test-user-id')

      expect(result).toBe(true)
      expect(supabase.from).toHaveBeenCalledWith('widgets')
    })

    it('should return false for non-existent widget', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.deleteWidget('non-existent', 'test-user-id')

      expect(result).toBe(false)
    })
  })

  describe('getWidgetTypes', () => {
    it('should return all widget types', async () => {
      const mockWidgetTypes = [
        createTestWidgetType(),
        createTestWidgetType({ id: 'widget-type-2', name: 'table' }),
      ]
      
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({ data: mockWidgetTypes, error: null }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      const result = await launchboardService.getWidgetTypes()

      expect(result).toEqual(mockWidgetTypes)
      expect(supabase.from).toHaveBeenCalledWith('widget_types')
    })

    it('should handle database errors', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({ data: null, error: { message: 'DB Error' } }),
          }),
        }),
      }
      ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(mockQuery)

      await expect(launchboardService.getWidgetTypes()).rejects.toThrow(ApiError)
    })
  })
}) 