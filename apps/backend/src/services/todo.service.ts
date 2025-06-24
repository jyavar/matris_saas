import { TablesInsert, TablesUpdate } from '@repo/db-types'

import { ApiError } from '../utils/ApiError.js'
import { supabase } from './supabase.service.js'

export const todoService = {
  async getAllTodos(userId: string, tenantId: string) {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .eq('tenant_id', tenantId)
    if (error) {
      throw new ApiError(400, error.message)
    }
    return data
  },

  async getTodoById(id: number) {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        throw new ApiError(404, 'Todo not found')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },

  async createTodo(todo: TablesInsert<'todos'>) {
    const { data, error } = await supabase
      .from('todos')
      .insert(todo)
      .select()
      .single()
    if (error) {
      if (error.code === '23505') {
        // Unique violation
        throw new ApiError(409, 'Todo already exists')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },

  async updateTodo(id: number, todo: TablesUpdate<'todos'>) {
    const { data, error } = await supabase
      .from('todos')
      .update(todo)
      .eq('id', id)
      .select()
      .single()
    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        throw new ApiError(404, 'Todo not found')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },

  async deleteTodo(id: number) {
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .select()
    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        throw new ApiError(404, 'Todo not found')
      }
      throw new ApiError(400, error.message)
    }
    if (!data || data.length === 0) {
      throw new ApiError(404, 'Todo not found')
    }
    return data[0]
  },
}
