import { vi, beforeEach } from 'vitest'

// Mock Supabase globalmente para todos los tests
vi.mock('../lib/supabase.js', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(() => Promise.resolve({ 
        data: { user: { id: 'test-user-id', email: 'test@example.com' } }, 
        error: null 
      })),
      signInWithPassword: vi.fn(() => Promise.resolve({ 
        data: { 
          user: { id: 'test-user-id', email: 'test@example.com' },
          session: { access_token: 'mock-token' }
        }, 
        error: null 
      })),
      getUser: vi.fn(() => Promise.resolve({ 
        data: { user: { id: 'test-user-id', email: 'test@example.com' } }, 
        error: null 
      }))
    },
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => Promise.resolve({ 
          data: [{ id: 1, name: 'test' }], 
          error: null 
        }))
      })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ 
            data: { id: 1, name: 'test' }, 
            error: null 
          }))
        })),
        order: vi.fn(() => ({
          limit: vi.fn(() => ({
            range: vi.fn(() => Promise.resolve({ data: [], error: null }))
          }))
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => Promise.resolve({ 
            data: [{ id: 1, name: 'updated' }], 
            error: null 
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: null, error: null }))
      }))
    }))
  }
}))

// Mock logger para evitar logs en tests
vi.mock('../services/logger.service.js', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    logAction: vi.fn()
  }
}))

// Mock PostHog
vi.mock('posthog-node', () => ({
  PostHog: vi.fn(() => ({
    capture: vi.fn(),
    identify: vi.fn(),
    shutdown: vi.fn()
  }))
}))

// Mock Stripe
vi.mock('stripe', () => ({
  default: vi.fn(() => ({
    paymentIntents: {
      create: vi.fn(() => Promise.resolve({ id: 'pi_test' }))
    },
    subscriptions: {
      create: vi.fn(() => Promise.resolve({ id: 'sub_test' }))
    }
  }))
}))

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: vi.fn(() => Promise.resolve({ id: 'email_test' }))
    }
  }))
}))

// Mock OpenAI
vi.mock('openai', () => ({
  OpenAI: vi.fn(() => ({
    chat: {
      completions: {
        create: vi.fn(() => Promise.resolve({ 
          choices: [{ message: { content: 'Mock response' } }] 
        }))
      }
    }
  }))
}))

// Mock pino-http
vi.mock('pino-http', () => ({
  default: vi.fn(() => vi.fn())
}))

// Mock auth middleware
vi.mock('../middleware/auth.middleware.js', () => ({
  authMiddleware: vi.fn((req, res, next) => {
    req.user = { id: 'test-user-id', email: 'test@example.com' }
    next()
  })
}))

// Limpiar todos los mocks antes de cada test
beforeEach(() => {
  vi.clearAllMocks()
})

// Exportar utilidades para tests
export const mockSupabase = {
  auth: {
    signUp: vi.fn(),
    signInWithPassword: vi.fn(),
    getUser: vi.fn()
  },
  from: vi.fn()
}
