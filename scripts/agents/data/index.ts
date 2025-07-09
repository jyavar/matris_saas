#!/usr/bin/env tsx

/**
 * @data Agent - Entry Point
 */

import { DataAgent, type DataOptions, type DataResult } from './autofix'
import { commands } from './commands'

export interface DataManagerOptions {
  mode?: 'run' | 'validate' | 'test' | 'migrate' | 'seed' | 'backup' | 'analytics'
  verbose?: boolean
  dryRun?: boolean
  migrate?: boolean
  seed?: boolean
  validate?: boolean
  backup?: boolean
  analytics?: boolean
  saveReport?: boolean
  exitOnFailure?: boolean
}

export class DataManager {
  private options: DataManagerOptions

  constructor(options: DataManagerOptions = {}) {
    this.options = {
      mode: 'run',
      verbose: false,
      dryRun: false,
      migrate: true,
      validate: true,
      analytics: true,
      saveReport: true,
      exitOnFailure: true,
      ...options
    }
  }

  async execute(): Promise<void> {
    switch (this.options.mode) {
      case 'run': {
        const agent = new DataAgent(this.options)
        await agent.run()
        break
      }
      case 'validate':
        await commands.validate()
        break
      case 'test':
        await commands.test()
        break
      case 'migrate':
        await commands.migrate()
        break
      case 'seed':
        await commands.seed()
        break
      case 'backup':
        await commands.backup()
        break
      case 'analytics':
        await commands.analytics()
        break
      default:
        throw new Error(`Unknown mode: ${this.options.mode}`)
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const options: DataManagerOptions = {}

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    switch (arg) {
      case '--mode':
        options.mode = args[++i] as 'run' | 'validate' | 'test' | 'migrate' | 'seed' | 'backup' | 'analytics'
        break
      case '--verbose':
      case '-v':
        options.verbose = true
        break
      case '--dry-run':
        options.dryRun = true
        break
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
      case '--help':
      case '-h':
        console.log(`
@data Agent

Usage: tsx scripts/agents/data/index.ts [options]

Options:
  --mode <mode>     Execution mode: run, validate, test, migrate, seed, backup, analytics (default: run)
  --verbose, -v     Enable verbose output
  --dry-run         Execute without making changes
  --migrate         Run database migrations
  --seed            Run database seeding
  --validate        Run data validation
  --backup          Run data backup
  --analytics       Run analytics processing
  --help, -h        Show this help message
        `)
        process.exit(0)
        break
    }
  }

  const manager = new DataManager(options)
  await manager.execute()
}

// For orchestrator
export async function runAgent(options: Partial<DataOptions> = {}): Promise<DataResult> {
  const agent = new DataAgent(options)
  return await agent.run()
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { commands, DataAgent }
