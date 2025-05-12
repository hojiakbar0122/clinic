import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DoctorAuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { DoctorsModule } from "../doctors.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME },
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    forwardRef(() => DoctorsModule)
    // DoctorsModule
  ],
  controllers: [DoctorAuthController],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule {}

