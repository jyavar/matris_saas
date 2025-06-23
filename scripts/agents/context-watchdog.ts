import { execSync } from 'child_process'
import * as fs from 'fs'
import { minimatch } from 'minimatch'
import * as path from 'path'
import * as process from 'process'

const manifestPath = path.resolve('.strato-manifest.json')
const root = path.resolve('.')

// Use `git diff` to get a reliable list of staged files.
const stagedFilesOutput = execSync('git diff --name-only --cached').toString()
const stagedFiles = stagedFilesOutput.split('\n').filter(Boolean)

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

function isValidPath(file: string) {
  return manifest.validPaths.some((pattern: string) => minimatch(file, pattern))
}

function isForbiddenPath(file: string) {
  return manifest.forbiddenPaths.some((pattern: string) =>
    minimatch(file, pattern),
  )
}

const invalidFiles = stagedFiles.filter((file) => {
  const relativePath = path.relative(root, file)
  return !isValidPath(relativePath) || isForbiddenPath(relativePath)
})

if (invalidFiles.length > 0) {
  console.error('\n⛔ Archivos fuera de contexto válido detectados:')
  invalidFiles.forEach((f) => console.error(' - ' + f))
  console.error(
    '\nBloqueando el commit. Usa rutas válidas declaradas en .strato-manifest.json\n',
  )
  process.exit(1)
} else {
  process.exit(0)
}
