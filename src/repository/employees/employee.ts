import { injectable } from "inversify";
import client from "../../model/connect";
import { IEmployees } from "interface/iEmployees";

@injectable()
export class EmployeesRepository implements IEmployees {
  async getAll(): Promise<any> {
    const query = await client.query(`Select * From employees`);
    return query.rows;
  }

  async findOne(data: any): Promise<any> {
    const query = await client.query(
      `Select * From employees where email = '${data.email}'`
    );
    return query.rows;
  }
}
