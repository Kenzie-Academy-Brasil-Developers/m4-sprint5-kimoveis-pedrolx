import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity("Addresses")
export class Addresses {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({nullable: false})
    district: string

    @Column({nullable: false})
    zipCode: string

    @Column()
    number: string

    @Column({nullable: false})
    city: string

    @Column({nullable: false})
    state: string
}