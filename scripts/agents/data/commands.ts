#!/usr/bin/env tsx

/**
 * @data Agent - CLI Commands
 */

import { DataAgent, type DataOptions } from './autofix'
import { DataLogger } from './log'
import { DataProcessor } from './processor'

export const commands = {
  async run(options: Record<string, unknown> = {}): Promise<void> {
    const logger = new DataLogger({ verbose: options.verbose as boolean })
    logger.info('Executing @data agent via CLI')
    
    const dataOptions: DataOptions = {
      migrate: options.migrate as boolean,
      seed: options.seed as boolean,
      validate: options.validate as boolean,
      backup: options.backup as boolean,
      analytics: options.analytics as boolean,
      verbose: options.verbose as boolean,
      dryRun: options.dryRun as boolean,
      saveReport: options.saveReport as boolean,
      exitOnFailure: options.exitOnFailure as boolean
    }
    
    const agent = new DataAgent(dataOptions)
    await agent.run()
  },

  async validate(): Promise<void> {
    const logger = new DataLogger()
    logger.info('Running @data validation')
    
    const processor = new DataProcessor()
    const result = await processor.processData({ validate: true })
    
    if (result.status === 'SUCCESS') {
      logger.info('Data validation passed')
    } else {
      logger.error('Data validation failed', new Error(result.errors.join(', ')))
      process.exit(1)
    }
  },

  async test(): Promise<void> {
    const logger = new DataLogger()
    logger.info('Running @data tests')
    
    // Run validation as a test
    await commands.validate()
    
    logger.info('@data tests completed successfully')
  },

  async migrate(): Promise<void> {
    const logger = new DataLogger()
    logger.info('Running database migrations')
    
    const agent = new DataAgent({ migrate: true, validate: false, analytics: false })
    await agent.run()
  },

  async seed(): Promise<void> {
    const logger = new DataLogger()
    logger.info('Running database seeding')
    
    const agent = new DataAgent({ seed: true, migrate: false, validate: false, analytics: false })
    await agent.run()
  },

  async backup(): Promise<void> {
    const logger = new DataLogger()
    logger.info('Running data backup')
    
    const agent = new DataAgent({ backup: true, migrate: false, validate: false, analytics: false })
    await agent.run()
  },

  async analytics(): Promise<void> {
    const logger = new DataLogger()
    logger.info('Running analytics processing')
    
    const agent = new DataAgent({ analytics: true, migrate: false, validate: false })
    await agent.run()
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const command = args[0] || 'run'
  const options: Record<string, unknown> = {}
  
  // Parse additional options
  for (let i = 1; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const value = args[i + 1]
      if (value && !value.startsWith('--')) {
        options[key] = value === 'true' ? true : value === 'false' ? false : value
        i++ // Skip next argument
      } else {
        options[key] = true
      }
    }
  }
  
  if (commands[command as keyof typeof commands]) {
    await commands[command as keyof typeof commands](options)
  } else {
    console.error(`Unknown command: ${command}`)
    console.log('Available commands: run, validate, test, migrate, seed, backup, analytics')
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
} 