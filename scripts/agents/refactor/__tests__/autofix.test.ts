import { describe, expect, it, vi } from 'vitest'

import runAgent from '../autofix'

describe('@refactor agent', () => {
  it('debe generar output correctamente', async () => {
    const mockWrite = vi.fn()
    await runAgent({ writeFileSync: mockWrite })
    expect(mockWrite).toHaveBeenCalled()
  })
})
