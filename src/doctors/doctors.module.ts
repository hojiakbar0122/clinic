import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import { MailModule } from './mail/mail.module';

@Module({
  imports:[SequelizeModule.forFeature([Doctor]), MailModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports:[DoctorsModule]
})
export class DoctorsModule {}
