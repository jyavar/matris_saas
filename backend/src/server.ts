import app from './index.js'
import { getConfig } from './services/config.service.js'
import logger from './services/logger.service.js'

const config = getConfig()

app.listen(config.PORT, () => {
  logger.info(`✅ STRATO Backend listening on port ${config.PORT}`)
})
