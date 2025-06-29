import 'dotenv/config'

import { createClient } from '@supabase/supabase-js'

// Validación de variables de entorno requeridas
const requiredEnvVars = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
}

// Verificar que todas las variables requeridas estén definidas
const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key)

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}. ` +
      `Please check env.example for required variables.`,
  )
}

const supabaseUrl = requiredEnvVars.SUPABASE_URL!
const supabaseAnonKey = requiredEnvVars.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
