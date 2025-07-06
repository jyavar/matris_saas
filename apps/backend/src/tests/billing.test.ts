import { IncomingMessage, ServerResponse } from 'http'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createInvoice, deleteInvoice,getInvoiceById, getInvoices, updateInvoice } from '../controllers/billing.controller'

// Mock dependencies
vi.mock('../services/billing.service', () => ({
  billingService: {
    getInvoices: vi.fn().mockResolvedValue([
      { id: 'inv_1', amount: 1000, status: 'paid', created: Date.now() },
      { id: 'inv_2', amount: 2000, status: 'pending', created: Date.now() },
    ]),
    getInvoiceById: vi.fn().mockResolvedValue({
      id: 'inv_1',
      amount: 1000,
      status: 'paid',
      created: Date.now(),
    }),
    createInvoice: vi.fn().mockResolvedValue({
      id: 'inv_new',
      amount: 1500,
      status: 'draft',
      created: Date.now(),
    }),
    updateInvoice: vi.fn().mockResolvedValue({
      id: 'inv_1',
      amount: 1200,
      status: 'sent',
      created: Date.now(),
    }),
    deleteInvoice: vi.fn().mockResolvedValue(true),
    sendInvoice: vi.fn().mockResolvedValue({
      id: 'inv_1',
      status: 'sent',
      sent_at: Date.now(),
    }),
  },
}))

vi.mock('../services/logger.service', () => ({
  logAction: vi.fn(),
}))

vi.mock('../utils/response.helper', () => ({
  sendError: vi.fn((res: ServerResponse, message: string, status: number) => {
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: message }))
  }),
  sendSuccess: vi.fn((res: ServerResponse, data: unknown, message?: string) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true, data, message }))
  }),
}))

describe('Billing Controller', () => {
  let mockReq: Partial<IncomingMessage>
  let mockRes: Partial<ServerResponse>
  let writeHeadSpy: ReturnType<typeof vi.fn>
  let endSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    writeHeadSpy = vi.fn()
    endSpy = vi.fn()

    mockReq = {
      method: 'GET',
      url: '/api/billing/invoices',
      headers: {
        'content-type': 'application/json',
      },
    }

    mockRes = {
      writeHead: writeHeadSpy,
      end: endSpy,
    }

    vi.clearAllMocks()
  })

  describe('getInvoices', () => {
    it('should return list of invoices', async () => {
      await billingController.getInvoices(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(Array.isArray(response.data)).toBe(true)
      expect(response.data).toHaveLength(2)
      expect(response.data[0]).toHaveProperty('id', 'inv_1')
      expect(response.data[0]).toHaveProperty('status', 'paid')
    })

    it('should handle request without user', async () => {
      await billingController.getInvoices(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('getInvoiceById', () => {
    it('should return specific invoice', async () => {
      await billingController.getInvoiceById(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'inv_1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('id', 'inv_1')
      expect(response.data).toHaveProperty('amount', 1000)
    })

    it('should handle missing invoice ID', async () => {
      await billingController.getInvoiceById(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('createInvoice', () => {
    it('should create new invoice', async () => {
      const invoiceData = {
        amount: 1500,
        description: 'Test invoice',
        due_date: new Date().toISOString(),
      }

      await billingController.createInvoice(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        invoiceData,
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('id', 'inv_new')
      expect(response.data).toHaveProperty('amount', 1500)
      expect(response.data).toHaveProperty('status', 'draft')
    })

    it('should handle create invoice without body', async () => {
      await billingController.createInvoice(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('updateInvoice', () => {
    it('should update existing invoice', async () => {
      const updateData = {
        amount: 1200,
        description: 'Updated invoice',
      }

      await billingController.updateInvoice(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'inv_1' },
        updateData,
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('id', 'inv_1')
      expect(response.data).toHaveProperty('amount', 1200)
      expect(response.data).toHaveProperty('status', 'sent')
    })

    it('should handle update without invoice ID', async () => {
      await billingController.updateInvoice(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        { amount: 1200 },
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('deleteInvoice', () => {
    it('should delete invoice successfully', async () => {
      await billingController.deleteInvoice(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'inv_1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.message).toContain('deleted')
    })

    it('should handle delete without invoice ID', async () => {
      await billingController.deleteInvoice(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('sendInvoice', () => {
    it('should send invoice successfully', async () => {
      await billingController.sendInvoice(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'inv_1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('status', 'sent')
      expect(response.data).toHaveProperty('sent_at')
    })

    it('should handle send invoice without ID', async () => {
      await billingController.sendInvoice(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle service errors gracefully', async () => {
      const { billingService } = await import('../services/billing.service')
      vi.mocked(billingService.getInvoices).mockRejectedValueOnce(
        new Error('Database connection failed'),
      )

      await billingController.getInvoices(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(500, {
        'Content-Type': 'application/json',
      })

      const response = JSON.parse(endSpy.mock.calls[0]?.[0])
      expect(response.success).toBe(false)
      expect(response.error).toContain('Failed')
    })
  })

  describe('Response Format Validation', () => {
    it('should return consistent response format', async () => {
      await billingController.getInvoices(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(endSpy).toHaveBeenCalledWith(
        expect.stringMatching(/"success":\s*true/),
      )
      expect(endSpy).toHaveBeenCalledWith(expect.stringMatching(/"data":\s*\[/))
    })

    it('should return valid JSON responses', async () => {
      await billingController.getInvoiceById(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'inv_1' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      const responseCall = endSpy.mock.calls[0]?.[0]
      expect(() => JSON.parse(responseCall)).not.toThrow()
    })
  })
})
