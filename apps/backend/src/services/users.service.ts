import { TablesInsert, TablesUpdate } from '@repo/db-types'

import { supabase } from './supabase.service'

export const usersService = {
  async getAllUserss() {
    const { data, error } = await supabase.from('users').select('*')
    if (error) throw error
    return data
  },

  async getUsersById(id: number) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async createUsers(users: TablesInsert<'users'>) {
    const { data, error } = await supabase
      .from('users')
      .insert(users)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateUsers(id: number, users: TablesUpdate<'users'>) {
    const { data, error } = await supabase
      .from('users')
      .update(users)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteUsers(id: number) {
    const { data, error } = await supabase.from('users').delete().eq('id', id)
    if (error) throw error
    return data
  },
}
