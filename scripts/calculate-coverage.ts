#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'

interface CoverageData {
  s: Record<string, number> // statements
  f: Record<string, number> // functions
  b: Record<string, number[]> // branches
}

interface FileCoverage {
  path: string
  s: Record<string, number>
  f: Record<string, number>
  b: Record<string, number[]>
}

function calculateCoverage(coverageData: CoverageData) {
  const statements = Object.values(coverageData.s)
  const functions = Object.values(coverageData.f)
  const branches = Object.values(coverageData.b).flat()

  const statementCoverage = statements.filter(s => s > 0).length / statements.length * 100
  const functionCoverage = functions.filter(f => f > 0).length / functions.length * 100
  const branchCoverage = branches.filter(b => b > 0).length / branches.length * 100

  return {
    statements: statementCoverage,
    functions: functionCoverage,
    branches: branchCoverage,
    lines: statementCoverage // lines coverage is same as statements in istanbul
  }
}

function analyzeCoverageFile(filePath: string): FileCoverage | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(content)
    
    // Find a file that has coverage data
    const filesWithCoverage = Object.keys(data).filter(key => 
      key.includes('/src/') && 
      typeof data[key] === 'object' && 
      data[key].s && 
      data[key].f && 
      data[key].b
    )

    if (filesWithCoverage.length === 0) {
      return null
    }

    const firstFile = filesWithCoverage[0]
    if (!firstFile) return null
    return data[firstFile] as FileCoverage
  } catch (error) {
    console.error(`Error reading coverage file ${filePath}:`, error)
    return null
  }
}

function calculateTotalCoverage() {
  const modules = ['apps/backend', 'apps/backend-nest', 'apps/frontend', 'packages/utils']
  let totalStats = {
    statements: { covered: 0, total: 0 },
    functions: { covered: 0, total: 0 },
    branches: { covered: 0, total: 0 },
    lines: { covered: 0, total: 0 }
  }

  console.log('🔍 Analizando cobertura del monorepo...\n')

  for (const module of modules) {
    const coveragePath = path.join(process.cwd(), module, 'coverage')
    
    if (!fs.existsSync(coveragePath)) {
      console.log(`❌ ${module}: No se encontró directorio de cobertura`)
      continue
    }

    const files = fs.readdirSync(coveragePath)
    const coverageFile = files.find(f => f.includes('coverage') && f.endsWith('.json'))
    
    if (!coverageFile) {
      console.log(`❌ ${module}: No se encontró archivo de cobertura`)
      continue
    }

    const filePath = path.join(coveragePath, coverageFile)
    const coverageData = analyzeCoverageFile(filePath)
    
    if (!coverageData) {
      console.log(`❌ ${module}: No se pudo analizar cobertura`)
      continue
    }

    const coverage = calculateCoverage(coverageData)
    
    console.log(`📊 ${module}:`)
    console.log(`   Statements: ${coverage.statements.toFixed(1)}%`)
    console.log(`   Functions:  ${coverage.functions.toFixed(1)}%`)
    console.log(`   Branches:   ${coverage.branches.toFixed(1)}%`)
    console.log(`   Lines:      ${coverage.lines.toFixed(1)}%`)
    console.log('')

    // Aggregate totals
    totalStats.statements.covered += coverage.statements
    totalStats.functions.covered += coverage.functions
    totalStats.branches.covered += coverage.branches
    totalStats.lines.covered += coverage.lines
  }

  const moduleCount = modules.length
  const averageCoverage = {
    statements: totalStats.statements.covered / moduleCount,
    functions: totalStats.functions.covered / moduleCount,
    branches: totalStats.branches.covered / moduleCount,
    lines: totalStats.lines.covered / moduleCount
  }

  console.log('🎯 COBERTURA PROMEDIO DEL MONOREPO:')
  console.log(`   Statements: ${averageCoverage.statements.toFixed(1)}%`)
  console.log(`   Functions:  ${averageCoverage.functions.toFixed(1)}%`)
  console.log(`   Branches:   ${averageCoverage.branches.toFixed(1)}%`)
  console.log(`   Lines:      ${averageCoverage.lines.toFixed(1)}%`)

  // Check against STRATO standards
  const targetCoverage = 90
  console.log(`\n📋 OBJETIVO STRATO: ${targetCoverage}%`)
  
  if (averageCoverage.lines >= targetCoverage) {
    console.log('✅ Cobertura cumple con estándares STRATO')
  } else {
    console.log('❌ Cobertura por debajo de estándares STRATO')
    console.log(`   Necesitas mejorar ${(targetCoverage - averageCoverage.lines).toFixed(1)}%`)
  }

  return averageCoverage
}

// Execute if run directly
calculateTotalCoverage() 