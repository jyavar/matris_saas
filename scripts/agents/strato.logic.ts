import { execSync } from 'child_process'
import * as fs from 'fs'
import { minimatch } from 'minimatch'
import * as path from 'path'
import { z } from 'zod'

// Schema for .strato-manifest.json
const manifestSchema = z.object({
  root: z.string(),
  validPaths: z.array(z.string()),
  forbiddenPaths: z.array(z.string()),
  namingConventions: z.object({
    testFiles: z.string(),
    componentFiles: z.string(),
    routeFiles: z.string(),
  }),
  preferredEntryDir: z.string(),
})

type Manifest = z.infer<typeof manifestSchema>

export function getManifest(): Manifest {
  const manifestPath = path.resolve('.strato-manifest.json')
  if (!fs.existsSync(manifestPath)) {
    throw new Error(
      '⛔ El manifiesto estructural .strato-manifest.json no existe.',
    )
  }

  const manifestContent = fs.readFileSync(manifestPath, 'utf-8')
  const manifest = JSON.parse(manifestContent)

  const validation = manifestSchema.safeParse(manifest)
  if (!validation.success) {
    console.error(
      '⛔ El manifiesto estructural está corrupto o mal definido:',
      validation.error.issues,
    )
    throw new Error('Manifiesto inválido.')
  }

  return validation.data
}

export function getChangedFilesAgainstMain(): string[] {
  try {
    const mainBranch = process.env.GITHUB_BASE_REF || 'main'
    const diffCommand = `git diff --name-only origin/${mainBranch}...HEAD`
    const changedFilesOutput = execSync(diffCommand).toString()
    return changedFilesOutput.split('\n').filter(Boolean)
  } catch (e) {
    console.warn(
      'Could not get changed files against main, falling back to staged files. This is expected locally.',
    )
    return getStagedFiles()
  }
}

export function getStagedFiles(): string[] {
  const stagedFilesOutput = execSync('git diff --name-only --cached').toString()
  return stagedFilesOutput.split('\n').filter(Boolean)
}

export function validateFiles(files: string[], manifest: Manifest): string[] {
  const root = path.resolve('.')
  const invalidFiles = files.filter((file) => {
    const relativePath = path.relative(root, file)
    const isValid = manifest.validPaths.some((pattern) =>
      minimatch(relativePath, pattern),
    )
    const isForbidden = manifest.forbiddenPaths.some((pattern) =>
      minimatch(relativePath, pattern),
    )
    return !isValid || isForbidden
  })
  return invalidFiles
}

export function writeLog(logMessage: string): void {
  const logDir = path.resolve('logs')
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
  }
  const logFile = path.resolve(logDir, 'context-violations.log')
  fs.appendFileSync(logFile, logMessage + '\n')
}
