import { Column, DataType, Model, Table } from "sequelize-typescript"

interface IServiceCreationAttr{
    name:string
    description:string
    price:number
    is_active:boolean
}

@Table({tableName:"services"})
export class Service extends Model<Service, IServiceCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number

    @Column({
        type:DataType.STRING
    })
    declare name:string

    @Column({
        type:DataType.STRING
    })
    declare description:string

    @Column({
        type:DataType.DECIMAL
    })
    declare price:number

    @Column({
        type:DataType.BOOLEAN
    })
    declare is_active:boolean
}
