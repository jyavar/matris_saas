import { describe, expect, it, vi } from 'vitest'

import runAgent from '../backup'

describe('@data agent', () => {
  it('debe generar output correctamente', async () => {
    const mockWrite = vi.fn()
    const mockMkdir = vi.fn()
    const mockRead = vi.fn(() => ['file1.md', 'file2.md'])
    const mockCopy = vi.fn()
    await runAgent({
      writeFileSync: mockWrite,
      mkdirSync: mockMkdir,
      readdirSync: mockRead,
      copyFileSync: mockCopy,
    })
    expect(mockWrite).toHaveBeenCalled()
    expect(mockMkdir).toHaveBeenCalled()
    expect(mockRead).toHaveBeenCalled()
    expect(mockCopy).toHaveBeenCalled()
  })
})
