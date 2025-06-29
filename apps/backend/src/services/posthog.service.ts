import { PostHog } from 'posthog-node'

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY
const posthogClient = POSTHOG_API_KEY ? new PostHog(POSTHOG_API_KEY) : undefined

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
}

// Export para test unitario
export const _test = { posthogClient }
