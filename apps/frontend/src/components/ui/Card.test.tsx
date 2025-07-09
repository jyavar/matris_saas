import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'

import Card from './Card'

describe('Card Component', () => {
  it('should render card with children', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    )
    
    const card = screen.getByText('Card content')
    expect(card).toBeInTheDocument()
    expect(card.parentElement).toHaveClass('bg-white shadow-md rounded-lg border border-gray-200')
  })

  it('should render card with custom className', () => {
    render(
      <Card className="custom-card">
        <div>Custom card</div>
      </Card>
    )
    
    const card = screen.getByText('Custom card').parentElement
    expect(card).toHaveClass('custom-card')
    expect(card).toHaveClass('bg-white shadow-md rounded-lg border border-gray-200')
  })

  it('should render card without custom className', () => {
    render(
      <Card>
        <div>Default card</div>
      </Card>
    )
    
    const card = screen.getByText('Default card').parentElement
    expect(card).toHaveClass('bg-white shadow-md rounded-lg border border-gray-200')
    expect(card).not.toHaveClass('custom-card')
  })

  it('should render card with multiple children', () => {
    render(
      <Card>
        <h2>Card Title</h2>
        <p>Card description</p>
        <button>Card button</button>
      </Card>
    )
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /card button/i })).toBeInTheDocument()
  })

  it('should render card with empty content', () => {
    render(<Card><div data-testid="empty-content"></div></Card>)
    
    const card = screen.getByTestId('empty-content').parentElement
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('bg-white shadow-md rounded-lg border border-gray-200')
  })

  it('should render card with complex content', () => {
    render(
      <Card>
        <div data-testid="card-content">
          <h1>Complex Card</h1>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </Card>
    )
    
    const cardContent = screen.getByTestId('card-content')
    expect(cardContent).toBeInTheDocument()
    expect(screen.getByText('Complex Card')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('should apply multiple custom classes', () => {
    render(
      <Card className="p-4 m-2 bg-blue-50">
        <div>Styled card</div>
      </Card>
    )
    
    const card = screen.getByText('Styled card').parentElement
    expect(card).toHaveClass('p-4')
    expect(card).toHaveClass('m-2')
    expect(card).toHaveClass('bg-blue-50')
    expect(card).toHaveClass('bg-white shadow-md rounded-lg border border-gray-200')
  })

  it('should render card with form elements', () => {
    render(
      <Card>
        <form>
          <input type="text" placeholder="Enter text" />
          <button type="submit">Submit</button>
        </form>
      </Card>
    )
    
    const input = screen.getByPlaceholderText('Enter text')
    const button = screen.getByRole('button', { name: /submit/i })
    
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should render card with conditional content', () => {
    const showContent = true
    
    render(
      <Card>
        {showContent && <div>Conditional content</div>}
      </Card>
    )
    
    expect(screen.getByText('Conditional content')).toBeInTheDocument()
  })

  it('should render card with nested components', () => {
    const NestedComponent = () => <span>Nested component</span>
    
    render(
      <Card>
        <div>
          <NestedComponent />
          <p>Regular content</p>
        </div>
      </Card>
    )
    
    expect(screen.getByText('Nested component')).toBeInTheDocument()
    expect(screen.getByText('Regular content')).toBeInTheDocument()
  })
}) 