import { Entity, UpdateDateColumn, CreateDateColumn, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Schedules } from "./schedules_users_properties.entity";
import { Exclude } from "class-transformer";

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({length: 240, nullable: false})
    name: string

    @Column({unique: true, length: 180, nullable: false})
    email: string

    @Column({type: 'boolean', nullable: false})
    isAdm: boolean

    @Column({type: 'boolean'})
    isActive: boolean

    @Column({length: 240})
    @Exclude()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(()=> Schedules, schedules => schedules.user)
    schedules: Schedules[]
}



