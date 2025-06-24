import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '../index'

describe('Analytics Controller', () => {
  // let user: unknown // No se usa
  let token: string

  beforeAll(async () => {
    // let user = await generateUser('analytics')
    // Aquí deberías obtener un token real si tienes endpoint de login
    token = '' // TODO: obtener token real si es posible
  })

  it('debe devolver 400 si la query es malformada', async () => {
    const res = await request(app)
      .get('/analytics')
      .query({ invalid: 'param' })
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(400)
  })

  it('debe devolver 401 si no hay token', async () => {
    const res = await request(app).get('/analytics')
    expect(res.status).toBe(401)
  })

  it('debe devolver 200 y datos vacíos si el usuario no tiene históricos', async () => {
    const res = await request(app)
      .get('/analytics')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })
})
