import React from "react"
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import { ProtectedRoute } from './ProtectedRoute.js'

describe('ProtectedRoute', () => {
  let useAuthSpy: ReturnType<typeof vi.spyOn>

  beforeEach(async () => {
    const AuthContext = await import('../../contexts/AuthContext.js')
    useAuthSpy = vi.spyOn(AuthContext, 'useAuth')
  })

  afterEach(() => {
    useAuthSpy.mockRestore()
  })

  it('muestra loading si loading=true', async () => {
    useAuthSpy.mockReturnValue({ user: null, loading: true })
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ProtectedRoute>
          <div>Contenido protegido</div>
        </ProtectedRoute>
      </MemoryRouter>,
    )
    expect(screen.getByText(/Loading session/i)).toBeInTheDocument()
  })

  it('redirige si no hay usuario', async () => {
    useAuthSpy.mockReturnValue({ user: null, loading: false })
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ProtectedRoute>
          <div>Contenido protegido</div>
        </ProtectedRoute>
      </MemoryRouter>,
    )
    expect(screen.queryByText(/Contenido protegido/i)).not.toBeInTheDocument()
  })

  it('renderiza children si hay usuario', async () => {
    useAuthSpy.mockReturnValue({ user: { id: '123' }, loading: false })
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ProtectedRoute>
          <div>Contenido protegido</div>
        </ProtectedRoute>
      </MemoryRouter>,
    )
    expect(screen.getByText(/Contenido protegido/i)).toBeInTheDocument()
  })
})
