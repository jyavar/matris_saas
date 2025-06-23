import { Database } from '@repo/db-types'
import { createClient } from '@supabase/supabase-js'

import { getConfig } from './config.service.js'

const config = getConfig()

if (!config.SUPABASE_URL || !config.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'Supabase URL or service role key is not defined in the environment variables.',
  )
}

export const supabase = createClient<Database>(
  config.SUPABASE_URL,
  config.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
)
