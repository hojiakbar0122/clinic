import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";
import { PaymentItem } from "../../payment_items/models/payment_item.model";

interface IPaymentCreationAttr {
  patientId: number;
  amount: number;
  payment_method: string;
  transactionId: string;
  paid_at: Date;
  created_at: Date;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare patientId: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare amount: number;

  @Column({
    type: DataType.STRING,
  })
  declare payment_method: string;

  @Column({
    type: DataType.STRING,
  })
  declare transactionId: string;

  @Column({
    type: DataType.STRING,
  })
  declare paid_at: Date;

  @Column({
    type: DataType.STRING,
  })
  declare created_at: Date;

  @HasMany(() => PaymentItem)
  paymentitems: PaymentItem[];
}
