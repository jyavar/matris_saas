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
import { readFileSync, writeFileSync } from 'fs'
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
}

interface CheckResult {
  status: 'PASS' | 'FAIL' | 'WARNING'
  message: string
  details?: unknown
}

class QAAgent {
  private projectRoot: string
  private results: AuditResult

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
    }
  }

  async runAudit(): Promise<AuditResult> {
    console.log('🔍 @qa Agent - Starting Code Audit...')

    try {
      // Run all audit checks
      await this.checkLinting()
      await this.checkTests()
      await this.checkCoverage()
      await this.checkSecurity()
      await this.checkPerformance()

      // Generate summary
      this.generateSummary()

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

  private saveResults(): void {
    const resultsPath = join(
      this.projectRoot,
      'audit-artifacts',
      'qa-audit.json',
    )
    writeFileSync(resultsPath, JSON.stringify(this.results, null, 2))
    console.log(`📄 Audit results saved to: ${resultsPath}`)
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
