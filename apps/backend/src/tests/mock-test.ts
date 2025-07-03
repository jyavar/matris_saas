import { describe, expect, it, vi } from 'vitest'

describe('Mock Verification', () => {
  it('should verify that mocks are working', async () => {
    // Verificar que los mocks están siendo aplicados
    expect(vi.isMockFunction).toBeDefined()

    // Verificar que los mocks de schemas están funcionando
    const { eventSchema } = await import('../services/analytics.service.js')
    expect(eventSchema.parse).toBeDefined()

    // Verificar que el mock lanza error para datos inválidos
    expect(() => {
      eventSchema.parse({})
    }).toThrow('event_name is required')
  })
})
