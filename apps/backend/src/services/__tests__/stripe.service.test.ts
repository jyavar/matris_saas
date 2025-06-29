import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('StripeService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should throw error when STRIPE_SECRET_KEY is not defined', async () => {
    // Mock environment to not have STRIPE_SECRET_KEY
    const originalEnv = process.env.STRIPE_SECRET_KEY
    delete process.env.STRIPE_SECRET_KEY

    await expect(import('../stripe.service.js')).rejects.toThrow(
      'STRIPE_SECRET_KEY is not defined',
    )

    // Restore environment
    process.env.STRIPE_SECRET_KEY = originalEnv
  })

  it('should initialize Stripe with correct configuration', async () => {
    process.env.STRIPE_SECRET_KEY = 'test_stripe_key'

    const mod = await import('../stripe.service.js')
    const mockStripe = mod.stripe as unknown as {
      _key: string
      _opts: { apiVersion: string }
    }

    expect(mockStripe._key).toBe('test_stripe_key')
    expect(mockStripe._opts.apiVersion).toBe('2024-06-20')
  })
})
