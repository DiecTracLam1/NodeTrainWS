import { inject, injectable } from "inversify";

import { TYPES } from "../../constant/types";
import { EmployeesRepository } from "./employee";
import { db } from "../../model/connect";
import { EmployeeEntity } from "../../entity";

@injectable()
export class ItRepository extends EmployeesRepository {
  constructor(
    @inject(TYPES.EmployeeEntity) private employeeEntity: any
  ) {
    super(employeeEntity);
  }
  getAll = async () => {
    const query = await db.manager.getRepository(EmployeeEntity).find({
      where: {
        department_id: 60,
      },
    });
    console.log(query);
    return query;
  };

  // async findOne(): Promise<any> {
  //   const query = await client.query(
  //     `Select * From employees where department_id = 60`
  //   );
  //   return query.rows;
  // }
}
