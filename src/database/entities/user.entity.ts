import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import {PostEntity} from "./post.entity";
import {CommentEntity} from "./comment.entity";
import {IsEmail, IsEnum, IsNotEmpty, IsString} from "class-validator";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ name: 'firstName', type: 'text' })
    firstName!: string;

    @Column({ name: 'lastName', type: 'text' })
    lastName!: string;

    @Column({ name: 'email', type: 'text' })
    email!: string;

    @Column({ name: 'role', type: 'text' })
    role!: string;

    // @Column({ name: 'role', type: 'text' })
    // @IsEnum(Role) roles: Role;


    @Column({ name: 'password', type: 'text' })
    password: string;

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];


}
