import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../database/entities/user.entity";
import {MailService} from "../mail/mail.service";
import {UserCreateDto} from "../dto/user-create.dto";
import { hash } from '../utils/crypto';
import {Role} from "../auth/role/role.enum";

//
// export type User = any;
@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)
                private readonly usersRepository: Repository<UserEntity>,
                private readonly mailService: MailService) {
    }

    async createUser(data: UserCreateDto): Promise<UserEntity> {
        data.password = await hash(data.password);

        return await this.usersRepository.save(data);
    }

    async getUsers(): Promise<UserEntity[]> {
        return await this.usersRepository.find();

    }

    async findById(id: number): Promise<UserEntity | undefined> {
        return this.usersRepository.findOne({
            where: {
                id,
            },
        });
    }
    async findByEmail(email): Promise<UserEntity> {
        return this.usersRepository.findOne({ email });
    }

    async updateUser(id:number,data: UserEntity): Promise<UserEntity> {
        let existingData = await this.usersRepository.findOne({
            where: {
                id,
            },
        });
        let prevData = existingData;
        data.password = await hash(data.password);
        const nextData= await this.usersRepository.save({
            ...existingData,
            ...data,
        });

        return nextData;
    }

    async deleteUser(id: number): Promise<UserEntity[]> {
        const user = await this.usersRepository.findOne({
            where: {
                id,
            },
        });
        if (user) {
            await this.usersRepository.remove(user);
            return await this.usersRepository.find();
        } else throw new Error('Post not found');
    }

    async setModerator(idUser): Promise<UserEntity> {
        const _user = await this.findById(idUser);
        if (!_user) {
            throw new UnauthorizedException();
        }
        _user.roles = Role.Moderator;
        return this.usersRepository.save(_user);
    }
}


