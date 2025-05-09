import { Module } from '@nestjs/common';
import { PaymentItemsService } from './payment_items.service';
import { PaymentItemsController } from './payment_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentItem } from './models/payment_item.model';

@Module({
  imports:[SequelizeModule.forFeature([PaymentItem])],
  controllers: [PaymentItemsController],
  providers: [PaymentItemsService],
})
export class PaymentItemsModule {}
