import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('stripe', () => {
  return {
    default: vi
      .fn()
      .mockImplementation((key: string, opts: Record<string, unknown>) => ({
        _key: key,
        _opts: opts,
        charges: { create: vi.fn() },
      })),
  }
})

describe('stripe.service', () => {
  const OLD_ENV = process.env
  beforeEach(() => {
    vi.resetModules()
    process.env = { ...OLD_ENV, STRIPE_SECRET_KEY: 'sk_test_123' }
  })

  it('inicializa Stripe con la clave y versión correcta', async () => {
    const mod = await import('../stripe.service.js')
    const mockStripe = mod.stripe as {
      _key: string
      _opts: { apiVersion: string }
    }
    expect(mockStripe._key).toBe('sk_test_123')
    expect(mockStripe._opts.apiVersion).toBe('2025-05-28.basil')
  })

  it('lanza error si STRIPE_SECRET_KEY no está definida', async () => {
    process.env.STRIPE_SECRET_KEY = ''
    await expect(import('../stripe.service.js')).rejects.toThrow(
      'STRIPE_SECRET_KEY no está definida en el entorno',
    )
  })
})
