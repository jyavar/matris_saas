import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

import Button from './Button'

describe('Button Component', () => {
  it('should render button with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600') // primary variant
    expect(button).toHaveClass('px-4 py-2') // md size
  })

  it('should render button with custom variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    
    const button = screen.getByRole('button', { name: /secondary button/i })
    expect(button).toHaveClass('bg-gray-600')
    expect(button).not.toHaveClass('bg-blue-600')
  })

  it('should render button with custom size', () => {
    render(<Button size="lg">Large Button</Button>)
    
    const button = screen.getByRole('button', { name: /large button/i })
    expect(button).toHaveClass('px-6 py-3')
    expect(button).toHaveClass('text-lg')
  })

  it('should render outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>)
    
    const button = screen.getByRole('button', { name: /outline button/i })
    expect(button).toHaveClass('border border-gray-300')
    expect(button).toHaveClass('bg-white')
  })

  it('should handle click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    await userEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getByRole('button', { name: /disabled button/i })
    expect(button).toBeDisabled()
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    
    const button = screen.getByRole('button', { name: /custom button/i })
    expect(button).toHaveClass('custom-class')
  })

  it('should pass through additional props', () => {
    render(
      <Button data-testid="test-button" aria-label="Test button">
        Test Button
      </Button>
    )
    
    const button = screen.getByTestId('test-button')
    expect(button).toHaveAttribute('aria-label', 'Test button')
  })

  it('should render with small size', () => {
    render(<Button size="sm">Small Button</Button>)
    
    const button = screen.getByRole('button', { name: /small button/i })
    expect(button).toHaveClass('px-3 py-1.5')
    expect(button).toHaveClass('text-sm')
  })

  it('should have focus styles', () => {
    render(<Button>Focusable Button</Button>)
    
    const button = screen.getByRole('button', { name: /focusable button/i })
    expect(button).toHaveClass('focus:outline-none')
    expect(button).toHaveClass('focus:ring-2')
  })

  it('should render empty button', () => {
    render(<Button />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('')
  })
}) 