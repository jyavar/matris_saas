// @AgentMeta
// name: @security
// purpose: Auditoría y chequeo de seguridad STRATO
// usage: pnpm tsx scripts/agents/security/security-check.ts
// tags: security, audit, strato

import { config } from 'dotenv'
import fs from 'fs'
import { glob } from 'glob'

// Load environment variables
config()

export interface SecurityAgentDeps {
  writeFileSync: (file: string, data: string) => void
}

interface SecurityIssue {
  type: 'critical' | 'high' | 'medium' | 'low'
  category: string
  file: string
  line?: number
  description: string
  recommendation: string
}

async function checkSecrets(): Promise<SecurityIssue[]> {
  const issues: SecurityIssue[] = []
  const patterns = [
    { pattern: /sk_live_[a-zA-Z0-9]+/, desc: 'Stripe Live Secret Key' },
    { pattern: /sk_test_[a-zA-Z0-9]+/, desc: 'Stripe Test Secret Key' },
    { pattern: /AIza[0-9A-Za-z\\-_]{35}/, desc: 'Google API Key' },
    { pattern: /AKIA[0-9A-Z]{16}/, desc: 'AWS Access Key' },
    {
      pattern: /eyJ[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_.+/=]*/,
      desc: 'JWT Token',
    },
    { pattern: /-----BEGIN [A-Z ]+-----/, desc: 'Private Key' },
  ]

  try {
    const files = await glob('**/*.{ts,js,tsx,jsx,json,md}', {
      ignore: ['node_modules/**', 'dist/**', '.git/**', 'coverage/**'],
    })

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8')
      const lines = content.split('\\n')

      lines.forEach((line, index) => {
        patterns.forEach(({ pattern, desc }) => {
          if (pattern.test(line)) {
            issues.push({
              type: 'critical',
              category: 'secrets',
              file,
              line: index + 1,
              description: `Possible ${desc} found in code`,
              recommendation: 'Move sensitive data to environment variables',
            })
          }
        })
      })
    }
  } catch (error) {
    console.warn('Error scanning for secrets:', error)
  }

  return issues
}

async function checkEnvironmentSecurity(): Promise<SecurityIssue[]> {
  const issues: SecurityIssue[] = []

  // Check for insecure environment configurations
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      issues.push({
        type: 'high',
        category: 'environment',
        file: '.env',
        description: 'JWT secret is too short or missing in production',
        recommendation: 'Use a strong JWT secret of at least 32 characters',
      })
    }

    if (
      process.env.SUPABASE_URL &&
      process.env.SUPABASE_URL.includes('localhost')
    ) {
      issues.push({
        type: 'high',
        category: 'environment',
        file: '.env',
        description: 'Using localhost Supabase URL in production',
        recommendation: 'Use production Supabase URL',
      })
    }
  }

  return issues
}

async function checkDependencies(): Promise<SecurityIssue[]> {
  const issues: SecurityIssue[] = []

  try {
    // Check for known vulnerable packages
    const vulnerablePackages = ['lodash', 'moment', 'request', 'debug', 'ms']

    const packageJsonFiles = await glob('**/package.json', {
      ignore: ['node_modules/**'],
    })

    for (const file of packageJsonFiles) {
      const content = JSON.parse(fs.readFileSync(file, 'utf-8'))
      const allDeps = {
        ...content.dependencies,
        ...content.devDependencies,
      }

      vulnerablePackages.forEach((pkg) => {
        if (allDeps[pkg]) {
          issues.push({
            type: 'medium',
            category: 'dependencies',
            file,
            description: `Package '${pkg}' may have known vulnerabilities`,
            recommendation: `Review and update '${pkg}' to latest secure version`,
          })
        }
      })
    }
  } catch (error) {
    console.warn('Error checking dependencies:', error)
  }

  return issues
}

async function checkFilePermissions(): Promise<SecurityIssue[]> {
  const issues: SecurityIssue[] = []

  try {
    // Check for sensitive files that might be publicly accessible
    const sensitiveFiles = [
      '.env',
      '.env.local',
      '.env.production',
      'id_rsa',
      'id_ecdsa',
    ]

    for (const file of sensitiveFiles) {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file)
        // Check if file is readable by others (simplified check)
        if (stats.mode & 0o044) {
          issues.push({
            type: 'medium',
            category: 'permissions',
            file,
            description: `Sensitive file '${file}' may be readable by others`,
            recommendation: 'Restrict file permissions to owner only',
          })
        }
      }
    }
  } catch (error) {
    console.warn('Error checking file permissions:', error)
  }

  return issues
}

export default async function runAgent(
  deps: SecurityAgentDeps = { writeFileSync: fs.writeFileSync },
): Promise<void> {
  const log = {
    timestamp: new Date().toISOString(),
    agentName: '@security',
    status: 'ok' as 'ok' | 'fail',
    errors: [] as string[],
    actionsPerformed: [] as string[],
    issues: [] as SecurityIssue[],
    summary: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      total: 0,
    },
  }

  try {
    log.actionsPerformed.push('🔍 Scanning for exposed secrets...')
    const secretIssues = await checkSecrets()

    log.actionsPerformed.push('🌍 Checking environment security...')
    const envIssues = await checkEnvironmentSecurity()

    log.actionsPerformed.push('📦 Checking dependency vulnerabilities...')
    const depIssues = await checkDependencies()

    log.actionsPerformed.push('🔒 Checking file permissions...')
    const permIssues = await checkFilePermissions()

    // Combine all issues
    log.issues = [...secretIssues, ...envIssues, ...depIssues, ...permIssues]

    // Calculate summary
    log.issues.forEach((issue) => {
      log.summary[issue.type]++
      log.summary.total++
    })

    // Determine overall status
    if (log.summary.critical > 0 || log.summary.high > 0) {
      log.status = 'fail'
      log.errors.push(
        `Found ${log.summary.critical} critical and ${log.summary.high} high severity issues`,
      )
    }

    log.actionsPerformed.push(
      `✅ Security scan completed: ${log.summary.total} issues found`,
    )
    log.actionsPerformed.push(
      `📊 Critical: ${log.summary.critical}, High: ${log.summary.high}, Medium: ${log.summary.medium}, Low: ${log.summary.low}`,
    )
  } catch (error) {
    log.status = 'fail'
    log.errors.push(
      `Security scan failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }

  deps.writeFileSync(
    'audit-artifacts/reports/security-report.json',
    JSON.stringify(log, null, 2),
  )

  console.log(`[@security] ejecutado - ${log.summary.total} issues found`)
}

if (import.meta.url === `file://${process.argv[1]}`) runAgent()
