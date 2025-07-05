#!/usr/bin/env tsx

/**
 * @data Agent - Main Logic
 * 
 * Implements the core functionality of the data processing agent
 */

import { DataConfigManager } from './config'
import { DataLogger } from './log'
import { generateReport } from './report'
import { DataProcessor, type DataProcessingResult } from './processor'

export interface DataOptions {
  migrate?: boolean
  seed?: boolean
  validate?: boolean
  backup?: boolean
  analytics?: boolean
  verbose?: boolean
  dryRun?: boolean
  saveReport?: boolean
  exitOnFailure?: boolean
}

export interface DataResult {
  success: boolean
  message: string
  data?: DataProcessingResult
  errors?: string[]
}

export class DataAgent {
  private config: DataConfigManager
  private logger: DataLogger
  private processor: DataProcessor

  constructor(options: DataOptions = {}) {
    this.config = new DataConfigManager(options)
    this.logger = new DataLogger()
    this.processor = new DataProcessor()
  }

  async run(): Promise<DataResult> {
    this.logger.info('Starting @data agent execution')
    
    try {
      const config = this.config.getConfig()
      
      if (config.dryRun) {
        this.logger.info('Running in dry-run mode')
        return {
          success: true,
          message: 'Dry-run completed successfully',
          data: {
            timestamp: new Date().toISOString(),
            status: 'SUCCESS',
            operations: {
              migration: { status: 'SKIPPED', message: 'Dry-run mode' },
              seeding: { status: 'SKIPPED', message: 'Dry-run mode' },
              validation: { status: 'SKIPPED', message: 'Dry-run mode' },
              backup: { status: 'SKIPPED', message: 'Dry-run mode' },
              analytics: { status: 'SKIPPED', message: 'Dry-run mode' }
            },
            summary: 'Dry-run completed',
            errors: [],
            warnings: []
          }
        }
      }

      // Execute main logic
      const result = await this.executeMainLogic()
      
      // Generate report
      if (config.saveReport) {
        await generateReport(result)
      }
      
      this.logger.info('@data agent completed successfully')
      return {
        success: result.status !== 'FAILED',
        message: result.summary,
        data: result,
        errors: result.errors
      }
    } catch (error) {
      this.logger.error('@data agent failed', error as Error)
      throw error
    }
  }

  private async executeMainLogic(): Promise<DataProcessingResult> {
    const config = this.config.getConfig()
    
    return await this.processor.processData({
      migrate: config.migrate,
      seed: config.seed,
      validate: config.validate,
      backup: config.backup,
      analytics: config.analytics
    })
  }
}

// For orchestrator
export async function runAgent(): Promise<void> {
  const agent = new DataAgent()
  await agent.run()
}

export default runAgent 