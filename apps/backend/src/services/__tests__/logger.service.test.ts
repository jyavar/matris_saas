import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock pino antes de importar el servicio
const mockPino = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}

vi.mock('pino', () => ({
  pino: vi.fn(() => mockPino)
}))

import { logAction } from '../logger.service.js'

describe('logAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('logea acción con detalles', () => {
    logAction('LOGIN', 'user-1', { foo: 'bar' })
    expect(mockPino.info).toHaveBeenCalledWith(
      { action: 'LOGIN', userId: 'user-1', foo: 'bar' },
      'Action: LOGIN'
    )
  })

  it('logea acción sin detalles', () => {
    logAction('LOGOUT', 'user-2')
    expect(mockPino.info).toHaveBeenCalledWith(
      { action: 'LOGOUT', userId: 'user-2' },
      'Action: LOGOUT'
    )
  })

  it('lanza error si falta userId', () => {
    expect(() => logAction('LOGIN', '', {})).toThrow('userId is required')
  })

  it('lanza error si userId es undefined', () => {
    expect(() => logAction('LOGIN', undefined as any, {})).toThrow('userId is required')
  })
})
