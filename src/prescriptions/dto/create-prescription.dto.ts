export class CreatePrescriptionDto {
    appointmentId: number;
    medicationId: number;
    dosage: string;
    instruction: string;
    date: Date;
}
