import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import * as bcrypt from "bcrypt";

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor) private readonly doctorModel:typeof Doctor,
){}

  async create(createDoctorDto: CreateDoctorDto) {
    const { password, confirm_password } = createDoctorDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const newDoctor = await this.doctorModel.create({
      ...createDoctorDto,
      hashed_password,
    });

    return newDoctor;
  }

  findAll() {
    return this.doctorModel.findAll();
  }

  findOne(id: number) {
    return this.doctorModel.findByPk(id);
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorModel.update(updateDoctorDto, {where:{id}});
  }

  remove(id: number) {
    return this.doctorModel.destroy({where:{id}});
  }

  async findByEmail(email: string) {
    return this.doctorModel.findOne({ where: { email } });
  }

 
  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedDoctor = await this.doctorModel.update(
      {
        refresh_token,
      },
      { where: { id } }
    );

    return updatedDoctor;
  }
}
