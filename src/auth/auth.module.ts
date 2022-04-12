import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../database/entities/user.entity";
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule, JwtService} from "@nestjs/jwt";
import { jwtConstants } from './constants';
import {JwtStrategy} from "./jwt.strategy";



@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([UserEntity]),
       PassportModule,forwardRef(() => UsersModule),
        JwtModule.register({
            secret: jwtConstants.secret, signOptions: { expiresIn: '2h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy,JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}

