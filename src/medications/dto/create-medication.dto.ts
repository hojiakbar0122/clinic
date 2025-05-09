export class CreateMedicationDto {
  name: string;
  description: string;
  form: string;
  stock: number;
  price: number;
  expiry_date: Date;
}
