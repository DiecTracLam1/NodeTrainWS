import { injectable } from "inversify";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DepartmentEntity } from "./departments";

@injectable()
@Entity({ name: "locations" })
export class LocationEntity {
  @PrimaryGeneratedColumn({ name: "location_id" })
  id!: number;

  @Column()
  street_address!: string;

  @Column()
  postal_code!: string;

  @Column()
  city!: string;

  @Column()
  state_province!: string;

  @OneToMany(() => DepartmentEntity, (department) => department.locations)
  departments!: DepartmentEntity[];
}
