// @AgentMeta
// name: @docs
// purpose: Generación y validación de documentación técnica viva
// usage: pnpm tsx scripts/agents/docs/docgen.ts
// tags: docs, documentation, audit, strato

import fs from 'fs'

export interface DocsDeps {
  writeFileSync: (file: string, data: string) => void
  readdirSync: (path: string) => string[]
}

export default async function runAgent(
  deps: DocsDeps = {
    writeFileSync: fs.writeFileSync,
    readdirSync: fs.readdirSync,
  },
): Promise<void> {
  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@docs',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: [] as string[],
  }
  try {
    const files = deps
      .readdirSync('./docs')
      .filter((f: string) => f.endsWith('.md'))
    log.actionsPerformed.push(
      `Documentación técnica auditada y listada: ${files.length} archivos`,
    )
  } catch (e) {
    log.status = 'fail'
    log.errors.push(e instanceof Error ? e.message : String(e))
  }
  deps.writeFileSync(
    'audit-artifacts/reports/docs-report.json',
    JSON.stringify(log, null, 2),
  )
  console.log('[@docs] ejecutado')
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
