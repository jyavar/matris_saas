import * as dotenv from 'dotenv'
import { z } from 'zod'

// Carga las variables de entorno desde .env
dotenv.config()

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required.'),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors,
  )
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
