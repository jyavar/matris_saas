import {
  Controller, Get, Post, Put, Delete, Param, Body, Query,
  HttpCode, HttpStatus, NotFoundException, BadRequestException
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { DatasetsService } from '../services/datasets.service'
import { CreateDatasetDto, UpdateDatasetDto, QueryParamsDto, MLResponseDto, MLListResponseDto } from '../dto/ml.dto'
import { MLDataset } from '../interfaces/ml.interfaces'

@Controller('ml/datasets')
export class DatasetsController {
  constructor(private readonly datasetsService: DatasetsService) {}

  @Get()
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getAllDatasets(@Query() query: QueryParamsDto): Promise<MLListResponseDto<MLDataset>> {
    const { limit = 20, offset = 0, type, status } = query
    const datasets = await this.datasetsService.getAllDatasets(limit, offset, type, status)
    return {
      success: true,
      data: datasets.data,
      count: datasets.count,
      page: Math.floor(offset / limit) + 1,
      limit,
      total_pages: Math.ceil(datasets.count / limit),
    }
  }

  @Get(':id')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getDatasetById(@Param('id') id: string): Promise<MLResponseDto<MLDataset>> {
    const dataset = await this.datasetsService.getDatasetById(id)
    if (!dataset) throw new NotFoundException('Dataset not found')
    return { success: true, data: dataset }
  }

  @Post()
  @Throttle({ default: { limit: 50, ttl: 60_000 } })
  @HttpCode(HttpStatus.CREATED)
  async createDataset(@Body() dto: CreateDatasetDto): Promise<MLResponseDto<MLDataset>> {
    try {
      const dataset = await this.datasetsService.createDataset(dto)
      return { success: true, data: dataset }
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Failed to create dataset')
    }
  }

  @Put(':id')
  @Throttle({ default: { limit: 50, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async updateDataset(
    @Param('id') id: string,
    @Body() dto: UpdateDatasetDto
  ): Promise<MLResponseDto<MLDataset>> {
    const dataset = await this.datasetsService.updateDataset(id, dto)
    if (!dataset) throw new NotFoundException('Dataset not found')
    return { success: true, data: dataset }
  }

  @Delete(':id')
  @Throttle({ default: { limit: 50, ttl: 60_000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDataset(@Param('id') id: string): Promise<void> {
    const deleted = await this.datasetsService.deleteDataset(id)
    if (!deleted) throw new NotFoundException('Dataset not found')
  }

  @Post(':id/validate')
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async validateDataset(@Param('id') id: string): Promise<MLResponseDto<MLDataset>> {
    const dataset = await this.datasetsService.validateDataset(id)
    if (!dataset) throw new NotFoundException('Dataset not found')
    return { success: true, data: dataset }
  }
} 