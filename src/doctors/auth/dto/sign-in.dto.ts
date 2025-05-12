import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class SignInDto{
    @ApiProperty({ example: 'doctor@example.com' })
    @IsEmail()
    email:string

    @ApiProperty({ example: 'doctor!password' })    
    @IsString()
    @MinLength(6)
    password:string
}