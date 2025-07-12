#!/usr/bin/env tsx

/**
 * STRATO Core OS™ - Auditoría Completa Automática
 * 
 * Este script ejecuta una auditoría completa del sistema:
 * - Tests y cobertura
 * - Linting y TypeScript
 * - Dependencias y seguridad
 * - Estructura y archivos
 * - Performance y métricas
 */

import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

interface AuditResult {
  category: string
  status: '✅' | '❌' | '⚠️'
  message: string
  details?: string
  metrics?: Record<string, any>
}

class StratoAuditor {
  private results: AuditResult[] = []
  private startTime = Date.now()

  async runCompleteAudit(): Promise<void> {
    console.log('🔍 STRATO Core OS™ - Auditoría Completa Automática')
    console.log('=' .repeat(60))
    
    try {
      // 1. Auditoría de Tests
      await this.auditTests()
      
      // 2. Auditoría de Linting
      await this.auditLinting()
      
      // 3. Auditoría de TypeScript
      await this.auditTypeScript()
      
      // 4. Auditoría de Dependencias
      await this.auditDependencies()
      
      // 5. Auditoría de Estructura
      await this.auditStructure()
      
      // 6. Auditoría de Performance
      await this.auditPerformance()
      
      // 7. Generar Reporte
      await this.generateReport()
      
    } catch (error) {
      console.error('❌ Error en auditoría:', error)
      process.exit(1)
    }
  }

  private async auditTests(): Promise<void> {
    console.log('\n🧪 Auditoría de Tests...')
    
    try {
      // Ejecutar tests con cobertura
      const testOutput = execSync('pnpm test --coverage --reporter=verbose', { 
        encoding: 'utf8',
        stdio: 'pipe'
      })
      
      // Analizar resultados
      const testResults = this.parseTestResults(testOutput)
      
      this.results.push({
        category: 'Tests',
        status: testResults.passed > 0 ? '✅' : '❌',
        message: `${testResults.passed} tests pasando, ${testResults.failed} fallando`,
        metrics: testResults
      })
      
    } catch (error) {
      this.results.push({
        category: 'Tests',
        status: '❌',
        message: 'Error ejecutando tests',
        details: error.message
      })
    }
  }

  private async auditLinting(): Promise<void> {
    console.log('🔍 Auditoría de Linting...')
    
    try {
      const lintOutput = execSync('pnpm lint', { 
        encoding: 'utf8',
        stdio: 'pipe'
      })
      
      this.results.push({
        category: 'Linting',
        status: '✅',
        message: 'Sin errores de linting',
        details: lintOutput
      })
      
    } catch (error) {
      this.results.push({
        category: 'Linting',
        status: '❌',
        message: 'Errores de linting encontrados',
        details: error.message
      })
    }
  }

  private async auditTypeScript(): Promise<void> {
    console.log('📝 Auditoría de TypeScript...')
    
    try {
      const tsOutput = execSync('pnpm tsc --noEmit', { 
        encoding: 'utf8',
        stdio: 'pipe'
      })
      
      this.results.push({
        category: 'TypeScript',
        status: '✅',
        message: 'Sin errores de TypeScript',
        details: tsOutput
      })
      
    } catch (error) {
      this.results.push({
        category: 'TypeScript',
        status: '❌',
        message: 'Errores de TypeScript encontrados',
        details: error.message
      })
    }
  }

  private async auditDependencies(): Promise<void> {
    console.log('📦 Auditoría de Dependencias...')
    
    try {
      const auditOutput = execSync('pnpm audit --audit-level=moderate', { 
        encoding: 'utf8',
        stdio: 'pipe'
      })
      
      this.results.push({
        category: 'Dependencias',
        status: '✅',
        message: 'Sin vulnerabilidades críticas',
        details: auditOutput
      })
      
    } catch (error) {
      this.results.push({
        category: 'Dependencias',
        status: '⚠️',
        message: 'Vulnerabilidades encontradas',
        details: error.message
      })
    }
  }

  private async auditStructure(): Promise<void> {
    console.log('🏗️ Auditoría de Estructura...')
    
    const requiredDirs = [
      'apps/backend',
      'apps/frontend', 
      'apps/web',
      'scripts/agents',
      'packages',
      'supabase'
    ]
    
    const missingDirs = requiredDirs.filter(dir => !existsSync(dir))
    
    if (missingDirs.length === 0) {
      this.results.push({
        category: 'Estructura',
        status: '✅',
        message: 'Estructura de directorios correcta',
        details: `Directorios verificados: ${requiredDirs.join(', ')}`
      })
    } else {
      this.results.push({
        category: 'Estructura',
        status: '❌',
        message: 'Directorios faltantes',
        details: `Faltan: ${missingDirs.join(', ')}`
      })
    }
  }

  private async auditPerformance(): Promise<void> {
    console.log('⚡ Auditoría de Performance...')
    
    try {
      // Verificar tamaño de node_modules
      const nodeModulesSize = execSync('du -sh node_modules', { 
        encoding: 'utf8'
      }).trim()
      
      // Verificar tiempo de build
      const buildStart = Date.now()
      execSync('pnpm build', { stdio: 'pipe' })
      const buildTime = Date.now() - buildStart
      
      this.results.push({
        category: 'Performance',
        status: buildTime < 30000 ? '✅' : '⚠️',
        message: `Build completado en ${buildTime}ms`,
        metrics: {
          buildTime,
          nodeModulesSize
        }
      })
      
    } catch (error) {
      this.results.push({
        category: 'Performance',
        status: '❌',
        message: 'Error en build',
        details: error.message
      })
    }
  }

  private parseTestResults(output: string): Record<string, any> {
    // Parsear resultados de tests
    const lines = output.split('\n')
    const passed = lines.filter(line => line.includes('✓')).length
    const failed = lines.filter(line => line.includes('✗')).length
    
    return { passed, failed, total: passed + failed }
  }

  private async generateReport(): Promise<void> {
    const duration = Date.now() - this.startTime
    
    console.log('\n📊 REPORTE DE AUDITORÍA COMPLETA')
    console.log('=' .repeat(60))
    
    this.results.forEach(result => {
      console.log(`${result.status} ${result.category}: ${result.message}`)
      if (result.metrics) {
        Object.entries(result.metrics).forEach(([key, value]) => {
          console.log(`   ${key}: ${value}`)
        })
      }
    })
    
    const passed = this.results.filter(r => r.status === '✅').length
    const total = this.results.length
    
    console.log('\n📈 RESUMEN:')
    console.log(`✅ Pasaron: ${passed}/${total}`)
    console.log(`⏱️ Duración: ${duration}ms`)
    
    // Guardar reporte
    const report = {
      timestamp: new Date().toISOString(),
      duration,
      results: this.results,
      summary: { passed, total }
    }
    
    const fs = require('fs')
    fs.writeFileSync(
      'audit-artifacts/complete-audit.json',
      JSON.stringify(report, null, 2)
    )
    
    console.log('\n💾 Reporte guardado en: audit-artifacts/complete-audit.json')
  }
}

// Ejecutar auditoría
if (require.main === module) {
  const auditor = new StratoAuditor()
  auditor.runCompleteAudit()
    .then(() => {
      console.log('\n🎉 Auditoría completada')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Error en auditoría:', error)
      process.exit(1)
    })
}

export { StratoAuditor } 