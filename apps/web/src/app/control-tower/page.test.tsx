import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { beforeEach,describe, expect, it, vi } from 'vitest'

import ControlTowerPage, { type Feature } from './page'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock AuditTable component
vi.mock('./AuditTable', () => ({
  default: () => <div data-testid="audit-table">Audit Table Component</div>,
}))

describe('ControlTowerPage', () => {
  const mockFeatures: Feature[] = [
    {
      id: 'feature-1',
      feature: 'Test Feature 1',
      nombre: 'Característica de Prueba 1',
      estado_final: '✅',
      logica_verificada: true,
      fuente_verificacion: 'hint',
      con_test: true,
      con_coverage: true,
      verificado: true,
      coverage_pct: 95,
      detalle: 'Feature completamente verificada',
      score: 4,
      max_score: 4,
      section: 'backend',
    },
    {
      id: 'feature-2',
      feature: 'Test Feature 2',
      nombre: 'Característica de Prueba 2',
      estado_final: '❌',
      logica_verificada: false,
      fuente_verificacion: 'override',
      con_test: false,
      con_coverage: false,
      verificado: false,
      coverage_pct: 0,
      detalle: 'Feature pendiente de verificación',
      score: 0,
      max_score: 4,
      section: 'frontend',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the main heading', async () => {
    // Mock all 5 fetch calls
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockFeatures })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      const heading = screen.getByText(/strato control tower/i)
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('STRATO CONTROL TOWER™ – Auditoría Técnica')
    })
  })

  it('should render loading state initially', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<ControlTowerPage />)
    
    expect(screen.getByText(/cargando dashboard strato control tower/i)).toBeInTheDocument()
  })

  it('should render error state when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      expect(screen.getByText(/error: network error/i)).toBeInTheDocument()
    })
  })

  it('should render error state with unknown error', async () => {
    mockFetch.mockRejectedValueOnce('Unknown error')

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      expect(screen.getByText(/error: error desconocido/i)).toBeInTheDocument()
    })
  })

  it('should render AuditTable component when data is loaded', async () => {
    // Mock all 5 fetch calls
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockFeatures })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('audit-table')).toBeInTheDocument()
    })
  })

  it('should handle multiple fetch calls for different files', async () => {
    const mockData = {
      'matrix.report.json': mockFeatures,
      'matrix.audit.json': [],
      'matrix.verified.json': [],
      'matrix.coverage.json': [],
      'matrix.logic.json': [],
    }

    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockData['matrix.report.json'] })
      .mockResolvedValueOnce({ ok: true, json: async () => mockData['matrix.audit.json'] })
      .mockResolvedValueOnce({ ok: true, json: async () => mockData['matrix.verified.json'] })
      .mockResolvedValueOnce({ ok: true, json: async () => mockData['matrix.coverage.json'] })
      .mockResolvedValueOnce({ ok: true, json: async () => mockData['matrix.logic.json'] })

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('audit-table')).toBeInTheDocument()
    })

    expect(mockFetch).toHaveBeenCalledTimes(5)
    expect(mockFetch).toHaveBeenCalledWith('/matrix.report.json')
    expect(mockFetch).toHaveBeenCalledWith('/matrix.audit.json')
    expect(mockFetch).toHaveBeenCalledWith('/matrix.verified.json')
    expect(mockFetch).toHaveBeenCalledWith('/matrix.coverage.json')
    expect(mockFetch).toHaveBeenCalledWith('/matrix.logic.json')
  })

  it('should handle fetch error for specific file', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockFeatures })
      .mockRejectedValueOnce(new Error('Failed to load matrix.audit.json'))

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      expect(screen.getByText(/error: failed to load matrix\.audit\.json/i)).toBeInTheDocument()
    })
  })

  it('should render main container with proper styling', async () => {
    // Mock all 5 fetch calls
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockFeatures })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      const mainContainer = screen.getByText(/strato control tower/i).closest('main')
      expect(mainContainer).toHaveClass('min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 p-4')
    })
  })

  it('should render content container with proper styling', async () => {
    // Mock all 5 fetch calls
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockFeatures })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      const contentContainer = screen.getByText(/strato control tower/i).parentElement
      expect(contentContainer).toHaveClass('max-w-6xl mx-auto')
    })
  })

  it('should render heading with proper styling', async () => {
    // Mock all 5 fetch calls
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockFeatures })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      const heading = screen.getByText(/strato control tower/i)
      expect(heading).toHaveClass('text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-100')
    })
  })

  it('should handle empty features array', async () => {
    // Mock all 5 fetch calls
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('audit-table')).toBeInTheDocument()
    })
  })

  it('should handle features with missing optional properties', async () => {
    const minimalFeatures: Feature[] = [
      {
        id: 'minimal-feature',
        feature: 'Minimal Feature',
        estado_final: '✅',
      },
    ]

    // Mock all 5 fetch calls
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => minimalFeatures })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('audit-table')).toBeInTheDocument()
    })
  })

  it('should handle network timeout', async () => {
    mockFetch.mockImplementation(() => 
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 100)
      )
    )

    render(<ControlTowerPage />)
    
    await waitFor(() => {
      expect(screen.getByText(/error: request timeout/i)).toBeInTheDocument()
    }, { timeout: 200 })
  })
}) 