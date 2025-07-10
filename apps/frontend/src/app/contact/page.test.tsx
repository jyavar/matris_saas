import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import React from 'react'

import ContactPage from './page'

describe('ContactPage', () => {
  it('should render contact heading and info', () => {
    render(<ContactPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Contacto')
    expect(screen.getByText(/soporte@stratocore.com/)).toBeInTheDocument()
    expect(screen.getByText('+34 900 123 456')).toBeInTheDocument()
  })

  it('should render contact form with all fields', () => {
    render(<ContactPage />)
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Mensaje')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<ContactPage />)
    const form = screen.getByRole('form', { name: /formulario de contacto/i })
    expect(form).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toHaveAttribute('required')
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Mensaje')).toHaveAttribute('required')
  })

  it('should allow typing in form fields', async () => {
    render(<ContactPage />)
    const nameInput = screen.getByLabelText('Nombre')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Mensaje')
    await userEvent.type(nameInput, 'Juan')
    await userEvent.type(emailInput, 'juan@correo.com')
    await userEvent.type(messageInput, 'Hola, quiero información.')
    expect(nameInput).toHaveValue('Juan')
    expect(emailInput).toHaveValue('juan@correo.com')
    expect(messageInput).toHaveValue('Hola, quiero información.')
  })

  it('should have dark mode support', () => {
    render(<ContactPage />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('dark:text-white')
    const form = screen.getByRole('form', { name: /formulario de contacto/i })
    expect(form).toHaveClass('dark:bg-gray-900')
  })
}) 