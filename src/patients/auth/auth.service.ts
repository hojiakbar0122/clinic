import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { PatientsService } from "../patients.service";
import { Patient } from "../models/patient.model";
import { CreatePatientDto } from "../dto/create-patient.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(patient: Patient) {
    const payload = {
      id: patient.id,
      is_active: patient.is_active,
      email: patient.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createPatientDto: CreatePatientDto) {
    const patient = await this.patientsService.findByEmail(createPatientDto.email);
    if (patient) {
      throw new ConflictException({
        message: "Bunday Emailli Patient mavjud",
      });
    }
    const newPatient = await this.patientsService.create(createPatientDto);
    return { message: "Patient qo'shildi", patientId: newPatient.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const patient = await this.patientsService.findByEmail(signInDto.email);
    console.log(patient);
    
    if (!patient) {
      throw new BadRequestException({ message: "Email yoki Password Noto'g'ri" });
    }
    if (!patient.is_active) {
      throw new BadRequestException({ message: "Avval Emailni Tasdiqlang" });
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      patient.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException({ message: "Email yoki Password Notgiri" });
    }
    const { accessToken, refreshToken } = await this.generateTokens(patient);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    await patient.save();
    return { message: "Tizimga hush kelibsiz", accessToken };
  }

  async signOut(refreshToken: string, res: Response) {
    const patientData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!patientData) {
      throw new ForbiddenException("Patient not verified");
    }

    const refresh_token = null;
    await this.patientsService.updateRefreshToken(
      patientData.id,
      refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "Patient logged out successfully",
    };

    return response;
  }

  async refreshToken(patientId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (patientId !== decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan");
    }

    const patient = await this.patientsService.findOne(patientId);

    if (!patient || !patient.refresh_token) {
      throw new BadRequestException("patient not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      patient.refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(patient);
    await this.patientsService.updateRefreshToken(patient.id, refresh_token);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message:"patient refreshed",
      patientId:patient.id,
      access_token:accessToken
    }

    return response
  }
}
