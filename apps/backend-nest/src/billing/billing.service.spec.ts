import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BillingService } from './billing.service';

describe('BillingService', () => {
  let service: BillingService;

  // Mock para el ConfigService
  let mockConfig: ConfigService;

  // Configurar el mock de fetch global
  const mockFetch = vi.fn();
  global.fetch = mockFetch as unknown as typeof global.fetch;

  beforeEach(() => {
    // Configurar el mock de ConfigService
    mockConfig = {
      get: vi.fn().mockImplementation((key: string) => {
        const config = {
          SUPABASE_URL: 'https://test.supabase.co',
          SUPABASE_ANON_KEY: 'test-key',
        };
        return config[key] || 'test';
      }),
    } as unknown as ConfigService;

    // Crear instancia del servicio con el mock de configuración
    service = new BillingService(mockConfig);

    // Limpiar los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  it('should create invoice with valid data', async () => {
    const invoiceData = {
      customer_id: 'user-1',
      amount: 100,
      currency: 'USD',
      description: 'Test',
    };

    const mockResponse = {
      id: '1',
      ...invoiceData,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    // Configurar el mock de fetch para simular una respuesta exitosa
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockResponse],
    });

    const result = await service.createInvoice(invoiceData);
    expect(result).toEqual(mockResponse);

    // Verificar que se llamó a fetch con los parámetros correctos
    expect(mockFetch).toHaveBeenCalledWith(
      'https://test.supabase.co/rest/v1/invoices',
      expect.objectContaining({
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify(invoiceData),
      }),
    );
  });

  it('should throw error for invalid amount', async () => {
    // Crear un objeto que cumpla con la interfaz CreateInvoiceData pero con amount inválido
    const invalidInvoice = {
      customer_id: 'user-1',
      amount: -100, // Invalid amount
      currency: 'USD',
    };

    await expect(service.createInvoice(invalidInvoice)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should get invoice by id', async () => {
    const invoiceId = '1';
    const mockInvoice = {
      id: invoiceId,
      customer_id: 'user-1',
      amount: 100,
      currency: 'USD',
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    // Configurar el mock de fetch para simular una respuesta exitosa
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockInvoice],
    });

    const result = await service.getInvoiceById(invoiceId);
    expect(result).toEqual(mockInvoice);

    // Verificar que se llamó a fetch con los parámetros correctos
    expect(mockFetch).toHaveBeenCalledWith(
      `https://test.supabase.co/rest/v1/invoices?id=eq.${invoiceId}&select=*`,
      expect.objectContaining({
        method: 'GET',
        headers: expect.any(Object),
      }),
    );
  });

  it('should return null for non-existent invoice', async () => {
    const nonExistentId = '999';

    // Configurar el mock de fetch para simular una respuesta vacía
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const result = await service.getInvoiceById(nonExistentId);
    expect(result).toBeNull();

    // Verificar que se llamó a fetch con los parámetros correctos
    expect(mockFetch).toHaveBeenCalledWith(
      `https://test.supabase.co/rest/v1/invoices?id=eq.${nonExistentId}&select=*`,
      expect.any(Object),
    );
  });
});
