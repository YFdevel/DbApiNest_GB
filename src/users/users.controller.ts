import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserEntity} from "../database/entities/user.entity";
import {ParamIdDto} from "../dto/param-id.dto";
import {UserCreateDto} from "../dto/user-create.dto";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('create')
    async createUser(@Body() data: UserCreateDto): Promise<UserEntity> {
        return this.usersService.createUser(data);
    }

    @Get('get-all')
    async getUsers(): Promise<UserEntity[]> {
        return this.usersService.getUsers();
    }

    @Get('get-one')
    async getUser(@Query() query: ParamIdDto): Promise<UserEntity> {
        return await this.usersService.getUser(query.id);
    }

    @Put('update')
    async updateUser(@Query() query:ParamIdDto, @Body() data: UserEntity): Promise<UserEntity> {
        return this.usersService.updateUser(query.id,data);
    }

    @Delete('delete')
    async deleteUser(@Query()  query: ParamIdDto,
    ): Promise<UserEntity[]> {
        return this.usersService.deleteUser(query.id);
    }
}
