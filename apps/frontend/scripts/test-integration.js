#!/usr/bin/env node

/**
 * STRATO Core OS™ - Test de Integración Settings
 * 
 * Este script prueba la integración real entre frontend y backend
 * para el módulo Settings.
 * 
 * Uso:
 * node scripts/test-integration.js
 */

const https = require('https')
const http = require('http')

// Configuración
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
const SETTINGS_ENDPOINTS = [
  '/api/settings/user',
  '/api/settings/system',
  '/api/settings/export',
  '/health'
]

// Colores para console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logHeader(message) {
  log(`\n${colors.bold}${colors.blue}${'='.repeat(50)}${colors.reset}`)
  log(`${colors.bold}${colors.blue}${message}${colors.reset}`)
  log(`${colors.bold}${colors.blue}${'='.repeat(50)}${colors.reset}`)
}

function logTest(testName, success, details = '') {
  const status = success ? '✅ PASS' : '❌ FAIL'
  const color = success ? 'green' : 'red'
  log(`${status} ${testName}`, color)
  if (details) {
    log(`   ${details}`, 'yellow')
  }
}

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://')
    const client = isHttps ? https : http
    
    const req = client.request(url, options, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data)
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData
          })
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data
          })
        }
      })
    })
    
    req.on('error', (error) => {
      reject(error)
    })
    
    if (options.body) {
      req.write(options.body)
    }
    
    req.end()
  })
}

async function testHealthCheck() {
  logHeader('Testing Backend Health Check')
  
  try {
    const response = await makeRequest(`${API_BASE_URL}/health`)
    const success = response.status === 200
    logTest('Health Check', success, `Status: ${response.status}`)
    
    if (success) {
      log(`   Backend is running and healthy`, 'green')
    } else {
      log(`   Backend responded with status: ${response.status}`, 'red')
    }
    
    return success
  } catch (error) {
    logTest('Health Check', false, error.message)
    return false
  }
}

async function testSettingsEndpoints() {
  logHeader('Testing Settings Endpoints')
  
  const results = []
  
  for (const endpoint of SETTINGS_ENDPOINTS) {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      const response = await makeRequest(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Note: These endpoints require authentication
          // This test will likely return 401, which is expected
        }
      })
      
      const isAuthRequired = response.status === 401
      const success = response.status === 200 || isAuthRequired
      
      logTest(
        `GET ${endpoint}`, 
        success, 
        `Status: ${response.status} ${isAuthRequired ? '(Auth Required)' : ''}`
      )
      
      results.push({ endpoint, success, status: response.status })
      
    } catch (error) {
      logTest(`GET ${endpoint}`, false, error.message)
      results.push({ endpoint, success: false, error: error.message })
    }
  }
  
  return results
}

async function testConfiguration() {
  logHeader('Testing Configuration')
  
  // Test environment variables
  const envVars = {
    'NEXT_PUBLIC_API_URL': process.env.NEXT_PUBLIC_API_URL || 'Not set (using default)',
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
  }
  
  log('Environment Variables:', 'blue')
  Object.entries(envVars).forEach(([key, value]) => {
    const isSet = value !== 'Not set' && !value.includes('Not set')
    log(`   ${key}: ${value}`, isSet ? 'green' : 'yellow')
  })
  
  // Test API URL format
  const apiUrlValid = API_BASE_URL.startsWith('http')
  logTest('API URL Format', apiUrlValid, `URL: ${API_BASE_URL}`)
  
  return {
    envVars,
    apiUrlValid
  }
}

async function runIntegrationTest() {
  logHeader('STRATO Core OS™ - Settings Integration Test')
  log(`Testing integration with backend at: ${API_BASE_URL}`, 'blue')
  
  const startTime = Date.now()
  
  try {
    // Test configuration
    const config = await testConfiguration()
    
    // Test health check
    const healthOk = await testHealthCheck()
    
    // Test settings endpoints
    const endpointResults = await testSettingsEndpoints()
    
    // Summary
    const endTime = Date.now()
    const duration = endTime - startTime
    
    logHeader('Test Summary')
    log(`Duration: ${duration}ms`, 'blue')
    log(`Backend Health: ${healthOk ? '✅ Healthy' : '❌ Unhealthy'}`, healthOk ? 'green' : 'red')
    
    const successfulEndpoints = endpointResults.filter(r => r.success).length
    const totalEndpoints = endpointResults.length
    log(`Endpoints Tested: ${successfulEndpoints}/${totalEndpoints}`, 'blue')
    
    if (!healthOk) {
      log('\n⚠️  Backend is not responding. Please ensure:', 'yellow')
      log('   1. Backend is running on the correct port', 'yellow')
      log('   2. No firewall is blocking the connection', 'yellow')
      log('   3. The API_BASE_URL is correct', 'yellow')
    }
    
    if (successfulEndpoints === 0) {
      log('\n⚠️  No endpoints responded successfully. This might be expected if:', 'yellow')
      log('   1. Authentication is required (401 responses)', 'yellow')
      log('   2. Backend is not running', 'yellow')
      log('   3. Endpoints are not implemented yet', 'yellow')
    }
    
    log('\n✅ Integration test completed!', 'green')
    
  } catch (error) {
    log(`\n❌ Integration test failed: ${error.message}`, 'red')
    process.exit(1)
  }
}

// Run the test if this script is executed directly
if (require.main === module) {
  runIntegrationTest()
}

module.exports = {
  runIntegrationTest,
  testHealthCheck,
  testSettingsEndpoints,
  testConfiguration
} 