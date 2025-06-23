import { TablesInsert, TablesUpdate } from '@repo/db-types'

import { supabase } from './supabase.service.js'

export const todoService = {
  async getAllTodos() {
    const { data, error } = await supabase.from('todos').select('*')
    if (error) throw error
    return data
  },

  async getTodoById(id: number) {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async createTodo(todo: TablesInsert<'todos'>) {
    const { data, error } = await supabase
      .from('todos')
      .insert(todo)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateTodo(id: number, todo: TablesUpdate<'todos'>) {
    const { data, error } = await supabase
      .from('todos')
      .update(todo)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteTodo(id: number) {
    const { data, error } = await supabase.from('todos').delete().eq('id', id)
    if (error) throw error
    return data
  },
}
