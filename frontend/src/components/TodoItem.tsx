import { Button } from '@/components/ui/button.jsx'
import type { Todo } from '@/hooks/useTodos.js'

interface TodoItemProps {
  todo: Todo
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
}

export function TodoItem({ todo, toggleTodo, removeTodo }: TodoItemProps) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        borderBottom: '1px solid #eee',
      }}
    >
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          opacity: todo.completed ? 0.5 : 1,
        }}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => removeTodo(todo.id)}
      >
        Remove
      </Button>
    </li>
  )
}
