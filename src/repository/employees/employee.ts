import { injectable } from "inversify";
import client from "../../model/connect";
import { IEmployees } from "interface/iEmployees";

@injectable()
export class EmployeesRepository implements IEmployees {
  async getAll(): Promise<any> {
    return await client.query(
      `Select * From employees`
    );
  }

  async findOne(): Promise<any> {
    {
      return await client.query(
        `Select * From employees`
      );
    }
  }
}
