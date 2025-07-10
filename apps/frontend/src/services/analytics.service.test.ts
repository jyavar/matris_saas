import { describe, it, expect, vi, beforeEach, type MockInstance } from 'vitest'
import { AnalyticsService } from './analytics.service'
import type { 
  AnalyticsEvent, 
  AnalyticsMetric, 
  AnalyticsSummary, 
  UserAnalytics,
  TrackEventRequest,
  TrackMetricRequest,
  AnalyticsQuery
} from './analytics.service'

// Mock getSessionToken
vi.mock('@/lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-token'))
}))

describe('AnalyticsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  describe('trackEvent', () => {
    it('should track event successfully', async () => {
      const mockEvent: AnalyticsEvent = {
        id: 1,
        event_name: 'test_event',
        user_id: 123,
        payload: { test: 'data' },
        created_at: '2024-01-01T00:00:00Z'
      }

      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockEvent)
      })

      const request: TrackEventRequest = {
        event_name: 'test_event',
        user_id: 123,
        properties: { test: 'data' }
      }

      const result = await AnalyticsService.trackEvent(request)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockEvent)
      expect(global.fetch).toHaveBeenCalledWith('/api/analytics/track/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-token'
        },
        body: JSON.stringify(request)
      })
    })

    it('should handle error response', async () => {
      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'Bad request' })
      })

      const request: TrackEventRequest = {
        event_name: 'test_event'
      }

      const result = await AnalyticsService.trackEvent(request)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Bad request')
    })

    it('should handle network error', async () => {
      ;(global.fetch as unknown as MockInstance).mockRejectedValueOnce(new Error('Network error'))

      const request: TrackEventRequest = {
        event_name: 'test_event'
      }

      const result = await AnalyticsService.trackEvent(request)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Network error')
    })
  })

  describe('trackMetric', () => {
    it('should track metric successfully', async () => {
      const mockMetric: AnalyticsMetric = {
        id: 1,
        metric_name: 'test_metric',
        value: 42,
        user_id: 123,
        tags: { category: 'test' },
        created_at: '2024-01-01T00:00:00Z'
      }

      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockMetric)
      })

      const request: TrackMetricRequest = {
        metric_name: 'test_metric',
        value: 42,
        user_id: 123,
        tags: { category: 'test' }
      }

      const result = await AnalyticsService.trackMetric(request)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockMetric)
      expect(global.fetch).toHaveBeenCalledWith('/api/analytics/track/metric', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-token'
        },
        body: JSON.stringify(request)
      })
    })
  })

  describe('getEvents', () => {
    it('should get events successfully', async () => {
      const mockEvents: AnalyticsEvent[] = [
        {
          id: 1,
          event_name: 'event1',
          created_at: '2024-01-01T00:00:00Z'
        }
      ]

      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockEvents)
      })

      const result = await AnalyticsService.getEvents()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockEvents)
      expect(global.fetch).toHaveBeenCalledWith('/api/analytics/events?', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-token'
        }
      })
    })

    it('should get events with query parameters', async () => {
      const mockEvents: AnalyticsEvent[] = []
      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockEvents)
      })

      const query: AnalyticsQuery = {
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        event_name: 'test_event',
        user_id: 123,
        limit: 50,
        offset: 0
      }

      const result = await AnalyticsService.getEvents(query)

      expect(result.success).toBe(true)
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/analytics/events?startDate=2024-01-01&endDate=2024-01-31&event_name=test_event&user_id=123&limit=50&offset=0',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer mock-token'
          }
        }
      )
    })
  })

  describe('getMetrics', () => {
    it('should get metrics successfully', async () => {
      const mockMetrics: AnalyticsMetric[] = [
        {
          id: 1,
          metric_name: 'metric1',
          value: 100,
          created_at: '2024-01-01T00:00:00Z'
        }
      ]

      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockMetrics)
      })

      const result = await AnalyticsService.getMetrics()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockMetrics)
      expect(global.fetch).toHaveBeenCalledWith('/api/analytics/metrics?', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-token'
        }
      })
    })
  })

  describe('getAnalyticsSummary', () => {
    it('should get analytics summary successfully', async () => {
      const mockSummary: AnalyticsSummary = {
        total_events: 1000,
        unique_users: 500,
        top_events: [
          { event_name: 'page_view', count: 300 }
        ],
        daily_events: [
          { date: '2024-01-01', count: 50 }
        ]
      }

      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSummary)
      })

      const result = await AnalyticsService.getAnalyticsSummary()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockSummary)
      expect(global.fetch).toHaveBeenCalledWith('/api/analytics/summary', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-token'
        }
      })
    })
  })

  describe('getUserAnalytics', () => {
    it('should get user analytics successfully', async () => {
      const mockUserAnalytics: UserAnalytics = {
        user_id: 'user123',
        total_events: 50,
        last_seen: '2024-01-01T00:00:00Z',
        events_breakdown: [
          { event_name: 'page_view', count: 30 }
        ]
      }

      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUserAnalytics)
      })

      const result = await AnalyticsService.getUserAnalytics('user123')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockUserAnalytics)
      expect(global.fetch).toHaveBeenCalledWith('/api/analytics/users/user123', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-token'
        }
      })
    })
  })

  describe('getAllAnalytics', () => {
    it('should get all analytics successfully', async () => {
      const mockAnalytics: AnalyticsEvent[] = [
        {
          id: 1,
          event_name: 'event1',
          created_at: '2024-01-01T00:00:00Z'
        }
      ]

      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockAnalytics)
      })

      const result = await AnalyticsService.getAllAnalytics()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockAnalytics)
      expect(global.fetch).toHaveBeenCalledWith('/api/analytics', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-token'
        }
      })
    })
  })
}) 