/* eslint-disable @typescript-eslint/no-unsafe-argument -- STRATO: archivo de test con mocks de App */
import { INestApplication, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { CampaignsController } from './campaigns.controller'
import { CampaignsService } from './campaigns.service'

interface MockCampaignsService {
  list: jest.MockedFunction<() => Promise<Array<{ id: string; name: string; status: string }>>>
  create: jest.MockedFunction<(name: string) => Promise<{ id: string; name: string; status: string }>>
  delete: jest.MockedFunction<(id: string) => Promise<boolean>>
}

describe('CampaignsController (e2e)', () => {
  let app: INestApplication
  let mockCampaignsService: MockCampaignsService

  beforeEach(async () => {
    mockCampaignsService = {
      list: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    }

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CampaignsController],
      providers: [
        { provide: CampaignsService, useValue: mockCampaignsService },
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /campaigns', () => {
    it('should return list of campaigns', async () => {
      const mockList = [
        { id: '1', name: 'Test Campaign 1', status: 'active' },
        { id: '2', name: 'Test Campaign 2', status: 'paused' },
      ]
      mockCampaignsService.list.mockResolvedValueOnce(mockList)
      const res = await request(app.getHttpServer()).get('/campaigns')
      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockList)
    })
  })

  describe('POST /campaigns', () => {
    it('should create a campaign with valid data', async () => {
      const dto = { name: 'New Campaign' }
      const mockCampaign = { id: '3', name: 'New Campaign', status: 'active' }
      mockCampaignsService.create.mockResolvedValueOnce(mockCampaign)
      const res = await request(app.getHttpServer())
        .post('/campaigns')
        .send(dto)
      expect(res.status).toBe(201)
      expect(res.body).toEqual(mockCampaign)
      expect(mockCampaignsService.create).toHaveBeenCalledWith('New Campaign')
    })

    it('should return 400 for missing name', async () => {
      mockCampaignsService.create.mockImplementationOnce(() => {
        throw new Error('Name is required')
      })
      const res = await request(app.getHttpServer())
        .post('/campaigns')
        .send({})
      expect(res.status).toBeGreaterThanOrEqual(400)
    })
  })

  describe('DELETE /campaigns/:id', () => {
    it('should delete a campaign', async () => {
      mockCampaignsService.delete.mockResolvedValueOnce(true)
      const res = await request(app.getHttpServer()).delete('/campaigns/1')
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ ok: true })
    })

    it('should return 404 if campaign not found', async () => {
      mockCampaignsService.delete.mockImplementationOnce(() => {
        throw new NotFoundException('No encontrada')
      })
      const res = await request(app.getHttpServer()).delete('/campaigns/999')
      expect(res.status).toBe(404)
    })
  })
})
