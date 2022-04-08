import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {MailModule} from "../mail/mail.module";

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
