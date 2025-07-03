// @AgentMeta
// name: @context-watchdog
// purpose: Monitoreo y enforcement de rutas y contexto STRATO
// usage: pnpm tsx scripts/agents/context-watchdog.ts
// tags: context, watchdog, enforcement, strato

import * as fs from 'fs'
import * as process from 'process'

import * as logic from './strato.logic.js'

export interface ContextWatchdogDeps {
  writeFileSync: (file: string, data: string) => void
  getManifest?: typeof logic.getManifest
  getChangedFilesAgainstMain?: typeof logic.getChangedFilesAgainstMain
  validateFiles?: typeof logic.validateFiles
  writeLog?: typeof logic.writeLog
}

export default async function runAgent(
  deps: ContextWatchdogDeps = { writeFileSync: fs.writeFileSync },
): Promise<void> {
  const getManifest = deps.getManifest || logic.getManifest
  const getChangedFilesAgainstMain =
    deps.getChangedFilesAgainstMain || logic.getChangedFilesAgainstMain
  const validateFiles = deps.validateFiles || logic.validateFiles
  const writeLog = deps.writeLog || logic.writeLog

  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@context-watchdog',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: [] as string[],
  }
  try {
    let invalidFiles: string[] = []
    const manifest = getManifest()
    const filesToValidate = getChangedFilesAgainstMain().filter((file) =>
      fs.existsSync(file),
    )
    invalidFiles = validateFiles(filesToValidate, manifest)
    if (invalidFiles.length > 0) {
      log.status = 'fail'
      log.errors.push('Se detectaron archivos en rutas inválidas.')
      log.actionsPerformed.push(
        `Archivos inválidos: ${invalidFiles.join(', ')}`,
      )
      const timestamp = new Date().toISOString()
      let commitAuthor = 'N/A'
      try {
        commitAuthor = process.env.GIT_AUTHOR_NAME || 'N/A'
      } catch {
        // Ignore if git author is not available
      }
      invalidFiles.forEach((file) => {
        const logMessage = `[${timestamp}] [${commitAuthor}] Archivo: ${file}, Motivo: Ruta no permitida por manifiesto.`
        writeLog(logMessage)
      })
    } else {
      log.actionsPerformed.push('Sin violaciones de contexto.')
    }
  } catch (error) {
    log.status = 'fail'
    log.errors.push(error instanceof Error ? error.message : String(error))
  }
  deps.writeFileSync(
    'audit-artifacts/reports/context-watchdog-report.json',
    JSON.stringify(log, null, 2),
  )
  console.log('[@context-watchdog] ejecutado')
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
