import { vi } from 'vitest'

export const loggerMock: Record<string, unknown> = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  child: vi.fn(function (): typeof loggerMock { return loggerMock }),
  bindings: vi.fn(() => ({})),
}

export const posthogMock = {
  capture: vi.fn(),
  shutdown: vi.fn(),
}

export const logActionMock = vi.fn((action: string, userId: string, details: Record<string, unknown> = {}): void => {
  if (!userId || userId === '') throw new Error('userId is required')
  ;(loggerMock.info as any)({ action, userId, ...details }, `Action: ${action}`)
  posthogMock.capture(userId, action, details)
})

export const logAction = logActionMock 