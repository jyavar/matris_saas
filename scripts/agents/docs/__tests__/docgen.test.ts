import { describe, expect, it, vi } from 'vitest'

import runAgent from '../docgen'

describe('@docs agent', () => {
  it('debe generar output correctamente', async () => {
    const mockWrite = vi.fn()
    const mockRead = vi.fn(() => ['file1.md', 'file2.md'])
    await runAgent({ writeFileSync: mockWrite, readdirSync: mockRead })
    expect(mockWrite).toHaveBeenCalled()
    expect(mockRead).toHaveBeenCalled()
  })
})
