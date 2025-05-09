import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { StaffsModule } from './admins/admins.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { MedicationsModule } from './medications/medications.module';
import { MedicalRecordsModule } from './medical_records/medical_records.module';
import { LabTestsModule } from './lab_tests/lab_tests.module';
import { DepartmentsModule } from './departments/departments.module';
import { PaymentsModule } from './payments/payments.module';
import { ServicesModule } from './services/services.module';
import { PaymentItemsModule } from './payment_items/payment_items.module';
import { Doctor } from './doctors/models/doctor.model';
import { AdminsModule } from './admins/admins.module';

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
      models: [Doctor],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    DoctorsModule,
    PatientsModule,
    StaffsModule,
    AppointmentsModule,
    PrescriptionsModule,
    MedicationsModule,
    MedicalRecordsModule,
    LabTestsModule,
    DepartmentsModule,
    PaymentsModule,
    ServicesModule,
    PaymentItemsModule,
    AdminsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
