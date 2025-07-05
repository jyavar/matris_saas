import { describe, expect, it } from 'vitest'

import { UpworkTranscriberAgent } from './executor'

describe('UpworkTranscriberAgent', () => {
  it('debe tomar y entregar un trabajo de transcripción', async () => {
    const agent = new UpworkTranscriberAgent('FAKE_API_KEY')
    const jobs = await agent.fetchOpenJobs()
    expect(jobs.length).toBeGreaterThan(0)
    const job = jobs[0]
    const taken = await agent.takeJob(job.id)
    expect(taken).toBeDefined()
    const audio = await agent.downloadAudio(job)
    expect(audio).toBeInstanceOf(Buffer)
    const text = await agent.transcribeAudio(audio)
    expect(typeof text).toBe('string')
    const delivered = await agent.deliverTranscript(job, {
      jobId: job.id,
      text,
    })
    expect(delivered).toBe(true)
    expect(job.status).toBe('delivered')
  })
})
