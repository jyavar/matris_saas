import 'dotenv/config'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not defined in your environment variables')
}
if (!supabaseAnonKey) {
  throw new Error(
    'SUPABASE_ANON_KEY is not defined in your environment variables',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
