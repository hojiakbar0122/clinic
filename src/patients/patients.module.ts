import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './models/patient.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailModule } from './mail/mail.module';

@Module({
  imports:[SequelizeModule.forFeature([Patient]), MailModule],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports:[PatientsModule]
})
export class PatientsModule {}
