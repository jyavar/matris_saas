import { describe, expect, it } from 'vitest'

import { FiverrWriterAgent } from './executor'

describe('FiverrWriterAgent', () => {
  it('debe tomar y entregar un gig', async () => {
    const agent = new FiverrWriterAgent('FAKE_API_KEY')
    const gigs = await agent.fetchOpenGigs()
    expect(gigs.length).toBeGreaterThan(0)
    const gig = gigs[0]
    const taken = await agent.takeGig(gig.id)
    expect(taken).toBeDefined()
    const article = await agent.writeArticle(gig)
    expect(article.content).toContain(gig.description)
    const delivered = await agent.deliverArticle(gig, article)
    expect(delivered).toBe(true)
    expect(gig.status).toBe('delivered')
  })
})
