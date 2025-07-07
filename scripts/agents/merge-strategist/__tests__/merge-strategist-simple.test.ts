import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'fs'

// Mock de dependencias
vi.mock('fs', () => ({
  default: {
    writeFileSync: vi.fn(),
    readFileSync: vi.fn(),
    existsSync: vi.fn(() => true),
    mkdirSync: vi.fn(),
  },
  writeFileSync: vi.fn(),
  readFileSync: vi.fn(),
  existsSync: vi.fn(() => true),
  mkdirSync: vi.fn(),
}))

vi.mock('child_process', () => ({
  execSync: vi.fn((command: string) => {
    if (command.includes('branch --show-current')) {
      return 'feature/test-branch'
    }
    if (command.includes('status --porcelain')) {
      return ''
    }
    if (command.includes('diff --name-only')) {
      return 'src/test.ts\nsrc/another.ts'
    }
    if (command.includes('rev-parse --verify')) {
      return 'commit-hash'
    }
    if (command.includes('checkout')) {
      return ''
    }
    if (command.includes('merge')) {
      return ''
    }
    if (command.includes('git status')) {
      return 'On branch main'
    }
    return ''
  }),
}))

vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/')),
}))

// Importar después de los mocks
import runAgent from '../plan-merge'
import ConflictResolver from '../conflict-resolver'

describe('@merge-strategist Agent - Simple Tests', () => {
  const mockWriteFileSync = vi.mocked(fs.writeFileSync)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('runAgent', () => {
    it('should execute successfully with default parameters', async () => {
      // Arrange
      const mockDeps = {
        writeFileSync: vi.fn(),
        readFileSync: vi.fn(),
        existsSync: vi.fn(() => true),
        execSync: vi.fn((command: string) => {
          if (command.includes('branch --show-current')) {
            return 'feature/test-branch'
          }
          if (command.includes('status --porcelain')) {
            return ''
          }
          if (command.includes('diff --name-only')) {
            return 'src/test.ts\nsrc/another.ts'
          }
          if (command.includes('rev-parse --verify')) {
            return 'commit-hash'
          }
          if (command.includes('checkout')) {
            return ''
          }
          if (command.includes('merge')) {
            return ''
          }
          if (command.includes('git status')) {
            return 'On branch main'
          }
          return ''
        }),
      }

      // Act
      await runAgent(mockDeps)

      // Assert
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
      const callArgs = mockDeps.writeFileSync.mock.calls[0]
      expect(callArgs?.[0]).toContain('merge-strategist-report.json')
      
      const report = JSON.parse(callArgs?.[1] || '{}')
      expect(report.agentName).toBe('@merge-strategist')
      expect(report.status).toBe('ok')
      expect(report.actionsPerformed).toContain('🔍 Validating merge inputs...')
    })

    it('should handle errors gracefully', async () => {
      // Arrange
      const mockDeps = {
        writeFileSync: vi.fn(),
        readFileSync: vi.fn(),
        existsSync: vi.fn(() => true),
        execSync: vi.fn(() => {
          throw new Error('Git command failed')
        }),
      }

      // Act
      await runAgent(mockDeps)

      // Assert
      expect(mockDeps.writeFileSync).toHaveBeenCalled()
      const callArgs = mockDeps.writeFileSync.mock.calls[0]
      const report = JSON.parse(callArgs?.[1] || '{}')
      expect(report.status).toBe('fail')
      expect(report.errors.length).toBeGreaterThan(0)
    })
  })

  describe('ConflictResolver', () => {
    let resolver: ConflictResolver

    beforeEach(() => {
      resolver = new ConflictResolver()
    })

    it('should resolve conflicts with different strategies', async () => {
      // Arrange
      const conflicts = [
        {
          file: 'package.json',
          status: 'conflicted' as const,
          lines: [10, 15],
          severity: 'low' as const,
        },
        {
          file: 'src/app.ts',
          status: 'conflicted' as const,
          lines: [25, 30],
          severity: 'high' as const,
        },
      ]

      // Act
      const resolutions = await resolver.resolveConflicts(conflicts)

      // Assert
      expect(resolutions).toHaveLength(2)
      expect(resolutions[0]?.file).toBe('package.json')
      expect(resolutions[1]?.file).toBe('src/app.ts')
    })

    it('should calculate resolution statistics correctly', () => {
      // Arrange
      const resolutions = [
        {
          file: 'file1.json',
          resolution: 'auto' as const,
          confidence: 0.8,
          applied: true,
        },
        {
          file: 'file2.ts',
          resolution: 'manual' as const,
          confidence: 0,
          applied: false,
        },
        {
          file: 'file3.ts',
          resolution: 'auto' as const,
          confidence: 0.9,
          applied: true,
        },
      ]

      // Act
      const stats = resolver.getResolutionStats(resolutions)

      // Assert
      expect(stats.total).toBe(3)
      expect(stats.resolved).toBe(2)
      expect(stats.manual).toBe(1)
      expect(stats.failed).toBe(0)
      expect(stats.averageConfidence).toBeCloseTo(0.567, 2)
    })
  })
}) 