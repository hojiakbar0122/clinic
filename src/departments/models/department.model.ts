import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.model";

interface IDepartmentCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: "departments" })
export class Department extends Model<Department, IDepartmentCreationAttr> {
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

  @HasMany(() => Doctor)
  doctors: Doctor[];
}
