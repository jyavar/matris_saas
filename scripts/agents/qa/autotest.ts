// @AgentMeta
// name: @qa
// purpose: Ejecución y validación automatizada de tests STRATO
// usage: pnpm tsx scripts/agents/qa/autotest.ts
// tags: qa, testing, automation, strato

import { execSync } from 'child_process'
import fs from 'fs'

export interface QAAgentDeps {
  writeFileSync: (file: string, data: string) => void
}

export default async function runAgent(
  deps: QAAgentDeps = { writeFileSync: fs.writeFileSync },
): Promise<void> {
  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@qa',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: [] as string[],
  }
  let result = ''
  try {
    result = execSync('pnpm test', { encoding: 'utf-8' })
    log.actionsPerformed.push('Tests ejecutados correctamente.')
  } catch (e) {
    log.status = 'fail'
    log.errors.push(e instanceof Error ? e.message : String(e))
    log.actionsPerformed.push('Error en tests.')
    result = e instanceof Error ? e.message : String(e)
  }
  // Guardar solo los primeros 1000 caracteres del output
  const report = {
    ...log,
    output: result.slice(0, 1000),
  }
  deps.writeFileSync(
    'audit-artifacts/reports/qa-report.json',
    JSON.stringify(report, null, 2),
  )
  console.log('[@qa] ejecutado')
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
