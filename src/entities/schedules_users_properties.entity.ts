import {
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  PrimaryColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  TreeRepositoryNotSupportedError,
} from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity("Schedule_users_properties")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "time" })
  hour: Date;

  @Column({ type: "date" })
  date: Date;

  @ManyToOne(() => Properties)
  property: Properties;

  @ManyToOne(() => User, { eager: true })
  user: User;
}
