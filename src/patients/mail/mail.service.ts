import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Patient } from '../models/patient.model';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    async sendMail(patient:Patient){
        const url = `${process.env.API_HOST}/api/patients/activate/${patient.activation_link}`
        console.log(url);
        
        await this.mailerService.sendMail({
            to:patient.email,
            subject:"Welcome to Clinic App!",
            template:"./confirmation",
            context:{
                name:patient.first_name,
                url,
            }
        })
    }
}
