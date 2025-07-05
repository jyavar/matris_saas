#!/usr/bin/env tsx

/**
 * @qa Agent - Configuration
 *
 * Centralized configuration for QA operations
 */

export interface QAAgentConfig {
  // Core settings
  projectRoot: string
  outputDir: string
  reportFileName: string
  
  // Audit settings
  audit: {
    enabled: boolean
    timeout: number
    parallel: boolean
    maxRetries: number
  }
  
  // Check settings
  checks: {
    linting: CheckConfig
    tests: CheckConfig
    coverage: CheckConfig
    security: CheckConfig
    performance: CheckConfig
  }
  
  // Coverage thresholds
  coverage: {
    statements: number
    branches: number
    functions: number
    lines: number
  }
  
  // Security settings
  security: {
    checkVulnerabilities: boolean
    checkSecrets: boolean
    checkPermissions: boolean
    vulnerablePackages: string[]
  }
  
  // Performance settings
  performance: {
    checkBuildTime: boolean
    checkBundleSize: boolean
    checkMemoryUsage: boolean
    thresholds: {
      buildTime: number
      bundleSize: number
      memoryUsage: number
    }
  }
  
  // CLI settings
  cli: {
    verbose: boolean
    saveReport: boolean
    exitOnFailure: boolean
    colorOutput: boolean
  }
}

export interface CheckConfig {
  enabled: boolean
  timeout: number
  retries: number
  failOnError: boolean
}

export const DEFAULT_QA_CONFIG: QAAgentConfig = {
  projectRoot: process.cwd(),
  outputDir: 'audit-artifacts',
  reportFileName: 'qa-audit.json',
  
  audit: {
    enabled: true,
    timeout: 300000, // 5 minutes
    parallel: false,
    maxRetries: 3,
  },
  
  checks: {
    linting: {
      enabled: true,
      timeout: 60000, // 1 minute
      retries: 2,
      failOnError: true,
    },
    tests: {
      enabled: true,
      timeout: 120000, // 2 minutes
      retries: 1,
      failOnError: true,
    },
    coverage: {
      enabled: true,
      timeout: 60000,
      retries: 1,
      failOnError: false,
    },
    security: {
      enabled: true,
      timeout: 30000,
      retries: 1,
      failOnError: false,
    },
    performance: {
      enabled: true,
      timeout: 60000,
      retries: 1,
      failOnError: false,
    },
  },
  
  coverage: {
    statements: 90,
    branches: 90,
    functions: 90,
    lines: 90,
  },
  
  security: {
    checkVulnerabilities: true,
    checkSecrets: true,
    checkPermissions: true,
    vulnerablePackages: [
      'lodash',
      'moment',
      'jquery',
      'underscore',
    ],
  },
  
  performance: {
    checkBuildTime: true,
    checkBundleSize: true,
    checkMemoryUsage: true,
    thresholds: {
      buildTime: 30000, // 30 seconds
      bundleSize: 1024 * 1024, // 1MB
      memoryUsage: 512 * 1024 * 1024, // 512MB
    },
  },
  
  cli: {
    verbose: false,
    saveReport: true,
    exitOnFailure: true,
    colorOutput: true,
  },
}

export class QAAgentConfigManager {
  private config: QAAgentConfig
  
  constructor(customConfig?: Partial<QAAgentConfig>) {
    this.config = this.mergeConfig(DEFAULT_QA_CONFIG, customConfig || {})
  }
  
  getConfig(): QAAgentConfig {
    return this.config
  }
  
  updateConfig(updates: Partial<QAAgentConfig>): void {
    this.config = this.mergeConfig(this.config, updates)
  }
  
  getCheckConfig(checkName: keyof QAAgentConfig['checks']): CheckConfig {
    return this.config.checks[checkName]
  }
  
  isCheckEnabled(checkName: keyof QAAgentConfig['checks']): boolean {
    return this.config.checks[checkName].enabled
  }
  
  getCoverageThreshold(): QAAgentConfig['coverage'] {
    return this.config.coverage
  }
  
  getSecurityConfig(): QAAgentConfig['security'] {
    return this.config.security
  }
  
  getPerformanceConfig(): QAAgentConfig['performance'] {
    return this.config.performance
  }
  
  getCLIConfig(): QAAgentConfig['cli'] {
    return this.config.cli
  }
  
  private mergeConfig(
    base: QAAgentConfig,
    updates: Partial<QAAgentConfig>
  ): QAAgentConfig {
    return {
      ...base,
      ...updates,
      checks: {
        ...base.checks,
        ...updates.checks,
      },
      coverage: {
        ...base.coverage,
        ...updates.coverage,
      },
      security: {
        ...base.security,
        ...updates.security,
        vulnerablePackages: [
          ...base.security.vulnerablePackages,
          ...(updates.security?.vulnerablePackages || []),
        ],
      },
      performance: {
        ...base.performance,
        ...updates.performance,
        thresholds: {
          ...base.performance.thresholds,
          ...updates.performance?.thresholds,
        },
      },
      cli: {
        ...base.cli,
        ...updates.cli,
      },
    }
  }
}

// Export default instance
export const qaConfig = new QAAgentConfigManager()

// Export for use in other modules
export default qaConfig 