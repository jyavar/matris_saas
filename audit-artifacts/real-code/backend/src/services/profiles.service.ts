import { ApiError } from '../utils/ApiError.js'
import { supabase } from './supabase.service'

export const profilesService = {
  async getAllProfiles(tenantId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('tenant_id', tenantId)
    if (error) {
      throw new ApiError(400, error.message)
    }
    return data
  },

  async getProfileById(id: string, tenantId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .single()
    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        throw new ApiError(404, 'Profile not found')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },

  async createProfile(profile: {
    id: string
    username?: string
    full_name?: string
    avatar_url?: string
    tenant_id: string
  }) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single()
    if (error) {
      if (error.code === '23505') {
        // Unique violation
        throw new ApiError(409, 'Profile already exists')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },

  async updateProfile(
    id: string,
    tenantId: string,
    profile: { username?: string; full_name?: string; avatar_url?: string },
  ) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single()
    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        throw new ApiError(404, 'Profile not found')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },

  async deleteProfile(id: string, tenantId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId)
    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        throw new ApiError(404, 'Profile not found')
      }
      throw new ApiError(400, error.message)
    }
    return data
  },
}
