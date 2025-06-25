import { Button } from '../components/ui/button.js'
import type { Todo } from '../lib/todos.api.js'

interface TodoItemProps {
  todo: Todo
  toggleTodo: (id: number, is_completed: boolean) => void
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
          textDecoration: todo.is_completed ? 'line-through' : 'none',
          opacity: todo.is_completed ? 0.5 : 1,
        }}
        onClick={() => toggleTodo(todo.id, todo.is_completed)}
      >
        {todo.task}
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
