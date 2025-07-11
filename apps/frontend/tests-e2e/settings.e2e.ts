import { test, expect } from '@playwright/test'

test.describe('Settings E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication - simulate logged in user
    await page.addInitScript(() => {
      window.localStorage.setItem('supabase.auth.token', JSON.stringify({
        access_token: 'mock-token',
        refresh_token: 'mock-refresh',
        expires_at: Date.now() + 3600000
      }))
    })
    
    // Navigate to settings page
    await page.goto('/settings')
  })

  test('should display settings page with user preferences', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('[data-testid="settings-page"]', { timeout: 10000 })
    
    // Verify page structure
    await expect(page.locator('h1')).toContainText('Settings')
    await expect(page.locator('[data-testid="theme-selector"]')).toBeVisible()
    await expect(page.locator('[data-testid="language-selector"]')).toBeVisible()
    await expect(page.locator('[data-testid="notifications-section"]')).toBeVisible()
  })

  test('should change theme preference and persist', async ({ page }) => {
    // Wait for settings to load
    await page.waitForSelector('[data-testid="theme-selector"]')
    
    // Change theme to light
    await page.selectOption('[data-testid="theme-selector"]', 'light')
    
    // Verify visual change (if theme is applied immediately)
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    
    // Save settings
    await page.click('[data-testid="save-settings"]')
    
    // Verify success message
    await expect(page.locator('[data-testid="success-toast"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-toast"]')).toContainText('Settings saved')
    
    // Reload page and verify persistence
    await page.reload()
    await page.waitForSelector('[data-testid="theme-selector"]')
    await expect(page.locator('[data-testid="theme-selector"]')).toHaveValue('light')
  })

  test('should change language preference', async ({ page }) => {
    await page.waitForSelector('[data-testid="language-selector"]')
    
    // Change language to Spanish
    await page.selectOption('[data-testid="language-selector"]', 'es')
    
    // Save settings
    await page.click('[data-testid="save-settings"]')
    
    // Verify success message
    await expect(page.locator('[data-testid="success-toast"]')).toBeVisible()
    
    // Reload and verify persistence
    await page.reload()
    await page.waitForSelector('[data-testid="language-selector"]')
    await expect(page.locator('[data-testid="language-selector"]')).toHaveValue('es')
  })

  test('should toggle notification preferences', async ({ page }) => {
    await page.waitForSelector('[data-testid="notifications-section"]')
    
    // Toggle email notifications off
    await page.click('[data-testid="email-notifications-toggle"]')
    
    // Toggle SMS notifications on
    await page.click('[data-testid="sms-notifications-toggle"]')
    
    // Save settings
    await page.click('[data-testid="save-settings"]')
    
    // Verify success message
    await expect(page.locator('[data-testid="success-toast"]')).toBeVisible()
    
    // Reload and verify persistence
    await page.reload()
    await page.waitForSelector('[data-testid="notifications-section"]')
    await expect(page.locator('[data-testid="email-notifications-toggle"]')).not.toBeChecked()
    await expect(page.locator('[data-testid="sms-notifications-toggle"]')).toBeChecked()
  })

  test('should handle network error gracefully', async ({ page }) => {
    // Mock network error
    await page.route('**/api/settings/user', route => {
      route.fulfill({ status: 500, body: JSON.stringify({ error: 'Internal Server Error' }) })
    })
    
    await page.waitForSelector('[data-testid="save-settings"]')
    await page.click('[data-testid="save-settings"]')
    
    // Verify error message
    await expect(page.locator('[data-testid="error-toast"]')).toBeVisible()
    await expect(page.locator('[data-testid="error-toast"]')).toContainText('Failed to save settings')
  })

  test('should handle session expiration', async ({ page }) => {
    // Mock 401 response
    await page.route('**/api/settings/user', route => {
      route.fulfill({ status: 401, body: JSON.stringify({ error: 'No authentication token' }) })
    })
    
    await page.waitForSelector('[data-testid="save-settings"]')
    await page.click('[data-testid="save-settings"]')
    
    // Verify redirect to login or error message
    await expect(page.locator('[data-testid="error-toast"]')).toBeVisible()
    await expect(page.locator('[data-testid="error-toast"]')).toContainText('Session expired')
  })

  test('should validate form inputs', async ({ page }) => {
    await page.waitForSelector('[data-testid="timezone-selector"]')
    
    // Try to save with invalid timezone
    await page.selectOption('[data-testid="timezone-selector"]', 'invalid-timezone')
    await page.click('[data-testid="save-settings"]')
    
    // Verify validation error
    await expect(page.locator('[data-testid="validation-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="validation-error"]')).toContainText('Invalid timezone')
  })

  test('should export settings', async ({ page }) => {
    await page.waitForSelector('[data-testid="export-settings"]')
    
    // Click export button
    const downloadPromise = page.waitForEvent('download')
    await page.click('[data-testid="export-settings"]')
    const download = await downloadPromise
    
    // Verify download
    expect(download.suggestedFilename()).toContain('settings')
    expect(download.suggestedFilename()).toMatch(/\.json$/)
  })

  test('should import settings', async ({ page }) => {
    await page.waitForSelector('[data-testid="import-settings"]')
    
    // Create test settings file
    const testSettings = {
      theme: 'dark',
      language: 'fr',
      notifications: { email: false, push: true, sms: true }
    }
    
    // Upload file
    await page.setInputFiles('[data-testid="import-file-input"]', {
      name: 'test-settings.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(testSettings))
    })
    
    // Verify import success
    await expect(page.locator('[data-testid="success-toast"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-toast"]')).toContainText('Settings imported')
    
    // Verify settings were applied
    await expect(page.locator('[data-testid="theme-selector"]')).toHaveValue('dark')
    await expect(page.locator('[data-testid="language-selector"]')).toHaveValue('fr')
  })

  test('should be accessible', async ({ page }) => {
    await page.waitForSelector('[data-testid="settings-page"]')
    
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible()
    
    // Check for proper form labels
    await expect(page.locator('label[for="theme-selector"]')).toBeVisible()
    await expect(page.locator('label[for="language-selector"]')).toBeVisible()
    
    // Check for proper ARIA attributes
    await expect(page.locator('[data-testid="theme-selector"]')).toHaveAttribute('aria-describedby')
    await expect(page.locator('[data-testid="language-selector"]')).toHaveAttribute('aria-describedby')
    
    // Test keyboard navigation
    await page.keyboard.press('Tab')
    await expect(page.locator('[data-testid="theme-selector"]:focus')).toBeVisible()
  })

  test('should show loading states', async ({ page }) => {
    // Mock slow response
    await page.route('**/api/settings/user', route => {
      setTimeout(() => {
        route.fulfill({ 
          status: 200, 
          body: JSON.stringify({ success: true, data: { theme: 'dark' } }) 
        })
      }, 2000)
    })
    
    await page.reload()
    
    // Verify loading indicator
    await expect(page.locator('[data-testid="loading-spinner"]')).toBeVisible()
    
    // Wait for load to complete
    await page.waitForSelector('[data-testid="settings-page"]', { timeout: 10000 })
    await expect(page.locator('[data-testid="loading-spinner"]')).not.toBeVisible()
  })

  test('should handle offline state', async ({ page }) => {
    // Mock offline state
    await page.route('**/api/settings/user', route => {
      route.abort('failed')
    })
    
    await page.waitForSelector('[data-testid="save-settings"]')
    await page.click('[data-testid="save-settings"]')
    
    // Verify offline message
    await expect(page.locator('[data-testid="error-toast"]')).toBeVisible()
    await expect(page.locator('[data-testid="error-toast"]')).toContainText('No internet connection')
  })
}) 