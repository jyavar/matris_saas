#!/usr/bin/env tsx

/**
 * @data Agent - Logging System
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, unknown>
  agentId: string
}

export class DataLogger {
  private agentId = '@data'
  private verbose = false

  constructor(options: { verbose?: boolean } = {}) {
    this.verbose = options.verbose || false
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (this.verbose) {
      this.log(LogLevel.DEBUG, message, context)
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context)
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context)
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, { 
      ...context, 
      error: error?.message,
      stack: error?.stack 
    })
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      agentId: this.agentId
    }

    // Console output for immediate feedback
    const levelEmoji = this.getLevelEmoji(level)
    const levelName = LogLevel[level]
    
    console.log(`${levelEmoji} [@data] ${levelName}: ${message}`)
    
    if (context && Object.keys(context).length > 0) {
      console.log(`   Context:`, context)
    }

    // Also log to structured format for file logging
    console.log(JSON.stringify(entry))
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
      default:
        return '❓'
    }
  }
} 