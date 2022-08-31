import { Entity, UpdateDateColumn, CreateDateColumn, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./category.entity";
import { Schedules } from "./schedules_users_properties.entity";

@Entity("Properties")
export class Properties {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({type: 'boolean', default: false, nullable: false})
    sold: boolean

    @Column({type: 'decimal', precision: 12, nullable: false})
    value: number

    @Column({type: 'integer', nullable: false})
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(()=> Addresses, {
        eager: true
    })@JoinColumn()
    address: Addresses

    @ManyToOne(()=> Categories, categories => categories.id)
    category: Categories

    @OneToMany(()=> Schedules, schedules => schedules.property, { eager: true })
    schedules: Schedules[]
}