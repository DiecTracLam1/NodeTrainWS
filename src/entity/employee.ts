import { injectable } from "inversify";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { LocationEntity } from "./locations";
import { JobEntity } from "./jobs";
import { DepartmentEntity } from "./departments";

@injectable()
@Entity({ name: "employees" })
export class Employees {
  @PrimaryGeneratedColumn({ name: "employee_id" })
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column()
  job_id!: string;

  @Column()
  salary!: number;

  @Column()
  department_id!: number;

  @Column()
  password!: string;

  @Column()
  role!: string;

  @ManyToOne(() => DepartmentEntity)
  @JoinColumn({ name: "department_id" })
  department!: DepartmentEntity[];

  @ManyToOne(() => JobEntity)
  @JoinColumn({ name: "job_id" })
  jobs!: JobEntity;

  @ManyToOne(() => Employees)
  @JoinColumn({ name: "manager_id" })
  manager!: Employees;

  @ManyToMany(() => Employees)
  @JoinTable()
  assistant!: Employees[];
}
