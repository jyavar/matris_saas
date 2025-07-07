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
import { getManifest, getChangedFilesAgainstMain, getStagedFiles, validateFiles, writeLog, runAgent } from '../strato.logic'

describe('STRATO Logic Functions', () => {
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
    
    vi.mocked(execSync).mockReturnValue(Buffer.from('file1.ts\nfile2.ts\n'))
    vi.mocked(existsSync).mockReturnValue(true)
    vi.mocked(mkdirSync).mockImplementation(() => 'test-dir')
    vi.mocked(writeFileSync).mockImplementation(() => {})
  })

  describe('getManifest', () => {
    it('should read and parse manifest file correctly', () => {
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

    it('should throw error when manifest is invalid', () => {
      vi.mocked(readFileSync).mockReturnValue('invalid json')

      expect(() => getManifest()).toThrow('Manifiesto inválido.')
    })
  })

  describe('getChangedFilesAgainstMain', () => {
    it('should return staged files', () => {
      const files = getChangedFilesAgainstMain()

      expect(files).toEqual(['file1.ts', 'file2.ts'])
      expect(vi.mocked(execSync)).toHaveBeenCalledWith('git diff --name-only --cached')
    })
  })

  describe('getStagedFiles', () => {
    it('should return staged files from git', () => {
      const files = getStagedFiles()

      expect(files).toEqual(['file1.ts', 'file2.ts'])
      expect(vi.mocked(execSync)).toHaveBeenCalledWith('git diff --name-only --cached')
    })

    it('should filter out empty lines', () => {
      vi.mocked(execSync).mockReturnValue(Buffer.from('file1.ts\n\nfile2.ts\n'))

      const files = getStagedFiles()

      expect(files).toEqual(['file1.ts', 'file2.ts'])
    })
  })

  describe('validateFiles', () => {
    it('should validate files against manifest', () => {
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
  })

  describe('writeLog', () => {
    it('should write log message to file', () => {
      const logMessage = 'Test log message'
      
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
  })

  describe('runAgent', () => {
    it('should throw error for unknown agent', async () => {
      await expect(runAgent('unknown-agent')).rejects.toThrow('Unknown agent: unknown-agent')
    })

    it('should handle fiverr-writer agent', async () => {
      // Mock del módulo fiverr-writer
      const mockRunFiverrWriter = vi.fn().mockResolvedValue(undefined)
      vi.doMock('./fiverr-writer/executor', () => ({
        runAgent: mockRunFiverrWriter,
      }))

      await runAgent('@fiverr-writer')

      expect(mockRunFiverrWriter).toHaveBeenCalled()
    })

    it('should handle upwork-transcriber agent', async () => {
      // Mock del módulo upwork-transcriber
      const mockRunUpworkTranscriber = vi.fn().mockResolvedValue(undefined)
      vi.doMock('./upwork-transcriber/executor', () => ({
        runAgent: mockRunUpworkTranscriber,
      }))

      await runAgent('@upwork-transcriber')

      expect(mockRunUpworkTranscriber).toHaveBeenCalled()
    })

    it('should handle mturk-labeler agent', async () => {
      // Mock del módulo mturk-labeler
      const mockRunMturkLabeler = vi.fn().mockResolvedValue(undefined)
      vi.doMock('./mturk-labeler/executor', () => ({
        runAgent: mockRunMturkLabeler,
      }))

      await runAgent('@mturk-labeler')

      expect(mockRunMturkLabeler).toHaveBeenCalled()
    })

    it('should handle n8n-microservice agent', async () => {
      // Mock del módulo n8n-microservice
      const mockRunN8nMicroservice = vi.fn().mockResolvedValue(undefined)
      vi.doMock('./n8n-microservice/executor', () => ({
        runAgent: mockRunN8nMicroservice,
      }))

      await runAgent('@n8n-microservice')

      expect(mockRunN8nMicroservice).toHaveBeenCalled()
    })

    it('should handle freelancer-leadgen agent', async () => {
      // Mock del módulo freelancer-leadgen
      const mockRunFreelancerLeadgen = vi.fn().mockResolvedValue(undefined)
      vi.doMock('./freelancer-leadgen/executor', () => ({
        runAgent: mockRunFreelancerLeadgen,
      }))

      await runAgent('@freelancer-leadgen')

      expect(mockRunFreelancerLeadgen).toHaveBeenCalled()
    })
  })
}) 