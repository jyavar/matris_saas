import { describe, expect, it } from 'vitest'

import { PostHogService } from '../posthog.service.js'

describe('PostHogService', () => {
  // Métodos estáticos - tests simples sin mocks complejos
  describe('captureEvent (static method)', () => {
    it('should handle missing PostHog configuration gracefully', () => {
      const originalEnv = process.env.POSTHOG_API_KEY
      delete process.env.POSTHOG_API_KEY

      // Simplemente verificar que no lanza error
      expect(() => {
        PostHogService.captureEvent('user-123', 'test_event')
      }).not.toThrow()

      if (originalEnv) process.env.POSTHOG_API_KEY = originalEnv
    })
  })

  describe('flush (static method)', () => {
    it('should handle missing PostHog configuration gracefully', async () => {
      const originalEnv = process.env.POSTHOG_API_KEY
      delete process.env.POSTHOG_API_KEY

      await expect(PostHogService.flush()).resolves.toBeUndefined()

      if (originalEnv) process.env.POSTHOG_API_KEY = originalEnv
    })
  })
})
