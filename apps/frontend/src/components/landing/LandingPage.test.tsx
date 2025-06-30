import React from "react"
import { render, screen } from '@testing-library/react'

import LandingPage from './LandingPage.js'

describe('LandingPage', () => {
  it('renderiza el título principal', () => {
    render(<LandingPage />)
    expect(screen.getByText(/Lanza tu SaaS en minutos/i)).toBeInTheDocument()
  })

  it('renderiza el botón de registro', () => {
    render(<LandingPage />)
    const link = screen.getByRole('link', { name: /Regístrate gratis/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/register')
  })

  it('renderiza la sección de beneficios', () => {
    render(<LandingPage />)
    expect(
      screen.getByText(/¿Por qué elegir nuestro SaaS/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/Automatización total/i)).toBeInTheDocument()
    expect(screen.getByText(/Multi-tenant real/i)).toBeInTheDocument()
    expect(screen.getByText(/Panel de control intuitivo/i)).toBeInTheDocument()
  })

  it('renderiza el contacto y FAQ', () => {
    render(<LandingPage />)
    expect(screen.getByText(/soporte@saas.com/i)).toBeInTheDocument()
    expect(screen.getByText(/preguntas frecuentes/i)).toBeInTheDocument()
  })

  it('renderiza el footer con el año actual', () => {
    render(<LandingPage />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })
})
