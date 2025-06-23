import { http, HttpResponse } from 'msw'

const API_URL = `${import.meta.env.VITE_API_URL}/todos`

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json([
      {
        id: 1,
        task: 'Learn MSW',
        is_completed: true,
        created_at: new Date().toISOString(),
      },
    ])
  }),

  http.post(API_URL, async ({ request }) => {
    const newTodo = (await request.json()) as { task: string }
    return HttpResponse.json(
      {
        id: Date.now(),
        ...newTodo,
        created_at: new Date().toISOString(),
      },
      { status: 201 },
    )
  }),
]
