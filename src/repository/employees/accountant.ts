import { injectable } from "inversify";
import client from "../../model/connect";
import { EmployeesRepository } from "./employee";

@injectable()
export class AccountantRepository extends EmployeesRepository {
  constructor() {
    super();
  }

  async getAll(): Promise<any> {
    return await client.query(
      `Select * From employees where department_id = 110`
    );
  }

  async findOne(): Promise<any> {
    {
      return await client.query(
        `Select * From employees where department_id = 110`
      );
    }
  }
}
