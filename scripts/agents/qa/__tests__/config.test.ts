import { beforeEach,describe, expect, it } from 'vitest'

import { 
  DEFAULT_QA_CONFIG, 
  type QAAgentConfig,
  QAAgentConfigManager} from '../config'

describe('QAAgentConfigManager', () => {
  let configManager: QAAgentConfigManager

  beforeEach(() => {
    configManager = new QAAgentConfigManager()
  })

  describe('constructor', () => {
    it('should initialize with default config when no custom config provided', () => {
      const config = configManager.getConfig()
      expect(config.projectRoot).toBe(process.cwd())
      expect(config.outputDir).toBe('audit-artifacts')
      expect(config.reportFileName).toBe('qa-audit.json')
    })

    it('should merge custom config with defaults', () => {
      const customConfig: Partial<QAAgentConfig> = {
        outputDir: 'custom-output',
        reportFileName: 'custom-report.json',
        audit: {
          enabled: false,
          timeout: 600000,
          parallel: true,
          maxRetries: 5,
        },
      }

      const manager = new QAAgentConfigManager(customConfig)
      const config = manager.getConfig()

      expect(config.outputDir).toBe('custom-output')
      expect(config.reportFileName).toBe('custom-report.json')
      expect(config.audit.enabled).toBe(false)
      expect(config.audit.timeout).toBe(600000)
      expect(config.audit.parallel).toBe(true)
      expect(config.audit.maxRetries).toBe(5)
      
      // Should preserve other defaults
      expect(config.projectRoot).toBe(process.cwd())
      expect(config.checks.linting.enabled).toBe(true)
    })
  })

  describe('getConfig', () => {
    it('should return the current configuration', () => {
      const config = configManager.getConfig()
      expect(config).toBeDefined()
      expect(config.audit).toBeDefined()
      expect(config.checks).toBeDefined()
      expect(config.coverage).toBeDefined()
      expect(config.security).toBeDefined()
      expect(config.performance).toBeDefined()
      expect(config.cli).toBeDefined()
    })
  })

  describe('updateConfig', () => {
    it('should update configuration with new values', () => {
      const updates: Partial<QAAgentConfig> = {
        outputDir: 'updated-output',
        coverage: {
          statements: 95,
          branches: 95,
          functions: 95,
          lines: 95,
        },
      }

      configManager.updateConfig(updates)
      const config = configManager.getConfig()

      expect(config.outputDir).toBe('updated-output')
      expect(config.coverage.statements).toBe(95)
      expect(config.coverage.branches).toBe(95)
      expect(config.coverage.functions).toBe(95)
      expect(config.coverage.lines).toBe(95)
    })

    it('should preserve existing values not in updates', () => {
      const originalConfig = configManager.getConfig()
      
      configManager.updateConfig({ outputDir: 'new-output' })
      const updatedConfig = configManager.getConfig()

      expect(updatedConfig.outputDir).toBe('new-output')
      expect(updatedConfig.projectRoot).toBe(originalConfig.projectRoot)
      expect(updatedConfig.reportFileName).toBe(originalConfig.reportFileName)
    })
  })

  describe('getCheckConfig', () => {
    it('should return correct check configuration for linting', () => {
      const lintingConfig = configManager.getCheckConfig('linting')
      expect(lintingConfig.enabled).toBe(true)
      expect(lintingConfig.timeout).toBe(60000)
      expect(lintingConfig.retries).toBe(2)
      expect(lintingConfig.failOnError).toBe(true)
    })

    it('should return correct check configuration for tests', () => {
      const testsConfig = configManager.getCheckConfig('tests')
      expect(testsConfig.enabled).toBe(true)
      expect(testsConfig.timeout).toBe(120000)
      expect(testsConfig.retries).toBe(1)
      expect(testsConfig.failOnError).toBe(true)
    })

    it('should return correct check configuration for coverage', () => {
      const coverageConfig = configManager.getCheckConfig('coverage')
      expect(coverageConfig.enabled).toBe(true)
      expect(coverageConfig.timeout).toBe(60000)
      expect(coverageConfig.retries).toBe(1)
      expect(coverageConfig.failOnError).toBe(false)
    })
  })

  describe('isCheckEnabled', () => {
    it('should return true for enabled checks', () => {
      expect(configManager.isCheckEnabled('linting')).toBe(true)
      expect(configManager.isCheckEnabled('tests')).toBe(true)
      expect(configManager.isCheckEnabled('coverage')).toBe(true)
    })

    it('should return false for disabled checks', () => {
      configManager.updateConfig({
        checks: {
          ...DEFAULT_QA_CONFIG.checks,
          linting: {
            ...DEFAULT_QA_CONFIG.checks.linting,
            enabled: false,
          },
        },
      })

      expect(configManager.isCheckEnabled('linting')).toBe(false)
    })
  })

  describe('getCoverageThreshold', () => {
    it('should return coverage thresholds', () => {
      const coverage = configManager.getCoverageThreshold()
      expect(coverage.statements).toBe(90)
      expect(coverage.branches).toBe(90)
      expect(coverage.functions).toBe(90)
      expect(coverage.lines).toBe(90)
    })
  })

  describe('getSecurityConfig', () => {
    it('should return security configuration', () => {
      const security = configManager.getSecurityConfig()
      expect(security.checkVulnerabilities).toBe(true)
      expect(security.checkSecrets).toBe(true)
      expect(security.checkPermissions).toBe(true)
      expect(security.vulnerablePackages).toContain('lodash')
      expect(security.vulnerablePackages).toContain('moment')
    })
  })

  describe('getPerformanceConfig', () => {
    it('should return performance configuration', () => {
      const performance = configManager.getPerformanceConfig()
      expect(performance.checkBuildTime).toBe(true)
      expect(performance.checkBundleSize).toBe(true)
      expect(performance.checkMemoryUsage).toBe(true)
      expect(performance.thresholds.buildTime).toBe(30000)
      expect(performance.thresholds.bundleSize).toBe(1024 * 1024)
      expect(performance.thresholds.memoryUsage).toBe(512 * 1024 * 1024)
    })
  })

  describe('getCLIConfig', () => {
    it('should return CLI configuration', () => {
      const cli = configManager.getCLIConfig()
      expect(cli.verbose).toBe(false)
      expect(cli.saveReport).toBe(true)
      expect(cli.exitOnFailure).toBe(true)
      expect(cli.colorOutput).toBe(true)
    })
  })

  describe('DEFAULT_QA_CONFIG', () => {
    it('should have valid default values', () => {
      expect(DEFAULT_QA_CONFIG.projectRoot).toBe(process.cwd())
      expect(DEFAULT_QA_CONFIG.outputDir).toBe('audit-artifacts')
      expect(DEFAULT_QA_CONFIG.reportFileName).toBe('qa-audit.json')
      expect(DEFAULT_QA_CONFIG.audit.enabled).toBe(true)
      expect(DEFAULT_QA_CONFIG.audit.timeout).toBe(300000)
      expect(DEFAULT_QA_CONFIG.audit.parallel).toBe(false)
      expect(DEFAULT_QA_CONFIG.audit.maxRetries).toBe(3)
    })

    it('should have valid check configurations', () => {
      const checks = DEFAULT_QA_CONFIG.checks
      expect(checks.linting.enabled).toBe(true)
      expect(checks.tests.enabled).toBe(true)
      expect(checks.coverage.enabled).toBe(true)
      expect(checks.security.enabled).toBe(true)
      expect(checks.performance.enabled).toBe(true)
    })

    it('should have valid coverage thresholds', () => {
      const coverage = DEFAULT_QA_CONFIG.coverage
      expect(coverage.statements).toBe(90)
      expect(coverage.branches).toBe(90)
      expect(coverage.functions).toBe(90)
      expect(coverage.lines).toBe(90)
    })
  })
}) 