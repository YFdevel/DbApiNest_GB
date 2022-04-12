import {Body, Controller, Delete, Get, Post, Put, Query, Render, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserEntity} from "../database/entities/user.entity";
import {ParamIdDto} from "../dto/param-id.dto";
import {UserCreateDto} from "../dto/user-create.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/role/roles.decorator";
import {Role} from "../auth/role/role.enum";


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
        return await this.usersService.findById(query.id);
    }
    @Get('get-one-render')
    @Render('user-update')
     getUserRender(@Query() query: ParamIdDto) {
        return this.usersService.findById(query.id)
            .then((data) => data ? {result: data} : {result: null})
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.User)
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
