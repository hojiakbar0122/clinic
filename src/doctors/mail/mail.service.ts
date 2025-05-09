import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Doctor } from '../models/doctor.model';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    async sendMail(doctor:Doctor){
        const url = `${process.env.API_HOST}/api/doctors/activate/${doctor.activation_link}`
        console.log(url);
        
        await this.mailerService.sendMail({
            to:doctor.email,
            subject:"Welcome to Clinic App!",
            template:"./confirmation",
            context:{
                name:doctor.first_name,
                url,
            }
        })
    }
}
