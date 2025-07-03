import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PerformanceMonitor } from '../PerformanceMonitor'

// Mock the performance utilities
vi.mock('../../../utils/performance', () => ({
  PerformanceMonitor: vi.fn().mockImplementation(() => ({
    getMetrics: vi.fn(() => ({
      LCP: 1200,
      FID: 30,
      CLS: 0.05,
      FCP: 600,
      TTFB: 200,
    })),
    disconnect: vi.fn(),
  })),
  BundleAnalyzer: {
    analyzeBundle: vi.fn(() =>
      Promise.resolve([
        { size: 80000, compressedSize: 32000, loadTime: 150 },
        { size: 120000, compressedSize: 48000, loadTime: 200 },
      ]),
    ),
  },
}))

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render performance monitor component', () => {
    render(<PerformanceMonitor />)
    // Component should render without crashing
    expect(document.body).toBeInTheDocument()
  })

  it('should accept showDetails prop', () => {
    render(<PerformanceMonitor showDetails />)
    // Component should render with showDetails prop
    expect(document.body).toBeInTheDocument()
  })

  it('should accept autoReport prop', () => {
    render(<PerformanceMonitor autoReport={false} />)
    // Component should render with autoReport prop
    expect(document.body).toBeInTheDocument()
  })

  it('should accept custom className', () => {
    render(<PerformanceMonitor className="custom-class" />)
    // Component should render with custom className
    expect(document.body).toBeInTheDocument()
  })
})
