import { inject, injectable } from "inversify";

import { TYPES } from "../../constant/types";
import { EmployeesRepository } from "./employee";
import { db } from "../../model/connect";
import { EmployeeEntity } from "../../entity";
import { BaseRepository } from "../base";

@injectable()
export class ItRepository extends BaseRepository {
  constructor(@inject(TYPES.EmployeeEntity) private _employeeEntity: any) {
    super(EmployeeEntity);
  }

  getAll = async () => {
    try {
      const [data, count] = await this.getEntity().findAndCount({
        take: 10,
        relations: {
          jobs: true,
          department: {
            location: true,
          },
        },
        where: {
          department_id: 60,
          // jobs: {
          //   job_title : "Public Accountant"
          // },
        },
      });
      const query = { data, total: count };
      return query;
    } catch (error) {
      console.log(error);
    }
  };
}
