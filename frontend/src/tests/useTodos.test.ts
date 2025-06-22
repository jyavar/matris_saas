import { act, renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { type Todo, useTodos } from '../hooks/useTodos.js'

describe('useTodos hook', () => {
  test('should initialize with a default list of todos', () => {
    const { result } = renderHook(() => useTodos())
    expect(result.current.todos.length).toBeGreaterThan(0)
  })

  test('should add a new todo', () => {
    const { result } = renderHook(() => useTodos())
    const initialCount = result.current.todos.length

    act(() => {
      result.current.addTodo('New Test Todo')
    })

    const newTodo = result.current.todos[initialCount]
    expect(newTodo).toBeDefined()
    expect(newTodo!.text).toBe('New Test Todo')
    expect(newTodo!.completed).toBe(false)
  })

  test('should toggle a todo', () => {
    const { result } = renderHook(() => useTodos())
    const firstTodo = result.current.todos[0]
    expect(firstTodo).toBeDefined()
    const firstTodoOriginalCompleted = firstTodo!.completed

    act(() => {
      result.current.toggleTodo(firstTodo!.id)
    })

    expect(result.current.todos[0]!.completed).toBe(!firstTodoOriginalCompleted)

    act(() => {
      result.current.toggleTodo(firstTodo!.id)
    })

    expect(result.current.todos[0]!.completed).toBe(firstTodoOriginalCompleted)
  })

  test('should remove a todo', () => {
    const { result } = renderHook(() => useTodos())
    const initialCount = result.current.todos.length
    const todoToRemove = result.current.todos[0]
    expect(todoToRemove).toBeDefined()

    act(() => {
      result.current.removeTodo(todoToRemove!.id)
    })

    expect(result.current.todos.length).toBe(initialCount - 1)
    expect(
      result.current.todos.find((todo: Todo) => todo.id === todoToRemove!.id),
    ).toBeUndefined()
  })
})
