import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index-debug'
import { analyticsReportingService } from '../services/analytics-reporting.service'

// Factory para datos de reporte
function createTestReport(overrides = {}) {
  return {
    id: 'report-1',
    name: 'User Engagement',
    type: 'engagement',
    data: { users: 100, active: 80 },
    created_at: new Date().toISOString(),
    ...overrides,
  }
}

describe('Analytics Reporting Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(analyticsReportingService, 'getReports').mockResolvedValue([
      createTestReport(),
    ])
    vi.spyOn(analyticsReportingService, 'getReportById').mockImplementation(
      async (id: string) => (id === 'report-1' ? createTestReport() : null),
    )
    vi.spyOn(analyticsReportingService, 'createReport').mockResolvedValue(
      createTestReport(),
    )
    vi.spyOn(analyticsReportingService, 'deleteReport').mockImplementation(
      async (id: string) => id === 'report-1',
    )
  })

  describe('GET /analytics-reporting', () => {
    it('should return all reports', async () => {
      const res = await request(server).get('/api/analytics-reporting')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
  })

  describe('GET /analytics-reporting/:id', () => {
    it('should return a report by id', async () => {
      const res = await request(server).get('/api/analytics-reporting/report-1')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.id).toBe('report-1')
    })
    it('should return 404 for non-existent report', async () => {
      const res = await request(server).get('/api/analytics-reporting/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })

  describe('POST /analytics-reporting', () => {
    it('should create a report with valid data', async () => {
      const res = await request(server)
        .post('/api/analytics-reporting')
        .send({
          name: 'User Engagement',
          type: 'engagement',
          data: { users: 100, active: 80 },
        })
      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.name).toBe('User Engagement')
    })
    it('should return 400 for invalid data', async () => {
      const res = await request(server)
        .post('/api/analytics-reporting')
        .send({ name: '', type: '', data: {} })
      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
    })
  })

  describe('DELETE /analytics-reporting/:id', () => {
    it('should delete a report', async () => {
      const res = await request(server).delete('/api/analytics-reporting/report-1')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })
    it('should return 404 for non-existent report', async () => {
      const res = await request(server).delete('/api/analytics-reporting/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
    })
  })
}) 