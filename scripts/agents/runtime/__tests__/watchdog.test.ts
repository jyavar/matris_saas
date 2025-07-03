import { describe, expect, it, vi } from 'vitest'

import runAgent from '../watchdog'

describe('@runtime agent', () => {
  it('debe generar output correctamente', async () => {
    const mockWrite = vi.fn()
    await runAgent({ writeFileSync: mockWrite })
    expect(mockWrite).toHaveBeenCalled()
    const [, data] = mockWrite.mock.calls[0]
    const log = JSON.parse(data)
    expect(log).toHaveProperty('timestamp')
    expect(log).toHaveProperty('agentName', '@runtime')
    expect(log).toHaveProperty('status')
    expect(log).toHaveProperty('errors')
    expect(Array.isArray(log.errors)).toBe(true)
    expect(log).toHaveProperty('actionsPerformed')
    expect(Array.isArray(log.actionsPerformed)).toBe(true)
    expect(log).toHaveProperty('uptime')
    expect(typeof log.uptime).toBe('number')
  })
})
