import type { SupabaseClient } from '@supabase/supabase-js'

import type { Database } from '../../types/supabase.types.js'

export interface ILogger {
  info(message: string, meta?: Record<string, unknown>): void
  error(message: string, meta?: Record<string, unknown>): void
  warn(message: string, meta?: Record<string, unknown>): void
  debug(message: string, meta?: Record<string, unknown>): void
}

export interface IDatabase {
  client: SupabaseClient<Database>
}

export interface IConfig {
  get<T>(key: string): T
  has(key: string): boolean
}

export interface ICache {
  get<T>(key: string): Promise<T | null>
  set(key: string, value: unknown, ttl?: number): Promise<void>
  del(key: string): Promise<void>
  clear(): Promise<void>
}

export interface IAuthService {
  signUp(data: { email: string; password: string; name: string }): Promise<{ user: any; session: any }>
  signIn(data: { email: string; password: string }): Promise<{ user: any; session: any }>
  signOut(token: string): Promise<void>
  verifyToken(token: string): Promise<{ user: any } | null>
}

export interface IBillingService {
  createCustomer(userId: string, email: string): Promise<{ customerId: string }>
  createSubscription(customerId: string, priceId: string): Promise<{ subscriptionId: string }>
  cancelSubscription(subscriptionId: string): Promise<void>
  getSubscription(subscriptionId: string): Promise<any>
}

export interface IUserService {
  createUser(data: { email: string; name: string }): Promise<{ id: string }>
  getUserById(id: string): Promise<any>
  updateUser(id: string, data: Partial<{ email: string; name: string }>): Promise<any>
  deleteUser(id: string): Promise<void>
}

export interface IEmailService {
  sendEmail(to: string, subject: string, html: string): Promise<void>
  sendTemplate(to: string, templateId: string, data: Record<string, any>): Promise<void>
}

export interface IAnalyticsService {
  track(event: string, userId?: string, properties?: Record<string, any>): Promise<void>
  identify(userId: string, traits: Record<string, any>): Promise<void>
}

export interface IStorageService {
  uploadFile(bucket: string, path: string, file: Buffer): Promise<{ path: string; url: string }>
  deleteFile(bucket: string, path: string): Promise<void>
  getSignedUrl(bucket: string, path: string, expiresIn?: number): Promise<string>
}

export interface ServiceContainer {
  logger: ILogger
  database: IDatabase
  config: IConfig
  cache?: ICache
  auth: IAuthService
  billing: IBillingService
  user: IUserService
  email: IEmailService
  analytics: IAnalyticsService
  storage: IStorageService
}