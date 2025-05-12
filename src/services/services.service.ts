import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './models/service.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service) private readonly serviceModel:typeof Service){}

  create(createServiceDto: CreateServiceDto) {
    return this.serviceModel.create(createServiceDto);
  }

  findAll() {
    return this.serviceModel.findAll();
  }

  findOne(id: number) {
    return this.serviceModel.findByPk(id);
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.serviceModel.update(updateServiceDto, {where:{id}});
  }

  remove(id: number) {
    return this.serviceModel.destroy({where:{id}});
  }
}
