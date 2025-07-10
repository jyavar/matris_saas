// Centralized types for STRATO Frontend
// Re-export all service types for easy access

// Billing types
export type {
  BillingData,
  BillingResponse,
  CreateInvoiceRequest,
  UpdateBillingRequest,
} from '@/services/billing.service'

// Analytics types
export type {
  AnalyticsData,
  ChartData,
  AnalyticsResponse,
  AnalyticsFilters,
  AnalyticsEvent,
} from '@/services/analytics.service'

// Campaigns types
export type {
  Campaign,
  CampaignResponse,
  CreateCampaignRequest,
  UpdateCampaignRequest,
  CampaignMetrics,
} from '@/services/campaigns.service'

// Deploy types
export type {
  Deployment,
  DeployResponse,
  CreateDeploymentRequest,
  DeployConfig,
  DeployMetrics,
} from '@/services/deploy.service'

// Docs types
export type {
  Document,
  DocsResponse,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  DocsSearchParams,
  DocsMetrics,
} from '@/services/docs.service'

// Merge types
export type {
  MergeRequest,
  MergeResponse,
  CreateMergeRequest,
  UpdateMergeRequest,
  MergeComment,
  MergeMetrics,
} from '@/services/merge.service'

// Settings types
export type {
  UserSettings,
  SettingsResponse,
  UpdateSettingsRequest,
  TeamSettings,
  SystemSettings,
} from '@/services/settings.service'

// Common UI types
export interface LoadingState {
  loading: boolean
  error: string | null
}

export interface PaginationParams {
  page: number
  limit: number
  total: number
}

export interface SortParams {
  field: string
  direction: 'asc' | 'desc'
}

export interface FilterParams {
  search?: string
  category?: string
  status?: string
  dateFrom?: string
  dateTo?: string
}

// Navigation types
export interface NavigationItem {
  id: string
  title: string
  href: string
  icon?: string
  badge?: string
  children?: NavigationItem[]
}

export interface BreadcrumbItem {
  title: string
  href?: string
  current?: boolean
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio'
  required?: boolean
  placeholder?: string
  options?: Array<{ value: string; label: string }>
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

export interface FormData {
  [key: string]: string | number | boolean | string[]
}

// Notification types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Modal types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// Table types
export interface TableColumn<T> {
  key: keyof T
  title: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
  width?: string
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  pagination?: PaginationParams
  onPageChange?: (page: number) => void
  onSort?: (field: keyof T, direction: 'asc' | 'desc') => void
  onRowClick?: (row: T) => void
}

// Chart types
export interface ChartProps {
  data: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      backgroundColor: string
      borderColor?: string
    }>
  }
  type: 'line' | 'bar' | 'pie' | 'doughnut'
  options?: Record<string, unknown>
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

// Theme types
export interface Theme {
  name: 'light' | 'dark' | 'system'
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    error: string
    warning: string
    success: string
    info: string
  }
}

// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user' | 'viewer'
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  bio?: string
  location?: string
  website?: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  preferences: {
    theme: Theme['name']
    language: 'es' | 'en'
    timezone: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
  }
}

// Organization types
export interface Organization {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
  plan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'suspended' | 'cancelled'
  createdAt: string
  updatedAt: string
}

// Permission types
export interface Permission {
  resource: string
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
  conditions?: Record<string, unknown>
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
  isSystem?: boolean
  createdAt: string
  updatedAt: string
}

// Audit types
export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId: string
  details: Record<string, unknown>
  ipAddress: string
  userAgent: string
  createdAt: string
}

// Export all types for easy import
export * from '@/services/billing.service'
export * from '@/services/analytics.service'
export * from '@/services/campaigns.service'
export * from '@/services/deploy.service'
export * from '@/services/docs.service'
export * from '@/services/merge.service'
export * from '@/services/settings.service' 