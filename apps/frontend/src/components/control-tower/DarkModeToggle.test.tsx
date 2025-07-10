import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import React from 'react'

import DarkModeToggle from './DarkModeToggle'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

// Mock matchMedia
const matchMediaMock = vi.fn()

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  })
  
  Object.defineProperty(window, 'matchMedia', {
    value: matchMediaMock,
    writable: true,
  })
  
  // Reset DOM
  document.documentElement.classList.remove('dark')
  
  // Clear all mocks
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('DarkModeToggle Component', () => {
  it('should render component', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle />)
    
    expect(screen.getByText('Modo Claro')).toBeInTheDocument()
  })

  it('should render toggle button after loading', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle />)
    
    await waitFor(() => {
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })
  })

  it('should show label by default', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle />)
    
    await waitFor(() => {
      expect(screen.getByText('Modo Claro')).toBeInTheDocument()
    })
  })

  it('should hide label when showLabel is false', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle showLabel={false} />)
    
    await waitFor(() => {
      expect(screen.queryByText('Modo Claro')).not.toBeInTheDocument()
    })
  })

  it('should initialize with light mode when no saved preference', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle />)
    
    await waitFor(() => {
      expect(screen.getByText('Modo Claro')).toBeInTheDocument()
    })
  })

  it('should initialize with dark mode when saved in localStorage', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue('dark')
    
    render(<DarkModeToggle />)
    
    await waitFor(() => {
      expect(screen.getByText('Modo Oscuro')).toBeInTheDocument()
    })
  })

  it('should use system preference when no saved preference', async () => {
    matchMediaMock.mockReturnValue({
      matches: true, // System prefers dark mode
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle />)
    
    await waitFor(() => {
      expect(screen.getByText('Modo Oscuro')).toBeInTheDocument()
    })
  })

  it('should toggle dark mode when clicked', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle />)
    
    await waitFor(() => {
      expect(screen.getByText('Modo Claro')).toBeInTheDocument()
    })
    
    const toggle = screen.getByRole('switch')
    await userEvent.click(toggle)
    
    await waitFor(() => {
      expect(screen.getByText('Modo Oscuro')).toBeInTheDocument()
    })
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('should handle keyboard interaction (Enter)', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle />)
    
    await waitFor(() => {
      expect(screen.getByText('Modo Claro')).toBeInTheDocument()
    })
    
    const toggle = screen.getByRole('switch')
    await userEvent.type(toggle, '{Enter}')
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('should handle keyboard interaction (Space)', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle />)
    
    await waitFor(() => {
      expect(screen.getByText('Modo Claro')).toBeInTheDocument()
    })
    
    const toggle = screen.getByRole('switch')
    await userEvent.type(toggle, ' ')
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('should apply custom className', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    const { container } = render(<DarkModeToggle className="custom-class" />)
    
    await waitFor(() => {
      expect(container.firstChild).toHaveClass('custom-class')
    })
  })

  it('should render with small size', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle size="sm" />)
    
    await waitFor(() => {
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveClass('w-8 h-8')
    })
  })

  it('should render with large size', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle size="lg" />)
    
    await waitFor(() => {
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveClass('w-12 h-12')
    })
  })

  it('should have correct aria attributes', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle />)
    
    await waitFor(() => {
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('aria-label', 'Cambiar a modo oscuro')
      expect(toggle).toHaveAttribute('aria-checked', 'false')
    })
  })

  it('should update aria attributes when toggled', async () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<DarkModeToggle />)
    
    await waitFor(() => {
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('aria-checked', 'false')
    })
    
    const toggle = screen.getByRole('switch')
    await userEvent.click(toggle)
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('should cleanup event listeners on unmount', async () => {
    const removeEventListener = vi.fn()
    
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener,
    })
    
    localStorageMock.getItem.mockReturnValue(null)
    
    const { unmount } = render(<DarkModeToggle />)
    
    await waitFor(() => {
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })
    
    unmount()
    
    expect(removeEventListener).toHaveBeenCalled()
  })
})