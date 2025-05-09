import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentItemsService } from './payment_items.service';
import { CreatePaymentItemDto } from './dto/create-payment_item.dto';
import { UpdatePaymentItemDto } from './dto/update-payment_item.dto';

@Controller('payment-items')
export class PaymentItemsController {
  constructor(private readonly paymentItemsService: PaymentItemsService) {}

  @Post()
  create(@Body() createPaymentItemDto: CreatePaymentItemDto) {
    return this.paymentItemsService.create(createPaymentItemDto);
  }

  @Get()
  findAll() {
    return this.paymentItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentItemDto: UpdatePaymentItemDto) {
    return this.paymentItemsService.update(+id, updatePaymentItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentItemsService.remove(+id);
  }
}
