import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Appointment } from "../../appointments/models/appointment.model";
import { Medication } from "../../medications/models/medication.model";

interface IPrescriptionCreationAttr {
  appointmentId: number;
  medicationId: number;
  dosage: string;
  instruction: string;
  date: Date;
}

@Table({ tableName: "prescriptions" })
export class Prescription extends Model<
  Prescription,
  IPrescriptionCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare appointmentId: number

  @ForeignKey(() => Medication)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare medicationId: number;

  @Column({
    type: DataType.STRING,
  })
  declare dosage: string;

  @Column({
    type: DataType.STRING,
  })
  declare instruction: string;

  @Column({
    type: DataType.DATE,
  })
  declare date: Date;

  
}
