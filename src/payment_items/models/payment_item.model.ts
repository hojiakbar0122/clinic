import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Payment } from "../../payments/models/payment.model";
import { Service } from "../../services/models/service.model";

interface IPaymentItemCreationAttr {
  paymentId: number;
  item_type: string;
  itemId: number;
  amount: number;
  note: string;
}

@Table({ tableName: "payment_items" })
export class PaymentItem extends Model<PaymentItem, IPaymentItemCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Payment)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare paymentId: number;

  @Column({
    type: DataType.STRING,
  })
  declare item_type: string;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare itemId: number;

  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number;

  @Column({
    type: DataType.STRING,
  })
  declare note: string;
}
