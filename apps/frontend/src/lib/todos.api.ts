const API_URL =
  typeof process !== 'undefined' && process.env.VITEST
    ? 'http://localhost/todos'
    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost'}/todos`

export interface Todo {
  id: number
  task: string
  is_completed: boolean
  created_at: string
}

export interface CreateTodo {
  task: string
  is_completed?: boolean
}

export interface UpdateTodo {
  task?: string
  is_completed?: boolean
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }
  return response.json()
}

export async function createTodo(todo: CreateTodo): Promise<Todo> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error('Failed to create todo')
  }
  return response.json()
}

export async function updateTodo(id: number, todo: UpdateTodo): Promise<Todo> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error('Failed to update todo')
  }
  return response.json()
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete todo')
  }
}
