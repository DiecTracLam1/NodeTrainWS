import { injectable } from "inversify";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@injectable()
@Entity({ name: "locations" , database: "NewBie"})
export class Location {
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

//   @OneToMany()
}
