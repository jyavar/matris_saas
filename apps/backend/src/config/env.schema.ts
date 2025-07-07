import { z } from 'zod'

const envSchema = z.object({
  // Supabase Configuration (REQUIRED)
  SUPABASE_URL: z.string().url('SUPABASE_URL must be a valid URL'),
  SUPABASE_ANON_KEY: z.string().min(1, 'SUPABASE_ANON_KEY is required'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),

  // Application Configuration (REQUIRED)
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).pipe(z.number().min(1000).max(65535)).default('3001'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // JWT Configuration (REQUIRED)
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('24h'),

  // Performance Configuration (REQUIRED)
  COMPRESSION_LEVEL: z.string().transform(Number).pipe(z.number().min(1).max(9)).default('6'),
  COMPRESSION_THRESHOLD: z.string().transform(Number).pipe(z.number().min(0)).default('1024'),
  CACHE_TTL: z.string().transform(Number).pipe(z.number().min(0)).default('300'),
  CACHE_CHECK_PERIOD: z.string().transform(Number).pipe(z.number().min(0)).default('60'),

  // Rate Limiting (REQUIRED)
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).pipe(z.number().min(1000)).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).pipe(z.number().min(1)).default('100'),
  AUTH_RATE_LIMIT_MAX: z.string().transform(Number).pipe(z.number().min(1)).default('5'),
  ANALYTICS_RATE_LIMIT_MAX: z.string().transform(Number).pipe(z.number().min(1)).default('500'),
  API_RATE_LIMIT_MAX: z.string().transform(Number).pipe(z.number().min(1)).default('1000'),

  // CORS Configuration (REQUIRED)
  ALLOWED_ORIGINS: z.string().transform(origins => origins.split(',').map(o => o.trim())).default('http://localhost:3000'),

  // Redis Configuration (OPTIONAL)
  REDIS_URL: z.string().url().optional(),
  REDIS_PASSWORD: z.string().optional(),

  // Performance Monitoring (OPTIONAL)
  PERFORMANCE_MONITORING_ENABLED: z.string().transform(v => v === 'true').default('true'),
  MEMORY_MONITORING_ENABLED: z.string().transform(v => v === 'true').default('true'),
  SLOW_QUERY_THRESHOLD: z.string().transform(Number).pipe(z.number().min(0)).default('1000'),

  // External Services (OPTIONAL)
  OPENAI_API_KEY: z.string().optional(),
  POSTHOG_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
})

export type EnvConfig = z.infer<typeof envSchema>

export function validateEnv(): EnvConfig {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:')
      error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`)
      })
      console.error('\n💡 Please check your .env file and ensure all required variables are set.')
      process.exit(1)
    }
    throw error
  }
}

export const env = validateEnv()