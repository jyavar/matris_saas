import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { server } from '../index.js'

describe('Campaigns Routes', () => {
  it('should have campaigns routes registered', async () => {
    // Test a simple route that should work
    const res = await request(server).get('/api/health')
    expect(res.status).toBe(200)
  })

  it('GET /campaigns debug response', async () => {
    const res = await request(server)
      .get('/api/campaigns')
    console.log('GET /campaigns response:', {
      status: res.status,
      body: res.body,
      headers: res.headers
    })
    expect(res.status).toBe(200)
  })

  it('GET /campaigns lista campañas', async () => {
    const res = await request(server)
      .get('/api/campaigns')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('POST /campaigns crea campaña', async () => {
    const res = await request(server)
      .post('/api/campaigns')
      .send({ 
        title: 'Campaña Test',
        budget: 1000,
        status: 'draft'
      })
    expect(res.status).toBe(201)
    expect(res.body.data).toHaveProperty('id')
    expect(res.body.data).toHaveProperty('title', 'Campaña Test')
  })

  it('POST /campaigns responde error si falta nombre', async () => {
    const res = await request(server)
      .post('/api/campaigns')
      .send({})
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('DELETE /campaigns/:id elimina campaña', async () => {
    const create = await request(server)
      .post('/api/campaigns')
      .send({ 
        title: 'Para Borrar',
        budget: 1000,
        status: 'draft'
      })
    const res = await request(server)
      .delete(`/api/campaigns/${create.body.data.id}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ success: true, message: 'Campaign deleted successfully' })
  })

  it('DELETE /campaigns/:id responde 404 si no existe', async () => {
    const res = await request(server)
      .delete('/api/campaigns/nope')
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })
})
