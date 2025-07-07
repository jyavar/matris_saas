import { describe, it, expect, beforeEach, vi } from 'vitest'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// Mock de los módulos antes de importar
vi.mock('child_process')
vi.mock('fs')
vi.mock('path')

// Importar después de los mocks
import { QAAgent } from '../qa/audit'

describe('QA Agent', () => {
  let qaAgent: QAAgent

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Configurar mocks específicos
    vi.mocked(execSync).mockReturnValue(Buffer.from('mocked output'))
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        'test-package': '1.0.0',
      },
      devDependencies: {
        'vitest': '1.6.1',
      },
    }))
    vi.mocked(existsSync).mockReturnValue(true)
    vi.mocked(mkdirSync).mockImplementation(() => 'test-dir')
    vi.mocked(writeFileSync).mockImplementation(() => {})
    
    qaAgent = new QAAgent()
  })

  describe('QAAgent Constructor', () => {
    it('should initialize with correct project root', () => {
      expect(qaAgent).toBeInstanceOf(QAAgent)
    })
  })

  describe('runAudit', () => {
    it('should run complete audit successfully', async () => {
      const result = await qaAgent.runAudit()

      expect(result).toEqual({
        timestamp: expect.any(String),
        status: 'PASS',
        checks: {
          linting: { status: 'PASS', message: 'All linting rules passed' },
          tests: { status: 'PASS', message: 'All tests passing' },
          coverage: { status: 'PASS', message: 'Test coverage meets 90% threshold' },
          security: { status: 'PASS', message: 'No obvious security vulnerabilities detected' },
          performance: { status: 'PASS', message: 'Performance metrics are acceptable' },
        },
        summary: expect.any(String),
        recommendations: [],
      })
    })

    it('should handle linting failures', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command === 'pnpm lint') {
          throw new Error('Linting failed')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.linting.status).toBe('FAIL')
      expect(result.checks.linting.message).toBe('Linting errors found')
      expect(result.recommendations).toContain('Fix linting errors before proceeding')
    })

    it('should handle test failures', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command === 'pnpm test') {
          throw new Error('Tests failed')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.tests.status).toBe('FAIL')
      expect(result.checks.tests.message).toBe('Some tests are failing')
      expect(result.recommendations).toContain('Fix failing tests before proceeding')
    })

    it('should handle coverage warnings', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command === 'pnpm test:coverage') {
          return Buffer.from('Coverage: 85% - below threshold')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.coverage.status).toBe('WARNING')
      expect(result.checks.coverage.message).toBe('Test coverage below 90% threshold')
      expect(result.recommendations).toContain('Increase test coverage to 90% or higher')
    })

    it('should handle security warnings', async () => {
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify({
        dependencies: {
          'lodash': '4.17.15', // Vulnerable package
        },
        devDependencies: {},
      }))

      const result = await qaAgent.runAudit()

      expect(result.checks.security.status).toBe('WARNING')
      expect(result.checks.security.message).toContain('Potentially vulnerable packages found')
      expect(result.recommendations).toContain('Update vulnerable packages to latest versions')
    })

    it('should handle performance warnings', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command.includes('performance')) {
          return Buffer.from('Performance: SLOW - above threshold')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.performance.status).toBe('WARNING')
      expect(result.checks.performance.message).toContain('Performance metrics need attention')
    })

    it('should handle audit failures gracefully', async () => {
      vi.mocked(execSync).mockImplementation(() => {
        throw new Error('Unexpected error')
      })

      const result = await qaAgent.runAudit()

      expect(result.status).toBe('FAIL')
      expect(result.summary).toContain('Audit failed')
    })
  })

  describe('checkLinting', () => {
    it('should pass when linting succeeds', async () => {
      const result = await qaAgent.runAudit()

      expect(result.checks.linting.status).toBe('PASS')
      expect(vi.mocked(execSync)).toHaveBeenCalledWith('pnpm lint', {
        cwd: expect.any(String),
        stdio: 'pipe',
      })
    })

    it('should fail when linting throws error', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command === 'pnpm lint') {
          throw new Error('Linting failed')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.linting.status).toBe('FAIL')
      expect(result.checks.linting.details).toBe('Linting failed')
    })
  })

  describe('checkTests', () => {
    it('should pass when tests succeed', async () => {
      const result = await qaAgent.runAudit()

      expect(result.checks.tests.status).toBe('PASS')
      expect(vi.mocked(execSync)).toHaveBeenCalledWith('pnpm test', {
        cwd: expect.any(String),
        stdio: 'pipe',
      })
    })

    it('should fail when tests throw error', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command === 'pnpm test') {
          throw new Error('Tests failed')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.tests.status).toBe('FAIL')
      expect(result.checks.tests.details).toBe('Tests failed')
    })
  })

  describe('checkCoverage', () => {
    it('should pass when coverage meets threshold', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command === 'pnpm test:coverage') {
          return Buffer.from('Coverage: 95% - excellent!')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.coverage.status).toBe('PASS')
      expect(result.checks.coverage.message).toBe('Test coverage meets 90% threshold')
    })

    it('should warn when coverage is below threshold', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command === 'pnpm test:coverage') {
          return Buffer.from('Coverage: 85% - below threshold')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.coverage.status).toBe('WARNING')
      expect(result.checks.coverage.message).toBe('Test coverage below 90% threshold')
    })

    it('should fail when coverage check throws error', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command === 'pnpm test:coverage') {
          throw new Error('Coverage check failed')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.coverage.status).toBe('FAIL')
      expect(result.checks.coverage.details).toBe('Coverage check failed')
    })
  })

  describe('checkSecurity', () => {
    it('should pass when no vulnerable packages found', async () => {
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify({
        dependencies: {
          'safe-package': '1.0.0',
        },
        devDependencies: {},
      }))

      const result = await qaAgent.runAudit()

      expect(result.checks.security.status).toBe('PASS')
      expect(result.checks.security.message).toBe('No obvious security vulnerabilities detected')
    })

    it('should warn when vulnerable packages found', async () => {
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify({
        dependencies: {
          'lodash': '4.17.15',
          'moment': '2.29.1',
        },
        devDependencies: {},
      }))

      const result = await qaAgent.runAudit()

      expect(result.checks.security.status).toBe('WARNING')
      expect(result.checks.security.message).toContain('Potentially vulnerable packages found')
    })

    it('should fail when security check throws error', async () => {
      vi.mocked(readFileSync).mockImplementation(() => {
        throw new Error('Security check failed')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.security.status).toBe('FAIL')
      expect(result.checks.security.details).toBe('Security check failed')
    })
  })

  describe('checkPerformance', () => {
    it('should pass when performance is acceptable', async () => {
      const result = await qaAgent.runAudit()

      expect(result.checks.performance.status).toBe('PASS')
      expect(result.checks.performance.message).toBe('Performance metrics are acceptable')
    })

    it('should warn when performance needs attention', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command.includes('performance')) {
          return Buffer.from('Performance: SLOW - above threshold')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.checks.performance.status).toBe('WARNING')
      expect(result.checks.performance.message).toContain('Performance metrics need attention')
    })
  })

  describe('generateSummary', () => {
    it('should generate summary with all checks passing', async () => {
      const result = await qaAgent.runAudit()

      expect(result.summary).toContain('All checks passed')
      expect(result.recommendations).toEqual([])
    })

    it('should generate summary with warnings', async () => {
      vi.mocked(execSync).mockImplementation((command: string) => {
        if (command === 'pnpm test:coverage') {
          return Buffer.from('Coverage: 85% - below threshold')
        }
        return Buffer.from('mocked output')
      })

      const result = await qaAgent.runAudit()

      expect(result.summary).toContain('Some checks have warnings')
      expect(result.recommendations).toContain('Increase test coverage to 90% or higher')
    })
  })

  describe('saveResults', () => {
    it('should save results to file', async () => {
      await qaAgent.runAudit()

      expect(vi.mocked(mkdirSync)).toHaveBeenCalledWith(
        expect.stringContaining('audit-artifacts/reports'),
        { recursive: true }
      )
      expect(vi.mocked(writeFileSync)).toHaveBeenCalledWith(
        expect.stringContaining('qa-audit.json'),
        expect.any(String)
      )
    })
  })
}) 