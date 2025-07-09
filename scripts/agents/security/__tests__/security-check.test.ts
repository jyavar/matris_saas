import { describe, expect, it, vi } from 'vitest'

import runAgent from '../security-check'

describe('@security agent', () => {
  it('debe generar output correctamente', async () => {
    const mockWrite = vi.fn()
    const mockRead = vi.fn(() => 'test content')
    const mockExists = vi.fn(() => true)
    const mockStat = vi.fn(() => ({ mode: 0o644 }))
    
    await runAgent({ 
      writeFileSync: mockWrite,
      readFileSync: mockRead,
      existsSync: mockExists,
      statSync: mockStat,
    })
    
    expect(mockWrite).toHaveBeenCalled()
    const calls = mockWrite.mock.calls
    if (calls && calls.length > 0 && calls[0]) {
      const [, data] = calls[0]
      const log = JSON.parse(data as string)
      expect(log).toHaveProperty('timestamp')
      expect(log).toHaveProperty('agentName', '@security')
      expect(log).toHaveProperty('status')
      expect(log).toHaveProperty('errors')
      expect(Array.isArray(log.errors)).toBe(true)
      expect(log).toHaveProperty('actionsPerformed')
      expect(Array.isArray(log.actionsPerformed)).toBe(true)
    }
  })

  it('debe manejar errores de filesystem', async () => {
    const mockWrite = vi.fn()
    const mockRead = vi.fn(() => 'test content')
    const mockExists = vi.fn(() => false) // Simular que no existen archivos
    const mockStat = vi.fn(() => ({ mode: 0o644 }))
    
    await runAgent({ 
      writeFileSync: mockWrite,
      readFileSync: mockRead,
      existsSync: mockExists,
      statSync: mockStat,
    })
    
    expect(mockWrite).toHaveBeenCalled()
  })
})
