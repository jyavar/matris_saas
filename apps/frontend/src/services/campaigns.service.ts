// Campaigns service for frontend
import { getSessionToken } from '@/lib/supabase'

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed'

export interface Campaign {
  id: string
  title: string
  description?: string
  budget: number
  start_date?: string
  end_date?: string
  target_audience?: Record<string, unknown>
  status: CampaignStatus
  created_at?: string
  updated_at?: string
}

export interface CreateCampaignRequest {
  title: string
  description?: string
  budget: number
  start_date?: string
  end_date?: string
  target_audience?: Record<string, unknown>
  status?: CampaignStatus
}

export interface UpdateCampaignRequest {
  title?: string
  description?: string
  budget?: number
  start_date?: string
  end_date?: string
  target_audience?: Record<string, unknown>
  status?: CampaignStatus
}

export interface CampaignAnalytics {
  campaign_id: string
  impressions: number
  clicks: number
  conversions: number
  spend: number
  ctr: number
  cpa: number
  created_at?: string
}

export interface CampaignsListResponse {
  success: boolean
  data: {
    campaigns: Campaign[]
    count: number
  }
  error?: string
}

export interface CampaignResponse {
  success: boolean
  data?: Campaign
  error?: string
}

export interface CampaignAnalyticsResponse {
  success: boolean
  data?: CampaignAnalytics
  error?: string
}

export class CampaignsService {
  static async list(): Promise<CampaignsListResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch('/api/campaigns', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        return { success: false, data: { campaigns: [], count: 0 }, error: `Error ${res.status}: ${res.statusText}` }
      }
      const json = await res.json()
      return { success: true, data: json }
    } catch (error) {
      return {
        success: false,
        data: { campaigns: [], count: 0 },
        error: error instanceof Error ? error.message : 'Failed to fetch campaigns',
      }
    }
  }

  static async getById(id: string): Promise<CampaignResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`/api/campaigns/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        return { success: false, error: `Error ${res.status}: ${res.statusText}` }
      }
      const campaign = await res.json()
      return { success: true, data: campaign }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch campaign',
      }
    }
  }

  static async create(request: CreateCampaignRequest): Promise<CampaignResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      })
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null)
        return { success: false, error: errorJson?.error || `Error ${res.status}` }
      }
      const json = await res.json()
      return { success: true, data: json.data }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create campaign',
      }
    }
  }

  static async update(id: string, request: UpdateCampaignRequest): Promise<CampaignResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`/api/campaigns/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      })
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null)
        return { success: false, error: errorJson?.error || `Error ${res.status}` }
      }
      const campaign = await res.json()
      return { success: true, data: campaign }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update campaign',
      }
    }
  }

  static async delete(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`/api/campaigns/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null)
        return { success: false, error: errorJson?.error || `Error ${res.status}` }
      }
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete campaign',
      }
    }
  }

  static async pause(id: string): Promise<CampaignResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`/api/campaigns/${id}/pause`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null)
        return { success: false, error: errorJson?.error || `Error ${res.status}` }
      }
      const campaign = await res.json()
      return { success: true, data: campaign }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to pause campaign',
      }
    }
  }

  static async resume(id: string): Promise<CampaignResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`/api/campaigns/${id}/resume`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null)
        return { success: false, error: errorJson?.error || `Error ${res.status}` }
      }
      const campaign = await res.json()
      return { success: true, data: campaign }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to resume campaign',
      }
    }
  }

  static async getAnalytics(id: string): Promise<CampaignAnalyticsResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`/api/campaigns/${id}/analytics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        return { success: false, error: `Error ${res.status}: ${res.statusText}` }
      }
      const analytics = await res.json()
      return { success: true, data: analytics }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch campaign analytics',
      }
    }
  }
} 