import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../models/admin.model';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    async sendMail(admin:Admin){
        const url = `${process.env.API_HOST}/api/admins/activate/${admin.activation_link}`
        console.log(url);
        
        await this.mailerService.sendMail({
            to:admin.email,
            subject:"Welcome to Clinic App!",
            template:"./confirmation",
            context:{
                name:admin.first_name,
                url,
            }
        })
    }
}
