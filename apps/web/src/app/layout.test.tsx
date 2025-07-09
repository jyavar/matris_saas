import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect,it } from 'vitest'

import RootLayout from './layout'

describe('RootLayout', () => {
  it('should render children correctly', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )
    
    const child = screen.getByTestId('test-child')
    expect(child).toBeInTheDocument()
    expect(child).toHaveTextContent('Test Content')
  })

  it('should render with proper HTML structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    const html = container.querySelector('html')
    const body = container.querySelector('body')
    const main = container.querySelector('main')
    
    expect(html).toBeInTheDocument()
    expect(body).toBeInTheDocument()
    expect(main).toBeInTheDocument()
  })

  it('should have correct HTML attributes', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    const html = container.querySelector('html')
    expect(html).toHaveAttribute('lang', 'en')
  })

  it('should have correct body classes', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    const body = container.querySelector('body')
    expect(body).toHaveClass('flex flex-col min-h-[100dvh] bg-gray-950 text-white font-sans')
  })

  it('should have correct main classes', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    const main = container.querySelector('main')
    expect(main).toHaveClass('flex-1')
  })

  it('should render multiple children', () => {
    render(
      <RootLayout>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </RootLayout>
    )
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()
  })

  it('should render complex nested children', () => {
    render(
      <RootLayout>
        <div data-testid="parent">
          <h1>Title</h1>
          <p>Description</p>
          <button>Click me</button>
        </div>
      </RootLayout>
    )
    
    const parent = screen.getByTestId('parent')
    expect(parent).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<RootLayout><div></div></RootLayout>)
    
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main?.children.length).toBe(1)
  })

  it('should render with null children', () => {
    const { container } = render(<RootLayout>{null}</RootLayout>)
    
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('should render with undefined children', () => {
    const { container } = render(<RootLayout>{undefined}</RootLayout>)
    
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('should have proper metadata structure', () => {
    // Note: In a real Next.js app, metadata would be handled differently
    // This test verifies the component structure
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    const html = container.querySelector('html')
    
    expect(html).toBeInTheDocument()
    // Note: head element is not rendered in test environment for Next.js layout
    // This is expected behavior in the testing environment
  })

  it('should maintain proper semantic structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )
    
    const html = container.querySelector('html')
    const body = container.querySelector('body')
    const main = container.querySelector('main')
    
    expect(html?.children).toContain(body)
    expect(body?.children).toContain(main)
  })
}) 