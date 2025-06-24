import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '../index'
import { generateUser } from './fixtures'

describe('Profiles Controller', () => {
  // let user: unknown // No se usa
  let token: string

  beforeAll(async () => {
    // let user = await generateUser('profiles')
    // Aquí deberías obtener un token real si tienes endpoint de login
    token = '' // TODO: obtener token real si es posible
  })

  it('debe devolver 400 al crear perfil con datos inválidos', async () => {
    const res = await request(app)
      .post('/profiles')
      .send({})
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(400)
  })

  it('debe devolver 404 al obtener perfil inexistente', async () => {
    const res = await request(app)
      .get('/profiles/00000000-0000-0000-0000-000000000999')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(404)
  })

  it('debe devolver 403 al intentar actualizar perfil de otro usuario', async () => {
    const otherUser = await generateUser('other')
    const res = await request(app)
      .put(`/profiles/${otherUser.profile.id}`)
      .send({ email: 'otro@email.com' })
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(403)
  })
})
