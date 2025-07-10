import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

import LoginPage from './page'

// Mock Next.js navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock AuthContext
const mockLogin = vi.fn()
const mockRegister = vi.fn()
const mockClearError = vi.fn()

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    register: mockRegister,
    clearError: mockClearError,
    loading: false,
    error: null,
  }),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render login form with correct elements', () => {
    render(<LoginPage />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Iniciar sesión')
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('should switch between login and register modes', async () => {
    render(<LoginPage />)
    
    const switchButton = screen.getByText(/regístrate aquí/i)
    await userEvent.click(switchButton)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Crear cuenta')
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument()
    expect(screen.getByText(/ya tienes cuenta/i)).toBeInTheDocument()
  })

  it('should handle form submission for login', async () => {
    mockLogin.mockResolvedValue(undefined)
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.click(submitButton)
    
    expect(mockClearError).toHaveBeenCalled()
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('should handle form submission for register', async () => {
    mockRegister.mockResolvedValue(undefined)
    render(<LoginPage />)
    
    // Switch to register mode
    const switchButton = screen.getByText(/regístrate aquí/i)
    await userEvent.click(switchButton)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i })
    
    await userEvent.type(emailInput, 'new@example.com')
    await userEvent.type(passwordInput, 'newpassword123')
    await userEvent.click(submitButton)
    
    expect(mockClearError).toHaveBeenCalled()
    expect(mockRegister).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'newpassword123',
    })
  })

  it('should display error message when auth error exists', () => {
    vi.mocked(require('@/contexts/AuthContext').useAuth).mockReturnValue({
      login: mockLogin,
      register: mockRegister,
      clearError: mockClearError,
      loading: false,
      error: 'Credenciales inválidas',
    })
    
    render(<LoginPage />)
    
    expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument()
  })

  it('should disable submit button when loading', () => {
    vi.mocked(require('@/contexts/AuthContext').useAuth).mockReturnValue({
      login: mockLogin,
      register: mockRegister,
      clearError: mockClearError,
      loading: true,
      error: null,
    })
    
    render(<LoginPage />)
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    expect(submitButton).toBeDisabled()
  })

  it('should have proper form validation attributes', () => {
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)
    
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toHaveAttribute('required')
  })

  it('should have proper accessibility attributes', () => {
    render(<LoginPage />)
    
    const form = screen.getByRole('form')
    expect(form).toHaveAttribute('aria-label', 'Formulario de inicio de sesión')
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)
    
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(passwordInput).toHaveAttribute('id', 'password')
  })

  it('should have back to home link', () => {
    render(<LoginPage />)
    
    const backLink = screen.getByRole('link', { name: /volver al inicio/i })
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('should have proper dark mode support', () => {
    render(<LoginPage />)
    
    const container = document.querySelector('.min-h-screen')
    expect(container).toHaveClass('bg-gray-50', 'dark:bg-gray-950')
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('dark:text-white')
  })
}) 