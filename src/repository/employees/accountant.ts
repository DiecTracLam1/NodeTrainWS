import { inject, injectable } from "inversify";
import { BaseRepository } from "../base";
import { db } from "../../database/connect";
import { TYPES } from "../../constant/types";
import { EmployeeEntity } from "../../entity";

@injectable()
export class AccountantRepository extends BaseRepository {
  constructor(@inject(TYPES.EmployeeEntity) private employeeEntity: any) {
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
        },
        where: {
          ...query,
          department_id: 110,
        },
      });
      const response = { data, total: count };
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
