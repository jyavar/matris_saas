import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../index.js'
import { RuntimeService } from '../services/runtime.service.js'

describe('Runtime Routes', () => {
  const job = {
    id: 'test-job',
    schedule: '* * * * *',
    running: true,
    task: () => {},
  }

  beforeEach(() => {
    vi.spyOn(RuntimeService, 'createJob').mockImplementation(
      (id, schedule) => ({ id, schedule, running: true, task: () => {} }),
    )
    vi.spyOn(RuntimeService, 'listJobs').mockImplementation(() => [job])
    vi.spyOn(RuntimeService, 'pauseJob').mockImplementation(() => {})
    vi.spyOn(RuntimeService, 'resumeJob').mockImplementation(() => {})
    vi.spyOn(RuntimeService, 'deleteJob').mockImplementation(() => {})
    vi.spyOn(RuntimeService, 'runAgent').mockImplementation(async (name) => {
      if (name === 'refactor') {
        return { ok: true, result: { status: 'success', findings: [] } }
      }
      return { ok: false, error: 'Agente no encontrado' }
    })
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('POST /runtime/jobs crea un job', async () => {
    const res = await request(server).post('/runtime/jobs').send(job)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id', job.id)
    expect(res.body).toHaveProperty('schedule', job.schedule)
    expect(res.body).toHaveProperty('running', true)
  })

  it('GET /runtime/jobs lista jobs', async () => {
    const res = await request(server).get('/api/runtime/jobs')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.some((j) => j.id === job.id)).toBe(true)
  })

  it('POST /runtime/jobs/:id/pause pausa un job', async () => {
    const res = await request(server).post(`/runtime/jobs/${job.id}/pause`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
  })

  it('POST /runtime/jobs/:id/resume reanuda un job', async () => {
    const res = await request(server).post(`/runtime/jobs/${job.id}/resume`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
  })

  it('POST /runtime/agents/:name/run lanza un agente', async () => {
    const res = await request(server)
      .post('/runtime/agents/refactor/run')
      .send({ dryRun: true })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('ok', true)
    expect(res.body).toHaveProperty('result')
    expect(res.body.result).toHaveProperty('status')
    expect(res.body.result).toHaveProperty('findings')
  })

  it('POST /runtime/agents/:name/run responde error si el agente no existe', async () => {
    const res = await request(server).post('/runtime/agents/nope/run')
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('ok', false)
    expect(res.body).toHaveProperty('error')
  })

  it('DELETE /runtime/jobs/:id elimina un job', async () => {
    const res = await request(server).delete(`/runtime/jobs/${job.id}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
  })

  it('POST /runtime/jobs responde error si falta id/schedule', async () => {
    const res = await request(server).post('/runtime/jobs').send({})
    expect(res.status).toBe(400)
  })

  it('POST /runtime/jobs/:id/pause responde 404 si no existe', async () => {
    vi.spyOn(RuntimeService, 'pauseJob').mockImplementation(() => {
      throw new Error('Job not found')
    })
    const res = await request(server).post('/runtime/jobs/nope/pause')
    expect(res.status).toBe(404)
  })
})
