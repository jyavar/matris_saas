import { exit } from 'process'

const requiredVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_API_URL',
]

const missing = requiredVars.filter((v) => !process.env[v])

if (missing.length > 0) {
  console.error(
    `\n❌ Faltan variables de entorno críticas:\n${missing.map((v) => `- ${v}`).join('\n')}`,
  )
  exit(1)
} else {
  console.log('✅ Todas las variables de entorno críticas están definidas.')
}
