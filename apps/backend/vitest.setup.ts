import { afterAll, vi } from 'vitest'

// Configurar variables de entorno para tests
process.env.SUPABASE_URL = 'https://test.supabase.co'
process.env.SUPABASE_ANON_KEY = 'test-anon-key'
process.env.JWT_SECRET = 'test-jwt-secret'
process.env.OPENAI_API_KEY = 'test-openai-key'
process.env.STRIPE_SECRET_KEY = 'test-stripe-key'
process.env.POSTHOG_API_KEY = 'test-posthog-key'
process.env.RESEND_API_KEY = 'test-resend-key'

// Mock Stripe ANTES de que se importe el módulo
vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation((key: string, options: unknown) => ({
    _key: key,
    _opts: options,
  })),
}))

// Mock Supabase para evitar conexiones reales en tests
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id', email: 'test@example.com' } },
        error: null,
      }),
      signInWithPassword: vi.fn().mockImplementation(({ email, password }) => {
        if (password === 'wrongpassword') {
          return Promise.resolve({
            data: { user: null, session: null },
            error: { message: 'Invalid login credentials' },
          })
        }
        return Promise.resolve({
          data: {
            user: { id: 'test-user-id', email },
            session: { access_token: 'test-token' },
          },
          error: null,
        })
      }),
      signUp: vi.fn().mockResolvedValue({
        data: {
          user: { id: 'test-user-id', email: 'test@example.com' },
          session: { access_token: 'test-token' },
        },
        error: null,
      }),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      neq: vi.fn().mockReturnThis(),
      gt: vi.fn().mockReturnThis(),
      lt: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      like: vi.fn().mockReturnThis(),
      ilike: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      not: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      and: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      then: vi.fn().mockResolvedValue({ data: [], error: null }),
    })),
  })),
}))

// Mock OpenAI
vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: vi.fn().mockResolvedValue({
          choices: [{ message: { content: 'Test response' } }],
        }),
      },
    },
  })),
}))

// Mock PostHog
vi.mock('posthog-node', () => ({
  PostHog: vi.fn().mockImplementation(() => ({
    capture: vi.fn(),
    shutdown: vi.fn(),
  })),
}))

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'test-email-id' }),
    },
  })),
}))

// Configurar console.error para no mostrar errores en tests
const originalError = console.error
console.error = vi.fn()

// Restaurar console.error después de los tests
afterAll(() => {
  console.error = originalError
})
