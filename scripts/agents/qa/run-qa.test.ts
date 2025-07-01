import { beforeEach, describe, expect, it, vi } from 'vitest'

import { QARunner } from './run-qa'

// Mock QAAgent
const mockRunAudit = vi.fn()
vi.mock('./audit', () => ({
  QAAgent: vi.fn().mockImplementation(() => ({
    runAudit: mockRunAudit,
  })),
}))

describe('QARunner', () => {
  let runner: QARunner

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
  })

  describe('constructor', () => {
    it('should set default options', () => {
      runner = new QARunner()
      expect(runner).toBeDefined()
    })

    it('should override default options', () => {
      runner = new QARunner({
        verbose: true,
        saveReport: false,
        exitOnFailure: false,
      })
      expect(runner).toBeDefined()
    })
  })

  describe('run', () => {
    it('should run successfully with PASS status', async () => {
      const mockResults = {
        status: 'PASS',
        timestamp: '2025-01-01T00:00:00.000Z',
        summary: 'All checks passed',
        checks: {
          linting: { status: 'PASS', message: 'Linting passed' },
          tests: { status: 'PASS', message: 'Tests passed' },
          coverage: { status: 'PASS', message: 'Coverage good' },
          security: { status: 'PASS', message: 'Security good' },
          performance: { status: 'PASS', message: 'Performance good' },
        },
        recommendations: [],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      runner = new QARunner()
      await runner.run()

      expect(console.log).toHaveBeenCalledWith(
        '🚀 Starting @qa Agent Runner...',
      )
      expect(console.log).toHaveBeenCalledWith(
        '✅ QA Audit passed successfully',
      )
      expect(process.exit).toHaveBeenCalledWith(0)
    })

    it('should handle FAIL status with exit on failure', async () => {
      const mockResults = {
        status: 'FAIL',
        timestamp: '2025-01-01T00:00:00.000Z',
        summary: 'Some checks failed',
        checks: {
          linting: { status: 'FAIL', message: 'Linting failed' },
          tests: { status: 'PASS', message: 'Tests passed' },
          coverage: { status: 'PASS', message: 'Coverage good' },
          security: { status: 'PASS', message: 'Security good' },
          performance: { status: 'PASS', message: 'Performance good' },
        },
        recommendations: ['Fix linting errors'],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      runner = new QARunner({ exitOnFailure: true })
      await runner.run()

      expect(console.error).toHaveBeenCalledWith(
        '❌ QA Audit failed - exiting with code 1',
      )
      expect(process.exit).toHaveBeenCalledWith(1)
    })

    it('should handle FAIL status without exit on failure', async () => {
      const mockResults = {
        status: 'FAIL',
        timestamp: '2025-01-01T00:00:00.000Z',
        summary: 'Some checks failed',
        checks: {
          linting: { status: 'FAIL', message: 'Linting failed' },
          tests: { status: 'PASS', message: 'Tests passed' },
          coverage: { status: 'PASS', message: 'Coverage good' },
          security: { status: 'PASS', message: 'Security good' },
          performance: { status: 'PASS', message: 'Performance good' },
        },
        recommendations: ['Fix linting errors'],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      runner = new QARunner({ exitOnFailure: false })
      await runner.run()

      expect(process.exit).not.toHaveBeenCalledWith(1)
    })

    it('should handle WARNING status', async () => {
      const mockResults = {
        status: 'WARNING',
        timestamp: '2025-01-01T00:00:00.000Z',
        summary: 'Some warnings found',
        checks: {
          linting: { status: 'PASS', message: 'Linting passed' },
          tests: { status: 'PASS', message: 'Tests passed' },
          coverage: { status: 'WARNING', message: 'Low coverage' },
          security: { status: 'PASS', message: 'Security good' },
          performance: { status: 'PASS', message: 'Performance good' },
        },
        recommendations: ['Increase coverage'],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      runner = new QARunner()
      await runner.run()

      expect(console.log).toHaveBeenCalledWith(
        '⚠️  QA Audit completed with warnings',
      )
      expect(process.exit).toHaveBeenCalledWith(0)
    })

    it('should display verbose output when enabled', async () => {
      const mockResults = {
        status: 'PASS',
        timestamp: '2025-01-01T00:00:00.000Z',
        summary: 'All checks passed',
        checks: {
          linting: { status: 'PASS', message: 'Linting passed' },
          tests: { status: 'PASS', message: 'Tests passed' },
          coverage: { status: 'PASS', message: 'Coverage good' },
          security: { status: 'PASS', message: 'Security good' },
          performance: { status: 'PASS', message: 'Performance good' },
        },
        recommendations: [],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      runner = new QARunner({ verbose: true })
      await runner.run()

      expect(console.log).toHaveBeenCalledWith('Options:', {
        verbose: true,
        saveReport: true,
        exitOnFailure: true,
      })
    })

    it('should handle errors gracefully', async () => {
      mockRunAudit.mockRejectedValue(new Error('QA Agent failed'))

      runner = new QARunner()
      await runner.run()

      expect(console.error).toHaveBeenCalledWith(
        '❌ QA Agent Runner failed:',
        expect.any(Error),
      )
      expect(process.exit).toHaveBeenCalledWith(1)
    })
  })

  describe('displayResults', () => {
    it('should display results correctly', async () => {
      const mockResults = {
        status: 'PASS',
        timestamp: '2025-01-01T00:00:00.000Z',
        summary: 'All checks passed',
        checks: {
          linting: { status: 'PASS', message: 'Linting passed' },
          tests: { status: 'PASS', message: 'Tests passed' },
          coverage: { status: 'PASS', message: 'Coverage good' },
          security: { status: 'PASS', message: 'Security good' },
          performance: { status: 'PASS', message: 'Performance good' },
        },
        recommendations: [],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      runner = new QARunner()
      await runner.run()

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('📋 QA Audit Results:'),
      )
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Status: ✅ PASS'),
      )
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('LINTING: PASS'),
      )
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('TESTS: PASS'),
      )
    })

    it('should display recommendations when present', async () => {
      const mockResults = {
        status: 'WARNING',
        timestamp: '2025-01-01T00:00:00.000Z',
        summary: 'Some warnings found',
        checks: {
          linting: { status: 'PASS', message: 'Linting passed' },
          tests: { status: 'PASS', message: 'Tests passed' },
          coverage: { status: 'WARNING', message: 'Low coverage' },
          security: { status: 'PASS', message: 'Security good' },
          performance: { status: 'PASS', message: 'Performance good' },
        },
        recommendations: ['Fix coverage', 'Update dependencies'],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      runner = new QARunner()
      await runner.run()

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('💡 Recommendations:'),
      )
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('1. Fix coverage'),
      )
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('2. Update dependencies'),
      )
    })

    it('should display verbose details when enabled', async () => {
      const mockResults = {
        status: 'FAIL',
        timestamp: '2025-01-01T00:00:00.000Z',
        summary: 'Some checks failed',
        checks: {
          linting: {
            status: 'FAIL',
            message: 'Linting failed',
            details: 'ESLint errors found',
          },
          tests: { status: 'PASS', message: 'Tests passed' },
          coverage: { status: 'PASS', message: 'Coverage good' },
          security: { status: 'PASS', message: 'Security good' },
          performance: { status: 'PASS', message: 'Performance good' },
        },
        recommendations: ['Fix linting errors'],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      runner = new QARunner({ verbose: true })
      await runner.run()

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Details: ESLint errors found'),
      )
    })
  })
})
