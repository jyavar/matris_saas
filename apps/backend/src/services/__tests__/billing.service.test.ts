import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import type { TablesInsert } from '../../types/supabase.types.js'
import { billingService } from '../billing.service.js'

interface Invoice {
  id: string
  customer_id: string
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'cancelled'
  created_at: string
}

const mockInvoice: Invoice = {
  id: 'inv-1',
  customer_id: 'cus-1',
  amount: 100,
  currency: 'USD',
  status: 'pending',
  created_at: '2024-01-01T00:00:00Z',
}

const mockInvoiceInsert: TablesInsert<'invoices'> = {
  customer_id: 'cus-1',
  amount: 100,
  currency: 'USD',
  status: 'pending',
}

global.fetch = vi.fn() as unknown as typeof fetch
const fetchMock = fetch as unknown as Mock

describe('billingService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getAllInvoices retorna facturas para un cliente', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockInvoice],
    } as Response)
    const result = await billingService.getAllInvoices('cus-1')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('inv-1')
  })

  it('getAllInvoices retorna [] si fetch falla', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false } as Response)
    const result = await billingService.getAllInvoices('cus-1')
    expect(result).toEqual([])
  })

  it('getInvoiceById retorna una factura', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockInvoice,
    } as Response)
    const result = await billingService.getInvoiceById('inv-1')
    expect(result?.id).toBe('inv-1')
  })

  it('getInvoiceById retorna null si fetch falla', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false } as Response)
    const result = await billingService.getInvoiceById('inv-1')
    expect(result).toBeNull()
  })

  it('createInvoice crea una factura', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockInvoice],
    } as Response)
    const result = await billingService.createInvoice(mockInvoiceInsert)
    expect(result).toHaveProperty('id', 'inv-1')
  })

  it('updateInvoice actualiza una factura', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockInvoice],
    } as Response)
    const result = await billingService.updateInvoice('inv-1', { amount: 200 })
    expect(result).toHaveProperty('id', 'inv-1')
  })

  it('deleteInvoice elimina una factura', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockInvoice],
    } as Response)
    const result = await billingService.deleteInvoice('inv-1')
    expect(result).toHaveProperty('id', 'inv-1')
  })
})
