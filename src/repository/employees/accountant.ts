import { inject, injectable } from "inversify";
import { EmployeesRepository } from "./employee";
import { BaseRepository } from "../base";
import { db } from "../../model/connect";
import { TYPES } from "../../constant/types";
import { EmployeeEntity } from "../../entity";

@injectable()
export class AccountantRepository extends EmployeesRepository {
  constructor(@inject(TYPES.EmployeeEntity) private employeeEntity: any) {
    super(employeeEntity);
  }

  getAll = async () => {
    const query = await db.manager.getRepository(EmployeeEntity).find({
      where: {
        department_id: 110,
      },
    });
    console.log(query);
    return query;
  };
}
