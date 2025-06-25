import React from 'react'

import { Button } from '../components/ui/button.js'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card.js'
import { Input } from '../components/ui/input.js'
import { useTodos } from '../hooks/useTodos.js'
import { TodoItem } from './TodoItem.js'

export function TodoList() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos()
  const [newTodoText, setNewTodoText] = React.useState('')

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodoText.trim()) {
      addTodo(newTodoText)
      setNewTodoText('')
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>STRATO TODOs</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '8px' }}>
          <Input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="What needs to be done?"
          />
          <Button type="submit">Add</Button>
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
      </CardContent>
    </Card>
  )
}
