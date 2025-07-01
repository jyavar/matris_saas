import { beforeEach, describe, expect, it, vi } from 'vitest'

import { QAManager } from './index'

// Mock QAAgent
const mockRunAudit = vi.fn()
vi.mock('./audit', () => ({
  QAAgent: vi.fn().mockImplementation(() => ({
    runAudit: mockRunAudit,
  })),
}))

// Mock QARunner
const mockRun = vi.fn()
vi.mock('./run-qa', () => ({
  QARunner: vi.fn().mockImplementation(() => ({
    run: mockRun,
  })),
}))

describe('QAManager', () => {
  let manager: QAManager

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('constructor', () => {
    it('should set default options', () => {
      manager = new QAManager()
      expect(manager).toBeDefined()
    })

    it('should override default options', () => {
      manager = new QAManager({
        mode: 'runner',
        verbose: true,
        saveReport: false,
        exitOnFailure: false,
      })
      expect(manager).toBeDefined()
    })
  })

  describe('run', () => {
    describe('audit mode', () => {
      it('should run audit mode successfully', async () => {
        const mockResults = {
          status: 'PASS',
          summary: 'All checks passed',
          recommendations: [],
        }

        mockRunAudit.mockResolvedValue(mockResults)

        manager = new QAManager({ mode: 'audit' })
        const result = await manager.run()

        expect(console.log).toHaveBeenCalledWith(
          '🔍 @qa Agent Manager - Starting QA operations...',
        )
        expect(result).toEqual(mockResults)
      })

      it('should display results when verbose is enabled', async () => {
        const mockResults = {
          status: 'PASS',
          summary: 'All checks passed',
          recommendations: [],
        }

        mockRunAudit.mockResolvedValue(mockResults)

        manager = new QAManager({ mode: 'audit', verbose: true })
        await manager.run()

        expect(console.log).toHaveBeenCalledWith(
          expect.stringContaining('📋 QA Audit Results:'),
        )
        expect(console.log).toHaveBeenCalledWith(
          expect.stringContaining('Status: ✅ PASS'),
        )
      })

      it('should display recommendations when present', async () => {
        const mockResults = {
          status: 'WARNING',
          summary: 'Some warnings found',
          recommendations: ['Fix coverage', 'Update dependencies'],
        }

        mockRunAudit.mockResolvedValue(mockResults)

        manager = new QAManager({ mode: 'audit', verbose: true })
        await manager.run()

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

      it('should handle audit errors', async () => {
        mockRunAudit.mockRejectedValue(new Error('Audit failed'))

        manager = new QAManager({ mode: 'audit' })

        await expect(manager.run()).rejects.toThrow('Audit failed')
        expect(console.error).toHaveBeenCalledWith(
          '❌ @qa Agent Manager failed:',
          expect.any(Error),
        )
      })
    })

    describe('runner mode', () => {
      it('should run runner mode successfully', async () => {
        mockRun.mockResolvedValue(undefined)

        manager = new QAManager({ mode: 'runner' })
        const result = await manager.run()

        expect(console.log).toHaveBeenCalledWith(
          '🔍 @qa Agent Manager - Starting QA operations...',
        )
        expect(result).toEqual({ status: 'completed' })
      })

      it('should pass options to QARunner', async () => {
        mockRun.mockResolvedValue(undefined)

        manager = new QAManager({
          mode: 'runner',
          verbose: true,
          saveReport: false,
          exitOnFailure: false,
        })
        await manager.run()

        expect(mockRun).toHaveBeenCalled()
      })

      it('should handle runner errors', async () => {
        mockRun.mockRejectedValue(new Error('Runner failed'))

        manager = new QAManager({ mode: 'runner' })

        await expect(manager.run()).rejects.toThrow('Runner failed')
        expect(console.error).toHaveBeenCalledWith(
          '❌ @qa Agent Manager failed:',
          expect.any(Error),
        )
      })
    })
  })

  describe('displayResults', () => {
    it('should display PASS status correctly', async () => {
      const mockResults = {
        status: 'PASS',
        summary: 'All checks passed',
        recommendations: [],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      manager = new QAManager({ mode: 'audit', verbose: true })
      await manager.run()

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Status: ✅ PASS'),
      )
    })

    it('should display FAIL status correctly', async () => {
      const mockResults = {
        status: 'FAIL',
        summary: 'Some checks failed',
        recommendations: ['Fix errors'],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      manager = new QAManager({ mode: 'audit', verbose: true })
      await manager.run()

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Status: ❌ FAIL'),
      )
    })

    it('should display WARNING status correctly', async () => {
      const mockResults = {
        status: 'WARNING',
        summary: 'Some warnings found',
        recommendations: ['Fix warnings'],
      }

      mockRunAudit.mockResolvedValue(mockResults)

      manager = new QAManager({ mode: 'audit', verbose: true })
      await manager.run()

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Status: ⚠️ WARNING'),
      )
    })
  })
})
