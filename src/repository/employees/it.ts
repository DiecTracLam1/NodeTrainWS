import { injectable } from "inversify";
import client from "../../model/connect";
import { EmployeesRepository } from "./employee";

@injectable()
export class ItRepository extends EmployeesRepository {
  constructor() {
    super();
  }

  async getAll(): Promise<any> {
    const query = await client.query(
      `Select * From employees where department_id = 60`
    );
    return query.rows;
  }

  async findOne(): Promise<any> {
    const query = await client.query(
      `Select * From employees where department_id = 60`
    );
    return query.rows;
  }
}
