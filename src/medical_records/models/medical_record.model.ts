import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Patient } from "../../patients/models/patient.model"
import { Doctor } from "../../doctors/models/doctor.model"

interface IMedicalRecordCreationAttr{
    patientId:number
    doctorId:number
    visit_date:Date
    diagnos:string
    symptoms:string
    treatment_plan:string
    note:string
    created_at:Date
}

@Table({tableName:"medical_records"})
export class MedicalRecord extends Model<MedicalRecord, IMedicalRecordCreationAttr>{
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
    declare visit_date:Date

    @Column({
        type:DataType.STRING
    })
    declare diagnos:string

    @Column({
        type:DataType.STRING
    })
    declare symptoms:string

    @Column({
        type:DataType.TEXT
    })
    declare treatment_plan:string

    @Column({
        type:DataType.TEXT
    })
    declare note:string

    @Column({
        type:DataType.DATE
    })
    declare created_at:Date    
}
