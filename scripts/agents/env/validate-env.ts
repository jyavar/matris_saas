// @AgentMeta
// name: @env
// purpose: Validación de variables de entorno críticas para STRATO
// usage: pnpm tsx scripts/agents/env/validate-env.ts
// tags: env, validation, strato

import fs from 'fs'

const requiredVars = [
  'SUPABASE_URL',
  'SUPABASE_KEY',
  'JWT_SECRET',
  'STRIPE_SECRET_KEY',
]

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
  if (missing.length === 0) {
    log.actionsPerformed.push('Todas las variables de entorno están presentes.')
  } else {
    log.status = 'fail'
    log.errors.push(`Faltan: ${missing.join(', ')}`)
    log.actionsPerformed.push('Validación de variables de entorno fallida.')
  }
  log.actionsPerformed.push(`Variables auditadas: ${requiredVars.length}`)
  deps.writeFileSync(
    'audit-artifacts/reports/env-report.json',
    JSON.stringify(log, null, 2),
  )
  console.log('[@env] ejecutado')
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
