import {
  Controller, Get, Post, Param, Body, Query,
  HttpCode, HttpStatus, NotFoundException, BadRequestException
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { TrainingService } from '../services/training.service'
import { StartTrainingDto, QueryParamsDto, MLResponseDto, MLListResponseDto } from '../dto/ml.dto'
import { MLTrainingJob } from '../interfaces/ml.interfaces'

@Controller('ml/jobs')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get()
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getAllJobs(@Query() query: QueryParamsDto): Promise<MLListResponseDto<MLTrainingJob>> {
    const { limit = 20, offset = 0, status } = query
    const jobs = await this.trainingService.getAllJobs(limit, offset, status)
    return {
      success: true,
      data: jobs.data,
      count: jobs.count,
      page: Math.floor(offset / limit) + 1,
      limit,
      total_pages: Math.ceil(jobs.count / limit),
    }
  }

  @Get(':id')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getJobById(@Param('id') id: string): Promise<MLResponseDto<MLTrainingJob>> {
    const job = await this.trainingService.getJobById(id)
    if (!job) throw new NotFoundException('Job not found')
    return { success: true, data: job }
  }

  @Post()
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @HttpCode(HttpStatus.CREATED)
  async startTraining(@Body() dto: StartTrainingDto): Promise<MLResponseDto<MLTrainingJob>> {
    try {
      const job = await this.trainingService.startTraining(dto)
      return { success: true, data: job }
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Failed to start training')
    }
  }

  @Post(':id/cancel')
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async cancelTraining(@Param('id') id: string): Promise<MLResponseDto<{ cancelled: boolean }>> {
    const cancelled = await this.trainingService.cancelTraining(id)
    if (!cancelled) throw new NotFoundException('Job not found or cannot be cancelled')
    return { success: true, data: { cancelled: true } }
  }
} 