import { TablesInsert, TablesUpdate } from '@repo/db-types'

import { ApiError } from '../utils/ApiError.js'

export type TodoDTO = {
  id: number
  task: string
  is_completed: boolean
  created_at: string
  user_id?: string | number | null
  tenant_id?: string | null
}

function isTodoDTO(obj: unknown): obj is TodoDTO {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'task' in obj &&
    'is_completed' in obj &&
    'created_at' in obj
  )
}

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || ''
const TODOS_ENDPOINT = `${SUPABASE_URL}/rest/v1/todos`

async function fetchTodos(
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<TodoDTO[]> {
  const url = new URL(TODOS_ENDPOINT)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value))
  })
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  if (!res.ok) throw new ApiError(await res.text(), res.status)
  const data = (await res.json()) as unknown[]
  return data.filter(isTodoDTO)
}

export const todoService = {
  async getAllTodos(userId: string, tenantId: string) {
    return fetchTodos({ user_id: userId, tenant_id: tenantId })
  },

  async getTodoById(id: number) {
    const todos = await fetchTodos({ id })
    return todos[0] || null
  },

  async createTodo(todo: TablesInsert<'todos'>) {
    const res = await fetch(TODOS_ENDPOINT, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(todo),
    })
    if (!res.ok) throw new ApiError(await res.text(), res.status)
    const data = (await res.json()) as unknown[]
    const todos = data.filter(isTodoDTO)
    return todos[0] || null
  },

  async updateTodo(id: number, todo: TablesUpdate<'todos'>) {
    const res = await fetch(`${TODOS_ENDPOINT}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(todo),
    })
    if (!res.ok) throw new ApiError(await res.text(), res.status)
    const data = (await res.json()) as unknown[]
    const todos = data.filter(isTodoDTO)
    return todos[0] || null
  },

  async deleteTodo(id: number) {
    const res = await fetch(`${TODOS_ENDPOINT}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: 'return=representation',
      },
    })
    if (!res.ok) throw new ApiError(await res.text(), res.status)
    const data = (await res.json()) as unknown[]
    const todos = data.filter(isTodoDTO)
    if (!todos.length) throw new ApiError('Todo not found', 404)
    return todos[0]
  },
}
