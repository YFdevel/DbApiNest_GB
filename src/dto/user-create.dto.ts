import {IsNotEmpty, IsString, IsEmail, IsInt, IsOptional, IsArray, IsEnum} from 'class-validator';
import {Role} from "../auth/role/role.enum";
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
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(Role)
    roles: Role;

    @IsArray()
    @IsOptional()
    posts:[];

    @IsArray()
    @IsOptional()
    comments:[];
}
