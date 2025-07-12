import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index.js'

// Mock del middleware de autenticación
vi.mock('../middleware/auth.middleware', () => ({
  authMiddleware: vi.fn((_req: any, _res: any, next: () => void) => {
    // Simular usuario autenticado
    _req._user = { id: 'test-user-id', email: 'test@example.com' }
    next()
  }),
}))

// Mock del servicio de launchboard
vi.mock('../services/launchboard.service', () => ({
  launchboardService: {
    getDashboards: vi.fn(),
    getDashboardById: vi.fn(),
    createDashboard: vi.fn(),
    updateDashboard: vi.fn(),
    deleteDashboard: vi.fn(),
    getWidgets: vi.fn(),
    createWidget: vi.fn(),
    updateWidget: vi.fn(),
    deleteWidget: vi.fn(),
    getWidgetTypes: vi.fn(),
  },
}))

// Importar después de los mocks
import { launchboardService } from '../services/launchboard.service.js'

describe('Launchboard Endpoints', () => {
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

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/launchboard/dashboards', () => {
    it('should return all dashboards for authenticated user', async () => {
      const mockDashboards = [createTestDashboard(), createTestDashboard({ id: 'dashboard-2' })]
      ;(launchboardService.getDashboards as any).mockResolvedValue(mockDashboards)

      const res = await request(server)
        .get('/api/launchboard/dashboards')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockDashboards)
      expect(launchboardService.getDashboards).toHaveBeenCalledWith('test-user-id')
    })

    it('should return 401 for unauthenticated user', async () => {
      // Mock sin usuario autenticado
      vi.mocked(require('../middleware/auth.middleware').authMiddleware).mockImplementationOnce(
        (_req: any, _res: any, next: () => void) => {
          // No establecer usuario autenticado
          next()
        }
      )

      const res = await request(server).get('/api/launchboard/dashboards')

      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })
  })

  describe('GET /api/launchboard/dashboards/:id', () => {
    it('should return dashboard by id for authenticated user', async () => {
      const mockDashboard = createTestDashboard()
      ;(launchboardService.getDashboardById as any).mockResolvedValue(mockDashboard)

      const res = await request(server)
        .get('/api/launchboard/dashboards/dashboard-1')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockDashboard)
      expect(launchboardService.getDashboardById).toHaveBeenCalledWith('dashboard-1', 'test-user-id')
    })

    it('should return 404 for non-existent dashboard', async () => {
      ;(launchboardService.getDashboardById as any).mockResolvedValue(null)

      const res = await request(server)
        .get('/api/launchboard/dashboards/nonexistent')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })

    it('should return 400 for missing dashboard id', async () => {
      const res = await request(server)
        .get('/api/launchboard/dashboards/')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(404)
    })
  })

  describe('POST /api/launchboard/dashboards', () => {
    it('should create dashboard with valid data', async () => {
      const dashboardData = {
        name: 'New Dashboard',
        description: 'New Description',
        is_default: true,
      }
      const mockDashboard = createTestDashboard(dashboardData)
      ;(launchboardService.createDashboard as any).mockResolvedValue(mockDashboard)

      const res = await request(server)
        .post('/api/launchboard/dashboards')
        .set('Authorization', 'Bearer test-token')
        .send(dashboardData)

      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockDashboard)
      expect(launchboardService.createDashboard).toHaveBeenCalledWith(dashboardData, 'test-user-id')
    })

    it('should return 400 for invalid data', async () => {
      const invalidData = { description: 'Missing name' }

      const res = await request(server)
        .post('/api/launchboard/dashboards')
        .set('Authorization', 'Bearer test-token')
        .send(invalidData)

      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })

  describe('PUT /api/launchboard/dashboards/:id', () => {
    it('should update dashboard with valid data', async () => {
      const updateData = { name: 'Updated Dashboard' }
      const mockDashboard = createTestDashboard(updateData)
      ;(launchboardService.updateDashboard as any).mockResolvedValue(mockDashboard)

      const res = await request(server)
        .put('/api/launchboard/dashboards/dashboard-1')
        .set('Authorization', 'Bearer test-token')
        .send(updateData)

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockDashboard)
      expect(launchboardService.updateDashboard).toHaveBeenCalledWith('dashboard-1', updateData, 'test-user-id')
    })

    it('should return 404 for non-existent dashboard', async () => {
      ;(launchboardService.updateDashboard as any).mockResolvedValue(null)

      const res = await request(server)
        .put('/api/launchboard/dashboards/nonexistent')
        .set('Authorization', 'Bearer test-token')
        .send({ name: 'Updated' })

      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('DELETE /api/launchboard/dashboards/:id', () => {
    it('should delete dashboard', async () => {
      ;(launchboardService.deleteDashboard as any).mockResolvedValue(true)

      const res = await request(server)
        .delete('/api/launchboard/dashboards/dashboard-1')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(launchboardService.deleteDashboard).toHaveBeenCalledWith('dashboard-1', 'test-user-id')
    })

    it('should return 404 for non-existent dashboard', async () => {
      ;(launchboardService.deleteDashboard as any).mockResolvedValue(false)

      const res = await request(server)
        .delete('/api/launchboard/dashboards/nonexistent')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('GET /api/launchboard/dashboards/:id/widgets', () => {
    it('should return widgets for dashboard', async () => {
      const mockWidgets = [createTestWidget(), createTestWidget({ id: 'widget-2' })]
      ;(launchboardService.getWidgets as any).mockResolvedValue(mockWidgets)

      const res = await request(server)
        .get('/api/launchboard/dashboards/dashboard-1/widgets')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockWidgets)
      expect(launchboardService.getWidgets).toHaveBeenCalledWith('dashboard-1', 'test-user-id')
    })
  })

  describe('POST /api/launchboard/widgets', () => {
    it('should create widget with valid data', async () => {
      const widgetData = {
        dashboard_id: 'dashboard-1',
        name: 'New Widget',
        type: 'chart',
        config: { chartType: 'bar' },
      }
      const mockWidget = createTestWidget(widgetData)
      ;(launchboardService.createWidget as any).mockResolvedValue(mockWidget)

      const res = await request(server)
        .post('/api/launchboard/widgets')
        .set('Authorization', 'Bearer test-token')
        .send(widgetData)

      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockWidget)
      expect(launchboardService.createWidget).toHaveBeenCalledWith(widgetData, 'test-user-id')
    })

    it('should return 400 for invalid data', async () => {
      const invalidData = { dashboard_id: 'dashboard-1' } // Missing name and type

      const res = await request(server)
        .post('/api/launchboard/widgets')
        .set('Authorization', 'Bearer test-token')
        .send(invalidData)

      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })

  describe('PUT /api/launchboard/widgets/:id', () => {
    it('should update widget with valid data', async () => {
      const updateData = { name: 'Updated Widget', config: { chartType: 'pie' } }
      const mockWidget = createTestWidget(updateData)
      ;(launchboardService.updateWidget as any).mockResolvedValue(mockWidget)

      const res = await request(server)
        .put('/api/launchboard/widgets/widget-1')
        .set('Authorization', 'Bearer test-token')
        .send(updateData)

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockWidget)
      expect(launchboardService.updateWidget).toHaveBeenCalledWith('widget-1', updateData, 'test-user-id')
    })

    it('should return 404 for non-existent widget', async () => {
      ;(launchboardService.updateWidget as any).mockResolvedValue(null)

      const res = await request(server)
        .put('/api/launchboard/widgets/nonexistent')
        .set('Authorization', 'Bearer test-token')
        .send({ name: 'Updated' })

      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('DELETE /api/launchboard/widgets/:id', () => {
    it('should delete widget', async () => {
      ;(launchboardService.deleteWidget as any).mockResolvedValue(true)

      const res = await request(server)
        .delete('/api/launchboard/widgets/widget-1')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(launchboardService.deleteWidget).toHaveBeenCalledWith('widget-1', 'test-user-id')
    })

    it('should return 404 for non-existent widget', async () => {
      ;(launchboardService.deleteWidget as any).mockResolvedValue(false)

      const res = await request(server)
        .delete('/api/launchboard/widgets/nonexistent')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('GET /api/launchboard/widget-types', () => {
    it('should return all widget types', async () => {
      const mockWidgetTypes = [
        createTestWidgetType(),
        createTestWidgetType({ id: 'widget-type-2', name: 'table' }),
      ]
      ;(launchboardService.getWidgetTypes as any).mockResolvedValue(mockWidgetTypes)

      const res = await request(server).get('/api/launchboard/widget-types')

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockWidgetTypes)
      expect(launchboardService.getWidgetTypes).toHaveBeenCalled()
    })
  })

  describe('Legacy routes', () => {
    it('should handle legacy GET /api/launchboard route', async () => {
      const mockDashboards = [createTestDashboard()]
      ;(launchboardService.getDashboards as any).mockResolvedValue(mockDashboards)

      const res = await request(server)
        .get('/api/launchboard')
        .set('Authorization', 'Bearer test-token')

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockDashboards)
    })

    it('should handle legacy POST /api/launchboard route', async () => {
      const dashboardData = { name: 'Legacy Dashboard' }
      const mockDashboard = createTestDashboard(dashboardData)
      ;(launchboardService.createDashboard as any).mockResolvedValue(mockDashboard)

      const res = await request(server)
        .post('/api/launchboard')
        .set('Authorization', 'Bearer test-token')
        .send(dashboardData)

      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockDashboard)
    })
  })
})
