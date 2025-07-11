import {
  Controller, Post, Get, Param, Body, Query,
  HttpCode, HttpStatus, NotFoundException, BadRequestException
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { PredictionService } from '../services/prediction.service'
import { MakePredictionDto, MLResponseDto, MLListResponseDto } from '../dto/ml.dto'
import { MLPrediction } from '../interfaces/ml.interfaces'

@Controller('ml/predict')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Post()
  @Throttle({ default: { limit: 50, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async makePrediction(@Body() dto: MakePredictionDto): Promise<MLResponseDto<MLPrediction>> {
    try {
      const prediction = await this.predictionService.makePrediction(dto)
      return { success: true, data: prediction }
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Prediction failed')
    }
  }

  @Get('history/:modelId')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getPredictionHistory(
    @Param('modelId') modelId: string,
    @Query('limit') limit = 20,
    @Query('offset') offset = 0
  ): Promise<MLListResponseDto<MLPrediction>> {
    const history = await this.predictionService.getPredictionHistory(modelId, Number(limit), Number(offset))
    return {
      success: true,
      data: history.data,
      count: history.count,
      page: history.page,
      limit: history.limit,
      total_pages: history.total_pages,
    }
  }
} 