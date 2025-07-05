import { describe, it, expect, beforeEach } from 'vitest'
import { DataConfigManager, type DataConfig } from '../config'

describe('DataConfigManager', () => {
  let configManager: DataConfigManager

  beforeEach(() => {
    configManager = new DataConfigManager()
  })

  describe('constructor', () => {
    it('should initialize with default values', () => {
      const config = configManager.getConfig()
      
      expect(config.enabled).toBe(true)
      expect(config.timeout).toBe(300000)
      expect(config.verbose).toBe(false)
      expect(config.dryRun).toBe(false)
      expect(config.saveReport).toBe(true)
      expect(config.exitOnFailure).toBe(true)
      expect(config.migrate).toBe(true)
      expect(config.seed).toBe(false)
      expect(config.validate).toBe(true)
      expect(config.backup).toBe(false)
      expect(config.analytics).toBe(true)
      expect(config.maxRetries).toBe(3)
      expect(config.retryDelay).toBe(1000)
    })

    it('should accept custom overrides', () => {
      const overrides: Partial<DataConfig> = {
        verbose: true,
        dryRun: true,
        timeout: 60000,
        migrate: false
      }
      
      const customConfig = new DataConfigManager(overrides)
      const config = customConfig.getConfig()
      
      expect(config.verbose).toBe(true)
      expect(config.dryRun).toBe(true)
      expect(config.timeout).toBe(60000)
      expect(config.migrate).toBe(false)
    })

    it('should validate configuration values', () => {
      // Test with invalid values - should throw
      expect(() => {
        new DataConfigManager({
          timeout: -1000, // Invalid negative timeout
          maxRetries: -1  // Invalid negative retries
        } as any)
      }).toThrow()
    })
  })

  describe('getConfig', () => {
    it('should return the current configuration', () => {
      const config = configManager.getConfig()
      
      expect(config).toBeDefined()
      expect(typeof config.enabled).toBe('boolean')
      expect(typeof config.timeout).toBe('number')
      expect(typeof config.verbose).toBe('boolean')
    })
  })

  describe('updateConfig', () => {
    it('should update configuration values', () => {
      const updates: Partial<DataConfig> = {
        verbose: true,
        timeout: 120000
      }
      
      configManager.updateConfig(updates)
      const config = configManager.getConfig()
      
      expect(config.verbose).toBe(true)
      expect(config.timeout).toBe(120000)
    })

    it('should validate updates', () => {
      expect(() => {
        configManager.updateConfig({
          timeout: -5000 // Invalid negative value
        } as any)
      }).toThrow()
    })

    it('should preserve other values when updating', () => {
      const originalConfig = configManager.getConfig()
      
      configManager.updateConfig({ verbose: true })
      const updatedConfig = configManager.getConfig()
      
      expect(updatedConfig.verbose).toBe(true)
      expect(updatedConfig.enabled).toBe(originalConfig.enabled)
      expect(updatedConfig.migrate).toBe(originalConfig.migrate)
    })
  })
}) 