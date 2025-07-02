import { logAction } from './logger.service.js'

interface PerformanceMetrics {
  memory: {
    rss: number
    heapUsed: number
    heapTotal: number
    external: number
  }
  cpu: {
    user: number
    system: number
  }
  uptime: number
  activeConnections: number
  requestCount: number
  errorCount: number
  averageResponseTime: number
}

interface CacheStats {
  hits: number
  misses: number
  keys: number
  ksize: number
  vsize: number
}

class PerformanceService {
  private startTime: number
  private requestCount: number
  private errorCount: number
  private responseTimes: number[]
  private activeConnections: number
  private lastCpuUsage: NodeJS.CpuUsage

  constructor() {
    this.startTime = Date.now()
    this.requestCount = 0
    this.errorCount = 0
    this.responseTimes = []
    this.activeConnections = 0
    this.lastCpuUsage = process.cpuUsage()
  }

  /**
   * Record a new request
   */
  recordRequest(responseTime: number): void {
    this.requestCount++
    this.responseTimes.push(responseTime)
    
    // Keep only last 1000 response times for average calculation
    if (this.responseTimes.length > 1000) {
      this.responseTimes.shift()
    }
  }

  /**
   * Record an error
   */
  recordError(): void {
    this.errorCount++
  }

  /**
   * Update active connections count
   */
  updateActiveConnections(count: number): void {
    this.activeConnections = count
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    const memUsage = process.memoryUsage()
    const cpuUsage = process.cpuUsage(this.lastCpuUsage)
    this.lastCpuUsage = process.cpuUsage()

    const averageResponseTime = this.responseTimes.length > 0
      ? this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length
      : 0

    return {
      memory: {
        rss: Math.round(memUsage.rss / 1024 / 1024),
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
        external: Math.round(memUsage.external / 1024 / 1024),
      },
      cpu: {
        user: Math.round(cpuUsage.user / 1000),
        system: Math.round(cpuUsage.system / 1000),
      },
      uptime: process.uptime(),
      activeConnections: this.activeConnections,
      requestCount: this.requestCount,
      errorCount: this.errorCount,
      averageResponseTime: Math.round(averageResponseTime),
    }
  }

  /**
   * Check if performance is within acceptable limits
   */
  checkPerformanceHealth(): {
    healthy: boolean
    warnings: string[]
    critical: string[]
  } {
    const metrics = this.getMetrics()
    const warnings: string[] = []
    const critical: string[] = []

    // Memory checks
    if (metrics.memory.heapUsed > 512) {
      warnings.push(`High memory usage: ${metrics.memory.heapUsed}MB`)
    }
    if (metrics.memory.heapUsed > 1024) {
      critical.push(`Critical memory usage: ${metrics.memory.heapUsed}MB`)
    }

    // Response time checks
    if (metrics.averageResponseTime > 1000) {
      warnings.push(`Slow average response time: ${metrics.averageResponseTime}ms`)
    }
    if (metrics.averageResponseTime > 5000) {
      critical.push(`Critical response time: ${metrics.averageResponseTime}ms`)
    }

    // Error rate checks
    const errorRate = this.requestCount > 0 ? (this.errorCount / this.requestCount) * 100 : 0
    if (errorRate > 5) {
      warnings.push(`High error rate: ${errorRate.toFixed(2)}%`)
    }
    if (errorRate > 10) {
      critical.push(`Critical error rate: ${errorRate.toFixed(2)}%`)
    }

    // Uptime checks
    if (metrics.uptime < 300) { // Less than 5 minutes
      warnings.push('Recent restart detected')
    }

    const healthy = critical.length === 0

    // Log performance issues
    if (warnings.length > 0 || critical.length > 0) {
      logAction('performance_warning', 'system', {
        warnings,
        critical,
        metrics,
      })
    }

    return { healthy, warnings, critical }
  }

  /**
   * Get performance summary for monitoring
   */
  getSummary(): {
    status: 'healthy' | 'warning' | 'critical'
    metrics: PerformanceMetrics
    health: ReturnType<typeof this.checkPerformanceHealth>
  } {
    const metrics = this.getMetrics()
    const health = this.checkPerformanceHealth()

    let status: 'healthy' | 'warning' | 'critical' = 'healthy'
    if (health.critical.length > 0) {
      status = 'critical'
    } else if (health.warnings.length > 0) {
      status = 'warning'
    }

    return { status, metrics, health }
  }

  /**
   * Reset performance counters
   */
  reset(): void {
    this.requestCount = 0
    this.errorCount = 0
    this.responseTimes = []
    this.activeConnections = 0
    this.lastCpuUsage = process.cpuUsage()
  }
}

export const performanceService = new PerformanceService() 