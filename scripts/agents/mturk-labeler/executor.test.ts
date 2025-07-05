import { describe, expect, it } from 'vitest'

import { MturkLabelerAgent } from './executor'

describe('MturkLabelerAgent', () => {
  it('debe tomar y entregar un HIT de etiquetado', async () => {
    const agent = new MturkLabelerAgent('FAKE_API_KEY')
    const hits = await agent.fetchOpenHits()
    expect(hits.length).toBeGreaterThan(0)
    const hit = hits[0]
    const taken = await agent.takeHit(hit.id)
    expect(taken).toBeDefined()
    const image = await agent.downloadImage(hit)
    expect(image).toBeInstanceOf(Buffer)
    const label = await agent.labelImage(image)
    expect(typeof label).toBe('string')
    const delivered = await agent.deliverLabel(hit, label)
    expect(delivered).toBe(true)
    expect(hit.status).toBe('delivered')
    expect(hit.label).toBe(label)
  })
})
