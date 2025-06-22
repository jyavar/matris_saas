import { useState } from 'react'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

const initialTodos: Todo[] = [
  { id: 1, text: 'Validate STRATO Core OS', completed: true },
  { id: 2, text: 'Build first feature', completed: false },
  { id: 3, text: 'Deploy to production', completed: false },
]

export function useTodos() {
  const [todos, setTodos] = useState(initialTodos)

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id))
  }

  return { todos, addTodo, toggleTodo, removeTodo }
}
