import { vi } from 'vitest'

export const loggerMock = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  child: vi.fn(function () { return loggerMock }),
  bindings: vi.fn(() => ({})),
}

export const posthogMock = {
  capture: vi.fn(),
  shutdown: vi.fn(),
}

export const logActionMock = vi.fn((action, userId, details = {}) => {
  if (!userId) throw new Error('userId is required')
  loggerMock.info({ userId, action, details }, `Action: ${action}`)
  posthogMock.capture(userId, action, details)
  return { userId, action, details }
}) 