import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Mock de useTodos
vi.mock('../hooks/useTodos.js', () => ({
  useTodos: () => ({
    todos: [],
    addTodo: vi.fn(),
    toggleTodo: vi.fn(),
    removeTodo: vi.fn(),
  }),
}))

import { TodoList } from '../components/TodoList.js'

describe('TodoList', () => {
  it('renderiza el título y el input', () => {
    render(<TodoList />)
    expect(screen.getByText('STRATO TODOs')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('What needs to be done?'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })
})
