import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index'

// Mock pino-http
vi.mock('pino-http', () => ({
  pinoHttp: vi.fn(() => vi.fn()),
}))

// Mock all external dependencies
vi.mock('../services/supabase.service.js', () => ({
  supabase: {
    from: vi.fn((table) => {
      // Simular error de validación para queries inválidas
      if (table === 'analytics') {
        return {
          insert: vi.fn(() => ({
            select: vi.fn(() =>
              Promise.resolve({
                data: [
                  {
                    id: 1,
                    event_name: 'test_event',
                    user_id: 1,
                    payload: {},
                    created_at: new Date().toISOString(),
                  },
                ],
                error: null,
              }),
            ),
          })),
          select: vi.fn(() => ({
            order: vi.fn(() => ({
              limit: vi.fn(() => ({
                range: vi.fn(() => ({
                  gte: vi.fn(() => ({
                    lte: vi.fn(() => ({
                      eq: vi.fn((col, val) => {
                        // Simular usuario no encontrado
                        if (col === 'user_id' && val === 9999) {
                          return Promise.resolve({ data: [], error: null })
                        }
                        // Simular error de validación para limit/offset inválidos
                        if (col === 'limit' && (val < 1 || val > 1000)) {
                          return Promise.resolve({
                            data: null,
                            error: { message: 'Invalid limit' },
                          })
                        }
                        if (col === 'offset' && val < 0) {
                          return Promise.resolve({
                            data: null,
                            error: { message: 'Invalid offset' },
                          })
                        }
                        return Promise.resolve({
                          data: [
                            {
                              id: 1,
                              event_name: 'page_view',
                              user_id: 1,
                              payload: { page: '/dashboard' },
                              created_at: new Date().toISOString(),
                            },
                          ],
                          error: null,
                        })
                      }),
                      like: vi.fn(() =>
                        Promise.resolve({
                          data: [
                            {
                              id: 1,
                              event_name: 'page_view',
                              user_id: 1,
                              payload: { page: '/dashboard' },
                              created_at: new Date().toISOString(),
                            },
                          ],
                          error: null,
                        }),
                      ),
                    })),
                  })),
                })),
              })),
            })),
          })),
        }
      }
      return {}
    }),
  },
}))

vi.mock('../services/logger.service.js', () => ({
  logAction: vi.fn(),
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    child: vi.fn(() => ({
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
    })),
  },
}))

vi.mock('../services/posthog.service.js', () => ({
  PostHogService: {
    captureEvent: vi.fn(),
  },
}))

vi.mock('../middleware/auth.middleware.js', () => ({
  authMiddleware: vi.fn((req, res, next) => {
    // Mock authentication - always succeed
    req.user = { id: 1, email: 'test@example.com' }
    next()
  }),
}))

describe('Analytics Module - Unit Tests', () => {
  const mockEventData = {
    event_name: 'test_event',
    user_id: 1,
    properties: {
      page: '/dashboard',
      referrer: 'google.com',
    },
  }

  const mockMetricData = {
    metric_name: 'session_duration',
    value: 300,
    user_id: 1,
    tags: {
      browser: 'chrome',
      os: 'macos',
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('POST /analytics/track/event', () => {
    it('should track an event successfully', async () => {
      const response = await request(server)
        .post('/api/analytics/track/event')
        .send(mockEventData)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.event_name).toBe('test_event')
    })

    it('should track an anonymous event', async () => {
      const anonymousEventData = {
        event_name: 'button_click',
        properties: {
          button: 'signup',
          location: 'header',
        },
      }

      const response = await request(server)
        .post('/api/analytics/track/event')
        .send(anonymousEventData)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
    })

    it('should return 400 for missing event_name', async () => {
      const invalidEventData = {
        user_id: 1,
        properties: { test: 'data' },
      }

      const response = await request(server)
        .post('/api/analytics/track/event')
        .send(invalidEventData)

      console.log('Response status:', response.status)
      console.log('Response body:', response.body)

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body.error).toBeDefined()
    })

    it('should return 400 for invalid event data', async () => {
      const invalidEventData = {
        event_name: 123, // Should be string
        user_id: 1,
      }

      const response = await request(server)
        .post('/api/analytics/track/event')
        .send(invalidEventData)

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })
  })

  describe('POST /analytics/track/metric', () => {
    it('should track a metric successfully', async () => {
      const response = await request(server)
        .post('/api/analytics/track/metric')
        .send(mockMetricData)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
    })

    it('should track an anonymous metric', async () => {
      const anonymousMetricData = {
        metric_name: 'page_load_time',
        value: 1.5,
        tags: {
          page: '/home',
        },
      }

      const response = await request(server)
        .post('/api/analytics/track/metric')
        .send(anonymousMetricData)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
    })

    it('should return 400 for missing metric_name', async () => {
      const invalidMetricData = {
        value: 300,
        user_id: 1,
        tags: { test: 'data' },
      }

      const response = await request(server)
        .post('/api/analytics/track/metric')
        .send(invalidMetricData)

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })

    it('should return 400 for invalid metric value', async () => {
      const invalidMetricData = {
        metric_name: 'session_duration',
        value: 'not-a-number', // Should be number
        user_id: 1,
      }

      const response = await request(server)
        .post('/api/analytics/track/metric')
        .send(invalidMetricData)

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })
  })

  describe('GET /analytics/events', () => {
    it('should get events with filtering', async () => {
      const response = await request(server).get('/api/analytics/events').query({
        event_name: 'page_view',
        limit: '10', // String should be converted to number
        offset: '0', // String should be converted to number
      })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeInstanceOf(Array)
    })

    it('should get events with date filtering', async () => {
      const response = await request(server).get('/api/analytics/events').query({
        start_date: '2025-01-01',
        end_date: '2025-12-31',
        limit: '10',
      })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeInstanceOf(Array)
    })

    it('should return 400 for invalid limit', async () => {
      const response = await request(server).get('/api/analytics/events').query({
        limit: 'invalid-number',
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })

    it('should return 400 for invalid offset', async () => {
      const response = await request(server).get('/api/analytics/events').query({
        offset: 'invalid-number',
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })

    it('should return 400 for limit out of range', async () => {
      const response = await request(server).get('/api/analytics/events').query({
        limit: '2000', // Should be max 1000
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })
  })

  describe('GET /analytics/metrics', () => {
    it('should get metrics with filtering', async () => {
      const response = await request(server).get('/api/analytics/metrics').query({
        limit: '10',
        offset: '0',
      })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeInstanceOf(Array)
    })

    it('should return 400 for invalid query parameters', async () => {
      const response = await request(server).get('/api/analytics/metrics').query({
        limit: 'not-a-number',
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })
  })

  describe('GET /analytics/summary', () => {
    it('should get analytics summary', async () => {
      const response = await request(server).get('/api/analytics/summary')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('total_events')
      expect(response.body.data).toHaveProperty('unique_users')
      expect(response.body.data).toHaveProperty('top_events')
      expect(response.body.data).toHaveProperty('daily_events')
    })

    it('should get analytics summary with date range', async () => {
      const response = await request(server).get('/api/analytics/summary').query({
        start_date: '2025-01-01',
        end_date: '2025-12-31',
      })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('total_events')
    })
  })

  describe('GET /analytics/users/:userId', () => {
    it('should get user analytics', async () => {
      const response = await request(server).get('/api/analytics/users/1')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('user_id', '1')
      expect(response.body.data).toHaveProperty('total_events')
      expect(response.body.data).toHaveProperty('last_seen')
      expect(response.body.data).toHaveProperty('events_breakdown')
    })

    it('should return 404 for non-existent user data', async () => {
      const response = await request(server).get(
        '/api/analytics/users/non-existent-user',
      )

      expect(response.status).toBe(404)
    })
  })

  describe('Legacy endpoints', () => {
    it('should get all analytics with query', async () => {
      const response = await request(server)
        .get('/api/analytics')
        .query({ limit: '10' })

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })

    it('should create analytics', async () => {
      const analyticsData = {
        event_name: 'test_event',
        payload: { test: 'data' },
        user_id: 1,
      }

      const response = await request(server).post('/api/analytics').send(analyticsData)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('event_name', 'test_event')
    })

    it('should return 400 for invalid analytics data', async () => {
      const invalidData = {
        event_name: 123, // Should be string
        payload: { test: 'data' },
      }

      const response = await request(server).post('/api/analytics').send(invalidData)

      expect(response.status).toBe(400)
    })
  })
})
