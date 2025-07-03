import logger from './logger.service'

interface LoggerLike {
  info: (obj: unknown, msg?: string) => void
  warn: (msg: string) => void
}

export async function logAction(
  action: string,
  userId: string,
  details: Record<string, unknown> = {},
  injectedLogger: LoggerLike = logger,
) {
  if (!userId || userId === '') {
    throw new Error('userId is required')
  }
  injectedLogger.info({ action, userId, ...details }, `Action: ${action}`)
  // PostHog solo en producción
  if (process.env.NODE_ENV !== 'test' && process.env.POSTHOG_API_KEY) {
    try {
      const mod = await import('./posthog.service')
      mod.PostHogService.captureEvent(userId, action, details)
    } catch {
      injectedLogger.warn('PostHog not available')
    }
  }
}

// Export default para uso normal
export default async function logActionDefault(
  action: string,
  userId: string,
  details: Record<string, unknown> = {},
) {
  return logAction(action, userId, details, logger)
}
