import { vi } from 'vitest'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// Mock de child_process.execSync
vi.mock('child_process', () => ({
  execSync: vi.fn(() => Buffer.from('mocked output')),
}))

// Mock de fs
vi.mock('fs', () => ({
  readFileSync: vi.fn(() => 'mocked file content'),
  writeFileSync: vi.fn(),
  existsSync: vi.fn(() => true),
  mkdirSync: vi.fn(),
}))

// Mock de path
vi.mock('path', () => ({
  resolve: vi.fn((...args: string[]) => args.join('/')),
  join: vi.fn((...args: string[]) => args.join('/')),
}))

// Mock de console para evitar output en tests
const originalConsole = { ...console }
vi.spyOn(console, 'log').mockImplementation(() => {})
vi.spyOn(console, 'error').mockImplementation(() => {})
vi.spyOn(console, 'warn').mockImplementation(() => {})
vi.spyOn(console, 'info').mockImplementation(() => {})

// Mock de process.env
const originalEnv = { ...process.env }
// Configurar variables de entorno para tests
vi.stubEnv('NODE_ENV', 'test')
vi.stubEnv('STRATO_ENV', 'test')

// Mock de servicios externos que usan los agentes
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn(() => Promise.resolve({ data: { user: { id: 'test-user' } }, error: null })),
      signUp: vi.fn(() => Promise.resolve({ data: { user: { id: 'test-user' } }, error: null })),
      signOut: vi.fn(() => Promise.resolve({ error: null })),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
        insert: vi.fn(() => Promise.resolve({ data: [], error: null })),
        update: vi.fn(() => Promise.resolve({ data: [], error: null })),
        delete: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
    })),
  })),
}))

// Mock de fetch para APIs externas
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ success: true }),
    text: () => Promise.resolve('mocked response'),
  } as Response)
)

// Mock de OpenAI
vi.mock('openai', () => ({
  default: vi.fn(() => ({
    chat: {
      completions: {
        create: vi.fn(() => Promise.resolve({
          choices: [{ message: { content: 'mocked AI response' } }],
        })),
      },
    },
  })),
}))

// Mock de Stripe
vi.mock('stripe', () => ({
  default: vi.fn(() => ({
    paymentIntents: {
      create: vi.fn(() => Promise.resolve({ id: 'pi_test' })),
      retrieve: vi.fn(() => Promise.resolve({ id: 'pi_test', status: 'succeeded' })),
    },
    customers: {
      create: vi.fn(() => Promise.resolve({ id: 'cus_test' })),
      retrieve: vi.fn(() => Promise.resolve({ id: 'cus_test' })),
    },
    subscriptions: {
      create: vi.fn(() => Promise.resolve({ id: 'sub_test' })),
      cancel: vi.fn(() => Promise.resolve({ id: 'sub_test', status: 'canceled' })),
    },
  })),
}))

// Mock de PostHog
vi.mock('posthog-node', () => ({
  PostHog: vi.fn(() => ({
    capture: vi.fn(() => Promise.resolve()),
    identify: vi.fn(() => Promise.resolve()),
    shutdown: vi.fn(() => Promise.resolve()),
  })),
}))

// Mock de Resend
vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: vi.fn(() => Promise.resolve({ id: 'email_test' })),
    },
  })),
}))

// Mock de minimatch
vi.mock('minimatch', () => ({
  minimatch: vi.fn(() => true),
}))

// Mock de zod
vi.mock('zod', () => ({
  z: {
    object: vi.fn(() => ({
      safeParse: vi.fn(() => ({ success: true, data: {} })),
    })),
    string: vi.fn(() => ({})),
    array: vi.fn(() => ({})),
  },
}))

// Setup de cleanup después de cada test
afterEach(() => {
  vi.clearAllMocks()
})

// Setup de cleanup después de todos los tests
afterAll(() => {
  vi.restoreAllMocks()
  // Restaurar console original
  Object.assign(console, originalConsole)
  // Restaurar process.env original
  Object.assign(process.env, originalEnv)
})

// Helper para crear directorios de test
export function createTestDirectories(): void {
  const testDirs = ['logs', 'audit-artifacts', 'backup', 'coverage']
  testDirs.forEach(dir => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
  })
}

// Helper para limpiar archivos de test
export function cleanupTestFiles(): void {
  const testFiles = [
    'logs/context-violations.log',
    'audit-artifacts/reports/qa-audit.json',
    'backup/test-backup.json',
  ]
  testFiles.forEach(file => {
    if (existsSync(file)) {
      // Simular eliminación
      vi.mocked(writeFileSync).mockImplementation(() => {})
    }
  })
}

// Configurar directorios de test al inicio
createTestDirectories() 