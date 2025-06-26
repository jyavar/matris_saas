import { beforeEach, describe, expect, it, vi } from 'vitest'

import { _test, PostHogService } from '../services/posthog.service.js'

describe('PostHogService', () => {
  beforeEach(() => {
    if (_test.posthogClient) {
      _test.posthogClient.capture = vi.fn()
      _test.posthogClient.shutdown = vi.fn()
    }
  })

  it('no lanza error si no hay API key', () => {
    expect(() => PostHogService.captureEvent('id', 'event')).not.toThrow()
  })

  it('llama a capture si hay cliente', () => {
    if (_test.posthogClient) {
      PostHogService.captureEvent('id', 'event', { foo: 'bar' })
      expect(_test.posthogClient.capture).toHaveBeenCalledWith({
        distinctId: 'id',
        event: 'event',
        properties: { foo: 'bar' },
      })
    }
  })

  it('llama a shutdown en flush si hay cliente', async () => {
    if (_test.posthogClient) {
      await PostHogService.flush()
      expect(_test.posthogClient.shutdown).toHaveBeenCalled()
    }
  })
})
