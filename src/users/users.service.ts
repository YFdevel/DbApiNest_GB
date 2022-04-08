import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../database/entities/user.entity";
import {MailService} from "../mail/mail.service";
import {UserCreateDto} from "../dto/user-create.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)
                private readonly usersRepository: Repository<UserEntity>,
                private readonly mailService: MailService) {
    }

    async createUser(data: UserCreateDto): Promise<UserEntity> {
        return await this.usersRepository.save(data);
    }

    async getUsers(): Promise<UserEntity[]> {
        return await this.usersRepository.find();

    }

    async getUser(id: number): Promise<UserEntity | undefined> {
        return this.usersRepository.findOne({
            where: {
                id,
            },
        });
    }

    async updateUser(id:number, data: UserEntity): Promise<UserEntity> {
        let existingData = await this.usersRepository.findOne({
            where: {
                id,
            },
        });
        let prevData = existingData;

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

}
