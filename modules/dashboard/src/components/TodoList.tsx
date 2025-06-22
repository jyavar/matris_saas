import React, { useState } from 'react'

import { useTodos } from '../hooks/useTodos'
import { TodoItem } from './TodoItem'

export function TodoList() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos()
  const [newTodoText, setNewTodoText] = useState('')

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodoText.trim()) {
      addTodo(newTodoText)
      setNewTodoText('')
    }
  }

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        width: '400px',
        margin: '2rem auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>STRATO TODOs</h1>
      <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="What needs to be done?"
          style={{ flexGrow: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Add
        </button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  )
}
