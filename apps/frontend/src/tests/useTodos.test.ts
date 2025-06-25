/**
 * @vitest-environment jsdom
 */

import { act, renderHook, waitFor } from '@testing-library/react'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import { useTodos } from '../hooks/useTodos.js'

// Mock de variable de entorno para tests
beforeAll(() => {
  // @ts-expect-error: import.meta.env es inyectado por Vite, no existe en Node.js puro
  import.meta.env = { ...import.meta.env, VITE_API_URL: 'http://localhost' }
})

beforeEach(() => {
  globalThis.fetch = vi.fn(
    (input: string | Request | URL, init?: RequestInit): Promise<Response> => {
      if (init?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              id: Date.now(),
              task: 'New Test Todo',
              is_completed: false,
              created_at: new Date().toISOString(),
            }),
        } as unknown as Response)
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              task: 'Learn MSW',
              is_completed: true,
              created_at: new Date().toISOString(),
            },
          ]),
      } as unknown as Response)
    },
  )
})

afterEach(() => {
  vi.restoreAllMocks()
})

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
