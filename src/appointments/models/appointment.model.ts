import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { Patient } from "../../patients/models/patient.model"
import { Doctor } from "../../doctors/models/doctor.model"
import { Prescription } from "../../prescriptions/models/prescription.model"

interface IAppointmentCreationAttr{
    patientId:number
    doctorId:number
    appointment_date:Date
    appointment_time:string
    reason:string
    status:string
}

@Table({tableName:"appointments"})
export class Appointment extends Model<Appointment, IAppointmentCreationAttr>{
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
        type:DataType.DATE
    })
    declare appointment_date:Date

    @Column({
        type:DataType.STRING
    })
    declare appointment_time:string

    @Column({
        type:DataType.STRING
    })
    declare reason:string

    @Column({
        type:DataType.ENUM
    })
    declare status:string

    @HasMany(()=>Prescription)
    prescriptions:Prescription[]

}
