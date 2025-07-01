#!/usr/bin/env tsx

/**
 * @qa Agent Runner
 *
 * Executes the QA agent with configurable options
 */

import { QAAgent } from './audit'

interface QARunnerOptions {
  verbose?: boolean
  saveReport?: boolean
  exitOnFailure?: boolean
}

interface QAResult {
  status: 'PASS' | 'FAIL' | 'WARNING'
  summary: string
  recommendations: string[]
  timestamp: string
  checks: Record<string, { status: string; message: string; details?: string }>
}

class QARunner {
  private options: QARunnerOptions

  constructor(options: QARunnerOptions = {}) {
    this.options = {
      verbose: false,
      saveReport: true,
      exitOnFailure: true,
      ...options,
    }
  }

  async run(): Promise<void> {
    console.log('🚀 Starting @qa Agent Runner...')

    if (this.options.verbose) {
      console.log('Options:', this.options)
    }

    try {
      const qaAgent = new QAAgent()
      const results = await qaAgent.runAudit()

      this.displayResults(results)

      if (this.options.exitOnFailure && results.status === 'FAIL') {
        console.error('❌ QA Audit failed - exiting with code 1')
        process.exit(1)
      }

      if (results.status === 'PASS') {
        console.log('✅ QA Audit passed successfully')
        process.exit(0)
      } else {
        console.log('⚠️  QA Audit completed with warnings')
        process.exit(0)
      }
    } catch (error) {
      console.error('❌ QA Agent Runner failed:', error)
      process.exit(1)
    }
  }

  private displayResults(results: QAResult): void {
    console.log('\n📋 QA Audit Results:')
    console.log('='.repeat(50))
    console.log(
      `Status: ${this.getStatusEmoji(results.status)} ${results.status}`,
    )
    console.log(`Timestamp: ${results.timestamp}`)
    console.log(`Summary: ${results.summary}`)

    console.log('\n🔍 Detailed Checks:')
    console.log('-'.repeat(30))

    Object.entries(results.checks).forEach(
      ([checkName, check]: [
        string,
        { status: string; message: string; details?: string },
      ]) => {
        const emoji = this.getStatusEmoji(check.status)
        console.log(`${emoji} ${checkName.toUpperCase()}: ${check.status}`)
        console.log(`   ${check.message}`)

        if (check.details && this.options.verbose) {
          console.log(`   Details: ${check.details}`)
        }
      },
    )

    if (results.recommendations.length > 0) {
      console.log('\n💡 Recommendations:')
      console.log('-'.repeat(30))
      results.recommendations.forEach((rec: string, index: number) => {
        console.log(`${index + 1}. ${rec}`)
      })
    }

    console.log('\n' + '='.repeat(50))
  }

  private getStatusEmoji(status: string): string {
    switch (status) {
      case 'PASS':
        return '✅'
      case 'FAIL':
        return '❌'
      case 'WARNING':
        return '⚠️'
      default:
        return '❓'
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const options: QARunnerOptions = {}

  // Parse command line arguments
  args.forEach((arg) => {
    switch (arg) {
      case '--verbose':
      case '-v':
        options.verbose = true
        break
      case '--no-save':
        options.saveReport = false
        break
      case '--no-exit':
        options.exitOnFailure = false
        break
      case '--help':
      case '-h':
        console.log(`
@qa Agent Runner

Usage: tsx scripts/agents/qa/run-qa.ts [options]

Options:
  --verbose, -v        Enable verbose output
  --no-save           Don't save audit report
  --no-exit           Don't exit on failure
  --help, -h          Show this help message

Examples:
  tsx scripts/agents/qa/run-qa.ts
  tsx scripts/agents/qa/run-qa.ts --verbose
  tsx scripts/agents/qa/run-qa.ts --no-exit
        `)
        process.exit(0)
        break
    }
  })

  const runner = new QARunner(options)
  await runner.run()
}

// Check if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { QARunner }
