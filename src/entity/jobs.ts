import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { injectable } from "inversify";
import { Employees } from "./employee";

@injectable()
@Entity({ name: "jobs" })
export class JobEntity {
  @PrimaryGeneratedColumn({ name: "job_id" })
  id!: string;

  @Column()
  job_title!: string;

  @Column()
  min_salary!: number;

  @Column()
  max_salary!: number;
 
  @OneToMany(()=>Employees , (employee)=> employee.id)
  employee!: Employees[];

}
