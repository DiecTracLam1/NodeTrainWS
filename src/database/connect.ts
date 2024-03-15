import { DataSource } from "typeorm";
import {
  Employees,
  DepartmentEntity,
  LocationEntity,
  JobEntity,
} from "../entity";

export const db = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Employees, DepartmentEntity, LocationEntity, JobEntity],
  logging: false,
});

export const connectDb = async () => {
  try {
    db.initialize();
    console.log("connect success");
  } catch (error: any) {
    console.log("Error db");
    console.log(error.message);
  }
};
