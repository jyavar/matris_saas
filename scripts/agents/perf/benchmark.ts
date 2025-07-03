// @AgentMeta
// name: @perf
// purpose: Benchmark y validación de performance STRATO
// usage: pnpm tsx scripts/agents/perf/benchmark.ts
// tags: perf, benchmark, strato

import fs from 'fs'

export interface PerfAgentDeps {
  writeFileSync: (file: string, data: string) => void
}

export default async function runAgent(
  deps: PerfAgentDeps = { writeFileSync: fs.writeFileSync },
): Promise<void> {
  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@perf',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: [] as string[],
    duration: 0,
  }
  const start = Date.now()
  try {
    // Simulación de benchmark
    for (let i = 0; i < 1e6; i++) {
      /* noop */
    }
    log.duration = Date.now() - start
    log.actionsPerformed.push(`Benchmark ejecutado en ${log.duration} ms.`)
  } catch (e) {
    log.status = 'fail'
    log.errors.push(e instanceof Error ? e.message : String(e))
  }
  deps.writeFileSync(
    'audit-artifacts/reports/perf-report.json',
    JSON.stringify(log, null, 2),
  )
  console.log('[@perf] ejecutado')
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
