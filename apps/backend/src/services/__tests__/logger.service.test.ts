import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { logAction } from '../logger.service.js'

describe('logAction', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>
  
  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('logea acción con detalles', () => {
    logAction('LOGIN', 'user-1', { foo: 'bar' })
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('logea acción sin detalles', () => {
    logAction('LOGOUT', 'user-2')
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('lanza error si falta userId', () => {
    expect(() => logAction('LOGIN', '', {})).toThrow('userId is required')
  })

  it('lanza error si userId es undefined', () => {
    expect(() => logAction('LOGIN', undefined as any, {})).toThrow('userId is required')
  })
})
