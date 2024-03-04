import { injectable } from "inversify";
import client from "../../model/connect";
import { EmployeesRepository } from "./employee";

@injectable()
export class AccountantRepository extends EmployeesRepository {
  constructor() {
    super();
  }

  async getAll(): Promise<any> {
    super.getAll()
    const query = await client.query(
      `Select * From employees where department_id = 110`
    );
    return query.rows;
  }

  async findOne(): Promise<any> {
    const query = await client.query(
      `Select * From employees where department_id = 110`
    );
    return query.rows;
  }
}
