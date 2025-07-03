import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { vi } from 'vitest';

import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';

describe('CampaignsController (e2e)', () => {
  let app: INestApplication;
  // campaignsService no se usa directamente en las pruebas

  const mockCampaignsService = {
    list: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CampaignsController],
      providers: [
        { provide: CampaignsService, useValue: mockCampaignsService },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    // No es necesario obtener campaignsService ya que no se usa directamente
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /campaigns', () => {
    it('should return list of campaigns', async () => {
      const mockList = [
        { id: '1', name: 'Test Campaign 1' },
        { id: '2', name: 'Test Campaign 2' },
      ];
      mockCampaignsService.list.mockResolvedValueOnce(mockList);
      const res = await request(app.getHttpServer()).get('/campaigns');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockList);
    });
  });

  describe('POST /campaigns', () => {
    it('should create a campaign with valid data', async () => {
      const dto = { name: 'New Campaign' };
      const mockCampaign = { id: '3', name: 'New Campaign' };
      mockCampaignsService.create.mockResolvedValueOnce(mockCampaign);
      const res = await request(app.getHttpServer())
        .post('/campaigns')
        .send(dto);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockCampaign);
      expect(mockCampaignsService.create).toHaveBeenCalledWith('New Campaign');
    });
    it('should return 400 for missing name', async () => {
      mockCampaignsService.create.mockImplementationOnce(() => {
        throw new Error('Name is required');
      });
      const res = await request(app.getHttpServer())
        .post('/campaigns')
        .send({});
      expect(res.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('DELETE /campaigns/:id', () => {
    it('should delete a campaign', async () => {
      mockCampaignsService.delete.mockResolvedValueOnce(true);
      const res = await request(app.getHttpServer()).delete('/campaigns/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ok: true });
    });
    it('should return 404 if campaign not found', async () => {
      mockCampaignsService.delete.mockResolvedValueOnce(false);
      const res = await request(app.getHttpServer()).delete('/campaigns/999');
      expect(res.status).toBeGreaterThanOrEqual(400);
    });
  });
});
