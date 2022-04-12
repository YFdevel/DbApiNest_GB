import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {MailModule} from "../mail/mail.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../database/entities/post.entity';
import {UsersModule} from "../users/users.module";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "../auth/role/roles.guard";
import {AuthModule} from "../auth/auth.module";


@Module({
  imports:[MailModule,TypeOrmModule.forFeature([PostEntity]),UsersModule,AuthModule],
  controllers: [PostsController],
  providers: [Array,PostsService,{
    provide: APP_GUARD, useClass: RolesGuard,
  },],
  exports:[PostsService]
})
export class PostsModule {}
