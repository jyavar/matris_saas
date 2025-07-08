import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import React from 'react'

import ControlTowerPage from '../page'

describe('Control Tower page', () => {
  it('renders the loading message', () => {
    render(<ControlTowerPage />)
    expect(
      screen.getByText(/Cargando dashboard STRATO CONTROL TOWER™/i),
    ).toBeInTheDocument()
  })

  it('renders the control tower heading', () => {
    render(<ControlTowerPage />)
    expect(
      screen.getByText(/CONTROL TOWER/i),
    ).toBeInTheDocument()
  })
})