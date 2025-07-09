import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { beforeEach,describe, expect, it, vi } from 'vitest'

import AuditTable from './AuditTable'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('AuditTable', () => {
  const mockFeatures = [
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
    },
    {
      id: 'feature-3',
      feature: 'Test Feature 3',
      nombre: 'Característica de Prueba 3',
      estado_final: '✅',
      logica_verificada: true,
      fuente_verificacion: 'regex',
      con_test: true,
      con_coverage: false,
      verificado: true,
      coverage_pct: 75,
      detalle: 'Feature parcialmente verificada',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the search input', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/buscar feature/i)
      expect(searchInput).toBeInTheDocument()
    })
  })

  it('should render the pending filter checkbox', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox', { name: /solo pendientes/i })
      expect(checkbox).toBeInTheDocument()
    })
  })

  it('should render the total count', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText(/total: 3 \/ 3/i)).toBeInTheDocument()
    })
  })

  it('should render all features in the table', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Feature 1')).toBeInTheDocument()
      expect(screen.getByText('Test Feature 2')).toBeInTheDocument()
      expect(screen.getByText('Test Feature 3')).toBeInTheDocument()
    })
  })

  it('should render table headers', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('Feature')).toBeInTheDocument()
      expect(screen.getByText('Estado')).toBeInTheDocument()
      expect(screen.getByText('Score')).toBeInTheDocument()
      expect(screen.getByText('Fuente')).toBeInTheDocument()
      expect(screen.getByText('Detalle')).toBeInTheDocument()
    })
  })

  it('should filter features by search term', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Feature 1')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/buscar feature/i)
    await userEvent.type(searchInput, 'Feature 1')

    expect(screen.getByText('Test Feature 1')).toBeInTheDocument()
    expect(screen.queryByText('Test Feature 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Test Feature 3')).not.toBeInTheDocument()
  })

  it('should filter features by pending status', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Feature 1')).toBeInTheDocument()
      expect(screen.getByText('Test Feature 2')).toBeInTheDocument()
    })

    const checkbox = screen.getByRole('checkbox', { name: /solo pendientes/i })
    await userEvent.click(checkbox)

    expect(screen.queryByText('Test Feature 1')).not.toBeInTheDocument()
    expect(screen.getByText('Test Feature 2')).toBeInTheDocument()
    expect(screen.queryByText('Test Feature 3')).not.toBeInTheDocument()
  })

  it('should display correct scores for features', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('4/4')).toBeInTheDocument() // Feature 1: all true
      expect(screen.getByText('0/4')).toBeInTheDocument() // Feature 2: all false
      expect(screen.getByText('3/4')).toBeInTheDocument() // Feature 3: 3 true, 1 false
    })
  })

  it('should display correct source labels', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('Hint')).toBeInTheDocument()
      expect(screen.getByText('Override')).toBeInTheDocument()
      expect(screen.getByText('Heurística')).toBeInTheDocument()
    })
  })

  it('should display feature details', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('Feature completamente verificada')).toBeInTheDocument()
      expect(screen.getByText('Feature pendiente de verificación')).toBeInTheDocument()
      expect(screen.getByText('Feature parcialmente verificada')).toBeInTheDocument()
    })
  })

  it('should render empty state when no features match filter', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Feature 1')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/buscar feature/i)
    await userEvent.type(searchInput, 'NonExistentFeature')

    expect(screen.getByText('No hay features para mostrar.')).toBeInTheDocument()
  })

  it('should handle empty features array', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('No hay features para mostrar.')).toBeInTheDocument()
      expect(screen.getByText(/total: 0 \/ 0/i)).toBeInTheDocument()
    })
  })

  it('should handle fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('No hay features para mostrar.')).toBeInTheDocument()
    })
  })

  it('should render table with proper styling', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      const tableContainer = screen.getByText('Feature').closest('div')
      expect(tableContainer).toHaveClass('w-full p-4 bg-white dark:bg-zinc-900 rounded-xl shadow overflow-x-auto')
    })
  })

  it('should render table headers with proper styling', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      const headerRow = screen.getByText('Feature').closest('tr')
      expect(headerRow).toHaveClass('bg-zinc-100 dark:bg-zinc-800')
    })
  })

  it('should render feature rows with proper styling based on status', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      const successRow = screen.getByText('Test Feature 1').closest('tr')
      const errorRow = screen.getByText('Test Feature 2').closest('tr')
      
      expect(successRow).toHaveClass('bg-green-50 dark:bg-green-900/20')
      expect(errorRow).toHaveClass('bg-red-50 dark:bg-red-900/10')
    })
  })

  it('should render status indicators with proper styling', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      const successIndicators = screen.getAllByText('✅')
      const errorIndicator = screen.getByText('❌')
      
      expect(successIndicators[0]).toHaveClass('bg-green-500 text-white')
      expect(errorIndicator).toHaveClass('bg-red-400 text-white')
    })
  })

  it('should handle search with case insensitive matching', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Feature 1')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/buscar feature/i)
    await userEvent.type(searchInput, 'test feature 1')

    expect(screen.getByText('Test Feature 1')).toBeInTheDocument()
    expect(screen.queryByText('Test Feature 2')).not.toBeInTheDocument()
  })

  it('should handle search with partial matching', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFeatures,
    })

    render(<AuditTable />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Feature 1')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/buscar feature/i)
    await userEvent.type(searchInput, 'Feature')

    expect(screen.getByText('Test Feature 1')).toBeInTheDocument()
    expect(screen.getByText('Test Feature 2')).toBeInTheDocument()
    expect(screen.getByText('Test Feature 3')).toBeInTheDocument()
  })
}) 