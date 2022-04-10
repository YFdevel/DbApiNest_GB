import { Entity, Column, PrimaryGeneratedColumn, Index, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity("roles")
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Index()
    @Column({ unique: true })
    value!: string;

    @Column()
    description!: string;

    @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
    updatedAt!: Date;

    @Column({ name: 'isDeleted', default: false })
    isDeleted!: boolean;

    @Column({ type: 'timestamp', name: 'deletedAt', nullable: true })
    deletedAt?: Date;
}
