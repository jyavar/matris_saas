import type { TablesInsert, TablesUpdate } from '../types/supabase.types.js'

export type InvoiceDTO = {
  id: string
  customer_id: string
  amount: number
  currency: string
  description?: string | null
  due_date?: string | null
  status: 'pending' | 'paid' | 'cancelled'
  created_at: string
}

function getSupabaseVars() {
  const SUPABASE_URL = process.env.SUPABASE_URL || ''
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || ''
  const INVOICES_ENDPOINT = `${SUPABASE_URL}/rest/v1/invoices`
  return { SUPABASE_URL, SUPABASE_KEY, INVOICES_ENDPOINT }
}

function isInvoiceDTO(obj: unknown): obj is InvoiceDTO {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'customer_id' in obj &&
    'amount' in obj &&
    'currency' in obj &&
    'status' in obj &&
    'created_at' in obj
  )
}

async function fetchInvoices(
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<InvoiceDTO[]> {
  const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
  const url = new URL(INVOICES_ENDPOINT)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value))
  })
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  if (!res.ok) throw new ApiError(res.status, await res.text())
  const data = (await res.json()) as unknown[]
  return data.filter(isInvoiceDTO)
}

export const billingService = {
  async getAllInvoices(customerId: string) {
    return fetchInvoices({ customer_id: customerId })
  },

  async getInvoiceById(id: string) {
    const invoices = await fetchInvoices({ id })
    return invoices[0] || null
  },

  async createInvoice(invoice: TablesInsert<'invoices'>) {
    const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
    const res = await fetch(INVOICES_ENDPOINT, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(invoice),
    })
    if (!res.ok) throw new ApiError(res.status, await res.text())
    const data = (await res.json()) as unknown[]
    const invoices = data.filter(isInvoiceDTO)
    return invoices[0] || null
  },

  async updateInvoice(id: string, invoice: TablesUpdate<'invoices'>) {
    const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
    const res = await fetch(`${INVOICES_ENDPOINT}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(invoice),
    })
    if (!res.ok) throw new ApiError(res.status, await res.text())
    const data = (await res.json()) as unknown[]
    const invoices = data.filter(isInvoiceDTO)
    return invoices[0] || null
  },

  async deleteInvoice(id: string) {
    const { INVOICES_ENDPOINT, SUPABASE_KEY } = getSupabaseVars()
    const res = await fetch(`${INVOICES_ENDPOINT}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: 'return=representation',
      },
    })
    if (!res.ok) throw new ApiError(res.status, await res.text())
    const data = (await res.json()) as unknown[]
    const invoices = data.filter(isInvoiceDTO)
    if (!invoices.length) throw new ApiError(404, 'Invoice not found')
    return invoices[0]
  },
}
