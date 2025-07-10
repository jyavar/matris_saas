import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface InvoiceDTO {
  id: string;
  customer_id: string;
  amount: number;
  currency: string;
  description?: string | null;
  due_date?: string | null;
  status: 'pending' | 'paid' | 'cancelled';
  created_at: string;
}

export interface CreateInvoiceData {
  customer_id: string;
  amount: number;
  currency: string;
  description?: string;
  due_date?: string;
}

export interface UpdateInvoiceData {
  amount?: number;
  currency?: string;
  description?: string;
  due_date?: string;
  status?: 'pending' | 'paid' | 'cancelled';
}

@Injectable()
export class BillingService {
  private readonly supabaseUrl: string;
  private readonly supabaseKey: string;
  private readonly invoicesEndpoint: string;

  constructor(private configService: ConfigService) {
    this.supabaseUrl = this.configService.get<string>('SUPABASE_URL') ?? '';
    this.supabaseKey =
      this.configService.get<string>('SUPABASE_ANON_KEY') ?? '';
    this.invoicesEndpoint = `${this.supabaseUrl}/rest/v1/invoices`;
  }

  private isInvoiceDTO(obj: unknown): obj is InvoiceDTO {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'id' in obj &&
      'customer_id' in obj &&
      'amount' in obj &&
      'currency' in obj &&
      'status' in obj &&
      'created_at' in obj
    );
  }

  private async fetchInvoices(
    params: Record<string, string | number | boolean | undefined> = {},
  ): Promise<InvoiceDTO[]> {
    const url = new URL(this.invoicesEndpoint);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });

    const res = await fetch(url.toString(), {
      headers: {
        apikey: this.supabaseKey,
        Authorization: `Bearer ${this.supabaseKey}`,
      },
    });

    if (!res.ok) {
      throw new BadRequestException(`Supabase error: ${await res.text()}`);
    }

    const data = (await res.json()) as unknown[];
    return data.filter((item) => this.isInvoiceDTO(item));
  }

  async getAllInvoices(customerId: string): Promise<InvoiceDTO[]> {
    return this.fetchInvoices({ customer_id: customerId });
  }

  async getInvoiceById(id: string): Promise<InvoiceDTO | null> {
    const invoices = await this.fetchInvoices({ id });
    return invoices[0] ?? null;
  }

  async createInvoice(invoice: CreateInvoiceData): Promise<InvoiceDTO | null> {
    const res = await fetch(this.invoicesEndpoint, {
      method: 'POST',
      headers: {
        apikey: this.supabaseKey,
        Authorization: `Bearer ${this.supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(invoice),
    });

    if (!res.ok) {
      throw new BadRequestException(`Supabase error: ${await res.text()}`);
    }

    const data = (await res.json()) as unknown[];
    const invoices = data.filter((item) => this.isInvoiceDTO(item));
    return invoices[0] ?? null;
  }

  async updateInvoice(
    id: string,
    invoice: UpdateInvoiceData,
  ): Promise<InvoiceDTO | null> {
    const res = await fetch(`${this.invoicesEndpoint}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: this.supabaseKey,
        Authorization: `Bearer ${this.supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(invoice),
    });

    if (!res.ok) {
      throw new BadRequestException(`Supabase error: ${await res.text()}`);
    }

    const data = (await res.json()) as unknown[];
    const invoices = data.filter((item) => this.isInvoiceDTO(item));
    return invoices[0] ?? null;
  }

  async deleteInvoice(id: string): Promise<InvoiceDTO> {
    const res = await fetch(`${this.invoicesEndpoint}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: this.supabaseKey,
        Authorization: `Bearer ${this.supabaseKey}`,
        Prefer: 'return=representation',
      },
    });

    if (!res.ok) {
      throw new BadRequestException(`Supabase error: ${await res.text()}`);
    }

    const data = (await res.json()) as unknown[];
    const invoices = data.filter((item) => this.isInvoiceDTO(item));

    if (!invoices.length) {
      throw new NotFoundException('Invoice not found');
    }

    return invoices[0];
  }
}
