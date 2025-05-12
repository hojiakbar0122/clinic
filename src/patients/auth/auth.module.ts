import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PatientAuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PatientsModule } from "../patients.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME },
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PatientsModule,
  ],
  controllers: [PatientAuthController],
  providers: [AuthService],
  exports:[JwtModule]
})
export class AuthModule {}
