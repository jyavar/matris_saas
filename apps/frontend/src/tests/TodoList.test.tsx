import { render, screen } from '@testing-library/react'

// Mock de useTodos
jest.mock('../hooks/useTodos.js', () => ({
  useTodos: () => ({
    todos: [],
    addTodo: jest.fn(),
    toggleTodo: jest.fn(),
    removeTodo: jest.fn(),
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
