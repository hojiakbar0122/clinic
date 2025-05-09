import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Prescription } from "../../prescriptions/models/prescription.model";

interface IMedicationCreationAttr {
  name: string;
  description: string;
  form: string;
  stock: number;
  price: number;
  expiry_date: Date;
}

@Table({ tableName: "medications" })
export class Medication extends Model<Medication, IMedicationCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
  })
  declare form: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare stock: number;

  @Column({
    type: DataType.DECIMAL,
  })
  declare price: number;

  @Column({
    type: DataType.DATE,
  })
  declare expiry_date: Date;

  @HasMany(() => Prescription)
  prescriptions: Prescription[];
}
