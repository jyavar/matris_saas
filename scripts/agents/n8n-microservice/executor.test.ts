import { describe, expect, it } from 'vitest'

import { N8nMicroserviceAgent } from './executor'

describe('N8nMicroserviceAgent', () => {
  it('debe ejecutar y entregar un microservicio', async () => {
    const agent = new N8nMicroserviceAgent('FAKE_API_KEY')
    const jobs = await agent.fetchPendingJobs()
    expect(jobs.length).toBeGreaterThan(0)
    const job = jobs[0]
    const taken = await agent.takeJob(job.id)
    expect(taken).toBeDefined()
    const result = await agent.executeService(job)
    expect(result.success).toBe(true)
    const delivered = await agent.deliverResult(job, result)
    expect(delivered).toBe(true)
    expect(job.status).toBe('completed')
  })
})
