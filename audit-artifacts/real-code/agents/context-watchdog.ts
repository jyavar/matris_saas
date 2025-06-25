import * as fs from 'fs'
import * as process from 'process'

import {
  getChangedFilesAgainstMain,
  getManifest,
  validateFiles,
  writeLog,
} from './strato.logic.js'

try {
  const manifest = getManifest()
  const filesToValidate = getChangedFilesAgainstMain().filter((file) =>
    fs.existsSync(file),
  )
  const invalidFiles = validateFiles(filesToValidate, manifest)

  if (invalidFiles.length > 0) {
    const timestamp = new Date().toISOString()
    let commitAuthor = 'N/A'
    try {
      commitAuthor = process.env.GIT_AUTHOR_NAME || 'N/A'
    } catch {
      // Ignore if git author is not available
    }

    console.error(
      '\n⛔ STRATO Context Guard: Se detectaron archivos en rutas inválidas.\n',
    )
    invalidFiles.forEach((file) => {
      const logMessage = `[${timestamp}] [${commitAuthor}] Archivo: ${file}, Motivo: Ruta no permitida por manifiesto.`
      console.error(`  - Archivo: ${file}`)
      console.error(
        `    Motivo: La ruta no es válida según las reglas de '.strato-manifest.json'.`,
      )
      console.error(
        `    Acción: Mueva el archivo a una ruta permitida (ej: 'apps/frontend/...' o 'packages/core/...').`,
      )
      console.error(
        `    Ayuda: Revise las reglas de contribución en 'README.cursor.md'.\n`,
      )
      writeLog(logMessage)
    })

    console.error(
      'Bloqueando el commit. Por favor, corrija los problemas listados.',
    )
    process.exit(1)
  }

  process.exit(0)
} catch (error) {
  console.error((error as Error).message)
  process.exit(1)
}
