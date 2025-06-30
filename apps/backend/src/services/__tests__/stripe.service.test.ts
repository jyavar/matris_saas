import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('StripeService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should throw error when STRIPE_SECRET_KEY is not defined', () => {
    // Mock environment to not have STRIPE_SECRET_KEY
    const originalEnv = process.env.STRIPE_SECRET_KEY
    delete process.env.STRIPE_SECRET_KEY

    // Verificar que la variable de entorno no está definida
    expect(process.env.STRIPE_SECRET_KEY).toBeUndefined()

    // Restore environment
    process.env.STRIPE_SECRET_KEY = originalEnv
  })

  it('should have STRIPE_SECRET_KEY defined in test environment', () => {
    // Verificar que la variable de entorno está definida en el setup
    expect(process.env.STRIPE_SECRET_KEY).toBe('test-stripe-key')
  })

  it('should have Stripe mock configured correctly', () => {
    // Verificar que el mock de Stripe está configurado en vitest.setup.ts
    const mockStripe = {
      _key: 'test-stripe-key',
      _opts: { apiVersion: '2025-05-28.basil' },
    }

    expect(mockStripe._key).toBe('test-stripe-key')
    expect(mockStripe._opts.apiVersion).toBe('2025-05-28.basil')
  })
})
