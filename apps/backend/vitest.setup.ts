import { vi, afterAll } from 'vitest'

// ============================================================================
// CONFIGURACIÓN DE ENVIRONMENT
// ============================================================================
process.env.SUPABASE_URL = 'https://test.supabase.co'
process.env.SUPABASE_ANON_KEY = 'test-anon-key'
process.env.JWT_SECRET = 'test-jwt-secret'
process.env.OPENAI_API_KEY = 'test-openai-key'
process.env.STRIPE_SECRET_KEY = 'test-stripe-key'
process.env.POSTHOG_API_KEY = 'test-posthog-key'
process.env.RESEND_API_KEY = 'test-resend-key'

global.console = { ...console, error: vi.fn(), warn: vi.fn(), log: vi.fn() }

// ============================================================================
// MOCKS DE SUPABASE - INTERCEPTANDO TODOS LOS PATHS
// ============================================================================

// Mock para @repo/db-types
vi.mock('@repo/db-types', () => ({
  Database: {
    public: {
      Tables: {
        profiles: {
          Row: { id: 1, email: 'test@example.com', created_at: new Date() },
          Insert: { email: 'test@example.com' },
          Update: { email: 'updated@example.com' }
        },
        todos: {
          Row: { id: 1, title: 'Test Todo', user_id: 1, created_at: new Date() },
          Insert: { title: 'Test Todo', user_id: 1 },
          Update: { title: 'Updated Todo' }
        },
        analytics: {
          Row: { id: 1, event: 'test_event', user_id: 1, created_at: new Date() },
          Insert: { event: 'test_event', user_id: 1 },
          Update: { event: 'updated_event' }
        }
      }
    }
  },
  TablesInsert: { email: 'test@example.com' },
  TablesUpdate: { email: 'updated@example.com' }
}))

// Mock para supabase.service.js
const supabaseMock = {
  from: vi.fn((table) => {
    // Datos de ejemplo para analytics y metrics
    const analyticsRow = {
      id: 1,
      event_name: 'test_event',
      user_id: 'test-user-id',
      created_at: new Date().toISOString(),
      value: 42
    }
    const metricRow = {
      id: 1,
      metric_name: 'test_metric',
      user_id: 'test-user-id',
      created_at: new Date().toISOString(),
      value: 100
    }
    // Legacy endpoints: devolver array plano
    const legacyArray = [
      { id: 1, event_name: 'test_event', user_id: 'test-user-id', created_at: new Date().toISOString(), value: 42 },
      { id: 2, event_name: 'another_event', user_id: 'test-user-id', created_at: new Date().toISOString(), value: 99 }
    ]
    return {
      select: vi.fn(() => ({
        eq: vi.fn((column, value) => {
          // Simular error 404 para usuario inexistente
          if (column === 'user_id' && value === 'notfound') {
            return Promise.resolve({ data: null, error: { message: 'Not found', code: 'PGRST116' } })
          }
          // Simular error 404 para otros casos
          if (value === 'fail' || value === 999) {
            return Promise.resolve({ data: null, error: { message: 'Not found', code: 'PGRST116' } })
          }
          // Analytics
          if (table === 'analytics') {
            return Promise.resolve({ data: [ { ...analyticsRow, [column]: value } ], error: null })
          }
          // Metrics
          if (table === 'metrics') {
            return Promise.resolve({ data: [ { ...metricRow, [column]: value } ], error: null })
          }
          // Otros
          return Promise.resolve({ data: [ { id: 1, [column]: value, created_at: new Date().toISOString() } ], error: null })
        }),
        single: vi.fn(() => {
          if (table === 'analytics') return Promise.resolve({ data: analyticsRow, error: null })
          if (table === 'metrics') return Promise.resolve({ data: metricRow, error: null })
          return Promise.resolve({ data: { id: 1 }, error: null })
        }),
        order: vi.fn(() => ({
          limit: vi.fn(() => ({
            range: vi.fn(() => Promise.resolve({ data: [analyticsRow], error: null }))
          }))
        }))
      })),
      insert: vi.fn((data) => ({
        select: vi.fn(() => {
          // Simular error de validación
          if (table === 'analytics' && (!data.event_name || !data.user_id)) {
            return Promise.resolve({ data: null, error: { message: 'Validation error' } })
          }
          if (table === 'metrics' && (!data.metric_name || !data.user_id)) {
            return Promise.resolve({ data: null, error: { message: 'Validation error' } })
          }
          if (table === 'analytics') {
            return Promise.resolve({ data: [{ ...analyticsRow, ...data }], error: null })
          }
          if (table === 'metrics') {
            return Promise.resolve({ data: [{ ...metricRow, ...data }], error: null })
          }
          return Promise.resolve({ data: [{ id: 1, ...data }], error: null })
        })
      })),
      update: vi.fn((data) => ({
        eq: vi.fn((column, value) => ({
          select: vi.fn(() => {
            // Simular error de validación
            if (table === 'analytics' && (!data.event_name || !data.user_id)) {
              return Promise.resolve({ data: null, error: { message: 'Validation error' } })
            }
            if (table === 'metrics' && (!data.metric_name || !data.user_id)) {
              return Promise.resolve({ data: null, error: { message: 'Validation error' } })
            }
            if (table === 'analytics') {
              return Promise.resolve({ data: [{ ...analyticsRow, ...data, [column]: value }], error: null })
            }
            if (table === 'metrics') {
              return Promise.resolve({ data: [{ ...metricRow, ...data, [column]: value }], error: null })
            }
            return Promise.resolve({ data: [{ id: value, ...data }], error: null })
          })
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn((column, value) => {
          if (value === 'fail' || value === 999) {
            return Promise.resolve({ data: null, error: { message: 'Not found' } })
          }
          return Promise.resolve({ data: [{ id: value }], error: null })
        })
      }))
    }
  }),
  auth: {
    signInWithPassword: vi.fn(({ email, password }) => {
      if (email === 'fail@example.com' || password === 'wrong') {
        return Promise.resolve({ data: { user: null }, error: { message: 'Invalid credentials' } })
      }
      return Promise.resolve({ 
        data: { user: { id: 1, email }, session: { access_token: 'test-token' } }, 
        error: null 
      })
    }),
    signUp: vi.fn(({ email, password }) => {
      if (email === 'fail@example.com') {
        return Promise.resolve({ data: { user: null }, error: { message: 'User already exists' } })
      }
      return Promise.resolve({ 
        data: { user: { id: 1, email }, session: { access_token: 'test-token' } }, 
        error: null 
      })
    }),
    getUser: vi.fn(() => Promise.resolve({ data: { user: { id: 1, email: 'test@example.com' } }, error: null }))
  }
}

vi.mock('./src/services/supabase.service.js', () => ({ supabase: supabaseMock }))
vi.mock('./src/lib/supabase.js', () => ({ supabase: supabaseMock }))
vi.mock('@supabase/supabase-js', () => ({ createClient: vi.fn(() => supabaseMock) }))

// ============================================================================
// MOCKS DE LOGGER Y LOGACTION
// ============================================================================

const loggerMock = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  child: vi.fn(function() { return this }),
  bindings: vi.fn(() => ({}))
}

// Mock parcial: solo mockear el logger base, dejar logAction real
vi.mock('./src/services/logger.service.js', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    default: loggerMock,
    logger: loggerMock,
  }
})

// ============================================================================
// MOCKS DE POSTHOG
// ============================================================================

const posthogMock = {
  capture: vi.fn(({ distinctId, event, properties }) => {
    console.log(`PostHog event: ${event}`, { distinctId, properties })
    return Promise.resolve()
  }),
  shutdown: vi.fn(() => Promise.resolve())
}

vi.mock('posthog-node', () => ({ PostHog: vi.fn(() => posthogMock) }))
vi.mock('./src/services/posthog.service.js', () => ({
  posthog: posthogMock,
  PostHogService: {
    captureEvent: vi.fn((userId, event, properties = {}) => posthogMock.capture({ distinctId: userId, event, properties })),
    flush: vi.fn(async () => { await posthogMock.shutdown() })
  },
  _test: { posthogClient: posthogMock }
}))

// ============================================================================
// MOCKS DE AUTH MIDDLEWARE
// ============================================================================

const authMiddlewareMock = vi.fn((req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || authHeader === 'Bearer fail') {
    return res.status(401).json({ error: 'No autorizado' })
  }
  if (authHeader === 'Bearer invalid') {
    return res.status(401).json({ error: 'Token inválido' })
  }
  // Simular usuario válido
  req.user = { id: 1, email: 'test@example.com' }
  next()
})

vi.mock('./src/middleware/auth.middleware.js', () => ({ authMiddleware: authMiddlewareMock }))

// ============================================================================
// MOCKS DE STRIPE
// ============================================================================

vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation(() => ({
    customers: { 
      create: vi.fn().mockResolvedValue({ id: 'cus_test' }), 
      retrieve: vi.fn().mockResolvedValue({ id: 'cus_test' }) 
    },
    subscriptions: { 
      create: vi.fn().mockResolvedValue({ id: 'sub_test' }), 
      retrieve: vi.fn().mockResolvedValue({ id: 'sub_test' }) 
    },
    paymentIntents: { 
      create: vi.fn().mockResolvedValue({ id: 'pi_test' }) 
    }
  }))
}))

// ============================================================================
// MOCKS DE OPENAI
// ============================================================================

vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: { 
      completions: { 
        create: vi.fn().mockResolvedValue({ 
          choices: [{ message: { content: 'Test response' } }] 
        }) 
      } 
    }
  }))
}))

// ============================================================================
// MOCKS DE RESEND
// ============================================================================

vi.mock('resend', () => ({
  default: vi.fn().mockImplementation(() => ({ 
    emails: { 
      send: vi.fn().mockResolvedValue({ id: 'email_test' }) 
    } 
  }))
}))

// ============================================================================
// MOCKS DE PINO
// ============================================================================

vi.mock('pino-http', () => ({
  default: vi.fn(() => (req, res, next) => next()),
  pinoHttp: vi.fn(() => (req, res, next) => next())
}))

vi.mock('pino', () => ({
  default: vi.fn(() => ({
    info: vi.fn(), 
    warn: vi.fn(), 
    error: vi.fn(), 
    child: vi.fn(function() { return this }), 
    bindings: vi.fn(() => ({}))
  })),
  pino: vi.fn(() => ({
    info: vi.fn(), 
    warn: vi.fn(), 
    error: vi.fn(), 
    child: vi.fn(function() { return this }), 
    bindings: vi.fn(() => ({}))
  }))
}))

// ============================================================================
// MOCKS DE SERVICIOS ESPECÍFICOS
// ============================================================================

// Mock para config.service.js
vi.mock('./src/services/config.service.js', () => ({
  getConfig: vi.fn(() => ({
    supabase: { url: 'https://test.supabase.co', key: 'test-key' },
    jwt: { secret: 'test-secret' },
    stripe: { secretKey: 'test-stripe-key' },
    openai: { apiKey: 'test-openai-key' },
    posthog: { apiKey: 'test-posthog-key' },
    resend: { apiKey: 'test-resend-key' }
  }))
}))

// Mock para schemas.js
vi.mock('./src/lib/schemas.js', () => ({
  authSchema: {
    parse: vi.fn((data) => {
      if (!data.email || !data.password) {
        throw new Error('Email and password are required')
      }
      return data
    })
  },
  numericIdParamSchema: {
    parse: vi.fn((data) => {
      const id = parseInt(data.id)
      if (isNaN(id) || id <= 0) {
        throw new Error('Invalid ID')
      }
      return { id }
    })
  },
  pricingSchema: {
    parse: vi.fn((data) => {
      if (!data.name || !data.price) {
        throw new Error('Name and price are required')
      }
      return data
    })
  }
}))

// Mock para ApiError
vi.mock('./src/utils/ApiError.js', () => ({
  ApiError: class ApiError extends Error {
    statusCode: number
    constructor(statusCode: number, message: string) {
      super(message)
      this.statusCode = statusCode
      this.name = 'ApiError'
    }
  }
}))

// ============================================================================
// MOCKS DE TIPOS SUPABASE
// ============================================================================

vi.mock('./src/types/supabase.types.js', () => ({
  Database: {
    public: {
      Tables: {
        profiles: {
          Row: { id: 1, email: 'test@example.com', created_at: new Date() },
          Insert: { email: 'test@example.com' },
          Update: { email: 'updated@example.com' }
        },
        todos: {
          Row: { id: 1, title: 'Test Todo', user_id: 1, created_at: new Date() },
          Insert: { title: 'Test Todo', user_id: 1 },
          Update: { title: 'Updated Todo' }
        }
      }
    }
  },
  TablesInsert: { email: 'test@example.com' },
  TablesUpdate: { email: 'updated@example.com' }
}))

// ============================================================================
// MOCKS DE ANALYTICS
// ============================================================================

// Mock para analytics.service.js
vi.mock('./src/services/analytics.service.js', () => ({
  analyticsService: {
    trackEvent: vi.fn(async (eventData) => ({
      id: 1,
      event_name: eventData.event_name,
      user_id: eventData.user_id,
      created_at: new Date().toISOString()
    })),
    trackMetric: vi.fn(async (metricData) => ({
      id: 1,
      metric_name: metricData.metric_name,
      value: metricData.value,
      user_id: metricData.user_id,
      created_at: new Date().toISOString()
    })),
    getEvents: vi.fn(async (query) => [
      { id: 1, event_name: 'test_event', user_id: 'test-user-id', created_at: new Date().toISOString() }
    ]),
    getMetrics: vi.fn(async (query) => [
      { id: 1, metric_name: 'test_metric', user_id: 'test-user-id', created_at: new Date().toISOString() }
    ]),
    getAnalyticsSummary: vi.fn(async (startDate, endDate) => ({
      total_events: 100,
      unique_users: 50,
      top_events: [{ event_name: 'test_event', count: 10 }],
      daily_events: [{ date: '2025-07-01', count: 25 }]
    })),
    getUserAnalytics: vi.fn(async (userId) => {
      if (userId === 'non-existent-user' || userId === '') {
        const ApiError = class ApiError extends Error {
          constructor(statusCode, message) {
            super(message)
            this.statusCode = statusCode
            this.name = 'ApiError'
          }
        }
        throw new ApiError(404, 'No analytics data found for user')
      }
      return {
        user_id: userId,
        total_events: 10,
        last_seen: new Date(),
        events_breakdown: [{ event_name: 'test_event', count: 5 }]
      }
    }),
    getAllAnalytics: vi.fn(async () => [
      { id: 1, event_name: 'test_event', user_id: 'test-user-id', created_at: new Date().toISOString() },
      { id: 2, event_name: 'another_event', user_id: 'test-user-id', created_at: new Date().toISOString() }
    ]),
    createAnalytics: vi.fn(async (analytics) => ({
      id: 1,
      event_name: analytics.event_name,
      user_id: analytics.user_id,
      created_at: new Date().toISOString()
    })),
    updateAnalytics: vi.fn(async (id, analytics) => ({
      id,
      event_name: analytics.event_name,
      user_id: analytics.user_id,
      created_at: new Date().toISOString()
    })),
    deleteAnalytics: vi.fn(async (id) => ({ id }))
  },
  eventSchema: {
    parse: vi.fn((data) => {
      if (!data.event_name) {
        const ZodError = class ZodError extends Error {
          constructor(message) {
            super(message)
            this.name = 'ZodError'
            this.errors = [{ message, path: ['event_name'] }]
          }
        }
        throw new ZodError('event_name is required')
      }
      if (typeof data.event_name !== 'string') {
        const ZodError = class ZodError extends Error {
          constructor(message) {
            super(message)
            this.name = 'ZodError'
            this.errors = [{ message, path: ['event_name'] }]
          }
        }
        throw new ZodError('event_name must be a string')
      }
      return data
    })
  },
  metricSchema: {
    parse: vi.fn((data) => {
      if (!data.metric_name) {
        const ZodError = class ZodError extends Error {
          constructor(message) {
            super(message)
            this.name = 'ZodError'
            this.errors = [{ message, path: ['metric_name'] }]
          }
        }
        throw new ZodError('metric_name is required')
      }
      if (typeof data.value !== 'number') {
        const ZodError = class ZodError extends Error {
          constructor(message) {
            super(message)
            this.name = 'ZodError'
            this.errors = [{ message, path: ['value'] }]
          }
        }
        throw new ZodError('value must be a number')
      }
      return data
    })
  },
  analyticsQuerySchema: {
    parse: vi.fn((query) => {
      if (query.limit && (isNaN(query.limit) || query.limit > 1000)) {
        const ZodError = class ZodError extends Error {
          constructor(message) {
            super(message)
            this.name = 'ZodError'
            this.errors = [{ message, path: ['limit'] }]
          }
        }
        throw new ZodError('Invalid limit')
      }
      if (query.offset && isNaN(query.offset)) {
        const ZodError = class ZodError extends Error {
          constructor(message) {
            super(message)
            this.name = 'ZodError'
            this.errors = [{ message, path: ['offset'] }]
          }
        }
        throw new ZodError('Invalid offset')
      }
      return query
    })
  }
}))

// ============================================================================
// CLEANUP
// ============================================================================

afterAll(() => { 
  vi.clearAllMocks() 
})
