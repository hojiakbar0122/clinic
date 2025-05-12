import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Appointment } from "../../appointments/models/appointment.model";
import { Department } from "../../departments/models/department.model";
import { LabTest } from "../../lab_tests/models/lab_test.model";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";

interface IDoctorCreationAttr {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  hashed_password: string;
  specialization: string;
  experience: number;
  photo_url?: string;
  bio: string;
  departmentId: number;
  is_active: boolean;
}

@Table({ tableName: "doctors" })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
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
    type: DataType.STRING,
  })
  declare specialization: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare experience: number;

  @Column({
    type: DataType.STRING,
  })
  declare photo_url?: string;

  @Column({
    type: DataType.STRING,
  })
  declare bio: string;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare departmentId: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue:false
  })
  declare is_active: boolean;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @HasMany(() => LabTest)
  labtests: LabTest[];

  @HasMany(() => MedicalRecord)
  medicalrecords: MedicalRecord[];
}
