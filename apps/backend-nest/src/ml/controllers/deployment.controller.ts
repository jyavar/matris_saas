import {
  Controller, Get, Post, Put, Delete, Param, Body, Query,
  HttpCode, HttpStatus, NotFoundException, BadRequestException
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { DeploymentService } from '../services/deployment.service'
import { DeployModelDto, QueryParamsDto, MLResponseDto, MLListResponseDto } from '../dto/ml.dto'
import { MLDeployment } from '../interfaces/ml.interfaces'

@Controller('ml/deployments')
export class DeploymentController {
  constructor(private readonly deploymentService: DeploymentService) {}

  @Get()
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getAllDeployments(@Query() query: QueryParamsDto): Promise<MLListResponseDto<MLDeployment>> {
    const { limit = 20, offset = 0 } = query
    const environment = query.status // Usar status como environment
    const deployments = await this.deploymentService.getAllDeployments(limit, offset, environment)
    return {
      success: true,
      data: deployments.data,
      count: deployments.count,
      page: Math.floor(offset / limit) + 1,
      limit,
      total_pages: Math.ceil(deployments.count / limit),
    }
  }

  @Get(':id')
  @Throttle({ default: { limit: 100, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getDeploymentById(@Param('id') id: string): Promise<MLResponseDto<MLDeployment>> {
    const deployment = await this.deploymentService.getDeploymentById(id)
    if (!deployment) throw new NotFoundException('Deployment not found')
    return { success: true, data: deployment }
  }

  @Post()
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @HttpCode(HttpStatus.CREATED)
  async deployModel(@Body() dto: DeployModelDto): Promise<MLResponseDto<MLDeployment>> {
    try {
      const deployment = await this.deploymentService.deployModel(dto)
      return { success: true, data: deployment }
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Failed to deploy model')
    }
  }

  @Put(':id')
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async updateDeployment(
    @Param('id') id: string,
    @Body() updates: Partial<MLDeployment>
  ): Promise<MLResponseDto<MLDeployment>> {
    const deployment = await this.deploymentService.updateDeployment(id, updates)
    if (!deployment) throw new NotFoundException('Deployment not found')
    return { success: true, data: deployment }
  }

  @Delete(':id')
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDeployment(@Param('id') id: string): Promise<void> {
    const deleted = await this.deploymentService.deleteDeployment(id)
    if (!deleted) throw new NotFoundException('Deployment not found')
  }
} 