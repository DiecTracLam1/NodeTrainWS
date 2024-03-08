import { injectable } from "inversify";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@injectable()
@Entity({ name: "employees" })
export class EmployeeEntity {
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
  manager_id!: string;

  @Column()
  department_id!: number;
  
  @Column()
  password!: string;

  @Column()
  role!: string;
}
