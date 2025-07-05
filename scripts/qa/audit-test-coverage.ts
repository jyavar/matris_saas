#!/usr/bin/env tsx

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { glob } from 'glob'

interface TestCoverageReport {
  timestamp: string
  summary: {
    totalModules: number
    totalTestFiles: number
    totalLinesOfCode: number
    totalTestLines: number
    averageCoverage: number
  }
  modules: ModuleCoverage[]
  coverageGroups: {
    high: ModuleCoverage[]
    medium: ModuleCoverage[]
    low: ModuleCoverage[]
    noTests: ModuleCoverage[]
  }
  recommendations: string[]
}

interface ModuleCoverage {
  name: string
  path: string
  type: 'backend' | 'frontend' | 'web' | 'package' | 'script' | 'agent'
  testFiles: TestFile[]
  totalTestFiles: number
  totalLinesOfCode: number
  totalTestLines: number
  coveragePercentage: number
  coverageLevel: 'high' | 'medium' | 'low' | 'none'
  hasVitestConfig: boolean
  hasJestConfig: boolean
  hasPlaywrightConfig: boolean
  testFrameworks: string[]
  lastModified: string
  issues: string[]
}

interface TestFile {
  path: string
  name: string
  type: 'unit' | 'integration' | 'e2e' | 'spec'
  lines: number
  hasDescribe: boolean
  hasTests: boolean
  lastModified: string
}

class TestCoverageAuditor {
  private report: TestCoverageReport
  private modules: ModuleCoverage[] = []

  constructor() {
    this.report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalModules: 0,
        totalTestFiles: 0,
        totalLinesOfCode: 0,
        totalTestLines: 0,
        averageCoverage: 0
      },
      modules: [],
      coverageGroups: {
        high: [],
        medium: [],
        low: [],
        noTests: []
      },
      recommendations: []
    }
  }

  async run(): Promise<void> {
    console.log('🔍 STRATO Test Coverage Audit Starting...')
    
    try {
      await this.scanModules()
      await this.analyzeCoverage()
      await this.generateRecommendations()
      await this.exportReport()
      
      console.log('✅ Test Coverage Audit Complete!')
      console.log(`📊 Report saved to: ${this.getReportPath()}`)
    } catch (error) {
      console.error('❌ Audit failed:', error)
      process.exit(1)
    }
  }

  private async scanModules(): Promise<void> {
    console.log('📁 Scanning modules...')
    
    const modulePaths = [
      'apps/backend',
      'apps/backend-nest', 
      'apps/frontend',
      'apps/web',
      'packages',
      'scripts/agents',
      'scripts'
    ]

    for (const modulePath of modulePaths) {
      if (existsSync(modulePath)) {
        const moduleCoverage = await this.analyzeModule(modulePath)
        if (moduleCoverage) {
          this.modules.push(moduleCoverage)
        }
      }
    }
  }

  private async analyzeModule(modulePath: string): Promise<ModuleCoverage | null> {
    const moduleName = this.getModuleName(modulePath)
    const moduleType = this.getModuleType(modulePath)
    
    console.log(`  📂 Analyzing ${moduleName}...`)
    
    const testFiles = await this.findTestFiles(modulePath)
    const sourceFiles = await this.findSourceFiles(modulePath)
    
    const totalLinesOfCode = await this.countLines(sourceFiles)
    const totalTestLines = await this.countLines(testFiles.map(f => f.path))
    
    const coveragePercentage = totalLinesOfCode > 0 
      ? Math.round((totalTestLines / totalLinesOfCode) * 100) 
      : 0
    
    const coverageLevel = this.getCoverageLevel(coveragePercentage)
    
    const configs = await this.detectTestConfigs(modulePath)
    const issues = await this.detectIssues(modulePath, testFiles, sourceFiles)
    
    return {
      name: moduleName,
      path: modulePath,
      type: moduleType,
      testFiles,
      totalTestFiles: testFiles.length,
      totalLinesOfCode,
      totalTestLines,
      coveragePercentage,
      coverageLevel,
      hasVitestConfig: configs.vitest,
      hasJestConfig: configs.jest,
      hasPlaywrightConfig: configs.playwright,
      testFrameworks: configs.frameworks,
      lastModified: await this.getLastModified(modulePath),
      issues
    }
  }

  private getModuleName(path: string): string {
    const parts = path.split('/')
    return parts[parts.length - 1] || parts[parts.length - 2] || 'unknown'
  }

  private getModuleType(path: string): ModuleCoverage['type'] {
    if (path.startsWith('apps/backend')) return 'backend'
    if (path.startsWith('apps/frontend')) return 'frontend'
    if (path.startsWith('apps/web')) return 'web'
    if (path.startsWith('packages/')) return 'package'
    if (path.startsWith('scripts/agents/')) return 'agent'
    return 'script'
  }

  private async findTestFiles(modulePath: string): Promise<TestFile[]> {
    const testPatterns = [
      '**/*.test.ts',
      '**/*.test.tsx', 
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/__tests__/**/*.ts',
      '**/__tests__/**/*.tsx'
    ]
    
    const testFiles: TestFile[] = []
    
    for (const pattern of testPatterns) {
      const files = await glob(pattern, { 
        cwd: modulePath, 
        absolute: true,
        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**']
      })
      
      for (const file of files) {
        const content = readFileSync(file, 'utf-8')
        const lines = content.split('\n').length
        
        testFiles.push({
          path: file,
          name: file.split('/').pop() || 'unknown',
          type: this.getTestType(file),
          lines,
          hasDescribe: content.includes('describe('),
          hasTests: content.includes('it(') || content.includes('test('),
          lastModified: await this.getLastModified(file)
        })
      }
    }
    
    return testFiles
  }

  private async findSourceFiles(modulePath: string): Promise<string[]> {
    const sourcePatterns = [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx'
    ]
    
    const sourceFiles: string[] = []
    
    for (const pattern of sourcePatterns) {
      const files = await glob(pattern, { 
        cwd: modulePath, 
        absolute: true,
        ignore: [
          '**/node_modules/**', 
          '**/dist/**', 
          '**/build/**', 
          '**/.next/**',
          '**/*.test.*',
          '**/*.spec.*',
          '**/__tests__/**',
          '**/test-results/**',
          '**/coverage/**'
        ]
      })
      
      sourceFiles.push(...files)
    }
    
    return sourceFiles
  }

  private getTestType(filePath: string): TestFile['type'] {
    if (filePath.includes('.e2e.') || filePath.includes('e2e/')) return 'e2e'
    if (filePath.includes('.spec.')) return 'spec'
    if (filePath.includes('integration') || filePath.includes('__tests__')) return 'integration'
    return 'unit'
  }

  private async countLines(files: string[]): Promise<number> {
    let totalLines = 0
    
    for (const file of files) {
      try {
        const content = readFileSync(file, 'utf-8')
        const lines = content.split('\n').filter(line => 
          line.trim().length > 0 && 
          !line.trim().startsWith('//') && 
          !line.trim().startsWith('/*') &&
          !line.trim().startsWith('*')
        ).length
        totalLines += lines
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return totalLines
  }

  private getCoverageLevel(percentage: number): ModuleCoverage['coverageLevel'] {
    if (percentage >= 80) return 'high'
    if (percentage >= 50) return 'medium'
    if (percentage > 0) return 'low'
    return 'none'
  }

  private async detectTestConfigs(modulePath: string): Promise<{
    vitest: boolean
    jest: boolean
    playwright: boolean
    frameworks: string[]
  }> {
    const configs = {
      vitest: false,
      jest: false,
      playwright: false,
      frameworks: [] as string[]
    }
    
    const configFiles = [
      'vitest.config.ts',
      'vitest.config.js',
      'jest.config.js',
      'jest.config.ts',
      'playwright.config.ts',
      'playwright.config.js'
    ]
    
    for (const configFile of configFiles) {
      const configPath = join(modulePath, configFile)
      if (existsSync(configPath)) {
        if (configFile.includes('vitest')) {
          configs.vitest = true
          configs.frameworks.push('vitest')
        }
        if (configFile.includes('jest')) {
          configs.jest = true
          configs.frameworks.push('jest')
        }
        if (configFile.includes('playwright')) {
          configs.playwright = true
          configs.frameworks.push('playwright')
        }
      }
    }
    
    return configs
  }

  private async detectIssues(
    modulePath: string, 
    testFiles: TestFile[], 
    sourceFiles: string[]
  ): Promise<string[]> {
    const issues: string[] = []
    
    // Check for modules without tests
    if (testFiles.length === 0 && sourceFiles.length > 0) {
      issues.push('No test files found')
    }
    
    // Check for test files without actual tests
    const emptyTestFiles = testFiles.filter(f => !f.hasTests)
    if (emptyTestFiles.length > 0) {
      issues.push(`${emptyTestFiles.length} test files without actual tests`)
    }
    
    // Check for missing test configs
    const hasSourceFiles = sourceFiles.length > 0
    const hasTestFiles = testFiles.length > 0
    const hasConfig = await this.hasTestConfig(modulePath)
    
    if (hasSourceFiles && hasTestFiles && !hasConfig) {
      issues.push('Test files present but no test configuration found')
    }
    
    // Check for old test files
    const oldTestFiles = testFiles.filter(f => {
      const lastModified = new Date(f.lastModified)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      return lastModified < sixMonthsAgo
    })
    
    if (oldTestFiles.length > 0) {
      issues.push(`${oldTestFiles.length} test files not updated in 6+ months`)
    }
    
    return issues
  }

  private async hasTestConfig(modulePath: string): Promise<boolean> {
    const configFiles = [
      'vitest.config.ts',
      'vitest.config.js', 
      'jest.config.js',
      'jest.config.ts',
      'playwright.config.ts',
      'playwright.config.js'
    ]
    
    for (const configFile of configFiles) {
      if (existsSync(join(modulePath, configFile))) {
        return true
      }
    }
    
    return false
  }

  private async getLastModified(path: string): Promise<string> {
    try {
      const stats = await import('fs').then(fs => fs.promises.stat(path))
      return stats.mtime.toISOString()
    } catch {
      return new Date().toISOString()
    }
  }

  private async analyzeCoverage(): Promise<void> {
    console.log('📊 Analyzing coverage patterns...')
    
    this.report.modules = this.modules
    this.report.summary.totalModules = this.modules.length
    this.report.summary.totalTestFiles = this.modules.reduce((sum, m) => sum + m.totalTestFiles, 0)
    this.report.summary.totalLinesOfCode = this.modules.reduce((sum, m) => sum + m.totalLinesOfCode, 0)
    this.report.summary.totalTestLines = this.modules.reduce((sum, m) => sum + m.totalTestLines, 0)
    
    const totalCoverage = this.modules.reduce((sum, m) => sum + m.coveragePercentage, 0)
    this.report.summary.averageCoverage = this.modules.length > 0 
      ? Math.round(totalCoverage / this.modules.length) 
      : 0
    
    // Group by coverage level
    this.report.coverageGroups.high = this.modules.filter(m => m.coverageLevel === 'high')
    this.report.coverageGroups.medium = this.modules.filter(m => m.coverageLevel === 'medium')
    this.report.coverageGroups.low = this.modules.filter(m => m.coverageLevel === 'low')
    this.report.coverageGroups.noTests = this.modules.filter(m => m.coverageLevel === 'none')
  }

  private async generateRecommendations(): Promise<void> {
    console.log('💡 Generating recommendations...')
    
    const recommendations: string[] = []
    
    // High coverage modules
    if (this.report.coverageGroups.high.length > 0) {
      recommendations.push(
        `✅ ${this.report.coverageGroups.high.length} modules have excellent coverage (≥80%)`
      )
    }
    
    // Medium coverage modules
    if (this.report.coverageGroups.medium.length > 0) {
      recommendations.push(
        `⚠️ ${this.report.coverageGroups.medium.length} modules need improved coverage (50-79%)`
      )
    }
    
    // Low coverage modules
    if (this.report.coverageGroups.low.length > 0) {
      recommendations.push(
        `🔴 ${this.report.coverageGroups.low.length} modules have poor coverage (<50%)`
      )
    }
    
    // No tests modules
    if (this.report.coverageGroups.noTests.length > 0) {
      recommendations.push(
        `❌ ${this.report.coverageGroups.noTests.length} modules have no tests - prioritize these`
      )
    }
    
    // Specific recommendations
    const modulesWithoutTests = this.report.coverageGroups.noTests
    if (modulesWithoutTests.length > 0) {
      recommendations.push(
        `Priority modules for testing: ${modulesWithoutTests.map(m => m.name).join(', ')}`
      )
    }
    
    const modulesWithIssues = this.modules.filter(m => m.issues.length > 0)
    if (modulesWithIssues.length > 0) {
      recommendations.push(
        `${modulesWithIssues.length} modules have test issues that need attention`
      )
    }
    
    // Framework recommendations
    const modulesWithoutConfig = this.modules.filter(m => m.testFrameworks.length === 0)
    if (modulesWithoutConfig.length > 0) {
      recommendations.push(
        `${modulesWithoutConfig.length} modules need test framework configuration`
      )
    }
    
    this.report.recommendations = recommendations
  }

  private async exportReport(): Promise<void> {
    const reportPath = this.getReportPath()
    const reportDir = dirname(reportPath)
    
    // Ensure directory exists
    if (!existsSync(reportDir)) {
      await import('fs').then(fs => fs.promises.mkdir(reportDir, { recursive: true }))
    }
    
    writeFileSync(reportPath, JSON.stringify(this.report, null, 2))
    
    // Also create a summary report
    const summaryPath = join(reportDir, 'test-coverage-summary.json')
    const summary = {
      timestamp: this.report.timestamp,
      summary: this.report.summary,
      coverageGroups: {
        high: this.report.coverageGroups.high.length,
        medium: this.report.coverageGroups.medium.length,
        low: this.report.coverageGroups.low.length,
        noTests: this.report.coverageGroups.noTests.length
      },
      recommendations: this.report.recommendations
    }
    
    writeFileSync(summaryPath, JSON.stringify(summary, null, 2))
  }

  private getReportPath(): string {
    return 'audit-artifacts/reports/test-coverage-audit.json'
  }

  // Public method to get report for external use
  getReport(): TestCoverageReport {
    return this.report
  }
}

// CLI execution
async function main() {
  const auditor = new TestCoverageAuditor()
  await auditor.run()
  
  // Print summary to console
  const report = auditor.getReport()
  console.log('\n📋 Test Coverage Summary:')
  console.log(`Total Modules: ${report.summary.totalModules}`)
  console.log(`Total Test Files: ${report.summary.totalTestFiles}`)
  console.log(`Average Coverage: ${report.summary.averageCoverage}%`)
  console.log(`High Coverage: ${report.coverageGroups.high.length} modules`)
  console.log(`Medium Coverage: ${report.coverageGroups.medium.length} modules`)
  console.log(`Low Coverage: ${report.coverageGroups.low.length} modules`)
  console.log(`No Tests: ${report.coverageGroups.noTests.length} modules`)
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:')
    report.recommendations.forEach(rec => console.log(`  ${rec}`))
  }
}

// Export for use as module
export { TestCoverageAuditor, type TestCoverageReport, type ModuleCoverage }

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
} 