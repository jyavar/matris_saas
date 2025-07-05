import { describe, it, expect, beforeEach, vi } from 'vitest'
import { DataAgent, type DataOptions } from '../autofix'

// Mock dependencies
vi.mock('../config', () => ({
  DataConfigManager: vi.fn().mockImplementation(() => ({
    getConfig: vi.fn().mockReturnValue({
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
    })
  }))
}))

vi.mock('../log', () => ({
  DataLogger: vi.fn().mockImplementation(() => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn()
  }))
}))

vi.mock('../report', () => ({
  generateReport: vi.fn().mockResolvedValue(undefined)
}))

vi.mock('../processor', () => ({
  DataProcessor: vi.fn().mockImplementation(() => ({
    processData: vi.fn().mockResolvedValue({
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      operations: {
        migration: { status: 'SUCCESS', message: 'Migration completed' },
        seeding: { status: 'SKIPPED', message: 'Seeding skipped' },
        validation: { status: 'SUCCESS', message: 'Validation completed' },
        backup: { status: 'SKIPPED', message: 'Backup skipped' },
        analytics: { status: 'SUCCESS', message: 'Analytics completed' }
      },
      summary: 'All operations completed successfully',
      errors: [],
      warnings: []
    })
  }))
}))

describe('DataAgent', () => {
  let agent: DataAgent

  beforeEach(() => {
    vi.clearAllMocks()
    agent = new DataAgent()
  })

  describe('constructor', () => {
    it('should initialize with default options', () => {
      expect(agent).toBeDefined()
    })

    it('should accept custom options', () => {
      const options: DataOptions = {
        verbose: true,
        dryRun: true,
        migrate: false,
        validate: false
      }
      const customAgent = new DataAgent(options)
      expect(customAgent).toBeDefined()
    })
  })

  describe('run', () => {
    it('should execute successfully with default options', async () => {
      const result = await agent.run()
      
      expect(result.success).toBe(true)
      expect(result.message).toBe('All operations completed successfully')
      expect(result.data).toBeDefined()
      expect(result.errors).toBeDefined()
    })

    it('should handle dry-run mode', async () => {
      // Mock DataConfigManager to return dryRun: true
      const { DataConfigManager } = await import('../config')
      vi.mocked(DataConfigManager).mockImplementation(() => ({
        getConfig: vi.fn().mockReturnValue({
          enabled: true,
          timeout: 300000,
          verbose: false,
          dryRun: true, // This is the key change
          saveReport: true,
          exitOnFailure: true,
          migrate: true,
          seed: false,
          validate: true,
          backup: false,
          analytics: true,
          maxRetries: 3,
          retryDelay: 1000
        })
      }))

      const dryRunAgent = new DataAgent({ dryRun: true })
      const result = await dryRunAgent.run()
      
      expect(result.success).toBe(true)
      expect(result.message).toBe('Dry-run completed successfully')
      expect(result.data?.status).toBe('SUCCESS')
    })

    it('should handle errors gracefully', async () => {
      const { DataProcessor } = await import('../processor')
      vi.mocked(DataProcessor).mockImplementation(() => ({
        processData: vi.fn().mockRejectedValue(new Error('Test error'))
      } as any))

      const errorAgent = new DataAgent()
      await expect(errorAgent.run()).rejects.toThrow('Test error')
    })

    it('should return failure status when operations fail', async () => {
      const { DataProcessor } = await import('../processor')
      vi.mocked(DataProcessor).mockImplementation(() => ({
        processData: vi.fn().mockResolvedValue({
          timestamp: new Date().toISOString(),
          status: 'FAILED',
          operations: {
            migration: { status: 'FAILED', message: 'Migration failed' },
            seeding: { status: 'SKIPPED', message: 'Seeding skipped' },
            validation: { status: 'SKIPPED', message: 'Validation skipped' },
            backup: { status: 'SKIPPED', message: 'Backup skipped' },
            analytics: { status: 'SKIPPED', message: 'Analytics skipped' }
          },
          summary: 'Operations failed',
          errors: ['Migration failed'],
          warnings: []
        })
      } as any))

      const failureAgent = new DataAgent()
      const result = await failureAgent.run()
      
      expect(result.success).toBe(false)
      expect(result.errors).toContain('Migration failed')
    })
  })
}) 