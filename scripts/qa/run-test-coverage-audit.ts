#!/usr/bin/env tsx

import { TestCoverageAuditor } from './audit-test-coverage'
import { readFileSync } from 'fs'
import { join } from 'path'

async function main() {
  console.log('🔍 STRATO Test Coverage Audit Runner')
  console.log('=====================================\n')
  
  try {
    // Run the audit
    const auditor = new TestCoverageAuditor()
    await auditor.run()
    
    // Get the report
    const report = auditor.getReport()
    
    // Display detailed results
    console.log('\n📊 DETAILED COVERAGE REPORT')
    console.log('============================')
    
    // Summary
    console.log(`\n📈 SUMMARY:`)
    console.log(`  Total Modules: ${report.summary.totalModules}`)
    console.log(`  Total Test Files: ${report.summary.totalTestFiles}`)
    console.log(`  Total Lines of Code: ${report.summary.totalLinesOfCode.toLocaleString()}`)
    console.log(`  Total Test Lines: ${report.summary.totalTestLines.toLocaleString()}`)
    console.log(`  Average Coverage: ${report.summary.averageCoverage}%`)
    
    // Coverage groups
    console.log(`\n📋 COVERAGE GROUPS:`)
    console.log(`  🟢 High Coverage (≥80%): ${report.coverageGroups.high.length} modules`)
    console.log(`  🟡 Medium Coverage (50-79%): ${report.coverageGroups.medium.length} modules`)
    console.log(`  🔴 Low Coverage (<50%): ${report.coverageGroups.low.length} modules`)
    console.log(`  ⚫ No Tests: ${report.coverageGroups.noTests.length} modules`)
    
    // Module details
    console.log(`\n📁 MODULE DETAILS:`)
    report.modules.forEach(module => {
      const emoji = module.coverageLevel === 'high' ? '🟢' : 
                   module.coverageLevel === 'medium' ? '🟡' : 
                   module.coverageLevel === 'low' ? '🔴' : '⚫'
      
      console.log(`  ${emoji} ${module.name} (${module.type}):`)
      console.log(`    Coverage: ${module.coveragePercentage}%`)
      console.log(`    Test Files: ${module.totalTestFiles}`)
      console.log(`    Lines of Code: ${module.totalLinesOfCode.toLocaleString()}`)
      console.log(`    Test Lines: ${module.totalTestLines.toLocaleString()}`)
      console.log(`    Frameworks: ${module.testFrameworks.join(', ') || 'None'}`)
      
      if (module.issues.length > 0) {
        console.log(`    Issues: ${module.issues.join(', ')}`)
      }
      console.log('')
    })
    
    // Recommendations
    console.log(`\n💡 RECOMMENDATIONS:`)
    report.recommendations.forEach(rec => {
      console.log(`  ${rec}`)
    })
    
    // Priority actions
    console.log(`\n🎯 PRIORITY ACTIONS:`)
    
    if (report.coverageGroups.noTests.length > 0) {
      console.log(`  1. Add tests to modules without coverage:`)
      report.coverageGroups.noTests.forEach(module => {
        console.log(`     - ${module.name} (${module.type})`)
      })
    }
    
    if (report.coverageGroups.low.length > 0) {
      console.log(`  2. Improve coverage in low-coverage modules:`)
      report.coverageGroups.low.forEach(module => {
        console.log(`     - ${module.name}: ${module.coveragePercentage}% → target 80%`)
      })
    }
    
    const modulesWithIssues = report.modules.filter(m => m.issues.length > 0)
    if (modulesWithIssues.length > 0) {
      console.log(`  3. Fix test issues in modules:`)
      modulesWithIssues.forEach(module => {
        console.log(`     - ${module.name}: ${module.issues.join(', ')}`)
      })
    }
    
    // Export paths
    console.log(`\n📄 REPORTS EXPORTED:`)
    console.log(`  Full Report: audit-artifacts/reports/test-coverage-audit.json`)
    console.log(`  Summary: audit-artifacts/reports/test-coverage-summary.json`)
    
    console.log(`\n✅ Audit completed successfully!`)
    
  } catch (error) {
    console.error('❌ Audit failed:', error)
    process.exit(1)
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { main } 