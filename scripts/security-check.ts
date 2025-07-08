#!/usr/bin/env tsx

/**
 * 🛡️ STRATO Security Check Script
 * Detecta posibles secrets y información sensible en el código
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { glob } from 'glob'

// Patrones de secrets a detectar
const SECRET_PATTERNS = [
  // API Keys
  /api[_-]?key\s*[:=]\s*['"`][^'"`]{20,}['"`]/gi,
  /secret[_-]?key\s*[:=]\s*['"`][^'"`]{20,}['"`]/gi,
  /private[_-]?key\s*[:=]\s*['"`][^'"`]{20,}['"`]/gi,
  
  // Tokens
  /token\s*[:=]\s*['"`][^'"`]{20,}['"`]/gi,
  /jwt[_-]?secret\s*[:=]\s*['"`][^'"`]{20,}['"`]/gi,
  
  // Passwords
  /password\s*[:=]\s*['"`][^'"`]{8,}['"`]/gi,
  /passwd\s*[:=]\s*['"`][^'"`]{8,}['"`]/gi,
  
  // Database URLs
  /database[_-]?url\s*[:=]\s*['"`][^'"`]*['"`]/gi,
  /db[_-]?url\s*[:=]\s*['"`][^'"`]*['"`]/gi,
  
  // Connection strings
  /connection[_-]?string\s*[:=]\s*['"`][^'"`]*['"`]/gi,
  
  // OAuth secrets
  /oauth[_-]?secret\s*[:=]\s*['"`][^'"`]{20,}['"`]/gi,
  /client[_-]?secret\s*[:=]\s*['"`][^'"`]{20,}['"`]/gi,
  
  // Stripe keys
  /stripe[_-]?secret[_-]?key\s*[:=]\s*['"`]sk_[^'"`]*['"`]/gi,
  /stripe[_-]?publishable[_-]?key\s*[:=]\s*['"`]pk_[^'"`]*['"`]/gi,
  
  // AWS keys
  /aws[_-]?access[_-]?key[_-]?id\s*[:=]\s*['"`][^'"`]{20,}['"`]/gi,
  /aws[_-]?secret[_-]?access[_-]?key\s*[:=]\s*['"`][^'"`]{20,}['"`]/gi,
  
  // Supabase keys
  /supabase[_-]?url\s*[:=]\s*['"`][^'"`]*['"`]/gi,
  /supabase[_-]?key\s*[:=]\s*['"`][^'"`]{20,}['"`]/gi,
  
  // OpenAI keys
  /openai[_-]?api[_-]?key\s*[:=]\s*['"`]sk-[^'"`]*['"`]/gi,
  
  // Hardcoded emails
  /email\s*[:=]\s*['"`][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}['"`]/gi,
  
  // Hardcoded phone numbers
  /phone\s*[:=]\s*['"`]\+?[1-9]\d{1,14}['"`]/gi,
]

// Archivos a ignorar
const IGNORE_PATTERNS = [
  'node_modules/**',
  '.git/**',
  'dist/**',
  'build/**',
  '.next/**',
  'coverage/**',
  '*.log',
  '*.lock',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  '.env.example',
  '.env.local',
  '.env.production',
  '.env.development',
  '*.test.ts',
  '*.test.tsx',
  '*.spec.ts',
  '*.spec.tsx',
  '__tests__/**',
  'tests/**',
  'test/**',
  'docs/**',
  '*.md',
  '*.txt',
  '*.json',
  '*.yml',
  '*.yaml',
]

// Extensiones de archivos a revisar
const SCAN_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.vue', '.svelte']

interface SecurityIssue {
  file: string
  line: number
  pattern: string
  context: string
}

class SecurityChecker {
  private issues: SecurityIssue[] = []

  async scanProject(): Promise<void> {
    console.log('🛡️ STRATO Security Check - Escaneando proyecto...')
    
    try {
      // Buscar archivos a escanear
      const files = await glob('**/*', {
        ignore: IGNORE_PATTERNS,
        nodir: true,
      })

      const filesToScan = files.filter(file => 
        SCAN_EXTENSIONS.includes(extname(file))
      )

      console.log(`📁 Escaneando ${filesToScan.length} archivos...`)

      for (const file of filesToScan) {
        await this.scanFile(file)
      }

      this.reportResults()
    } catch (error) {
      console.error('❌ Error durante el escaneo:', error)
      process.exit(1)
    }
  }

  private async scanFile(filePath: string): Promise<void> {
    try {
      const content = readFileSync(filePath, 'utf-8')
      const lines = content.split('\n')

      for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        const line = lines[lineNumber]
        
        for (const pattern of SECRET_PATTERNS) {
          if (pattern.test(line)) {
            this.issues.push({
              file: filePath,
              line: lineNumber + 1,
              pattern: pattern.source,
              context: line.trim(),
            })
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️ No se pudo leer el archivo ${filePath}:`, error)
    }
  }

  private reportResults(): void {
    if (this.issues.length === 0) {
      console.log('✅ No se encontraron posibles secrets en el código')
      return
    }

    console.log(`\n🚨 Se encontraron ${this.issues.length} posibles secrets:`)
    console.log('=' * 50)

    for (const issue of this.issues) {
      console.log(`\n📄 ${issue.file}:${issue.line}`)
      console.log(`🔍 Patrón: ${issue.pattern}`)
      console.log(`📝 Contexto: ${issue.context}`)
    }

    console.log('\n' + '=' * 50)
    console.log('❌ Security check falló - Revisa los posibles secrets encontrados')
    console.log('💡 Recomendaciones:')
    console.log('   - Mueve los secrets a variables de entorno (.env)')
    console.log('   - Usa .env.example para documentar las variables requeridas')
    console.log('   - Nunca commitees archivos .env con secrets reales')
    console.log('   - Considera usar un gestor de secrets como Vault o AWS Secrets Manager')

    process.exit(1)
  }
}

// Ejecutar el checker
async function main() {
  const checker = new SecurityChecker()
  await checker.scanProject()
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error fatal:', error)
    process.exit(1)
  })
}

export { SecurityChecker } 