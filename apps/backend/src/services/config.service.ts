import { z } from 'zod'

dotenv.config()

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  LOG_LEVEL: z.string().default('info'),
  PORT: z.coerce.number().default(3001),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
})

let config

export const getConfig = () => {
  if (config) {
    return config
  }

  config = configSchema.safeParse(process.env)

  if (!config.success) {
    throw new Error('Invalid configuration: ' + config.error.message)
  }

  return config.data
}
