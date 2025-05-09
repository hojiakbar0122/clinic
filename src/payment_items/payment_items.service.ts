import { Injectable } from '@nestjs/common';
import { CreatePaymentItemDto } from './dto/create-payment_item.dto';
import { UpdatePaymentItemDto } from './dto/update-payment_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentItem } from './models/payment_item.model';

@Injectable()
export class PaymentItemsService {
  constructor(@InjectModel(PaymentItem) private readonly paymentItemModel: typeof PaymentItem){}

  create(createPaymentItemDto: CreatePaymentItemDto) {
    return this.paymentItemModel.create(createPaymentItemDto);
  }

  findAll() {
    return this.paymentItemModel.findAll();
  }

  findOne(id: number) {
    return this.paymentItemModel.findByPk(id);
  }

  update(id: number, updatePaymentItemDto: UpdatePaymentItemDto) {
    return this.paymentItemModel.update(updatePaymentItemDto, {where:{id}, returning:true});
  }

  remove(id: number) {
    return this.paymentItemModel.destroy({where:{id}});
  }
}
