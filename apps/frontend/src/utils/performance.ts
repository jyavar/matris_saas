// Performance monitoring utilities
export interface PerformanceMetrics {
  LCP: number
  FID: number
  CLS: number
  FCP: number
  TTFB: number
}

export interface BundleMetrics {
  size: number
  compressedSize: number
  loadTime: number
}

// Performance observer for Core Web Vitals
export class PerformanceMonitor {
  private observers: PerformanceObserver[] = []

  constructor() {
    this.initObservers()
  }

  private initObservers() {
    // LCP Observer
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry
        console.log('LCP:', lastEntry.startTime)
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(lcpObserver)

      // FID Observer
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          console.log(
            'FID:',
            (entry as unknown as { processingStart: number; startTime: number })
              .processingStart - entry.startTime,
          )
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      this.observers.push(fidObserver)

      // CLS Observer
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (!(entry as { hadRecentInput?: boolean }).hadRecentInput) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            clsValue += (entry as unknown as { value: number }).value
          }
        }
        console.log('CLS:', clsValue)
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(clsObserver)
    }
  }

  public disconnect() {
    this.observers.forEach((observer) => observer.disconnect())
  }

  public getMetrics(): PerformanceMetrics {
    return {
      LCP: this.getLCP(),
      FID: this.getFID(),
      CLS: this.getCLS(),
      FCP: this.getFCP(),
      TTFB: this.getTTFB(),
    }
  }

  private getLCP(): number {
    const entries = performance.getEntriesByType('largest-contentful-paint')
    const lastEntry = entries[entries.length - 1] as PerformanceEntry
    return lastEntry ? lastEntry.startTime : 0
  }

  private getFID(): number {
    const entries = performance.getEntriesByType('first-input')
    const firstEntry = entries[0] as PerformanceEntry & {
      processingStart?: number
    }
    return firstEntry && typeof firstEntry.processingStart === 'number'
      ? firstEntry.processingStart - firstEntry.startTime
      : 0
  }

  private getCLS(): number {
    let clsValue = 0
    const entries = performance.getEntriesByType('layout-shift')
    for (const entry of entries) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(entry as { hadRecentInput?: boolean }).hadRecentInput) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        clsValue += (entry as unknown as { value: number }).value
      }
    }
    return clsValue
  }

  private getFCP(): number {
    const entries = performance.getEntriesByType('paint')
    const fcpEntry = entries.find(
      (entry) => entry.name === 'first-contentful-paint',
    )
    return fcpEntry ? fcpEntry.startTime : 0
  }

  private getTTFB(): number {
    const navigationEntry = performance.getEntriesByType(
      'navigation',
    )[0] as PerformanceNavigationTiming
    return navigationEntry
      ? navigationEntry.responseStart - navigationEntry.requestStart
      : 0
  }
}

// Bundle size analyzer
export class BundleAnalyzer {
  public static async analyzeBundle(): Promise<BundleMetrics[]> {
    const metrics: BundleMetrics[] = []

    // Get all script and CSS resources
    const resources = performance.getEntriesByType('resource')

    for (const resource of resources) {
      if (resource.name.includes('.js') || resource.name.includes('.css')) {
        const response = await fetch(resource.name, { method: 'HEAD' })
        const contentLength = response.headers.get('content-length')
        const contentEncoding = response.headers.get('content-encoding')

        metrics.push({
          size: contentLength ? parseInt(contentLength) : 0,
          compressedSize: contentEncoding
            ? contentLength
              ? parseInt(contentLength)
              : 0
            : contentLength
              ? parseInt(contentLength)
              : 0,
          loadTime: resource.duration,
        })
      }
    }

    return metrics
  }

  public static getBundleSizeThresholds() {
    return {
      critical: 100000, // 100KB
      warning: 200000, // 200KB
      error: 500000, // 500KB
    }
  }

  public static validateBundleSizes(metrics: BundleMetrics[]): boolean {
    const thresholds = this.getBundleSizeThresholds()

    return metrics.every((metric) => {
      const size = metric.compressedSize || metric.size
      return size < thresholds.error
    })
  }
}

// Image optimization utilities
export class ImageOptimizer {
  public static getOptimalFormat(): string {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return 'jpeg'

    // Test WebP support
    canvas.width = 1
    canvas.height = 1
    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, 1, 1)

    try {
      const webpDataURL = canvas.toDataURL('image/webp', 0.8)
      if (webpDataURL.startsWith('data:image/webp')) {
        return 'webp'
      }
    } catch {
      // WebP not supported
    }

    // Test AVIF support
    try {
      const avifDataURL = canvas.toDataURL('image/avif', 0.8)
      if (avifDataURL.startsWith('data:image/avif')) {
        return 'avif'
      }
    } catch {
      // AVIF not supported
    }

    return 'jpeg'
  }

  public static getOptimalImageSizes(): number[] {
    return [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  }

  public static shouldUseLazyLoading(): boolean {
    return 'IntersectionObserver' in window
  }
}

// Memory usage monitor
export class MemoryMonitor {
  public static getMemoryInfo(): unknown {
    if ('memory' in performance) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (performance as unknown as { memory: unknown }).memory
    }
    return null
  }

  public static isMemoryUsageHigh(): boolean {
    const memory = this.getMemoryInfo() as {
      usedJSHeapSize: number
      jsHeapSizeLimit: number
    } | null
    if (!memory) return false

    const usagePercentage = memory.usedJSHeapSize / memory.jsHeapSizeLimit
    return usagePercentage > 0.8 // 80% threshold
  }

  public static logMemoryUsage(): void {
    const memory = this.getMemoryInfo() as {
      usedJSHeapSize: number
      totalJSHeapSize: number
      jsHeapSizeLimit: number
    } | null
    if (memory) {
      console.log('Memory Usage:', {
        used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`,
      })
    }
  }
}

// Performance reporting
export class PerformanceReporter {
  public static async reportMetrics(
    metrics: PerformanceMetrics,
  ): Promise<void> {
    // Send metrics to analytics service
    try {
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metrics),
      })
    } catch (error) {
      console.error('Failed to report performance metrics:', error)
    }
  }

  public static logPerformanceWarning(
    metric: string,
    value: number,
    threshold: number,
  ): void {
    console.warn(
      `Performance warning: ${metric} (${value}ms) exceeds threshold (${threshold}ms)`,
    )
  }

  public static logPerformanceError(
    metric: string,
    value: number,
    threshold: number,
  ): void {
    console.error(
      `Performance error: ${metric} (${value}ms) exceeds threshold (${threshold}ms)`,
    )
  }
}

// Initialize performance monitoring
export const performanceMonitor = new PerformanceMonitor()

// Auto-cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    performanceMonitor.disconnect()
  })
}
