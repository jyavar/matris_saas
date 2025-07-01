#!/usr/bin/env tsx

/**
 * @qa Agent - Main Entry Point
 *
 * Provides a unified interface for QA operations
 */

import { QAAgent } from './audit'
import { QARunner } from './run-qa'

export interface QAOptions {
  mode?: 'audit' | 'runner'
  verbose?: boolean
  saveReport?: boolean
  exitOnFailure?: boolean
}

export interface QAResult {
  status: 'PASS' | 'FAIL' | 'WARNING'
  summary: string
  recommendations: string[]
  timestamp?: string
  checks?: Record<string, { status: string; message: string; details?: string }>
}

export class QAManager {
  private options: QAOptions

  constructor(options: QAOptions = {}) {
    this.options = {
      mode: 'audit',
      verbose: false,
      saveReport: true,
      exitOnFailure: true,
      ...options,
    }
  }

  async run(): Promise<QAResult | { status: string }> {
    console.log('🔍 @qa Agent Manager - Starting QA operations...')

    try {
      if (this.options.mode === 'runner') {
        const runner = new QARunner({
          verbose: this.options.verbose,
          saveReport: this.options.saveReport,
          exitOnFailure: this.options.exitOnFailure,
        })
        await runner.run()
        return { status: 'completed' }
      } else {
        const agent = new QAAgent()
        const results = await agent.runAudit()

        if (this.options.verbose) {
          this.displayResults(results)
        }

        return results
      }
    } catch (error) {
      console.error('❌ @qa Agent Manager failed:', error)
      throw error
    }
  }

  private displayResults(results: QAResult): void {
    console.log('\n📋 QA Audit Results:')
    console.log('='.repeat(50))
    console.log(
      `Status: ${this.getStatusEmoji(results.status)} ${results.status}`,
    )
    console.log(`Summary: ${results.summary}`)

    if (results.recommendations.length > 0) {
      console.log('\n💡 Recommendations:')
      results.recommendations.forEach((rec: string, index: number) => {
        console.log(`${index + 1}. ${rec}`)
      })
    }
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
  const options: QAOptions = {}

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    switch (arg) {
      case '--mode':
        options.mode = args[++i] as 'audit' | 'runner'
        break
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
@qa Agent Manager

Usage: tsx scripts/agents/qa/index.ts [options]

Options:
  --mode <mode>         Operation mode: 'audit' or 'runner' (default: audit)
  --verbose, -v         Enable verbose output
  --no-save            Don't save audit report
  --no-exit            Don't exit on failure
  --help, -h           Show this help message

Examples:
  tsx scripts/agents/qa/index.ts
  tsx scripts/agents/qa/index.ts --mode runner --verbose
  tsx scripts/agents/qa/index.ts --mode audit --no-exit
        `)
        process.exit(0)
        break
    }
  }

  const manager = new QAManager(options)
  const result = await manager.run()

  if (options.mode === 'audit') {
    console.log('✅ QA Audit completed')
    return result
  }
}

// Check if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { QAAgent, QARunner }
