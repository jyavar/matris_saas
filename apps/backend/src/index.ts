import { createServer } from 'http'
import { parse } from 'url'
import logger from './services/logger.service.js'
import { createRouter } from './utils/router.js'
import { analyticsReportingController } from './controllers/analytics-reporting.controller.js'
import { automationController } from './controllers/automation.controller.js'
import { emailCampaignsController } from './controllers/email-campaigns.controller.js'
import { launchboardController } from './controllers/launchboard.controller.js'
import { onboardingController } from './controllers/onboarding.controller.js'
import { openaiController } from './controllers/openai.controller.js'
import { PostHogController } from './controllers/posthog.controller.js'

const version = process.env.npm_package_version || '1.0.0'
const router = createRouter()

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

// Setup routes
router.get('/api/analytics-reporting', analyticsReportingController.getReports)
router.post('/api/analytics-reporting', analyticsReportingController.createReport)
router.get('/api/analytics-reporting/:id', analyticsReportingController.getReportById)
router.delete('/api/analytics-reporting/:id', analyticsReportingController.deleteReport)

router.get('/api/automation', automationController.getAutomations)
router.post('/api/automation', automationController.createAutomation)
router.get('/api/automation/:id', automationController.getAutomationById)
router.put('/api/automation/:id', automationController.updateAutomation)
router.delete('/api/automation/:id', automationController.deleteAutomation)

router.get('/api/email-campaigns', emailCampaignsController.getCampaigns)
router.post('/api/email-campaigns', emailCampaignsController.createCampaign)
router.get('/api/email-campaigns/:id', emailCampaignsController.getCampaignById)
router.put('/api/email-campaigns/:id', emailCampaignsController.updateCampaign)
router.delete('/api/email-campaigns/:id', emailCampaignsController.deleteCampaign)

router.get('/api/launchboard', launchboardController.getLaunchboard)
router.post('/api/launchboard', launchboardController.createLaunchboardItem)
router.get('/api/launchboard/:id', launchboardController.getLaunchboardItemById)
router.put('/api/launchboard/:id', launchboardController.updateLaunchboardItem)
router.delete('/api/launchboard/:id', launchboardController.deleteLaunchboardItem)

router.get('/api/onboarding', onboardingController.getOnboardingStatus)
router.post('/api/onboarding', onboardingController.updateOnboardingStatus)
router.get('/api/onboarding/:id', onboardingController.getOnboardingStepById)
router.put('/api/onboarding/:id', onboardingController.updateOnboardingStep)

router.post('/api/openai/generate', openaiController.generateText)

router.post('/api/posthog/track', PostHogController.trackEvent)
router.post('/api/posthog/identify', PostHogController.identifyUser)

const server = createServer(async (req, res) => {
  const { pathname } = parse(req.url || '', true)
  
  // Built-in health and metrics endpoints
  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version
    })
  }
  
  if (req.method === 'GET' && pathname === '/api/metrics') {
    const memUsage = process.memoryUsage()
    const cpuUsage = process.cpuUsage()
    return sendJson(res, 200, {
      memory: {
        rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
        external: `${Math.round(memUsage.external / 1024 / 1024)}MB`,
      },
      cpu: {
        user: `${Math.round(cpuUsage.user / 1000)}ms`,
        system: `${Math.round(cpuUsage.system / 1000)}ms`,
      },
      uptime: process.uptime(),
      version,
      platform: process.platform,
    })
  }

  // Handle all other routes through the router
  try {
    await router.handleRequest(req, res)
  } catch (error) {
    logger.error('Error handling request:', error)
    sendJson(res, 500, { success: false, error: 'Internal server error' })
  }
})

export { server, logger }
