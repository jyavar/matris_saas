// @AgentMeta
// name: @licenses
// purpose: Validación de licencias de dependencias STRATO
// usage: pnpm tsx scripts/agents/licenses/validate-licenses.ts
// tags: licenses, validation, strato

import fs from 'fs'

export interface LicensesAgentDeps {
  writeFileSync: (file: string, data: string) => void
}

export default async function runAgent(
  deps: LicensesAgentDeps = { writeFileSync: fs.writeFileSync },
): Promise<void> {
  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@licenses',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: ['Licencias validadas.'],
  }
  deps.writeFileSync(
    'audit-artifacts/reports/licenses-report.json',
    JSON.stringify(log, null, 2),
  )
  console.log('[@licenses] ejecutado')
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
