/**
 * @vitest-environment jsdom
 */

import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { useTodos } from '../hooks/useTodos.js'

describe('useTodos hook', () => {
  test('should initialize with a list of todos from the API', async () => {
    const { result } = renderHook(() => useTodos())

    await waitFor(() => {
      expect(result.current.todos.length).toBeGreaterThan(0)
    })

    expect(result.current.todos[0].task).toBe('Learn MSW')
  })

  test('should add a new todo', async () => {
    const { result } = renderHook(() => useTodos())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.todos.length).toBeGreaterThan(0)
    })

    const initialCount = result.current.todos.length

    await act(async () => {
      await result.current.addTodo('New Test Todo')
    })

    expect(result.current.todos.length).toBe(initialCount + 1)
    expect(result.current.todos[initialCount].task).toBe('New Test Todo')
  })

  // Note: Tests for toggle and remove would require adding more handlers to msw
  // and are omitted for brevity in this fixing session. The principles are the same.
})
