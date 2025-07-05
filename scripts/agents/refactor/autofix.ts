// @AgentMeta
// name: @refactor
// purpose: Refactorización automática de código y detección de duplicados STRATO
// usage: pnpm tsx scripts/agents/refactor/autofix.ts
// tags: refactor, quality, automation

import crypto from 'crypto'
import fs from 'fs'
import { glob } from 'glob'

export interface RefactorDeps {
  writeFileSync: (file: string, data: string) => void
}

interface RefactorSuggestion {
  type: 'duplicate' | 'complexity' | 'naming' | 'pattern'
  priority: 'high' | 'medium' | 'low'
  file: string
  line?: number
  description: string
  suggestion: string
  codeBlock?: string
}

interface DuplicateBlock {
  hash: string
  content: string
  files: Array<{ file: string; line: number }>
  lines: number
}

async function findDuplicateCode(): Promise<DuplicateBlock[]> {
  const duplicates: DuplicateBlock[] = []
  const codeBlocks = new Map<string, DuplicateBlock>()

  try {
    const files = await glob('**/*.{ts,js,tsx,jsx}', {
      ignore: [
        'node_modules/**',
        'dist/**',
        '.git/**',
        'coverage/**',
        '.next/**',
      ],
    })

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8')
      const lines = content.split('\n')

      // Check for duplicate blocks of 5+ lines
      for (let i = 0; i < lines.length - 4; i++) {
        const block = lines
          .slice(i, i + 5)
          .join('\n')
          .trim()
        if (block.length < 50) continue // Skip very short blocks

        const hash = crypto.createHash('md5').update(block).digest('hex')

        if (codeBlocks.has(hash)) {
          const existing = codeBlocks.get(hash)!
          existing.files.push({ file, line: i + 1 })
        } else {
          codeBlocks.set(hash, {
            hash,
            content: block,
            files: [{ file, line: i + 1 }],
            lines: 5,
          })
        }
      }
    }

    // Filter for actual duplicates
    for (const block of codeBlocks.values()) {
      if (block.files.length > 1) {
        duplicates.push(block)
      }
    }
  } catch (error) {
    console.warn('Error finding duplicates:', error)
  }

  return duplicates
}

async function analyzeComplexity(): Promise<RefactorSuggestion[]> {
  const suggestions: RefactorSuggestion[] = []

  try {
    const files = await glob('**/*.{ts,js,tsx,jsx}', {
      ignore: [
        'node_modules/**',
        'dist/**',
        '.git/**',
        'coverage/**',
        '.next/**',
      ],
    })

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8')
      const lines = content.split('\n')

      lines.forEach((line, index) => {
        const trimmed = line.trim()

        // Long function detection
        if (trimmed.includes('function') || trimmed.includes('=>')) {
          const functionContent = content.substring(content.indexOf(trimmed))
          const braceCount = (functionContent.match(/{/g) || []).length

          if (braceCount > 10) {
            suggestions.push({
              type: 'complexity',
              priority: 'high',
              file,
              line: index + 1,
              description: 'Function appears to be too complex',
              suggestion:
                'Consider breaking this function into smaller, focused functions',
              codeBlock: trimmed,
            })
          }
        }

        // Long parameter lists
        if (trimmed.includes('(') && trimmed.includes(')')) {
          const params = trimmed
            .substring(trimmed.indexOf('(') + 1, trimmed.indexOf(')'))
            .split(',')
          if (params.length > 5) {
            suggestions.push({
              type: 'complexity',
              priority: 'medium',
              file,
              line: index + 1,
              description: 'Function has too many parameters',
              suggestion:
                'Consider using an options object or splitting the function',
              codeBlock: trimmed,
            })
          }
        }

        // Any type usage
        if (trimmed.includes(': any') || trimmed.includes('<any>')) {
          suggestions.push({
            type: 'pattern',
            priority: 'medium',
            file,
            line: index + 1,
            description: 'Usage of "any" type detected',
            suggestion: 'Replace with specific type for better type safety',
            codeBlock: trimmed,
          })
        }
      })
    }
  } catch (error) {
    console.warn('Error analyzing complexity:', error)
  }

  return suggestions
}

async function analyzeNamingConventions(): Promise<RefactorSuggestion[]> {
  const suggestions: RefactorSuggestion[] = []

  try {
    const files = await glob('**/*.{ts,js,tsx,jsx}', {
      ignore: [
        'node_modules/**',
        'dist/**',
        '.git/**',
        'coverage/**',
        '.next/**',
      ],
    })

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8')
      const lines = content.split('\n')

      lines.forEach((line, index) => {
        const trimmed = line.trim()

        // Variable naming
        const varMatch = trimmed.match(
          /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
        )
        if (varMatch) {
          varMatch.forEach((match) => {
            const varName = match.split(/\s+/)[1]
            if (
              varName.length < 3 &&
              !['i', 'j', 'k', 'id'].includes(varName)
            ) {
              suggestions.push({
                type: 'naming',
                priority: 'low',
                file,
                line: index + 1,
                description: `Variable name '${varName}' is too short`,
                suggestion: 'Use more descriptive variable names',
                codeBlock: trimmed,
              })
            }
          })
        }

        // Function naming
        if (trimmed.includes('function') && !trimmed.includes('arrow')) {
          const funcMatch = trimmed.match(
            /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
          )
          if (funcMatch) {
            funcMatch.forEach((match) => {
              const funcName = match.split(/\s+/)[1]
              if (!/^[a-z]/.test(funcName)) {
                suggestions.push({
                  type: 'naming',
                  priority: 'medium',
                  file,
                  line: index + 1,
                  description: `Function '${funcName}' should start with lowercase`,
                  suggestion: 'Use camelCase for function names',
                  codeBlock: trimmed,
                })
              }
            })
          }
        }
      })
    }
  } catch (error) {
    console.warn('Error analyzing naming:', error)
  }

  return suggestions
}

export default async function runAgent(
  deps: RefactorDeps = { writeFileSync: fs.writeFileSync },
): Promise<void> {
  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@refactor',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: [] as string[],
    duplicates: [] as DuplicateBlock[],
    suggestions: [] as RefactorSuggestion[],
    summary: {
      duplicates: 0,
      complexity: 0,
      naming: 0,
      patterns: 0,
      total: 0,
    },
  }

  try {
    log.actionsPerformed.push('🔍 Scanning for duplicate code blocks...')
    const duplicates = await findDuplicateCode()
    log.duplicates = duplicates
    log.summary.duplicates = duplicates.length

    log.actionsPerformed.push('📊 Analyzing code complexity...')
    const complexitySuggestions = await analyzeComplexity()

    log.actionsPerformed.push('📝 Checking naming conventions...')
    const namingSuggestions = await analyzeNamingConventions()

    // Combine all suggestions
    log.suggestions = [...complexitySuggestions, ...namingSuggestions]

    // Calculate summary
    log.suggestions.forEach((suggestion) => {
      log.summary[
        suggestion.type === 'complexity'
          ? 'complexity'
          : suggestion.type === 'naming'
            ? 'naming'
            : 'patterns'
      ]++
      log.summary.total++
    })

    log.actionsPerformed.push(
      `✅ Refactor analysis completed: ${log.summary.duplicates} duplicates, ${log.summary.total} suggestions`,
    )
    log.actionsPerformed.push(
      `📊 Complexity: ${log.summary.complexity}, Naming: ${log.summary.naming}, Patterns: ${log.summary.patterns}`,
    )
  } catch (error) {
    log.status = 'fail'
    log.errors.push(error instanceof Error ? error.message : String(error))
  }

  deps.writeFileSync(
    'audit-artifacts/reports/refactor-report.json',
    JSON.stringify(log, null, 2),
  )

  console.log(
    `[@refactor] ejecutado - ${log.summary.duplicates} duplicates, ${log.summary.total} suggestions found`,
  )
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
