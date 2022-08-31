import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Properties } from "./properties.entity";

@Entity("Categories")
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({nullable: false, unique: true})
    name: string

    @OneToMany(() => Properties, properties => properties.category, {eager: true})
    properties: Properties[]

}