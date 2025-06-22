import dotenv from 'dotenv'
import { z } from 'zod'

// Carga las variables de entorno desde .env
dotenv.config()

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required.'),
})

try {
  envSchema.parse(process.env)
  console.log('✅ Environment variables are valid.')
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables:')
    error.errors.forEach((err) => {
      console.error(`- ${err.path.join('.')}: ${err.message}`)
    })
  }
  process.exit(1)
}
