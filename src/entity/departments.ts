import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { Location } from "./locations";
import { injectable } from "inversify";

@injectable()
@Entity({ name: "departments" })
export class Department {
  @PrimaryGeneratedColumn({ name: "department_id" })
  id!: number;

  @Column({ name: "department_name" })
  name!: string;

  @Column()
  manager_id!: number;

  @ManyToOne(() => Location)
  @JoinColumn()
  location_id!: Location;
}
