import { describe, expect, it } from 'vitest'

import { FreelancerLeadgenAgent } from './executor'

describe('FreelancerLeadgenAgent', () => {
  it('debe generar y enviar propuestas', async () => {
    const agent = new FreelancerLeadgenAgent('FAKE_API_KEY')
    const projects = await agent.fetchOpenProjects()
    expect(projects.length).toBeGreaterThan(0)
    const project = projects[0]
    const proposal = await agent.generateProposal(project)
    expect(proposal.projectId).toBe(project.id)
    const sent = await agent.sendProposal(proposal)
    expect(sent).toBe(true)
    const tracked = await agent.trackProposals()
    expect(Array.isArray(tracked)).toBe(true)
  })
})
