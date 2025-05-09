import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DoctorsModule } from '../doctors.module';

@Module({
  imports:[JwtModule.register({global:true}), DoctorsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
