import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import React from 'react'

import Input from './Input'

describe('Input Component', () => {
  it('should render input with default props', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('w-full px-3 py-2 border border-gray-300')
  })

  it('should render input with label', () => {
    render(<Input label="Email Address" placeholder="Enter email" />)
    
    const label = screen.getByText('Email Address')
    const input = screen.getByPlaceholderText('Enter email')
    
    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'email-address')
    expect(input).toHaveAttribute('id', 'email-address')
  })

  it('should render input with error message', () => {
    render(<Input error="This field is required" placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    const errorMessage = screen.getByText('This field is required')
    
    expect(input).toBeInTheDocument()
    expect(errorMessage).toBeInTheDocument()
    expect(input).toHaveClass('border-red-500')
    expect(errorMessage).toHaveClass('text-red-600')
  })

  it('should handle user input', async () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    await userEvent.type(input, 'Hello World')
    
    expect(input).toHaveValue('Hello World')
  })

  it('should apply custom className', () => {
    render(<Input className="custom-input" placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('custom-input')
  })

  it('should pass through additional props', () => {
    render(
      <Input 
        data-testid="test-input" 
        aria-label="Test input"
        placeholder="Enter text"
      />
    )
    
    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('aria-label', 'Test input')
  })

  it('should generate id from label when no id provided', () => {
    render(<Input label="User Name" placeholder="Enter name" />)
    
    const input = screen.getByPlaceholderText('Enter name')
    expect(input).toHaveAttribute('id', 'user-name')
  })

  it('should use provided id when available', () => {
    render(<Input id="custom-id" label="User Name" placeholder="Enter name" />)
    
    const input = screen.getByPlaceholderText('Enter name')
    expect(input).toHaveAttribute('id', 'custom-id')
  })

  it('should handle label with spaces and special characters', () => {
    render(<Input label="User Full Name (Required)" placeholder="Enter name" />)
    
    const input = screen.getByPlaceholderText('Enter name')
    expect(input).toHaveAttribute('id', 'user-full-name-(required)')
  })

  it('should render input without label', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(screen.queryByText('Label')).not.toBeInTheDocument()
  })

  it('should render input without error', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).not.toHaveClass('border-red-500')
    expect(screen.queryByText('Error')).not.toBeInTheDocument()
  })

  it('should have focus styles', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('focus:outline-none')
    expect(input).toHaveClass('focus:ring-2')
    expect(input).toHaveClass('focus:ring-blue-500')
  })

  it('should handle disabled state', () => {
    render(<Input disabled placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeDisabled()
  })

  it('should handle required state', () => {
    render(<Input required placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeRequired()
  })

  it('should handle different input types', () => {
    render(<Input type="email" placeholder="Enter email" />)
    
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toHaveAttribute('type', 'email')
  })
}) 