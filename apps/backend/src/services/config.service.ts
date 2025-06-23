import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  LOG_LEVEL: z.string().default('info'),
  PORT: z.coerce.number().default(3001),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
})

type Config = z.infer<typeof configSchema>
let config: Config | undefined

export const getConfig = (): Config => {
  if (config) {
    return config
  }

  const parsedConfig = configSchema.safeParse(process.env)

  if (!parsedConfig.success) {
    throw new Error('Invalid configuration: ' + parsedConfig.error.message)
  }

  config = parsedConfig.data
  return config
}
