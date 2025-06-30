import React from "react"
import { render, screen } from '@testing-library/react'

import AnalyticsPanel from '../components/ui/AnalyticsPanel.js'

describe('AnalyticsPanel', () => {
  it('renderiza correctamente con métricas', () => {
    const metrics = [
      { label: 'Usuarios', value: 100 },
      { label: 'Ingresos', value: '$5000' },
    ]
    render(<AnalyticsPanel metrics={metrics} />)
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Usuarios')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('Ingresos')).toBeInTheDocument()
    expect(screen.getByText('$5000')).toBeInTheDocument()
  })
})
