import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class SignInDto{
    @ApiProperty({ example: 'patient@example.com' })
    @IsEmail()
    email:string

    @ApiProperty({ example: 'patient!password' })
    @IsString()
    @MinLength(6)
    password:string
}