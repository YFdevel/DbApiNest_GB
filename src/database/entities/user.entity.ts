import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany, Index, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable
} from 'typeorm';
import {PostEntity} from "./post.entity";
import {CommentEntity} from "./comment.entity";
import {IsEnum} from "class-validator";
import {Role} from "../../auth/role/role.enum";


@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Index()
    @Column({name: 'firstName', type: 'text'})
    firstName: string;

    @Index()
    @Column({name: 'lastName', type: 'text'})
    lastName: string;

    @Column({name: 'email', type: 'text'})
    email: string;

    @Column({name: 'password', type: 'text'})
    password: string;

    // @Column('text')
    // roles: string;

    @Column('text')
    @IsEnum(Role)
    roles: Role;

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];

    @CreateDateColumn({type: 'timestamp', name: 'createdAt'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updatedAt'})
    updatedAt: Date;

}
