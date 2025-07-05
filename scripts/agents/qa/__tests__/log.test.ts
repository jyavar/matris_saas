import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { QALogger, LogLevel, type LogConfig } from '../log'
import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// Mock fs module
vi.mock('fs', () => ({
  writeFileSync: vi.fn(),
  appendFileSync: vi.fn(),
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
}))

// Mock path module
vi.mock('path', () => ({
  join: vi.fn((...args: string[]) => args.join('/')),
}))

describe('QALogger', () => {
  let logger: QALogger
  const mockWriteFileSync = writeFileSync as vi.MockedFunction<typeof writeFileSync>
  const mockAppendFileSync = appendFileSync as vi.MockedFunction<typeof appendFileSync>
  const mockExistsSync = existsSync as vi.MockedFunction<typeof existsSync>
  const mockMkdirSync = mkdirSync as vi.MockedFunction<typeof mkdirSync>
  const mockJoin = join as vi.MockedFunction<typeof join>

  beforeEach(() => {
    vi.clearAllMocks()
    mockExistsSync.mockReturnValue(true)
    mockJoin.mockReturnValue('logs/qa-agent.log')
    
    logger = new QALogger({
      outputToConsole: true,
      outputToFile: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('constructor', () => {
    it('should initialize with default config when no config provided', () => {
      const defaultLogger = new QALogger()
      expect(defaultLogger).toBeDefined()
    })

    it('should merge custom config with defaults', () => {
      const customConfig: Partial<LogConfig> = {
        level: LogLevel.DEBUG,
        outputToConsole: false,
        outputToFile: false,
        logDir: 'custom-logs',
        logFileName: 'custom.log',
      }

      const customLogger = new QALogger(customConfig)
      expect(customLogger).toBeDefined()
    })

    it('should create log directory if it does not exist', () => {
      mockExistsSync.mockReturnValue(false)
      
      new QALogger()
      
      expect(mockMkdirSync).toHaveBeenCalledWith('logs', { recursive: true })
    })
  })

  describe('log levels', () => {
    it('should log debug messages when level is DEBUG', () => {
      const debugLogger = new QALogger({ level: LogLevel.DEBUG })
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      debugLogger.debug('Debug message')
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should not log debug messages when level is INFO', () => {
      const infoLogger = new QALogger({ level: LogLevel.INFO })
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      infoLogger.debug('Debug message')
      
      expect(consoleSpy).not.toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should log info messages', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      logger.info('Info message')
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should log warn messages', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      logger.warn('Warning message')
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should log error messages', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const error = new Error('Test error')
      
      logger.error('Error message', error)
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should log fatal messages', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const error = new Error('Fatal error')
      
      logger.fatal('Fatal message', error)
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('logCheck', () => {
    it('should log check with PASS status as INFO level', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      logger.logCheck('test-check', 'PASS', 'Test passed', 1000)
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should log check with WARNING status as WARN level', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      logger.logCheck('test-check', 'WARNING', 'Test warning', 1000)
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should log check with FAIL status as ERROR level', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      logger.logCheck('test-check', 'FAIL', 'Test failed', 1000)
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should include context in log entry', () => {
      const context = { userId: '123', action: 'test' }
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      logger.logCheck('test-check', 'PASS', 'Test passed', 1000, context)
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('logAuditStart', () => {
    it('should log audit start with timestamp', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      logger.logAuditStart()
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('logAuditComplete', () => {
    it('should log audit completion with status and duration', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      logger.logAuditComplete('PASS', 'All checks passed')
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('logCheckStart', () => {
    it('should log check start in debug mode', () => {
      const debugLogger = new QALogger({ level: LogLevel.DEBUG })
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      debugLogger.logCheckStart('test-check')
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('logCheckComplete', () => {
    it('should log check completion with all parameters', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      logger.logCheckComplete('test-check', 'PASS', 'Test completed', 1500)
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('file output', () => {
    it('should write to file when outputToFile is true', () => {
      logger.info('Test message')
      
      expect(mockAppendFileSync).toHaveBeenCalledWith(
        'logs/qa-agent.log',
        expect.any(String),
        'utf8'
      )
    })

    it('should not write to file when outputToFile is false', () => {
      const fileLogger = new QALogger({ outputToFile: false })
      
      fileLogger.info('Test message')
      
      expect(mockAppendFileSync).not.toHaveBeenCalled()
    })
  })

  describe('getLogBuffer', () => {
    it('should return a copy of the log buffer', () => {
      logger.info('Test message 1')
      logger.warn('Test message 2')
      
      const buffer = logger.getLogBuffer()
      
      expect(buffer).toHaveLength(2)
      expect(buffer[0].message).toBe('Test message 1')
      expect(buffer[1].message).toBe('Test message 2')
    })

    it('should return empty array when no logs', () => {
      const buffer = logger.getLogBuffer()
      expect(buffer).toHaveLength(0)
    })
  })

  describe('clearLogBuffer', () => {
    it('should clear the log buffer', () => {
      logger.info('Test message')
      expect(logger.getLogBuffer()).toHaveLength(1)
      
      logger.clearLogBuffer()
      expect(logger.getLogBuffer()).toHaveLength(0)
    })
  })

  describe('exportLogs', () => {
    it('should export logs in JSON format', () => {
      logger.info('Test message')
      
      const jsonExport = logger.exportLogs('json')
      const parsed = JSON.parse(jsonExport)
      
      expect(parsed).toHaveLength(1)
      expect(parsed[0].message).toBe('Test message')
      expect(parsed[0].level).toBe(LogLevel.INFO)
    })

    it('should export logs in text format', () => {
      logger.info('Test message')
      
      const textExport = logger.exportLogs('text')
      
      expect(textExport).toContain('Test message')
      expect(textExport).toContain('[INFO]')
    })
  })

  describe('saveLogsToFile', () => {
    it('should save logs to specified file in JSON format', () => {
      logger.info('Test message')
      
      logger.saveLogsToFile('test-logs.json', 'json')
      
      expect(mockWriteFileSync).toHaveBeenCalledWith(
        'test-logs.json',
        expect.any(String),
        'utf8'
      )
    })

    it('should save logs to specified file in text format', () => {
      logger.info('Test message')
      
      logger.saveLogsToFile('test-logs.txt', 'text')
      
      expect(mockWriteFileSync).toHaveBeenCalledWith(
        'test-logs.txt',
        expect.any(String),
        'utf8'
      )
    })
  })

  describe('LogLevel enum', () => {
    it('should have correct numeric values', () => {
      expect(LogLevel.DEBUG).toBe(0)
      expect(LogLevel.INFO).toBe(1)
      expect(LogLevel.WARN).toBe(2)
      expect(LogLevel.ERROR).toBe(3)
      expect(LogLevel.FATAL).toBe(4)
    })
  })
}) 