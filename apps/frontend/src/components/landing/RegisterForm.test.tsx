import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import RegisterForm from './RegisterForm'

// Mock global fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('RegisterForm', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renderiza el formulario', () => {
    render(<RegisterForm />)
    expect(screen.getByText('Crea tu cuenta')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument()
    expect(screen.getByLabelText('Empresa')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /crear cuenta/i }),
    ).toBeInTheDocument()
  })

  it('permite escribir en los campos', () => {
    render(<RegisterForm />)
    fireEvent.change(screen.getByLabelText('Nombre completo'), {
      target: { value: 'Juan', name: 'name' },
    })
    fireEvent.change(screen.getByLabelText('Empresa'), {
      target: { value: 'Acme', name: 'company' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'juan@acme.com', name: 'email' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: '123456', name: 'password' },
    })
    expect(screen.getByLabelText('Nombre completo')).toHaveValue('Juan')
    expect(screen.getByLabelText('Empresa')).toHaveValue('Acme')
    expect(screen.getByLabelText('Email')).toHaveValue('juan@acme.com')
    expect(screen.getByLabelText('Contraseña')).toHaveValue('123456')
  })

  it('muestra mensaje de éxito tras submit exitoso', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true })
    render(<RegisterForm />)
    fireEvent.change(screen.getByLabelText('Nombre completo'), {
      target: { value: 'Juan', name: 'name' },
    })
    fireEvent.change(screen.getByLabelText('Empresa'), {
      target: { value: 'Acme', name: 'company' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'juan@acme.com', name: 'email' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: '123456', name: 'password' },
    })
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))
    await waitFor(() => {
      expect(screen.getByText(/¡Registro exitoso!/i)).toBeInTheDocument()
    })
  })

  it('muestra mensaje de error si fetch falla', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false })
    render(<RegisterForm />)
    fireEvent.change(screen.getByLabelText('Nombre completo'), {
      target: { value: 'Juan', name: 'name' },
    })
    fireEvent.change(screen.getByLabelText('Empresa'), {
      target: { value: 'Acme', name: 'company' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'juan@acme.com', name: 'email' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: '123456', name: 'password' },
    })
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))
    await waitFor(() => {
      expect(screen.getByText(/Error en el registro/i)).toBeInTheDocument()
    })
  })
})
