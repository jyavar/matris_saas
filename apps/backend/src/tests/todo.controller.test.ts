import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '../index'

describe('Todo Controller', () => {
  // let user: unknown // No se usa
  let token: string

  beforeAll(async () => {
    // let user = await generateUser('todo')
    // Aquí deberías obtener un token real si tienes endpoint de login
    token = '' // TODO: obtener token real si es posible
  })

  it('debe devolver 400 al crear todo vacío o inválido', async () => {
    const res = await request(app)
      .post('/todos')
      .send({})
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(400)
  })

  it('debe devolver 404 al eliminar todo inexistente', async () => {
    const res = await request(app)
      .delete('/todos/00000000-0000-0000-0000-000000000999')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(404)
  })

  it('debe devolver 200 y array vacío al obtener todos cuando no hay ninguno', async () => {
    const res = await request(app)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(0)
  })
})
