import { Injectable } from '@nestjs/common'; import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; import { compare } from '../utils/crypto';
import {UserEntity} from "../database/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<UserEntity|null> {
    const _user = await this.usersService.findByEmail(email);
        if (_user && await compare(pass, _user.password)) {
            return _user;
        }
        return null;
    }

    async login(user: any) {
        const payload = user;
        return {
        access_token: this.jwtService.sign(payload),
    };
    }

    async verify(token: string) {
        return this.jwtService.verify(token);
    }
}
