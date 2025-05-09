export class CreateAppointmentDto {
    patientId:number
    doctorId:number
    appointment_date:Date
    appointment_time:string
    reason:string
    status:string
}
