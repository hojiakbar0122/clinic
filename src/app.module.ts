import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { DoctorsModule } from "./doctors/doctors.module";
import { PatientsModule } from "./patients/patients.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { PrescriptionsModule } from "./prescriptions/prescriptions.module";
import { MedicationsModule } from "./medications/medications.module";
import { MedicalRecordsModule } from "./medical_records/medical_records.module";
import { LabTestsModule } from "./lab_tests/lab_tests.module";
import { DepartmentsModule } from "./departments/departments.module";
import { PaymentsModule } from "./payments/payments.module";
import { ServicesModule } from "./services/services.module";
import { PaymentItemsModule } from "./payment_items/payment_items.module";
import { Doctor } from "./doctors/models/doctor.model";
import { AdminsModule } from "./admins/admins.module";
import { Admin } from "./admins/models/admin.model";
import { Payment } from "./payments/models/payment.model";
import { PaymentItem } from "./payment_items/models/payment_item.model";
import { Patient } from "./patients/models/patient.model";
import { LabTest } from "./lab_tests/models/lab_test.model";
import { MedicalRecord } from "./medical_records/models/medical_record.model";
import { Medication } from "./medications/models/medication.model";
import { Prescription } from "./prescriptions/models/prescription.model";
import { Service } from "./services/models/service.model";
import { Department } from "./departments/models/department.model";
import { Appointment } from "./appointments/models/appointment.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [
        Doctor,
        Admin,
        Payment,
        PaymentItem,
        Patient,
        LabTest,
        MedicalRecord,
        Medication,
        Prescription,
        Service,
        Department,
        Appointment
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    DoctorsModule,
    PatientsModule,
    AppointmentsModule,
    PrescriptionsModule,
    MedicationsModule,
    MedicalRecordsModule,
    LabTestsModule,
    DepartmentsModule,
    PaymentsModule,
    ServicesModule,
    PaymentItemsModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
