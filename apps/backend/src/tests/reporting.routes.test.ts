import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { server } from '../index'

describe('Reporting Routes', () => {
  it('GET /api/reporting/usage devuelve un reporte de uso', async () => {
    const res = await request(server).get('/api/reporting/usage?period=2024-07')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('totalUsers')
    expect(res.body).toHaveProperty('activeUsers')
    expect(res.body).toHaveProperty('totalEvents')
    expect(res.body).toHaveProperty('period', '2024-07')
  })

  it('GET /api/reporting/usage responde error si el periodo no existe', async () => {
    const res = await request(server).get('/api/reporting/usage?period=2099-01')
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

  it('GET /api/reporting/event devuelve un reporte de evento', async () => {
    const res = await request(server).get(
      '/api/reporting/event?event=login&period=2024-07',
    )
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('event', 'login')
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('period', '2024-07')
  })

  it('GET /api/reporting/event responde error si el evento no existe', async () => {
    const res = await request(server).get(
      '/api/reporting/event?event=logout&period=2024-07',
    )
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

  it('GET /api/reporting/event responde error si el periodo no existe', async () => {
    const res = await request(server).get(
      '/api/reporting/event?event=login&period=2099-01',
    )
    expect(res.status).toBeGreaterThanOrEqual(400)
  })
})
