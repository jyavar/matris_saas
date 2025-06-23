import { TablesInsert, TablesUpdate } from '@repo/db-types'

import { supabase } from './supabase.service'

export const analyticsService = {
  async getAllAnalytics() {
    const { data, error } = await supabase.from('analytics').select('*')
    if (error) {
      throw new Error(error.message)
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
      throw new Error(error.message)
    }
    return data
  },

  async createAnalytics(analytics: TablesInsert<'analytics'>) {
    const { data, error } = await supabase
      .from('analytics')
      .insert([analytics])
      .select()
    if (error) {
      throw new Error(error.message)
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
      throw new Error(error.message)
    }
    return data
  },

  async deleteAnalytics(id: number) {
    const { data, error } = await supabase
      .from('analytics')
      .delete()
      .eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  },
}
