import React, { useEffect, useState } from 'react'

import {
  BundleAnalyzer,
  BundleMetrics,
  PerformanceMetrics,
  PerformanceMonitor as PerfMonitor,
} from '../../utils/performance'

interface PerformanceMonitorProps {
  showDetails?: boolean
  autoReport?: boolean
  className?: string
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showDetails = false,
  autoReport = true,
  className = '',
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [bundleMetrics, setBundleMetrics] = useState<BundleMetrics[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Initialize performance monitoring
    const monitor = new PerfMonitor()

    // Get initial metrics after page load
    const timer = setTimeout(() => {
      const currentMetrics = monitor.getMetrics()
      setMetrics(currentMetrics)

      // Analyze bundle
      BundleAnalyzer.analyzeBundle().then(setBundleMetrics)

      // Auto-report if enabled
      if (autoReport) {
        // This would typically send to analytics service
        console.log('Performance metrics:', currentMetrics)
      }
    }, 2000) // Wait 2 seconds for metrics to stabilize

    return () => {
      clearTimeout(timer)
      monitor.disconnect()
    }
  }, [autoReport])

  const getPerformanceScore = (metrics: PerformanceMetrics): number => {
    let score = 100

    // LCP penalty
    if (metrics.LCP > 2500) score -= 20
    else if (metrics.LCP > 1500) score -= 10

    // FID penalty
    if (metrics.FID > 100) score -= 20
    else if (metrics.FID > 50) score -= 10

    // CLS penalty
    if (metrics.CLS > 0.1) score -= 20
    else if (metrics.CLS > 0.05) score -= 10

    return Math.max(0, score)
  }

  const getPerformanceColor = (score: number): string => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getMetricColor = (value: number, threshold: number): string => {
    if (value <= threshold) return 'text-green-600'
    if (value <= threshold * 1.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (!metrics) {
    return null
  }

  const score = getPerformanceScore(metrics)

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4 max-w-sm ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Performance Monitor
        </h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Overall Score
          </span>
          <span className={`text-lg font-bold ${getPerformanceColor(score)}`}>
            {score}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className={`h-2 rounded-full ${
              score >= 90
                ? 'bg-green-500'
                : score >= 70
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {isVisible && (
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">LCP</span>
            <span className={getMetricColor(metrics.LCP, 2500)}>
              {Math.round(metrics.LCP)}ms
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">FID</span>
            <span className={getMetricColor(metrics.FID, 100)}>
              {Math.round(metrics.FID)}ms
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">CLS</span>
            <span className={getMetricColor(metrics.CLS, 0.1)}>
              {metrics.CLS.toFixed(3)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">FCP</span>
            <span className={getMetricColor(metrics.FCP, 1800)}>
              {Math.round(metrics.FCP)}ms
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">TTFB</span>
            <span className={getMetricColor(metrics.TTFB, 600)}>
              {Math.round(metrics.TTFB)}ms
            </span>
          </div>

          {showDetails && bundleMetrics.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Bundle Sizes
              </h4>
              {bundleMetrics.map((bundle, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    Bundle {index + 1}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {Math.round(bundle.size / 1024)}KB
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PerformanceMonitor
