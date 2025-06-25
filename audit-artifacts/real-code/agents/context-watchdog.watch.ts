import chokidar from 'chokidar'
import * as path from 'path'

import { getManifest, validateFiles } from './strato.logic.js'

console.log(
  '🕵️  STRATO Context Guard: Iniciando modo de vigilancia en tiempo real...',
)

try {
  const manifest = getManifest()
  const watcher = chokidar.watch('.', {
    ignored: [
      /(^|[/\\])\../, // ignore dotfiles
      'node_modules/**',
      '**/*.log',
    ],
    persistent: true,
    ignoreInitial: true,
  })

  watcher.on('add', (filePath) => {
    const fullPath = path.resolve(filePath)
    const invalidFiles = validateFiles([fullPath], manifest)

    if (invalidFiles.length > 0) {
      console.warn(
        `\n⚠️  STRATO Context Guard: Archivo nuevo en ruta inválida detectado!`,
      )
      console.warn(`  - Archivo: ${filePath}`)
      console.warn(
        `    Motivo: La ruta no es válida según las reglas de '.strato-manifest.json'.`,
      )
      console.warn(
        `    Ayuda: Revise las reglas de contribución en 'README.cursor.md'.\n`,
      )
    }
  })

  console.log(
    '✅ Guardián activo. Observando cambios en el sistema de archivos...',
  )
} catch (error) {
  console.error((error as Error).message)
  process.exit(1)
}
