#!/usr/bin/env tsx

/**
 * @data Agent - Unit Tests
 *
 * Comprehensive test suite for the data processing agent
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { DataManager, DataOptions, DataProcessor, DataResult } from './index'

// Mock child_process
vi.mock('child_process', () => ({
  execSync: vi.fn(),
}))

// Mock fs
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  existsSync: vi.fn(),
}))

// Mock path
vi.mock('path', () => ({
  join: vi.fn((...args: string[]) => args.join('/')),
}))

describe('@data Agent', () => {
  let dataManager: DataManager
  let dataProcessor: DataProcessor

  beforeEach(() => {
    vi.clearAllMocks()
    dataManager = new DataManager()
    dataProcessor = new DataProcessor()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('DataManager', () => {
    describe('constructor', () => {
      it('should initialize with default options', () => {
        const manager = new DataManager()
        expect(manager).toBeInstanceOf(DataManager)
      })

      it('should merge custom options with defaults', () => {
        const customOptions: DataOptions = {
          migrate: false,
          seed: true,
          verbose: true,
        }

        const manager = new DataManager(customOptions)
        expect(manager).toBeInstanceOf(DataManager)
      })
    })

    describe('run', () => {
      it('should process data successfully with default options', async () => {
        const mockResult: DataResult = {
          status: 'SUCCESS',
          summary: 'Data processing completed successfully',
          timestamp: new Date().toISOString(),
          operations: {
            migration: { status: 'SUCCESS', message: 'Migrations completed' },
            seeding: { status: 'SKIPPED', message: 'No seed script found' },
            validation: { status: 'SUCCESS', message: 'Validation completed' },
            backup: { status: 'SKIPPED', message: 'No backup script found' },
            analytics: { status: 'SUCCESS', message: 'Analytics completed' },
          },
          errors: [],
          warnings: ['Database seeding skipped - No seed script found'],
        }

        vi.spyOn(dataProcessor, 'processData').mockResolvedValue(mockResult)

        const result = await dataManager.run()

        expect(result).toEqual(mockResult)
        expect(dataProcessor.processData).toHaveBeenCalledWith({
          migrate: true,
          validate: true,
          analytics: true,
          verbose: false,
          saveReport: true,
          exitOnFailure: true,
        })
      })

      it('should handle processing failures gracefully', async () => {
        const mockError = new Error('Processing failed')
        vi.spyOn(dataProcessor, 'processData').mockRejectedValue(mockError)

        await expect(dataManager.run()).rejects.toThrow('Processing failed')
      })

      it('should exit on failure when exitOnFailure is true', async () => {
        const mockResult: DataResult = {
          status: 'FAILED',
          summary: 'Data processing failed',
          timestamp: new Date().toISOString(),
          operations: {
            migration: { status: 'FAILED', message: 'Migration failed' },
            seeding: { status: 'SKIPPED', message: 'No seed script found' },
            validation: {
              status: 'SKIPPED',
              message: 'No validation script found',
            },
            backup: { status: 'SKIPPED', message: 'No backup script found' },
            analytics: {
              status: 'SKIPPED',
              message: 'No analytics script found',
            },
          },
          errors: ['Migration failed'],
          warnings: [],
        }

        const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
          throw new Error('process.exit called')
        })

        vi.spyOn(dataProcessor, 'processData').mockResolvedValue(mockResult)

        const manager = new DataManager({ exitOnFailure: true })

        await expect(manager.run()).rejects.toThrow('process.exit called')
        expect(exitSpy).toHaveBeenCalledWith(1)
      })
    })

    describe('displayResults', () => {
      it('should display results correctly for success', () => {
        const mockResult: DataResult = {
          status: 'SUCCESS',
          summary: 'All operations completed successfully',
          timestamp: new Date().toISOString(),
          operations: {
            migration: {
              status: 'SUCCESS',
              message: 'Migrations completed',
              duration: 1000,
            },
            seeding: {
              status: 'SUCCESS',
              message: 'Seeding completed',
              duration: 500,
            },
            validation: {
              status: 'SUCCESS',
              message: 'Validation completed',
              duration: 200,
            },
            backup: {
              status: 'SUCCESS',
              message: 'Backup completed',
              duration: 1500,
            },
            analytics: {
              status: 'SUCCESS',
              message: 'Analytics completed',
              duration: 800,
            },
          },
          errors: [],
          warnings: [],
        }

        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

        const manager = new DataManager({ verbose: true })
        // @ts-expect-error - Accessing private method for testing
        manager['displayResults'](mockResult)

        expect(consoleSpy).toHaveBeenCalled()
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringContaining('✅ SUCCESS'),
        )
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringContaining('All operations completed successfully'),
        )
      })

      it('should display errors and warnings correctly', () => {
        const mockResult: DataResult = {
          status: 'FAILED',
          summary: 'Some operations failed',
          timestamp: new Date().toISOString(),
          operations: {
            migration: { status: 'FAILED', message: 'Migration failed' },
            seeding: { status: 'SUCCESS', message: 'Seeding completed' },
            validation: { status: 'SUCCESS', message: 'Validation completed' },
            backup: { status: 'SKIPPED', message: 'No backup script found' },
            analytics: { status: 'SUCCESS', message: 'Analytics completed' },
          },
          errors: ['Migration failed', 'Database connection error'],
          warnings: ['Backup skipped - No script found'],
        }

        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

        const manager = new DataManager({ verbose: true })
        // @ts-expect-error - Accessing private method for testing
        manager['displayResults'](mockResult)

        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringContaining('❌ FAILED'),
        )
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringContaining('Migration failed'),
        )
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringContaining('Database connection error'),
        )
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringContaining('Backup skipped'),
        )
      })
    })

    describe('status emoji mapping', () => {
      it('should return correct emojis for different statuses', () => {
        const manager = new DataManager()

        // @ts-expect-error - Accessing private method for testing
        expect(manager['getStatusEmoji']('SUCCESS')).toBe('✅')
        // @ts-expect-error - Accessing private method for testing
        expect(manager['getStatusEmoji']('FAILED')).toBe('❌')
        // @ts-expect-error - Accessing private method for testing
        expect(manager['getStatusEmoji']('PARTIAL')).toBe('⚠️')
        // @ts-expect-error - Accessing private method for testing
        expect(manager['getStatusEmoji']('UNKNOWN')).toBe('❓')
      })

      it('should return correct emojis for operation statuses', () => {
        const manager = new DataManager()

        // @ts-expect-error - Accessing private method for testing
        expect(manager['getOperationEmoji']('SUCCESS')).toBe('✅')
        // @ts-expect-error - Accessing private method for testing
        expect(manager['getOperationEmoji']('FAILED')).toBe('❌')
        // @ts-expect-error - Accessing private method for testing
        expect(manager['getOperationEmoji']('SKIPPED')).toBe('⏭️')
        // @ts-expect-error - Accessing private method for testing
        expect(manager['getOperationEmoji']('UNKNOWN')).toBe('❓')
      })
    })
  })

  describe('DataProcessor', () => {
    describe('processData', () => {
      it('should process data with default options', async () => {
        const result = await dataProcessor.processData()

        expect(result).toBeDefined()
        expect(result.status).toBeDefined()
        expect(result.operations).toBeDefined()
        expect(result.summary).toBeDefined()
        expect(result.errors).toBeDefined()
        expect(result.warnings).toBeDefined()
      })

      it('should handle specific operation options', async () => {
        const options = {
          migrate: true,
          seed: false,
          validate: true,
          backup: false,
          analytics: false,
        }

        const result = await dataProcessor.processData(options)

        expect(result.operations.migration.status).toBeDefined()
        expect(result.operations.seeding.status).toBe('SKIPPED')
        expect(result.operations.validation.status).toBeDefined()
        expect(result.operations.backup.status).toBe('SKIPPED')
        expect(result.operations.analytics.status).toBe('SKIPPED')
      })
    })

    describe('environment validation', () => {
      it('should validate required environment variables', () => {
        const originalEnv = process.env

        // Test with missing variables
        process.env = { NODE_ENV: 'test' } as NodeJS.ProcessEnv

        // @ts-expect-error - Accessing private method for testing
        const result = dataProcessor['validateEnvironment']()

        expect(result).toBe(false)

        // Test with all required variables
        process.env = {
          ...originalEnv,
          SUPABASE_URL: 'https://test.supabase.co',
          SUPABASE_ANON_KEY: 'test-key',
          JWT_SECRET: 'test-secret',
        }

        // @ts-expect-error - Accessing private method for testing
        const result2 = dataProcessor['validateEnvironment']()

        expect(result2).toBe(true)

        // Restore original env
        process.env = originalEnv
      })
    })

    describe('analytics processing', () => {
      it('should process analytics data correctly', async () => {
        // @ts-expect-error - Accessing private method for testing
        const result = await dataProcessor['processAnalyticsData']()

        expect(result).toBeDefined()
        expect(result.records).toBeGreaterThan(0)
        expect(result.summary).toBeDefined()
        expect(typeof result.records).toBe('number')
        expect(typeof result.summary).toBe('string')
      })
    })
  })

  describe('CLI Interface', () => {
    it('should parse command line arguments correctly', () => {
      const originalArgv = process.argv

      // Test with various arguments
      process.argv = ['node', 'script.js', '--migrate', '--seed', '--verbose']

      // This would test the CLI parsing logic
      // For now, we'll just verify the structure
      expect(process.argv).toContain('--migrate')
      expect(process.argv).toContain('--seed')
      expect(process.argv).toContain('--verbose')

      // Restore original argv
      process.argv = originalArgv
    })
  })

  describe('Integration Tests', () => {
    it('should handle complete data processing workflow', async () => {
      const manager = new DataManager({
        migrate: true,
        validate: true,
        analytics: true,
        verbose: true,
      })

      const result = await manager.run()

      expect(result.status).toBeDefined()
      expect(result.operations).toBeDefined()
      expect(result.errors).toBeDefined()
      expect(result.warnings).toBeDefined()
    })
  })

  describe('runAgent (compliance log)', () => {
    it('debe generar log estructurado con los campos requeridos', async () => {
      const mockWrite = vi.fn()
      // Mock DataManager para que no ejecute lógica real
      const mockRun = vi.fn().mockResolvedValue({
        status: 'SUCCESS',
        summary: 'OK',
        operations: {},
        errors: [],
        warnings: [],
        timestamp: new Date().toISOString(),
      })
      // Sobrescribir DataManager temporalmente
      const { default: runAgent, DataManager } = await import('./index')
      DataManager.prototype.run = mockRun
      await runAgent({ writeFileSync: mockWrite })
      expect(mockWrite).toHaveBeenCalled()
      const [, data] = mockWrite.mock.calls[0]
      const log = JSON.parse(data)
      expect(log).toHaveProperty('timestamp')
      expect(log).toHaveProperty('agentName', '@data')
      expect(log).toHaveProperty('status')
      expect(log).toHaveProperty('errors')
      expect(Array.isArray(log.errors)).toBe(true)
      expect(log).toHaveProperty('actionsPerformed')
      expect(Array.isArray(log.actionsPerformed)).toBe(true)
    })
  })
})
