import { pino } from 'pino'

// Configuración simple para tests
const isTest = process.env.NODE_ENV === 'test'

const logger = pino({
  level: isTest ? 'error' : process.env.LOG_LEVEL || 'info',
  ...(isTest
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      }),
})

export function logAction(
  action: string,
  userId: string,
  details: Record<string, unknown> = {},
) {
  if (!userId || userId === '') {
    throw new Error('userId is required')
  }
  logger.info({ action, userId, ...details }, `Action: ${action}`)
  // PostHog solo en producción
  if (!isTest && process.env.POSTHOG_API_KEY) {
    try {
      import('./posthog.service.js').then(({ PostHogService }) => {
        PostHogService.captureEvent(userId, action, details)
      })
    } catch {
      logger.warn('PostHog not available')
    }
  }
}

export default logger
