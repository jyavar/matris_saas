#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'

function calculateCoverage(filePath: string) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    
    let totalStatements = 0
    let coveredStatements = 0
    let totalFunctions = 0
    let coveredFunctions = 0
    let totalBranches = 0
    let coveredBranches = 0
    let totalLines = 0
    let coveredLines = 0

    Object.values(data).forEach((file: any) => {
      // Statements
      Object.values(file.s).forEach((count: any) => {
        totalStatements++
        if (count > 0) coveredStatements++
      })

      // Functions
      Object.values(file.f).forEach((count: any) => {
        totalFunctions++
        if (count > 0) coveredFunctions++
      })

      // Branches
      Object.values(file.b).forEach((branch: any) => {
        if (Array.isArray(branch)) {
          branch.forEach((count: any) => {
            totalBranches++
            if (count > 0) coveredBranches++
          })
        }
      })

      // Lines (approximate)
      totalLines += Object.keys(file.s).length
      coveredLines += Object.values(file.s).filter((count: any) => count > 0).length
    })

    return {
      statements: totalStatements > 0 ? (coveredStatements / totalStatements) * 100 : 0,
      functions: totalFunctions > 0 ? (coveredFunctions / totalFunctions) * 100 : 0,
      branches: totalBranches > 0 ? (coveredBranches / totalBranches) * 100 : 0,
      lines: totalLines > 0 ? (coveredLines / totalLines) * 100 : 0
    }
  } catch (error) {
    console.error(`Error reading coverage file: ${error}`)
    return null
  }
}

// Calculate coverage for each module
const modules = [
  { name: 'backend', path: 'apps/backend/coverage/coverage-final.json' },
  { name: 'backend-nest', path: 'apps/backend-nest/coverage/coverage-final.json' },
  { name: 'frontend', path: 'apps/frontend/coverage/coverage-final.json' },
  { name: 'utils', path: 'packages/utils/coverage/coverage-final.json' }
]

console.log('🔍 Cobertura Rápida del Monorepo\n')

let totalStatements = 0
let totalFunctions = 0
let totalBranches = 0
let totalLines = 0
let moduleCount = 0

modules.forEach(module => {
  const coverage = calculateCoverage(module.path)
  
  if (coverage) {
    console.log(`📊 ${module.name}:`)
    console.log(`   Statements: ${coverage.statements.toFixed(1)}%`)
    console.log(`   Functions:  ${coverage.functions.toFixed(1)}%`)
    console.log(`   Branches:   ${coverage.branches.toFixed(1)}%`)
    console.log(`   Lines:      ${coverage.lines.toFixed(1)}%\n`)
    
    totalStatements += coverage.statements
    totalFunctions += coverage.functions
    totalBranches += coverage.branches
    totalLines += coverage.lines
    moduleCount++
  } else {
    console.log(`❌ ${module.name}: No se encontró archivo de cobertura\n`)
  }
})

if (moduleCount > 0) {
  const average = {
    statements: totalStatements / moduleCount,
    functions: totalFunctions / moduleCount,
    branches: totalBranches / moduleCount,
    lines: totalLines / moduleCount
  }

  console.log('🎯 COBERTURA PROMEDIO:')
  console.log(`   Statements: ${average.statements.toFixed(1)}%`)
  console.log(`   Functions:  ${average.functions.toFixed(1)}%`)
  console.log(`   Branches:   ${average.branches.toFixed(1)}%`)
  console.log(`   Lines:      ${average.lines.toFixed(1)}%\n`)

  console.log(`📋 OBJETIVO STRATO: 90%`)
  if (average.statements >= 90) {
    console.log('✅ Cobertura cumple estándares STRATO')
  } else {
    console.log(`❌ Cobertura por debajo de estándares STRATO`)
    console.log(`   Necesitas mejorar ${(90 - average.statements).toFixed(1)}%`)
  }
} 