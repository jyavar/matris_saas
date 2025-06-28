// Workaround temporal: pino sólo soporta importación CJS en v9.x
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pino = require('pino') // TODO: migrar a import ESM cuando pino lo soporte
import { getConfig } from './config.service.js'
import { PostHogService } from './posthog.service.js'

const config = getConfig()

const logger = pino({
  level: config.LOG_LEVEL,
  ...(config.NODE_ENV !== 'production' && {
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
  if (!userId) throw new Error('userId is required')
  logger.info({ action, userId, ...details }, `Action: ${action}`)
  // Bitácora estructurada + PostHog
  PostHogService.captureEvent(userId, action, details)
}

export default logger
