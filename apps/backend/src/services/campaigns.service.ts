export interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused'
}

const campaigns: Campaign[] = []

export class CampaignsService {
  static list(): Campaign[] {
    return campaigns
  }
  static create(name: string): Campaign {
    const campaign = { id: String(Date.now()), name, status: 'active' as const }
    campaigns.push(campaign)
    return campaign
  }
  static delete(id: string): boolean {
    const idx = campaigns.findIndex((c) => c.id === id)
    if (idx === -1) return false
    campaigns.splice(idx, 1)
    return true
  }
}
