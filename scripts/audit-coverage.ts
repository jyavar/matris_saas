#!/usr/bin/env tsx

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

interface CoverageReport {
  module: string
  lines: number
  branches: number
  functions: number
  statements: number
  timestamp: string
  status: 'success' | 'error' | 'no-tests'
}

interface ModuleConfig {
  name: string
  path: string
  testCommand: string
  coverageFile?: string
}

const modules: ModuleConfig[] = [
  {
    name: 'backend',
    path: 'apps/backend',
    testCommand: 'pnpm test',
    coverageFile: 'coverage/lcov-report/index.html'
  },
  {
    name: 'backend-nest',
    path: 'apps/backend-nest',
    testCommand: 'pnpm test',
    coverageFile: 'coverage/lcov-report/index.html'
  },
  {
    name: 'frontend',
    path: 'apps/frontend',
    testCommand: 'pnpm test',
    coverageFile: 'coverage/lcov-report/index.html'
  },
  {
    name: 'web',
    path: 'apps/web',
    testCommand: 'pnpm test',
    coverageFile: 'coverage/lcov-report/index.html'
  },
  {
    name: 'utils',
    path: 'packages/utils',
    testCommand: 'pnpm test',
    coverageFile: 'coverage/lcov-report/index.html'
  },
  {
    name: 'scripts',
    path: 'scripts',
    testCommand: 'pnpm test',
    coverageFile: 'coverage/lcov-report/index.html'
  }
]

function parseCoverageFromHTML(htmlContent: string): Partial<CoverageReport> {
  const linesMatch = htmlContent.match(/Lines:\s*(\d+(?:\.\d+)?)%/)
  const branchesMatch = htmlContent.match(/Branches:\s*(\d+(?:\.\d+)?)%/)
  const functionsMatch = htmlContent.match(/Functions:\s*(\d+(?:\.\d+)?)%/)
  const statementsMatch = htmlContent.match(/Statements:\s*(\d+(?:\.\d+)?)%/)

  return {
    lines: linesMatch ? parseFloat(linesMatch[1] || '0') : 0,
    branches: branchesMatch ? parseFloat(branchesMatch[1] || '0') : 0,
    functions: functionsMatch ? parseFloat(functionsMatch[1] || '0') : 0,
    statements: statementsMatch ? parseFloat(statementsMatch[1] || '0') : 0
  }
}

function parseCoverageFromJSON(jsonPath: string): Partial<CoverageReport> {
  try {
    const content = readFileSync(jsonPath, 'utf-8')
    const data = JSON.parse(content)
    
    if (data.total) {
      return {
        lines: data.total.lines.pct,
        branches: data.total.branches.pct,
        functions: data.total.functions.pct,
        statements: data.total.statements.pct
      }
    }
  } catch (error) {
    console.log(`Error parsing JSON coverage: ${error}`)
  }
  
  return {}
}

function auditModule(module: ModuleConfig): CoverageReport {
  const report: CoverageReport = {
    module: module.name,
    lines: 0,
    branches: 0,
    functions: 0,
    statements: 0,
    timestamp: new Date().toISOString(),
    status: 'error'
  }

  try {
    console.log(`\n🔍 Auditing ${module.name}...`)
    
    // Change to module directory
    const originalCwd = process.cwd()
    process.chdir(join(originalCwd, module.path))
    
    // Run tests with coverage
    try {
      execSync(module.testCommand, { 
        stdio: 'pipe',
        timeout: 60000 // 60 seconds timeout
      })
      report.status = 'success'
    } catch (error) {
      console.log(`❌ Tests failed for ${module.name}: ${error}`)
      report.status = 'error'
      process.chdir(originalCwd)
      return report
    }

    // Try to parse coverage from HTML
    if (module.coverageFile && existsSync(module.coverageFile)) {
      const htmlContent = readFileSync(module.coverageFile, 'utf-8')
      const coverage = parseCoverageFromHTML(htmlContent)
      Object.assign(report, coverage)
    }

    // Try to parse coverage from JSON
    const jsonCoverageFile = join(module.path, 'coverage/coverage-summary.json')
    if (existsSync(jsonCoverageFile)) {
      const coverage = parseCoverageFromJSON(jsonCoverageFile)
      Object.assign(report, coverage)
    }

    // Check if no coverage data found
    if (report.lines === 0 && report.branches === 0 && report.functions === 0 && report.statements === 0) {
      report.status = 'no-tests'
    }

    process.chdir(originalCwd)
    
  } catch (error) {
    console.log(`❌ Error auditing ${module.name}: ${error}`)
    report.status = 'error'
  }

  return report
}

function generateReport(reports: CoverageReport[]): void {
  console.log('\n📊 COVERAGE AUDIT REPORT')
  console.log('=' .repeat(50))
  
  let totalModules = 0
  let successfulModules = 0
  let totalLines = 0
  let totalBranches = 0
  let totalFunctions = 0
  let totalStatements = 0

  reports.forEach(report => {
    totalModules++
    
    if (report.status === 'success') {
      successfulModules++
      totalLines += report.lines
      totalBranches += report.branches
      totalFunctions += report.functions
      totalStatements += report.statements
    }

    const statusIcon = report.status === 'success' ? '✅' : 
                      report.status === 'no-tests' ? '⚠️' : '❌'
    
    console.log(`${statusIcon} ${report.module.padEnd(15)} | ` +
                `Lines: ${report.lines.toFixed(1)}% | ` +
                `Branches: ${report.branches.toFixed(1)}% | ` +
                `Functions: ${report.functions.toFixed(1)}% | ` +
                `Statements: ${report.statements.toFixed(1)}% | ` +
                `Status: ${report.status}`)
  })

  console.log('\n📈 SUMMARY')
  console.log('-'.repeat(30))
  console.log(`Total Modules: ${totalModules}`)
  console.log(`Successful: ${successfulModules}`)
  console.log(`Failed: ${totalModules - successfulModules}`)
  
  if (successfulModules > 0) {
    console.log(`\nAverage Coverage:`)
    console.log(`Lines: ${(totalLines / successfulModules).toFixed(1)}%`)
    console.log(`Branches: ${(totalBranches / successfulModules).toFixed(1)}%`)
    console.log(`Functions: ${(totalFunctions / successfulModules).toFixed(1)}%`)
    console.log(`Statements: ${(totalStatements / successfulModules).toFixed(1)}%`)
  }

  // Save detailed report
  const detailedReport = {
    timestamp: new Date().toISOString(),
    summary: {
      totalModules,
      successfulModules,
      failedModules: totalModules - successfulModules,
      averageCoverage: successfulModules > 0 ? {
        lines: totalLines / successfulModules,
        branches: totalBranches / successfulModules,
        functions: totalFunctions / successfulModules,
        statements: totalStatements / successfulModules
      } : null
    },
    modules: reports
  }

  writeFileSync('audit-artifacts/coverage-audit.json', JSON.stringify(detailedReport, null, 2))
  console.log('\n📄 Detailed report saved to: audit-artifacts/coverage-audit.json')
}

function main(): void {
  console.log('🚀 STRATO Core OS™ - Coverage Audit')
  console.log('Starting comprehensive coverage analysis...')
  
  // Ensure audit-artifacts directory exists
  if (!existsSync('audit-artifacts')) {
    execSync('mkdir -p audit-artifacts')
  }

  const reports: CoverageReport[] = []
  
  for (const module of modules) {
    const report = auditModule(module)
    reports.push(report)
  }

  generateReport(reports)
  
  console.log('\n✅ Coverage audit completed!')
}

main() 