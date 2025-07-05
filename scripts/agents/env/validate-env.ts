// @AgentMeta
// name: @env
// purpose: Validación de variables de entorno críticas para STRATO
// usage: pnpm tsx scripts/agents/env/validate-env.ts
// tags: env, validation, strato

import { config } from 'dotenv'
import fs from 'fs'

// Load environment variables from .env file
config()

const requiredVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'JWT_SECRET']

const optionalVars = ['STRIPE_SECRET_KEY', 'OPENAI_API_KEY', 'POSTHOG_API_KEY']

export interface EnvAgentDeps {
  writeFileSync: (file: string, data: string) => void
}

export default async function runAgent(
  deps: EnvAgentDeps = { writeFileSync: fs.writeFileSync },
): Promise<void> {
  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@env',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: [] as string[],
  }
  const missing = requiredVars.filter((v) => !process.env[v])
  const missingOptional = optionalVars.filter((v) => !process.env[v])

  if (missing.length === 0) {
    log.actionsPerformed.push(
      '✅ Todas las variables requeridas están presentes.',
    )
  } else {
    log.status = 'fail'
    log.errors.push(`❌ Variables requeridas faltantes: ${missing.join(', ')}`)
    log.actionsPerformed.push('Validación de variables de entorno fallida.')
  }

  if (missingOptional.length > 0) {
    log.actionsPerformed.push(
      `⚠️ Variables opcionales faltantes: ${missingOptional.join(', ')}`,
    )
  }

  log.actionsPerformed.push(
    `📊 Variables auditadas: ${requiredVars.length} requeridas, ${optionalVars.length} opcionales`,
  )
  deps.writeFileSync(
    'audit-artifacts/reports/env-report.json',
    JSON.stringify(log, null, 2),
  )
  console.log('[@env] ejecutado')
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
