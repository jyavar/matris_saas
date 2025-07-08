import { logger, server } from './index.js'
import { getConfig } from './services/config.service.js'

const config = getConfig()

server.listen(config.PORT, () => {
  logger.info(`✅ STRATO Backend listening on port ${config.PORT}`)
})
