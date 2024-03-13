import { inject, injectable } from "inversify";

import { TYPES } from "../../constant/types";
import { EmployeeEntity } from "../../entity";
import { BaseRepository } from "../base";

@injectable()
export class ItRepository extends BaseRepository {
  constructor(@inject(TYPES.EmployeeEntity) private _employeeEntity: any) {
    super(EmployeeEntity);
  }

  getAll = async (query = {}) => {
    try {
      const [data, count] = await this.getEntity().findAndCount({
        take: 10,
        relations: {
          jobs: true,
          department: {
            location: true,
          },
          manager: {
            jobs: true,
            department: {
              location: true,
            },
          },
        },
        where: {
          ...query,
          department_id: 60,
        },
      });
      const response = { data, total: count };
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
