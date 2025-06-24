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

describe.skip('Analytics Controller', () => {
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

  it('debe devolver 400 si la query es malformada', async () => {
    const res = await request(app)
      .get('/analytics')
      .query({ invalid: 'param' })
      .set(authHeaders)
    expect(res.status).toBe(400)
  })

  it('debe devolver 401 si no hay token', async () => {
    const res = await request(app).get('/analytics')
    expect(res.status).toBe(401)
  })

  it('debe devolver 200 y datos vacíos si el usuario no tiene históricos', async () => {
    const res = await request(app).get('/analytics').set(authHeaders)
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })
})
