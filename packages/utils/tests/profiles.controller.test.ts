import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { app } from '../index'
import {
  getMockedAuthHeaders,
  resetDatabase,
  seedTestProfile,
} from './test-utils'

type TestProfile = {
  user: { id: string; email: string }
  profile: { id: string; email: string; tenant_id: string }
  tenant: { id: string }
}

describe.skip('Profiles Controller', () => {
  let authHeaders: Record<string, string>
  let testProfile: TestProfile
  let otherProfile: TestProfile

  beforeEach(async () => {
    await resetDatabase()
    testProfile = await seedTestProfile()
    otherProfile = await seedTestProfile()
    authHeaders = getMockedAuthHeaders(
      testProfile.user.id,
      testProfile.tenant.id,
    )
  })

  it('debe devolver 400 al crear perfil con datos inválidos', async () => {
    const res = await request(app).post('/profiles').send({}).set(authHeaders)
    expect(res.status).toBe(400)
  })

  it('debe devolver 404 al obtener perfil inexistente', async () => {
    const res = await request(app)
      .get('/profiles/00000000-0000-0000-0000-000000000999')
      .set(authHeaders)
    expect(res.status).toBe(404)
  })

  it('debe devolver 403 al intentar actualizar perfil de otro usuario', async () => {
    const res = await request(app)
      .put(`/profiles/${otherProfile.profile.id}`)
      .send({ email: 'otro@email.com' })
      .set(authHeaders)
    expect(res.status).toBe(403)
  })
})
