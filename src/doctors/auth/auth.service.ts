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
import { DoctorsService } from "../doctors.service";
import { Doctor } from "../models/doctor.model";
import { CreateDoctorDto } from "../dto/create-doctor.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      is_active: doctor.is_active,
      email: doctor.email,
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

  async signUp(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorsService.findByEmail(createDoctorDto.email);
    
    if (!doctor) {
      throw new ConflictException({
        message: "Bunday Emailli Doctor mavjud",
      });
    }
    const newDoctor = await this.doctorsService.create(createDoctorDto);
    return { message: "Doctor qo'shildi", doctorId: newDoctor.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const doctor = await this.doctorsService.findByEmail(signInDto.email);
    
    if (!doctor) {
      throw new BadRequestException({ message: "Email yoki Password Noto'g'ri" });
    }
    if (!doctor.is_active) {
      throw new BadRequestException({ message: "Avval Emailni Tasdiqlang" });
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      doctor.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException({ message: "Email yoki Password Notgiri" });
    }
    const { accessToken, refreshToken } = await this.generateTokens(doctor);
    doctor.refresh_token=refreshToken
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    await doctor.save();
    return { message: "Tizimga hush kelibsiz", accessToken };
  }

  async signOut(refreshToken: string, res: Response) {
    const doctorData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!doctorData) {
      throw new ForbiddenException("Doctor not verified");
    }

    const refresh_token = null;
    await this.doctorsService.updateRefreshToken(
      doctorData.id,
      refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "Doctor logged out successfully",
    };

    return response;
  }

  async refreshToken(doctorId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (doctorId !== decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan");
    }

    const doctor = await this.doctorsService.findOne(doctorId);

    if (!doctor || !doctor.refresh_token) {
      throw new BadRequestException("Doctor not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      doctor.refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(doctor);
    await this.doctorsService.updateRefreshToken(doctor.id, refresh_token);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message:"Doctor refreshed",
      doctorId:doctor.id,
      access_token:accessToken
    }

    return response
  }
}
