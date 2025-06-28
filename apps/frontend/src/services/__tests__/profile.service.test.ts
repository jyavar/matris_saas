import { describe, expect, it } from 'vitest'

import { getProfile, updateProfile } from '../profile.service'

describe('profile.service', () => {
  it('getProfile retorna perfil demo', async () => {
    const res = await getProfile('user-1')
    expect(res).toHaveProperty('id', 'user-1')
    expect(res).toHaveProperty('username', 'demo')
  })

  it('updateProfile actualiza username', async () => {
    const res = await updateProfile('user-2', { username: 'newuser' })
    expect(res).toHaveProperty('id', 'user-2')
    expect(res).toHaveProperty('username', 'newuser')
  })

  it('updateProfile usa username demo si no se pasa', async () => {
    const res = await updateProfile('user-3', {})
    expect(res).toHaveProperty('username', 'demo')
  })
})
