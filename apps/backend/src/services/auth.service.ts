import { TablesInsert, TablesUpdate } from '@repo/db-types'

import { supabase } from './supabase.service.js'

export const authService = {
  async getAllAuths() {
    const { data, error } = await supabase.from('auths').select('*')
    if (error) throw error
    return data
  },

  async getAuthById(id: number) {
    const { data, error } = await supabase
      .from('auths')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async createAuth(auth: TablesInsert<'auths'>) {
    const { data, error } = await supabase
      .from('auths')
      .insert(auth)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateAuth(id: number, auth: TablesUpdate<'auths'>) {
    const { data, error } = await supabase
      .from('auths')
      .update(auth)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteAuth(id: number) {
    const { data, error } = await supabase.from('auths').delete().eq('id', id)
    if (error) throw error
    return data
  },
}
