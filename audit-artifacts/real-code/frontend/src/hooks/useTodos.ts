import { useCallback, useEffect, useState } from 'react'

import {
  createTodo,
  deleteTodo,
  getTodos,
  type Todo,
  updateTodo,
} from '../lib/todos.api.js'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos()
        setTodos(fetchedTodos)
      } catch (error) {
        console.error('Failed to fetch todos:', error)
      }
    }
    fetchTodos()
  }, [])

  const addTodo = useCallback(async (task: string) => {
    try {
      const newTodo = await createTodo({ task })
      setTodos((prevTodos) => [...prevTodos, newTodo])
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }, [])

  const toggleTodo = useCallback(async (id: number, is_completed: boolean) => {
    try {
      const updatedTodo = await updateTodo(id, {
        is_completed: !is_completed,
      })
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      )
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }, [])

  const removeTodo = useCallback(async (id: number) => {
    try {
      await deleteTodo(id)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }, [])

  return { todos, addTodo, toggleTodo, removeTodo }
}
