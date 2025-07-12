// Mocks deben ir antes de importar el módulo a testear
vi.mock('child_process', () => ({
  execSync: vi.fn(),
}))

vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
}))

vi.mock('path', () => ({
  join: (...args: string[]) => args.join('/'),
}))

// Import after mocks
import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import type { MockInstance } from 'vitest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { QAAgent } from './audit.js'

describe('QAAgent', () => {
  let qaAgent: QAAgent
  let mockExecSync: MockInstance
  let mockReadFileSync: MockInstance
  let mockWriteFileSync: MockInstance

  beforeEach(() => {
    vi.clearAllMocks()
    qaAgent = new QAAgent()

    // Get typed mocks and ensure they're properly mocked
    mockExecSync = vi.mocked(execSync)
    mockReadFileSync = vi.mocked(readFileSync)
    mockWriteFileSync = vi.mocked(writeFileSync)

    // Ensure mocks are reset to default behavior
    mockExecSync.mockReset()
    mockReadFileSync.mockReset()
    mockWriteFileSync.mockReset()
  })

  describe('runAudit', () => {
    it('should complete audit successfully with all checks passing', async () => {
      mockExecSync
        .mockReturnValueOnce('Linting passed')
        .mockReturnValueOnce('Tests passed')
        .mockReturnValueOnce('Coverage: 95%')
        .mockReturnValueOnce('Build completed')

      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {},
          devDependencies: {},
        }),
      )

      await qaAgent.runAudit()
    })

    it('should handle linting failures', async () => {
      mockExecSync
        .mockImplementationOnce(() => {
          throw new Error('Linting failed')
        })
        .mockReturnValueOnce('Tests passed')
        .mockReturnValueOnce('Coverage: 95%')
        .mockReturnValueOnce('Build completed')

      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {},
          devDependencies: {},
        }),
      )

      await qaAgent.runAudit()
    })

    it('should handle test failures', async () => {
      mockExecSync
        .mockReturnValueOnce('Linting passed')
        .mockImplementationOnce(() => {
          throw new Error('Tests failed')
        })
        .mockReturnValueOnce('Coverage: 95%')
        .mockReturnValueOnce('Build completed')

      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {},
          devDependencies: {},
        }),
      )

      await qaAgent.runAudit()
    })

    it('should handle low coverage warnings', async () => {
      mockExecSync
        .mockReturnValueOnce('Linting passed')
        .mockReturnValueOnce('Tests passed')
        .mockReturnValueOnce('Coverage: 75%')
        .mockReturnValueOnce('Build completed')

      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {},
          devDependencies: {},
        }),
      )

      await qaAgent.runAudit()
    })

    it('should detect vulnerable packages', async () => {
      mockExecSync
        .mockReturnValueOnce('Linting passed')
        .mockReturnValueOnce('Tests passed')
        .mockReturnValueOnce('Coverage: 95%')
        .mockReturnValueOnce('Build completed')

      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: { lodash: '^4.17.21' },
          devDependencies: {},
        }),
      )

      await qaAgent.runAudit()
    })

    it('should handle build failures', async () => {
      mockExecSync
        .mockReturnValueOnce('Linting passed')
        .mockReturnValueOnce('Tests passed')
        .mockReturnValueOnce('Coverage: 95%')
        .mockImplementationOnce(() => {
          throw new Error('Build failed')
        })

      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {},
          devDependencies: {},
        }),
      )

      await qaAgent.runAudit()
    })

    it('should generate correct summary with mixed results', async () => {
      mockExecSync
        .mockReturnValueOnce('Linting passed')
        .mockReturnValueOnce('Tests passed')
        .mockReturnValueOnce('Coverage: 75%')
        .mockReturnValueOnce('Build completed')

      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: { lodash: '^4.17.21' },
          devDependencies: {},
        }),
      )

      await qaAgent.runAudit()
    })

    it('should save results to file', async () => {
      mockExecSync
        .mockReturnValueOnce('Linting passed')
        .mockReturnValueOnce('Tests passed')
        .mockReturnValueOnce('Coverage: 95%')
        .mockReturnValueOnce('Build completed')

      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {},
          devDependencies: {},
        }),
      )

      await qaAgent.runAudit()

      // Check that the file path ends with qa-audit.json and the content includes the correct status
      expect(mockWriteFileSync).toHaveBeenCalled()
      const [filePath, fileContent] = mockWriteFileSync.mock.calls[0]
      expect(filePath).toMatch(/qa-audit\.json$/)
      const parsed = JSON.parse(fileContent)
      expect(parsed.status).toBe('WARNING')
    })

    it('should handle file system errors gracefully', async () => {
      mockExecSync
        .mockReturnValueOnce('Linting passed')
        .mockReturnValueOnce('Tests passed')
        .mockReturnValueOnce('Coverage: 95%')
        .mockReturnValueOnce('Build completed')

      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })

      await qaAgent.runAudit()
    })

    it('should handle multiple concurrent audits', async () => {
      mockExecSync.mockReturnValue('Linting passed')

      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {},
          devDependencies: {},
        }),
      )

      const promises = [
        qaAgent.runAudit(),
        qaAgent.runAudit(),
        qaAgent.runAudit(),
      ]

      await Promise.all(promises)
    })
  })

  describe('QAAgent instance methods', () => {
    it('should create new instance with default settings', () => {
      const agent = new QAAgent()
      expect(agent).toBeInstanceOf(QAAgent)
    })

    it('should handle audit with custom thresholds', async () => {
      const customAgent = new QAAgent()
      mockExecSync
        .mockReturnValueOnce('Linting passed')
        .mockReturnValueOnce('Tests passed')
        .mockReturnValueOnce('Coverage: 85%')
        .mockReturnValueOnce('Build completed')

      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {},
          devDependencies: {},
        }),
      )

      await customAgent.runAudit()
    })
  })
})
