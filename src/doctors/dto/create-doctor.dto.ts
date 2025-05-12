import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsEmail,
  MinLength,
  Matches,
  IsPhoneNumber,
  IsOptional,
  IsUrl,
  IsInt,
  Min,
} from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Ali', description: 'Doktorning ismi' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Doktorning familiyasi' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({ example: 'ali.karimov@example.com', description: 'Email manzili' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Doctor123',
    description: 'Kamida 6 belgili, 1 katta harf va 1 raqam bo‘lishi kerak',
  })
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must contain at least one uppercase letter and one number',
  })
  password: string;

  @ApiProperty({ example: 'Doctor123', description: 'Parolni tasdiqlash' })
  @IsString()
  confirm_password: string;

  @ApiProperty({ example: 'Dermatolog', description: 'Ixtisosligi' })
  @IsString()
  specialization: string;

  @ApiProperty({ example: 5, description: 'Tajriba yillari (0 yoki undan katta)' })
  @IsInt()
  @Min(0)
  experience: number;

  @ApiPropertyOptional({ example: 'https://example.com/photo.jpg', description: 'Doktor rasmi (ixtiyoriy)' })
  @IsOptional()
  @IsUrl()
  photo_url?: string;

  @ApiProperty({ example: 'Tajribali dermatolog. 5 yillik tajriba.', description: 'Qisqacha bio' })
  @IsString()
  bio: string;

  @ApiProperty({ example: 2, description: 'Bo‘lim ID raqami (departmentId)' })
  @IsInt()
  departmentId: number;

  @ApiProperty({ example: true, description: 'Doktor aktivmi yoki yo‘q' })
  @IsBoolean()
  is_active: boolean;
}
