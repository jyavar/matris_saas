import { describe, it, expect, vi, beforeEach, type MockInstance } from 'vitest'
import { CampaignsService, type Campaign, type CreateCampaignRequest, type UpdateCampaignRequest, type CampaignAnalytics } from './campaigns.service'

vi.mock('@/lib/supabase', () => ({
  getSessionToken: vi.fn(() => Promise.resolve('mock-token'))
}))

describe('CampaignsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  describe('list', () => {
    it('should list campaigns', async () => {
      const mockCampaigns: Campaign[] = [
        { id: '1', title: 'Test', budget: 100, status: 'draft' },
        { id: '2', title: 'Test2', budget: 200, status: 'active' }
      ]
      const mockResponse = { campaigns: mockCampaigns, count: 2 }
      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
      const result = await CampaignsService.list()
      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith('/api/campaigns', expect.objectContaining({ headers: expect.any(Object) }))
    })
  })

  describe('getById', () => {
    it('should get campaign by id', async () => {
      const mockCampaign: Campaign = { id: '1', title: 'Test', budget: 100, status: 'draft' }
      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCampaign)
      })
      const result = await CampaignsService.getById('1')
      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockCampaign)
      expect(global.fetch).toHaveBeenCalledWith('/api/campaigns/1', expect.objectContaining({ headers: expect.any(Object) }))
    })
  })

  describe('create', () => {
    it('should create campaign', async () => {
      const request: CreateCampaignRequest = { title: 'New', budget: 100 }
      const mockCampaign: Campaign = { id: '1', title: 'New', budget: 100, status: 'draft' }
      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: mockCampaign })
      })
      const result = await CampaignsService.create(request)
      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockCampaign)
      expect(global.fetch).toHaveBeenCalledWith('/api/campaigns', expect.objectContaining({ method: 'POST', body: JSON.stringify(request) }))
    })
  })

  describe('update', () => {
    it('should update campaign', async () => {
      const request: UpdateCampaignRequest = { title: 'Updated' }
      const mockCampaign: Campaign = { id: '1', title: 'Updated', budget: 100, status: 'active' }
      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCampaign)
      })
      const result = await CampaignsService.update('1', request)
      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockCampaign)
      expect(global.fetch).toHaveBeenCalledWith('/api/campaigns/1', expect.objectContaining({ method: 'PUT', body: JSON.stringify(request) }))
    })
  })

  describe('delete', () => {
    it('should delete campaign', async () => {
      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })
      const result = await CampaignsService.delete('1')
      expect(result.success).toBe(true)
      expect(global.fetch).toHaveBeenCalledWith('/api/campaigns/1', expect.objectContaining({ method: 'DELETE' }))
    })
  })

  describe('pause', () => {
    it('should pause campaign', async () => {
      const mockCampaign: Campaign = { id: '1', title: 'Paused', budget: 100, status: 'paused' }
      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockCampaign) })
      const result = await CampaignsService.pause('1')
      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockCampaign)
      expect(global.fetch).toHaveBeenCalledWith('/api/campaigns/1/pause', expect.objectContaining({ method: 'PATCH' }))
    })
  })

  describe('resume', () => {
    it('should resume campaign', async () => {
      const mockCampaign: Campaign = { id: '1', title: 'Resumed', budget: 100, status: 'active' }
      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockCampaign) })
      const result = await CampaignsService.resume('1')
      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockCampaign)
      expect(global.fetch).toHaveBeenCalledWith('/api/campaigns/1/resume', expect.objectContaining({ method: 'PATCH' }))
    })
  })

  describe('getAnalytics', () => {
    it('should get campaign analytics', async () => {
      const mockAnalytics: CampaignAnalytics = { campaign_id: '1', impressions: 1000, clicks: 100, conversions: 10, spend: 200, ctr: 10, cpa: 20 }
      ;(global.fetch as unknown as MockInstance).mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockAnalytics) })
      const result = await CampaignsService.getAnalytics('1')
      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockAnalytics)
      expect(global.fetch).toHaveBeenCalledWith('/api/campaigns/1/analytics', expect.objectContaining({ headers: expect.any(Object) }))
    })
  })
}) 