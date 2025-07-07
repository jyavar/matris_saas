import { config } from 'dotenv'
import { vi } from 'vitest'

// Cargar variables de entorno de test
config({ path: '../../.env.test' })

// Mock global de console para evitar logs en tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}

// Mock de process.env para tests
process.env.NODE_ENV = 'test'
process.env.SUPABASE_URL = 'https://test.supabase.co'
process.env.SUPABASE_ANON_KEY = 'test-key'
process.env.JWT_SECRET = 'test-jwt-secret'
process.env.STRIPE_SECRET_KEY = 'sk_test_123'
process.env.OPENAI_API_KEY = 'sk-test-123'
process.env.RESEND_API_KEY = 'test-resend-key'
process.env.POSTHOG_API_KEY = 'test-posthog-key'

// Mock de fetch global
global.fetch = vi.fn()

// Mock de Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn(() =>
        Promise.resolve({ data: { user: { id: 'test-user' } }, error: null }),
      ),
      signUp: vi.fn(() =>
        Promise.resolve({ data: { user: { id: 'test-user' } }, error: null }),
      ),
      signOut: vi.fn(() => Promise.resolve({ error: null })),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [{ id: 1 }], error: null })),
        single: vi.fn(() => Promise.resolve({ data: { id: 1 }, error: null })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() =>
          Promise.resolve({ data: [{ id: 1 }], error: null }),
        ),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [{ id: 1 }], error: null })),
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
    })),
  })),
}))

// Mock de Stripe
vi.mock('stripe', () => ({
  default: vi.fn(() => ({
    paymentIntents: {
      create: vi.fn(() => Promise.resolve({ id: 'pi_test_123' })),
      retrieve: vi.fn(() =>
        Promise.resolve({ id: 'pi_test_123', status: 'succeeded' }),
      ),
    },
    customers: {
      create: vi.fn(() => Promise.resolve({ id: 'cus_test_123' })),
    },
  })),
}))

// Mock de OpenAI
vi.mock('openai', () => ({
  default: vi.fn(() => ({
    chat: {
      completions: {
        create: vi.fn(() =>
          Promise.resolve({
            choices: [{ message: { content: 'Test response' } }],
          }),
        ),
      },
    },
  })),
}))

// Mock de Resend
vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: vi.fn(() => Promise.resolve({ data: { id: 'test-email-id' } })),
    },
  })),
}))

// Mock de PostHog
vi.mock('posthog-node', () => ({
  PostHog: vi.fn(() => ({
    capture: vi.fn(),
    identify: vi.fn(),
  })),
}))
