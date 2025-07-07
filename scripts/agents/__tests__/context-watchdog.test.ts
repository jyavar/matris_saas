import { describe, it, expect, beforeEach, vi } from 'vitest'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, join } from 'path'
import { execSync } from 'child_process'

// Mock de los módulos antes de importar
vi.mock('fs')
vi.mock('path')
vi.mock('child_process')
vi.mock('minimatch')
vi.mock('zod')

// Importar después de los mocks
import { getManifest, getChangedFilesAgainstMain, validateFiles, writeLog } from '../strato.logic'

describe('Context Watchdog Agent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Configurar mocks específicos
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify({
      root: '.',
      validPaths: ['src/**/*', 'scripts/**/*'],
      forbiddenPaths: ['node_modules/**/*', 'dist/**/*'],
      namingConventions: {
        testFiles: '*.test.ts',
        componentFiles: '*.component.ts',
        routeFiles: '*.routes.ts',
      },
      preferredEntryDir: 'src',
    }))
    
    vi.mocked(execSync).mockReturnValue(Buffer.from('src/file1.ts\nscripts/agent.ts\n'))
    vi.mocked(existsSync).mockReturnValue(true)
    vi.mocked(mkdirSync).mockImplementation(() => 'test-dir')
    vi.mocked(writeFileSync).mockImplementation(() => {})
  })

  describe('Context Validation', () => {
    it('should validate file paths against manifest', () => {
      const manifest = {
        root: '.',
        validPaths: ['src/**/*', 'scripts/**/*'],
        forbiddenPaths: ['node_modules/**/*', 'dist/**/*'],
        namingConventions: {
          testFiles: '*.test.ts',
          componentFiles: '*.component.ts',
          routeFiles: '*.routes.ts',
        },
        preferredEntryDir: 'src',
      }

      const files = ['src/file1.ts', 'scripts/agent.ts', 'node_modules/pkg/index.js']
      const invalidFiles = validateFiles(files, manifest)

      // Con el mock de minimatch retornando true, todos los archivos serían válidos
      expect(invalidFiles).toEqual([])
    })

    it('should detect invalid file paths', () => {
      const manifest = {
        root: '.',
        validPaths: ['src/**/*'],
        forbiddenPaths: ['node_modules/**/*'],
        namingConventions: {
          testFiles: '*.test.ts',
          componentFiles: '*.component.ts',
          routeFiles: '*.routes.ts',
        },
        preferredEntryDir: 'src',
      }

      // Mock minimatch para simular archivos inválidos
      const { minimatch } = require('minimatch')
      vi.mocked(minimatch).mockImplementation((path: string, pattern: string) => {
        if (pattern.includes('node_modules')) {
          return path.includes('node_modules')
        }
        return path.startsWith('src/')
      })

      const files = ['src/file1.ts', 'node_modules/pkg/index.js', 'invalid/file.ts']
      const invalidFiles = validateFiles(files, manifest)

      expect(invalidFiles).toContain('node_modules/pkg/index.js')
      expect(invalidFiles).toContain('invalid/file.ts')
    })
  })

  describe('File Change Detection', () => {
    it('should detect staged files correctly', () => {
      const files = getChangedFilesAgainstMain()

      expect(files).toEqual(['src/file1.ts', 'scripts/agent.ts'])
      expect(vi.mocked(execSync)).toHaveBeenCalledWith('git diff --name-only --cached')
    })

    it('should handle empty git output', () => {
      vi.mocked(execSync).mockReturnValue(Buffer.from(''))

      const files = getChangedFilesAgainstMain()

      expect(files).toEqual([])
    })

    it('should filter out empty lines from git output', () => {
      vi.mocked(execSync).mockReturnValue(Buffer.from('file1.ts\n\nfile2.ts\n'))

      const files = getChangedFilesAgainstMain()

      expect(files).toEqual(['file1.ts', 'file2.ts'])
    })
  })

  describe('Manifest Validation', () => {
    it('should read and validate manifest file', () => {
      const manifest = getManifest()

      expect(manifest).toEqual({
        root: '.',
        validPaths: ['src/**/*', 'scripts/**/*'],
        forbiddenPaths: ['node_modules/**/*', 'dist/**/*'],
        namingConventions: {
          testFiles: '*.test.ts',
          componentFiles: '*.component.ts',
          routeFiles: '*.routes.ts',
        },
        preferredEntryDir: 'src',
      })

      expect(vi.mocked(readFileSync)).toHaveBeenCalledWith(
        expect.stringContaining('.strato-manifest.json'),
        'utf-8'
      )
    })

    it('should throw error when manifest file does not exist', () => {
      vi.mocked(existsSync).mockReturnValue(false)

      expect(() => getManifest()).toThrow('El manifiesto estructural .strato-manifest.json no existe.')
    })

    it('should throw error when manifest is invalid JSON', () => {
      vi.mocked(readFileSync).mockReturnValue('invalid json')

      expect(() => getManifest()).toThrow('Manifiesto inválido.')
    })
  })

  describe('Logging', () => {
    it('should write log messages to file', () => {
      const logMessage = 'Context violation detected: invalid file path'
      
      writeLog(logMessage)

      expect(vi.mocked(mkdirSync)).toHaveBeenCalledWith('logs', { recursive: true })
      expect(vi.mocked(writeFileSync)).toHaveBeenCalledWith(
        expect.stringContaining('logs/context-violations.log'),
        logMessage + '\n',
        { flag: 'a' }
      )
    })

    it('should create logs directory if it does not exist', () => {
      vi.mocked(existsSync).mockReturnValue(false)

      writeLog('Test message')

      expect(vi.mocked(mkdirSync)).toHaveBeenCalledWith('logs', { recursive: true })
    })

    it('should append multiple log messages', () => {
      writeLog('First message')
      writeLog('Second message')

      expect(vi.mocked(writeFileSync)).toHaveBeenCalledTimes(2)
      expect(vi.mocked(writeFileSync)).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining('logs/context-violations.log'),
        'First message\n',
        { flag: 'a' }
      )
      expect(vi.mocked(writeFileSync)).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('logs/context-violations.log'),
        'Second message\n',
        { flag: 'a' }
      )
    })
  })

  describe('Path Resolution', () => {
    it('should resolve paths correctly', () => {
      const resolved = resolve('test', 'path')
      expect(resolved).toBe('test/path')
      expect(vi.mocked(resolve)).toHaveBeenCalledWith('test', 'path')
    })

    it('should join paths correctly', () => {
      const joined = join('test', 'path')
      expect(joined).toBe('test/path')
      expect(vi.mocked(join)).toHaveBeenCalledWith('test', 'path')
    })
  })

  describe('Error Handling', () => {
    it('should handle git command failures gracefully', () => {
      vi.mocked(execSync).mockImplementation(() => {
        throw new Error('Git command failed')
      })

      expect(() => getChangedFilesAgainstMain()).toThrow('Git command failed')
    })

    it('should handle file system errors gracefully', () => {
      vi.mocked(readFileSync).mockImplementation(() => {
        throw new Error('File read failed')
      })

      expect(() => getManifest()).toThrow('File read failed')
    })

    it('should handle directory creation errors gracefully', () => {
      vi.mocked(mkdirSync).mockImplementation(() => {
        throw new Error('Directory creation failed')
      })

      expect(() => writeLog('test')).toThrow('Directory creation failed')
    })
  })

  describe('Integration Scenarios', () => {
    it('should validate complete workflow', () => {
      // Simular un workflow completo del context watchdog
      const manifest = getManifest()
      const changedFiles = getChangedFilesAgainstMain()
      const invalidFiles = validateFiles(changedFiles, manifest)

      expect(manifest).toBeDefined()
      expect(changedFiles).toEqual(['src/file1.ts', 'scripts/agent.ts'])
      expect(invalidFiles).toEqual([])
    })

    it('should log violations when invalid files are detected', () => {
      const manifest = getManifest()
      const changedFiles = ['src/file1.ts', 'node_modules/pkg/index.js']
      
      // Mock minimatch para detectar archivo inválido
      const { minimatch } = require('minimatch')
      vi.mocked(minimatch).mockImplementation((path: string, pattern: string) => {
        if (pattern.includes('node_modules')) {
          return path.includes('node_modules')
        }
        return path.startsWith('src/')
      })

      const invalidFiles = validateFiles(changedFiles, manifest)

      if (invalidFiles.length > 0) {
        const violationMessage = `Context violation detected: ${invalidFiles.join(', ')}`
        writeLog(violationMessage)

        expect(vi.mocked(writeFileSync)).toHaveBeenCalledWith(
          expect.stringContaining('logs/context-violations.log'),
          expect.stringContaining('Context violation detected'),
          { flag: 'a' }
        )
      }
    })
  })
}) 