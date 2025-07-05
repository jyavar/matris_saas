// @AgentMeta
// name: @context-watchdog
// purpose: Monitoreo y enforcement de rutas y contexto STRATO (warnings only)
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
    status: 'ok' as 'ok' | 'warn',
    warnings: [] as string[],
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
      log.status = 'warn'
      log.warnings.push('Se detectaron archivos en rutas que podrían ser inválidas.')
      log.actionsPerformed.push(
        `Archivos con posibles problemas: ${invalidFiles.join(', ')}`,
      )
      const timestamp = new Date().toISOString()
      let commitAuthor = 'N/A'
      try {
        commitAuthor = process.env.GIT_AUTHOR_NAME || 'N/A'
      } catch {
        // Ignore if git author is not available
      }
      invalidFiles.forEach((file) => {
        const logMessage = `[${timestamp}] [${commitAuthor}] Archivo: ${file}, Motivo: Ruta podría no estar permitida por manifiesto.`
        writeLog(logMessage)
      })
      console.warn('⚠️ Context watchdog encontró posibles problemas (continuando...)')
    } else {
      log.actionsPerformed.push('Sin violaciones de contexto detectadas.')
    }
  } catch (error) {
    log.status = 'warn'
    log.warnings.push(error instanceof Error ? error.message : String(error))
    console.warn('⚠️ Error en context watchdog (continuando...):', error)
  }
  
  deps.writeFileSync(
    'audit-artifacts/reports/context-watchdog-report.json',
    JSON.stringify(log, null, 2),
  )
  console.log('[@context-watchdog] ejecutado (warnings only)')
}

// Ejecutar si se llama directamente
if (process.argv[1] && process.argv[1].includes('context-watchdog.ts')) {
  runAgent()
}
