import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test'

let supabase: SupabaseClient

if (isTest) {
  supabase = {
    auth: {
      signInWithPassword: async () => ({ error: null }),
      getSession: async () => ({
        data: {
          session: { user: { id: 'mock-user', email: 'test@example.com' } },
        },
      }),
      onAuthStateChange: () => ({
        data: {
          subscription: { unsubscribe: () => {} },
        },
      }),
    },
  } as unknown as SupabaseClient
} else {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key must be provided in .env')
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
