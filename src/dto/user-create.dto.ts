import {IsNotEmpty, IsString, IsEmail, IsInt, IsOptional,IsArray} from 'class-validator';
export class UserCreateDto {
    @IsInt()
    @IsOptional()
    id:number;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsArray()
    @IsOptional()
    posts:[];

    @IsArray()
    @IsOptional()
    comments:[];
}
