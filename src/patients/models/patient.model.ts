import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Appointment } from "../../appointments/models/appointment.model";
import { LabTest } from "../../lab_tests/models/lab_test.model";
import { Payment } from "../../payments/models/payment.model";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";

interface IPatientCreationAttr {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  hashed_password: string;
}

@Table({ tableName: "patients" })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
    // unique:true
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue:false
  })
  declare is_active: boolean;

  @Column({
    type:DataType.UUID,
    defaultValue:DataType.UUIDV4()
  })
  declare activation_link: string

  @HasMany(()=>Appointment)
  appointments:Appointment[]

  @HasMany(()=>LabTest)
  labtests:LabTest[]

  @HasMany(()=>Payment)
  payments:Payment[]

  @HasMany(()=>MedicalRecord)
  medicalrecords:MedicalRecord[]
}
