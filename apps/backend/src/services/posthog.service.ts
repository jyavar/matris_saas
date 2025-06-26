import { PostHog } from 'posthog-node'

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY
const posthogClient = POSTHOG_API_KEY ? new PostHog(POSTHOG_API_KEY) : undefined

export class PostHogService {
  static captureEvent(
    distinctId: string,
    event: string,
    properties: Record<string, unknown> = {},
  ) {
    if (!posthogClient) return
    posthogClient.capture({
      distinctId,
      event,
      properties,
    })
  }

  static async flush() {
    if (posthogClient) await posthogClient.shutdown()
  }
}

// Export para test unitario
export const _test = { posthogClient }
