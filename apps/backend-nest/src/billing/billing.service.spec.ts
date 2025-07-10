/* eslint-disable @typescript-eslint/no-unsafe-assignment -- STRATO: archivo de test con mocks */
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BillingService, InvoiceDTO } from './billing.service';

describe('BillingService', () => {
  let service: BillingService;

  // Mock para el ConfigService
  let mockConfig: ConfigService;

  // Configurar el mock de fetch global
  const mockFetch = jest.fn();
  global.fetch = mockFetch as unknown as typeof global.fetch;

  beforeEach(() => {
    // Configurar el mock de ConfigService
    mockConfig = {
      get: jest.fn().mockImplementation((key: string) => {
        const config: Record<string, string> = {
          SUPABASE_URL: 'https://test.supabase.co',
          SUPABASE_ANON_KEY: 'test-key',
        };
        return config[key] ?? 'test';
      }),
    } as unknown as ConfigService;

    // Crear instancia del servicio con el mock de configuración
    service = new BillingService(mockConfig);

    // Limpiar los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  it('should create invoice with valid data', async () => {
    const invoiceData = {
      customer_id: 'user-1',
      amount: 100,
      currency: 'USD',
      description: 'Test',
    };

    const mockResponse: InvoiceDTO = {
      id: '1',
      ...invoiceData,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    // Configurar el mock de fetch para simular una respuesta exitosa

    const mockResponseObj = {
      ok: true,
      json: async (): Promise<InvoiceDTO[]> => {
        await Promise.resolve(); // Simulación de operación async
        return [mockResponse];
      },
    };
    mockFetch.mockResolvedValueOnce(mockResponseObj);

    // Assertion directo sin asignar a variable
    await expect(service.createInvoice(invoiceData)).resolves.toMatchObject(
      mockResponse,
    );

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

    // Configurar el mock de fetch para simular una respuesta de error

    const mockErrorResponse = {
      ok: false,
      text: async (): Promise<string> => {
        await Promise.resolve(); // Simulación de operación async
        return 'Invalid amount';
      },
    };
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
    mockFetch.mockResolvedValueOnce(mockErrorResponse);

    await expect(service.createInvoice(invalidInvoice)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should get invoice by id', async () => {
    const invoiceId = '1';
    const mockInvoice: InvoiceDTO = {
      id: invoiceId,
      customer_id: 'user-1',
      amount: 100,
      currency: 'USD',
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    // Configurar el mock de fetch para simular una respuesta exitosa

    const mockInvoiceObj = {
      ok: true,
      json: async (): Promise<InvoiceDTO[]> => {
        await Promise.resolve(); // Simulación de operación async
        return [mockInvoice];
      },
    };
    mockFetch.mockResolvedValueOnce(mockInvoiceObj);

    // Assertion directo sin asignar a variable
    await expect(service.getInvoiceById(invoiceId)).resolves.toMatchObject(
      mockInvoice,
    );

    // Verificar que se llamó a fetch con los parámetros correctos
    expect(mockFetch).toHaveBeenCalledWith(
      `https://test.supabase.co/rest/v1/invoices?id=${invoiceId}`,
      expect.any(Object),
    );
  });

  it('should return null for non-existent invoice', async () => {
    const nonExistentId = '999';

    // Configurar el mock de fetch para simular una respuesta vacía

    const mockEmptyResponse = {
      ok: true,
      json: async (): Promise<InvoiceDTO[]> => {
        await Promise.resolve(); // Simulación de operación async
        return [];
      },
    };
    mockFetch.mockResolvedValueOnce(mockEmptyResponse);

    expect(await service.getInvoiceById(nonExistentId)).toBeNull();

    // Verificar que se llamó a fetch con los parámetros correctos
    expect(mockFetch).toHaveBeenCalledWith(
      `https://test.supabase.co/rest/v1/invoices?id=${nonExistentId}`,
      expect.any(Object),
    );
  });
});
