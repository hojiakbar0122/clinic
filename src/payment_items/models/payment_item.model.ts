import { Column, DataType, Model, Table } from "sequelize-typescript";

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

  @Column({
    type: DataType.STRING,
  })
  declare item_type: string

  @Column({
    type: DataType.INTEGER,
  })
  declare itemId: number;

  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number;


  @Column({
    type: DataType.STRING,
  })
  declare note: string
}
