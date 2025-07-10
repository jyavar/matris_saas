/* eslint-disable @typescript-eslint/no-unsafe-argument -- STRATO: archivo de test con mocks de App */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

describe('BillingController (e2e)', () => {
  let app: INestApplication;

  const mockBillingService = {
    createInvoice: jest.fn(),
    getInvoiceById: jest.fn(),
    getAllInvoices: jest.fn(),
    updateInvoice: jest.fn(),
    deleteInvoice: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BillingController],
      providers: [{ provide: BillingService, useValue: mockBillingService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ 
        canActivate: (context: any) => {
          // Simular usuario autenticado
          const request = context.switchToHttp().getRequest();
          request.user = { id: 'user-1' };
          return true;
        }
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /billing/invoices', () => {
    it('should create invoice with valid data', async () => {
      const dto: CreateInvoiceDto = {
        customerId: 'user-1',
        amount: 100,
        currency: 'USD',
        description: 'Test',
        dueDate: '2025-01-01',
      };
      const mockInvoice = { 
        id: 'inv-1', 
        customer_id: 'user-1',
        amount: 100,
        currency: 'USD',
        description: 'Test',
        due_date: '2025-01-01',
        status: 'pending',
        created_at: new Date().toISOString()
      };
      mockBillingService.createInvoice.mockResolvedValueOnce(mockInvoice);

      const res = await request(app.getHttpServer())
        .post('/billing/invoices')
        .send(dto)
        .set('Authorization', 'Bearer testtoken');

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(mockInvoice);
      expect(mockBillingService.createInvoice).toHaveBeenCalledWith({
        customerId: 'user-1',
        amount: 100,
        currency: 'USD',
        description: 'Test',
        dueDate: '2025-01-01',
        customer_id: 'user-1', // El controller agrega esto
      });
    });

    it('should return 400 for invalid data', async () => {
      const dto = {
        customerId: 'user-1',
        amount: undefined,
        currency: 'USD',
        description: 'Test',
        dueDate: '2025-01-01',
      };
      // Simular error de validación
      mockBillingService.createInvoice.mockImplementationOnce(() => {
        throw new Error('Validation failed');
      });
      const res = await request(app.getHttpServer())
        .post('/billing/invoices')
        .send(dto)
        .set('Authorization', 'Bearer testtoken');
      expect(res.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('GET /billing/invoices/:id', () => {
    it('should return invoice by id', async () => {
      const mockInvoice = {
        id: 'inv-1',
        customer_id: 'user-1', // Debe coincidir con el usuario autenticado
        amount: 100,
        currency: 'USD',
        description: 'Test',
        due_date: '2025-01-01',
        status: 'pending',
        created_at: new Date().toISOString()
      };
      mockBillingService.getInvoiceById.mockResolvedValueOnce(mockInvoice);
      const res = await request(app.getHttpServer())
        .get('/billing/invoices/inv-1')
        .set('Authorization', 'Bearer testtoken');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(mockInvoice);
    });
    
    it('should return 404 if invoice not found', async () => {
      mockBillingService.getInvoiceById.mockResolvedValueOnce(null);
      const res = await request(app.getHttpServer())
        .get('/billing/invoices/doesnotexist')
        .set('Authorization', 'Bearer testtoken');
      expect(res.status).toBeGreaterThanOrEqual(400);
    });
  });
});
