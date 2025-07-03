#!/usr/bin/env tsx

/**
 * 🛡️ PACK DE DEFENSA PREVENTIVA STRATO™ - VALIDACIÓN AUTOMÁTICA POR COMMIT
 *
 * Este script se ejecuta automáticamente en cada commit para garantizar
 * que el código cumple con todos los estándares de calidad STRATO.
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
  private errors: string[] = []
  private warnings: string[] = []

  constructor() {
    console.log(
      '🛡️ PACK DE DEFENSA PREVENTIVA STRATO™ - VALIDACIÓN AUTOMÁTICA',
    )
  }

  /**
   * 1. Validación de código (lint + types)
   */
  private validateCode(): void {
    console.log('🔍 1. Validando código...')

    try {
      execSync('pnpm lint', { stdio: 'pipe' })
      console.log('✅ Linting pasado')
    } catch {
      this.errors.push('❌ Linting falló')
      console.error('❌ Linting falló')
    }

    try {
      execSync('pnpm typecheck', { stdio: 'pipe' })
      console.log('✅ Type checking pasado')
    } catch {
      this.errors.push('❌ Type checking falló')
      console.error('❌ Type checking falló')
    }
  }

  /**
   * 2. Tests obligatorios
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
      this.errors.push('❌ Tests fallaron')
      console.error('❌ Tests fallaron')
    }
  }

  /**
   * 3. Validación de trazabilidad
   */
  private validateTraceability(): void {
    console.log('🧭 3. Validando trazabilidad...')

    try {
      // Verificar que modules.json existe y es válido
      const modulesPath = join(this.rootDir, 'modules.json')
      if (!existsSync(modulesPath)) {
        this.errors.push('❌ modules.json no encontrado')
        return
      }

      const modules = JSON.parse(readFileSync(modulesPath, 'utf8'))

      // Verificar que todos los módulos tienen archivos
      for (const [, moduleData] of Object.entries(modules)) {
        if (
          !(moduleData as { files?: string[] }).files ||
          (moduleData as { files?: string[] }).files?.length === 0
        ) {
          this.warnings.push('⚠️ Módulo sin archivos')
        }
      }

      console.log('✅ Trazabilidad válida')
    } catch {
      this.errors.push('❌ Error validando trazabilidad')
      console.error('❌ Error validando trazabilidad')
    }
  }

  /**
   * 4. Detección de archivos huérfanos
   */
  private detectOrphanFiles(): void {
    console.log('📁 4. Detectando archivos huérfanos...')

    try {
      // Verificar archivos en src/ que no están en modules.json
      const modulesPath = join(this.rootDir, 'modules.json')
      const modules = JSON.parse(readFileSync(modulesPath, 'utf8'))

      const allFiles: string[] = []
      Object.values(modules).forEach((moduleData: { files?: string[] }) => {
        if (moduleData.files) {
          allFiles.push(...moduleData.files)
        }
      })

      // Buscar archivos .ts/.tsx en src/ que no están registrados
      const srcFiles = this.findSourceFiles(join(this.rootDir, 'apps'))

      const orphanFiles = srcFiles.filter((file) => !allFiles.includes(file))

      if (orphanFiles.length > 0) {
        this.errors.push(
          `❌ Archivos huérfanos encontrados: ${orphanFiles.join(', ')}`,
        )
        console.error('❌ Archivos huérfanos:', orphanFiles)
      } else {
        console.log('✅ No se encontraron archivos huérfanos')
      }
    } catch {
      this.errors.push('❌ Error detectando archivos huérfanos')
      console.error('❌ Error detectando archivos huérfanos')
    }
  }

  /**
   * 5. Validación de headers
   */
  private validateHeaders(): void {
    console.log('📄 5. Validando headers...')

    try {
      const modulesPath = join(this.rootDir, 'modules.json')
      const modules = JSON.parse(readFileSync(modulesPath, 'utf8'))

      let filesWithoutHeaders = 0

      for (const [, moduleData] of Object.entries(modules)) {
        const moduleFiles = (moduleData as { files?: string[] }).files || []

        for (const file of moduleFiles) {
          const filePath = join(this.rootDir, file)
          if (existsSync(filePath)) {
            const content = readFileSync(filePath, 'utf8')
            if (!content.includes('@strato-module:')) {
              filesWithoutHeaders++
              this.warnings.push(`⚠️ Archivo sin header: ${file}`)
            }
          }
        }
      }

      if (filesWithoutHeaders === 0) {
        console.log('✅ Todos los archivos tienen headers')
      } else {
        console.log(`⚠️ ${filesWithoutHeaders} archivos sin headers`)
      }
    } catch {
      this.errors.push('❌ Error validando headers')
      console.error('❌ Error validando headers')
    }
  }

  /**
   * 6. Performance de tests
   */
  private validateTestPerformance(): void {
    console.log('⚡ 6. Validando performance...')

    try {
      // Ejecutar tests con medición de tiempo
      const startTime = Date.now()
      execSync('pnpm test', { stdio: 'pipe' })
      const duration = Date.now() - startTime

      if (duration > 30000) {
        this.warnings.push(`⚠️ Tests tardaron ${duration}ms (>30s)`)
        console.log(`⚠️ Tests tardaron ${duration}ms`)
      } else {
        console.log(`✅ Tests rápidos (${duration}ms)`)
      }
    } catch {
      this.errors.push('❌ Error validando performance')
      console.error('❌ Error validando performance')
    }
  }

  /**
   * 7. Detección de falsos positivos
   */
  private detectFalsePositives(): void {
    console.log('🎯 7. Detectando falsos positivos...')

    try {
      // Buscar patrones de tests falsos positivos
      const testFiles = this.findTestFiles(join(this.rootDir, 'apps'))

      let falsePositives = 0

      for (const testFile of testFiles) {
        const content = readFileSync(testFile, 'utf8')

        // Patrones de falsos positivos
        const patterns = [
          /expect\(true\)\.toBe\(true\)/,
          /expect\(1\)\.toBe\(1\)/,
          /expect\("test"\)\.toBe\("test"\)/,
          /expect\(\[\]\)\.toEqual\(\[\]\)/,
          /expect\(\{\}\)\.toEqual\(\{\}\)/,
        ]

        for (const pattern of patterns) {
          if (pattern.test(content)) {
            falsePositives++
            this.warnings.push(`⚠️ Falso positivo detectado en: ${testFile}`)
          }
        }
      }

      if (falsePositives === 0) {
        console.log('✅ No se detectaron falsos positivos')
      } else {
        console.log(`⚠️ ${falsePositives} falsos positivos detectados`)
      }
    } catch {
      this.errors.push('❌ Error detectando falsos positivos')
      console.error('❌ Error detectando falsos positivos')
    }
  }

  /**
   * Utilidades para buscar archivos
   */
  private findSourceFiles(dir: string): string[] {
    const files: string[] = []

    try {
      const items = readdirSync(dir)

      for (const item of items) {
        const fullPath = join(dir, item)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
          files.push(...this.findSourceFiles(fullPath))
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          files.push(fullPath.replace(this.rootDir + '/', ''))
        }
      }
    } catch {
      // Ignorar errores de lectura
    }

    return files
  }

  private findTestFiles(dir: string): string[] {
    const files: string[] = []

    try {
      const items = readdirSync(dir)

      for (const item of items) {
        const fullPath = join(dir, item)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
          files.push(...this.findTestFiles(fullPath))
        } else if (item.includes('.test.') || item.includes('.spec.')) {
          files.push(fullPath)
        }
      }
    } catch {
      // Ignorar errores de lectura
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
      this.validateTraceability()
      this.detectOrphanFiles()
      this.validateHeaders()
      this.validateTestPerformance()
      this.detectFalsePositives()

      // Mostrar resumen
      console.log('\n📊 RESUMEN DE VALIDACIÓN:')

      if (this.errors.length > 0) {
        console.log('\n❌ ERRORES:')
        this.errors.forEach((error) => console.log(error))
        console.log(
          '\n🚫 COMMIT BLOQUEADO - Corrige los errores antes de continuar',
        )
        process.exit(1)
      }

      if (this.warnings.length > 0) {
        console.log('\n⚠️ ADVERTENCIAS:')
        this.warnings.forEach((warning) => console.log(warning))
        console.log('\n⚠️ Considera corregir las advertencias')
      }

      console.log(
        '\n✅ PACK DE DEFENSA PREVENTIVA STRATO™ - VALIDACIÓN EXITOSA',
      )
      console.log('🚀 Commit permitido')
    } catch {
      console.error('❌ Error durante la validación')
      process.exit(1)
    }
  }
}

// Ejecutar validación si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const validation = new PreCommitValidation()
  validation.run()
}

export default PreCommitValidation
