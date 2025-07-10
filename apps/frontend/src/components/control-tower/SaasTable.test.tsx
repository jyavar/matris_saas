import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

import SaasTable from './SaasTable'

const mockSaasData = [
  {
    id: '1',
    name: 'Test SaaS 1',
    status: 'active' as const,
    version: '1.0.0',
    lastDeployment: new Date('2023-10-15T10:30:00Z'),
    metrics: {
      users: 1000,
      revenue: 5000,
      uptime: 99.9,
      requests: 100000,
      errors: 5
    },
    url: 'https://test1.com',
    description: 'Test SaaS 1 description'
  },
  {
    id: '2',
    name: 'Test SaaS 2',
    status: 'maintenance' as const,
    version: '2.1.0',
    lastDeployment: new Date('2023-10-14T15:20:00Z'),
    metrics: {
      users: 500,
      revenue: 2500,
      uptime: 95.5,
      requests: 50000,
      errors: 10
    },
    url: 'https://test2.com',
    description: 'Test SaaS 2 description'
  }
]

describe('SaasTable Component', () => {
  it('should render table with correct title', () => {
    render(<SaasTable data={mockSaasData} />)
    
    expect(screen.getByText('SaaS Activos')).toBeInTheDocument()
    expect(screen.getByText('2 aplicaciones desplegadas')).toBeInTheDocument()
  })

  it('should render empty state when no data provided', () => {
    render(<SaasTable data={[]} />)
    
    expect(screen.getByText('No hay SaaS desplegados')).toBeInTheDocument()
    expect(screen.getByText('Comienza creando tu primera aplicación SaaS')).toBeInTheDocument()
    expect(screen.getByText('📦')).toBeInTheDocument()
  })

  it('should render default empty state when no props provided', () => {
    render(<SaasTable />)
    
    expect(screen.getByText('No hay SaaS desplegados')).toBeInTheDocument()
    expect(screen.getByText('0 aplicaciones desplegadas')).toBeInTheDocument()
  })

  it('should display SaaS information correctly', () => {
    render(<SaasTable data={mockSaasData} />)
    
    expect(screen.getByText('Test SaaS 1')).toBeInTheDocument()
    expect(screen.getByText('Test SaaS 1 description')).toBeInTheDocument()
    expect(screen.getByText('v1.0.0')).toBeInTheDocument()
    expect(screen.getByText('Test SaaS 2')).toBeInTheDocument()
    expect(screen.getByText('Test SaaS 2 description')).toBeInTheDocument()
    expect(screen.getByText('v2.1.0')).toBeInTheDocument()
  })

  it('should display metrics correctly', () => {
    render(<SaasTable data={mockSaasData} />)
    
    expect(screen.getByText('1.0K')).toBeInTheDocument() // users
    expect(screen.getByText('5000 €')).toBeInTheDocument() // revenue
    expect(screen.getByText('99.9%')).toBeInTheDocument() // uptime
    expect(screen.getByText('100.0K')).toBeInTheDocument() // requests
  })

  it('should show refresh button when onRefresh is provided', () => {
    const handleRefresh = vi.fn()
    render(<SaasTable data={mockSaasData} onRefresh={handleRefresh} />)
    
    expect(screen.getByText('Actualizar')).toBeInTheDocument()
  })

  it('should call onRefresh when refresh button is clicked', async () => {
    const handleRefresh = vi.fn()
    render(<SaasTable data={mockSaasData} onRefresh={handleRefresh} />)
    
    const refreshButton = screen.getByText('Actualizar')
    await userEvent.click(refreshButton)
    
    expect(handleRefresh).toHaveBeenCalledTimes(1)
  })

  it('should show action buttons when handlers are provided', () => {
    const handleView = vi.fn()
    const handleManage = vi.fn()
    render(<SaasTable data={mockSaasData} onView={handleView} onManage={handleManage} />)
    
    expect(screen.getAllByText('Ver')).toHaveLength(2)
    expect(screen.getAllByText('Gestionar')).toHaveLength(2)
  })

  it('should call onView when view button is clicked', async () => {
    const handleView = vi.fn()
    render(<SaasTable data={mockSaasData} onView={handleView} />)
    
    const viewButton = screen.getAllByText('Ver')[0]
    await userEvent.click(viewButton)
    
    expect(handleView).toHaveBeenCalledWith('1')
  })

  it('should call onManage when manage button is clicked', async () => {
    const handleManage = vi.fn()
    render(<SaasTable data={mockSaasData} onManage={handleManage} />)
    
    const manageButton = screen.getAllByText('Gestionar')[0]
    await userEvent.click(manageButton)
    
    expect(handleManage).toHaveBeenCalledWith('1')
  })

  it('should apply custom className', () => {
    const { container } = render(<SaasTable className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('should render with correct status styles', () => {
    render(<SaasTable data={mockSaasData} />)
    
    const activeStatus = screen.getByText('active')
    const maintenanceStatus = screen.getByText('maintenance')
    
    expect(activeStatus).toHaveClass('text-green-600')
    expect(maintenanceStatus).toHaveClass('text-yellow-600')
  })

  it('should handle sorting by name', async () => {
    render(<SaasTable data={mockSaasData} />)
    
    const nameHeader = screen.getByText('Nombre')
    await userEvent.click(nameHeader)
    
    // Check that sorting arrow appears (initially desc because of default sort)
    expect(screen.getByText('↓')).toBeInTheDocument()
  })

  it('should handle sorting by status', async () => {
    render(<SaasTable data={mockSaasData} />)
    
    const statusHeader = screen.getByText('Estado')
    await userEvent.click(statusHeader)
    
    // Check that sorting arrow appears
    expect(screen.getByText('↑')).toBeInTheDocument()
  })

  it('should handle sorting by last deployment', async () => {
    render(<SaasTable data={mockSaasData} />)
    
    const deploymentHeader = screen.getByText('Último Deploy')
    await userEvent.click(deploymentHeader)
    
    // Check that sorting arrow appears
    expect(screen.getByText('↑')).toBeInTheDocument()
  })

  it('should toggle sort direction when clicking same column twice', async () => {
    render(<SaasTable data={mockSaasData} />)
    
    const nameHeader = screen.getByText('Nombre')
    await userEvent.click(nameHeader)
    
    expect(screen.getByText('↓')).toBeInTheDocument()
    
    await userEvent.click(nameHeader)
    
    expect(screen.getByText('↑')).toBeInTheDocument()
  })

  it('should format large numbers correctly', () => {
    const largeSaasData = [{
      ...mockSaasData[0],
      metrics: {
        ...mockSaasData[0].metrics,
        users: 1500000,
        requests: 2500000
      }
    }]
    
    render(<SaasTable data={largeSaasData} />)
    
    expect(screen.getByText('1.5M')).toBeInTheDocument()
    expect(screen.getByText('2.5M')).toBeInTheDocument()
  })

  it('should render avatar with first letter of SaaS name', () => {
    render(<SaasTable data={mockSaasData} />)
    
    const avatars = screen.getAllByText('T') // First letter of "Test SaaS"
    expect(avatars).toHaveLength(2)
  })
})