import { execSync } from 'child_process'
import * as fs from 'fs-extra'
import { glob } from 'glob'
import * as path from 'path'
import * as yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

interface AuditResult {
  modulePath: string
  timestamp: string
  checks: {
    structure: {
      hasPackageJson: boolean
      hasSrcDir: boolean
      status: 'PASS' | 'FAIL'
    }
    lint: {
      passed: boolean
      output: string
    }
    health: {
      codeFiles: number
      testFiles: number
      coverageRatio: string // As a string like "1 test per 2 files"
    }
  }
}

async function auditModule(modulePath: string): Promise<AuditResult> {
  const absoluteModulePath = path.resolve(modulePath)
  console.log(`\n🕵️  Starting audit for module: ${absoluteModulePath}`)

  if (!fs.existsSync(absoluteModulePath)) {
    throw new Error(`Module path does not exist: ${absoluteModulePath}`)
  }

  // --- 1. Structure Validation ---
  console.log('  [1/3] Validating module structure...')
  const hasPackageJson = fs.existsSync(
    path.join(absoluteModulePath, 'package.json'),
  )
  const hasSrcDir = fs.existsSync(path.join(absoluteModulePath, 'src'))
  const structureStatus = hasPackageJson && hasSrcDir ? 'PASS' : 'FAIL'
  console.log(`    -> package.json found: ${hasPackageJson}`)
  console.log(`    -> src/ directory found: ${hasSrcDir}`)

  // --- 2. Linting ---
  console.log('  [2/3] Running linter...')
  let lintPassed = true
  let lintOutput = ''
  try {
    execSync(`eslint ${absoluteModulePath} --ext .ts,.tsx`, { stdio: 'pipe' })
    lintOutput = 'Linter passed.'
  } catch (error: unknown) {
    lintPassed = false
    if (error instanceof Error && 'stdout' in error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      lintOutput = error.stdout.toString()
    } else {
      lintOutput = 'An unknown error occurred during linting.'
    }
  }
  console.log(`    -> Linter status: ${lintPassed ? 'PASS' : 'FAIL'}`)

  // --- 3. Health Report ---
  console.log('  [3/3] Generating health report...')
  const codeFiles = await glob(`${absoluteModulePath}/src/**/*.ts`, {
    ignore: '**/*.test.ts',
  })
  const testFiles = await glob(`${absoluteModulePath}/src/**/*.test.ts`)
  const ratio =
    testFiles.length > 0
      ? `1 test per ${(codeFiles.length / testFiles.length).toFixed(1)} code files`
      : 'N/A'
  console.log(`    -> Found ${codeFiles.length} code file(s).`)
  console.log(`    -> Found ${testFiles.length} test file(s).`)

  const result: AuditResult = {
    modulePath,
    timestamp: new Date().toISOString(),
    checks: {
      structure: { hasPackageJson, hasSrcDir, status: structureStatus },
      lint: { passed: lintPassed, output: lintOutput },
      health: {
        codeFiles: codeFiles.length,
        testFiles: testFiles.length,
        coverageRatio: ratio,
      },
    },
  }

  return result
}

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option('modulePath', {
      alias: 'm',
      type: 'string',
      description: 'Path to the module to audit',
      demandOption: true,
    })
    .parse()

  try {
    const result = await auditModule(argv.modulePath)

    // Generate snapshot in the module directory
    const snapshotPath = path.join(argv.modulePath, 'snapshot.json')
    await fs.writeJson(snapshotPath, result, { spaces: 2 })
    console.log(`\n✅ Audit snapshot generated at: ${snapshotPath}`)

    // Save a copy to the central audit-artifacts directory
    const reportDir = path.join(process.cwd(), 'audit-artifacts', 'reports')
    await fs.ensureDir(reportDir) // Ensure the directory exists
    const moduleName = path.basename(argv.modulePath)
    const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, -5) // YYYY-MM-DDTHH-MM-SS
    const reportPath = path.join(
      reportDir,
      `audit-${moduleName}-${timestamp}.json`,
    )
    await fs.writeJson(reportPath, result, { spaces: 2 })
    console.log(`✅ Central audit report saved at: ${reportPath}`)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`\n❌ An error occurred during the audit: ${error.message}`)
    } else {
      console.error(`\n❌ An unknown error occurred during the audit.`)
    }
    process.exit(1)
  }
}

main()
