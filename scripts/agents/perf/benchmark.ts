// @AgentMeta
// name: @perf
// purpose: Benchmark y validación de performance STRATO
// usage: pnpm tsx scripts/agents/perf/benchmark.ts
// tags: perf, benchmark, strato

import { exec } from 'child_process'
import fs from 'fs'
import { glob } from 'glob'
import { promisify } from 'util'

const execAsync = promisify(exec)

export interface PerfAgentDeps {
  writeFileSync: (file: string, data: string) => void
}

interface BenchmarkResult {
  name: string
  duration: number
  memoryUsage: number
  status: 'success' | 'failure'
  error?: string
}

interface PerformanceIssue {
  type: 'bundle-size' | 'memory-leak' | 'slow-operation' | 'inefficient-code'
  priority: 'high' | 'medium' | 'low'
  file: string
  line?: number
  description: string
  recommendation: string
  metrics?: { [key: string]: number }
}

async function runBenchmark(
  name: string,
  fn: () => Promise<void> | void,
): Promise<BenchmarkResult> {
  const startTime = Date.now()
  const startMemory = process.memoryUsage().heapUsed

  try {
    await fn()
    const endTime = Date.now()
    const endMemory = process.memoryUsage().heapUsed

    return {
      name,
      duration: endTime - startTime,
      memoryUsage: endMemory - startMemory,
      status: 'success',
    }
  } catch (error) {
    return {
      name,
      duration: Date.now() - startTime,
      memoryUsage: process.memoryUsage().heapUsed - startMemory,
      status: 'failure',
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

async function analyzeBundleSize(): Promise<PerformanceIssue[]> {
  const issues: PerformanceIssue[] = []

  try {
    // Check for large files
    const files = await glob('**/*.{js,ts,jsx,tsx}', {
      ignore: ['node_modules/**', 'dist/**', '.git/**', 'coverage/**'],
    })

    for (const file of files) {
      const stats = fs.statSync(file)
      const sizeKB = stats.size / 1024

      if (sizeKB > 100) {
        issues.push({
          type: 'bundle-size',
          priority: sizeKB > 500 ? 'high' : 'medium',
          file,
          description: `Large file detected: ${sizeKB.toFixed(2)}KB`,
          recommendation:
            'Consider splitting large files or removing unused code',
          metrics: { sizeKB: Math.round(sizeKB) },
        })
      }
    }

    // Check for large dependencies
    const packageJsonFiles = await glob('**/package.json', {
      ignore: ['node_modules/**'],
    })

    for (const file of packageJsonFiles) {
      const content = JSON.parse(fs.readFileSync(file, 'utf-8'))
      const deps = { ...content.dependencies, ...content.devDependencies }

      // Check for known heavy packages
      const heavyPackages = [
        'lodash',
        'moment',
        'jquery',
        'bootstrap',
        'material-ui',
      ]
      heavyPackages.forEach((pkg) => {
        if (deps[pkg]) {
          issues.push({
            type: 'bundle-size',
            priority: 'medium',
            file,
            description: `Heavy dependency detected: ${pkg}`,
            recommendation: `Consider lighter alternatives to ${pkg}`,
            metrics: { package: pkg },
          })
        }
      })
    }
  } catch (error) {
    console.warn('Error analyzing bundle size:', error)
  }

  return issues
}

async function analyzeCodeEfficiency(): Promise<PerformanceIssue[]> {
  const issues: PerformanceIssue[] = []

  try {
    const files = await glob('**/*.{ts,js,tsx,jsx}', {
      ignore: ['node_modules/**', 'dist/**', '.git/**', 'coverage/**'],
    })

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8')
      const lines = content.split('\n')

      lines.forEach((line, index) => {
        const trimmed = line.trim()

        // Detect inefficient loops
        if (trimmed.includes('for') && trimmed.includes('length')) {
          if (trimmed.includes('.length') && !trimmed.includes('let len =')) {
            issues.push({
              type: 'inefficient-code',
              priority: 'low',
              file,
              line: index + 1,
              description: 'Loop accesses array length on each iteration',
              recommendation:
                'Cache array length in a variable before the loop',
            })
          }
        }

        // Detect synchronous operations that should be async
        if (
          trimmed.includes('fs.readFileSync') ||
          trimmed.includes('fs.writeFileSync')
        ) {
          issues.push({
            type: 'slow-operation',
            priority: 'medium',
            file,
            line: index + 1,
            description: 'Synchronous file operation detected',
            recommendation: 'Use async file operations for better performance',
          })
        }

        // Detect frequent DOM queries
        if (
          trimmed.includes('document.querySelector') ||
          trimmed.includes('document.getElementById')
        ) {
          issues.push({
            type: 'inefficient-code',
            priority: 'low',
            file,
            line: index + 1,
            description: 'DOM query should be cached',
            recommendation:
              'Cache DOM elements in variables instead of repeated queries',
          })
        }

        // Detect unoptimized regular expressions
        if (trimmed.includes('new RegExp(') && trimmed.includes('for')) {
          issues.push({
            type: 'inefficient-code',
            priority: 'medium',
            file,
            line: index + 1,
            description: 'RegExp created inside loop',
            recommendation:
              'Create RegExp outside loop to avoid repeated compilation',
          })
        }
      })
    }
  } catch (error) {
    console.warn('Error analyzing code efficiency:', error)
  }

  return issues
}

async function runSystemBenchmarks(): Promise<BenchmarkResult[]> {
  const benchmarks: BenchmarkResult[] = []

  // CPU benchmark
  benchmarks.push(
    await runBenchmark('CPU Intensive Task', async () => {
      let result = 0
      for (let i = 0; i < 1e6; i++) {
        result += Math.sqrt(i)
      }
      return result
    }),
  )

  // Memory benchmark
  benchmarks.push(
    await runBenchmark('Memory Allocation', async () => {
      const largeArray = new Array(1e6)
        .fill(0)
        .map((_, i) => ({ id: i, data: 'test' }))
      return largeArray.length
    }),
  )

  // I/O benchmark
  benchmarks.push(
    await runBenchmark('File I/O', async () => {
      const tempFile = 'temp-perf-test.txt'
      const data = 'test data '.repeat(1000)
      fs.writeFileSync(tempFile, data)
      const readData = fs.readFileSync(tempFile, 'utf-8')
      fs.unlinkSync(tempFile)
      return readData.length
    }),
  )

  // Build performance (if available)
  try {
    benchmarks.push(
      await runBenchmark('Build Performance', async () => {
        await execAsync(
          'pnpm build --dry-run || echo "Build command not available"',
        )
      }),
    )
  } catch {
    // Build command not available
  }

  return benchmarks
}

export default async function runAgent(
  deps: PerfAgentDeps = { writeFileSync: fs.writeFileSync },
): Promise<void> {
  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@perf',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: [] as string[],
    benchmarks: [] as BenchmarkResult[],
    issues: [] as PerformanceIssue[],
    summary: {
      bundleSize: 0,
      memoryLeaks: 0,
      slowOperations: 0,
      inefficientCode: 0,
      total: 0,
      avgBenchmarkTime: 0,
      totalMemoryUsage: 0,
    },
  }

  const start = Date.now()

  try {
    log.actionsPerformed.push('🚀 Running system benchmarks...')
    const benchmarks = await runSystemBenchmarks()
    log.benchmarks = benchmarks

    log.actionsPerformed.push('📦 Analyzing bundle size...')
    const bundleIssues = await analyzeBundleSize()

    log.actionsPerformed.push('⚡ Analyzing code efficiency...')
    const efficiencyIssues = await analyzeCodeEfficiency()

    // Combine all issues
    log.issues = [...bundleIssues, ...efficiencyIssues]

    // Calculate summary
    log.issues.forEach((issue) => {
      log.summary[
        issue.type === 'bundle-size'
          ? 'bundleSize'
          : issue.type === 'memory-leak'
            ? 'memoryLeaks'
            : issue.type === 'slow-operation'
              ? 'slowOperations'
              : 'inefficientCode'
      ]++
      log.summary.total++
    })

    log.summary.avgBenchmarkTime =
      benchmarks.length > 0
        ? Math.round(
            benchmarks.reduce((sum, b) => sum + b.duration, 0) /
              benchmarks.length,
          )
        : 0

    log.summary.totalMemoryUsage = benchmarks.reduce(
      (sum, b) => sum + Math.max(0, b.memoryUsage),
      0,
    )

    log.actionsPerformed.push(
      `✅ Performance analysis completed in ${Date.now() - start}ms`,
    )
    log.actionsPerformed.push(
      `📊 Issues found: ${log.summary.total} (Bundle: ${log.summary.bundleSize}, Efficiency: ${log.summary.inefficientCode}, I/O: ${log.summary.slowOperations})`,
    )
    log.actionsPerformed.push(
      `⏱️ Average benchmark time: ${log.summary.avgBenchmarkTime}ms`,
    )
  } catch (error) {
    log.status = 'fail'
    log.errors.push(error instanceof Error ? error.message : String(error))
  }

  deps.writeFileSync(
    'audit-artifacts/reports/perf-report.json',
    JSON.stringify(log, null, 2),
  )

  console.log(
    `[@perf] ejecutado - ${log.summary.total} issues found, avg benchmark: ${log.summary.avgBenchmarkTime}ms`,
  )
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
