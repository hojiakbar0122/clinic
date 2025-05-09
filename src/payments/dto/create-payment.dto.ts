export class CreatePaymentDto {
    patientId:number
    amount:number
    payment_method:string
    transactionId:string
    paid_at:Date
    created_at:Date
}
