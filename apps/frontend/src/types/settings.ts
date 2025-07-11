// Settings types for STRATO Core OS™
export type ConnectionState = 'connected' | 'disconnected' | 'connecting' | 'error'
export type CircuitBreakerState = 'closed' | 'open' | 'half-open'

export interface Settings {
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    dataSharing: boolean
    analytics: boolean
    marketing: boolean
  }
  performance: {
    autoSave: boolean
    cacheEnabled: boolean
    compression: boolean
  }
}

export interface SettingsState {
  settings: Settings
  loading: boolean
  error: string | null
  connectionState: ConnectionState
  retryCount: number
  circuitBreakerState: CircuitBreakerState
  lastUpdated: string | null
}

export type SettingsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SETTINGS'; payload: Settings }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_CONNECTION_STATE'; payload: ConnectionState }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_RETRY_COUNT'; payload: number }
  | { type: 'SET_CIRCUIT_BREAKER_STATE'; payload: CircuitBreakerState }

// Legacy types for backward compatibility
export interface UserSettings {
  id: string
  user_id: string
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profile_visibility: 'public' | 'private' | 'team'
    data_sharing: boolean
  }
  preferences: {
    timezone: string
    date_format: string
    currency: string
  }
  created_at: string
  updated_at: string
}

export interface TeamSettings {
  id: string
  team_id: string
  name: string
  description: string
  permissions: {
    invite_members: boolean
    manage_billing: boolean
    view_analytics: boolean
  }
  features: {
    advanced_analytics: boolean
    custom_branding: boolean
    api_access: boolean
  }
  created_at: string
  updated_at: string
}

export interface SystemSettings {
  id: string
  maintenance_mode: boolean
  feature_flags: Record<string, boolean>
  integrations: {
    stripe_enabled: boolean
    posthog_enabled: boolean
    resend_enabled: boolean
  }
  created_at: string
  updated_at: string
}

export interface SettingsResponse {
  success: boolean
  data?: UserSettings
  error?: string
}

export interface UpdateSettingsRequest {
  theme?: UserSettings['theme']
  language?: string
  notifications?: Partial<UserSettings['notifications']>
  privacy?: Partial<UserSettings['privacy']>
  preferences?: Partial<UserSettings['preferences']>
} 