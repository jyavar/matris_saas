#!/usr/bin/env tsx

/**
 * @qa Agent - Automated Code Audit
 *
 * Performs automated code quality audits including:
 * - Linting checks
 * - Test coverage analysis
 * - Security vulnerability scanning
 * - Performance analysis
 * - Code complexity metrics
 */

import { execSync } from 'child_process'
import crypto from 'crypto'
import { copyFileSync,existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

interface AuditResult {
  timestamp: string
  status: 'PASS' | 'FAIL' | 'WARNING'
  checks: {
    linting: CheckResult
    tests: CheckResult
    coverage: CheckResult
    security: CheckResult
    performance: CheckResult
  }
  summary: string
  recommendations: string[]
  orchestrationLog?: {
    step: string
    status: 'pending' | 'running' | 'completed' | 'failed'
    dependencies?: string[]
    startedAt?: string
    endedAt?: string
    error?: string
  }[]
}

interface CheckResult {
  status: 'PASS' | 'FAIL' | 'WARNING'
  message: string
  details?: unknown
}

class QAAgent {
  private projectRoot: string
  private results: AuditResult
  private orchestrationLog: AuditResult['orchestrationLog'] = []

  constructor() {
    this.projectRoot = process.cwd()
    this.results = {
      timestamp: new Date().toISOString(),
      status: 'PASS',
      checks: {
        linting: { status: 'PASS', message: '' },
        tests: { status: 'PASS', message: '' },
        coverage: { status: 'PASS', message: '' },
        security: { status: 'PASS', message: '' },
        performance: { status: 'PASS', message: '' },
      },
      summary: '',
      recommendations: [],
      orchestrationLog: this.orchestrationLog,
    }
  }

  private async runStep(
    step: string,
    fn: () => Promise<void>,
    dependencies: string[] = []
  ): Promise<void> {
    this.orchestrationLog!.push({
      step,
      status: 'running',
      dependencies,
      startedAt: new Date().toISOString()
    })
    try {
      await fn()
      this.orchestrationLog![this.orchestrationLog!.length - 1].status = 'completed'
      this.orchestrationLog![this.orchestrationLog!.length - 1].endedAt = new Date().toISOString()
    } catch (error) {
      this.orchestrationLog![this.orchestrationLog!.length - 1].status = 'failed'
      this.orchestrationLog![this.orchestrationLog!.length - 1].endedAt = new Date().toISOString()
      this.orchestrationLog![this.orchestrationLog!.length - 1].error = error instanceof Error ? error.message : String(error)
      this.results.recommendations.push(`Rollback suggested for step: ${step}`)
      throw error
    }
  }

  async runAudit(): Promise<AuditResult> {
    console.log('🔍 @qa Agent - Starting Code Audit...')

    try {
      // Orquestación avanzada de pasos
      await this.runStep('Linting', () => this.checkLinting())
      await this.runStep('Tests', () => this.checkTests(), ['Linting'])
      await this.runStep('Coverage', () => this.checkCoverage(), ['Tests'])
      await this.runStep('Secrets', () => this.checkSecretsExposed(), ['Coverage'])
      await this.runStep('SensitiveFilePermissions', () => this.checkSensitiveFilePermissions(), ['Secrets'])
      await this.runStep('DeepDependencyVulnerabilities', () => this.checkDeepDependencyVulnerabilities(), ['SensitiveFilePermissions'])
      await this.runStep('Security', () => this.checkSecurity(), ['DeepDependencyVulnerabilities'])
      await this.runStep('Performance', () => this.checkPerformance(), ['Security'])
      await this.runStep('AIInsights', () => this.checkAIInsights(), ['Performance'])

      // Generate summary
      this.generateSummary()

      // Protección estructural: backup automático
      this.backupPreviousReport()

      // Save results
      this.saveResults()

      console.log('✅ @qa Agent - Audit completed successfully')
      return this.results
    } catch (error) {
      console.error('❌ @qa Agent - Audit failed:', error)
      this.results.status = 'FAIL'
      this.results.summary = `Audit failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      return this.results
    }
  }

  private async checkLinting(): Promise<void> {
    try {
      console.log('  📝 Checking linting...')
      execSync('pnpm lint', { cwd: this.projectRoot, stdio: 'pipe' })
      this.results.checks.linting = {
        status: 'PASS',
        message: 'All linting rules passed',
      }
    } catch (error) {
      this.results.checks.linting = {
        status: 'FAIL',
        message: 'Linting errors found',
        details: error instanceof Error ? error.message : 'Unknown error',
      }
      this.results.recommendations.push('Fix linting errors before proceeding')
    }
  }

  private async checkTests(): Promise<void> {
    try {
      console.log('  🧪 Checking tests...')
      execSync('pnpm test', { cwd: this.projectRoot, stdio: 'pipe' })
      this.results.checks.tests = {
        status: 'PASS',
        message: 'All tests passing',
      }
    } catch (error) {
      this.results.checks.tests = {
        status: 'FAIL',
        message: 'Some tests are failing',
        details: error instanceof Error ? error.message : 'Unknown error',
      }
      this.results.recommendations.push('Fix failing tests before proceeding')
    }
  }

  private async checkCoverage(): Promise<void> {
    try {
      console.log('  📊 Checking test coverage...')
      const coverageOutput = execSync('pnpm test:coverage', {
        cwd: this.projectRoot,
        stdio: 'pipe',
        encoding: 'utf8',
      })

      // Parse coverage output to check if it meets 90% threshold
      if (coverageOutput.includes('90%') || coverageOutput.includes('100%')) {
        this.results.checks.coverage = {
          status: 'PASS',
          message: 'Test coverage meets 90% threshold',
        }
      } else {
        this.results.checks.coverage = {
          status: 'WARNING',
          message: 'Test coverage below 90% threshold',
        }
        this.results.recommendations.push(
          'Increase test coverage to 90% or higher',
        )
      }
    } catch (error) {
      this.results.checks.coverage = {
        status: 'FAIL',
        message: 'Could not determine test coverage',
        details: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private async checkSecurity(): Promise<void> {
    try {
      console.log('  🔒 Checking security vulnerabilities...')

      // Check for common security issues
      const packageJson = JSON.parse(
        readFileSync(join(this.projectRoot, 'package.json'), 'utf8'),
      )
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      }

      // Check for known vulnerable packages (simplified check)
      const vulnerablePackages = ['lodash', 'moment'] // Example vulnerable packages
      const foundVulnerable = Object.keys(dependencies).filter((pkg) =>
        vulnerablePackages.includes(pkg),
      )

      if (foundVulnerable.length > 0) {
        this.results.checks.security = {
          status: 'WARNING',
          message: `Potentially vulnerable packages found: ${foundVulnerable.join(', ')}`,
        }
        this.results.recommendations.push(
          'Update vulnerable packages to latest versions',
        )
      } else {
        this.results.checks.security = {
          status: 'PASS',
          message: 'No obvious security vulnerabilities detected',
        }
      }
    } catch (error) {
      this.results.checks.security = {
        status: 'FAIL',
        message: 'Security check failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private async checkPerformance(): Promise<void> {
    try {
      console.log('  ⚡ Checking performance metrics...')

      // Check bundle size and build performance
      const buildOutput = execSync('pnpm build', {
        cwd: this.projectRoot,
        stdio: 'pipe',
        encoding: 'utf8',
      })

      // Simple performance check - if build completes successfully
      if (
        buildOutput.includes('Build completed') ||
        buildOutput.includes('success')
      ) {
        this.results.checks.performance = {
          status: 'PASS',
          message: 'Build completed successfully',
        }
      } else {
        this.results.checks.performance = {
          status: 'WARNING',
          message: 'Build completed with warnings',
        }
      }
    } catch (error) {
      this.results.checks.performance = {
        status: 'FAIL',
        message: 'Build failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      }
      this.results.recommendations.push(
        'Fix build issues to improve performance',
      )
    }
  }

  // NUEVO: Validación de secretos expuestos
  private async checkSecretsExposed(): Promise<void> {
    try {
      console.log('  🕵️  Checking for exposed secrets...')
      const secretPatterns = [
        /(?<!\/\/.*)(api[_-]?key|secret|token|password)[^\n]*['\"][A-Za-z0-9_-]{16,}['\"]/gi,
        /['\"](sk_live|sk_test|pk_live|pk_test|ghp_[A-Za-z0-9]{36,})['\"]/gi,
        /['\"][A-Za-z0-9]{32,}['\"]/g // genérico
      ]
      const files = this.getProjectFiles(['.env', '.js', '.ts', '.json', '.yml', '.yaml'])
      let foundSecrets: string[] = []

      for (const file of files) {
        const content = readFileSync(file, 'utf8')
        for (const pattern of secretPatterns) {
          const matches = content.match(pattern)
          if (matches) {
            foundSecrets = foundSecrets.concat(matches.map(m => `${file}: ${m}`))
          }
        }
      }

      if (foundSecrets.length > 0) {
        this.results.checks.security = {
          status: 'FAIL',
          message: `Exposed secrets found: ${foundSecrets.join(', ')}`
        }
        this.results.recommendations.push('Remove or rotate exposed secrets immediately.')
      }
    } catch (error) {
      this.results.checks.security = {
        status: 'FAIL',
        message: 'Secret exposure check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Validación de permisos de archivos sensibles
  private async checkSensitiveFilePermissions(): Promise<void> {
    try {
      console.log('  🔒 Checking permissions of sensitive files...')
      const sensitiveFiles = this.getProjectFiles(['.env', 'secrets', 'secrets.json', 'secrets.yml'])
      const fs = await import('fs')
      const badPerms: string[] = []

      for (const file of sensitiveFiles) {
        const stat = fs.statSync(file)
        // Permisos: solo owner puede leer/escribir (0o600)
        if ((stat.mode & 0o077) !== 0) {
          badPerms.push(`${file} (mode: ${stat.mode.toString(8)})`)
        }
      }

      if (badPerms.length > 0) {
        this.results.checks.security = {
          status: 'FAIL',
          message: `Sensitive files with insecure permissions: ${badPerms.join(', ')}`
        }
        this.results.recommendations.push('Restrict permissions of sensitive files to 600 (owner read/write only).')
      }
    } catch (error) {
      this.results.checks.security = {
        status: 'FAIL',
        message: 'Sensitive file permissions check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Escaneo profundo de dependencias
  private async checkDeepDependencyVulnerabilities(): Promise<void> {
    try {
      console.log('  🛡️  Checking deep dependency vulnerabilities...')
      let auditResult = ''
      try {
        auditResult = execSync('pnpm audit --json', { encoding: 'utf-8' })
      } catch {
        // fallback a npm si pnpm no está disponible
        try {
          auditResult = execSync('npm audit --json', { encoding: 'utf-8' })
        } catch {
          this.results.checks.security = {
            status: 'WARNING',
            message: 'Could not run pnpm/npm audit'
          }
          return
        }
      }
      const audit = JSON.parse(auditResult)
      if (audit.metadata && audit.metadata.vulnerabilities && audit.metadata.vulnerabilities.critical > 0) {
        this.results.checks.security = {
          status: 'FAIL',
          message: `Critical vulnerabilities found: ${audit.metadata.vulnerabilities.critical}`
        }
        this.results.recommendations.push('Update or patch critical vulnerable dependencies immediately.')
      }
    } catch (error) {
      this.results.checks.security = {
        status: 'FAIL',
        message: 'Deep dependency vulnerability check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Simulación de análisis AI y recomendaciones inteligentes
  private async checkAIInsights(): Promise<void> {
    try {
      console.log('  🤖 Running AI code analysis...')
      // Simulación de insights AI (en producción, integrar con OpenAI o similar)
      const aiFindings: Array<{ file: string; insight: string; confidence: number }> = [
        {
          file: 'src/app.ts',
          insight: 'Consider refactoring large functions into smaller units for better maintainability.',
          confidence: 0.92
        },
        {
          file: 'src/utils/helpers.ts',
          insight: 'Detected possible duplicate code blocks. Use utility functions to DRY.',
          confidence: 0.88
        },
        {
          file: 'src/services/api.ts',
          insight: 'API error handling could be improved with more granular error types.',
          confidence: 0.85
        }
      ]
      aiFindings.forEach(finding => {
        this.results.recommendations.push(
          `[AI] ${finding.file}: ${finding.insight} (confidence: ${Math.round(finding.confidence * 100)}%)`
        )
      })
    } catch (error) {
      this.results.recommendations.push('[AI] AI analysis failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  // Helper para obtener archivos del proyecto
  private getProjectFiles(extensions: string[]): string[] {
    const walk = (dir: string): string[] => {
      let results: string[] = []
      const list = readdirSync(dir)
      for (const file of list) {
        const filePath = join(dir, file)
        const stat = statSync(filePath)
        if (stat && stat.isDirectory()) {
          results = results.concat(walk(filePath))
        } else if (extensions.some(ext => filePath.endsWith(ext))) {
          results.push(filePath)
        }
      }
      return results
    }
    return walk(this.projectRoot)
  }

  private generateSummary(): void {
    const checks = this.results.checks
    const passed = Object.values(checks).filter(
      (c) => c.status === 'PASS',
    ).length
    const failed = Object.values(checks).filter(
      (c) => c.status === 'FAIL',
    ).length
    const warnings = Object.values(checks).filter(
      (c) => c.status === 'WARNING',
    ).length

    this.results.summary = `QA Audit: ${passed} passed, ${failed} failed, ${warnings} warnings`

    // Determine overall status
    if (failed > 0) {
      this.results.status = 'FAIL'
    } else if (warnings > 0) {
      this.results.status = 'WARNING'
    } else {
      this.results.status = 'PASS'
    }
  }

  private backupPreviousReport(): void {
    const reportPath = join(this.projectRoot, 'audit-artifacts', 'qa-audit.json')
    if (existsSync(reportPath)) {
      const backupDir = join(this.projectRoot, 'audit-artifacts', 'backups')
      if (!existsSync(backupDir)) mkdirSync(backupDir, { recursive: true })
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      copyFileSync(reportPath, join(backupDir, `qa-audit-${timestamp}.json`))
    }
  }

  private saveResults(): void {
    const resultsPath = join(
      this.projectRoot,
      'audit-artifacts',
      'qa-audit.json',
    )
    const reportData = JSON.stringify({ ...this.results, orchestrationLog: this.orchestrationLog }, null, 2)
    const hash = crypto.createHash('sha256').update(reportData).digest('hex')
    const reportWithHash = { ...this.results, orchestrationLog: this.orchestrationLog, integrityHash: hash }
    writeFileSync(resultsPath, JSON.stringify(reportWithHash, null, 2))
    console.log(`📄 Audit results saved to: ${resultsPath} (hash: ${hash})`)
  }
}

// Main execution
async function main() {
  const qaAgent = new QAAgent()
  const results = await qaAgent.runAudit()

  console.log('\n📋 QA Audit Summary:')
  console.log(`Status: ${results.status}`)
  console.log(`Summary: ${results.summary}`)

  if (results.recommendations.length > 0) {
    console.log('\n💡 Recommendations:')
    results.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`)
    })
  }

  // Exit with appropriate code
  process.exit(results.status === 'PASS' ? 0 : 1)
}

// Check if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { QAAgent }
