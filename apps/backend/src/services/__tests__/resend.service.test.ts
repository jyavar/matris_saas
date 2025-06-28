import { describe, expect, it, vi } from 'vitest'

import { ResendService } from '../resend.service.js'

describe('ResendService', () => {
  it('envía email exitosamente', async () => {
    const spy = vi
      .spyOn(ResendService, 'sendEmail')
      .mockResolvedValue({ ok: true, message: 'ok' })
    const res = await ResendService.sendEmail('a@b.com', 'Hola')
    expect(res.ok).toBe(true)
    expect(spy).toHaveBeenCalledWith('a@b.com', 'Hola')
  })

  it('lanza error si falla el envío', async () => {
    vi.spyOn(ResendService, 'sendEmail').mockRejectedValue(new Error('fail'))
    await expect(ResendService.sendEmail('a@b.com', 'Hola')).rejects.toThrow(
      'fail',
    )
  })
})
