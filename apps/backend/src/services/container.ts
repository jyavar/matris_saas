import { env } from '../config/env.schema.js'
import { supabase } from '../lib/supabase.js'
import { authService } from './auth.service.js'
import { billingService } from './billing.service.js'
import type {
  IConfig,
  IDatabase,
  ILogger,
  ServiceContainer,
} from './interfaces/index.js'
import logger from './logger.service.js'
import { posthogService } from './posthog.service.js'
import { resendService } from './resend.service.js'

class Config implements IConfig {
  private config: Record<string, string | number | boolean | undefined>

  constructor() {
    this.config = env
  }

  get<T>(key: string): T {
    return this.config[key] as T
  }

  has(key: string): boolean {
    return key in this.config
  }
}

class Database implements IDatabase {
  public client = supabase
}

class Logger implements ILogger {
  info(message: string, meta?: Record<string, unknown>): void {
    logger.info(message, meta)
  }

  error(message: string, meta?: Record<string, unknown>): void {
    logger.error(message, meta)
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    logger.warn(message, meta)
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    logger.debug(message, meta)
  }
}

// Create service container
export const serviceContainer: ServiceContainer = {
  logger: new Logger(),
  database: new Database(),
  config: new Config(),
  auth: authService as typeof authService,
  billing: billingService as typeof billingService,
  user: {
    async createUser(data: { email: string; name: string }) {
      const { data: user, error } = await supabase
        .from('users')
        .insert([{ email: data.email, name: data.name }])
        .select()
        .single()

      if (error) throw error
      return user
    },
    async getUserById(id: string) {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return user
    },
    async updateUser(
      id: string,
      data: Partial<{ email: string; name: string }>,
    ) {
      const { data: user, error } = await supabase
        .from('users')
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return user
    },
    async deleteUser(id: string) {
      const { error } = await supabase.from('users').delete().eq('id', id)

      if (error) throw error
    },
  },
  email: {
    async sendEmail(to: string, subject: string, html: string) {
      await resendService.sendEmail(to, subject, html)
    },
    async sendTemplate(
      to: string,
      templateId: string,
      data: Record<string, unknown>,
    ) {
      await resendService.sendTemplate(to, templateId, data)
    },
  },
  analytics: {
    async track(
      event: string,
      userId?: string,
      properties?: Record<string, unknown>,
    ) {
      await posthogService.track(event, userId, properties)
    },
    async identify(userId: string, traits: Record<string, unknown>) {
      await posthogService.identify(userId, traits)
    },
  },
  storage: {
    async uploadFile(bucket: string, path: string, file: Buffer) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file)

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(path)

      return { path: data.path, url: publicUrl }
    },
    async deleteFile(bucket: string, path: string) {
      const { error } = await supabase.storage.from(bucket).remove([path])

      if (error) throw error
    },
    async getSignedUrl(bucket: string, path: string, expiresIn = 3600) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn)

      if (error) throw error
      return data.signedUrl
    },
  },
}

export default serviceContainer
