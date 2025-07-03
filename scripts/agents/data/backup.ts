// @AgentMeta
// name: @data
// purpose: Backup y auditoría de datos críticos STRATO
// usage: pnpm tsx scripts/agents/data/backup.ts
// tags: data, backup, audit, strato

import fs from 'fs'

export interface DataBackupDeps {
  writeFileSync: (file: string, data: string) => void
  mkdirSync: (path: string, opts: { recursive: boolean }) => void
  readdirSync: (path: string) => string[]
  copyFileSync: (src: string, dest: string) => void
}

export default async function runAgent(
  deps: DataBackupDeps = {
    writeFileSync: fs.writeFileSync,
    mkdirSync: fs.mkdirSync,
    readdirSync: fs.readdirSync,
    copyFileSync: fs.copyFileSync,
  },
): Promise<void> {
  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@data',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: [] as string[],
  }
  try {
    const srcDir = './docs'
    const destDir = './backup/docs-backup'
    deps.mkdirSync(destDir, { recursive: true })
    const files = deps
      .readdirSync(srcDir)
      .filter((f: string) => f.endsWith('.md'))
    files.forEach((f: string) =>
      deps.copyFileSync(`${srcDir}/${f}`, `${destDir}/${f}`),
    )
    log.actionsPerformed.push(
      `Backup de ${files.length} archivos de docs realizado.`,
    )
  } catch (e) {
    log.status = 'fail'
    log.errors.push(e instanceof Error ? e.message : String(e))
  }
  deps.writeFileSync(
    'audit-artifacts/reports/data-report.json',
    JSON.stringify(log, null, 2),
  )
  console.log('[@data] ejecutado')
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
