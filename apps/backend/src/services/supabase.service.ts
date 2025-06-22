import { createClient } from '@supabase/supabase-js'

import { getConfig } from './config.service.js'

const config = getConfig()

if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL and Anon Key must be provided.')
}

export const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_ANON_KEY,
)
