import { TablesInsert, TablesUpdate } from '@repo/db-types'

import { supabase } from './supabase.service.js'

export const usersService = {
  async getAllUserss() {
    const { data, error } = await supabase.from('userss').select('*')
    if (error) throw error
    return data
  },

  async getUsersById(id: number) {
    const { data, error } = await supabase
      .from('userss')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async createUsers(users: TablesInsert<'userss'>) {
    const { data, error } = await supabase
      .from('userss')
      .insert(users)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateUsers(id: number, users: TablesUpdate<'userss'>) {
    const { data, error } = await supabase
      .from('userss')
      .update(users)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteUsers(id: number) {
    const { data, error } = await supabase.from('userss').delete().eq('id', id)
    if (error) throw error
    return data
  },
}
