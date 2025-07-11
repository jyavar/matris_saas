import {
  Controller, Get, Post, Param, Body, Query,
  HttpCode, HttpStatus, NotFoundException, BadRequestException
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { AnalyticsService } from '../services/analytics.service'
import { QueryParamsDto, MLResponseDto, MLListResponseDto } from '../dto/ml.dto'
import { MLAnalysis, MLFeature } from '../interfaces/ml.interfaces'

@Controller('ml/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('analyses')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getAllAnalyses(@Query() query: QueryParamsDto): Promise<MLListResponseDto<MLAnalysis>> {
    const { limit = 20, offset = 0, type } = query
    const analyses = await this.analyticsService.getAllAnalyses(limit, offset, type)
    return {
      success: true,
      data: analyses.data,
      count: analyses.count,
      page: Math.floor(offset / limit) + 1,
      limit,
      total_pages: Math.ceil(analyses.count / limit),
    }
  }

  @Get('analyses/:id')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getAnalysisById(@Param('id') id: string): Promise<MLResponseDto<MLAnalysis>> {
    const analysis = await this.analyticsService.getAnalysisById(id)
    if (!analysis) throw new NotFoundException('Analysis not found')
    return { success: true, data: analysis }
  }

  @Post('analyses')
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @HttpCode(HttpStatus.CREATED)
  async runAnalysis(
    @Body() body: { datasetId: string; analysisType: string; parameters?: Record<string, unknown> }
  ): Promise<MLResponseDto<MLAnalysis>> {
    try {
      const analysis = await this.analyticsService.runAnalysis(body.datasetId, body.analysisType, body.parameters)
      return { success: true, data: analysis }
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Failed to run analysis')
    }
  }

  @Get('features/:datasetId')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async analyzeFeatures(@Param('datasetId') datasetId: string): Promise<MLResponseDto<MLFeature[]>> {
    const features = await this.analyticsService.analyzeFeatures(datasetId)
    return { success: true, data: features }
  }

  @Get('features/importance/:modelId')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getFeatureImportance(@Param('modelId') modelId: string): Promise<MLResponseDto<MLFeature[]>> {
    const features = await this.analyticsService.getFeatureImportance(modelId)
    return { success: true, data: features }
  }
} 