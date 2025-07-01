#!/usr/bin/env tsx

/**
 * 🛡️ PACK DE DEFENSA PREVENTIVA STRATO™ - SISTEMA DE RECORDATORIOS AUTOMÁTICOS
 * 
 * Este script se ejecuta automáticamente al iniciar cada sesión de desarrollo
 * para recordar y garantizar la aplicación del PACK DE DEFENSA PREVENTIVA STRATO™.
 * 
 * @strato-module: DEFENSE
 * @strato-file: defense-reminder.ts
 * @strato-version: 1.0.0
 * @strato-traceability: true
 * @strato-tests: defense-reminder.test.ts
 * @strato-routes: N/A
 * @strato-controller: N/A
 */

import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

class DefenseReminder {
  private readonly rootDir = process.cwd()
  private readonly reminderFile = join(this.rootDir, '.defense-reminder')
  private readonly lastRunFile = join(this.rootDir, '.defense-last-run')

  constructor() {
    this.showBanner()
  }

  /**
   * Mostrar banner del PACK DE DEFENSA PREVENTIVA STRATO™
   */
  private showBanner(): void {
    console.log(`
🛡️ PACK DE DEFENSA PREVENTIVA STRATO™ - RECORDATORIO AUTOMÁTICO
================================================================

🎯 OBJETIVO: GARANTIZAR CALIDAD, TRAZABILIDAD Y ROBUSTEZ
📋 ESTADO: ACTIVO Y MONITOREANDO

📊 MÉTRICAS OBLIGATORIAS:
   ✅ Cobertura de tests: ≥ 90%
   ✅ Performance de tests: < 5s por test
   ✅ Trazabilidad: 100% archivos con headers
   ✅ Orphan files: 0 archivos huérfanos
   ✅ False positives: 0 tests falsos positivos
   ✅ Dead code: 0 archivos muertos
   ✅ Fragile imports: 0 imports frágiles

🚨 CHECKLIST OBLIGATORIO POR COMMIT:
   1. 🔍 Validación de código (lint + types)
   2. 🧪 Tests obligatorios
   3. 🧭 Validación de trazabilidad
   4. 📁 Detección de archivos huérfanos
   5. 📄 Validación de headers
   6. ⚡ Performance de tests
   7. 🎯 Detección de falsos positivos

🤖 COMANDOS DISPONIBLES:
   pnpm validate:full          # Validación completa
   pnpm test:performance       # Medir performance
   pnpm detect:orphan:files    # Detectar archivos huérfanos
   pnpm validate:traceability  # Validar trazabilidad
   pnpm dashboard:status       # Estado del sistema

📚 DOCUMENTACIÓN: PACK_DEFENSA_PREVENTIVA_STRATO.md

================================================================
`)
  }

  /**
   * Verificar si es la primera vez que se ejecuta
   */
  private isFirstRun(): boolean {
    return !existsSync(this.lastRunFile)
  }

  /**
   * Verificar si han pasado más de 24 horas desde la última ejecución
   */
  private shouldShowReminder(): boolean {
    if (!existsSync(this.lastRunFile)) {
      return true
    }

    try {
      const lastRun = readFileSync(this.lastRunFile, 'utf8')
      const lastRunTime = new Date(lastRun).getTime()
      const now = new Date().getTime()
      const hoursDiff = (now - lastRunTime) / (1000 * 60 * 60)
      
      return hoursDiff >= 24
    } catch {
      return true
    }
  }

  /**
   * Mostrar recordatorio de implementación
   */
  private showImplementationReminder(): void {
    console.log(`
🚀 IMPLEMENTACIÓN DEL PACK DE DEFENSA PREVENTIVA STRATO™
========================================================

Para implementar automáticamente todas las validaciones:

   pnpm tsx scripts/defense-pack-implementation.ts

Esto configurará:
   ✅ Pre-commit hooks automáticos
   ✅ Templates de test
   ✅ Generación de headers
   ✅ Sistema de factories
   ✅ Scripts de package.json

¿Quieres implementar ahora? (y/n)
`)
  }

  /**
   * Mostrar recordatorio de validación
   */
  private showValidationReminder(): void {
    console.log(`
📋 RECORDATORIO DE VALIDACIÓN
=============================

Antes de hacer commit, ejecuta:

   pnpm validate:full

Esto validará:
   ✅ Linting y type checking
   ✅ Tests obligatorios
   ✅ Trazabilidad
   ✅ Archivos huérfanos
   ✅ Headers
   ✅ Performance
   ✅ Falsos positivos

¿Quieres ejecutar validación ahora? (y/n)
`)
  }

  /**
   * Mostrar estado actual del sistema
   */
  private showSystemStatus(): void {
    console.log(`
📊 ESTADO ACTUAL DEL SISTEMA
============================

Verificando métricas...

`)
    
    // Verificar cobertura de tests
    try {
      const coverageOutput = execSync('pnpm test --coverage', { stdio: 'pipe' }).toString()
      
      if (coverageOutput.includes('All files')) {
        console.log('✅ Cobertura de tests: Verificada')
      } else {
        console.log('⚠️ Cobertura de tests: Requiere verificación')
      }
    } catch {
      console.log('❌ Cobertura de tests: Error al verificar')
    }

    // Verificar archivos huérfanos
    try {
      const modulesPath = join(this.rootDir, 'modules.json')
      if (existsSync(modulesPath)) {
        const modules = JSON.parse(readFileSync(modulesPath, 'utf8'))
        let totalFiles = 0
        let filesWithHeaders = 0
        
        for (const [, moduleData] of Object.entries(modules)) {
          const moduleFiles = (moduleData as { files?: string[] }).files || []
          totalFiles += moduleFiles.length
          
          for (const file of moduleFiles) {
            const filePath = join(this.rootDir, file)
            if (existsSync(filePath)) {
              const content = readFileSync(filePath, 'utf8')
              if (content.includes('@strato-module:')) {
                filesWithHeaders++
              }
            }
          }
        }
        
        console.log(`✅ Archivos con headers: ${filesWithHeaders}/${totalFiles}`)
        console.log(`✅ Módulos registrados: ${Object.keys(modules).length}`)
      } else {
        console.log('❌ modules.json no encontrado')
      }
    } catch {
      console.log('❌ Error verificando trazabilidad')
    }

    console.log(`
📈 PRÓXIMOS PASOS RECOMENDADOS:
   1. Ejecutar pnpm validate:full
   2. Revisar métricas de performance
   3. Verificar cobertura de tests
   4. Validar trazabilidad completa

`)
  }

  /**
   * Actualizar timestamp de última ejecución
   */
  private updateLastRun(): void {
    writeFileSync(this.lastRunFile, new Date().toISOString())
  }

  /**
   * Ejecutar recordatorio
   */
  public async run(): Promise<void> {
    try {
      // Mostrar banner siempre
      this.showBanner()
      
      // Si es la primera vez, mostrar implementación
      if (this.isFirstRun()) {
        this.showImplementationReminder()
        this.updateLastRun()
        return
      }
      
      // Si han pasado más de 24 horas, mostrar recordatorio
      if (this.shouldShowReminder()) {
        this.showValidationReminder()
        this.updateLastRun()
        return
      }
      
      // Mostrar estado del sistema
      this.showSystemStatus()
      this.updateLastRun()
      
    } catch {
      console.error('❌ Error en el sistema de recordatorios')
    }
  }
}

// Ejecutar recordatorio si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const reminder = new DefenseReminder()
  reminder.run()
}

export default DefenseReminder 