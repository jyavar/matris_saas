import { beforeEach, describe, expect, it, vi } from 'vitest'

function cronMock() {
  return {
    default: {
      schedule: vi.fn(() => ({
        stop: vi.fn(),
        start: vi.fn(),
        destroy: vi.fn(),
      })),
    },
  }
}

describe('RuntimeService', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
    // Limpiar jobs global si existe
    if (globalThis.jobs) {
      for (const k of Object.keys(globalThis.jobs)) delete globalThis.jobs[k]
    }
  })

  it('crea un job nuevo', async () => {
    vi.mock('node-cron', cronMock)
    vi.resetModules()
    const { RuntimeService } = await import('../runtime.service.js')
    const job = RuntimeService.createJob('job-1', '* * * * *', () => {})
    expect(job).toHaveProperty('id', 'job-1')
    expect(job.running).toBe(true)
  })

  it('lanza error si el job ya existe', async () => {
    vi.mock('node-cron', cronMock)
    vi.resetModules()
    const { RuntimeService } = await import('../runtime.service.js')
    RuntimeService.createJob('job-2', '* * * * *', () => {})
    expect(() =>
      RuntimeService.createJob('job-2', '* * * * *', () => {}),
    ).toThrow('Job already exists')
  })

  it('lista jobs', async () => {
    vi.resetModules()
    const { RuntimeService } = await import('../runtime.service.js')
    const jobs = RuntimeService.listJobs()
    expect(Array.isArray(jobs)).toBe(true)
  })

  it('pausa, reanuda y elimina job', async () => {
    vi.mock('node-cron', cronMock)
    vi.resetModules()
    const { RuntimeService } = await import('../runtime.service.js')
    RuntimeService.createJob('job-3', '* * * * *', () => {})
    expect(() => RuntimeService.pauseJob('job-3')).not.toThrow()
    expect(() => RuntimeService.resumeJob('job-3')).not.toThrow()
    expect(() => RuntimeService.deleteJob('job-3')).not.toThrow()
  })

  it('runAgent éxito', async () => {
    const importer: (
      path: string,
    ) => Promise<{ runAgent: () => Promise<string> }> = async () => ({
      runAgent: vi.fn(async () => 'ok'),
    })
    const { RuntimeService } = await import('../runtime.service.js')
    const res = await RuntimeService.runAgent(
      'refactor',
      { test: true },
      importer,
    )
    expect(res.ok).toBe(true)
    expect(res.result).toBe('ok')
  })

  it('runAgent error por agente no registrado', async () => {
    const { RuntimeService } = await import('../runtime.service.js')
    const res = await RuntimeService.runAgent('nope')
    expect(res.ok).toBe(false)
    expect(res.error).toMatch(/no registrado/i)
  })
})
