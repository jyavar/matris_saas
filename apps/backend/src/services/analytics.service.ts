import { TablesInsert, TablesUpdate } from '@repo/db-types'
import { z } from 'zod'

import { ApiError } from '../utils/ApiError.js'
import { logAction } from './logger.service.js'
import { supabase } from './supabase.service.js'

// Schemas
export const eventSchema = z.object({
  event_name: z.string(),
  user_id: z.string().optional(),
  properties: z.record(z.any()).optional(),
  timestamp: z.date().optional(),
})

export const metricSchema = z.object({
  metric_name: z.string(),
  value: z.number(),
  user_id: z.string().optional(),
  tags: z.record(z.string()).optional(),
  timestamp: z.date().optional(),
})

export const analyticsQuerySchema = z.object({
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  event_name: z.string().optional(),
  user_id: z.string().optional(),
  limit: z.number().min(1).max(1000).default(100),
  offset: z.number().min(0).default(0),
})

// Types
export type EventData = z.infer<typeof eventSchema>
export type MetricData = z.infer<typeof metricSchema>
export type AnalyticsQuery = z.infer<typeof analyticsQuerySchema>

export interface AnalyticsSummary {
  total_events: number
  unique_users: number
  top_events: Array<{ event_name: string; count: number }>
  daily_events: Array<{ date: string; count: number }>
}

export interface UserAnalytics {
  user_id: string
  total_events: number
  last_seen: Date
  events_breakdown: Array<{ event_name: string; count: number }>
}

export const analyticsService = {
  /**
   * Track an event
   */
  async trackEvent(eventData: EventData) {
    try {
      const validatedData = eventSchema.parse(eventData)
      const timestamp = validatedData.timestamp || new Date()

      const event = {
        event_name: validatedData.event_name,
        user_id: validatedData.user_id
          ? parseInt(validatedData.user_id)
          : undefined,
        payload: validatedData.properties || {},
        created_at: timestamp.toISOString(),
      }

      const { data, error } = await supabase
        .from('analytics')
        .insert([event])
        .select()

      if (error) {
        throw new ApiError(400, `Failed to track event: ${error.message}`)
      }

      logAction('analytics_event_tracked', eventData.user_id || 'anonymous', {
        event_name: validatedData.event_name,
        properties: validatedData.properties,
      })

      return data[0]
    } catch (error) {
      logAction('analytics_event_error', eventData.user_id || 'anonymous', {
        event_name: eventData.event_name,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Track a metric (stored as an event with metric data in payload)
   */
  async trackMetric(metricData: MetricData) {
    try {
      const validatedData = metricSchema.parse(metricData)
      const timestamp = validatedData.timestamp || new Date()

      const metric = {
        event_name: `metric_${validatedData.metric_name}`,
        user_id: validatedData.user_id
          ? parseInt(validatedData.user_id)
          : undefined,
        payload: {
          value: validatedData.value,
          tags: validatedData.tags || {},
          metric_name: validatedData.metric_name,
        },
        created_at: timestamp.toISOString(),
      }

      const { data, error } = await supabase
        .from('analytics')
        .insert([metric])
        .select()

      if (error) {
        throw new ApiError(400, `Failed to track metric: ${error.message}`)
      }

      logAction('analytics_metric_tracked', metricData.user_id || 'anonymous', {
        metric_name: validatedData.metric_name,
        value: validatedData.value,
        tags: validatedData.tags,
      })

      return data[0]
    } catch (error) {
      logAction('analytics_metric_error', metricData.user_id || 'anonymous', {
        metric_name: metricData.metric_name,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get events with filtering
   */
  async getEvents(query: AnalyticsQuery) {
    try {
      const validatedQuery = analyticsQuerySchema.parse(query)
      let queryBuilder = supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(validatedQuery.limit)
        .range(
          validatedQuery.offset,
          validatedQuery.offset + validatedQuery.limit - 1,
        )

      if (validatedQuery.start_date) {
        queryBuilder = queryBuilder.gte('created_at', validatedQuery.start_date)
      }

      if (validatedQuery.end_date) {
        queryBuilder = queryBuilder.lte('created_at', validatedQuery.end_date)
      }

      if (validatedQuery.event_name) {
        queryBuilder = queryBuilder.eq('event_name', validatedQuery.event_name)
      }

      if (validatedQuery.user_id) {
        queryBuilder = queryBuilder.eq(
          'user_id',
          parseInt(validatedQuery.user_id),
        )
      }

      const { data, error } = await queryBuilder

      if (error) {
        throw new ApiError(400, `Failed to get events: ${error.message}`)
      }

      logAction('analytics_events_queried', 'system', {
        query: validatedQuery,
        count: data?.length || 0,
      })

      return data || []
    } catch (error) {
      logAction('analytics_events_query_error', 'system', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get metrics with filtering
   */
  async getMetrics(query: AnalyticsQuery) {
    try {
      const validatedQuery = analyticsQuerySchema.parse(query)
      let queryBuilder = supabase
        .from('analytics')
        .select('*')
        .like('event_name', 'metric_%')
        .order('created_at', { ascending: false })
        .limit(validatedQuery.limit)
        .range(
          validatedQuery.offset,
          validatedQuery.offset + validatedQuery.limit - 1,
        )

      if (validatedQuery.start_date) {
        queryBuilder = queryBuilder.gte('created_at', validatedQuery.start_date)
      }

      if (validatedQuery.end_date) {
        queryBuilder = queryBuilder.lte('created_at', validatedQuery.end_date)
      }

      if (validatedQuery.user_id) {
        queryBuilder = queryBuilder.eq(
          'user_id',
          parseInt(validatedQuery.user_id),
        )
      }

      const { data, error } = await queryBuilder

      if (error) {
        throw new ApiError(400, `Failed to get metrics: ${error.message}`)
      }

      logAction('analytics_metrics_queried', 'system', {
        query: validatedQuery,
        count: data?.length || 0,
      })

      return data || []
    } catch (error) {
      logAction('analytics_metrics_query_error', 'system', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get analytics summary
   */
  async getAnalyticsSummary(
    startDate?: string,
    endDate?: string,
  ): Promise<AnalyticsSummary> {
    try {
      // Get total events
      let eventsQuery = supabase
        .from('analytics')
        .select('*', { count: 'exact' })
      if (startDate) eventsQuery = eventsQuery.gte('created_at', startDate)
      if (endDate) eventsQuery = eventsQuery.lte('created_at', endDate)

      const { count: totalEvents, error: eventsError } = await eventsQuery
      if (eventsError)
        throw new ApiError(
          400,
          `Failed to get total events: ${eventsError.message}`,
        )

      // Get unique users
      let usersQuery = supabase.from('analytics').select('user_id')
      if (startDate) usersQuery = usersQuery.gte('created_at', startDate)
      if (endDate) usersQuery = usersQuery.lte('created_at', endDate)

      const { data: userEvents, error: usersError } = await usersQuery
      if (usersError)
        throw new ApiError(
          400,
          `Failed to get unique users: ${usersError.message}`,
        )

      const uniqueUsers = new Set(
        userEvents?.map((e) => e.user_id).filter(Boolean),
      ).size

      // Get top events
      const { data: allEvents, error: topEventsError } = await supabase
        .from('analytics')
        .select('event_name')

      if (topEventsError)
        throw new ApiError(
          400,
          `Failed to get top events: ${topEventsError.message}`,
        )

      const eventCounts =
        allEvents?.reduce(
          (acc, event) => {
            acc[event.event_name] = (acc[event.event_name] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        ) || {}

      const topEvents = Object.entries(eventCounts)
        .map(([event_name, count]) => ({ event_name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      // Get daily events (mock data for now)
      const dailyEvents = [
        { date: '2025-07-01', count: Math.floor(Math.random() * 100) + 50 },
        { date: '2025-07-02', count: Math.floor(Math.random() * 100) + 50 },
        { date: '2025-07-03', count: Math.floor(Math.random() * 100) + 50 },
      ]

      const summary: AnalyticsSummary = {
        total_events: totalEvents || 0,
        unique_users: uniqueUsers,
        top_events: topEvents,
        daily_events: dailyEvents,
      }

      logAction('analytics_summary_generated', 'system', {
        start_date: startDate,
        end_date: endDate,
        total_events: summary.total_events,
        unique_users: summary.unique_users,
      })

      return summary
    } catch (error) {
      logAction('analytics_summary_error', 'system', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  /**
   * Get user analytics
   */
  async getUserAnalytics(userId: string): Promise<UserAnalytics> {
    try {
      const { data: userEvents, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('user_id', parseInt(userId))
        .order('created_at', { ascending: false })

      if (error) {
        throw new ApiError(
          400,
          `Failed to get user analytics: ${error.message}`,
        )
      }

      if (!userEvents || userEvents.length === 0) {
        throw new ApiError(404, 'No analytics data found for user')
      }

      const eventsBreakdown = userEvents.reduce(
        (acc, event) => {
          acc[event.event_name] = (acc[event.event_name] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const userAnalytics: UserAnalytics = {
        user_id: userId,
        total_events: userEvents.length,
        last_seen: new Date(userEvents[0].created_at),
        events_breakdown: Object.entries(eventsBreakdown)
          .map(([event_name, count]) => ({ event_name, count }))
          .sort((a, b) => b.count - a.count),
      }

      logAction('analytics_user_data_retrieved', userId, {
        total_events: userAnalytics.total_events,
        last_seen: userAnalytics.last_seen,
      })

      return userAnalytics
    } catch (error) {
      logAction('analytics_user_data_error', userId, {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },

  // Legacy methods for backward compatibility
  async getAllAnalytics() {
    const { data, error } = await supabase.from('analytics').select('*')
    if (error) {
      throw new ApiError(400, error.message)
    }
    return data
  },

  async getAnalyticsById(id: number) {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      if (error.code === 'PGRST116') {
        throw new ApiError(404, 'Analytics not found')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },

  async createAnalytics(analytics: TablesInsert<'analytics'>) {
    const { data, error } = await supabase
      .from('analytics')
      .insert([analytics])
      .select()
    if (error) {
      if (error.code === '23505') {
        throw new ApiError(409, 'Analytics already exists')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },

  async updateAnalytics(id: number, analytics: TablesUpdate<'analytics'>) {
    const { data, error } = await supabase
      .from('analytics')
      .update(analytics)
      .eq('id', id)
      .select()
    if (error) {
      if (error.code === 'PGRST116') {
        throw new ApiError(404, 'Analytics not found')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },

  async deleteAnalytics(id: number) {
    const { data, error } = await supabase
      .from('analytics')
      .delete()
      .eq('id', id)
    if (error) {
      if (error.code === 'PGRST116') {
        throw new ApiError(404, 'Analytics not found')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },
}
