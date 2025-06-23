import { TablesInsert, TablesUpdate } from '@repo/db-types'

import { supabase } from './supabase.service.js'

export const analyticsService = {
  async getAllAnalyticss() {
    const { data, error } = await supabase.from('analyticss').select('*')
    if (error) throw error
    return data
  },

  async getAnalyticsById(id: number) {
    const { data, error } = await supabase
      .from('analyticss')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async createAnalytics(analytics: TablesInsert<'analyticss'>) {
    const { data, error } = await supabase
      .from('analyticss')
      .insert(analytics)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateAnalytics(id: number, analytics: TablesUpdate<'analyticss'>) {
    const { data, error } = await supabase
      .from('analyticss')
      .update(analytics)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteAnalytics(id: number) {
    const { data, error } = await supabase.from('analyticss').delete().eq('id', id)
    if (error) throw error
    return data
  },
}
