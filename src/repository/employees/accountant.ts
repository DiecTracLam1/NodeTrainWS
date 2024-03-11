import { inject, injectable } from "inversify";
import { BaseRepository } from "../base";
import { db } from "../../model/connect";
import { TYPES } from "../../constant/types";
import { EmployeeEntity } from "../../entity";

@injectable()
export class AccountantRepository extends BaseRepository {
  constructor(@inject(TYPES.EmployeeEntity) private employeeEntity: any) {
    super(EmployeeEntity);
  }

  getAll = async () => {
    const query = await this.getEntity().find({
      take: 10,
      where: {
        department_id: 110,
      },
    });
    console.log(query);
    return query;
  };
}
