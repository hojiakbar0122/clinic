export class CreateLabTestDto {
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
