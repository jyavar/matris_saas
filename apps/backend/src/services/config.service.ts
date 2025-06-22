import dotenv from 'dotenv'
import pino from 'pino'
import { z } from 'zod'

dotenv.config()

const configSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3001),
  LOG_LEVEL: z
    .enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'])
    .default('info'),

  // External Services
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  POSTHOG_API_KEY: z.string().optional(),
})

let validatedConfig: z.infer<typeof configSchema> | null = null

export const getConfig = () => {
  if (validatedConfig) {
    return validatedConfig
  }

  try {
    validatedConfig = configSchema.parse(process.env)
    return validatedConfig
  } catch (error) {
    if (error instanceof z.ZodError) {
      const tempLogger = pino()
      tempLogger.fatal(
        { errors: error.flatten().fieldErrors },
        '❌ Invalid environment variables. Shutting down.',
      )
      process.exit(1)
    }
    throw error
  }
}
