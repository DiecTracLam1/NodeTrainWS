import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { LocationEntity } from "./locations";
import { injectable } from "inversify";
import { Employees } from "./employee";

@injectable()
@Entity({ name: "departments" })
export class DepartmentEntity {
  @PrimaryGeneratedColumn({ name: "department_id" })
  id!: number;

  @Column({ name: "department_name" })
  name!: string;

  @Column()
  manager_id!: number;

  @ManyToOne(() => LocationEntity)
  @JoinColumn({ name: "location_id" })
  locations!: LocationEntity;

  @OneToMany(()=> Employees , (employee) => employee.department)
  employee!: Employees[] 

}
