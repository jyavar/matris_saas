import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { JwtAuthGuard, JwtRequest } from '../auth/guards/jwt-auth.guard';
import { BillingService } from './billing.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto';

@Controller('billing')
@UseGuards(JwtAuthGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('invoices')
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  async getAllInvoices(@Request() req: JwtRequest) {
    const customerId = req.user?.id;
    if (!customerId) {
      throw new BadRequestException('User ID is required');
    }
    const invoices = await this.billingService.getAllInvoices(customerId);
    return { invoices };
  }

  @Get('invoices/:id')
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  async getInvoiceById(@Param('id') id: string, @Request() req: JwtRequest) {
    const customerId = req.user?.id;
    const invoice = await this.billingService.getInvoiceById(id);

    if (!invoice || invoice.customer_id !== customerId) {
      throw new Error('Invoice not found');
    }

    return invoice;
  }

  @Post('invoices')
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  @HttpCode(HttpStatus.CREATED)
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Request() req: JwtRequest,
  ) {
    const customerId = req.user?.id;
    if (!customerId) {
      throw new BadRequestException('User ID is required');
    }
    const newInvoice = await this.billingService.createInvoice({
      ...createInvoiceDto,
      customer_id: customerId,
    });
    return newInvoice;
  }

  @Patch('invoices/:id')
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  async updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    const updatedInvoice = await this.billingService.updateInvoice(
      id,
      updateInvoiceDto,
    );
    return updatedInvoice;
  }

  @Delete('invoices/:id')
  @Throttle({ default: { limit: 100, ttl: 900_000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteInvoice(@Param('id') id: string) {
    await this.billingService.deleteInvoice(id);
  }
}
