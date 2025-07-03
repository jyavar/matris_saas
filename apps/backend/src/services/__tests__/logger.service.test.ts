import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock logger
const infoSpy = vi.fn()
const warnSpy = vi.fn()
const mockLogger = { info: infoSpy, warn: warnSpy }

// Mock PostHogService
vi.mock('../posthog.service', () => ({
  PostHogService: {
    captureEvent: vi.fn(),
  },
}))

import { logAction } from '../logAction'
import { PostHogService } from '../posthog.service'

describe('logAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NODE_ENV = 'test'
    delete process.env.POSTHOG_API_KEY
  })

  it('loggea acción correctamente', async () => {
    await logAction('TEST_ACTION', 'user-1', { foo: 'bar' }, mockLogger)
    expect(infoSpy).toHaveBeenCalledWith(
      { action: 'TEST_ACTION', userId: 'user-1', foo: 'bar' },
      'Action: TEST_ACTION',
    )
  })

  it('lanza error si userId es vacío', async () => {
    await expect(logAction('TEST_ACTION', '', {}, mockLogger)).rejects.toThrow(
      'userId is required',
    )
  })

  it('llama a PostHog si está configurado y no es test', async () => {
    process.env.NODE_ENV = 'production'
    process.env.POSTHOG_API_KEY = 'fake-key'
    await logAction('ACTION', 'user-2', { foo: 1 }, mockLogger)
    expect(PostHogService.captureEvent).toHaveBeenCalledWith(
      'user-2',
      'ACTION',
      { foo: 1 },
    )
  })

  it('no llama a PostHog si no hay API_KEY', async () => {
    process.env.NODE_ENV = 'production'
    delete process.env.POSTHOG_API_KEY
    await logAction('ACTION', 'user-3', { foo: 2 }, mockLogger)
    expect(PostHogService.captureEvent).not.toHaveBeenCalled()
  })

  it('loggea advertencia si falla PostHog', async () => {
    process.env.NODE_ENV = 'production'
    process.env.POSTHOG_API_KEY = 'fake-key'
    vi.spyOn(PostHogService, 'captureEvent').mockImplementationOnce(() => {
      throw new Error('fail')
    })
    await logAction('ACTION', 'user-4', { foo: 3 }, mockLogger)
    expect(warnSpy).toHaveBeenCalledWith('PostHog not available')
  })
})
