import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { logAction } from '../logger.service.js'
import * as PostHog from '../posthog.service.js'

describe('logAction', () => {
  let posthogSpy: ReturnType<typeof vi.spyOn>
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    posthogSpy = vi
      .spyOn(PostHog.PostHogService, 'captureEvent')
      .mockImplementation(() => {})
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('logea acción y llama a PostHog', () => {
    logAction('LOGIN', 'user-1', { foo: 'bar' })
    expect(posthogSpy).toHaveBeenCalledWith('user-1', 'LOGIN', { foo: 'bar' })
  })

  it('logea acción sin detalles', () => {
    logAction('LOGOUT', 'user-2')
    expect(posthogSpy).toHaveBeenCalledWith('user-2', 'LOGOUT', {})
  })

  it('lanza error si falta userId', () => {
    expect(() => logAction('LOGIN', '', {})).toThrow('userId is required')
  })
})
