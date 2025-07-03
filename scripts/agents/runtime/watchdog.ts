// @AgentMeta
// name: @runtime
// purpose: Monitoreo y watchdog de procesos críticos STRATO
// usage: pnpm tsx scripts/agents/runtime/watchdog.ts
// tags: runtime, watchdog, monitoring, strato

import fs from 'fs'

export interface RuntimeAgentDeps {
  writeFileSync: (file: string, data: string) => void
}

export default async function runAgent(
  deps: RuntimeAgentDeps = { writeFileSync: fs.writeFileSync },
): Promise<void> {
  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@runtime',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: [] as string[],
    uptime: 0,
  }
  try {
    log.uptime = process.uptime()
    log.actionsPerformed.push(
      `Watchdog activo. Uptime: ${log.uptime} segundos.`,
    )
  } catch (e) {
    log.status = 'fail'
    log.errors.push(e instanceof Error ? e.message : String(e))
  }
  deps.writeFileSync(
    'audit-artifacts/reports/runtime-report.json',
    JSON.stringify(log, null, 2),
  )
  console.log('[@runtime] ejecutado')
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
