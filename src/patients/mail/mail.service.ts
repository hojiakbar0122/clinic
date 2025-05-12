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
            html:`<h1>Hello! Dear ${patient.first_name},</h1>
<h2>Please click below to confirmation</h2>
<p>
    <a href="${url}">Confirm</a>
</p>`,
        })
    }
}
