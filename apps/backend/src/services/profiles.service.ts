import { supabase } from './supabase.service'

export const profilesService = {
  async getAllProfiles() {
    const { data, error } = await supabase.from('profiles').select('*')
    if (error) throw error
    return data
  },

  async getProfileById(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async createProfile(profile: {
    id: string
    username?: string
    full_name?: string
    avatar_url?: string
  }) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateProfile(
    id: string,
    profile: { username?: string; full_name?: string; avatar_url?: string },
  ) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteProfile(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)
    if (error) throw error
    return data
  },
}
