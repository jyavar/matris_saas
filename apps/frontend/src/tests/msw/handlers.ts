import { rest } from 'msw'

export const handlers = [
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-token',
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          avatar_url: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      }),
    )
  }),
  rest.post('/api/auth/register', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        token: 'mock-token',
        user: {
          id: '2',
          email: 'new@example.com',
          name: 'New User',
          avatar_url: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      }),
    )
  }),
]
