import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private readonly adminModel:typeof Admin,
){}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    return newAdmin;
  }

  findAll() {
    return this.adminModel.findAll();
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.update(updateAdminDto, {where:{id}});
  }

  remove(id: number) {
    return this.adminModel.destroy({where:{id}});
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

    async updateRefreshToken(id: number, refresh_token: string) {
      const updatedAdmin = await this.adminModel.update(
        {
          refresh_token,
        },
        { where: { id } }
      );
  
      return updatedAdmin;
    }
}
