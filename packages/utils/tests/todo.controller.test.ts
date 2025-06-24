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

describe.skip('Todo Controller', () => {
  let authHeaders: Record<string, string>
  let testProfile: TestProfile

  beforeEach(async () => {
    await resetDatabase()
    testProfile = await seedTestProfile()
    authHeaders = getMockedAuthHeaders(
      testProfile.user.id,
      testProfile.tenant.id,
    )
  })

  it('debe devolver 400 al crear todo vacío o inválido', async () => {
    const res = await request(app).post('/todos').send({}).set(authHeaders)
    expect(res.status).toBe(400)
  })

  it('debe devolver 404 al eliminar todo inexistente', async () => {
    const res = await request(app)
      .delete('/todos/00000000-0000-0000-0000-000000000999')
      .set(authHeaders)
    expect(res.status).toBe(404)
  })

  it('debe devolver 200 y array vacío al obtener todos cuando no hay ninguno', async () => {
    const res = await request(app).get('/todos').set(authHeaders)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(0)
  })
})
