import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PatientsModule } from '../patients.module';

@Module({
  imports:[JwtModule.register({global:true}), PatientsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
