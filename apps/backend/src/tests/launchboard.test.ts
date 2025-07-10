import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index.js'

// Factory para datos de dashboard
function createTestDashboard(
  overrides: Partial<TestDashboard> = {},
): TestDashboard {
  return {
    id: 'dashboard-1',
    name: 'Main Dashboard',
    widgets: [
      { id: 'widget-1', type: 'chart', data: { value: 42 } },
      { id: 'widget-2', type: 'table', data: { rows: [] } },
    ],
    ...overrides,
  }
}

// Tipos estrictos para test
interface TestDashboard {
  id: string
  name: string
  widgets: Array<{ id: string; type: string; data: object }>
}

describe('Launchboard Endpoints', () => {
  // Mock global de servicio
  const mockLaunchboardService = {
    getDashboards: vi.fn(),
    getDashboardById: vi.fn(),
    createDashboard: vi.fn(),
    updateDashboard: vi.fn(),
    deleteDashboard: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Aquí podrías hacer vi.mock('../services/launchboard.service.js', ...)
  })

  describe('GET /api/launchboard/dashboards', () => {
    it('should return all dashboards', async () => {
      mockLaunchboardService.getDashboards.mockResolvedValue([
        createTestDashboard(),
      ])
      // Aquí iría el mock real del servicio
      const res = await request(server).get('/api/launchboard/dashboards')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(Array.isArray(res.body.data)).toBe(true)
    })

    it('should return 404 for missing dashboards route', async () => {
      const res = await request(server).get('/api/launchboard/missing')
      expect(res.status).toBe(404)
    })
  })

  describe('GET /api/launchboard/dashboards/:id', () => {
    it('should return a dashboard by id', async () => {
      const dashboard = createTestDashboard()
      mockLaunchboardService.getDashboardById.mockResolvedValue(dashboard)
      const res = await request(server).get(
        `/api/launchboard/dashboards/${dashboard.id}`,
      )
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.id).toBe(dashboard.id)
      expect(res.body.data.name).toBe('Test Dashboard')
    })

    it('should return 404 for non-existent dashboard', async () => {
      mockLaunchboardService.getDashboardById.mockResolvedValue(null)
      const res = await request(server).get('/api/launchboard/dashboards/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /api/launchboard/dashboards', () => {
    it('should create a dashboard with valid data', async () => {
      const dashboard = createTestDashboard()
      mockLaunchboardService.createDashboard.mockResolvedValue(dashboard)
      const res = await request(server)
        .post('/api/launchboard/dashboards')
        .send({ name: dashboard.name, widgets: dashboard.widgets })
      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.name).toBe(dashboard.name)
      expect(res.body.data.widgets).toEqual(dashboard.widgets)
    })

    it('should return 400 for invalid data', async () => {
      const res = await request(server)
        .post('/api/launchboard/dashboards')
        .send({ name: '', widgets: [] })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })

  describe('PUT /api/launchboard/dashboards/:id', () => {
    it('should update a dashboard', async () => {
      const dashboard = createTestDashboard({ name: 'Updated Dashboard' })
      mockLaunchboardService.updateDashboard.mockResolvedValue(dashboard)
      const res = await request(server)
        .put(`/api/launchboard/dashboards/${dashboard.id}`)
        .send({ name: dashboard.name })
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.name).toBe('Updated Dashboard')
    })

    it('should return 404 for non-existent dashboard', async () => {
      mockLaunchboardService.updateDashboard.mockResolvedValue(null)
      const res = await request(server)
        .put('/api/launchboard/dashboards/nonexistent')
        .send({ name: 'Does not exist' })
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('DELETE /api/launchboard/dashboards/:id', () => {
    it('should delete a dashboard', async () => {
      mockLaunchboardService.deleteDashboard.mockResolvedValue(true)
      const res = await request(server).delete(
        '/api/launchboard/dashboards/dashboard-1',
      )
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })

    it('should return 404 for non-existent dashboard', async () => {
      mockLaunchboardService.deleteDashboard.mockResolvedValue(false)
      const res = await request(server).delete(
        '/api/launchboard/dashboards/nonexistent',
      )
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })
})
