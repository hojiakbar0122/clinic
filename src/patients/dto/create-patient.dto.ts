import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  Matches,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ example: 'Fotima', description: 'Bemorning ismi' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Aliyeva', description: 'Bemorning familiyasi' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami (O‘zbekiston formati)' })
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({ example: 'fotima@gmail.com', description: 'Email manzili' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Fotima123',
    description: 'Kamida 6 belgidan iborat, 1 katta harf va 1 raqam bo‘lishi kerak',
  })
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must contain at least one uppercase letter and one number',
  })
  password: string;

  @ApiProperty({ example: 'Fotima123', description: 'Parolni tasdiqlash' })
  @IsString()
  confirm_password: string;
}
