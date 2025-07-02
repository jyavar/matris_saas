#!/usr/bin/env tsx

/**
 * @data Agent - Main Entry Point
 *
 * Provides a unified interface for data processing operations
 */

import { DataProcessingResult, DataProcessor } from './processor'

export interface DataOptions {
  migrate?: boolean
  seed?: boolean
  validate?: boolean
  backup?: boolean
  analytics?: boolean
  verbose?: boolean
  saveReport?: boolean
  exitOnFailure?: boolean
}

export interface DataResult {
  status: 'SUCCESS' | 'FAILED' | 'PARTIAL'
  summary: string
  operations: {
    migration: OperationResult
    seeding: OperationResult
    validation: OperationResult
    backup: OperationResult
    analytics: OperationResult
  }
  errors: string[]
  warnings: string[]
  timestamp: string
}

// Re-export the processor types for compatibility
export type { DataProcessingResult } from './processor'

export interface OperationResult {
  status: 'SUCCESS' | 'FAILED' | 'SKIPPED'
  message: string
  details?: unknown
  duration?: number
}

export class DataManager {
  private options: DataOptions
  private processor: DataProcessor

  constructor(options: DataOptions = {}) {
    this.options = {
      migrate: true,
      validate: true,
      analytics: true,
      verbose: false,
      saveReport: true,
      exitOnFailure: true,
      ...options,
    }
    this.processor = new DataProcessor()
  }

  async run(): Promise<DataProcessingResult> {
    console.log('🔄 @data Agent Manager - Starting data processing...')

    try {
      const result = await this.processor.processData(this.options)

      if (this.options.verbose) {
        this.displayResults(result)
      }

      if (this.options.exitOnFailure && result.status === 'FAILED') {
        console.error('❌ Data processing failed, exiting...')
        process.exit(1)
      }

      return result
    } catch (error) {
      console.error('❌ @data Agent Manager failed:', error)
      throw error
    }
  }

  private displayResults(results: DataProcessingResult): void {
    console.log('\n📊 Data Processing Results:')
    console.log('='.repeat(50))
    console.log(
      `Status: ${this.getStatusEmoji(results.status)} ${results.status}`,
    )
    console.log(`Summary: ${results.summary}`)

    console.log('\n📋 Operations:')
    Object.entries(results.operations).forEach(([operation, result]) => {
      const emoji = this.getOperationEmoji(result.status)
      console.log(`${emoji} ${operation}: ${result.status} - ${result.message}`)
      if (result.duration) {
        console.log(`   Duration: ${result.duration}ms`)
      }
    })

    if (results.errors.length > 0) {
      console.log('\n❌ Errors:')
      results.errors.forEach((error: string, index: number) => {
        console.log(`${index + 1}. ${error}`)
      })
    }

    if (results.warnings.length > 0) {
      console.log('\n⚠️ Warnings:')
      results.warnings.forEach((warning: string, index: number) => {
        console.log(`${index + 1}. ${warning}`)
      })
    }
  }

  private getStatusEmoji(status: string): string {
    switch (status) {
      case 'SUCCESS':
        return '✅'
      case 'FAILED':
        return '❌'
      case 'PARTIAL':
        return '⚠️'
      default:
        return '❓'
    }
  }

  private getOperationEmoji(status: string): string {
    switch (status) {
      case 'SUCCESS':
        return '✅'
      case 'FAILED':
        return '❌'
      case 'SKIPPED':
        return '⏭️'
      default:
        return '❓'
    }
  }

  private parseOptions(context: DataOptions): Partial<DataOptions> {
    const options: Partial<DataOptions> = {}
    if (context.migrate) options.migrate = true
    if (context.seed) options.seed = true
    if (context.validate) options.validate = true
    if (context.backup) options.backup = true
    if (context.analytics) options.analytics = true
    if (Object.keys(options).length === 0) {
      options.migrate = true
      options.validate = true
      options.analytics = true
    }
    return options
  }

  private mapStatus(
    status: 'SUCCESS' | 'FAILED' | 'PARTIAL',
  ): 'SUCCESS' | 'FAILED' | 'PARTIAL' {
    switch (status) {
      case 'SUCCESS':
        return 'SUCCESS'
      case 'FAILED':
        return 'FAILED'
      case 'PARTIAL':
        return 'PARTIAL'
      default:
        return 'FAILED'
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const options: DataOptions = {}

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    switch (arg) {
      case '--migrate':
        options.migrate = true
        break
      case '--seed':
        options.seed = true
        break
      case '--validate':
        options.validate = true
        break
      case '--backup':
        options.backup = true
        break
      case '--analytics':
        options.analytics = true
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
@data Agent Manager

Usage: tsx scripts/agents/data/index.ts [options]

Options:
  --migrate            Run database migrations
  --seed               Run database seeding
  --validate           Run data validation
  --backup             Run backup operations
  --analytics          Run analytics processing
  --verbose, -v        Enable verbose output
  --no-save            Don't save processing report
  --no-exit            Don't exit on failure
  --help, -h           Show this help message

Examples:
  tsx scripts/agents/data/index.ts
  tsx scripts/agents/data/index.ts --migrate --seed --verbose
  tsx scripts/agents/data/index.ts --validate --no-exit
        `)
        process.exit(0)
        break
    }
  }

  const manager = new DataManager(options)
  const result = await manager.run()

  console.log('✅ Data processing completed')
  return result
}

// Check if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { DataProcessor }
