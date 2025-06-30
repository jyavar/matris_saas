import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import AuthForm from '../components/ui/AuthForm.js'

describe('AuthForm', () => {
  it('renderiza el formulario y permite submit', () => {
    const handleSubmit = vi.fn()
    render(<AuthForm onSubmit={handleSubmit} title="Login" />)

    // Verifica renderizado
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const button = screen.getByRole('button', { name: 'Login' })

    // Simula input y submit
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(button)

    expect(handleSubmit).toHaveBeenCalledWith('test@example.com', '123456')
  })
})
