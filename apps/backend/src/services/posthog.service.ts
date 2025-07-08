import { PostHog } from 'posthog-node'

import logger from './logger.service.js'
import { ApiError } from '../utils/ApiError.js'

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY
const posthogClient: PostHog | undefined = POSTHOG_API_KEY
  ? new PostHog(POSTHOG_API_KEY)
  : undefined

export interface TrackEventData {
  event: string
  properties?: Record<string, unknown>
  user_id: string
}

export interface IdentifyUserData {
  user_id: string
  traits?: Record<string, unknown>
}

export class PostHogService {
  static captureEvent(
    distinctId: string,
    event: string,
    properties: Record<string, unknown> = {},
  ) {
    if (!posthogClient) {
      // Silenciosamente ignorar si PostHog no está configurado
      console.debug(`PostHog no configurado - Evento ignorado: ${event}`)
      return
    }

    try {
      posthogClient.capture({
        distinctId,
        event,
        properties,
      })
    } catch (error) {
      console.warn(`Error enviando evento a PostHog: ${error}`)
    }
  }

  static async flush() {
    if (posthogClient) {
      try {
        await posthogClient.shutdown()
      } catch (error) {
        console.warn(`Error cerrando PostHog: ${error}`)
      }
    }
  }

  async track(event: string, userId?: string, properties?: Record<string, any>) {
    if (userId) {
      PostHogService.captureEvent(userId, event, properties)
    }
    return { event, status: 'tracked' }
  }

  async identify(userId: string, traits: Record<string, any>) {
    // Use static method for actual tracking
    PostHogService.captureEvent(userId, '$identify', traits)
    return { user_id: userId, status: 'identified' }
  }

  async trackEvent(
    data: TrackEventData,
  ): Promise<{ event: string; status: string }> {
    if (!data.event) throw new ApiError('Event is required', 400)
    if (!data.user_id) throw new ApiError('user_id is required', 400)
    logger.info(
      { user_id: data.user_id, event: data.event, properties: data.properties },
      'PostHog track',
    )
    // Simulación de integración
    return { event: data.event, status: 'tracked' }
  }

  async identifyUser(
    data: IdentifyUserData,
  ): Promise<{ user_id: string; status: string }> {
    if (!data.user_id) throw new ApiError('user_id is required', 400)
    logger.info(
      { user_id: data.user_id, traits: data.traits },
      'PostHog identify',
    )
    // Simulación de integración
    return { user_id: data.user_id, status: 'identified' }
  }
}

export const posthogService = new PostHogService()
