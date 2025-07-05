import { IncomingMessage, ServerResponse } from 'http'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { paymentsController } from '../controllers/payments.controller'

// Mock dependencies
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

describe('Payments Controller', () => {
  let mockReq: Partial<IncomingMessage>
  let mockRes: Partial<ServerResponse>
  let writeHeadSpy: ReturnType<typeof vi.fn>
  let endSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    writeHeadSpy = vi.fn()
    endSpy = vi.fn()

    mockReq = {
      method: 'POST',
      url: '/api/payments/create-intent',
      headers: {
        'content-type': 'application/json',
      },
    }

    mockRes = {
      writeHead: writeHeadSpy,
      end: endSpy,
    }
  })

  describe('createPaymentIntent', () => {
    it('should create payment intent successfully', async () => {
      await paymentsController.createPaymentIntent(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        { amount: 1000, currency: 'usd' },
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalledWith(
        JSON.stringify({
          success: true,
          data: { payment_intent_id: 'pi_mock_123' },
        }),
      )
    })

    it('should handle payment intent creation without user', async () => {
      await paymentsController.createPaymentIntent(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        { amount: 1000, currency: 'usd' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })

    it('should handle payment intent creation without body', async () => {
      await paymentsController.createPaymentIntent(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('getPaymentMethods', () => {
    it('should return empty payment methods list', async () => {
      await paymentsController.getPaymentMethods(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalledWith(
        JSON.stringify({
          success: true,
          data: [],
        }),
      )
    })

    it('should handle request without parameters', async () => {
      await paymentsController.getPaymentMethods(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('addPaymentMethod', () => {
    it('should add payment method successfully', async () => {
      await paymentsController.addPaymentMethod(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        { payment_method: 'pm_card_123' },
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalledWith(
        JSON.stringify({
          success: true,
          data: { payment_method_id: 'pm_mock_123' },
        }),
      )
    })

    it('should handle add payment method without body', async () => {
      await paymentsController.addPaymentMethod(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('removePaymentMethod', () => {
    it('should remove payment method successfully', async () => {
      await paymentsController.removePaymentMethod(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        { id: 'pm_123' },
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalledWith(
        JSON.stringify({
          success: true,
          message: 'Payment method removed',
        }),
      )
    })

    it('should handle remove payment method without parameters', async () => {
      await paymentsController.removePaymentMethod(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('Error Scenarios', () => {
    it('should handle malformed request data gracefully', async () => {
      const invalidBody = { invalid: 'data structure' }

      await paymentsController.createPaymentIntent(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        invalidBody,
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })

    it('should handle requests without authentication', async () => {
      await paymentsController.getPaymentMethods(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        // No user provided
      )

      expect(writeHeadSpy).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
      expect(endSpy).toHaveBeenCalled()
    })
  })

  describe('Response Format Validation', () => {
    it('should return consistent success response format', async () => {
      await paymentsController.createPaymentIntent(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        { amount: 1000, currency: 'usd' },
        { id: 'user-1', email: 'test@example.com' },
      )

      expect(endSpy).toHaveBeenCalledWith(
        expect.stringMatching(/"success":\s*true/),
      )
      expect(endSpy).toHaveBeenCalledWith(expect.stringMatching(/"data":\s*{/))
    })

    it('should return valid JSON responses', async () => {
      await paymentsController.getPaymentMethods(
        mockReq as IncomingMessage,
        mockRes as ServerResponse,
        {},
        {},
        { id: 'user-1', email: 'test@example.com' },
      )

      const responseCall = endSpy.mock.calls[0]?.[0]
      expect(() => JSON.parse(responseCall)).not.toThrow()
    })
  })
})
