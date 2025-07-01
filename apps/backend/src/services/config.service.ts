import { z } from 'zod'

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('test'),
  LOG_LEVEL: z.string().default('info'),
  PORT: z.coerce.number().default(3001),
  SUPABASE_URL: z.string().url().default('https://test.supabase.co'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().default('test-key'),
})

type Config = z.infer<typeof configSchema>
let config: Config | undefined

export const getConfig = (): Config => {
  if (config) {
    return config
  }

  // Para tests, usar valores por defecto
  if (process.env.NODE_ENV === 'test') {
    config = {
      NODE_ENV: 'test',
      LOG_LEVEL: 'error',
      PORT: 3001,
      SUPABASE_URL: 'https://test.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'test-key',
    }
    return config
  }

  const parsedConfig = configSchema.safeParse(process.env)

  if (!parsedConfig.success) {
    throw new Error('Invalid configuration: ' + parsedConfig.error.message)
  }

  config = parsedConfig.data
  return config
}
