#!/usr/bin/env tsx

/**
 * @data Agent - Configuration
 */

import { z } from 'zod'

const DataConfigSchema = z.object({
  enabled: z.boolean().default(true),
  timeout: z.number().default(300000), // 5 minutes for data operations
  verbose: z.boolean().default(false),
  dryRun: z.boolean().default(false),
  saveReport: z.boolean().default(true),
  exitOnFailure: z.boolean().default(true),
  migrate: z.boolean().default(true),
  seed: z.boolean().default(false),
  validate: z.boolean().default(true),
  backup: z.boolean().default(false),
  analytics: z.boolean().default(true),
  maxRetries: z.number().default(3),
  retryDelay: z.number().default(1000)
})

export type DataConfig = z.infer<typeof DataConfigSchema>

export class DataConfigManager {
  private config: DataConfig

  constructor(overrides: Partial<DataConfig> = {}) {
    this.config = DataConfigSchema.parse({
      ...this.getDefaults(),
      ...overrides
    })
  }

  getConfig(): DataConfig {
    return this.config
  }

  updateConfig(updates: Partial<DataConfig>): void {
    this.config = DataConfigSchema.parse({
      ...this.config,
      ...updates
    })
  }

  private getDefaults(): DataConfig {
    return {
      enabled: true,
      timeout: 300000,
      verbose: false,
      dryRun: false,
      saveReport: true,
      exitOnFailure: true,
      migrate: true,
      seed: false,
      validate: true,
      backup: false,
      analytics: true,
      maxRetries: 3,
      retryDelay: 1000
    }
  }
}

export const defaultConfig = new DataConfigManager() 