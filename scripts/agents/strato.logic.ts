import { execSync } from 'child_process'
import * as fs from 'fs'
import { minimatch } from 'minimatch'
import * as path from 'path'
import { z } from 'zod'

import { runAgent as runFiverrWriter } from './fiverr-writer/executor'
import { runAgent as runFreelancerLeadgen } from './freelancer-leadgen/executor'
import { runAgent as runMturkLabeler } from './mturk-labeler/executor'
import { runAgent as runN8nMicroservice } from './n8n-microservice/executor'
import { runAgent as runUpworkTranscriber } from './upwork-transcriber/executor'

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
  return getStagedFiles()
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

export async function runAgent(agentName: string): Promise<void> {
  switch (agentName) {
    case '@fiverr-writer':
      await runFiverrWriter()
      break
    case '@upwork-transcriber':
      await runUpworkTranscriber()
      break
    case '@mturk-labeler':
      await runMturkLabeler()
      break
    case '@n8n-microservice':
      await runN8nMicroservice()
      break
    case '@freelancer-leadgen':
      await runFreelancerLeadgen()
      break
    // ... existing agents ...
    default:
      throw new Error(`Unknown agent: ${agentName}`)
  }
}
