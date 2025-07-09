import { describe, it, expect, beforeEach } from 'vitest'

import { ResendService } from '../resend.service.js'

describe('ResendService', () => {
  let resendService: ResendService

  beforeEach(() => {
    resendService = new ResendService()
  })

  describe('sendEmail', () => {
    it('should send email successfully', async () => {
      const to = 'test@example.com'
      const subject = 'Test Subject'
      const html = '<p>Test content</p>'

      const result = await resendService.sendEmail(to, subject, html)

      expect(result.ok).toBe(true)
      expect(result.message).toContain(to)
      expect(result.message).toContain(subject)
    })

    it('should send email without html content', async () => {
      const to = 'test@example.com'
      const subject = 'Test Subject'

      const result = await resendService.sendEmail(to, subject)

      expect(result.ok).toBe(true)
      expect(result.message).toContain(to)
      expect(result.message).toContain(subject)
    })

    it('should handle empty email address', async () => {
      const to = ''
      const subject = 'Test Subject'

      const result = await resendService.sendEmail(to, subject)

      expect(result.ok).toBe(true)
      expect(result.message).toContain('')
    })

    it('should handle empty subject', async () => {
      const to = 'test@example.com'
      const subject = ''

      const result = await resendService.sendEmail(to, subject)

      expect(result.ok).toBe(true)
      expect(result.message).toContain(to)
      expect(result.message).toContain("''")
    })
  })

  describe('sendTemplate', () => {
    it('should send template with valid data', async () => {
      const to = 'test@example.com'
      const templateId = 'welcome-template'
      const data = {
        name: 'John Doe',
        company: 'STRATO',
        role: 'Developer',
      }

      const result = await resendService.sendTemplate(to, templateId, data)

      expect(result.ok).toBe(true)
      expect(result.message).toContain(templateId)
      expect(result.message).toContain(to)
    })

    it('should send template with empty data', async () => {
      const to = 'test@example.com'
      const templateId = 'welcome-template'
      const data = {}

      const result = await resendService.sendTemplate(to, templateId, data)

      expect(result.ok).toBe(true)
      expect(result.message).toContain(templateId)
      expect(result.message).toContain(to)
    })

    it('should send template with mixed data types', async () => {
      const to = 'test@example.com'
      const templateId = 'complex-template'
      const data = {
        name: 'John Doe',
        age: 30,
        isActive: true,
        department: null,
        manager: undefined,
      }

      const result = await resendService.sendTemplate(to, templateId, data)

      expect(result.ok).toBe(true)
      expect(result.message).toContain(templateId)
      expect(result.message).toContain(to)
    })

    it('should handle empty template id', async () => {
      const to = 'test@example.com'
      const templateId = ''
      const data = { name: 'John Doe' }

      const result = await resendService.sendTemplate(to, templateId, data)

      expect(result.ok).toBe(true)
      expect(result.message).toContain('')
      expect(result.message).toContain(to)
    })

    it('should handle empty recipient', async () => {
      const to = ''
      const templateId = 'welcome-template'
      const data = { name: 'John Doe' }

      const result = await resendService.sendTemplate(to, templateId, data)

      expect(result.ok).toBe(true)
      expect(result.message).toContain(templateId)
      expect(result.message).toContain('')
    })
  })

  describe('TypeScript types', () => {
    it('should accept valid TemplateData types', async () => {
      const validData = {
        string: 'value',
        number: 42,
        boolean: true,
        nullValue: null,
        undefinedValue: undefined,
      }

      // This should compile without TypeScript errors
      const result = await resendService.sendTemplate('test@example.com', 'template', validData)
      
      expect(result.ok).toBe(true)
    })

    it('should handle flat data structures', async () => {
      const flatData = {
        userName: 'John',
        userAge: 30,
        isActive: true,
        theme: 'dark',
        notifications: true,
        language: null,
        source: 'web',
        timestamp: 1234567890,
        version: undefined,
      }

      const result = await resendService.sendTemplate('test@example.com', 'flat-template', flatData)
      
      expect(result.ok).toBe(true)
    })
  })

  describe('Error handling', () => {
    it('should handle service instantiation', () => {
      expect(() => new ResendService()).not.toThrow()
    })

    it('should return consistent response structure', async () => {
      const result = await resendService.sendEmail('test@example.com', 'Test')

      expect(result).toHaveProperty('ok')
      expect(result).toHaveProperty('message')
      expect(typeof result.ok).toBe('boolean')
      expect(typeof result.message).toBe('string')
    })
  })
})
