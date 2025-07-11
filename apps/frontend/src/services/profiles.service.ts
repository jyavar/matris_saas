// Profiles service for frontend
import { getSessionToken } from '../lib/supabase'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  bio?: string
  location?: string
  website?: string
  company?: string
  job_title?: string
  phone?: string
  timezone?: string
  language?: string
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    privacy: {
      profile_visible: boolean
      activity_visible: boolean
    }
  }
  created_at: string
  updated_at: string
  last_login?: string
  status: 'active' | 'inactive' | 'suspended'
}

export interface ProfileUpdateData {
  full_name?: string
  bio?: string
  location?: string
  website?: string
  company?: string
  job_title?: string
  phone?: string
  timezone?: string
  language?: string
  preferences?: Partial<UserProfile['preferences']>
}

export interface ProfileResponse {
  success: boolean
  data?: UserProfile | UserProfile[]
  error?: string
}

export interface ServiceHealth {
  isHealthy: boolean
  lastCheck: number
  responseTime: number
  errorRate: number
}

export class ProfilesService {
  private static API_BASE_URL = '/api/profiles'
  private static circuitBreaker = {
    failures: 0,
    lastFailureTime: 0,
    state: 'CLOSED' as 'CLOSED' | 'OPEN' | 'HALF_OPEN',
    threshold: 5,
    timeout: 60000, // 1 minute
  }

  // Health check method
  static async checkHealth(): Promise<ServiceHealth> {
    const startTime = Date.now()
    let res: Response | undefined
    try {
      const token = await getSessionToken()
      
      // Always try HEAD first, then fallback to GET if needed
      try {
        res = await fetch(`${this.API_BASE_URL}`, {
          method: 'HEAD',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (err) {
        // Fallback: if HEAD fails, try GET
        res = await fetch(`${this.API_BASE_URL}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }

      const responseTime = Date.now() - startTime
      
      if (res.ok) {
        this.circuitBreaker.failures = 0
        this.circuitBreaker.state = 'CLOSED'
        
        return {
          isHealthy: true,
          lastCheck: Date.now(),
          responseTime,
          errorRate: 0,
        }
      } else {
        throw new Error(`Health check failed with status ${res.status}`)
      }
    } catch (error) {
      this.circuitBreaker.failures++
      this.circuitBreaker.lastFailureTime = Date.now()
      
      if (this.circuitBreaker.failures >= this.circuitBreaker.threshold) {
        this.circuitBreaker.state = 'OPEN'
      }
      
      return {
        isHealthy: false,
        lastCheck: Date.now(),
        responseTime: Date.now() - startTime,
        errorRate: this.circuitBreaker.failures / (this.circuitBreaker.failures + 1),
      }
    }
  }

  // Get current user profile
  static async getCurrentProfile(): Promise<ProfileResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
      }
    }
  }

  // Get profile by ID
  static async getProfileById(profileId: string): Promise<ProfileResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
      }
    }
  }

  // Update current user profile
  static async updateProfile(updateData: ProfileUpdateData): Promise<ProfileResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      })

      if (!res.ok) {
        throw new Error(`Failed to update profile: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile',
      }
    }
  }

  // Upload avatar
  static async uploadAvatar(file: File): Promise<ProfileResponse> {
    try {
      const token = await getSessionToken()
      const formData = new FormData()
      formData.append('avatar', file)

      const res = await fetch(`${this.API_BASE_URL}/me/avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`Failed to upload avatar: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload avatar',
      }
    }
  }

  // Delete avatar
  static async deleteAvatar(): Promise<ProfileResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/me/avatar`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to delete avatar: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete avatar',
      }
    }
  }

  // Get user activity
  static async getActivity(limit = 10, offset = 0): Promise<ProfileResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/me/activity?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch activity: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch activity',
      }
    }
  }

  // Search profiles
  static async searchProfiles(query: string, limit = 10, offset = 0): Promise<ProfileResponse> {
    try {
      const token = await getSessionToken()
      const res = await fetch(`${this.API_BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to search profiles: ${res.status}`)
      }

      const data = await res.json()
      
      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search profiles',
      }
    }
  }

  // Get circuit breaker state
  static getCircuitBreakerState() {
    return {
      failures: this.circuitBreaker.failures,
      lastFailureTime: this.circuitBreaker.lastFailureTime,
      state: this.circuitBreaker.state,
    }
  }

  // Reset circuit breaker
  static resetCircuitBreaker() {
    this.circuitBreaker.failures = 0
    this.circuitBreaker.state = 'CLOSED'
    this.circuitBreaker.lastFailureTime = 0
  }

  // Check if circuit breaker is open
  static isCircuitBreakerOpen(): boolean {
    if (this.circuitBreaker.state === 'OPEN') {
      const now = Date.now()
      if (now - this.circuitBreaker.lastFailureTime > this.circuitBreaker.timeout) {
        this.circuitBreaker.state = 'HALF_OPEN'
        return false
      }
      return true
    }
    return false
  }
} 