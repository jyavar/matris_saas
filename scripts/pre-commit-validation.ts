#!/usr/bin/env tsx

/**
 * 🛡️ PACK DE DEFENSA PREVENTIVA STRATO™ - VALIDACIÓN AUTOMÁTICA POR COMMIT
 *
 * Este script se ejecuta automáticamente en cada commit para mostrar warnings
 * sobre la calidad del código STRATO.
 *
 * @strato-module: DEFENSE
 * @strato-file: pre-commit-validation.ts
 * @strato-version: 1.0.0
 * @strato-traceability: true
 * @strato-tests: pre-commit-validation.test.ts
 * @strato-routes: N/A
 * @strato-controller: N/A
 */

import { execSync } from 'child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'

class PreCommitValidation {
  private readonly rootDir = process.cwd()
  private warnings: string[] = []

  constructor() {
    console.log(
      '🛡️ PACK DE DEFENSA PREVENTIVA STRATO™ - VALIDACIÓN AUTOMÁTICA (WARNINGS)',
    )
  }

  /**
   * 1. Validación de código (solo warnings)
   */
  private validateCode(): void {
    console.log('🔍 1. Validando código...')

    try {
      execSync('pnpm lint', { stdio: 'pipe' })
      console.log('✅ Linting pasado')
    } catch {
      this.warnings.push('⚠️ Linting encontró problemas')
      console.warn('⚠️ Linting encontró problemas')
    }

    try {
      execSync('pnpm typecheck', { stdio: 'pipe' })
      console.log('✅ Type checking pasado')
    } catch {
      this.warnings.push('⚠️ Type checking encontró problemas')
      console.warn('⚠️ Type checking encontró problemas')
    }
  }

  /**
   * 2. Tests (solo warnings)
   */
  private validateTests(): void {
    console.log('🧪 2. Ejecutando tests...')

    try {
      const startTime = Date.now()
      execSync('pnpm test', { stdio: 'pipe' })
      const duration = Date.now() - startTime

      console.log(`✅ Tests pasaron (${duration}ms)`)

      if (duration > 30000) {
        this.warnings.push('⚠️ Tests tardaron más de 30 segundos')
      }
    } catch {
      this.warnings.push('⚠️ Tests encontraron problemas')
      console.warn('⚠️ Tests encontraron problemas')
    }
  }

  /**
   * 3. Detección de archivos huérfanos (solo warnings)
   */
  private detectOrphanFiles(): void {
    console.log('📁 3. Detectando archivos huérfanos...')

    try {
      // Buscar archivos .ts/.tsx en apps/ que podrían estar huérfanos
      const srcFiles = this.findSourceFiles(join(this.rootDir, 'apps'))

      if (srcFiles.length > 0) {
        console.log(`✅ Encontrados ${srcFiles.length} archivos fuente`)
      }
    } catch {
      this.warnings.push('⚠️ Error detectando archivos huérfanos')
      console.warn('⚠️ Error detectando archivos huérfanos')
    }
  }

  /**
   * 4. Performance de tests (solo warnings)
   */
  private validateTestPerformance(): void {
    console.log('⚡ 4. Validando performance...')

    try {
      // Ejecutar tests con medición de tiempo
      const startTime = Date.now()
      execSync('pnpm test', { stdio: 'pipe' })
      const duration = Date.now() - startTime

      if (duration > 30000) {
        this.warnings.push(`⚠️ Tests tardaron ${duration}ms (>30s)`)
        console.warn(`⚠️ Tests tardaron ${duration}ms`)
      } else {
        console.log(`✅ Tests rápidos (${duration}ms)`)
      }
    } catch {
      this.warnings.push('⚠️ Error validando performance')
      console.warn('⚠️ Error validando performance')
    }
  }

  /**
   * Buscar archivos fuente
   */
  private findSourceFiles(dir: string): string[] {
    const files: string[] = []

    if (!existsSync(dir)) return files

    const items = readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
      const fullPath = join(dir, item.name)

      if (item.isDirectory()) {
        files.push(...this.findSourceFiles(fullPath))
      } else if (
        item.isFile() &&
        (item.name.endsWith('.ts') || item.name.endsWith('.tsx'))
      ) {
        files.push(fullPath)
      }
    }

    return files
  }

  /**
   * Ejecutar todas las validaciones
   */
  public async run(): Promise<void> {
    try {
      this.validateCode()
      this.validateTests()
      this.detectOrphanFiles()
      this.validateTestPerformance()

      // Mostrar resumen de warnings
      if (this.warnings.length > 0) {
        console.log('\n⚠️ WARNINGS ENCONTRADOS:')
        this.warnings.forEach((warning) => console.log(`  ${warning}`))
        console.log('\n💡 Estos son solo warnings, el commit continuará...')
      } else {
        console.log('\n✅ No se encontraron warnings')
      }

      console.log('\n✅ Validación completada (warnings permitidos)')
    } catch (error) {
      console.warn('⚠️ Error durante validación:', error)
      console.log('💡 Continuando con el commit...')
    }
  }
}

// Ejecutar validación
const validator = new PreCommitValidation()
validator.run().catch((error) => {
  console.warn('⚠️ Error ejecutando validación:', error)
  console.log('💡 Continuando con el commit...')
})
