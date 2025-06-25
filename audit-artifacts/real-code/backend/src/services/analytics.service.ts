import {
  TablesInsert,
  TablesUpdate,
} from '../../../../../packages/db-types/index.d.js'
import { ApiError } from '../utils/ApiError.js'
import { supabase } from './supabase.service'

export const analyticsService = {
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
        // Not found
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
        // Unique violation
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
        // Not found
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
        // Not found
        throw new ApiError(404, 'Analytics not found')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },
}
