import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../index.js'

describe('Campaigns Routes', () => {
  it('GET /campaigns lista campañas', async () => {
    const res = await request(app).get('/api/campaigns')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /campaigns crea campaña', async () => {
    const res = await request(app)
      .post('/api/campaigns')
      .send({ name: 'Campaña Test' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name', 'Campaña Test')
  })

  it('POST /campaigns responde error si falta nombre', async () => {
    const res = await request(app).post('/api/campaigns').send({})
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('DELETE /campaigns/:id elimina campaña', async () => {
    const create = await request(app)
      .post('/api/campaigns')
      .send({ name: 'Para Borrar' })
    const res = await request(app).delete(`/api/campaigns/${create.body.id}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
  })

  it('DELETE /campaigns/:id responde 404 si no existe', async () => {
    const res = await request(app).delete('/api/campaigns/nope')
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })
})
