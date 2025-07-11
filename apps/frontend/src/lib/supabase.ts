import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para Supabase Auth
export interface SupabaseUser {
  id: string
  email?: string
  created_at: string
  updated_at?: string
  user_metadata?: {
    name?: string
    avatar_url?: string
  }
}

export interface SupabaseAuthResponse {
  data: {
    user: SupabaseUser | null
    session: {
      access_token: string
      refresh_token: string
    } | null
  }
  error: {
    message: string
  } | null
}

// Helpers para autenticación
export const signInWithEmail = async (email: string, password: string): Promise<SupabaseAuthResponse> => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signUpWithEmail = async (email: string, password: string, metadata?: { name?: string }): Promise<SupabaseAuthResponse> => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  })
}

export const signOut = async (): Promise<{ error: { message: string } | null }> => {
  return await supabase.auth.signOut()
}

export const getCurrentUser = async (): Promise<SupabaseUser | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getCurrentSession = async (): Promise<{ access_token: string; refresh_token: string } | null> => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export const getSessionToken = async (): Promise<string | null> => {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token || null
} 