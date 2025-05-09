export class CreateMedicalRecordDto {
    patientId:number
    doctorId:number
    visit_date:Date
    diagnos:string
    symptoms:string
    treatment_plan:string
    note:string
    created_at:Date
}
