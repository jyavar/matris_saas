import { rest } from 'msw'

// Mock base URL for consistent testing
const BASE_URL = 'http://localhost:3000'

// Mock Supabase Auth responses
const mockSupabaseUser = {
  id: '1',
  email: 'test@example.com',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  user_metadata: {
    name: 'Test User',
    avatar_url: '',
  },
}

const mockSupabaseSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
}

export const handlers = [
  // Supabase Auth endpoints simulation
  rest.post('*/auth/v1/token', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          user: mockSupabaseUser,
          session: mockSupabaseSession,
        },
        error: null,
      }),
    )
  }),

  rest.post('*/auth/v1/signup', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          user: mockSupabaseUser,
          session: mockSupabaseSession,
        },
        error: null,
      }),
    )
  }),

  rest.post('*/auth/v1/logout', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        error: null,
      }),
    )
  }),

  rest.get('*/auth/v1/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          user: mockSupabaseUser,
        },
        error: null,
      }),
    )
  }),

  rest.get('*/auth/v1/session', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          session: mockSupabaseSession,
        },
        error: null,
      }),
    )
  }),

  // Legacy API endpoints for backward compatibility
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

  // Absolute URL versions for backward compatibility
  rest.post(`${BASE_URL}/api/auth/login`, (req, res, ctx) => {
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

  rest.post(`${BASE_URL}/api/auth/register`, (req, res, ctx) => {
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
