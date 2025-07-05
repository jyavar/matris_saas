#!/usr/bin/env tsx

/**
 * @qa Agent - Logging System
 *
 * Structured logging for QA operations with different levels
 * and contextual information
 */

import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, unknown>
  error?: Error
  duration?: number
  checkName?: string
  agentId: string
}

export interface LogConfig {
  level: LogLevel
  outputToConsole: boolean
  outputToFile: boolean
  logDir: string
  logFileName: string
  maxFileSize: number
  maxFiles: number
  format: 'json' | 'text'
  includeTimestamp: boolean
  includeContext: boolean
}

export const DEFAULT_LOG_CONFIG: LogConfig = {
  level: LogLevel.INFO,
  outputToConsole: true,
  outputToFile: true,
  logDir: 'logs',
  logFileName: 'qa-agent.log',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  format: 'json',
  includeTimestamp: true,
  includeContext: true,
}

export class QALogger {
  private config: LogConfig
  private logBuffer: LogEntry[] = []
  private startTime: number = Date.now()
  
  constructor(config: Partial<LogConfig> = {}) {
    this.config = { ...DEFAULT_LOG_CONFIG, ...config }
    this.ensureLogDirectory()
  }
  
  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context)
  }
  
  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context)
  }
  
  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context)
  }
  
  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, context, error)
  }
  
  fatal(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log(LogLevel.FATAL, message, context, error)
  }
  
  logCheck(
    checkName: string,
    status: 'PASS' | 'FAIL' | 'WARNING',
    message: string,
    duration?: number,
    context?: Record<string, unknown>
  ): void {
    const level = status === 'PASS' ? LogLevel.INFO : 
                  status === 'WARNING' ? LogLevel.WARN : LogLevel.ERROR
    
    this.log(level, `[${checkName}] ${message}`, {
      ...context,
      checkName,
      status,
      duration,
    })
  }
  
  logAuditStart(): void {
    this.startTime = Date.now()
    this.info('🔍 QA Audit started', {
      agentId: '@qa',
      timestamp: new Date().toISOString(),
    })
  }
  
  logAuditComplete(status: 'PASS' | 'FAIL' | 'WARNING', summary: string): void {
    const duration = Date.now() - this.startTime
    const level = status === 'PASS' ? LogLevel.INFO : 
                  status === 'WARNING' ? LogLevel.WARN : LogLevel.ERROR
    
    this.log(level, `✅ QA Audit completed - ${summary}`, {
      agentId: '@qa',
      status,
      duration,
      summary,
    })
  }
  
  logCheckStart(checkName: string): void {
    this.debug(`Starting check: ${checkName}`, {
      agentId: '@qa',
      checkName,
    })
  }
  
  logCheckComplete(
    checkName: string,
    status: 'PASS' | 'FAIL' | 'WARNING',
    message: string,
    duration: number
  ): void {
    this.logCheck(checkName, status, message, duration)
  }
  
  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): void {
    if (level < this.config.level) {
      return
    }
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.config.includeContext ? context : undefined,
      error,
      agentId: '@qa',
    }
    
    this.logBuffer.push(entry)
    
    if (this.config.outputToConsole) {
      this.outputToConsole(entry)
    }
    
    if (this.config.outputToFile) {
      this.outputToFile(entry)
    }
  }
  
  private outputToConsole(entry: LogEntry): void {
    const levelEmoji = this.getLevelEmoji(entry.level)
    const levelName = LogLevel[entry.level]
    
    if (this.config.format === 'json') {
      console.log(JSON.stringify(entry))
    } else {
      const timestamp = this.config.includeTimestamp ? `[${entry.timestamp}]` : ''
      const contextStr = entry.context ? ` ${JSON.stringify(entry.context)}` : ''
      const errorStr = entry.error ? `\nError: ${entry.error.message}` : ''
      
      console.log(`${timestamp} ${levelEmoji} [${levelName}] ${entry.message}${contextStr}${errorStr}`)
    }
  }
  
  private outputToFile(entry: LogEntry): void {
    try {
      const logPath = join(this.config.logDir, this.config.logFileName)
      const logLine = this.config.format === 'json' 
        ? JSON.stringify(entry) + '\n'
        : this.formatTextLog(entry)
      
      appendFileSync(logPath, logLine, 'utf8')
    } catch (error) {
      console.error('Failed to write to log file:', error)
    }
  }
  
  private formatTextLog(entry: LogEntry): string {
    const timestamp = this.config.includeTimestamp ? `[${entry.timestamp}]` : ''
    const levelName = LogLevel[entry.level]
    const contextStr = entry.context && this.config.includeContext 
      ? ` ${JSON.stringify(entry.context)}` : ''
    const errorStr = entry.error ? `\nError: ${entry.error.message}` : ''
    
    return `${timestamp} [${levelName}] ${entry.message}${contextStr}${errorStr}\n`
  }
  
  private getLevelEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return '🔍'
      case LogLevel.INFO:
        return 'ℹ️'
      case LogLevel.WARN:
        return '⚠️'
      case LogLevel.ERROR:
        return '❌'
      case LogLevel.FATAL:
        return '💀'
      default:
        return '❓'
    }
  }
  
  private ensureLogDirectory(): void {
    if (!existsSync(this.config.logDir)) {
      mkdirSync(this.config.logDir, { recursive: true })
    }
  }
  
  getLogBuffer(): LogEntry[] {
    return [...this.logBuffer]
  }
  
  clearLogBuffer(): void {
    this.logBuffer = []
  }
  
  exportLogs(format: 'json' | 'text' = 'json'): string {
    if (format === 'json') {
      return JSON.stringify(this.logBuffer, null, 2)
    } else {
      return this.logBuffer
        .map(entry => this.formatTextLog(entry))
        .join('')
    }
  }
  
  saveLogsToFile(filePath: string, format: 'json' | 'text' = 'json'): void {
    const content = format === 'json' 
      ? JSON.stringify(this.logBuffer, null, 2)
      : this.exportLogs('text')
    
    writeFileSync(filePath, content, 'utf8')
  }
}

// Export default logger instance
export const qaLogger = new QALogger()

// Export for use in other modules
export default qaLogger 