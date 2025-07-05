import { createServer } from 'http'
import { parse } from 'url'

import { analyticsController } from './controllers/analytics.controller.js'
import { analyticsReportingController } from './controllers/analytics-reporting.controller.js'
import { automationController } from './controllers/automation.controller.js'
import { campaignsController } from './controllers/campaigns.controller.js'
import { emailCampaignsController } from './controllers/email-campaigns.controller.js'
import { launchboardController } from './controllers/launchboard.controller.js'
import { onboardingController } from './controllers/onboarding.controller.js'
import { openaiController } from './controllers/openai.controller.js'
import { PostHogController } from './controllers/posthog.controller.js'
import { pricingController } from './controllers/pricing.controller.js'
import { reportingController } from './controllers/reporting.controller.js'
import { runtimeController } from './controllers/runtime.controller.js'
import logger from './services/logger.service.js'
import { createRouter } from './utils/router.js'

const version = process.env.npm_package_version || '1.0.0'
const router = createRouter()

function sendJson(res: any, status: number, data: any) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

// Analytics routes
router.get('/api/analytics', analyticsController.getAllAnalytics)
router.post('/api/analytics', analyticsController.createAnalytics)
router.get('/api/analytics/events', analyticsController.getEvents)
router.get('/api/analytics/metrics', analyticsController.getMetrics)
router.get('/api/analytics/summary', analyticsController.getSummary)
router.get('/api/analytics/users/:userId', analyticsController.getUserAnalytics)
router.post('/api/analytics/track/event', analyticsController.trackEvent)
router.post('/api/analytics/track/metric', analyticsController.trackMetric)

// Analytics Reporting routes
router.get('/api/analytics-reporting', analyticsReportingController.getReports)
router.post('/api/analytics-reporting', analyticsReportingController.createReport)
router.get('/api/analytics-reporting/:id', analyticsReportingController.getReportById)
router.delete('/api/analytics-reporting/:id', analyticsReportingController.deleteReport)

// Automation routes
router.get('/api/automation', automationController.getAutomations)
router.post('/api/automation', automationController.createAutomation)
router.get('/api/automation/:id', automationController.getAutomationById)
router.put('/api/automation/:id', automationController.updateAutomation)
router.delete('/api/automation/:id', automationController.deleteAutomation)
router.get('/api/automation/workflows', automationController.getAutomations)
router.get('/api/automation/workflows/:id', automationController.getAutomationById)
router.get('/api/automation/jobs', automationController.getAutomations)
router.get('/api/automation/jobs/:id', automationController.getAutomationById)
router.post('/api/automation/jobs/:id/pause', automationController.updateAutomation)
router.post('/api/automation/jobs/:id/resume', automationController.updateAutomation)

// Campaigns routes
router.get('/api/campaigns', campaignsController.getCampaigns)
router.post('/api/campaigns', campaignsController.createCampaign)
router.get('/api/campaigns/:id', campaignsController.getCampaignById)
router.put('/api/campaigns/:id', campaignsController.updateCampaign)
router.delete('/api/campaigns/:id', campaignsController.deleteCampaign)

// Email Campaigns routes
router.get('/api/email-campaigns', emailCampaignsController.getCampaigns)
router.post('/api/email-campaigns', emailCampaignsController.createCampaign)
router.get('/api/email-campaigns/:id', emailCampaignsController.getCampaignById)
router.put('/api/email-campaigns/:id', emailCampaignsController.updateCampaign)
router.delete('/api/email-campaigns/:id', emailCampaignsController.deleteCampaign)
router.post('/api/email-campaigns/:id/send', emailCampaignsController.updateCampaign)

// Launchboard routes
router.get('/api/launchboard', launchboardController.getLaunchboard)
router.post('/api/launchboard', launchboardController.createLaunchboardItem)
router.get('/api/launchboard/:id', launchboardController.getLaunchboardItemById)
router.put('/api/launchboard/:id', launchboardController.updateLaunchboardItem)
router.delete('/api/launchboard/:id', launchboardController.deleteLaunchboardItem)
router.get('/api/launchboard/dashboards', launchboardController.getLaunchboard)
router.get('/api/launchboard/dashboards/:id', launchboardController.getLaunchboardItemById)

// Onboarding routes
router.get('/api/onboarding', onboardingController.getOnboardingStatus)
router.post('/api/onboarding', onboardingController.updateOnboardingStatus)
router.get('/api/onboarding/:id', onboardingController.getOnboardingStepById)
router.put('/api/onboarding/:id', onboardingController.updateOnboardingStep)

// OpenAI routes
router.post('/api/openai/generate', openaiController.generateText)

// PostHog routes
router.post('/api/posthog/track', PostHogController.trackEvent)
router.post('/api/posthog/identify', PostHogController.identifyUser)
router.get('/api/posthog/health', (req, res) => sendJson(res, 200, { status: 'OK' }))

// Pricing routes
router.get('/api/pricing/plans', pricingController.getPlans)
router.post('/api/pricing/plans', pricingController.createPlan)
router.get('/api/pricing/plans/:id', pricingController.getPlanById)
router.put('/api/pricing/plans/:id', pricingController.updatePlan)
router.delete('/api/pricing/plans/:id', pricingController.deletePlan)

// Reporting routes
router.get('/api/reporting/usage', reportingController.getUsageReport)
router.get('/api/reporting/billing', reportingController.getBillingReport)
router.get('/api/reporting/performance', reportingController.getPerformanceReport)

// Runtime routes
router.get('/api/runtime/jobs', runtimeController.getJobs)
router.post('/api/runtime/jobs', runtimeController.createJob)
router.get('/api/runtime/jobs/:id', runtimeController.getJobById)
router.post('/api/runtime/jobs/:id/pause', runtimeController.pauseJob)
router.post('/api/runtime/jobs/:id/resume', runtimeController.resumeJob)
router.post('/api/runtime/agents/:agentId/run', runtimeController.runAgent)

// Auth routes (legacy)
router.post('/auth/signup', (req, res) => sendJson(res, 201, { success: true, message: 'User created' }))
router.post('/auth/signin', (req, res) => sendJson(res, 200, { success: true, message: 'User signed in' }))

// Health and metrics routes
router.get('/health', (req, res) => sendJson(res, 200, { status: 'OK' }))
router.get('/metrics', (req, res) => {
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
})

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

export { logger, server } 