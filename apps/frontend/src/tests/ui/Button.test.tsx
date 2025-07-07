import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

// Test funcional que demuestra que el sistema de testing funciona
describe('Frontend Testing Setup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render basic React components', () => {
    const { getByText } = render(<div>Hello World</div>)
    expect(getByText('Hello World')).toBeInTheDocument()
  })

  it('should render and interact with buttons', async () => {
    const mockOnClick = vi.fn()
    const { getByRole } = render(
      <button onClick={mockOnClick}>Click me</button>,
    )

    const button = getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')

    await userEvent.click(button)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should handle form inputs', async () => {
    const { getByLabelText } = render(
      <form>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" />
      </form>,
    )

    const input = getByLabelText('Name:')
    expect(input).toBeInTheDocument()

    await userEvent.type(input, 'John Doe')
    expect(input).toHaveValue('John Doe')
  })

  it('should test disabled state', () => {
    const { getByRole } = render(<button disabled>Disabled Button</button>)

    const button = getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should test loading state', () => {
    const { getByText } = render(
      <div>
        <span>Loading...</span>
        <svg className="spinner" />
      </div>,
    )

    expect(getByText('Loading...')).toBeInTheDocument()
    expect(document.querySelector('.spinner')).toBeInTheDocument()
  })

  it('should test component with props', () => {
    const TestComponent = ({
      title,
      children,
    }: {
      title: string
      children: React.ReactNode
    }) => (
      <div>
        <h1>{title}</h1>
        {children}
      </div>
    )

    const { getByText } = render(
      <TestComponent title="Test Title">
        <p>Test content</p>
      </TestComponent>,
    )

    expect(getByText('Test Title')).toBeInTheDocument()
    expect(getByText('Test content')).toBeInTheDocument()
  })
})
