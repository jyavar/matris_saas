import { beforeEach, describe, expect, it, vi } from 'vitest'

import { DataLogger } from '../log'

describe('DataLogger', () => {
  let logger: DataLogger
  let consoleSpy: { log: ReturnType<typeof vi.spyOn> }

  beforeEach(() => {
    logger = new DataLogger()
    consoleSpy = {
      log: vi.spyOn(console, 'log').mockImplementation(() => {})
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('constructor', () => {
    it('should initialize with default options', () => {
      expect(logger).toBeDefined()
    })

    it('should accept verbose option', () => {
      const verboseLogger = new DataLogger({ verbose: true })
      expect(verboseLogger).toBeDefined()
    })
  })

  describe('info', () => {
    it('should log info messages', () => {
      const message = 'Test info message'
      logger.info(message)
      
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('ℹ️ [@data] INFO: Test info message')
      )
    })

    it('should log info messages with context', () => {
      const message = 'Test info with context'
      const context = { userId: 123, action: 'test' }
      
      logger.info(message, context)
      
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('ℹ️ [@data] INFO: Test info with context')
      )
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '   Context:',
        context
      )
    })
  })

  describe('warn', () => {
    it('should log warning messages', () => {
      const message = 'Test warning message'
      logger.warn(message)
      
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('⚠️ [@data] WARN: Test warning message')
      )
    })

    it('should log warning messages with context', () => {
      const message = 'Test warning with context'
      const context = { warningType: 'validation' }
      
      logger.warn(message, context)
      
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('⚠️ [@data] WARN: Test warning with context')
      )
    })
  })

  describe('error', () => {
    it('should log error messages', () => {
      const message = 'Test error message'
      logger.error(message)
      
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('❌ [@data] ERROR: Test error message')
      )
    })

    it('should log error messages with Error object', () => {
      const message = 'Test error with Error object'
      const error = new Error('Test error details')
      
      logger.error(message, error)
      
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('❌ [@data] ERROR: Test error with Error object')
      )
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('Test error details')
      )
    })

    it('should log error messages with context and Error object', () => {
      const message = 'Test error with context and Error'
      const error = new Error('Test error details')
      const context = { operation: 'migration' }
      
      logger.error(message, error, context)
      
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('❌ [@data] ERROR: Test error with context and Error')
      )
    })
  })

  describe('debug', () => {
    it('should not log debug messages by default', () => {
      const message = 'Test debug message'
      logger.debug(message)
      
      expect(consoleSpy.log).not.toHaveBeenCalledWith(
        expect.stringContaining('🔍 [@data] DEBUG: Test debug message')
      )
    })

    it('should log debug messages when verbose is enabled', () => {
      const verboseLogger = new DataLogger({ verbose: true })
      const message = 'Test debug message'
      
      verboseLogger.debug(message)
      
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('🔍 [@data] DEBUG: Test debug message')
      )
    })
  })

  describe('structured logging', () => {
    it('should output structured JSON logs', () => {
      const message = 'Test structured log'
      logger.info(message)
      
      // Should also output JSON format
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringMatching(/^\{"timestamp":".*","level":1,"message":"Test structured log","agentId":"@data"\}$/)
      )
    })

    it('should include context in structured logs', () => {
      const message = 'Test structured log with context'
      const context = { testKey: 'testValue' }
      
      logger.info(message, context)
      
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringMatching(/"context":\{"testKey":"testValue"\}/)
      )
    })
  })
}) 