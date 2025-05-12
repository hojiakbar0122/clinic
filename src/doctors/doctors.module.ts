import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Module({
  imports:[SequelizeModule.forFeature([Doctor]), AuthModule],
  controllers: [DoctorsController],
  providers: [DoctorsService,  JwtAuthGuard],
  exports:[DoctorsService]
})
export class DoctorsModule {}
