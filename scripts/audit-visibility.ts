#!/usr/bin/env tsx

import { readFile, stat } from 'fs/promises'
import { glob } from 'glob'
import { extname, relative } from 'path'

interface FileInfo {
  path: string
  relativePath: string
  type: 'ts' | 'js' | 'tsx' | 'jsx' | 'md' | 'json' | 'test' | 'other'
  size: number
  lastModified: Date
  isImported: boolean
  isInMd: boolean
  isInCursorRules: boolean
  isInTsConfig: boolean
  isInPackageJson: boolean
}

class VisibilityAuditor {
  private allFiles: FileInfo[] = []
  private imports: Set<string> = new Set()
  private mdFiles: Set<string> = new Set()
  private cursorRulesPaths: Set<string> = new Set()

  async run() {
    console.log(
      '🔍 STRATO Visibility Audit - Detectando archivos huérfanos...\n',
    )

    // 1. Escanear todos los archivos relevantes
    await this.scanAllFiles()

    // 2. Detectar imports y referencias
    await this.detectImports()
    await this.detectMdReferences()
    await this.detectCursorRulesPaths()

    // 3. Analizar visibilidad
    const orphanedFiles = this.allFiles.filter(
      (f) =>
        !f.isImported &&
        !f.isInMd &&
        !f.isInCursorRules &&
        !f.path.includes('node_modules') &&
        !f.path.includes('.git'),
    )

    // 4. Reportar resultados
    this.generateReport(orphanedFiles)

    // 5. Generar recomendaciones
    this.generateRecommendations(orphanedFiles)
  }

  private async scanAllFiles() {
    const patterns = [
      'apps/**/*.{ts,tsx,js,jsx,md,json}',
      'packages/**/*.{ts,tsx,js,jsx,md,json}',
      'scripts/**/*.{ts,tsx,js,jsx,md,json}',
      'supabase/**/*.{sql,json}',
      '*.{ts,tsx,js,jsx,md,json}',
      '~M_*.md',
    ]

    for (const pattern of patterns) {
      const files = await glob(pattern, {
        ignore: ['node_modules/**', '.git/**'],
      })

      for (const file of files) {
        const stats = await stat(file)
        const ext = extname(file).toLowerCase()

        let type: FileInfo['type'] = 'other'
        if (ext === '.ts' || ext === '.js') type = ext === '.ts' ? 'ts' : 'js'
        else if (ext === '.tsx' || ext === '.jsx')
          type = ext === '.tsx' ? 'tsx' : 'jsx'
        else if (ext === '.md') type = 'md'
        else if (ext === '.json') type = 'json'
        else if (file.includes('.test.')) type = 'test'

        this.allFiles.push({
          path: file,
          relativePath: relative(process.cwd(), file),
          type,
          size: stats.size,
          lastModified: stats.mtime,
          isImported: false,
          isInMd: false,
          isInCursorRules: false,
          isInTsConfig: false,
          isInPackageJson: false,
        })
      }
    }

    console.log(`📁 Escaneados ${this.allFiles.length} archivos`)
  }

  private async detectImports() {
    const tsFiles = this.allFiles.filter((f) =>
      ['ts', 'tsx', 'js', 'jsx'].includes(f.type),
    )

    for (const file of tsFiles) {
      try {
        const content = await readFile(file.path, 'utf-8')
        const importMatches = content.match(/import.*from\s+['"]([^'"]+)['"]/g)

        if (importMatches) {
          for (const match of importMatches) {
            const importPath = match.match(/['"]([^'"]+)['"]/)?.[1]
            if (importPath) {
              this.imports.add(importPath)
            }
          }
        }
      } catch {
        // Ignore read errors
      }
    }

    // Marcar archivos que son importados
    this.allFiles.forEach((file) => {
      const baseName = file.path.replace(/\.[^/.]+$/, '')
      const relativeBase = relative(process.cwd(), baseName)

      this.imports.forEach((importPath) => {
        if (
          importPath.includes(relativeBase) ||
          importPath.includes(file.relativePath)
        ) {
          file.isImported = true
        }
      })
    })
  }

  private async detectMdReferences() {
    const mdFiles = this.allFiles.filter((f) => f.type === 'md')

    for (const mdFile of mdFiles) {
      try {
        const content = await readFile(mdFile.path, 'utf-8')

        this.allFiles.forEach((file) => {
          if (
            content.includes(file.relativePath) ||
            content.includes(file.path)
          ) {
            file.isInMd = true
          }
        })
      } catch {
        // Ignore read errors
      }
    }
  }

  private async detectCursorRulesPaths() {
    try {
      const cursorRules = await readFile('.cursorrules', 'utf-8')

      this.allFiles.forEach((file) => {
        if (
          cursorRules.includes(file.relativePath) ||
          cursorRules.includes(file.path)
        ) {
          file.isInCursorRules = true
        }
      })
    } catch {
      console.log('⚠️  No se encontró .cursorrules')
    }
  }

  private generateReport(orphanedFiles: FileInfo[]) {
    console.log('\n📊 REPORTE DE VISIBILIDAD')
    console.log('='.repeat(50))

    console.log(
      `\n✅ Archivos con visibilidad completa: ${this.allFiles.filter((f) => f.isImported || f.isInMd || f.isInCursorRules).length}`,
    )
    console.log(`⚠️  Archivos huérfanos detectados: ${orphanedFiles.length}`)

    if (orphanedFiles.length > 0) {
      console.log('\n🔍 ARCHIVOS HUÉRFANOS:')
      orphanedFiles.forEach((file) => {
        console.log(
          `  - ${file.relativePath} (${file.type}, ${file.size} bytes)`,
        )
      })
    }
  }

  private generateRecommendations(orphanedFiles: FileInfo[]) {
    console.log('\n🎯 RECOMENDACIONES PARA MEJORAR VISIBILIDAD:')
    console.log('='.repeat(50))

    // Agrupar por tipo
    const byType = orphanedFiles.reduce(
      (acc, file) => {
        if (!acc[file.type]) acc[file.type] = []
        acc[file.type].push(file)
        return acc
      },
      {} as Record<string, FileInfo[]>,
    )

    Object.entries(byType).forEach(([type, files]) => {
      console.log(`\n📁 ${type.toUpperCase()} (${files.length} archivos):`)

      files.forEach((file) => {
        console.log(`  - ${file.relativePath}`)

        // Recomendaciones específicas por tipo
        if (type === 'ts' || type === 'tsx') {
          console.log(`    → Agregar a imports o exports en algún módulo`)
          console.log(`    → Documentar en ~M_[MODULO].md correspondiente`)
        } else if (type === 'md') {
          console.log(`    → Referenciar en .cursorrules`)
          console.log(`    → Agregar a README.md principal`)
        } else if (type === 'json') {
          console.log(`    → Verificar si es necesario en package.json`)
          console.log(`    → Documentar en tsconfig.json si es configuración`)
        }
      })
    })
  }
}

// Ejecutar auditoría
const auditor = new VisibilityAuditor()
auditor.run().catch(console.error)
