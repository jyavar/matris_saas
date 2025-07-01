#!/usr/bin/env tsx

import { readFile, stat, writeFile } from 'fs/promises'
import { glob } from 'glob'
import { basename, extname, relative } from 'path'

interface ModuleHeader {
  module: string
  description: string
  paths: string[]
  tests: string[]
  routes: string[]
  docs: string[]
  last_synced: string
  responsible: string
  coverage: number
  status: string
  criticality: string
}

interface FileInfo {
  path: string
  relativePath: string
  type: 'source' | 'test' | 'config' | 'doc' | 'script' | 'other'
  size: number
  module?: string
}

class ModuleSynchronizer {
  private allFiles: FileInfo[] = []
  private moduleHeaders: Map<string, ModuleHeader> = new Map()
  private moduleFiles: Map<string, string[]> = new Map()

  async sync(): Promise<void> {
    console.log('🔄 STRATO Module Synchronization - Sincronizando módulos...\n')

    try {
      // 1. Escanear todos los archivos
      await this.scanAllFiles()

      // 2. Extraer headers existentes
      await this.extractExistingHeaders()

      // 3. Detectar archivos por módulo
      this.detectFilesByModule()

      // 4. Actualizar headers JSON
      await this.updateModuleHeaders()

      // 5. Actualizar secciones "Archivos clave"
      await this.updateArchivosClaveSections()

      // 6. Generar reporte
      this.generateSyncReport()
    } catch (error) {
      console.error('❌ Error durante sincronización:', error)
      process.exit(1)
    }
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
        ignore: ['node_modules/**', '.git/**', 'dist/**'],
      })

      for (const file of files) {
        const stats = await stat(file)
        const ext = extname(file).toLowerCase()

        let type: FileInfo['type'] = 'other'
        if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
          type =
            file.includes('.test.') || file.includes('.spec.')
              ? 'test'
              : 'source'
        } else if (ext === '.md') type = 'doc'
        else if (
          ext === '.json' ||
          ext === '.config.ts' ||
          ext === '.config.js'
        )
          type = 'config'
        else if (file.includes('scripts/')) type = 'script'

        this.allFiles.push({
          path: file,
          relativePath: relative(process.cwd(), file),
          type,
          size: stats.size,
        })
      }
    }

    console.log(`📁 Escaneados ${this.allFiles.length} archivos`)
  }

  private async extractExistingHeaders() {
    const moduleFiles = await glob('~M_*.md')

    for (const moduleFile of moduleFiles) {
      try {
        const content = await readFile(moduleFile, 'utf-8')
        const headerMatch = content.match(
          /<!--\s*STRATO MODULE HEADER\s*(\{[\s\S]*?\})\s*-->/,
        )

        if (headerMatch) {
          const headerJson = JSON.parse(headerMatch[1])
          const moduleName = basename(moduleFile, '.md').replace('~M_', '')
          this.moduleHeaders.set(moduleName, headerJson)
        }
      } catch (error) {
        console.warn(`⚠️ Error parsing header in ${moduleFile}: ${error}`)
      }
    }

    console.log(`📋 Extraídos ${this.moduleHeaders.size} headers existentes`)
  }

  private detectFilesByModule() {
    // Mapear archivos a módulos basado en patrones de directorio
    const modulePatterns = {
      AUTH: ['auth', 'Auth'],
      ANALYTICS: ['analytics', 'Analytics'],
      BILLING: ['billing', 'Billing', 'stripe', 'Stripe'],
      CAMPAIGNS: ['campaigns', 'Campaigns'],
      COPILOT: ['copilot', 'Copilot', 'openai', 'OpenAI'],
      LAUNCHBOARD: ['launchboard', 'Launchboard'],
      RUNTIME_DEFENSE: ['runtime', 'Runtime'],
      SAAS_MATRIX: ['saas', 'Saas'],
      UI_FULL: ['ui', 'Ui', 'components', 'Components'],
      BACKEND_CORE: [
        'backend',
        'Backend',
        'controllers',
        'services',
        'middleware',
      ],
      DEV: ['dev', 'Dev', 'scripts'],
      TESTS: ['test', 'Test', 'tests', 'Tests'],
      PRICING: ['pricing', 'Pricing'],
      EMAIL_CAMPAIGNS: ['email', 'Email', 'resend', 'Resend'],
      ANALYTICS_REPORTING: ['reporting', 'Reporting'],
      MULTI_TENANCY: ['tenant', 'Tenant', 'multi'],
      WEB_PUBLIC: ['web', 'Web', 'public'],
      AUTOMATION_ENGINE: ['automation', 'Automation', 'engine'],
      INFRASTRUCTURE: ['infrastructure', 'Infrastructure', 'config', 'Config'],
    }

    for (const file of this.allFiles) {
      for (const [moduleName, patterns] of Object.entries(modulePatterns)) {
        if (patterns.some((pattern) => file.path.includes(pattern))) {
          if (!this.moduleFiles.has(moduleName)) {
            this.moduleFiles.set(moduleName, [])
          }
          this.moduleFiles.get(moduleName)!.push(file.relativePath)
          file.module = moduleName
          break
        }
      }
    }

    console.log(`📂 Detectados archivos para ${this.moduleFiles.size} módulos`)
  }

  private async updateModuleHeaders() {
    const today = new Date().toISOString().split('T')[0]

    for (const [moduleName, files] of this.moduleFiles) {
      const existingHeader = this.moduleHeaders.get(moduleName)

      const sourceFiles = files.filter((f) => {
        const file = this.allFiles.find((af) => af.relativePath === f)
        return file?.type === 'source'
      })

      const testFiles = files.filter((f) => {
        const file = this.allFiles.find((af) => af.relativePath === f)
        return file?.type === 'test'
      })

      const docFiles = files.filter((f) => {
        const file = this.allFiles.find((af) => af.relativePath === f)
        return file?.type === 'doc'
      })

      const updatedHeader: ModuleHeader = {
        module: moduleName,
        description:
          existingHeader?.description || `Módulo ${moduleName} de STRATO`,
        paths: sourceFiles,
        tests: testFiles,
        routes: existingHeader?.routes || [],
        docs: docFiles,
        last_synced: today,
        responsible: existingHeader?.responsible || 'José + IA STRATO',
        coverage: Math.round(
          (testFiles.length / Math.max(sourceFiles.length, 1)) * 100,
        ),
        status: 'active',
        criticality: existingHeader?.criticality || 'medium',
      }

      this.moduleHeaders.set(moduleName, updatedHeader)
    }
  }

  private async updateArchivosClaveSections() {
    for (const [moduleName, files] of this.moduleFiles) {
      const moduleFile = `~M_${moduleName}.md`

      try {
        const content = await readFile(moduleFile, 'utf-8')
        const updatedContent = this.updateArchivosClaveSection(content, files)
        await writeFile(moduleFile, updatedContent)
        console.log(`✅ Actualizado ${moduleFile}`)
      } catch (error) {
        console.warn(`⚠️ No se pudo actualizar ${moduleFile}: ${error}`)
      }
    }
  }

  private updateArchivosClaveSection(content: string, files: string[]): string {
    const sourceFiles = files.filter((f) => {
      const file = this.allFiles.find((af) => af.relativePath === f)
      return file?.type === 'source'
    })

    const testFiles = files.filter((f) => {
      const file = this.allFiles.find((af) => af.relativePath === f)
      return file?.type === 'test'
    })

    const configFiles = files.filter((f) => {
      const file = this.allFiles.find((af) => af.relativePath === f)
      return file?.type === 'config'
    })

    const docFiles = files.filter((f) => {
      const file = this.allFiles.find((af) => af.relativePath === f)
      return file?.type === 'doc'
    })

    const archivosClaveSection = `## 📁 ARCHIVOS CLAVE

### **Source Files**
${sourceFiles.map((f) => `- \`${f}\` - Archivo fuente`).join('\n')}

### **Test Files**
${testFiles.map((f) => `- \`${f}\` - Archivo de test`).join('\n')}

### **Config Files**
${configFiles.map((f) => `- \`${f}\` - Archivo de configuración`).join('\n')}

### **Doc Files**
${docFiles.map((f) => `- \`${f}\` - Archivo de documentación`).join('\n')}`

    // Buscar y reemplazar la sección existente o agregar al final
    const sectionRegex = /## 📁 ARCHIVOS CLAVE[\s\S]*?(?=## |$)/
    if (sectionRegex.test(content)) {
      return content.replace(sectionRegex, archivosClaveSection)
    } else {
      return content + '\n\n' + archivosClaveSection
    }
  }

  private generateSyncReport() {
    console.log('\n📊 REPORTE DE SINCRONIZACIÓN')
    console.log('='.repeat(50))

    for (const [moduleName, files] of this.moduleFiles) {
      const sourceFiles = files.filter((f) => {
        const file = this.allFiles.find((af) => af.relativePath === f)
        return file?.type === 'source'
      })

      const testFiles = files.filter((f) => {
        const file = this.allFiles.find((af) => af.relativePath === f)
        return file?.type === 'test'
      })

      const coverage = Math.round(
        (testFiles.length / Math.max(sourceFiles.length, 1)) * 100,
      )
      const today = new Date().toISOString().split('T')[0]

      console.log(`\n📦 ${moduleName}:`)
      console.log(`   📁 Archivos: ${files.length}`)
      console.log(`   📋 Source: ${sourceFiles.length}`)
      console.log(`   🧪 Tests: ${testFiles.length}`)
      console.log(`   📈 Coverage: ${coverage}%`)
      console.log(`   🔄 Última sync: ${today}`)
    }

    console.log('\n' + '='.repeat(50))
    console.log('✅ Sincronización completada exitosamente!')
  }
}

// Ejecutar sincronización
const synchronizer = new ModuleSynchronizer()
synchronizer.sync().catch(console.error)
