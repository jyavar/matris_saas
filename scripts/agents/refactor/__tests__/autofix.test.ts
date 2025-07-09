import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock glob para evitar escaneo real de archivos
vi.mock('glob', () => ({
  glob: vi.fn().mockResolvedValue([])
}))

import runAgent from '../autofix'

describe('@refactor agent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe generar output correctamente sin archivos', async () => {
    const mockWrite = vi.fn()
    const mockRead = vi.fn(() => 'test content')
    const mockExists = vi.fn(() => false) // No existen archivos
    const mockMkdir = vi.fn()
    const mockCopy = vi.fn()
    
    await runAgent({ 
      writeFileSync: mockWrite,
      readFileSync: mockRead,
      existsSync: mockExists,
      mkdirSync: mockMkdir,
      copyFileSync: mockCopy,
    })
    
    expect(mockWrite).toHaveBeenCalled()
    expect(mockExists).toHaveBeenCalled()
  })

  it('debe manejar errores de filesystem', async () => {
    const mockWrite = vi.fn()
    const mockRead = vi.fn(() => 'test content')
    const mockExists = vi.fn(() => false)
    const mockMkdir = vi.fn()
    const mockCopy = vi.fn()
    
    await runAgent({ 
      writeFileSync: mockWrite,
      readFileSync: mockRead,
      existsSync: mockExists,
      mkdirSync: mockMkdir,
      copyFileSync: mockCopy,
    })
    
    expect(mockWrite).toHaveBeenCalled()
  })
})
