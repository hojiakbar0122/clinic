import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Patient } from "../../patients/models/patient.model"
import { Doctor } from "../../doctors/models/doctor.model"

interface ILabTestCreationAttr{
    patientId:number
    doctorId:number
    test_type:string
    test_name:string
    status:string
    requested_date:Date
    result_date:Date
    result:JSON
    unit:string
    note:string
}


@Table({tableName:"lab_tests"})
export class LabTest extends Model<LabTest, ILabTestCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number

    @ForeignKey(()=>Patient)
    @Column({
        type:DataType.INTEGER,
        onDelete:"SET NULL"
    })
    declare patientId:number

    @ForeignKey(()=>Doctor)
    @Column({
        type:DataType.INTEGER,
        onDelete:"SET NULL"
    })
    declare doctorId:number

    @Column({
        type:DataType.STRING
    })
    declare test_type:string

    @Column({
        type:DataType.STRING
    })
    declare test_name:string

    @Column({
        type:DataType.ENUM('pending', 'confirmed', 'cancelled')
    })
    declare status:string

    @Column({
        type:DataType.DATE
    })
    declare requested_date:Date

    @Column({
        type:DataType.DATE
    })
    declare result_date:Date

    @Column({
        type:DataType.JSON
    })
    declare result:JSON

    @Column({
        type:DataType.STRING
    })
    declare unit:string

    @Column({
        type:DataType.STRING
    })
    declare note:string

}
