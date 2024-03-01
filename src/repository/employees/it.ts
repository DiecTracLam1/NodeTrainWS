import { injectable } from "inversify";
import client from "../../model/connect";
import { EmployeesRepository } from "./employee";

@injectable()
export class ItRepository extends EmployeesRepository {
  constructor() {
    super();
  }

  async getAll(): Promise<any> {
    return await client.query(`Select * From employees where department_id = 60`);
  }

  async findOne(): Promise<any> {
    {
      return await client.query(`Select * From employees where department_id = 60`);
    }
  }
}
